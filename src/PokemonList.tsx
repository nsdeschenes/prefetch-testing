import { useIsFetching, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";

import { fetchPokemon, fetchPokemonList, Pokemon, PokemonList } from "./utils";

const PokemonListComponent: React.FC = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<PokemonList, Error>(
    "PokemonList",
    fetchPokemonList
  );

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <div>
      <ul>
        {data?.results?.map((pokemon) => (
          <li key={pokemon.name}>
            <Link
              to={pokemon.name}
              onMouseEnter={() => {
                queryClient.prefetchQuery(
                  ["Pokemon", pokemon.name],
                  () => fetchPokemon(pokemon.name),
                  { staleTime: 10 * 1000 }
                );
              }}
            >
              {pokemon.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonListComponent;
