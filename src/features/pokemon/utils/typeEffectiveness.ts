import type { PokemonTypeName, TypeMatchups } from '../types';
import type { TypeRelations } from '../types/api';

const ALL_TYPES: PokemonTypeName[] = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy',
];

/**
 * Compute defensive type matchups for one or two types.
 *
 * For each attacking type, multiply the multipliers from each defending type's
 * damage relations. Then group by the resulting multiplier.
 */
export function computeTypeMatchups(
  typeRelationsArray: TypeRelations[]
): TypeMatchups {
  const multipliers = new Map<PokemonTypeName, number>();

  // Initialize all types to 1×
  for (const t of ALL_TYPES) {
    multipliers.set(t, 1);
  }

  for (const relations of typeRelationsArray) {
    for (const t of relations.double_damage_from) {
      const current = multipliers.get(t.name as PokemonTypeName) ?? 1;
      multipliers.set(t.name as PokemonTypeName, current * 2);
    }
    for (const t of relations.half_damage_from) {
      const current = multipliers.get(t.name as PokemonTypeName) ?? 1;
      multipliers.set(t.name as PokemonTypeName, current * 0.5);
    }
    for (const t of relations.no_damage_from) {
      multipliers.set(t.name as PokemonTypeName, 0);
    }
  }

  const result: TypeMatchups = {
    quadrupleWeaknesses: [],
    doubleWeaknesses: [],
    halfResistances: [],
    quarterResistances: [],
    immunities: [],
    neutral: [],
  };

  for (const [type, mult] of multipliers) {
    if (mult === 0) result.immunities.push(type);
    else if (mult === 0.25) result.quarterResistances.push(type);
    else if (mult === 0.5) result.halfResistances.push(type);
    else if (mult === 1) result.neutral.push(type);
    else if (mult === 2) result.doubleWeaknesses.push(type);
    else if (mult >= 4) result.quadrupleWeaknesses.push(type);
  }

  return result;
}
