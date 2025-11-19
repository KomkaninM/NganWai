import { createUser, getUser,login} from "./api.js";

let currentUser = null; 

export async function handleCreateUser() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  document.getElementById("login-form").reset();
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
  document.getElementById("login-form").reset();
  const usernameElement = document.getElementById("user-info-username");

  if (!username || !password) {
    alert("Please enter username/password!");
    return;
  }

  const result = await login(username, password);

  if (result.error) {
    alert(result.error);
    return;
  }

  // Login success
  alert("Welcome Back!");

  currentUser = result.user; // set current user
  localStorage.setItem("token", result.token); // save token

  // Update UI
  document.querySelector(".main-content").style.display = "block";
  document.getElementById("login-box").style.display = "none";
  document.getElementById("user-info-box").style.display = "block";
  document.getElementById("add-task-btn").style.display = "block";

  usernameElement.textContent = result.user.username;
}

export async function handleUserLogout() {
  currentUser = null;
  document.querySelector(".main-content").style.display = "none";
  document.getElementById("login-box").style.display = null;
  document.getElementById("user-info-box").style.display = "none";
  document.getElementById("add-task-btn").style.display = "none";
}

export function getCurrentUser() {
    return currentUser.username;
}