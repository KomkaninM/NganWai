import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
  description:{
    type: String,
  },
  user:{
    type: String,
    require: true,
  },
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;