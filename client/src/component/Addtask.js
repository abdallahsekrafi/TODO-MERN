import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Badge from "react-bootstrap/Badge";
import { addTask, setTodos } from "../slice/todoSlice";
const BASE_URL = "http://localhost:5000";
const Addtask = () => {
  const dispatch = useDispatch();
  //
  const [show, setShow] = useState(false);
  /*  */
  const [description, setDescription] = useState();
  const [isdone, setIsdone] = useState(false);
  const [taskid, setTaskid] = useState();

  /* 2 function for open/close the add movie modal */
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setTaskid(Date.now());
    setShow(true);
  };
  /*    */
  const handlesave = () => {
    //dispatch(addTask({ taskid, description, isdone }));
    axios
      .post(`${BASE_URL}/todos/add`, { description, isdone })
      .then((res) => dispatch(setTodos(res.data)))
      .catch((err) => console.error(err));
    setTaskid(Date.now());
    setDescription("");
    setIsdone(false);
    handleClose();
  };

  return (
    <>
      <Button
        title="Add new task"
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleShow}
      >
        Add task
      </Button>
      {/*  */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextDescription"
            >
              <Col sm="12">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Task description"
                  name="description"
                  value={description}
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formdone">
              <Form.Label column sm="8">
                Select Task state
              </Form.Label>
              <Col sm="4">
                <Select
                  variant="standard"
                  value={isdone}
                  onChange={(e) => setIsdone(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={true}>
                    <Badge bg="success">Done</Badge>
                  </MenuItem>
                  <MenuItem value={false}>
                    <Badge bg="warning" text="dark">
                      Not done
                    </Badge>
                  </MenuItem>
                </Select>
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="contained"
            color="success"
            startIcon={<SaveIcon />}
            onClick={handlesave}
          >
            Save Task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Addtask;
