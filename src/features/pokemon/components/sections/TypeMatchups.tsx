import { SectionTitle, TypeBadge } from '../../../../components';
import { useTypeMatchups } from '../../hooks';
import { Skeleton } from '../../../../components';
import type { PokemonTypeName } from '../../types';
import styles from './TypeMatchups.module.css';

interface TypeMatchupsProps {
  types: PokemonTypeName[];
}

export function TypeMatchupsSection({ types }: TypeMatchupsProps) {
  const { data, isLoading, isError } = useTypeMatchups(types);

  return (
    <section className={styles.section} aria-label="Type Matchups">
      <SectionTitle id="type-matchups">Type Matchups</SectionTitle>

      {isLoading && <Skeleton height="6rem" />}
      {isError && <p className={styles.error}>Failed to load type data.</p>}

      {data && (
        <div className={styles.groups}>
          <MatchupGroup label="4× Weak" types={data.quadrupleWeaknesses} />
          <MatchupGroup label="2× Weak" types={data.doubleWeaknesses} />
          <MatchupGroup label="½× Resistant" types={data.halfResistances} />
          <MatchupGroup label="¼× Resistant" types={data.quarterResistances} />
          <MatchupGroup label="Immune" types={data.immunities} />
        </div>
      )}
    </section>
  );
}

function MatchupGroup({ label, types }: { label: string; types: PokemonTypeName[] }) {
  if (types.length === 0) return null;

  return (
    <div className={styles.group}>
      <span className={styles.groupLabel}>{label}</span>
      <div className={styles.badges}>
        {types.map(t => (
          <TypeBadge key={t} type={t} size="sm" />
        ))}
      </div>
    </div>
  );
}
