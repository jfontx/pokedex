import { useState, useEffect, useCallback } from 'react';
import styles from './App.module.css';

function getUrlPokemon(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get('pokemon') ?? '';
}

export function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(getUrlPokemon);

  // Sync browser back/forward
  useEffect(() => {
    const onPopState = () => setSelectedPokemon(getUrlPokemon());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleSelectPokemon = useCallback((name: string) => {
    const normalized = name.toLowerCase().trim();
    setSelectedPokemon(normalized);
    const url = normalized
      ? `${window.location.pathname}?pokemon=${encodeURIComponent(normalized)}`
      : window.location.pathname;
    window.history.pushState({}, '', url);
  }, []);

  return (
    <div className={styles.app}>
      <main className={styles.main}>
        <p>Pokédex — coming soon</p>
        <p>Selected: {selectedPokemon || 'none'}</p>
        <button type="button" onClick={() => handleSelectPokemon('pikachu')}>
          Try Pikachu
        </button>
      </main>
    </div>
  );
}
