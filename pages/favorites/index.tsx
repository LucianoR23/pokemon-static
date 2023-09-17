import { Layout, NoFav } from "@/components"
import { useState, useEffect } from 'react';
import { localFavorites } from '@/utils';



const Favorites = () => {

    const [favPokemons, setFavPokemons] = useState<number[]>([])

    useEffect(() => {
        setFavPokemons( localFavorites.pokemons() )
    }, [])
    

    return (
        <Layout title="Favorites Pokemons">

            <NoFav />

        </Layout>
    )
}

export default Favorites