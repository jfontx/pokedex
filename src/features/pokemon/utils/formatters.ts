/**
 * Cleans PokéAPI flavor text: removes form-feed (\f), newlines (\n),
 * and collapses extra whitespace.
 */
export function cleanFlavorText(text: string): string {
  return text
    .replace(/\f/g, ' ')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Capitalize first letter of each word, replacing hyphens with spaces. */
export function formatName(name: string): string {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/** Format Pokédex number as #0025. */
export function formatDexNumber(id: number): string {
  return `#${String(id).padStart(4, '0')}`;
}

/** Convert decimeters to meters. */
export function formatHeight(decimeters: number): string {
  return `${(decimeters / 10).toFixed(1)} m`;
}

/** Convert hectograms to kilograms. */
export function formatWeight(hectograms: number): string {
  return `${(hectograms / 10).toFixed(1)} kg`;
}

/**
 * Compute male/female percentages from the PokéAPI gender_rate.
 * -1 means genderless. Otherwise it's in eighths (female ratio).
 */
export function formatGenderRate(rate: number): { male: number; female: number } | null {
  if (rate === -1) return null;
  const female = (rate / 8) * 100;
  return { male: 100 - female, female };
}

/** Extract an ID from a PokéAPI URL like "https://pokeapi.co/api/v2/evolution-chain/67/" */
export function extractIdFromUrl(url: string): number {
  const parts = url.replace(/\/$/, '').split('/');
  const id = parts[parts.length - 1];
  return parseInt(id ?? '0', 10);
}

/** Get the English entry from a localized array. */
export function findEnglish<T extends { language: { name: string } }>(
  entries: T[]
): T | undefined {
  return entries.find(e => e.language.name === 'en');
}

/** Get all English entries from a localized array. */
export function filterEnglish<T extends { language: { name: string } }>(
  entries: T[]
): T[] {
  return entries.filter(e => e.language.name === 'en');
}

/** Get the sprite URL for a Pokémon by its name or ID. */
export function getSpriteUrl(id: number | string): string {
  const numId = typeof id === 'string' ? extractIdFromUrl(`https://pokeapi.co/api/v2/pokemon/${id}/`) : id;
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numId}.png`;
}
