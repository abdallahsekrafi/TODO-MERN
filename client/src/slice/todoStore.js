import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";

const todoStore = configureStore({
  reducer: {
    todoRdc: todoReducer,
  },
});

export default todoStore;
