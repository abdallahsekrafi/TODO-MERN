import { useEffect, useState } from "react";
import "../../App.css";
import { useDispatch } from "react-redux";
import Task from "../Task/Task";
import * as message from "../utils/message";
import todoService from "../../services/todoService";
import { setTodos } from "../../slice/todoSlice";
import { useFilteredTodos } from "../../hooks/useFilteredTodos";
import { Box } from "@mui/material";
import AddTodoModal from "../modals/AddTodoModal";
const ListTask = ({ todoDiscFilter, todoIsDoneFilter }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // État de chargement
  const filteredTodos = useFilteredTodos(todoDiscFilter, todoIsDoneFilter);
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await todoService.getTodos();
        dispatch(setTodos(res.data));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };
    fetchTodos();
  }, [dispatch]);

  const isEmpty = !filteredTodos.length;

  const getEmptyMessage = () => {
    if (typeof todoIsDoneFilter === "boolean") {
      return todoIsDoneFilter
        ? message.EMPTY_DONE_TASK
        : message.EMPTY_NOT_DONE_TASK;
    }
    return message.EMPTY_TODO_TASK;
  };

  return (
    <div className="todoListContenair">
      {loading ? (
        <div className="loading">Loading todos...</div>
      ) : isEmpty ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={2}
          className="emptyDataMsg"
        >
          <p>{getEmptyMessage()}</p>

          <AddTodoModal />
        </Box>
      ) : (
        filteredTodos.map((task) => (
          <Task
            todo={task}
            isFiltering={!!todoDiscFilter || todoIsDoneFilter !== undefined}
          />
        ))
      )}
    </div>
  );
};

export default ListTask;
