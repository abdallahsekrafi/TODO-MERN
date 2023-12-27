import TodoModel from "../models/todoModel.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await TodoModel.find().sort({ _id: -1 });
    res.status(200).json(todos);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { description, isdone } = req.body;
    const newTodo = new TodoModel({
      description,
      isdone,
    });
    await newTodo.save();
    const todos = await TodoModel.find().sort({ _id: -1 });
    res.status(201).json(todos);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const editTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, isdone } = req.body;
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { description, isdone },
      { new: true }
    );
    const todos = await TodoModel.find().sort({ _id: -1 });
    res.status(201).json(todos);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(req.params.id);
    const todos = await TodoModel.find().sort({ _id: -1 });
    res.status(200).json(todos);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
