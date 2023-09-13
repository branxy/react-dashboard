import { useState, useContext } from "react";
import { tasksContext, dispatchTasksContext } from "./tasksContext";

export default function AddTask() {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const tasks = useContext(tasksContext);
  const dispatch = useContext(dispatchTasksContext);
  let nextId = tasks.length + 1;
  // const inputRef = useRef(null);
  function handleNewTaskTitle(e) {
    setNewTaskTitle(e.target.value);
  }

  return (
    <div className="add-todo">
      <input
        // ref={inputRef}
        placeholder="Add a task"
        value={newTaskTitle}
        onChange={handleNewTaskTitle}
        onKeyDown={(e) => {
          if (e.key === "Enter" && newTaskTitle.length > 0) {
            setNewTaskTitle("");
            dispatch({
              type: "added",
              id: nextId++,
              title: newTaskTitle,
            });
          }
        }}
        autoFocus
      ></input>
      <button
        disabled={newTaskTitle.length === 0}
        onClick={() => {
          setNewTaskTitle("");
          dispatch({
            type: "added",
            id: nextId++,
            title: newTaskTitle,
          });
        }}
      >
        Add task
      </button>
    </div>
  );
}
