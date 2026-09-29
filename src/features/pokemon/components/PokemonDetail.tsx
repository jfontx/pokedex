import { usePokemon, usePokemonSpecies } from '../hooks';
import { TYPE_COLORS } from '../constants';
import { PokeballLoader, ErrorState } from '../../../components';
import { Hero } from './sections/Hero';
import { PokedexEntry } from './sections/PokedexEntry';
import { BaseStats } from './sections/BaseStats';
import { PhysicalInfo } from './sections/PhysicalInfo';
import { Abilities } from './sections/Abilities';
import { TypeMatchupsSection } from './sections/TypeMatchups';
import { EvolutionChainSection } from './sections/EvolutionChain';
import { SpritesGallery } from './sections/SpritesGallery';
import { Moves } from './sections/Moves';
import { Forms } from './sections/Forms';
import { SectionNav } from './SectionNav';
import styles from './PokemonDetail.module.css';
import { useEffect } from 'react';

interface PokemonDetailProps {
  name: string;
  onSelect: (name: string) => void;
}

export function PokemonDetail({ name, onSelect }: PokemonDetailProps) {
  const { data: pokemon, isLoading, isError, error, refetch } = usePokemon(name);
  const { data: species } = usePokemonSpecies(pokemon?.speciesName ?? name);

  // Dynamic theming by primary type
  useEffect(() => {
    if (!pokemon || pokemon.types.length === 0) return;

    const primaryType = pokemon.types[0];
    if (!primaryType) return;
    const colors = TYPE_COLORS[primaryType];

    document.documentElement.style.setProperty('--accent-h', String(colors.h));
    document.documentElement.style.setProperty('--accent-s', `${colors.s}%`);
    document.documentElement.style.setProperty('--accent-l', `${colors.l}%`);

    return () => {
      document.documentElement.style.removeProperty('--accent-h');
      document.documentElement.style.removeProperty('--accent-s');
      document.documentElement.style.removeProperty('--accent-l');
    };
  }, [pokemon]);

  if (isLoading) {
    return <PokeballLoader />;
  }

  if (isError) {
    const is404 = error?.message?.includes('404');
    return (
      <ErrorState
        message={is404 ? `Pokémon "${name}" not found.` : 'Failed to load Pokémon data.'}
        onRetry={is404 ? undefined : () => refetch()}
      />
    );
  }

  if (!pokemon) return null;

  return (
    <div className={styles.container}>
      <SectionNav />

      <div className={styles.sections}>
        <Hero pokemon={pokemon} species={species} />
        {species && <PokedexEntry entries={species.flavorTextEntries} />}
        <BaseStats stats={pokemon.stats} />
        {species && <PhysicalInfo pokemon={pokemon} species={species} />}
        <Abilities abilities={pokemon.abilities} />
        <TypeMatchupsSection types={pokemon.types} />
        {species && (
          <EvolutionChainSection
            chainId={species.evolutionChainId}
            currentPokemon={species.name}
            onSelect={onSelect}
          />
        )}
        <SpritesGallery pokemon={pokemon} />
        <Moves moves={pokemon.moves} />
        {species && (
          <Forms
            varieties={species.varieties}
            currentPokemon={pokemon.name}
            onSelect={onSelect}
          />
        )}
      </div>
    </div>
  );
}
