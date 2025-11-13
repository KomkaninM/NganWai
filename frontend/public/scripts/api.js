// frontend/public/scripts/api.js
// API_BASE_URL ชี้ไปที่พอร์ตใหม่ 3221
const API_BASE_URL = 'http://localhost:3222'; 

// ฟังก์ชันดึงงานทั้งหมด (GET /api/tasks)
export async function fetchAllTasks() {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) {
        throw new Error('Failed to fetch tasks from API');
    }
    return response.json();
}

// ฟังก์ชันเพิ่มงานใหม่ (POST /api/tasks)
export async function addTask(newTask) {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add task to API');
    }
    return response.json();
}

// ฟังก์ชันรับงาน (POST /api/tasks/:id/take)
export async function takeTask(taskId, workerUsername) {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/take`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ workerUsername })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to take task via API');
    }
    return response.json();
}

// ฟังก์ชัน Login (POST /api/members/login)
export async function login(username, password) {
    const response = await fetch(`${API_BASE_URL}/members/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    
    if (response.ok) {
        return response.json();
    } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed.');
    }
}