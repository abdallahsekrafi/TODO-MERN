import React, { useEffect } from "react";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Task from "./Task";
import * as message from "./editor/todoInfo";
import { setTodos } from "../slice/todoSlice";
// import { todosLists } from "../slice/todoSlice";
const BASE_URL = "http://localhost:5000";
const ListTask = ({ todoDiscFilter, todoIsDoneFilter }) => {
  const todoList = useSelector((state) => state.todoRdc.todos);
  // const todoList = useSelector(todosLists);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllTodos();
  }, []);
  const getAllTodos = () => {
    axios
      .get(`${BASE_URL}/todos`)
      .then((res) => dispatch(setTodos(res.data)))
      .catch((err) => console.error(err));
  };
  const todoAllFilterResult = todoList.filter(
    (task) =>
      task.description
        .toLowerCase()
        .includes(todoDiscFilter?.toLowerCase().trim()) &&
      task.isdone === todoIsDoneFilter
  );

  const todoDiscFilterResult = todoList.filter((task) =>
    task.description
      .toLowerCase()
      .includes(todoDiscFilter?.toLowerCase().trim())
  );

  const EmpltyList = ({ msg }) => <span className="emptyDataMsg">{msg} </span>;

  return (
    <div className="todoListContenair">
      {!todoList.length ? (
        <EmpltyList msg={message.EMPTY_TODO_TASK} />
      ) : typeof todoIsDoneFilter === "boolean" ? (
        !todoAllFilterResult.length ? (
          <EmpltyList
            msg={
              todoIsDoneFilter
                ? message.EMPTY_DONE_TASK
                : message.EMPTY_NOT_DONE_TASK
            }
          />
        ) : (
          todoAllFilterResult.map((task) => <Task todo={task} />)
        )
      ) : !todoDiscFilterResult.length ? (
        <EmpltyList msg={message.EMPTY_TODO_TASK} />
      ) : (
        todoDiscFilterResult.map((task) => <Task todo={task} />)
      )}
    </div>
  );
};

export default ListTask;
