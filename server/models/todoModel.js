import mongoose from "mongoose";

const todoScheme = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  isdone: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const TodoModel = mongoose.model("Todo", todoScheme);

export default TodoModel;
