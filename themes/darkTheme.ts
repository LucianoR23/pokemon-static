import { Theme } from '@emotion/react/macro';
import { createTheme } from '@mui/material/styles';

export const darkTheme: Theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#7c4dff',
        },
        secondary: {
            main: '#304ffe',
        },
        background: {
            paper: '#212121',
        },
    },
}
)