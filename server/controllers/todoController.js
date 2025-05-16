import { validateTodo } from "../utils/validator.js";
import todoService from "../services/todoService.js";

/**
 * Récupère tous les todos
 */
export const getTodos = async (req, res) => {
  const todos = await todoService.getAllTodos();
  res.status(200).json(todos);
};

/**
 * Crée un nouveau todo
 */
export const createTodo = async (req, res) => {
  const { error } = validateTodo(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { description, isdone = false } = req.body;
  const newTodo = await todoService.createTodo(description, isdone);
  res.status(201).json(newTodo);
};

/**
 * Met à jour un todo par son ID
 */
export const editTodo = async (req, res) => {
  const { error } = validateTodo(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { id } = req.params;
  const { description, isdone } = req.body;

  const updatedTodo = await todoService.updateTodo(id, description, isdone);
  res.status(200).json(updatedTodo);
};

/**
 * Supprime un todo par son ID
 */
export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  await todoService.deleteTodo(id);
  res.status(200).json({ message: "Todo deleted successfully" });
};
