let currentUser = null;

export function setUserInState(userObj) {
  currentUser = userObj;
  console.log("User logged in:", currentUser);
}

export function getUser() {
  return currentUser;
}
