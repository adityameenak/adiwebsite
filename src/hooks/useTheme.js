import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

function readTheme() {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

/**
 * Light/dark theme stored on <html data-theme>. The initial value is set by an
 * inline script in index.html (saved choice, else system preference) so the
 * first paint is already correct; this hook only reads and toggles it.
 */
export function useTheme() {
  const [theme, setTheme] = useState(readTheme);

  // Follow the OS setting until the visitor picks a theme themselves.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => {
      let saved = null;
      try { saved = localStorage.getItem(STORAGE_KEY); } catch { /* storage unavailable */ }
      if (saved) return;
      const next = e.matches ? 'dark' : 'light';
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  const toggle = useCallback(() => {
    const next = readTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* storage unavailable */ }
    setTheme(next);
  }, []);

  return { theme, toggle };
}
