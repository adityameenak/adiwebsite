import { useCallback, useState } from 'react';

const STORAGE_KEY = 'theme';

function readTheme() {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

/**
 * Light/dark theme stored on <html data-theme>. The initial value is set by an
 * inline script in index.html (saved choice, else light) so the
 * first paint is already correct; this hook only reads and toggles it.
 */
export function useTheme() {
  const [theme, setTheme] = useState(readTheme);

  const toggle = useCallback(() => {
    const next = readTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* storage unavailable */ }
    setTheme(next);
  }, []);

  return { theme, toggle };
}
