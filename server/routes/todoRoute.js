import express from "express";
import {
  getTodos,
  createTodo,
  editTodo,
  deleteTodo,
} from "../controllers/todoController.js";

const router = express.Router();

router.get("/", getTodos);
router.post("/add", createTodo);
router.put("/edit/:id", editTodo);
router.delete("/delete/:id", deleteTodo);

export default router;
