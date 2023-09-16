import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '@/styles/globals.css'
import { useTheme } from '@mui/material/styles';
import { darkTheme, lightTheme } from '@/themes';
import { useState } from 'react';
import { ThemeContext } from '@/themes/context/ThemeContext';



export default function App({ Component, pageProps }: AppProps) {

  const [theme, setTheme] = useState(darkTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={ theme }>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>

    </ThemeContext.Provider>
  )
}
