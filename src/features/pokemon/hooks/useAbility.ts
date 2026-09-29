import { useQuery } from '@tanstack/react-query';
import { fetchAbility } from '../api';
import type { AbilityDetail } from '../types';
import { findEnglish } from '../utils';

export function useAbility(name: string) {
  return useQuery({
    queryKey: ['ability', name],
    queryFn: () => fetchAbility(name),
    select: (raw): AbilityDetail => {
      const entry = findEnglish(raw.effect_entries);
      return {
        name: raw.name,
        shortEffect: entry?.short_effect ?? 'No description available.',
        effect: entry?.effect ?? 'No description available.',
      };
    },
    enabled: name.length > 0,
  });
}
