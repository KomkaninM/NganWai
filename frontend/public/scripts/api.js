import { BACKEND_URL } from "./config.js";

export async function getUser() {
  const user = await fetch(`${BACKEND_URL}/users`).then((r) => r.json());
  return user;
}

export async function createUser(user) {
  await fetch(`${BACKEND_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
}

export async function getTask() {
  const user = await fetch(`${BACKEND_URL}/tasks`).then((r) => r.json());
  return user;
}

export async function createTask(task) {
  await fetch(`${BACKEND_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
}

export async function deleteTask(id) {
  await fetch(`${BACKEND_URL}/tasks/${id}`, {
    method: "DELETE",
  });
}

