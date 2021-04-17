var nomePokemonCampo = document.querySelector("#nomePokemon");
var conteudo = document.querySelector("#pokemon-div");
var logout = document.querySelector("#logout");
var botao = document.querySelector("#submitPokemon");
var img = document.getElementById("imgPokemon");

const gameIndex = document.querySelector("#game-index")
const name = document.querySelector("#name")
const type = document.querySelector("#type")
const abilityName = document.querySelector("#ability-name")

const pokemon_list = document.querySelector('#pokemon-list')

botao.addEventListener("click",busca)

if(!localStorage.getItem('token')){
  
  window.location.href = "./index.html";
}

listPokemons();

logout.addEventListener('click', () => {
  localStorage.setItem('token', "");
  window.location.href = "./index.html";
})


function busca(event){
      event.preventDefault();
      var nomePokemon = nomePokemonCampo.value;
      axios.get(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`)
      .then(res => {
        gameIndex.textContent = res.data.game_indices[3].game_index;
        name.textContent = res.data.name;
        type.textContent = res.data.types[0].type.name;
        abilityName.textContent = res.data.abilities[0].ability.name;

        img.setAttribute("src",(res.data.sprites.front_default))
       
      

      })
      .catch(err => {
        conteudo.innerHTML = ''
     
        createLine('ERRO!')
        img.setAttribute("#")
      })
}
function listPokemons(){
  
  axios.get(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=200`)
  .then(res => {
    showPokemonList(res.data.results)
  })
  .catch(err => {
    conteudo.innerHTML = ''
 
    createLine('ERRO!')
    img.setAttribute("#")
  })
}


function createLine(valor){
  let linha = document.createElement("p");
  let texto = document.createTextNode(valor);
  linha.appendChild(texto);
  conteudo.appendChild(linha);
}


function showPokemonList(list){
  while (pokemon_list.firstChild) {
    pokemon_list.removeChild(pokemon_list.firstChild);
  }

  for(let i = 0; i < list.length; i++){
    let pokemonElement = document.createElement("p");
    pokemonElement.style.color = "#ffffff";
    let pokemonChild = document.createTextNode(list[i].name);
    pokemonElement.appendChild(pokemonChild);
    pokemon_list.appendChild(pokemonElement);
  }
}
