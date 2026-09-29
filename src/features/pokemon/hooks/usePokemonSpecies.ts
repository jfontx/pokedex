import { useQuery } from '@tanstack/react-query';
import { fetchPokemonSpecies } from '../api';
import { mapSpeciesResponse } from '../utils';

export function usePokemonSpecies(nameOrId: string) {
  return useQuery({
    queryKey: ['pokemon-species', nameOrId],
    queryFn: () => fetchPokemonSpecies(nameOrId),
    select: mapSpeciesResponse,
    enabled: nameOrId.length > 0,
  });
}
