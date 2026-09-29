import { useState, useMemo } from 'react';
import { SectionTitle } from '../../../../components';
import type { MoveEntry } from '../../types';
import { formatName } from '../../utils';
import styles from './Moves.module.css';

interface MovesProps {
  moves: MoveEntry[];
}

const METHODS = ['level-up', 'machine', 'egg', 'tutor'] as const;
const METHOD_LABELS: Record<string, string> = {
  'level-up': 'Level Up',
  'machine': 'TM/HM',
  'egg': 'Egg',
  'tutor': 'Tutor',
};

const PAGE_SIZE = 20;

export function Moves({ moves }: MovesProps) {
  const [activeMethod, setActiveMethod] = useState<string>('level-up');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCount, setShowCount] = useState(PAGE_SIZE);

  // Get the latest version group to reduce duplicates
  const latestVersionMoves = useMemo(() => {
    const byName = new Map<string, MoveEntry>();
    for (const move of moves) {
      const key = `${move.name}-${move.learnMethod}`;
      const existing = byName.get(key);
      if (!existing || move.versionGroup > existing.versionGroup) {
        byName.set(key, move);
      }
    }
    return Array.from(byName.values());
  }, [moves]);

  const filteredMoves = useMemo(() => {
    let result = latestVersionMoves.filter(m => m.learnMethod === activeMethod);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(m => m.name.includes(q));
    }
    // Sort by level for level-up, alphabetically for others
    if (activeMethod === 'level-up') {
      result.sort((a, b) => a.levelLearnedAt - b.levelLearnedAt || a.name.localeCompare(b.name));
    } else {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }
    return result;
  }, [latestVersionMoves, activeMethod, searchQuery]);

  const visibleMoves = filteredMoves.slice(0, showCount);

  // Count per method for tab badges
  const methodCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const m of latestVersionMoves) {
      counts[m.learnMethod] = (counts[m.learnMethod] ?? 0) + 1;
    }
    return counts;
  }, [latestVersionMoves]);

  return (
    <section className={styles.section} aria-label="Moves">
      <SectionTitle id="moves">Moves</SectionTitle>

      <div className={styles.tabs} role="tablist">
        {METHODS.map(method => {
          const count = methodCounts[method] ?? 0;
          if (count === 0) return null;
          return (
            <button
              key={method}
              type="button"
              role="tab"
              aria-selected={activeMethod === method}
              className={`${styles.tab} ${activeMethod === method ? styles.activeTab : ''}`}
              onClick={() => {
                setActiveMethod(method);
                setShowCount(PAGE_SIZE);
              }}
            >
              {METHOD_LABELS[method] ?? method}
              <span className={styles.badge}>{count}</span>
            </button>
          );
        })}
      </div>

      <input
        type="text"
        className={styles.search}
        placeholder="Search moves…"
        value={searchQuery}
        onChange={e => {
          setSearchQuery(e.target.value);
          setShowCount(PAGE_SIZE);
        }}
      />

      <div className={styles.list} role="tabpanel">
        {visibleMoves.map((move, idx) => (
          <div key={`${move.name}-${idx}`} className={styles.moveRow}>
            <span className={styles.moveName}>{formatName(move.name)}</span>
            {activeMethod === 'level-up' && move.levelLearnedAt > 0 && (
              <span className={styles.level}>Lv. {move.levelLearnedAt}</span>
            )}
          </div>
        ))}

        {visibleMoves.length === 0 && (
          <p className={styles.empty}>No moves found.</p>
        )}
      </div>

      {showCount < filteredMoves.length && (
        <button
          type="button"
          className={styles.showMore}
          onClick={() => setShowCount(prev => prev + PAGE_SIZE)}
        >
          Show more ({filteredMoves.length - showCount} remaining)
        </button>
      )}
    </section>
  );
}
