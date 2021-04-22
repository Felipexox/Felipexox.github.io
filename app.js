var nomePokemonCampo = document.querySelector("#nomePokemon");
var conteudo = document.querySelector("#pokemon-div");
var botao = document.querySelector("#submitPokemon");
var img = document.getElementById("imgPokemon");
botao.addEventListener("click",busca)

function busca(event){
      event.preventDefault();
      var nomePokemon = nomePokemonCampo.value;
      for(aux=1;aux<150;aux++){
       axios.get(`https://pokeapi.co/api/v2/pokemon/${aux}`) 
      .then(res => {
        if(res.data.erro){
          throw new Error('Nao existe esse pokemon')
        }
      
       conteudo.innerHTML = ''
          
       if (res.data.name.indexOf(nomePokemon) == 0){
        createLine(res.data.game_indices[3].game_index)
        createLine(res.data.name)
        createLine(res.data.types[0].type.name)
        createLine(res.data.abilities[0].ability.name)
        img.setAttribute("src",(res.data.sprites.front_default))

        }

        
          
        
        


        
        
       
      

      })
      .catch(err => {
        conteudo.innerHTML = ''
     
        createLine('ERRO!')
        
      })
      
      
    }

}

function createLine(valor){
  let linha = document.createElement("p");
  let texto = document.createTextNode(valor);
  linha.appendChild(texto);
  conteudo.appendChild(linha);
}

