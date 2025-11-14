import {createTask,deleteTask} from "./api.js";
import {loadAndRenderTasks} from "./taskTable.js";
import { getCurrentUser } from "./userHandle.js";

export async function handleAddTaskbtn() {
  document.querySelector(".modal").style.display = "block";
}

export async function handlecloseModalbtn() {
  document.querySelector(".modal").style.display = "none";
}

export async function handleAddTaskForm() {
  const title = document.getElementById("task-title").value.trim();
  const location = document.getElementById("task-location").value.trim();
  const fee = document.getElementById("task-fee").value.trim();
  const deadline = document.getElementById("task-deadline").value;
  const user = getCurrentUser();
  if (!title || !location || !fee || !deadline || !user) {
    alert("Please enter all information");
    return;
  }

  const payload = { title, location, fee: Number(fee), deadline ,user};
  try {
    await createTask(payload);
    alert("Task created!");
    document.getElementById("add-task-form").reset(); // reset form
    document.querySelector(".modal").style.display = "none"; // hide modal
    await loadAndRenderTasks();
  } catch (err) {
    console.error(err);
    alert("Failed to create task");
  }
}

export async function handleDeleteTask(id) {
  await deleteTask(id);
  await loadAndRenderTasks();
}

