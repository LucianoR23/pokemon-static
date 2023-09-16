import { Grid, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import { Pokemon } from '@/interfaces';
import { FC } from 'react';

interface Props {
    pokemon: Pokemon
}

export const PokemonCard: FC<Props> = ({ pokemon: { id, img, name } }) => {
    return (
            <Card sx={{ borderRadius: 3, width: 200, height: 200 }}>
                <CardActionArea>
                <CardMedia sx={{ display: 'flex', justifyContent: 'center'}}>
                    <Image alt={name} src={img} width={150} height={150}  />
                </CardMedia>
                <CardContent sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>{ name }</Typography>
                    <Typography>#{ id }</Typography>
                </CardContent>
                </CardActionArea>
            </Card>
    )
}
