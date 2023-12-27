import React from "react";
import "../App.css";
import axios from "axios";
import { Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import EditModel from "./editor/editModel";
import Badge from "react-bootstrap/Badge";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";
import { deteleTask, setTodos } from "../slice/todoSlice";
import { useState } from "react";

const BASE_URL = "http://localhost:5000";
const Task = ({ todo }) => {
  const dispatch = useDispatch();
  const [iconColore, setIconColore] = useState("action");
  const todoToDelete = todo;
  const handleDelete = () => {
    console.log("delete: " + todoToDelete.description);
    //dispatch(deteleTask(todoToDelete));
    axios
      .delete(`${BASE_URL}/todos/delete/${todoToDelete._id}`)
      .then((res) => dispatch(setTodos(res.data)))
      .catch((err) => console.error(err));
  };
  return (
    <div className="oneTask">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <p>{todo.description}</p>
        </Stack>

        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={1}
          divider={
            <Divider
              style={{ backgroundColor: "rgb(162, 167, 162)" }}
              orientation="vertical"
              flexItem
            />
          }
        >
          {todo.isdone ? (
            <h6>
              <Badge bg="success">Done</Badge>
            </h6>
          ) : (
            <h6>
              <Badge bg="warning" text="dark">
                Not done
              </Badge>
            </h6>
          )}
          <IconButton
            title="Delete task"
            aria-label="delete"
            onClick={handleDelete}
            onMouseOver={() => setIconColore("error")}
            onMouseOut={() => setIconColore("action")}
          >
            <DeleteIcon color={iconColore} />
          </IconButton>
          <EditModel todoValue={todo} />
        </Stack>
      </Stack>
    </div>
  );
};

export default Task;
