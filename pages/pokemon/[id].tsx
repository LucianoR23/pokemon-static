import { Layout } from "@/components"
import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { pokeApi } from "@/api";
import { PokemonFull } from "@/interfaces";
import { Avatar, Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
    pokemon: PokemonFull
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

    const nameCapitalized = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)

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
                            <IconButton>
                                <FavoriteIcon fontSize="large" />
                            </IconButton>

                        </CardContent>
                        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h6">Sprites:</Typography>
                            
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {
    // const { data } = await  
    const pokemons108 = [...Array(108)].map( ( value, index ) => `${ index + 387}` )
    console.log(pokemons108)

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