import { PropsWithChildren, createContext } from 'react';

type ThemeProviderProps = PropsWithChildren;

const initialTheme = null;
const ThemeContext = createContext(initialTheme);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const value = null;
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
