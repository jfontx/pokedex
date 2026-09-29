import styles from './PokeballLoader.module.css';

export function PokeballLoader() {
  return (
    <div className={styles.container} role="status" aria-label="Loading">
      <div className={styles.pokeball}>
        <div className={styles.pokeballTop} />
        <div className={styles.pokeballCenter}>
          <div className={styles.pokeballButton} />
        </div>
        <div className={styles.pokeballBottom} />
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
