import { ArrowRight } from 'lucide-react';
import { SectionTitle, Skeleton } from '../../../../components';
import { useEvolutionChain } from '../../hooks';
import type { EvolutionNode } from '../../types';
import { formatName } from '../../utils';
import styles from './EvolutionChain.module.css';

interface EvolutionChainProps {
  chainId: number | null;
  currentPokemon: string;
  onSelect: (name: string) => void;
}

export function EvolutionChainSection({ chainId, currentPokemon, onSelect }: EvolutionChainProps) {
  const { data: tree, isLoading, isError } = useEvolutionChain(chainId);

  return (
    <section className={styles.section} aria-label="Evolution Chain">
      <SectionTitle id="evolution-chain">Evolution Chain</SectionTitle>

      {isLoading && <Skeleton height="8rem" />}
      {isError && <p className={styles.error}>Failed to load evolution data.</p>}

      {tree && (
        <div className={styles.tree}>
          <EvolutionNodeView
            node={tree}
            currentPokemon={currentPokemon}
            onSelect={onSelect}
          />
        </div>
      )}

      {tree && tree.children.length === 0 && (
        <p className={styles.noEvo}>This Pokémon does not evolve.</p>
      )}
    </section>
  );
}

function EvolutionNodeView({
  node,
  currentPokemon,
  onSelect,
}: {
  node: EvolutionNode;
  currentPokemon: string;
  onSelect: (name: string) => void;
}) {
  const isCurrent = node.speciesName === currentPokemon;

  return (
    <div className={styles.chain}>
      <div className={styles.stageGroup}>
        {node.trigger && (
          <div className={styles.trigger}>
            <ArrowRight size={16} className={styles.arrow} />
            <span className={styles.triggerText}>
              {node.trigger}
              {node.triggerDetail && <span className={styles.triggerDetail}>{node.triggerDetail}</span>}
            </span>
          </div>
        )}

        <button
          type="button"
          className={`${styles.stage} ${isCurrent ? styles.current : ''}`}
          onClick={() => onSelect(node.speciesName)}
          aria-label={`View ${formatName(node.speciesName)}`}
          aria-current={isCurrent ? 'true' : undefined}
        >
          {node.spriteUrl && (
            <img
              src={node.spriteUrl}
              alt={formatName(node.speciesName)}
              className={styles.sprite}
              width="80"
              height="80"
              loading="lazy"
            />
          )}
          <span className={styles.stageName}>{formatName(node.speciesName)}</span>
        </button>
      </div>

      {node.children.length > 0 && (
        <div className={node.children.length > 1 ? styles.branches : styles.linear}>
          {node.children.map(child => (
            <EvolutionNodeView
              key={child.speciesName}
              node={child}
              currentPokemon={currentPokemon}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
