import { pokeApi } from "@/api"
import { PokemonFull } from "@/interfaces"


export const getPokemonInfo = async( nameOrId: string ) => {

    try {
        const { data } = await pokeApi.get<PokemonFull>(`/pokemon/${ nameOrId }`)
    
        return {
            id: data.id,
            name: data.name,
            sprites: data.sprites,
            weight: data.weight,
            abilities: data.abilities,
            types: data.types
        }
        
    } catch (error) {
        return null
    }

}