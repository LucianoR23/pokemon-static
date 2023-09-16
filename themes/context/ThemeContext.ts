import { createContext, useContext } from 'react';
import { Theme } from '@mui/material';
import { lightTheme } from '../lightTheme';
import { darkTheme } from '../darkTheme';


// type ThemeContextType = {
//   theme: Theme;
//   toggleTheme: () => void;
// };

export const ThemeContext = createContext({
  theme: darkTheme,
  toggleTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);