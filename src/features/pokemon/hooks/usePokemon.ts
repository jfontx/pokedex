import { useQuery } from '@tanstack/react-query';
import { fetchPokemon } from '../api';
import { mapPokemonResponse } from '../utils';

export function usePokemon(nameOrId: string) {
  return useQuery({
    queryKey: ['pokemon', nameOrId],
    queryFn: () => fetchPokemon(nameOrId),
    select: mapPokemonResponse,
    enabled: nameOrId.length > 0,
  });
}
