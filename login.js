const sign_in_btn = document.querySelector('#button2')
const sign_up_btn = document.querySelector('#sign-up-btn')
const sign_up = document.querySelector('#button-su')
const error_message = document.querySelector('#error-message')

var email = document.querySelector("#input-email");
var password = document.querySelector("#input-pwd");

var storedEmail = localStorage.getItem('email')
var storedPassword = localStorage.getItem('password')

email.value = storedEmail
password.value = storedPassword


sign_in_btn.addEventListener('click', () => {
    axios.post(`https://reqres.in/api/login`,  
     {
        email: email.value,
        password: password.value
      }
    )
      .then(res => {
        if(res.data.erro){
          throw new Error('Error')
        }
        console.log(password.value)
      })
      .catch(err => {      
        showErrorMessage('ERRO!')
      })
})


function showErrorMessage(value){

  error_message.textContent = value;
  console.log(value);
}
