import { useEffect, useState } from 'react';

enum ThemePreference {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto',
}

type ThemeMode = ThemePreference.LIGHT | ThemePreference.DARK;

const STORAGE_KEY = 'rtu-playground-theme';

const isBrowser = () =>
  typeof window !== 'undefined' && typeof document !== 'undefined';

const getStoredPreference = (): ThemePreference => {
  if (!isBrowser()) {
    return ThemePreference.AUTO;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === ThemePreference.DARK || stored === ThemePreference.LIGHT
    ? stored
    : ThemePreference.AUTO;
};

const getSystemTheme = (): ThemeMode => {
  if (!isBrowser()) {
    return ThemePreference.LIGHT;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? ThemePreference.DARK
    : ThemePreference.LIGHT;
};

const resolveTheme = (preference: ThemePreference): ThemeMode => {
  return preference === ThemePreference.AUTO ? getSystemTheme() : preference;
};

const applyTheme = (theme: ThemeMode) => {
  if (!isBrowser()) {
    return;
  }

  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.dataset.theme = theme;
};

export const initializeTheme = () => {
  const initialPreference = getStoredPreference();
  const initialTheme = resolveTheme(initialPreference);
  applyTheme(initialTheme);
};

export const useTheme = () => {
  const [preference, setPreference] = useState<ThemePreference>(() =>
    getStoredPreference(),
  );
  const [theme, setTheme] = useState<ThemeMode>(() =>
    resolveTheme(getStoredPreference()),
  );

  useEffect(() => {
    const resolved = resolveTheme(preference);
    setTheme(resolved);

    if (!isBrowser()) {
      return;
    }

    if (preference === ThemePreference.AUTO) {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, preference);
    }
  }, [preference]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (!isBrowser() || preference !== ThemePreference.AUTO) {
      return;
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? ThemePreference.DARK : ThemePreference.LIGHT);
    };

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [preference]);

  return {
    theme,
    preference,
    setPreference,
    setLight: () => setPreference(ThemePreference.LIGHT),
    setDark: () => setPreference(ThemePreference.DARK),
    useSystem: () => setPreference(ThemePreference.AUTO),
    toggleTheme: () =>
      setPreference(
        theme === ThemePreference.DARK
          ? ThemePreference.LIGHT
          : ThemePreference.DARK,
      ),
  };
};

export { ThemePreference };
