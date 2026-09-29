import { useState, useRef } from 'react';
import { Volume2, Sparkles, Star, Crown } from 'lucide-react';
import { TypeBadge } from '../../../../components';
import { formatName, formatDexNumber } from '../../utils';
import type { PokemonOverview, SpeciesInfo } from '../../types';
import styles from './Hero.module.css';

interface HeroProps {
  pokemon: PokemonOverview;
  species: SpeciesInfo | undefined;
}

export function Hero({ pokemon, species }: HeroProps) {
  const [isShiny, setIsShiny] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const artwork = isShiny
    ? (pokemon.sprites.officialArtworkShiny ?? pokemon.sprites.officialArtwork)
    : pokemon.sprites.officialArtwork;

  const handlePlayCry = () => {
    if (!pokemon.cryUrl) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(pokemon.cryUrl);
    audioRef.current = audio;
    setIsPlaying(true);

    audio.play().catch(() => setIsPlaying(false));
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => setIsPlaying(false);
  };

  return (
    <section className={styles.hero} aria-label="Pokémon overview">
      <div className={styles.artworkContainer}>
        <div className={styles.artworkGlow} aria-hidden="true" />
        {artwork && (
          <img
            key={`${pokemon.name}-${isShiny ? 'shiny' : 'normal'}`}
            src={artwork}
            alt={`${formatName(pokemon.name)}${isShiny ? ' (shiny)' : ''} official artwork`}
            className={styles.artwork}
            width="280"
            height="280"
          />
        )}
      </div>

      <div className={styles.info}>
        <span className={styles.dexNumber}>{formatDexNumber(pokemon.id)}</span>
        <h1 className={styles.name}>{formatName(pokemon.name)}</h1>
        {species && <p className={styles.genus}>{species.genus}</p>}

        <div className={styles.types}>
          {pokemon.types.map(type => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>

        <div className={styles.badges}>
          {species?.isLegendary && (
            <span className={styles.legendaryBadge}>
              <Star size={14} /> Legendary
            </span>
          )}
          {species?.isMythical && (
            <span className={styles.mythicalBadge}>
              <Crown size={14} /> Mythical
            </span>
          )}
        </div>

        <div className={styles.actions}>
          {pokemon.cryUrl && (
            <button
              type="button"
              className={`${styles.actionButton} ${isPlaying ? styles.playing : ''}`}
              onClick={handlePlayCry}
              aria-label="Play Pokémon cry"
            >
              <Volume2 size={18} />
              <span>{isPlaying ? 'Playing…' : 'Play Cry'}</span>
              {isPlaying && <span className={styles.audioWave} aria-hidden="true" />}
            </button>
          )}
          <button
            type="button"
            className={`${styles.actionButton} ${isShiny ? styles.shinyActive : ''}`}
            onClick={() => setIsShiny(prev => !prev)}
            aria-label={isShiny ? 'Show normal form' : 'Show shiny form'}
            aria-pressed={isShiny}
          >
            <Sparkles size={18} />
            <span>{isShiny ? 'Normal' : 'Shiny'}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
