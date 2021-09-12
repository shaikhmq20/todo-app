import React from "react";
import DisplayTasks from "./displayTasks";

class GetTask extends React.Component {
  state = {
    tasks:
      JSON.parse(localStorage.getItem("tasks")) === null
        ? []
        : JSON.parse(localStorage.getItem("tasks")),
  };

  addTask = () => {
    const value = document.getElementById("get-task").value;
    let tasks = this.state.tasks;

    if (value !== "") tasks.push({ value });

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

  render() {
    return (
      <React.Fragment>
        <div id="task-input">
          <input
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
