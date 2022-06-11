import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchPokemon, Pokemon } from "./utils";
import invariant from "tiny-invariant";

interface RouteParams {
  name: string;
}

const PokemonComponent: React.FC = () => {
  const { name } = useParams<keyof RouteParams>();

  invariant(name, "error");

  const { data, isLoading, isError } = useQuery<Pokemon, Error>(
    ["Pokemon", name],
    () => fetchPokemon(name)
  );

  if (isLoading) return <p>Loading ...</p>

  if (isError) return <p>Error</p>

  return (
    <div>
      <p>Name: {data?.name}</p>
    </div>
  );
};

export default PokemonComponent;
