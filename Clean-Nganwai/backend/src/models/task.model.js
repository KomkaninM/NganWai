// Model สำหรับ Task 
import mongoose from 'mongoose';

export const TASK_STATUS = {
  OPEN: 'Open',
  TAKEN: 'Taken',
};

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    fee: { type: Number, required: true },
    postedBy: { type: String, required: true }, // username ของคนโพสต์
    takenBy: { type: String, default: null },   // username ของคนรับงาน
    status: {
      type: String,
      enum: Object.values(TASK_STATUS), // จำกัดให้เป็น 'Open' หรือ 'Taken' เท่านั้น
      default: TASK_STATUS.OPEN, //  สถานะเริ่มต้นเป็น 'Open'
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
