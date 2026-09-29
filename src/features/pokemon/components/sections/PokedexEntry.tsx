import { useState } from 'react';
import { SectionTitle } from '../../../../components';
import type { FlavorEntry } from '../../types';
import { formatName } from '../../utils';
import styles from './PokedexEntry.module.css';

interface PokedexEntryProps {
  entries: FlavorEntry[];
}

export function PokedexEntry({ entries }: PokedexEntryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (entries.length === 0) return null;

  const currentEntry = entries[selectedIndex] ?? entries[0];

  return (
    <section className={styles.section} aria-label="Pokédex Entry">
      <SectionTitle id="pokedex-entry">Pokédex Entry</SectionTitle>

      <blockquote className={styles.quote}>
        <p className={styles.text}>{currentEntry?.text}</p>
      </blockquote>

      {entries.length > 1 && (
        <div className={styles.versions}>
          <label htmlFor="version-select" className={styles.label}>
            Game version:
          </label>
          <select
            id="version-select"
            className={styles.select}
            value={selectedIndex}
            onChange={e => setSelectedIndex(Number(e.target.value))}
          >
            {entries.map((entry, idx) => (
              <option key={`${entry.versionName}-${idx}`} value={idx}>
                {formatName(entry.versionName)}
              </option>
            ))}
          </select>
        </div>
      )}
    </section>
  );
}
