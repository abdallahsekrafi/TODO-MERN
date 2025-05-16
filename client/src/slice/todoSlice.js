import { createSlice } from "@reduxjs/toolkit";

const initialTodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todoSlc",
  initialState: initialTodoState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.unshift(action.payload);
    },
    updateTodo: (state, action) => {
      const index = state.todos.findIndex((t) => t._id === action.payload._id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((t) => t._id !== action.payload._id);
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, setTodos } = todoSlice.actions;
export default todoSlice.reducer;
