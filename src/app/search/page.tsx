import Link from "next/link";
import SearchBar from "./SearchBar";
import { searchAll } from "./search";

type SP = Record<string, string | string[] | undefined>;

function formatName(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export const revalidate = 86400;

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: SP | Promise<SP>;
}) {
  const sp = await Promise.resolve(searchParams ?? {});
  const qParam = sp.q;
  const q = Array.isArray(qParam) ? qParam[0] : qParam ?? "";

  const results = await searchAll(q);

  return (
    <div className="w-full min-h-screen flex justify-center py-10 bg-white">
    <div className="w-full max-w-6xl bg-white p-6">
    <main className="px-4 py-6 bg-white">
      <div className="mb-6">
        <SearchBar initialQuery={q} />
      </div>
<div className="container mx-auto bg-white">
      {!q ? (
        <p className="text-gray-600">Digite algo para pesquisar.</p>
      ) : results.length === 0 ? (
        <p className="text-gray-600">
          Nenhum resultado encontrado para <strong>{q}</strong>.
        </p>
      ) : (
        <>
          <h1 className="mb-4 text-2xl font-bold">
            Resultados para: {q}
          </h1>

          <ul className="divide-y space-y-3">
            {results.map((item) => (
              <li key={`${item.type}-${item.name}`}>
                <Link
                  href={item.href}
                  className="text-blue-900 hover:text-red-700 hover:underline"
                >
                  <strong>{formatName(item.name)}</strong>
                  <span className="ml-2 text-sm text-gray-500">
                    ({item.type})
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
      </div>
    </main>
    </div>
    </div>
  );
}