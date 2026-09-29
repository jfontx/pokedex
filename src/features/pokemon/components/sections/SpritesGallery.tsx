import { SectionTitle } from '../../../../components';
import type { PokemonOverview } from '../../types';
import styles from './SpritesGallery.module.css';

interface SpritesGalleryProps {
  pokemon: PokemonOverview;
}

interface SpriteItem {
  url: string;
  label: string;
}

export function SpritesGallery({ pokemon }: SpritesGalleryProps) {
  const sprites: SpriteItem[] = [
    pokemon.sprites.frontDefault && { url: pokemon.sprites.frontDefault, label: 'Front' },
    pokemon.sprites.backDefault && { url: pokemon.sprites.backDefault, label: 'Back' },
    pokemon.sprites.frontShiny && { url: pokemon.sprites.frontShiny, label: 'Front Shiny' },
    pokemon.sprites.backShiny && { url: pokemon.sprites.backShiny, label: 'Back Shiny' },
    pokemon.sprites.frontFemale && { url: pokemon.sprites.frontFemale, label: 'Front ♀' },
    pokemon.sprites.backFemale && { url: pokemon.sprites.backFemale, label: 'Back ♀' },
    pokemon.sprites.frontShinyFemale && { url: pokemon.sprites.frontShinyFemale, label: 'Front Shiny ♀' },
    pokemon.sprites.backShinyFemale && { url: pokemon.sprites.backShinyFemale, label: 'Back Shiny ♀' },
  ].filter((s): s is SpriteItem => Boolean(s));

  if (sprites.length === 0) return null;

  return (
    <section className={styles.section} aria-label="Sprites Gallery">
      <SectionTitle id="sprites">Sprites Gallery</SectionTitle>

      <div className={styles.grid}>
        {sprites.map(sprite => (
          <div key={sprite.label} className={styles.card}>
            <img
              src={sprite.url}
              alt={`${pokemon.name} ${sprite.label}`}
              className={styles.sprite}
              width="96"
              height="96"
              loading="lazy"
            />
            <span className={styles.label}>{sprite.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
