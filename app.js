var nomePokemon = document.querySelector("#nomePokemon").value;
var conteudo = document.querySelector("#Bloco2");

function busca(){

      axios.get(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`)
      .then(res => {
        if(res.data.erro){
          throw new Error('Nao existe esse pokemon')
        }
      
        content.innerHTML = ''
        createLine(res.data.name)
        createLine(res.data.type)
      })
      .catch(err => {
        content.innerHTML = ''
        createLine('ERRO!')
      })
      
      
      

}

function createLine(valor){
  let linha = document.createElement("p");
  let texto = document.createTextNode(valor);
  linha.appendChild(texto);
  conteudo.appendChild(linha);
}

