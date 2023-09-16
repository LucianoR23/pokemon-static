import { darkTheme, lightTheme } from '@/themes';
import { Box, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useThemeContext } from '@/themes/context/ThemeContext';
import Image from 'next/image';



export const Navbar = () => {

    const { toggleTheme } = useThemeContext();
    const actualTheme = useTheme()

    return (
        <Box sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            backgroundColor: 'background.paper'
        }}>


            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Image src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/448.png" alt='infernape' width={70} height={70} />
                <Typography variant='h4'>P</Typography>
                <Typography variant='h6'>okémon</Typography>
                
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={{ mr: 2, color: 'primary.main' }}>Favorites</Typography>

                <IconButton onClick={ toggleTheme }>
                    {actualTheme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            
            </Box>

        </Box>
    )
}
