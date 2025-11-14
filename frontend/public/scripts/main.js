import { handleCreateUser,handleSigninUser,handleUserLogout} from "./userHandle.js";
import { handleAddTaskbtn,handlecloseModalbtn,handleAddTaskForm} from "./taskHandle.js";
import { loadAndRenderTasks } from "./taskTable.js";

document.addEventListener("DOMContentLoaded", () => {
  
  loadAndRenderTasks()

  document.getElementById("signupbtn").addEventListener("click", async () => {
    await handleCreateUser();
  });

  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevents page refresh
    await handleSigninUser();
  });

  const logout = document.getElementById("logout-btn");
  logout.addEventListener("click", async()=>{
    await handleUserLogout();
  });

  const addTaskbtn = document.getElementById("add-task-btn");
  addTaskbtn.addEventListener("click", async()=>{
    await handleAddTaskbtn();
  });

  const closeModal = document.getElementById("close-modal-btn");
  closeModal.addEventListener("click", async()=>{
    await handlecloseModalbtn();
  });

  const addTaskForm = document.getElementById("add-task-form");
  addTaskForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevents page refresh
    await handleAddTaskForm();
  });
});
