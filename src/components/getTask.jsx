import React from "react";
import DisplayTasks from "./displayTasks";
import { getTheme } from "../themes";

class GetTask extends React.Component {
  state = {
    task: "",
    tasks:
      JSON.parse(localStorage.getItem("tasks")) === null
        ? []
        : JSON.parse(localStorage.getItem("tasks")),

    themes: getTheme(),
    isDisplayed: true,
    activeTheme: getTheme()[0],
  };

  handleChange = ({ currentTarget: input }) => {
    this.setState({ task: input.value });
  };

  addTask = () => {
    let tasks = this.state.tasks;
    const task = this.state.task;
    if (
      tasks.find((t) => t.value.toLowerCase() === task.toLowerCase()) ===
        undefined ||
      task !== ""
    )
      tasks.push({ value: task });
    else alert("The task is already assigned!");

    this.setState({ tasks });
    localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
    document.getElementById("get-task").value = "";
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.addTask();
    }
  };

  handleDelete = (task) => {
    const tasks = this.state.tasks;
    tasks.splice(tasks.indexOf(task), 1);
    const localTasks = JSON.parse(localStorage.getItem("tasks"));
    localTasks.splice(tasks.indexOf(task), 1);
    this.setState({ tasks });
    localStorage.setItem("tasks", JSON.stringify(localTasks));
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
            placeHolder="Enter task"
            onKeyPress={this.handleKeyPress}
          />
          <button type="submit" id="add" onClick={() => this.addTask()}>
            +
          </button>
        </div>
        <DisplayTasks
          tasks={this.state.tasks}
          onDelete={(task) => this.handleDelete(task)}
        />
      </React.Fragment>
    );
  }
}

export default GetTask;
