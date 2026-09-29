import styles from './SectionTitle.module.css';

interface SectionTitleProps {
  id?: string;
  children: React.ReactNode;
}

export function SectionTitle({ id, children }: SectionTitleProps) {
  return (
    <h2 id={id} className={styles.title}>
      {children}
    </h2>
  );
}
