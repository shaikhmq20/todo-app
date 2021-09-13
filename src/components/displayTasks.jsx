import React from "react";

class DisplayTasks extends React.Component {
  render() {
    return (
      <div id="display-tasks">
        {this.props.tasks.map((task) => {
          return (
            <React.Fragment>
              <div
                className="task"
                key={this.props.tasks.indexOf(task)}
                id={this.props.tasks.indexOf(task)}
              >
                {task.value}
                <div className="delete-task" key={this.props.tasks.indexOf(task)}>
                  <i
                    class="far fa-trash-alt"
                    onClick={() => this.props.onDelete(task)}
                  ></i>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  }
}

export default DisplayTasks;
