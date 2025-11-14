import Task from "../models/taskModel.js";

/** @type {import("express").RequestHandler} */
export const getTask = async (req, res) => {
  try {
    const task = await Task.find();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/** @type {import("express").RequestHandler} */
export const createTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();

    res.status(200).json({ message: "OK" });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

/** @type {import("express").RequestHandler} */
export const deleteItem = async (req, res) => {
  try {
     const { id } = req.params;
     if (!id){
      return res.status(400).json({error : "Missing item ID"});
     }
     const deletedItem = await Task.findByIdAndDelete(id);
     if (!deletedItem) {
      return res.status(404).json({error : "Item not found"});
     }
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Internal server error."});
  }
};