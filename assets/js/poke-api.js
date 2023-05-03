const pokeApi = {}

function convertPokeApiDetailToPokemonModel(pokemonDetail) {
    const pokemon = new Pokemon()
    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.number = pokemonDetail.order
    pokemon.name = pokemonDetail.name
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.GetPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemonModel)
}

pokeApi.GetPokemons = (offset = 0, limit = 12) => {

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.GetPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}