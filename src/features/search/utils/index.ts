import type { PokemonNameEntry } from '../hooks/usePokemonNames';

export function getSearchSuggestions(
  allNames: PokemonNameEntry[],
  query: string,
  maxResults: number = 8
): PokemonNameEntry[] {
  if (!allNames || query.length === 0) return [];

  const isNumeric = /^\d+$/.test(query);
  if (isNumeric) {
    const num = parseInt(query, 10);
    return allNames.filter(p => p.id === num).slice(0, maxResults);
  }

  const startsWith: PokemonNameEntry[] = [];
  const contains: PokemonNameEntry[] = [];

  for (const p of allNames) {
    if (p.name.startsWith(query)) {
      startsWith.push(p);
    } else if (p.name.includes(query)) {
      contains.push(p);
    }
    if (startsWith.length + contains.length >= maxResults) break;
  }

  return [...startsWith, ...contains].slice(0, maxResults);
}
