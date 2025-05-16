// todoRoute.js

import express from "express";
import {
  getTodos,
  createTodo,
  editTodo,
  deleteTodo,
} from "../controllers/todoController.js";

// Active le support des async/await dans Express sans try/catch
import "express-async-errors";

const router = express.Router();

// Route de base : /
router.route("/").get(getTodos).post(createTodo);

// Routes avec paramètre ID : /:id
router.route("/:id").put(editTodo).delete(deleteTodo);

export default router;
