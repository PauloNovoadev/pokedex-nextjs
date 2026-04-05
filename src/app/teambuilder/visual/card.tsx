"use client";

import { useState } from "react";
import {
  fetchPokemonDetails,
  formatName,
  type Option,
} from "../_server/api";

type CardProps = {
  pokemonOptions: Option[];
  itemOptions: Option[];
  cardId: string;
  className?: string;
};

type CardState = {
  pokemonName: string;
  sprite: string;
  availableMoves: Option[];
  selectedMoves: [string, string, string, string];
  selectedItem: string;
};

const initialState: CardState = {
  pokemonName: "",
  sprite: "/pokedefault.png",
  availableMoves: [],
  selectedMoves: ["", "", "", ""],
  selectedItem: "",
};

function normalizeValue(value: string) {
  return value.trim().toLowerCase();
}

export default function Card({
  pokemonOptions,
  itemOptions,
  cardId,
  className = "",
}: CardProps) {
  const [card, setCard] = useState<CardState>(initialState);
  const [isLoadingPokemon, setIsLoadingPokemon] = useState(false);

  function getPokemonLabel(name: string) {
    if (!name) return "";
    const found = pokemonOptions.find((pokemon) => pokemon.name === name);
    return found?.label ?? formatName(name);
  }

  function getMoveLabel(name: string) {
    if (!name) return "";
    const found = card.availableMoves.find((move) => move.name === name);
    return found?.label ?? formatName(name);
  }

  function getItemLabel(name: string) {
    if (!name) return "";
    const found = itemOptions.find((item) => item.name === name);
    return found?.label ?? formatName(name);
  }

  async function handlePokemonInputChange(value: string) {
    const normalized = normalizeValue(value);

    if (!normalized) {
      setCard(initialState);
      return;
    }

    const matchedPokemon = pokemonOptions.find(
      (pokemon) =>
        pokemon.name === normalized || normalizeValue(pokemon.label) === normalized
    );

    setCard((prev) => ({
      ...prev,
      pokemonName: matchedPokemon ? matchedPokemon.name : value,
    }));

    if (!matchedPokemon) {
      setCard((prev) => ({
        ...prev,
        pokemonName: value,
        sprite: "/pokedefault.png",
        availableMoves: [],
        selectedMoves: ["", "", "", ""],
      }));
      return;
    }

    setIsLoadingPokemon(true);

    try {
      const details = await fetchPokemonDetails(matchedPokemon.name);

      setCard((prev) => ({
        ...prev,
        pokemonName: matchedPokemon.name,
        sprite: details.sprite,
        availableMoves: details.moves,
        selectedMoves: ["", "", "", ""],
      }));
    } catch (error) {
      console.error(error);

      setCard((prev) => ({
        ...prev,
        pokemonName: matchedPokemon.name,
        sprite: "/pokedefault.png",
        availableMoves: [],
        selectedMoves: ["", "", "", ""],
      }));
    } finally {
      setIsLoadingPokemon(false);
    }
  }

  function getFilteredMoves(index: number) {
    return card.availableMoves.filter((move) => {
      return (
        !card.selectedMoves.includes(move.name) ||
        card.selectedMoves[index] === move.name
      );
    });
  }

  function handleMoveInputChange(index: number, value: string) {
    const normalized = normalizeValue(value);
    const availableMoves = getFilteredMoves(index);

    const matchedMove = availableMoves.find(
      (move) =>
        move.name === normalized || normalizeValue(move.label) === normalized
    );

    setCard((prev) => {
      const nextMoves = [...prev.selectedMoves] as [
        string,
        string,
        string,
        string
      ];

      nextMoves[index] = matchedMove ? matchedMove.name : value;

      return {
        ...prev,
        selectedMoves: nextMoves,
      };
    });
  }

  function handleItemInputChange(value: string) {
    const normalized = normalizeValue(value);

    const matchedItem = itemOptions.find(
      (item) =>
        item.name === normalized || normalizeValue(item.label) === normalized
    );

    setCard((prev) => ({
      ...prev,
      selectedItem: matchedItem ? matchedItem.name : value,
    }));
  }

  return (
    <div
      className={`overflow-hidden w-[520px] h-[220px] rounded-xl border border-zinc-500 bg-zinc-200 p-4 shadow-sm ${className}`}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="grid grid-cols-[120px_1fr]">
          <div className="flex flex-col">
            <input
              list={`pokemon-list-${cardId}`}
              className="w-[185px] border-b border-zinc-600 bg-transparent px-2 py-1 text-base font-semibold text-zinc-700 outline-none"
              placeholder="Nome"
              value={getPokemonLabel(card.pokemonName)}
              onChange={(e) => handlePokemonInputChange(e.target.value)}
              disabled={isLoadingPokemon}
            />

            <datalist id={`pokemon-list-${cardId}`}>
              {pokemonOptions.map((pokemon) => (
                <option key={pokemon.name} value={pokemon.label} />
              ))}
            </datalist>

            <div className="mt-8 ml-3">
              <img
                className="h-[74px] w-[74px] object-contain"
                src={card.sprite}
                alt={
                  card.pokemonName
                    ? formatName(card.pokemonName)
                    : "Pokémon padrão"
                }
                onError={(e) => {
                  e.currentTarget.src = "/pokedefault.png";
                }}
              />
            </div>
          </div>

          <div className="ml-auto flex w-[150px] flex-col justify-end gap-2">
            {[0, 1, 2, 3].map((index) => (
              <div key={index}>
                <input
                  list={`move-list-${cardId}-${index}`}
                  className="w-full border border-zinc-300 bg-slate-500 px-2 py-1 text-sm font-semibold text-white outline-none"
                  placeholder="Move"
                  value={getMoveLabel(card.selectedMoves[index])}
                  onChange={(e) => handleMoveInputChange(index, e.target.value)}
                  disabled={!card.pokemonName || isLoadingPokemon}
                />

                <datalist id={`move-list-${cardId}-${index}`}>
                  {getFilteredMoves(index).map((move) => (
                    <option key={move.name} value={move.label} />
                  ))}
                </datalist>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2">
          <input
            list={`item-list-${cardId}`}
            className="w-[175px] border-b border-zinc-600 bg-transparent px-2 py-1 text-base font-semibold text-zinc-700 outline-none"
            placeholder="Item"
            value={getItemLabel(card.selectedItem)}
            onChange={(e) => handleItemInputChange(e.target.value)}
          />

          <datalist id={`item-list-${cardId}`}>
            {itemOptions.map((item) => (
              <option key={item.name} value={item.label} />
            ))}
          </datalist>
        </div>
      </div>
    </div>
  );
}