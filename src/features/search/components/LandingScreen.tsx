import { formatName, formatDexNumber } from '../../pokemon/utils';
import styles from './LandingScreen.module.css';

interface LandingScreenProps {
  onSelect: (name: string) => void;
}

const FEATURED_POKEMON = [
  { name: 'pikachu', id: 25 },
  { name: 'charizard', id: 6 },
  { name: 'eevee', id: 133 },
  { name: 'mewtwo', id: 150 },
  { name: 'gardevoir', id: 282 },
  { name: 'lucario', id: 448 },
];

export function LandingScreen({ onSelect }: LandingScreenProps) {
  return (
    <div className={styles.container}>
      {/* Animated background pattern */}
      <div className={styles.bgPattern} aria-hidden="true">
        <div className={styles.pokeball1} />
        <div className={styles.pokeball2} />
        <div className={styles.pokeball3} />
      </div>

      <div className={styles.hero}>
        <h1 className={styles.title}>
          Discover the World of Pokémon
        </h1>
        <p className={styles.subtitle}>
          Search any Pokémon to explore their stats, abilities, evolutions, and more.
          Your personal Pokédex awaits!
        </p>
      </div>

      <section className={styles.featured}>
        <h2 className={styles.featuredTitle}>Featured Pokémon</h2>
        <div className={styles.grid}>
          {FEATURED_POKEMON.map(pokemon => (
            <button
              key={pokemon.name}
              type="button"
              className={styles.card}
              onClick={() => onSelect(pokemon.name)}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={formatName(pokemon.name)}
                className={styles.artwork}
                width="120"
                height="120"
                loading="lazy"
              />
              <span className={styles.cardName}>{formatName(pokemon.name)}</span>
              <span className={styles.cardId}>{formatDexNumber(pokemon.id)}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
