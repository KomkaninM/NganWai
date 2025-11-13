// api.js
import { initialTasks, TASK_STATUS } from './config2.js';

let tasks = [...initialTasks]; // ใช้ตัวแปรนี้จำลองฐานข้อมูลงาน

// ฟังก์ชันจำลองการดึงงานทั้งหมด
export function fetchAllTasks() {
    return new Promise(resolve => {
        // กรองเฉพาะงานที่สถานะเป็น OPEN
        const openTasks = tasks.filter(task => task.status === TASK_STATUS.OPEN);
        setTimeout(() => resolve(openTasks), 100); // จำลองการดีเลย์ของ API
    });
}

// ฟังก์ชันจำลองการเพิ่มงานใหม่
export function addTask(newTask) {
    return new Promise(resolve => {
        const id = Date.now(); // สร้าง ID ง่ายๆ
        const taskWithId = { ...newTask, id, status: TASK_STATUS.OPEN };
        tasks.push(taskWithId);
        setTimeout(() => resolve(taskWithId), 100);
    });
}

// ฟังก์ชันจำลองการรับงาน
export function takeTask(taskId, workerUsername) {
    return new Promise((resolve, reject) => {
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex > -1 && tasks[taskIndex].status === TASK_STATUS.OPEN) {
            // อัปเดตสถานะของงาน
            tasks[taskIndex].status = TASK_STATUS.TAKEN;
            tasks[taskIndex].takenBy = workerUsername;
            
            // ลบงานออกจาก Array เพื่อจำลองการหายไปจากบอร์ด
            const takenTask = tasks.splice(taskIndex, 1)[0]; 

            // แทนที่ด้วยการส่งคืนงานที่ถูกรับ
            resolve(takenTask); 
        } else {
            reject(new Error("Task not found or already taken."));
        }
    });
}