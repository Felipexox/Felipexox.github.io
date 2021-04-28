var nomePokemonCampo = document.querySelector("#nomePokemon");
var conteudo = document.querySelector("#pokemon-div");
var logout = document.querySelector("#logout");
var botao = document.querySelector("#submitPokemon");
var img = document.getElementById("imgPokemon");
const error_message = document.querySelector('#error-message')

const gameIndex = document.querySelector("#game-index")
const name = document.querySelector("#name")
const type = document.querySelector("#type")
const abilityName = document.querySelector("#ability-name")

const pokemon_list = document.querySelector('#pokemon-list')

botao.addEventListener("click",busca)

if(!localStorage.getItem('token')){
  
  window.location.href = "./index.html";
}

logout.addEventListener('click', () => {
  localStorage.setItem('token', "");
  window.location.href = "./index.html";
})

var pokemonList = [];

listPokemons();

function busca(event){
      event.preventDefault();
      var nomePokemon = nomePokemonCampo.value;
      if(nomePokemon.length > 0){
          console.log(JSON.stringify(pokemonList));

          for(let i = 0; i < pokemonList.length; i++){
            console.log(pokemonList[i].name)
            if(pokemonList[i].name.startsWith(nomePokemon)){
              nomePokemon = pokemonList[i].name;
              break;
            }
          }

          axios.get(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`)
          .then(res => {
            gameIndex.textContent = res.data.game_indices[3].game_index;
            name.textContent = res.data.name;
            type.textContent = res.data.types[0].type.name;
            abilityName.textContent = res.data.abilities[0].ability.name;

            img.setAttribute("src",(res.data.sprites.front_default))
          
          })
          .catch(err => {
            // conteudo.innerHTML = ''
        
            showErrorMessage('ERRO: Pokemon não encontrado!')
            // img.setAttribute("#")
          })
      }else{
        showErrorMessage('ERRO: O Campo não pode ser vazio!')
      }
}
function listPokemons(){
  
  axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=200`)
  .then(res => {
    console.log(JSON.stringify(res.data.results))
    pokemonList = res.data.results;
  })
  .catch(err => {
    showErrorMessage('ERRO!')
    // img.setAttribute("#")
  })
}


function createLine(valor){
  let linha = document.createElement("p");
  let texto = document.createTextNode(valor);
  linha.appendChild(texto);
}

function showErrorMessage(value){

  error_message.textContent = value;
  console.log(value);
}
