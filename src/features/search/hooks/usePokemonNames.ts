import { useQuery } from '@tanstack/react-query';
import { fetchAllPokemonNames } from '../../pokemon/api';

export interface PokemonNameEntry {
  name: string;
  id: number;
}

/**
 * Fetches and caches the full list of Pokémon names for autocomplete.
 * Parsed once and kept forever (PokéAPI data rarely changes).
 */
export function usePokemonNames() {
  return useQuery({
    queryKey: ['pokemon-names-all'],
    queryFn: fetchAllPokemonNames,
    staleTime: Infinity,
    select: (data): PokemonNameEntry[] =>
      data.results.map((entry, index) => ({
        name: entry.name,
        id: index + 1,
      })),
  });
}
