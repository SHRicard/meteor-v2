import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/TasksCollection";
import { Task } from "./Task";
import TaskFrom from "./TaskFrom.jsx";

const toggleChecked = ({ _id, isChecked }) => {
  TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked,
    },
  });
};
const deleteTask = ({ _id }) => TasksCollection.remove(_id);

export const App = () => {
  // const pendingTasksCount = useTracker(() =>
  //   TasksCollection.find(hideCompletedFilter).count()
  // );

  // const pendingTasksTitle = `${
  //   pendingTasksCount ? ` (${pendingTasksCount})` : ""
  // }`;
  const tasks = useTracker(() =>
    TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  );
  const [Completed, setCompleted] = useState(false);
  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>📝️ To Do List By Ricardo xD</h1>
          </div>
        </div>
      </header>

      <div className="main">
        <TaskFrom />
        <div className="filter">
          <button onClick={() => setCompleted(!Completed)}>
            {Completed ? "Mostrar Todo " : " Completed"}
          </button>
        </div>
        <ul className="tasks">
          {tasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              onCheckboxClick={toggleChecked}
              onDeleteClick={deleteTask}
            />
          ))}
        </ul>
        {/* <h1>
          📝️ To Do List
          {pendingTasksTitle}
        </h1> */}
      </div>
    </div>
  );
};
