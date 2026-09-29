/**
 * Raw API response types from PokéAPI.
 * Only the fields we actually use are typed — the API returns much more.
 */

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  results: NamedAPIResource[];
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
  front_female: string | null;
  front_shiny_female: string | null;
  back_female: string | null;
  back_shiny_female: string | null;
  other?: {
    'official-artwork'?: {
      front_default: string | null;
      front_shiny: string | null;
    };
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

export interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonAbility {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonMoveVersion {
  level_learned_at: number;
  move_learn_method: NamedAPIResource;
  version_group: NamedAPIResource;
}

export interface PokemonMove {
  move: NamedAPIResource;
  version_group_details: PokemonMoveVersion[];
}

export interface PokemonCries {
  latest: string | null;
  legacy: string | null;
}

export interface PokemonResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number | null;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
  abilities: PokemonAbility[];
  moves: PokemonMove[];
  cries: PokemonCries;
  species: NamedAPIResource;
  forms: NamedAPIResource[];
}

// ── Species ──

export interface FlavorTextEntry {
  flavor_text: string;
  language: NamedAPIResource;
  version: NamedAPIResource;
}

export interface Genus {
  genus: string;
  language: NamedAPIResource;
}

export interface PokemonSpeciesVariety {
  is_default: boolean;
  pokemon: NamedAPIResource;
}

export interface PalParkEncounter {
  area: NamedAPIResource;
  base_score: number;
  rate: number;
}

export interface PokemonSpeciesResponse {
  id: number;
  name: string;
  flavor_text_entries: FlavorTextEntry[];
  genera: Genus[];
  habitat: NamedAPIResource | null;
  color: NamedAPIResource;
  generation: NamedAPIResource;
  growth_rate: NamedAPIResource;
  capture_rate: number;
  base_happiness: number | null;
  gender_rate: number;
  egg_groups: NamedAPIResource[];
  is_legendary: boolean;
  is_mythical: boolean;
  evolution_chain: { url: string } | null;
  varieties: PokemonSpeciesVariety[];
}

// ── Evolution Chain ──

export interface EvolutionDetail {
  gender: number | null;
  held_item: NamedAPIResource | null;
  item: NamedAPIResource | null;
  known_move: NamedAPIResource | null;
  known_move_type: NamedAPIResource | null;
  location: NamedAPIResource | null;
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  min_level: number | null;
  needs_overworld_rain: boolean;
  party_species: NamedAPIResource | null;
  party_type: NamedAPIResource | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: NamedAPIResource | null;
  trigger: NamedAPIResource;
  turn_upside_down: boolean;
}

export interface ChainLink {
  is_baby: boolean;
  species: NamedAPIResource;
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
}

export interface EvolutionChainResponse {
  id: number;
  chain: ChainLink;
}

// ── Type ──

export interface TypeRelations {
  double_damage_from: NamedAPIResource[];
  double_damage_to: NamedAPIResource[];
  half_damage_from: NamedAPIResource[];
  half_damage_to: NamedAPIResource[];
  no_damage_from: NamedAPIResource[];
  no_damage_to: NamedAPIResource[];
}

export interface TypeResponse {
  id: number;
  name: string;
  damage_relations: TypeRelations;
}

// ── Ability ──

export interface AbilityEffectEntry {
  effect: string;
  language: NamedAPIResource;
  short_effect: string;
}

export interface AbilityFlavorTextEntry {
  flavor_text: string;
  language: NamedAPIResource;
  version_group: NamedAPIResource;
}

export interface AbilityResponse {
  id: number;
  name: string;
  effect_entries: AbilityEffectEntry[];
  flavor_text_entries: AbilityFlavorTextEntry[];
}
