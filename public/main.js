
const logIn = document.querySelector('.log-in')
const loginForm = document.querySelector('#login-form')
const registerForm = document.querySelector('#register-form')
let userid = '';
const signoutBtn = document.querySelector('#sign-out')
const baseURL = `http://localhost:8888/api`
const login = body => axios.post(`${baseURL}/login`, body).then( res => {  
  loginSuccess(res.data)
}).catch(err => {
  console.log(err)
  alert('Please check your username and password')
})
const register = body => axios.post(`${baseURL}/register`, body).then(res => {
  console.log("registered")
  registerSuccess(res.data)
}).catch(err => {
  console.log(err)
  alert('Uh oh. Your request did not work.')
})

function loginSubmitHandler(e) {
    e.preventDefault()
    let username = document.querySelector('#login-username')
    let password = document.querySelector('#login-password')
    let bodyObj = {
        username: username.value,
        password: password.value
    }
    login(bodyObj)
    username.value = ''
    password.value = ''
};

function registerSubmitHandler(e) {
  e.preventDefault()
  let username = document.querySelector('#register-username')
  let email = document.querySelector('#register-email')
  let firstName = document.querySelector('#register-firstName')
  let lastName = document.querySelector('#register-lastName')
  let password = document.querySelector('#register-password')
  let password2 = document.querySelector('#register-password-2')
  if (password.value !== password2.value) {
    alert("Your passwords need to match.")
    return
  }
  let bodyObj = {
      username: username.value,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value
  }
  register(bodyObj)
  username.value = ''
  email.value = ''
  firstName.value = ''
  lastName.value = ''
  password.value = ''
  password2.value = ''
}

function registerSuccess(data) {
  document.querySelector('h1').innerHTML = `<p class = "welcome" >Welcome ${data.firstName} ${data.lastName}`
    document.querySelector(".register").innerHTML = ''
}

function loginSuccess(data) {
  document.cookie = `username=${data}`;  
  logIn.innerHTML = ''
  const newLogIn = document.createElement('div')  
  newLogIn.innerHTML = `
  <nav class ='menu'> 
      <div class = "menu-btn" id="my-profile">My Profile</div>
      <div class="menu-btn" id ="sign-out" onclick="signOut()">Sign Out</div>
  </nav>
  <div class="container">
  <div class = "fit" onclick="myFunction('befit')">BE FIT</div>
      <div class = "full" onclick="myFunction('befull')">BE FULL</div>
      <div class = "fine" onclick="myFunction('befine')">BE FINE</div>
  </div>  
  `
  logIn.appendChild(newLogIn)
}
function myFunction(target) {
  location.replace(`${target}.html`)
}
if(loginForm){
  loginForm.addEventListener('submit', loginSubmitHandler)
}
if(registerForm){
  registerForm.addEventListener('submit', registerSubmitHandler)
}

const signOut = () =>{
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  document.cookie = "firstname=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  document.cookie = "lastname=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  location.replace(`login.html`);
}

const getCookie = (name)=> {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
};
const pageStarter = () =>{
  let firstname = getCookie('firstname');
  let lastname = getCookie('lastname');
  let user = "Welcome back, "+firstname + " " + lastname;
  console.log(user)
  document.createElement('div')
  document.querySelector('.name')
  let userCard = document.createElement('div');
        userCard.classList.add('name')
        userCard.textContent = user ;
        console.log(userCard)    
        document.querySelector(".user").appendChild(userCard)
};
pageStarter();
