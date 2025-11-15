// Task Logic Controller

import Task, { TASK_STATUS } from '../models/task.model.js';

// [GET] /api/tasks

/*
    ดึง “รายการงานทั้งหมดที่ยังเปิดรับอยู่” ส่งกลับไปเป็น array ให้ frontend ไปแสดงในตาราง
*/

export const getTasks = async (req, res) => {
  try {
    const openTasks = await Task.find({ status: TASK_STATUS.OPEN }).lean();
    res.status(200).json(openTasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

// [POST] /api/tasks (Adding a New Task)
/*
    ผู้ใช้กด “Add Task” จากหน้าเว็บ แล้ว frontend ส่งข้อมูลงานมาใน req.body
*/
export const addTask = async (req, res) => {
  const { title, location, fee, postedBy } = req.body; // ดึงข้อมูลจาก request body

  if (!title || !location || !fee || !postedBy) {
    return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบทุกช่อง' });
  }

  try {
    const newTask = await Task.create({
      title,
      location,
      fee,
      postedBy,
      status: TASK_STATUS.OPEN,
    });

    res.status(201).json({ message: 'เพิ่มงานสำเร็จ', task: newTask });
  } catch (error) {
    res.status(500).json({ message: 'Error adding task', error: error.message });
  }
};

// [POST] /api/tasks/:id/take (Take a Task)
export const takeTask = async (req, res) => {
  const { id } = req.params;                        // ดึง id งานจากพารามิเตอร์ URL
  const { workerUsername } = req.body;     // ดึงชื่อผู้รับงานจาก request body

  if (!workerUsername) {
    return res.status(400).json({ message: 'Worker username is required.' });
  }

  try {
    const takenTask = await Task.findOneAndUpdate(
      { _id: id, status: TASK_STATUS.OPEN },
      {
        status: TASK_STATUS.TAKEN,
        takenBy: workerUsername,
      },
      { new: true }
    );

    if (!takenTask) {
      return res
        .status(404)
        .json({ message: 'Task not found or already taken.' });
    }

    res.status(200).json({
      message: 'Task successfully taken.',
      task: takenTask,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error taking task.', error: error.message });
  }
};
