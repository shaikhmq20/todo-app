import React from "react";

class DisplayTasks extends React.Component {
  render() {
    return (
      <div id="display-tasks">
        {this.props.todos.map((todo) => {
          return (
            <React.Fragment>
              <div
                className="task"
                key={this.props.todos.indexOf(todo)}
                id={this.props.todos.indexOf(todo)}
              >
                {todo.task}
                <div className="delete-task icon">
                  <i
                    className="far fa-trash-alt"
                    onClick={() => this.props.onDelete(todo)}
                  ></i>
                </div>
                <div className="edit-task icon">
                  <i className="far fa-edit"></i>
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
