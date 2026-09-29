import { SectionTitle } from '../../../../components';
import { useAbility } from '../../hooks';
import type { AbilityEntry } from '../../types';
import { formatName } from '../../utils';
import { Skeleton } from '../../../../components';
import styles from './Abilities.module.css';

interface AbilitiesProps {
  abilities: AbilityEntry[];
}

export function Abilities({ abilities }: AbilitiesProps) {
  return (
    <section className={styles.section} aria-label="Abilities">
      <SectionTitle id="abilities">Abilities</SectionTitle>
      <div className={styles.grid}>
        {abilities.map(ability => (
          <AbilityCard key={ability.name} ability={ability} />
        ))}
      </div>
    </section>
  );
}

function AbilityCard({ ability }: { ability: AbilityEntry }) {
  const { data, isLoading } = useAbility(ability.name);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.name}>{formatName(ability.name)}</span>
        {ability.isHidden && <span className={styles.hiddenBadge}>Hidden</span>}
      </div>
      {isLoading ? (
        <Skeleton height="2.5rem" />
      ) : (
        <p className={styles.description}>{data?.shortEffect}</p>
      )}
    </div>
  );
}
