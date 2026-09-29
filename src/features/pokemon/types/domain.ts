/**
 * Domain types — cleaned and shaped for UI consumption.
 * Components should use these, never raw API types.
 */

export type PokemonTypeName =
  | 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice'
  | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug'
  | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy';

export interface PokemonOverview {
  id: number;
  name: string;
  types: PokemonTypeName[];
  sprites: {
    officialArtwork: string | null;
    officialArtworkShiny: string | null;
    frontDefault: string | null;
    frontShiny: string | null;
    backDefault: string | null;
    backShiny: string | null;
    frontFemale: string | null;
    frontShinyFemale: string | null;
    backFemale: string | null;
    backShinyFemale: string | null;
  };
  stats: StatEntry[];
  abilities: AbilityEntry[];
  moves: MoveEntry[];
  height: number;  // in decimeters
  weight: number;  // in hectograms
  baseExperience: number | null;
  cryUrl: string | null;
  speciesName: string;
  forms: string[];
}

export interface StatEntry {
  name: string;
  baseStat: number;
  effort: number;
}

export interface AbilityEntry {
  name: string;
  isHidden: boolean;
}

export interface MoveEntry {
  name: string;
  learnMethod: string;
  levelLearnedAt: number;
  versionGroup: string;
}

export interface SpeciesInfo {
  id: number;
  name: string;
  genus: string;
  flavorTextEntries: FlavorEntry[];
  habitat: string | null;
  color: string;
  generation: string;
  growthRate: string;
  captureRate: number;
  baseHappiness: number | null;
  genderRate: number; // -1 = genderless, otherwise eighths female
  eggGroups: string[];
  isLegendary: boolean;
  isMythical: boolean;
  evolutionChainId: number | null;
  varieties: VarietyEntry[];
}

export interface FlavorEntry {
  text: string;
  versionName: string;
}

export interface VarietyEntry {
  name: string;
  isDefault: boolean;
}

export interface EvolutionNode {
  speciesName: string;
  spriteUrl: string | null;
  trigger: string | null;
  triggerDetail: string | null;
  children: EvolutionNode[];
}

export interface TypeMatchups {
  quadrupleWeaknesses: PokemonTypeName[];
  doubleWeaknesses: PokemonTypeName[];
  halfResistances: PokemonTypeName[];
  quarterResistances: PokemonTypeName[];
  immunities: PokemonTypeName[];
  neutral: PokemonTypeName[];
}

export interface AbilityDetail {
  name: string;
  shortEffect: string;
  effect: string;
}
