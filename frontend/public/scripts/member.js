// frontend/public/scripts/member.js
import * as API from './api.js'; 

let currentUser = null; 

// ฟังก์ชัน Login ใช้ API จริง
export async function login(username, password) {
    try {
        const response = await API.login(username, password);
        currentUser = response.user; 
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        return true;
    } catch (error) {
        console.error("Login Error:", error);
        return false;
    }
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