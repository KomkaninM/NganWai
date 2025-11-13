// main.js
import * as Member from './member2.js';
import * as Table from './table2.js';
import * as API from './api2.js';
import { APP_NAME } from './config2.js';

document.addEventListener('DOMContentLoaded', () => {
    document.title = APP_NAME;
    Table.loadAndRenderTasks(); // โหลดและแสดงงานตอนเริ่มต้น

    setupEventListeners();
    updateHeaderUI();
});

function setupEventListeners() {
    // 1. Event Listener สำหรับการ Login
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    
    // 2. Event Listener สำหรับการ Logout
    document.getElementById('logout-btn').addEventListener('click', handleLogout);

    // 3. Event Listener สำหรับปุ่มเปิด Pop-up เพิ่มงาน
    document.getElementById('add-task-btn').addEventListener('click', openAddTaskModal);

    // 4. Event Listener สำหรับการ Submit ฟอร์มเพิ่มงาน
    document.getElementById('add-task-form').addEventListener('submit', handleAddTask);

    // 5. Event Listener สำหรับการปิด Pop-up
    document.getElementById('close-modal-btn').addEventListener('click', closeAddTaskModal);
    
    // ปิดเมื่อคลิกนอก Modal
    document.getElementById('add-task-modal').addEventListener('click', (e) => {
        if (e.target.id === 'add-task-modal') {
            closeAddTaskModal();
        }
    });
}

// --- ฟังก์ชันการจัดการ Login/Logout ---

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (Member.login(username, password)) {
        alert("Login สำเร็จ!");
        updateHeaderUI();
        Table.loadAndRenderTasks(); // อัปเดตบอร์ดเพื่อให้ปุ่มรับงานทำงาน
    } else {
        alert("Login ล้มเหลว! ลองกรอกข้อมูลอีกครั้ง");
    }
}

function handleLogout() {
    Member.logout();
    alert("Logout สำเร็จ!");
    updateHeaderUI();
    Table.loadAndRenderTasks(); // อัปเดตบอร์ดให้ปุ่มรับงานถูกปิดการใช้งาน
}

function updateHeaderUI() {
    const user = Member.getCurrentUser();
    const loginBox = document.getElementById('login-box');
    const userInfoBox = document.getElementById('user-info-box');
    const addTaskBtn = document.getElementById('add-task-btn');

    if (user) {
        // แสดงกล่องข้อมูลผู้ใช้
        loginBox.style.display = 'none';
        userInfoBox.style.display = 'flex';
        document.getElementById('user-info-username').textContent = user.username;
        
        // แสดงปุ่มเพิ่มงาน
        addTaskBtn.style.display = 'block';
    } else {
        // แสดงกล่อง Login
        loginBox.style.display = 'flex';
        userInfoBox.style.display = 'none';
        
        // ซ่อนปุ่มเพิ่มงาน
        addTaskBtn.style.display = 'none';
    }
}

// --- ฟังก์ชันการจัดการ Modal/เพิ่มงาน ---

function openAddTaskModal() {
    document.getElementById('add-task-modal').style.display = 'flex';
}

function closeAddTaskModal() {
    document.getElementById('add-task-modal').style.display = 'none';
    document.getElementById('add-task-form').reset(); // ล้างฟอร์ม
}

async function handleAddTask(event) {
    event.preventDefault();
    const user = Member.getCurrentUser();
    if (!user) {
        alert("กรุณา Login ก่อนเพิ่มงาน");
        return;
    }

    const newTask = {
        title: document.getElementById('task-title').value,
        location: document.getElementById('task-location').value,
        fee: parseInt(document.getElementById('task-fee').value),
        deadline: document.getElementById('task-deadline').value,
        postedBy: user.username // ผู้โพสคือผู้ที่ Login อยู่
    };

    try {
        await API.addTask(newTask);
        alert("งานถูกโพสเรียบร้อยแล้ว!");
        closeAddTaskModal();
        Table.loadAndRenderTasks(); // โหลดบอร์ดใหม่เพื่อแสดงงานที่เพิ่ม
    } catch (error) {
        alert("ไม่สามารถเพิ่มงานได้: " + error.message);
    }
}