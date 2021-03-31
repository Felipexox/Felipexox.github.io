var nomePokemonCampo = document.querySelector("#nomePokemon");
var conteudo = document.querySelector("#pokemon-div");
var botao = document.querySelector("#submitPokemon");

botao.addEventListener("click",busca)

function busca(event){
      event.preventDefault();
      var nomePokemon = nomePokemonCampo.value;
      axios.get(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`)
      .then(res => {
        if(res.data.erro){
          throw new Error('Nao existe esse pokemon')
        }
      
        conteudo.innerHTML = ''
        
        createLine(name + res.data.game_indices[3].game_index)
        createLine(res.data.name)
        createLine(res.data.types[0].type.name)
        createLine(res.data.abilities[0].ability.name)

        
       
      

      })
      .catch(err => {
        conteudo.innerHTML = ''
        createLine('ERRO!')
      })
      
      
      

}

function createLine(valor){
  let linha = document.createElement("p");
  let texto = document.createTextNode(valor);
  linha.appendChild(texto);
  conteudo.appendChild(linha);
}

