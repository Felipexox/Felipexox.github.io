var nomePokemonCampo = document.querySelector("#nomePokemon");
var conteudo = document.querySelector("#pokemon-div");
var logout = document.querySelector("#logout");
var botao = document.querySelector("#submitPokemon");
var img = document.getElementById("imgPokemon");
botao.addEventListener("click",busca)

if(!localStorage.getItem('token')){
  
  window.location.href = "./index.html";
}

logout.addEventListener('click', () => {
  localStorage.setItem('token', "");
  window.location.href = "./index.html";
})

function busca(event){
      event.preventDefault();
      var nomePokemon = nomePokemonCampo.value;
      axios.get(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`)
      .then(res => {
        if(res.data.erro){
          throw new Error('Nao existe esse pokemon')
        }
      
        conteudo.innerHTML = ''
        
       

        
        createLine(res.data.game_indices[3].game_index)
        createLine(res.data.name)
        createLine(res.data.types[0].type.name)
        createLine(res.data.abilities[0].ability.name)
        img.setAttribute("src",(res.data.sprites.front_default))
       
      

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

