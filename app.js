var title = document.querySelector("#postTitle");
var desc = document.querySelector("#postDesc");
var logout = document.querySelector("#logout");
var submit = document.querySelector("#submitPost");

var search = document.querySelector("#postTitleFind");
var submitSearch = document.querySelector("#submitSearch");

var img = document.getElementById("imgPokemon");

var contentTable = document.getElementById("contentTable");

const error_message = document.querySelector('#error-message')
const message = document.querySelector('#message')


submit.addEventListener("click",insertPost)
submitSearch.addEventListener("click",busca)

if(!localStorage.getItem('token')){
  
  window.location.href = "./index.html";
}

logout.addEventListener('click', () => {
  localStorage.setItem('token', "");
  window.location.href = "./index.html";
})

var pokemonList = [];

clearTable();

function insertPost(event){
  event.preventDefault();
  clearMessages();
  var titleValue = title.value;
  var descValue = title.value;

  if(titleValue.length > 0 && descValue.length > 0){
    clearTable();

    let index = 0;
    axios.post(`https://twitter-express-backend.herokuapp.com/posts/register`,{
      title: titleValue,
      desc: descValue
    })
    .then(res => {
      console.log("RESPONSE " + JSON.stringify(res.data));
  
      showMessage("POST SAVE WITH SUCCESS!")
      
    })
    .catch(err => {
      // conteudo.innerHTML = ''
  
      showErrorMessage('ERRO: Title não encontrado!')
      // img.setAttribute("#")
    })

      
      
  }else{
    showErrorMessage('ERRO: O Campo não pode ser vazio!')
  }
}

function busca(event){
      event.preventDefault();
      clearMessages()
      var searchValue = search.value;
      
      if(searchValue.length > 0){
          clearTable();
   
          let index = 0;
          axios.get(`https://twitter-express-backend.herokuapp.com/posts`)
          .then(res => {
            console.log("RESPONSE " + JSON.stringify(res.data));
            for(let i = 0; i < res.data.length; i++){
              console.log(res.data[i].title + " start with " + searchValue)
              if(res.data[i].title.startsWith(searchValue)){
                addRowToTable(res.data[i].title, res.data[i].description, index);
                index ++;
              }
      
            }
            
          })
          .catch(err => {
            // conteudo.innerHTML = ''
        
            showErrorMessage('ERRO: post não encontrado!')
            // img.setAttribute("#")
          })

            
            
      }else{
        showErrorMessage('ERRO: O Campo não pode ser vazio!')
      }
}

function clearTable(){
  while(contentTable.hasChildNodes()){
    contentTable.removeChild(contentTable.firstChild)
  }
  createTableHeader();
}
function createTableHeader(){
  var row = contentTable.insertRow(contentTable.childElementCount);
  var indexCell = row.insertCell(0);
  var titleCell = row.insertCell(1);
  var description = row.insertCell(2);

  indexCell.innerHTML = "Index";
  titleCell.innerHTML = "Title";
  description.innerHTML = "Description";
}
function addRowToTable(post, type, index){
  var row = contentTable.insertRow(index + 1);

  var indexCell = row.insertCell(0);
  var titleCell = row.insertCell(1);
  var description = row.insertCell(2);


  indexCell.innerHTML = index;
  titleCell.innerHTML = post;
  description.innerHTML = type;

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

function showMessage(value){
  message.textContent = value;
  console.log(value);
}

function clearMessages(){
  showErrorMessage("");
  showMessage("");
}
