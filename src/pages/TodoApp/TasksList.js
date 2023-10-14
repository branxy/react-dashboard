import { useState, useContext } from "react";
import { tasksContext, dispatchTasksContext } from "./tasksContext";
import Task from "./task-item/task";

export default function TasksList({ source = "original" }) {
  const tasks = useContext(tasksContext);
  const [selectedTask, setSelectedTask] = useState(null);
  switch (source) {
    case "dashboard": {
      const todayTasks = tasks.filter((task) => {
        return task.dueDate.toDateString() === new Date().toDateString();
      });
      return (
        <div className="tasks-list flex-col">
          <div className={source}>
            {todayTasks.map((task) => {
              return (
                <Task
                  key={task.id}
                  task={task}
                  source={source}
                  onSelectTask={() => setSelectedTask(task)}
                />
              );
            })}
          </div>
        </div>
      );
    }
    default: {
      return (
        <>
          <div className="tasks-list flex-col">
            <div className={source}>
              {tasks.map((task) => {
                return (
                  <Task
                    key={task.id}
                    task={task}
                    source={source}
                    onSelectTask={() => setSelectedTask(task)}
                  />
                );
              })}
            </div>
            <Modal task={selectedTask} setSelectedTask={setSelectedTask} />
          </div>
        </>
      );
    }
  }
}

function Modal({ task, setSelectedTask }) {
  const dispatch = useContext(dispatchTasksContext);
  if (task !== null) {
    return (
      <div className="modal">
        <button
          className="close-modal-btn"
          onClick={() => setSelectedTask(null)}
        >
          X
        </button>
        <div
          className="title"
          contentEditable={true}
          onInput={(e) => {
            dispatch({
              type: "changed",
              task: { ...task, title: e.target.textContent },
            });
          }}
        >
          {task.title}
        </div>
        <div
          className="body"
          contentEditable="true"
          onInput={(e) =>
            dispatch({
              type: "changed",
              task: { ...task, text: e.target.textContent },
            })
          }
        >
          {task.text === "" ? "" : task.text}
        </div>
      </div>
    );
  }
}
