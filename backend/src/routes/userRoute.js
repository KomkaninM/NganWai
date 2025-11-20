import express from "express";

import * as userController from "../controllers/userController.js";

const router = express.Router();

router.get("/", userController.getUser);
router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.put("/:id", userController.updateUser);

export default router;
