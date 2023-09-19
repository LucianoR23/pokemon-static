import { useState, useEffect } from 'react';
import { Layout, NoFav, FavoritesPokemons } from "@/components"
import { localFavorites } from '@/utils';



const Favorites = () => {

    const [favPokemons, setFavPokemons] = useState<number[]>([])

    useEffect(() => {
        setFavPokemons( localFavorites.pokemons() )
    }, [])
    

    return (
        <Layout title="Favorites Pokemons">

            {
                favPokemons.length === 0
                ? (<NoFav />)
                : (
                    <FavoritesPokemons favPokemons={ favPokemons } />
                )
            }

        </Layout>
    )
}

export default Favorites