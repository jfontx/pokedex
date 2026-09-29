import type { PokemonTypeName } from '../types';

/**
 * HSL values for each Pokémon type — used for accent theming and type badges.
 */
export const TYPE_COLORS: Record<PokemonTypeName, { h: number; s: number; l: number; hex: string }> = {
  normal:   { h: 60,  s: 17, l: 57, hex: '#a8a77a' },
  fire:     { h: 25,  s: 84, l: 56, hex: '#ee8130' },
  water:    { h: 222, s: 82, l: 67, hex: '#6390f0' },
  electric: { h: 48,  s: 93, l: 57, hex: '#f7d02c' },
  grass:    { h: 100, s: 50, l: 54, hex: '#7ac74c' },
  ice:      { h: 176, s: 42, l: 72, hex: '#96d9d6' },
  fighting: { h: 2,   s: 65, l: 46, hex: '#c22e28' },
  poison:   { h: 302, s: 44, l: 44, hex: '#a33ea1' },
  ground:   { h: 44,  s: 68, l: 64, hex: '#e2bf65' },
  flying:   { h: 255, s: 82, l: 76, hex: '#a98ff3' },
  psychic:  { h: 342, s: 93, l: 65, hex: '#f95587' },
  bug:      { h: 66,  s: 75, l: 41, hex: '#a6b91a' },
  rock:     { h: 49,  s: 55, l: 46, hex: '#b6a136' },
  ghost:    { h: 263, s: 27, l: 47, hex: '#735797' },
  dragon:   { h: 259, s: 96, l: 60, hex: '#6f35fc' },
  dark:     { h: 21,  s: 17, l: 36, hex: '#705746' },
  steel:    { h: 240, s: 19, l: 76, hex: '#b7b7ce' },
  fairy:    { h: 330, s: 36, l: 67, hex: '#d685ad' },
};

export const STAT_LABELS: Record<string, string> = {
  'hp': 'HP',
  'attack': 'Attack',
  'defense': 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  'speed': 'Speed',
};

/** Maximum possible base stat value (for bar width calculation). */
export const MAX_BASE_STAT = 255;
