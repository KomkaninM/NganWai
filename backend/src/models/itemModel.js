// backend/src/models/itemModel.js
import { Task, TASK_STATUS } from '../config/db.js';

// ดึงงานทั้งหมดที่ยัง "Open"
export async function getAllOpenTasks() {
    return await Task.find({ status: TASK_STATUS.OPEN }).lean(); 
}

// เพิ่มงานใหม่
export async function createNewTask(taskData) {
    const newTask = await Task.create(taskData);
    return newTask;
}

// รับงาน (เปลี่ยนสถานะเป็น Taken)
export async function takeTaskById(id, workerUsername) {
    const taskToTake = await Task.findOneAndUpdate(
        { _id: id, status: TASK_STATUS.OPEN }, 
        { status: TASK_STATUS.TAKEN, takenBy: workerUsername },
        { new: true } 
    );

    return taskToTake; 
}