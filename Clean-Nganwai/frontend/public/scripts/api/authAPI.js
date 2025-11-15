const API_BASE = "http://localhost:3222/api/members";

export async function registerUser(data) {
  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (err) {
    console.error("Register error:", err);
    return { message: "Cannot register" };
  }
}


export async function loginUser(studentID, password) {
  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentID, password }),
    });

    return await res.json();
  } catch (err) {
    console.error("Login error:", err);
    return { message: "Cannot login" };
  }
}
