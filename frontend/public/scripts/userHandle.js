import { createUser, getUser} from "./api.js";

let currentUser = null; 

export async function handleCreateUser() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const payload = {username,password};
  const users = await getUser();
  const foundUser = users.find(user => user.username === username);
  if(foundUser){
    alert("User already existed!");
  }else if(username==""||password==""){
    alert("please enter username/password!");
  }else{
    await createUser(payload);
    alert("User created!");
  }
}

export async function handleSigninUser(){
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const usernameElement = document.getElementById("user-info-username");

  const users = await getUser(); // fetch users from backend
  const foundUser = users.find(u => u.username === username && u.password === password);

  if(foundUser){
    alert("Welcome Back!");
    currentUser = foundUser;
    // Show main content / hide login box if needed
    document.querySelector(".main-content").style.display = "block";
    document.getElementById("login-box").style.display = "none";
    document.getElementById("user-info-box").style.display = "block";
    document.getElementById("add-task-btn").style.display = "block";
    usernameElement.textContent = foundUser.username;
  }else{
    alert("Wrong username/password!");
  }
}

export async function handleUserLogout() {
  currentUser = null;
  document.querySelector(".main-content").style.display = "none";
  document.getElementById("login-box").style.display = null;
  document.getElementById("user-info-box").style.display = "none";
  document.getElementById("add-task-btn").style.display = "none";
}

export function getCurrentUser() {
    return currentUser;
}