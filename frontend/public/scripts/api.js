import { BACKEND_URL } from "./config.js";

export let token = localStorage.getItem("token") || null;

export async function getUser() {
  const user = await fetch(`${BACKEND_URL}/users`).then((r) => r.json());
  return user;
}

export async function login(username, password) {
  const res = await fetch(`${BACKEND_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (res.ok) {
    token = data.token; // save token
    localStorage.setItem("token", data.token);
  }

  return data;
}

export async function createUser(user) {
  await fetch(`${BACKEND_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
}

export async function getTask() {
  return fetch(`${BACKEND_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => r.json());
}

export async function createTask(task) {
  return fetch(`${BACKEND_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
}

export async function deleteTask(id) {
  return fetch(`${BACKEND_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

