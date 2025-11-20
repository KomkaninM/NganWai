import express from "express";

import * as taskController from "../controllers/taskController.js";

const router = express.Router();

router.get("/", taskController.getTask);
router.post("/", taskController.createTask);
router.delete("/:id", taskController.deleteTask);

export default router;
