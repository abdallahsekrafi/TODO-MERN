import { createSlice } from "@reduxjs/toolkit";

const initialTodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todoSlc",
  initialState: initialTodoState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload; //.reverse()
    },
    addTask: (state, action) => {
      state.todos.unshift(action.payload);
    },
    editTask: (state, action) => {
      for (const task of state.todos) {
        if (task.taskid === action.payload.taskid) {
          task.description = action.payload.description;
          task.isdone = action.payload.isdone;
          break;
        }
      }
    },
    deteleTask: (state, action) => {
      const taskIndex = state.todos.findIndex((el) => {
        return el.taskid === action.payload.taskid;
      });
      state.todos.splice(taskIndex, 1);
    },
  },
});

export const { addTask, editTask, deteleTask, setTodos } = todoSlice.actions;
// export const todosLists = (state) => state.todoRdc.todos;
export default todoSlice.reducer;
