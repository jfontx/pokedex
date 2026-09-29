import type {
  PokemonResponse,
  PokemonSpeciesResponse,
  EvolutionChainResponse,
  TypeResponse,
  AbilityResponse,
  PokemonListResponse,
} from '../types';

const BASE_URL = 'https://pokeapi.co/api/v2';

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`PokéAPI error: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export function fetchPokemon(nameOrId: string | number): Promise<PokemonResponse> {
  return fetchJson<PokemonResponse>(`${BASE_URL}/pokemon/${nameOrId}`);
}

export function fetchPokemonSpecies(nameOrId: string | number): Promise<PokemonSpeciesResponse> {
  return fetchJson<PokemonSpeciesResponse>(`${BASE_URL}/pokemon-species/${nameOrId}`);
}

export function fetchEvolutionChain(id: number): Promise<EvolutionChainResponse> {
  return fetchJson<EvolutionChainResponse>(`${BASE_URL}/evolution-chain/${id}`);
}

export function fetchType(name: string): Promise<TypeResponse> {
  return fetchJson<TypeResponse>(`${BASE_URL}/type/${name}`);
}

export function fetchAbility(name: string): Promise<AbilityResponse> {
  return fetchJson<AbilityResponse>(`${BASE_URL}/ability/${name}`);
}

export function fetchAllPokemonNames(): Promise<PokemonListResponse> {
  return fetchJson<PokemonListResponse>(`${BASE_URL}/pokemon?limit=100000&offset=0`);
}
