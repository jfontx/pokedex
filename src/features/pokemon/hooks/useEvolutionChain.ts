import { useQuery } from '@tanstack/react-query';
import { fetchEvolutionChain } from '../api';
import { parseEvolutionChain } from '../utils';

export function useEvolutionChain(chainId: number | null) {
  return useQuery({
    queryKey: ['evolution-chain', chainId],
    queryFn: () => fetchEvolutionChain(chainId!),
    select: (data) => parseEvolutionChain(data.chain),
    enabled: chainId !== null && chainId > 0,
  });
}
