import type { PokemonResponse } from '../types/api';
import type { PokemonOverview, PokemonTypeName } from '../types/domain';

/**
 * Map the raw PokéAPI PokemonResponse into our clean domain model.
 */
export function mapPokemonResponse(raw: PokemonResponse): PokemonOverview {
  return {
    id: raw.id,
    name: raw.name,
    types: raw.types
      .sort((a, b) => a.slot - b.slot)
      .map(t => t.type.name as PokemonTypeName),
    sprites: {
      officialArtwork: raw.sprites.other?.['official-artwork']?.front_default ?? null,
      officialArtworkShiny: raw.sprites.other?.['official-artwork']?.front_shiny ?? null,
      frontDefault: raw.sprites.front_default,
      frontShiny: raw.sprites.front_shiny,
      backDefault: raw.sprites.back_default,
      backShiny: raw.sprites.back_shiny,
      frontFemale: raw.sprites.front_female,
      frontShinyFemale: raw.sprites.front_shiny_female,
      backFemale: raw.sprites.back_female,
      backShinyFemale: raw.sprites.back_shiny_female,
    },
    stats: raw.stats.map(s => ({
      name: s.stat.name,
      baseStat: s.base_stat,
      effort: s.effort,
    })),
    abilities: raw.abilities
      .sort((a, b) => a.slot - b.slot)
      .map(a => ({
        name: a.ability.name,
        isHidden: a.is_hidden,
      })),
    moves: raw.moves.flatMap(m =>
      m.version_group_details.map(vg => ({
        name: m.move.name,
        learnMethod: vg.move_learn_method.name,
        levelLearnedAt: vg.level_learned_at,
        versionGroup: vg.version_group.name,
      }))
    ),
    height: raw.height,
    weight: raw.weight,
    baseExperience: raw.base_experience,
    cryUrl: raw.cries.latest,
    speciesName: raw.species.name,
    forms: raw.forms.map(f => f.name),
  };
}
