import Card from "./visual/card";
import {
  fetchItemOptions,
  fetchPokemonOptions,
} from "../teambuilder/_server/api";

export default async function TeamBuilderPage() {
  const [pokemonOptions, itemOptions] = await Promise.all([
    fetchPokemonOptions(),
    fetchItemOptions(),
  ]);

  return (
    <main className="">
      <div className="grid grid-cols-2 gap-6 justify-items-center">
        <Card
          cardId="card-1"
          pokemonOptions={pokemonOptions}
          itemOptions={itemOptions}
        />
        <Card
          cardId="card-2"
          pokemonOptions={pokemonOptions}
          itemOptions={itemOptions}
        />
        <Card
          cardId="card-3"
          pokemonOptions={pokemonOptions}
          itemOptions={itemOptions}
        />
        <Card
          cardId="card-4"
          pokemonOptions={pokemonOptions}
          itemOptions={itemOptions}
        />
        <Card
          cardId="card-5"
          pokemonOptions={pokemonOptions}
          itemOptions={itemOptions}
        />
        <Card
          cardId="card-6"
          pokemonOptions={pokemonOptions}
          itemOptions={itemOptions}
        />
      </div>
    </main>
  );
}