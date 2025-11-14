import * as API from './api.js';
import * as USER from './userHandle.js';

/**
 * แสดงตารางงานทั้งหมด
 * @param {Array<Object>} tasks 
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
                <th>ผู้โพสต์</th>
                <th>ดำเนินการ</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = table.querySelector('tbody');

    if (tasks.length === 0) {
        boardContainer.innerHTML = `<p class="no-tasks-message">🎉 ไม่มีงานที่เปิดรับตอนนี้!</p>`;
        return;
    }

    tasks.forEach(task => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.location}</td>
            <td>${task.fee}</td>
            <td>${new Date(task.deadline).toLocaleDateString('th-TH')}</td>
            <td>${task.owner ?? 'ไม่ระบุ'}</td>

            <td>
                <button class="take-job-btn" data-id="${task._id}">
                    รับงาน
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });

    boardContainer.appendChild(table);

    // Event Listener สำหรับปุ่มรับงาน
    document.querySelectorAll('.take-job-btn').forEach(button => {
        button.addEventListener('click', handleTakeJob);
    });
}

/**
 * เมื่อกดปุ่ม "รับงาน"
 */
async function handleTakeJob(event) {
    const taskId = event.target.dataset.id; // ดึง _id จากปุ่ม

    if (!taskId) {
        alert("ไม่พบรหัสงาน (taskId)");
        return;
    }

    try {
        // ลบงานออกจากฐานข้อมูล
        await API.deleteTask(taskId);

        alert(`รับงานสำเร็จ! งานถูกลบออกจากบอร์ดแล้ว`);

        // โหลดงานใหม่
        loadAndRenderTasks();
    } catch (error) {
        alert(`เกิดข้อผิดพลาดในการรับงาน: ${error.message}`);
        console.error(error);
    }
}

/**
 * โหลดงานจาก API แล้วแสดง
 */
export async function loadAndRenderTasks() {
    try {
        const tasks = await API.getTask();
        renderTaskBoard(tasks);
    } catch (error) {
        document.getElementById('task-board-container').innerHTML = `
            <p class="error-message">
                ❌ ไม่สามารถโหลดงานได้: ตรวจสอบ Backend ว่ารันพอร์ต 3000 อยู่หรือไม่
            </p>`;
        console.error("Load tasks error:", error);
    }
}
