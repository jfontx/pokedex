import { SectionTitle } from '../../../../components';
import type { PokemonOverview, SpeciesInfo } from '../../types';
import { formatHeight, formatWeight, formatGenderRate, formatName } from '../../utils';
import styles from './PhysicalInfo.module.css';

interface PhysicalInfoProps {
  pokemon: PokemonOverview;
  species: SpeciesInfo;
}

export function PhysicalInfo({ pokemon, species }: PhysicalInfoProps) {
  const gender = formatGenderRate(species.genderRate);

  return (
    <section className={styles.section} aria-label="Physical Info & Breeding">
      <SectionTitle id="physical-info">Physical Info &amp; Breeding</SectionTitle>

      <div className={styles.grid}>
        <InfoCard label="Height" value={formatHeight(pokemon.height)} />
        <InfoCard label="Weight" value={formatWeight(pokemon.weight)} />
        <InfoCard label="Base Experience" value={pokemon.baseExperience?.toString() ?? '—'} />
        <InfoCard label="Capture Rate" value={String(species.captureRate)} />
        <InfoCard label="Base Happiness" value={species.baseHappiness?.toString() ?? '—'} />
        <InfoCard label="Growth Rate" value={formatName(species.growthRate)} />
        <InfoCard label="Habitat" value={species.habitat ? formatName(species.habitat) : '—'} />
        <InfoCard label="Generation" value={formatName(species.generation.replace('generation-', 'Gen '))} />
        <InfoCard label="Egg Groups" value={species.eggGroups.map(g => formatName(g)).join(', ') || '—'} />

        <div className={styles.card}>
          <span className={styles.cardLabel}>Gender</span>
          {gender ? (
            <div className={styles.genderBar}>
              <div className={styles.male} style={{ width: `${gender.male}%` }}>
                <span>♂ {gender.male.toFixed(1)}%</span>
              </div>
              <div className={styles.female} style={{ width: `${gender.female}%` }}>
                <span>♀ {gender.female.toFixed(1)}%</span>
              </div>
            </div>
          ) : (
            <span className={styles.cardValue}>Genderless</span>
          )}
        </div>
      </div>
    </section>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.card}>
      <span className={styles.cardLabel}>{label}</span>
      <span className={styles.cardValue}>{value}</span>
    </div>
  );
}
