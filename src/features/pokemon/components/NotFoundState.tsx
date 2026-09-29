import { SearchX } from 'lucide-react';
import { usePokemonNames } from '../../search/hooks';
import { formatName } from '../utils';
import styles from './NotFoundState.module.css';

interface NotFoundStateProps {
  query: string;
  onSelect: (name: string) => void;
}

export function NotFoundState({ query, onSelect }: NotFoundStateProps) {
  const { data: names } = usePokemonNames();

  // Find suggestions based on Levenshtein distance or simple includes
  const suggestions = names
    ? names
        .filter(n => n.name.includes(query) || query.includes(n.name))
        .slice(0, 5)
    : [];

  return (
    <div className={styles.container}>
      <SearchX className={styles.icon} size={64} />
      <h2 className={styles.title}>Pokémon Not Found</h2>
      <p className={styles.message}>We couldn't find any Pokémon matching "{query}".</p>

      {suggestions.length > 0 && (
        <div className={styles.suggestionsContainer}>
          <p className={styles.suggestionsTitle}>Did you mean?</p>
          <div className={styles.chips}>
            {suggestions.map(s => (
              <button
                key={s.name}
                type="button"
                className={styles.chip}
                onClick={() => onSelect(s.name)}
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${s.id}.png`}
                  alt=""
                  width="24"
                  height="24"
                  className={styles.sprite}
                  loading="lazy"
                />
                {formatName(s.name)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
