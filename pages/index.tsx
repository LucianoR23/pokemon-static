import { GetStaticProps, NextPage } from 'next'
import { Grid } from '@mui/material';
import { Layout, PokemonCard } from '@/components';
import { pokeApi } from '@/api';
import { Pokemon, PokemonListResponse } from '@/interfaces';


interface Props {
  pokemons: Pokemon[]
}

const Home: NextPage<Props> = ({ pokemons }) => {

  

  return (
    <Layout title='Pokemon List'>
      <Grid container gap={ 2 } justifyContent='space-evenly' >

        {pokemons.map( (pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={ pokemon } />
        ))}
        
      </Grid>
    </Layout>
  )
}


export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?offset=386&limit=108')

  const pokemons: Pokemon[] = data.results.map( ( poke, index ) => {
    // return { ...poke, id: index + 387, img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 387}.svg` }
    return { ...poke, id: index + 387, img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 387}.png` }
  } )

  return {
    props: {
      pokemons
    }
  }
}

export default Home