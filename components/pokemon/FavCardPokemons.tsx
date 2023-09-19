import Image from "next/image"
import { Grid, Card, CardActionArea, CardMedia, Box, Modal, Typography } from "@mui/material"
import { useRouter } from "next/router"

interface Props {
    pokeId: number
}

export const FavCardPokemons = ({ pokeId }: Props) => {
    const router = useRouter()

    const onCLick = () => {
        router.push(`/pokemon/${ pokeId }`)
    }

    return (
        <Grid item xs={ 6 } sm={ 3 } md={ 2 } xl={ 1 } key={ pokeId } >
            <Card sx={{ borderRadius: 3, width: 200, height: 200 }}>
                <CardActionArea onClick={ onCLick } sx={{ padding: 3 }}>
                    <CardMedia sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ pokeId }.svg`} alt="" width={ 150 } height={ 150 } />
                    </CardMedia>
                </CardActionArea>
            </Card>
        </Grid>
    )
}
