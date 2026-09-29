import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SearchBar, RecentSearches, LandingScreen } from '../features/search';
import { ThemeToggle } from '../components';
import { useLocalStorage, useReducedMotion } from '../hooks';
import { usePokemon } from '../features/pokemon/hooks';
import { motion, AnimatePresence } from 'motion/react';
import { PokemonDetail } from '../features/pokemon/components/PokemonDetail';
import styles from './App.module.css';

const MAX_RECENT = 6;

function getUrlPokemon(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get('pokemon') ?? '';
}

export function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(getUrlPokemon);
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>('pokedex-recent', []);
  const reducedMotion = useReducedMotion();

  const { data: pokemon } = usePokemon(selectedPokemon);

  // Update page title
  useEffect(() => {
    if (pokemon) {
      const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      document.title = `${name} · Pokédex`;
    } else {
      document.title = 'Pokédex';
    }
  }, [pokemon]);

  // Sync browser back/forward
  useEffect(() => {
    const onPopState = () => setSelectedPokemon(getUrlPokemon());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleSelectPokemon = useCallback((name: string) => {
    const normalized = name.toLowerCase().trim();
    if (!normalized) return;

    setSelectedPokemon(normalized);
    const url = `${window.location.pathname}?pokemon=${encodeURIComponent(normalized)}`;
    window.history.pushState({}, '', url);

    // Add to recent searches (deduplicated, max 6)
    setRecentSearches(prev => {
      const filtered = prev.filter(n => n !== normalized);
      return [normalized, ...filtered].slice(0, MAX_RECENT);
    });
  }, [setRecentSearches]);

  const handleNavigate = useCallback((direction: 'prev' | 'next') => {
    if (!pokemon) return;
    const newId = direction === 'prev' ? pokemon.id - 1 : pokemon.id + 1;
    if (newId < 1) return;
    handleSelectPokemon(String(newId));
  }, [pokemon, handleSelectPokemon]);

  const handleClearRecent = useCallback(() => {
    setRecentSearches([]);
  }, [setRecentSearches]);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <button
            type="button"
            className={styles.logo}
            onClick={() => {
              setSelectedPokemon('');
              window.history.pushState({}, '', window.location.pathname);
              document.title = 'Pokédex';
            }}
          >
            <span className={styles.logoIcon}>◓</span>
            Pokédex
          </button>
          <div className={styles.headerRight}>
            <SearchBar onSelect={handleSelectPokemon} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <AnimatePresence mode="wait">
          {selectedPokemon ? (
            <motion.div
              key="detail"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.detailContainer}
            >
              {/* Navigation buttons */}
              <div className={styles.navButtons}>
                <button
                  type="button"
                  className={styles.navButton}
                  onClick={() => handleNavigate('prev')}
                  disabled={!pokemon || pokemon.id <= 1}
                  aria-label="Previous Pokémon"
                >
                  <ChevronLeft size={20} />
                  <span className={styles.navLabel}>Prev</span>
                </button>
                <button
                  type="button"
                  className={styles.navButton}
                  onClick={() => handleNavigate('next')}
                  disabled={!pokemon}
                  aria-label="Next Pokémon"
                >
                  <span className={styles.navLabel}>Next</span>
                  <ChevronRight size={20} />
                </button>
              </div>

              <PokemonDetail name={selectedPokemon} onSelect={handleSelectPokemon} />
            </motion.div>
          ) : (
            <motion.div
              key="landing"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={styles.landing}
            >
              <RecentSearches
                searches={recentSearches}
                onSelect={handleSelectPokemon}
                onClear={handleClearRecent}
              />
              <LandingScreen onSelect={handleSelectPokemon} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
