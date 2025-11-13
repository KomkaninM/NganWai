// config.js
// เก็บค่าคงที่หรือการตั้งค่าที่ใช้ร่วมกัน
export const BACKEND_URL = "http://localhost:3222";

export const APP_NAME = "Quick Task Finder";
export const TASK_STATUS = {
    OPEN: "Open",
    TAKEN: "Taken"
};

// ข้อมูลงานเริ่มต้น (จำลองฐานข้อมูล)
export const initialTasks = [
    { id: 101, title: "รับของที่โรงเรียน A", location: "โรงเรียน A", fee: 150, deadline: "2025-11-15", postedBy: "userA", status: TASK_STATUS.OPEN },
    { id: 102, title: "ช่วยรดน้ำต้นไม้ 3 วัน", location: "หมู่บ้าน B", fee: 400, deadline: "2025-11-17", postedBy: "userB", status: TASK_STATUS.OPEN },
    { id: 103, title: "ประกอบตู้ Ikea", location: "คอนโด C", fee: 800, deadline: "2025-11-20", postedBy: "userC", status: TASK_STATUS.OPEN }
];