// backend/src/config/db.js

const TASK_STATUS = {
    OPEN: "Open",
    TAKEN: "Taken"
};

// 1. Task Storage (งาน)
let tasks = [
    { id: 101, title: "รับของที่โรงเรียน A", location: "โรงเรียน A", fee: 150, deadline: "2025-11-15", postedBy: "userA", status: TASK_STATUS.OPEN },
    { id: 102, title: "ช่วยรดน้ำต้นไม้ 3 วัน", location: "หมู่บ้าน B", fee: 400, deadline: "2025-11-17", postedBy: "userB", status: TASK_STATUS.OPEN },
    { id: 103, title: "ประกอบตู้ Ikea", location: "คอนโด C", fee: 800, deadline: "2025-11-20", postedBy: "userC", status: TASK_STATUS.OPEN }
];

// 2. Member Storage (ผู้ใช้)
let members = [
    { username: "userA", password: "passwordA", name: "Alice" },
    { username: "userB", password: "passwordB", name: "Bob" },
    { username: "userC", password: "passwordC", name: "Charlie" }
];

export { tasks, members, TASK_STATUS };