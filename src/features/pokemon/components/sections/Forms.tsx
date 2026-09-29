import { SectionTitle } from '../../../../components';
import type { VarietyEntry } from '../../types';
import { formatName } from '../../utils';
import styles from './Forms.module.css';

interface FormsProps {
  varieties: VarietyEntry[];
  currentPokemon: string;
  onSelect: (name: string) => void;
}

export function Forms({ varieties, currentPokemon, onSelect }: FormsProps) {
  // Only show if there are alternate forms beyond the default
  const alternates = varieties.filter(v => !v.isDefault);
  if (alternates.length === 0) return null;

  return (
    <section className={styles.section} aria-label="Forms & Varieties">
      <SectionTitle id="forms">Forms &amp; Varieties</SectionTitle>

      <div className={styles.grid}>
        {varieties.map(variety => {
          const isCurrent = variety.name === currentPokemon;
          // Extract pokemon ID from the name for the sprite
          return (
            <button
              key={variety.name}
              type="button"
              className={`${styles.card} ${isCurrent ? styles.current : ''}`}
              onClick={() => onSelect(variety.name)}
              aria-label={`View ${formatName(variety.name)}`}
              aria-current={isCurrent ? 'true' : undefined}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${variety.name}.png`}
                alt={formatName(variety.name)}
                className={styles.sprite}
                width="80"
                height="80"
                loading="lazy"
                onError={e => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className={styles.name}>{formatName(variety.name)}</span>
              {variety.isDefault && <span className={styles.defaultBadge}>Default</span>}
            </button>
          );
        })}
      </div>
    </section>
  );
}
