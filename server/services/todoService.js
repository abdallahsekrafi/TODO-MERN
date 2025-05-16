import TodoModel from "../models/todoModel.js";

class TodoService {
  async getAllTodos() {
    return await TodoModel.find().sort({ _id: -1 });
  }

  async createTodo(description, isdone = false) {
    const newTodo = new TodoModel({ description, isdone });
    await newTodo.save();
    return newTodo;
  }

  async updateTodo(id, description, isdone) {
    const updated = await TodoModel.findByIdAndUpdate(
      id,
      { description, isdone },
      { new: true }
    );
    if (!updated) throw new Error("Todo not found");
    return updated;
  }

  async deleteTodo(id) {
    const deleted = await TodoModel.findByIdAndDelete(id);
    if (!deleted) throw new Error("Todo not found");
    return { message: "Todo deleted" };
  }
}

export default new TodoService();
