import type { PokemonTypeName } from '../features/pokemon/types';
import { TYPE_COLORS } from '../features/pokemon/constants';
import { formatName } from '../features/pokemon/utils';
import styles from './TypeBadge.module.css';

interface TypeBadgeProps {
  type: PokemonTypeName;
  size?: 'sm' | 'md';
}

export function TypeBadge({ type, size = 'md' }: TypeBadgeProps) {
  const color = TYPE_COLORS[type];

  return (
    <span
      className={`${styles.badge} ${styles[size]}`}
      style={{
        backgroundColor: color.hex,
        color: color.l > 60 ? '#1a1d23' : '#ffffff',
      }}
    >
      {formatName(type)}
    </span>
  );
}
