import { useState, useEffect } from 'react';
import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import Image from "next/image";
import { Card, CardActionArea, CardContent, CardMedia, Grid, ToggleButton, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Layout } from "@/components"
import { pokeApi } from "@/api";
import { PokemonFull } from "@/interfaces";
import { localFavorites } from "@/utils";

interface Props {
    pokemon: PokemonFull
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

    const nameCapitalized = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)

    const [isFav, setIsFav] = useState( false )

    const onToggleFavorite = () => {
        localFavorites.toggleFavorite( pokemon.id )
        setIsFav( !isFav )
    }

    useEffect(() => {
        setIsFav(localFavorites.existInFav(pokemon.id))
    }, [pokemon.id])
    

    return (
        <Layout title={`#${ pokemon.id } - ${ nameCapitalized }`}>
            <Grid container spacing={ 2 } sx={{ mt: 5 }}>
                <Grid item xs={ 12 } sm={ 4 }>
                    <CardActionArea sx={{ p: '30px' }}>
                        <CardMedia sx={{ display: 'flex', justifyContent: 'center'}}>
                            <Image alt={ pokemon.name } src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png' } width={150} height={150}  />
                        </CardMedia>
                    </CardActionArea>
                </Grid>

                <Grid item xs={ 12 } sm={ 8 }>
                    <Card>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="h3">{nameCapitalized}</Typography>
                            <ToggleButton selected={ isFav } color="error" value='check' onChange={ onToggleFavorite } >
                                <FavoriteIcon fontSize="large" />
                            </ToggleButton>

                        </CardContent>
                        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h5">Sprites:</Typography>
                            <Image src={ pokemon.sprites.front_default } alt={ pokemon.name } width={ 80 } height={ 80 } />
                            <Image src={ pokemon.sprites.back_default } alt={ pokemon.name } width={ 80 } height={ 80 } />
                            <Image src={ pokemon.sprites.front_shiny } alt={ pokemon.name } width={ 80 } height={ 80 } />
                            <Image src={ pokemon.sprites.back_shiny } alt={ pokemon.name } width={ 80 } height={ 80 } />
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
        fallback: false
    }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { id } = params as { id: string }

    const { data } = await pokeApi.get<PokemonFull>(`/pokemon/${ id }`)

    return {
    props: {
        pokemon: data
        }
    }
}



export default PokemonPage;