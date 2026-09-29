import { useQueries } from '@tanstack/react-query';
import { fetchType } from '../api';
import type { PokemonTypeName, TypeMatchups } from '../types';
import { computeTypeMatchups } from '../utils';

export function useTypeMatchups(types: PokemonTypeName[]) {
  const queries = useQueries({
    queries: types.map(typeName => ({
      queryKey: ['type', typeName],
      queryFn: () => fetchType(typeName),
    })),
  });

  const isLoading = queries.some(q => q.isLoading);
  const isError = queries.some(q => q.isError);
  const error = queries.find(q => q.error)?.error ?? null;

  let data: TypeMatchups | undefined;
  if (queries.every(q => q.data)) {
    const relations = queries.map(q => q.data!.damage_relations);
    data = computeTypeMatchups(relations);
  }

  return { data, isLoading, isError, error };
}
