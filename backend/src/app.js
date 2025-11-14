import express from "express";
import cors from "cors";

import userRoute from "./routes/userRoute.js";
import taskRoute from "./routes/taskRoute.js";

const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow request from other origin (Frontend which is at different port)
app.use(cors());

// use routes
app.use("/users", userRoute);
app.use("/tasks", taskRoute);



export default app;
