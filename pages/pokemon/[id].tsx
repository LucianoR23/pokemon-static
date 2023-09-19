import { useState, useEffect } from 'react';
import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import Image from "next/image";
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Modal, ToggleButton, Typography } from "@mui/material";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import confetti from 'canvas-confetti'
import { Layout } from "@/components"
import { PokemonFull } from "@/interfaces";
import { getPokemonInfo, localFavorites } from "@/utils";
import { redirect } from 'next/dist/server/api-utils';

interface Props {
    pokemon: PokemonFull
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

    const nameCapitalized = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    const typesCapitalized = pokemon.types.map( t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1) )
    const abilitiesCapitalized = pokemon.abilities.map( t => t.ability.name.charAt(0).toUpperCase() + t.ability.name.slice(1) )
    
    

    const [isFav, setIsFav] = useState( false )

    const [ open, setOpen ] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onToggleFavorite = () => {
        localFavorites.toggleFavorite( pokemon.id )
        setIsFav( !isFav )

        if( isFav ) return

        confetti({
            shapes: ['star'],
            colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
            zIndex: 999,
            particleCount: 100,
            spread: 150,
            angle: -100,
            origin: {
                x: 1,
                y: 0,
            }
        })
        
    }

    useEffect(() => {
        setIsFav(localFavorites.existInFav(pokemon.id))
    }, [pokemon.id])
    

    return (
        <Layout title={`#${ pokemon.id } - ${ nameCapitalized }`}>
            <Grid container spacing={ 2 } sx={{ mt: 5 }}>
                <Grid item xs={ 12 } sm={ 4 }>
                    <CardActionArea onClick={ handleOpen } sx={{ p: '30px' }}>
                        <CardMedia sx={{ display: 'flex', justifyContent: 'center'}}>
                            <Image alt={ pokemon.name } src={ pokemon.sprites.other?.['official-artwork'].front_shiny || pokemon.sprites.other?.dream_world.front_default || '/no-image.png' } width={ 300 } height={ 300 }  />
                        </CardMedia>
                    </CardActionArea>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: { xs: 300, sm: 600, md: 700 }, bgcolor: 'transparent', boxShadow: 24, p: 4, }}>
                            <CardMedia sx={{ width: { xs: 250, sm: 500, md: 600 } }} component='img' alt={ pokemon.name } src={ pokemon.sprites.other?.['official-artwork'].front_default || pokemon.sprites.other?.dream_world.front_default || '/no-image.png' } />
                        </Box>
                    </Modal>
                </Grid>

                <Grid item xs={ 12 } sm={ 8 }>
                    <Card>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="h3">{nameCapitalized}</Typography>
                            <ToggleButton selected={ isFav } color="warning" value='check' onChange={ onToggleFavorite } >
                                <StarRoundedIcon fontSize="large" />
                            </ToggleButton>
                        </CardContent>

                        <CardContent sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Typography variant="h5">Type:</Typography>
                            <Typography variant="h5">&nbsp;{ typesCapitalized[0] }&nbsp;</Typography>
                            <Typography variant="h5">{ typesCapitalized[1] !== undefined ? `and ${ typesCapitalized[1] }` : ''}</Typography>
                        </CardContent>
                        <CardContent sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Typography variant="h5">Ability:</Typography>
                            <Typography variant="h5">&nbsp;{ abilitiesCapitalized[0] !== undefined ? `${ abilitiesCapitalized[0] }` : 'none' }&nbsp;</Typography>
                            <Typography variant="h5">{ abilitiesCapitalized[1] !== undefined ? `and ${ abilitiesCapitalized[1] }` : '' }</Typography>
                        </CardContent>
                        <CardContent sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Typography variant="h5">Weight:&nbsp;</Typography>
                            <Typography variant="h5">{ pokemon.weight }gr.</Typography>
                        </CardContent>
                        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h5">Sprites:</Typography>
                            <Image src={ pokemon.sprites.versions?.['generation-v']['black-white'].animated?.front_default || pokemon.sprites.front_default || pokemon.sprites.other?.['official-artwork'].front_default || '/noimage.png' } alt={ pokemon.name } width={ 40 } height={ 40 } />
                            <Image src={ pokemon.sprites.versions?.['generation-v']['black-white'].animated?.back_default || pokemon.sprites.back_default || pokemon.sprites.other?.['official-artwork'].front_shiny || '/noimage.png' } alt={ pokemon.name } width={ 40 } height={ 40 } />
                            <Image src={ pokemon.sprites.versions?.['generation-v']['black-white'].animated?.front_shiny || pokemon.sprites.front_shiny || pokemon.sprites.other?.['official-artwork'].front_default || '/noimage.png' } alt={ pokemon.name } width={ 40 } height={ 40 } />
                            <Image src={ pokemon.sprites.versions?.['generation-v']['black-white'].animated?.back_shiny || pokemon.sprites.back_shiny || pokemon.sprites.other?.['official-artwork'].front_shiny || '/noimage.png' } alt={ pokemon.name } width={ 40 } height={ 40 } />
                        </CardContent>
                    </Card>

                </Grid>
            </Grid>
        </Layout>
    )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const pokemons108 = [...Array(108)].map( ( value, index ) => `${ index + 387}` )

    return {
        paths: pokemons108.map( id => ({
            params: { id }
        })),
        // fallback: false
        fallback: 'blocking'
    }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { id } = params as { id: string }

    const pokemon = await getPokemonInfo( id )

    if( !pokemon ) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            pokemon
            },
        revalidate: 86400,
        }
}



export default PokemonPage;