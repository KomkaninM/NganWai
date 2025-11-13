// backend/src/config/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// สถานะงาน
export const TASK_STATUS = {
    OPEN: "Open",
    TAKEN: "Taken"
};

// --- 1. Task Schema และ Model ---
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    fee: { type: Number, required: true },
    deadline: { type: Date, required: true },
    postedBy: { type: String, required: true }, 
    status: { 
        type: String, 
        enum: Object.values(TASK_STATUS), 
        default: TASK_STATUS.OPEN 
    },
    takenBy: { type: String, default: null } 
}, { timestamps: true });

export const Task = mongoose.model('Task', taskSchema);

// --- 2. Member Schema และ Model (อย่างง่าย) ---
const memberSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String }
});

export const Member = mongoose.model('Member', memberSchema);

// --- 3. ฟังก์ชันเชื่อมต่อ Database ---
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully to Atlas!');
        
        await seedInitialData(); 

    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        console.error('Check your MONGO_URI, Internet connection, and Atlas IP Access List.'); 
        process.exit(1); 
    }
};

// ฟังก์ชันสร้างข้อมูลผู้ใช้และงานเริ่มต้น
async function seedInitialData() {
    const initialMembers = [
        { username: "userA", password: "passwordA", name: "Alice" },
        { username: "userB", password: "passwordB", name: "Bob" },
        { username: "userC", password: "passwordC", name: "Charlie" }
    ];
    
    // 1. เพิ่มผู้ใช้ถ้ายังไม่มี
    for (const member of initialMembers) {
        const existing = await Member.findOne({ username: member.username });
        if (!existing) {
            await Member.create(member);
        }
    }

    // 2. เพิ่มงานเริ่มต้นถ้ายังไม่มี
    if (await Task.countDocuments() === 0) {
        const initialTasks = [
            { title: "รับของที่โรงเรียน A", location: "โรงเรียน A", fee: 150, deadline: "2025-11-15", postedBy: "userA" },
            { title: "ช่วยรดน้ำต้นไม้ 3 วัน", location: "หมู่บ้าน B", fee: 400, deadline: "2025-11-17", postedBy: "userB" },
            { title: "ประกอบตู้ Ikea", location: "คอนโด C", fee: 800, deadline: "2025-11-20", postedBy: "userC" }
        ];
        await Task.insertMany(initialTasks);
    }
    console.log('Initial data check complete.');
}

export default connectDB;