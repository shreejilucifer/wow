import { createContext } from 'react';

export interface Theme {
  theme: boolean;
  setTheme: (theme: any) => any;
}

export const ThemeContext = createContext<Partial<Theme>>({});
