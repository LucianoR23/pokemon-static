import { Box, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useThemeContext } from '@/themes/context/ThemeContext';
import Image from 'next/image';
import NextLink from 'next/link';
import Button from '@mui/material/Button';



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


                <NextLink draggable href='/' passHref >
                    <Button>
                            <Image src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/448.png" alt='infernape' width={70} height={70} />
                            <Typography sx={{ textDecoration: 'none'}} variant='h4'>P</Typography>
                            <Typography variant='h6'>okémon</Typography>
                    </Button>
                </NextLink>
                

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <NextLink draggable href='/favorites' passHref >
                    <Typography sx={{ mr: 2, color: 'primary.main' }}>Favorites</Typography>
                </NextLink>

                <IconButton onClick={ toggleTheme }>
                    {actualTheme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            
            </Box>

        </Box>
    )
}
