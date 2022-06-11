export type Pokemon = {
  name: string;
};

export type PokemonList = {
  results: Pokemon[];
};

export const fetchPokemon = async (name: string): Promise<Pokemon> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchPokemonList = async (): Promise<PokemonList> => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
