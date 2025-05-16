import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import todoService from "../../services/todoService";
import { useDispatch } from "react-redux";
import { updateTodo } from "../../slice/todoSlice";
import * as message from "../utils/message";
import { toast } from "react-toastify";
const EditTodoModal = ({ todo, onClose }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState(todo.description);
  const [isdone, setIsdone] = useState(todo.isdone);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleSave = async () => {
    try {
      const res = await todoService.updateTodo(todo._id, description, isdone);
      dispatch(updateTodo(res.data));
      toast.info(message.SUCCESS_UPDATED_TASK);
      handleClose();
    } catch (err) {
      toast.error(message.ERROR_UPDATED_TASK);
      console.error(err);
    }
  };

  return (
    <>
      <IconButton
        title="Edit task"
        color="info"
        sx={{
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.2)",
            color: "info",
          },
        }}
        onClick={handleClickOpen}
      >
        <EditIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <FormControl fullWidth margin="dense">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={isdone}
              label="Status"
              onChange={(e) => setIsdone(e.target.value)}
            >
              <MenuItem value={true}>
                <Chip label="Done" size="small" color="success" />
              </MenuItem>
              <MenuItem value={false}>
                <Chip label="Not Done" size="small" color="warning" />
              </MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditTodoModal;
