// member.js
let currentUser = null; // สถานะของผู้ใช้ปัจจุบัน

// ฟังก์ชันจำลองการ Login
export function login(username, password) {
    // ในตัวอย่างนี้ เราจะอนุญาตให้ login ได้ถ้ามี username และ password ไม่ว่างเปล่า
    if (username && password) {
        currentUser = { username: username, email: `${username}@example.com` };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        return true;
    }
    return false;
}

// ฟังก์ชัน Logout
export function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
}

// ตรวจสอบสถานะการ Login
export function getCurrentUser() {
    if (currentUser) {
        return currentUser;
    }
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        return currentUser;
    }
    return null;
}