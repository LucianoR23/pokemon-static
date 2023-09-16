import { ThemeOptions, createTheme } from '@mui/material/styles';

export const lightTheme: ThemeOptions = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#053dd0',
        },
        secondary: {
            main: '#092dce',
        },
        background: {
            paper: '#212121',
        },
    },
})