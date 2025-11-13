// backend/src/models/itemModel.js
import { tasks, TASK_STATUS } from '../config/db.js';

// ดึงงานทั้งหมดที่ยัง "Open"
export function getAllOpenTasks() {
    // ส่งสำเนาของ Array กลับไปเพื่อป้องกันการเปลี่ยนแปลงข้อมูลต้นฉบับโดยตรง
    return tasks.filter(task => task.status === TASK_STATUS.OPEN);
}

// เพิ่มงานใหม่
export function createNewTask(taskData) {
    const newTask = {
        id: Date.now(), // ID ง่ายๆ
        title: taskData.title,
        location: taskData.location,
        fee: taskData.fee,
        deadline: taskData.deadline,
        postedBy: taskData.postedBy,
        status: TASK_STATUS.OPEN
    };
    tasks.push(newTask);
    return newTask;
}

// รับงาน (เปลี่ยนสถานะเป็น Taken และนำออกจากบอร์ด)
export function takeTaskById(id, workerUsername) {
    const taskId = parseInt(id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1 || tasks[taskIndex].status !== TASK_STATUS.OPEN) {
        return null; // ไม่พบงานหรือถูกรับไปแล้ว
    }

    const taskToTake = tasks[taskIndex];
    taskToTake.status = TASK_STATUS.TAKEN;
    taskToTake.takenBy = workerUsername;
    
    // ในตัวอย่างนี้ เราจะปล่อยให้งานยังอยู่ใน Array แต่เปลี่ยนสถานะ
    // ใน Frontend เราจะกรองเฉพาะงานที่สถานะเป็น OPEN

    return taskToTake;
}