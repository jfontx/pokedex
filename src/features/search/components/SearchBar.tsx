import { useState, useRef, useCallback, useMemo } from 'react';
import { Search, X, Shuffle } from 'lucide-react';
import { useDebouncedValue, usePokemonNames } from '../hooks';

import { getSearchSuggestions } from '../utils';
import { formatName } from '../../pokemon/utils';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSelect: (name: string) => void;
}

const MAX_SUGGESTIONS = 8;

export function SearchBar({ onSelect }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const debouncedQuery = useDebouncedValue(query.toLowerCase().trim(), 150);
  const { data: allNames } = usePokemonNames();

  const suggestions = useMemo(() => {
    return getSearchSuggestions(allNames ?? [], debouncedQuery, MAX_SUGGESTIONS);
  }, [allNames, debouncedQuery]);

  const handleSelect = useCallback(
    (name: string) => {
      setQuery('');
      setIsOpen(false);
      setHighlightIndex(-1);
      onSelect(name);
      inputRef.current?.blur();
    },
    [onSelect]
  );

  const handleRandom = useCallback(() => {
    if (!allNames || allNames.length === 0) return;
    const randomIndex = Math.floor(Math.random() * allNames.length);
    const entry = allNames[randomIndex];
    if (entry) handleSelect(entry.name);
  }, [allNames, handleSelect]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'Enter' && query.trim()) {
        handleSelect(query.trim().toLowerCase());
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightIndex(prev => (prev + 1) % suggestions.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightIndex(prev => (prev <= 0 ? suggestions.length - 1 : prev - 1));
        break;
      case 'Enter': {
        e.preventDefault();
        const selected = highlightIndex >= 0 ? suggestions[highlightIndex] : undefined;
        if (selected) {
          handleSelect(selected.name);
        } else if (query.trim()) {
          handleSelect(query.trim().toLowerCase());
        }
        break;
      }
      case 'Escape':
        setIsOpen(false);
        setHighlightIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const highlightMatch = (name: string) => {
    const idx = name.indexOf(debouncedQuery);
    if (idx === -1) return formatName(name);

    const before = name.slice(0, idx);
    const match = name.slice(idx, idx + debouncedQuery.length);
    const after = name.slice(idx + debouncedQuery.length);

    return (
      <>
        {formatName(before)}
        <mark className={styles.highlight}>{formatName(match)}</mark>
        {formatName(after)}
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <Search className={styles.searchIcon} size={20} aria-hidden="true" />
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          placeholder="Search Pokémon by name or number…"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setIsOpen(true);
            setHighlightIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => {
            // Delay to allow click on suggestion
            setTimeout(() => setIsOpen(false), 200);
          }}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={isOpen && suggestions.length > 0}
          aria-controls="search-suggestions"
          aria-autocomplete="list"
          aria-activedescendant={
            highlightIndex >= 0 ? `suggestion-${highlightIndex}` : undefined
          }
        />
        {query && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <button
        type="button"
        className={styles.randomButton}
        onClick={handleRandom}
        aria-label="Random Pokémon"
        title="Random Pokémon"
      >
        <Shuffle size={18} />
        <span className={styles.randomLabel}>Random</span>
      </button>

      {isOpen && suggestions.length > 0 && (
        <ul
          ref={listRef}
          id="search-suggestions"
          className={styles.suggestions}
          role="listbox"
        >
          {suggestions.map((entry, idx) => (
            <li
              key={entry.name}
              id={`suggestion-${idx}`}
              className={`${styles.suggestionItem} ${idx === highlightIndex ? styles.highlighted : ''}`}
              role="option"
              aria-selected={idx === highlightIndex}
              onMouseDown={() => handleSelect(entry.name)}
              onMouseEnter={() => setHighlightIndex(idx)}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entry.id}.png`}
                alt=""
                className={styles.suggestionSprite}
                width="40"
                height="40"
                loading="lazy"
              />
              <span className={styles.suggestionName}>
                {highlightMatch(entry.name)}
              </span>
              <span className={styles.suggestionId}>
                #{String(entry.id).padStart(4, '0')}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
