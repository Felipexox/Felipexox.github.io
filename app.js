var nomePokemonCampo = document.querySelector("#nomePokemon");
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

listPokemons();
clearTable();
function busca(event){
      event.preventDefault();
      var nomePokemon = nomePokemonCampo.value;
      
      if(nomePokemon.length > 0){
          clearTable();

          for(let i = 0; i < pokemonList.length; i++){
            if(pokemonList[i].name.startsWith(nomePokemon)){


                axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonList[i].name}`)
                .then(res => {
                  console.log("RESPONSE");
                  addRowToTable(res);
                  
                })
                .catch(err => {
                  // conteudo.innerHTML = ''
              
                  showErrorMessage('ERRO: Pokemon não encontrado!')
                  // img.setAttribute("#")
                })

            }
          }        
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
  var abilityCell = row.insertCell(3);
  var imageCell = row.insertCell(4);

  indexCell.innerHTML = "Index";
  nameCell.innerHTML = "Name";
  typeCell.innerHTML = "Type";
  abilityCell.innerHTML = "Ability";
  imageCell.innerHTML = "Image";
}
function addRowToTable(res){
  var row = pokemonTable.insertRow(pokemonTable.childElementCount);

  var indexCell = row.insertCell(0);
  var nameCell = row.insertCell(1);
  var typeCell = row.insertCell(2);
  var abilityCell = row.insertCell(3);
  var imageCell = row.insertCell(4);

  indexCell.innerHTML = res.data.game_indices[3].game_index;
  nameCell.innerHTML = res.data.name;
  typeCell.innerHTML = res.data.types[0].type.name;
  abilityCell.innerHTML = res.data.abilities[0].ability.name;


  var img = document.createElement('img');
  img.src = "link to image here";
  imageCell.appendChild(img);
  img.setAttribute("src",(res.data.sprites.front_default))
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
