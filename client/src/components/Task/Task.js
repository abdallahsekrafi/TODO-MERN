import { useState, memo } from "react";
import "../../App.css";
import { Stack, IconButton, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../../slice/todoSlice";
import todoService from "../../services/todoService";
import EditTodoModal from "../modals/EditTodoModal";
import Chip from "@mui/material/Chip";
import * as message from "../utils/message";
import ConfirmDialog from "../modals/ConfirmDialog";
import { toast } from "react-toastify";
const Task = ({ todo }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const handleDeleteClick = () => {
    setConfirmOpen(true);
  };
  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setIsHovered(false);
  };
  const handleConfirmDelete = async () => {
    try {
      await todoService.deleteTodo(todo._id);
      dispatch(deleteTodo({ _id: todo._id }));
      toast.success(message.SUCCESS_DELETED_TASK);
    } catch (err) {
      toast.success(message.ERROR_DELETED_TASK);
      console.error(err);
    } finally {
      setConfirmOpen(false);
    }
  };

  return (
    <div
      className="oneTask"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        <p>{todo.description}</p>

        <Stack direction="row" spacing={1} alignItems="center">
          <Chip
            label={todo.isdone ? "Done" : "Not done"}
            color={todo.isdone ? "success" : "warning"}
            size="small"
          />
          {isHovered && (
            <Stack direction="row" spacing={0.5}>
              <Divider orientation="vertical" flexItem />
              <IconButton
                title="Delete task"
                onClick={handleDeleteClick}
                color="error"
                sx={{
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.2)",
                    color: "error",
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
              <Divider orientation="vertical" flexItem />
              <EditTodoModal todo={todo} onClose={handleCancelDelete} />
            </Stack>
          )}
          <ConfirmDialog
            open={confirmOpen}
            onClose={handleCancelDelete}
            onConfirm={handleConfirmDelete}
            message={message.CONFIRM_DELETE_TASK}
          />
        </Stack>
      </Stack>
    </div>
  );
};

export default memo(Task);
