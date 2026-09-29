import { describe, it, expect } from 'vitest';
import { getSearchSuggestions } from './index';

describe('getSearchSuggestions', () => {
  const mockNames = [
    { name: 'bulbasaur', id: 1 },
    { name: 'ivysaur', id: 2 },
    { name: 'venusaur', id: 3 },
    { name: 'charmander', id: 4 },
    { name: 'pikachu', id: 25 },
    { name: 'raichu', id: 26 },
    { name: 'pichu', id: 172 },
  ];

  it('returns empty array when query is empty', () => {
    expect(getSearchSuggestions(mockNames, '')).toEqual([]);
  });

  it('matches by ID when query is numeric', () => {
    const result = getSearchSuggestions(mockNames, '25');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('pikachu');
  });

  it('prioritizes names starting with the query', () => {
    const result = getSearchSuggestions(mockNames, 'pi');
    // 'pikachu' and 'pichu' start with 'pi'
    expect(result.map(r => r.name)).toEqual(['pikachu', 'pichu']);
  });

  it('falls back to includes if not startsWith', () => {
    const result = getSearchSuggestions(mockNames, 'saur');
    expect(result.map(r => r.name)).toEqual(['bulbasaur', 'ivysaur', 'venusaur']);
  });

  it('limits results to maxResults', () => {
    const result = getSearchSuggestions(mockNames, 'a', 2);
    // 'bulbasaur', 'ivysaur', 'venusaur', 'charmander', 'pikachu', 'raichu' all have 'a'
    expect(result).toHaveLength(2);
  });
});
