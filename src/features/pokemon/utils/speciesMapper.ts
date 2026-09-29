import type { PokemonSpeciesResponse } from '../types/api';
import type { SpeciesInfo } from '../types/domain';
import { cleanFlavorText, extractIdFromUrl, filterEnglish, findEnglish } from './formatters';

/**
 * Map the raw species response to our SpeciesInfo domain model.
 */
export function mapSpeciesResponse(raw: PokemonSpeciesResponse): SpeciesInfo {
  const englishGenus = findEnglish(raw.genera);
  const englishFlavors = filterEnglish(raw.flavor_text_entries);

  // Deduplicate flavor text across versions
  const seenTexts = new Set<string>();
  const uniqueFlavors = englishFlavors.filter(entry => {
    const cleaned = cleanFlavorText(entry.flavor_text);
    if (seenTexts.has(cleaned)) return false;
    seenTexts.add(cleaned);
    return true;
  });

  return {
    id: raw.id,
    name: raw.name,
    genus: englishGenus?.genus ?? '',
    flavorTextEntries: uniqueFlavors.map(entry => ({
      text: cleanFlavorText(entry.flavor_text),
      versionName: entry.version.name,
    })),
    habitat: raw.habitat?.name ?? null,
    color: raw.color.name,
    generation: raw.generation.name,
    growthRate: raw.growth_rate.name,
    captureRate: raw.capture_rate,
    baseHappiness: raw.base_happiness,
    genderRate: raw.gender_rate,
    eggGroups: raw.egg_groups.map(eg => eg.name),
    isLegendary: raw.is_legendary,
    isMythical: raw.is_mythical,
    evolutionChainId: raw.evolution_chain
      ? extractIdFromUrl(raw.evolution_chain.url)
      : null,
    varieties: raw.varieties.map(v => ({
      name: v.pokemon.name,
      isDefault: v.is_default,
    })),
  };
}
