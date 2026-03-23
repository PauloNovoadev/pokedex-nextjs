"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SearchItem = {
  name: string;
  type: "pokemon" | "move" | "item" | "berry";
  href: string;
};

const BASE_URL = "https://pokeapi.co/api/v2";

function formatName(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function buildHref(type: SearchItem["type"], name: string) {
  const routes = {
    pokemon: "/pokemon",
    move: "/moves",
    item: "/items",
    berry: "/berries",
  };

  return `${routes[type]}/${name}`;
}

async function fetchResource(
  endpoint: string,
  type: SearchItem["type"],
  limit: number
): Promise<SearchItem[]> {
  const res = await fetch(`${BASE_URL}/${endpoint}?limit=${limit}&offset=0}`);

  if (!res.ok) {
    throw new Error(`Erro ao carregar ${endpoint}`);
  }

  const data = await res.json();

  return (data.results ?? []).map((entry: { name: string }) => ({
    name: entry.name,
    type,
    href: buildHref(type, entry.name),
  }));
}

function getSuggestions(items: SearchItem[], query: string) {
  if (!query) return [];

  return items
    .filter((item) => item.name.includes(query))
    .sort((a, b) => {
      const aStarts = a.name.startsWith(query);
      const bStarts = b.name.startsWith(query);

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      return a.name.localeCompare(b.name);
    })
    .slice(0, 10);
}

function useDebounce<T>(value: T, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

function isDetailPage(pathname: string) {
  return (
    /^\/pokemon\/[^/]+$/.test(pathname) ||
    /^\/items\/[^/]+$/.test(pathname) ||
    /^\/berries\/[^/]+$/.test(pathname) ||
    /^\/moves\/[^/]+$/.test(pathname)
  );
}

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [items, setItems] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const debouncedQuery = useDebounce(query, 300);
  const normalizedQuery = normalize(debouncedQuery);

  useEffect(() => {
    async function loadSearchIndex() {
      try {
        setLoading(true);
        setError("");

        const [pokemons, moves, items, berries] = await Promise.all([
          fetchResource("pokemon", "pokemon", 1500),
          fetchResource("move", "move", 1200),
          fetchResource("item", "item", 2200),
          fetchResource("berry", "berry", 100),
        ]);

        setItems([...pokemons, ...moves, ...items, ...berries]);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar a busca.");
      } finally {
        setLoading(false);
      }
    }

    loadSearchIndex();
  }, []);

  useEffect(() => {
    if (isDetailPage(pathname)) return;

    const currentQ = searchParams.get("q") ?? "";
    const nextQ = debouncedQuery.trim();

    if (currentQ === nextQ) return;

    const params = new URLSearchParams(searchParams.toString());

    if (nextQ) {
      params.set("q", nextQ);
    } else {
      params.delete("q");
    }

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
  }, [debouncedQuery, pathname, router, searchParams]);

  const suggestions = useMemo(() => {
    return getSuggestions(items, normalizedQuery);
  }, [items, normalizedQuery]);

  function goToResult(item: SearchItem) {
    setQuery("");
    router.push(item.href);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const exactMatch = items.find((item) => item.name === normalize(query));

    if (exactMatch) {
      goToResult(exactMatch);
      return;
    }

    if (suggestions.length > 0) {
      goToResult(suggestions[0]);
    }
  }

  return (
    <div
      style={{
        position: "relative",
        width: 320,
        zIndex: 2000,
      }}
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={loading ? "Carregando busca..." : "Pesquisar..."}
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px 12px",
            border: "1px solid #cbd5e1",
            borderRadius: 8,
            backgroundColor: "#ffffff",
            color: "#111827",
            position: "relative",
            zIndex: 2001,
          }}
        />
      </form>

      {error && (
        <div
          style={{
            marginTop: 6,
            padding: "10px 12px",
            border: "1px solid #fecaca",
            borderRadius: 8,
            backgroundColor: "#fef2f2",
            color: "#991b1b",
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 2002,
          }}
        >
          {error}
        </div>
      )}

      {normalizedQuery && suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            marginTop: 6,
            listStyle: "none",
            padding: 0,
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            maxHeight: 280,
            overflowY: "auto",
            boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
            zIndex: 2002,
          }}
        >
          {suggestions.map((item) => (
            <li
              key={`${item.type}-${item.name}`}
              onMouseDown={() => goToResult(item)}
              style={{
                padding: "10px 12px",
                cursor: "pointer",
                borderBottom: "1px solid #f3f4f6",
                color: "#111827",
                backgroundColor: "#ffffff",
              }}
            >
              <strong>{formatName(item.name)}</strong>
              <span style={{ marginLeft: 8, color: "#6b7280" }}>
                ({item.type})
              </span>
            </li>
          ))}
        </ul>
      )}

      {normalizedQuery && !loading && !error && suggestions.length === 0 && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            marginTop: 6,
            padding: "10px 12px",
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            color: "#111827",
            boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
            zIndex: 2002,
          }}
        >
          Nenhum resultado encontrado.
        </div>
      )}
    </div>
  );
}