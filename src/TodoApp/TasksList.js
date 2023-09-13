import { useState, useContext } from "react";
import { tasksContext, dispatchTasksContext } from "./tasksContext";

export default function TasksList() {
  const tasks = useContext(tasksContext);
  const dispatch = useContext(dispatchTasksContext);
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <>
      <div className="sort-btns">
        <button onClick={() => dispatch({ type: "sorted-reverse" })}>
          Sort reverse
        </button>
        {/* <button onClick={() => dispatch({ type: "sort-by-date-ascending" })}>
          Sort by date ascending
        </button> */}
        <button onClick={() => dispatch({ type: "sort-by-status" })}>
          Sort by status
        </button>
      </div>
      <div className="tasks-list">
        {tasks.map((task) => {
          return (
            <Task
              key={task.id}
              task={task}
              onSelectTask={() => setSelectedTask(task)}
            />
          );
        })}
        <Modal task={selectedTask} setSelectedTask={setSelectedTask} />
      </div>
    </>
  );
}

function Task({ task, onSelectTask }) {
  const [isEditing, setIsEditing] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const tasks = useContext(tasksContext);
  const dispatch = useContext(dispatchTasksContext);

  let toDoContent;
  if (isEditing) {
    toDoContent = (
      <>
        <input
          type="text"
          value={task.title}
          style={{ flexGrow: 3, height: "100%" }}
          onChange={(e) => {
            dispatch({
              type: "changed",
              task: { ...task, title: e.target.value },
            });
          }}
          autoFocus
        ></input>
      </>
    );
  } else {
    toDoContent = (
      <>
        <div className="list-item-title" onClick={onSelectTask}>
          {task.done ? <s>{task.title}</s> : task.title}
        </div>
      </>
    );
  }

  return (
    <div className="list-item">
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) =>
          dispatch({
            type: "done-task",
            task: { ...task, done: e.target.checked },
          })
        }
      ></input>
      <div className="list-item-title">{toDoContent}</div>
      <div className="status">{task.done ? "Done" : "Not started"}</div>
      <div className="date-created">{task.dateCreated}</div>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Save" : "Edit"}
      </button>
      <button
        onClick={() =>
          dispatch({
            type: "deleted",
            id: task.id,
          })
        }
      >
        Delete
      </button>
    </div>
  );
}

function Modal({ task, setSelectedTask }) {
  // eslint-disable-next-line no-unused-vars
  const tasks = useContext(tasksContext);
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
