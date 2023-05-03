const pokemonOl = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 12;
let offset = 0;
const maxRecords = 151;

function loadPokemonsItens(offset, limit){   
    pokeApi.GetPokemons(offset, limit).then((pokemons = []) => {
        pokemonOl.innerHTML += pokemons.map((pokemon) =>  `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                alt="${pokemon.name}">                    
            </div>              
        </li>
    `).join('')})
}

loadPokemonsItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordNextPage = offset + limit

    if(qtdRecordNextPage >= maxRecords){
        debugger;
        const newLimit = maxRecords - offset
        loadPokemonsItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)

    }else {

        loadPokemonsItens(offset, limit)
    }
})