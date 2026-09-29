import { SectionTitle } from '../../../../components';
import { useInView } from '../../../../hooks';
import { STAT_LABELS, MAX_BASE_STAT } from '../../constants';
import type { StatEntry } from '../../types';
import styles from './BaseStats.module.css';

interface BaseStatsProps {
  stats: StatEntry[];
}

function getStatColor(value: number): string {
  if (value < 30) return 'var(--stat-low)';
  if (value < 60) return 'var(--stat-mid-low)';
  if (value < 90) return 'var(--stat-mid)';
  if (value < 120) return 'var(--stat-mid-high)';
  if (value < 150) return 'var(--stat-high)';
  return 'var(--stat-max)';
}

export function BaseStats({ stats }: BaseStatsProps) {
  const [ref, inView] = useInView();
  const total = stats.reduce((sum, s) => sum + s.baseStat, 0);

  return (
    <section className={styles.section} aria-label="Base Stats" ref={ref}>
      <SectionTitle id="base-stats">Base Stats</SectionTitle>

      <div className={styles.statsGrid}>
        {stats.map((stat, idx) => {
          const label = STAT_LABELS[stat.name] ?? stat.name;
          const percentage = (stat.baseStat / MAX_BASE_STAT) * 100;
          const color = getStatColor(stat.baseStat);

          return (
            <div key={stat.name} className={styles.statRow}>
              <span className={styles.statLabel}>{label}</span>
              <span className={styles.statValue}>{stat.baseStat}</span>
              <div className={styles.barContainer}>
                <div
                  className={styles.barFill}
                  style={{
                    width: inView ? `${percentage}%` : '0%',
                    backgroundColor: color,
                    transitionDelay: `${idx * 100}ms`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.total}>
        <span className={styles.totalLabel}>Total</span>
        <span className={styles.totalValue}>{total}</span>
      </div>

      {/* SVG Radar Chart */}
      <div className={styles.radarContainer}>
        <svg viewBox="0 0 200 200" className={styles.radar} aria-label="Stats radar chart">
          {/* Background hexagon rings */}
          {[1, 0.75, 0.5, 0.25].map(scale => (
            <polygon
              key={scale}
              points={getHexagonPoints(100, 100, 80 * scale)}
              className={styles.radarRing}
            />
          ))}
          {/* Stat polygon */}
          <polygon
            points={stats.map((stat, i) => {
              const angle = (Math.PI * 2 * i) / stats.length - Math.PI / 2;
              const radius = (stat.baseStat / MAX_BASE_STAT) * 80;
              const x = 100 + radius * Math.cos(angle);
              const y = 100 + radius * Math.sin(angle);
              return `${x},${y}`;
            }).join(' ')}
            className={styles.radarFill}
            style={{ opacity: inView ? 1 : 0 }}
          />
          {/* Labels */}
          {stats.map((stat, i) => {
            const angle = (Math.PI * 2 * i) / stats.length - Math.PI / 2;
            const x = 100 + 95 * Math.cos(angle);
            const y = 100 + 95 * Math.sin(angle);
            const label = STAT_LABELS[stat.name] ?? stat.name;
            return (
              <text
                key={stat.name}
                x={x}
                y={y}
                className={styles.radarLabel}
                textAnchor="middle"
                dominantBaseline="central"
              >
                {label}
              </text>
            );
          })}
        </svg>
      </div>
    </section>
  );
}

function getHexagonPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(' ');
}
