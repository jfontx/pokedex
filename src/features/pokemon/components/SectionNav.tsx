import { useState, useEffect } from 'react';
import styles from './SectionNav.module.css';

const SECTIONS = [
  { id: 'pokedex-entry', label: 'Entry' },
  { id: 'base-stats', label: 'Stats' },
  { id: 'physical-info', label: 'Info' },
  { id: 'abilities', label: 'Abilities' },
  { id: 'type-matchups', label: 'Types' },
  { id: 'evolution-chain', label: 'Evolution' },
  { id: 'sprites', label: 'Sprites' },
  { id: 'moves', label: 'Moves' },
  { id: 'forms', label: 'Forms' },
];

export function SectionNav() {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    for (const section of SECTIONS) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={styles.nav} aria-label="Section navigation">
      <div className={styles.chips}>
        {SECTIONS.map(section => (
          <button
            key={section.id}
            type="button"
            className={`${styles.chip} ${activeId === section.id ? styles.active : ''}`}
            onClick={() => handleClick(section.id)}
          >
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
