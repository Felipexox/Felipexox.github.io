var nomePokemonCampo = document.querySelector("#tipoPokemon");
var conteudo = document.querySelector("#pokemon-div");
var logout = document.querySelector("#logout");
var botao = document.querySelector("#submitPokemon");
var img = document.getElementById("imgPokemon");

var pokemonTable = document.getElementById("pokemonTable");

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

const types = ["fire", "water", "normal", "fighting", "poison", "ground", "rock", "bug", "ghost"];

listPokemons();
clearTable();
function busca(event){
      event.preventDefault();
      var tipoPokemon = nomePokemonCampo.value;
      
      if(tipoPokemon.length > 0){
          clearTable();
          for(let i = 0; i < types.length; i++){
            if(types[i].startsWith(tipoPokemon)){
              tipoPokemon = types[i];
              break;
            }
          }

          axios.get(`https://pokeapi.co/api/v2/type/${tipoPokemon}`)
          .then(res => {
            console.log("RESPONSE");
            for(let i = 0; i < res.data.pokemon.length; i++){
              addRowToTable(res.data.pokemon[i].pokemon.name, tipoPokemon, i);
              
            }
            
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
function clearTable(){
  while(pokemonTable.hasChildNodes()){
    pokemonTable.removeChild(pokemonTable.firstChild)
  }
  createTableHeader();
}
function createTableHeader(){
  var row = pokemonTable.insertRow(pokemonTable.childElementCount);
  var indexCell = row.insertCell(0);
  var nameCell = row.insertCell(1);
  var typeCell = row.insertCell(2);

  indexCell.innerHTML = "Index";
  nameCell.innerHTML = "Name";
  typeCell.innerHTML = "Type";
}
function addRowToTable(pokemon, type, index){
  var row = pokemonTable.insertRow(index + 1);

  var indexCell = row.insertCell(0);
  var nameCell = row.insertCell(1);
  var typeCell = row.insertCell(2);


  indexCell.innerHTML = index;
  nameCell.innerHTML = pokemon;
  typeCell.innerHTML = type;

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
