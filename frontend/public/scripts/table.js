// frontend/public/scripts/table.js
import * as API from './api.js';
import * as Member from './member.js';

/**
 * สร้างและแสดงตารางงาน
 * @param {Array<Object>} tasks - รายการงานที่ต้องแสดง
 */
export function renderTaskBoard(tasks) {
    const boardContainer = document.getElementById('task-board-container');
    boardContainer.innerHTML = ''; 

    const table = document.createElement('table');
    table.classList.add('task-table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>งาน</th>
                <th>สถานที่</th>
                <th>ค่าจ้าง (บาท)</th>
                <th>กำหนดส่ง</th>
                <th>ผู้โพส</th>
                <th>ดำเนินการ</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = table.querySelector('tbody');
    const user = Member.getCurrentUser();

    tasks.forEach(task => {
        const row = document.createElement('tr');
        // task._id มาจาก MongoDB
        const taskId = task._id || task.id; 
        
        row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.location}</td>
            <td>${task.fee}</td>
            <td>${new Date(task.deadline).toLocaleDateString('th-TH')}</td>
            <td>${task.postedBy}</td>
            <td>
                <button class="take-job-btn" data-task-id="${taskId}" ${user ? '' : 'disabled'}>รับงาน</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    boardContainer.appendChild(table);

    // เพิ่ม Event Listener สำหรับปุ่ม "รับงาน"
    document.querySelectorAll('.take-job-btn').forEach(button => {
        button.addEventListener('click', handleTakeJob);
    });
    
    // แสดงข้อความเมื่อไม่มีงาน
    if (tasks.length === 0) {
        boardContainer.innerHTML = '<p class="no-tasks-message">🎉 ไม่มีงานที่เปิดรับตอนนี้!</p>';
    }
}

// จัดการการกดปุ่ม "รับงาน"
async function handleTakeJob(event) {
    // MongoDB ID เป็น string
    const taskId = event.target.dataset.taskId; 
    const user = Member.getCurrentUser();
    
    if (!user) {
        alert("กรุณา Login ก่อนรับงาน");
        return;
    }

    try {
        // ใช้ user.username เป็น workerUsername
        await API.takeTask(taskId, user.username); 
        alert(`รับงาน "${taskId}" เรียบร้อยแล้ว! งานนี้ถูกนำออกจากบอร์ดแล้ว`);
        
        // โหลดบอร์ดใหม่เพื่อให้งานที่รับหายไป
        loadAndRenderTasks(); 
    } catch (error) {
        alert(`เกิดข้อผิดพลาดในการรับงาน: ${error.message}`);
    }
}

// โหลดงานจาก API และแสดงผล
export async function loadAndRenderTasks() {
    try {
        const tasks = await API.fetchAllTasks();
        renderTaskBoard(tasks);
    } catch (error) {
        document.getElementById('task-board-container').innerHTML = `<p class="error-message">❌ ไม่สามารถโหลดงานได้: ตรวจสอบ Backend (พอร์ต 3000) และการเชื่อมต่ออินเทอร์เน็ต</p>`;
        console.error("Load tasks error:", error);
    }
}