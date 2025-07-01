import "./App.css";
import { useState } from "react";
import { Stack } from "@mui/material";
import { IconButton, Tooltip } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ListTask from "./components/ListTask/ListTask";
import AddTodoModal from "./components/modals/AddTodoModal";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Input } from "@mui/material";
import Chip from "@mui/material/Chip";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [filterByDescr, setFilterByDescr] = useState("");
  const [filterByIsDone, setFilterByIsDone] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
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
        <AddTodoModal />
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
            <Chip label="Done" color="success" size="small" />
          </MenuItem>
          <MenuItem value={false}>
            <Chip label="Not done" color="warning" size="small" />
          </MenuItem>
        </Select>
        <Tooltip
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          <IconButton
            onClick={() => setDarkMode(!darkMode)}
            color="inherit"
            sx={{
              boxShadow: darkMode ? "0 2px 6px #fff" : "0 2px 6px #444444",
              transition: "box-shadow 0.3s ease, transform 0.2s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>
      </Stack>

      <ListTask
        todoDiscFilter={filterByDescr}
        todoIsDoneFilter={filterByIsDone}
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
      />
    </div>
  );
}

export default App;
