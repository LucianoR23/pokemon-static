import { FC } from 'react';
import { Grid } from "@mui/material"
import { FavCardPokemons } from "./FavCardPokemons";

interface Props {
    favPokemons: number[]
}

export const FavoritesPokemons: FC<Props> = ({ favPokemons }) => {
    return (
        <Grid container gap={ 8 } direction='row' sx={{ justifyContent: { sm: 'flex-start', xs: 'space-evenly' } }}>
            {
                favPokemons.map( id => (
                    <FavCardPokemons key={ id } pokeId={ id } />
                ) )
            }
        </Grid>
    )
}
