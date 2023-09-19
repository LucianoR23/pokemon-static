import { Grid, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import { Pokemon } from '@/interfaces';
import { FC } from 'react';
import { useRouter } from 'next/router';

interface Props {
    pokemon: Pokemon
}

export const PokemonCard: FC<Props> = ({ pokemon: { id, img, name } }) => {
    const router = useRouter()

    const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1)

    const onCLick = () => {
        router.push(`/name/${ name }`)
    }


    return (
            <Card sx={{ borderRadius: 3 }}>
                <CardActionArea onClick={ onCLick } sx={{ width: 200, height: 200 }}>
                    <CardMedia sx={{ display: 'flex', justifyContent: 'center'}}>
                        <Image alt={name} src={img} width={150} height={150}  />
                    </CardMedia>
                    <CardContent sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>{ nameCapitalized }</Typography>
                        <Typography>#{ id }</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
    )
}
