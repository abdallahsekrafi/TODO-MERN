import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import Chip from "@mui/material/Chip";
import todoService from "../../services/todoService";
import { useDispatch } from "react-redux";
import { addTodo } from "../../slice/todoSlice";
import * as message from "../utils/message";
import { toast } from "react-toastify";
const AddTodoModal = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [isdone, setIsdone] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    try {
      const res = await todoService.createTodo(description, isdone);
      dispatch(addTodo(res.data));
      toast.success(message.SUCCESS_ADDED_TASK);
      setDescription("");
      setIsdone(false);
      handleClose();
    } catch (err) {
      toast.success(message.ERROR_ADDING_TASK);
      console.error(err);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{
          fontWeight: "bold",
          color: "#f1ece5",
          "&:hover": {
            color: "#444444",
          },
        }}
        onClick={handleClickOpen}
      >
        Add Task
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add New Task</DialogTitle>
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
          <Button onClick={handleSave} variant="contained" color="success">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddTodoModal;
