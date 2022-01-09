import React from "react";
import DisplayTasks from "./displayTasks";
import { getTheme } from "../themes";
import axios from "axios";

class GetTask extends React.Component {
  state = {
    task: "",
    todos: [],
    themes: getTheme(),
    isDisplayed: true,
    activeTheme: getTheme()[0],
  };

  componentDidMount() {
    this.getTask();
  }

  getTask = async () => {
    const todos = [];
    await axios
      .get("http://localhost:5000/tasks/")
      .then((res) => {
        if (res.data.length > 0) {
          res.data.forEach((t) => {
            todos.push(t);
          });
          console.log(todos);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ todos });
  };

  handleChange = ({ currentTarget: input }) => {
    this.setState({ task: input.value });
  };

  addTask = async () => {
    await axios
      .post("http://localhost:5000/tasks/addTask/", { task: this.state.task })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    this.getTask();
    this.setState({ task: "" });
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.addTask();
    }
  };

  handleDelete = (task) => {
    const todos = this.state.todos;
    todos.splice(todos.indexOf(task), 1);
    axios
      .delete("http://localhost:5000/tasks/" + task._id)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    this.setState({ todos });
  };

  handleTheme = () => {
    const option = document.getElementById("options");
    let isDisplayed = this.state.isDisplayed;
    isDisplayed = !isDisplayed;
    this.setState({ isDisplayed });
    const property = this.optionDisplay();
    option.style.display = property;
  };

  handleThemeChange = (theme) => {
    let activeTheme = theme;
    this.setState({ activeTheme });
    const root = document.documentElement;
    root.style.setProperty("--task-color", theme.taskColor);
    root.style.setProperty("--bg-color", theme.bgColor);
    root.style.setProperty("--text-color", theme.textColor);
  };

  getCaretClass = () => {
    return this.state.isDisplayed ? "fas fa-angle-down" : "fas fa-angle-up";
  };

  optionDisplay = () => {
    return this.state.isDisplayed ? "block" : "none";
  };

  activeTheme = (theme) => {
    return theme.name === this.state.activeTheme
      ? "theme active-theme"
      : "theme";
  };

  render() {
    const caretClass = this.getCaretClass();

    return (
      <React.Fragment>
        <div id="themes">
          <button id="select-theme" onClick={() => this.handleTheme()}>
            Select a theme <i class={caretClass}></i>
          </button>
          <div id="options">
            {this.state.themes.map((theme) => {
              const activeClass = this.activeTheme(theme);
              return (
                <div
                  className={activeClass}
                  onClick={() => this.handleThemeChange(theme)}
                >
                  {theme.name}
                </div>
              );
            })}
          </div>
        </div>
        <div id="task-input">
          <input
            value={this.state.task}
            onChange={this.handleChange}
            type="text"
            name="tasks"
            id="get-task"
            placeholder="Enter task..."
            onKeyPress={this.handleKeyPress}
          />
          <button type="submit" id="add" onClick={() => this.addTask()}>
            +
          </button>
        </div>
        <DisplayTasks
          task={this.state.task}
          todos={this.state.todos}
          onDelete={(task) => this.handleDelete(task)}
        />
      </React.Fragment>
    );
  }
}

export default GetTask;
