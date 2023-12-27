import "./App.css";
import React, { useState } from "react";
import { Stack } from "@mui/material";
import ListTask from "./component/ListTask";
import Addtask from "./component/Addtask";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Input } from "@mui/material";
import Badge from "react-bootstrap/Badge";

function App() {
  const [filterByDescr, setFilterByDescr] = useState("");
  const [filterByIsDone, setFilterByIsDone] = useState("");

  return (
    <div className="App">
      <div className="appTitle">
        <h1>Todo App</h1>
      </div>
      <Stack
        className="appAction"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={0}
      >
        <Addtask />
        <Input
          title="Search task"
          className="inputsearch"
          type="text"
          placeholder="Search task"
          onChange={(e) => setFilterByDescr(e.target.value)}
        />
        <Select
          title="Filter task"
          variant="standard"
          value={filterByIsDone}
          onChange={(e) => setFilterByIsDone(e.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value={""}>
            <FilterAltIcon color="primary" />
            All
          </MenuItem>
          <MenuItem value={true}>
            <Badge bg="success">Done</Badge>
          </MenuItem>
          <MenuItem value={false}>
            <Badge bg="warning" text="dark">
              Not done
            </Badge>
          </MenuItem>
        </Select>
      </Stack>

      <ListTask
        todoDiscFilter={filterByDescr}
        todoIsDoneFilter={filterByIsDone}
      />
    </div>
  );
}

export default App;
