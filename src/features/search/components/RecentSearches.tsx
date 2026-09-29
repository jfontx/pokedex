import { Clock } from 'lucide-react';
import { formatName } from '../../pokemon/utils';
import styles from './RecentSearches.module.css';

interface RecentSearchesProps {
  searches: string[];
  onSelect: (name: string) => void;
  onClear: () => void;
}

export function RecentSearches({ searches, onSelect, onClear }: RecentSearchesProps) {
  if (searches.length === 0) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Clock size={14} className={styles.icon} />
        <span className={styles.label}>Recent</span>
        <button type="button" className={styles.clearAll} onClick={onClear}>
          Clear all
        </button>
      </div>
      <div className={styles.chips}>
        {searches.map(name => (
          <button
            key={name}
            type="button"
            className={styles.chip}
            onClick={() => onSelect(name)}
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${name}.png`}
              alt=""
              className={styles.sprite}
              width="20"
              height="20"
              loading="lazy"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            {formatName(name)}
          </button>
        ))}
      </div>
    </div>
  );
}
