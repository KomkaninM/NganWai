// table.js
import * as API from './api2.js';
import * as Member from './member2.js';

/**
 * สร้างและแสดงตารางงาน
 * @param {Array<Object>} tasks - รายการงานที่ต้องแสดง
 */
export function renderTaskBoard(tasks) {
    const boardContainer = document.getElementById('task-board-container');
    boardContainer.innerHTML = ''; // ล้างบอร์ดเก่า

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
        row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.location}</td>
            <td>${task.fee}</td>
            <td>${task.deadline}</td>
            <td>${task.postedBy}</td>
            <td>
                <button class="take-job-btn" data-task-id="${task.id}" ${user ? '' : 'disabled'}>รับงาน</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    boardContainer.appendChild(table);

    // เพิ่ม Event Listener สำหรับปุ่ม "รับงาน"
    document.querySelectorAll('.take-job-btn').forEach(button => {
        button.addEventListener('click', handleTakeJob);
    });
}

// จัดการการกดปุ่ม "รับงาน"
async function handleTakeJob(event) {
    const taskId = parseInt(event.target.dataset.taskId);
    const user = Member.getCurrentUser();
    
    if (!user) {
        alert("กรุณา Login ก่อนรับงาน");
        return;
    }

    try {
        await API.takeTask(taskId, user.username);
        alert(`รับงาน "${taskId}" เรียบร้อยแล้ว!`);
        // โหลดบอร์ดใหม่เพื่อให้งานที่รับหายไป
        loadAndRenderTasks(); 
    } catch (error) {
        alert(`เกิดข้อผิดพลาดในการรับงาน: ${error.message}`);
    }
}

// โหลดงานจาก API และแสดงผล
export async function loadAndRenderTasks() {
    const tasks = await API.fetchAllTasks();
    renderTaskBoard(tasks);
}