// backend/src/controllers/itemController.js
import * as itemModel from '../models/itemModel.js';

// [GET] /api/tasks
export const getTasks = async (req, res) => {
    try {
        const openTasks = await itemModel.getAllOpenTasks();
        res.status(200).json(openTasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error: error.message });
    }
};

// [POST] /api/tasks
export const addTask = async (req, res) => {
    const { title, location, fee, deadline, postedBy } = req.body;

    if (!title || !location || !fee || !deadline || !postedBy) {
        return res.status(400).json({ message: "Missing required task fields." });
    }

    try {
        const newTask = await itemModel.createNewTask({ title, location, fee: parseInt(fee), deadline, postedBy });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: "Error adding new task.", error: error.message });
    }
};

// [POST] /api/tasks/:id/take
export const takeTask = async (req, res) => {
    const { id } = req.params;
    const { workerUsername } = req.body; 

    if (!workerUsername) {
        return res.status(400).json({ message: "Worker username is required." });
    }

    try {
        const takenTask = await itemModel.takeTaskById(id, workerUsername);

        if (!takenTask) {
            return res.status(404).json({ message: "Task not found or already taken." });
        }

        res.status(200).json({ message: "Task successfully taken.", task: takenTask });
    } catch (error) {
        res.status(500).json({ message: "Error taking task.", error: error.message });
    }
};