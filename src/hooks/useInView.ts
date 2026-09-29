import { useEffect, useRef, useState } from 'react';

/**
 * IntersectionObserver hook — returns a ref and a boolean.
 */
export function useInView(options?: IntersectionObserverInit): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, ...options });

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return [ref, inView];
}
