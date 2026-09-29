import { AlertCircle, RefreshCw } from 'lucide-react';
import styles from './ErrorState.module.css';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = 'Something went wrong', onRetry }: ErrorStateProps) {
  return (
    <div className={styles.container} role="alert">
      <AlertCircle className={styles.icon} size={48} />
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button type="button" className={styles.retryButton} onClick={onRetry}>
          <RefreshCw size={16} />
          Try again
        </button>
      )}
    </div>
  );
}
