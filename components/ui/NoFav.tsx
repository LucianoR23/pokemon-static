import Image from "next/image"
import { Grid, Typography } from "@mui/material"


export const NoFav = () => {
    return (
        <Grid gap={3} container direction='column' height='calc(100vh - 100px)' alignItems='center' justifyContent='center' alignSelf='center'>
            <Typography variant="h3">There is no favorites</Typography>
            <Image className="mew" src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/151.svg' alt="mew" height={ 150 } width={ 150 } />
        </Grid>
    )
}
