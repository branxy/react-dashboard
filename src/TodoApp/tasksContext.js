import { createContext, useReducer, useEffect } from "react";

export const tasksContext = createContext(null);
export const dispatchTasksContext = createContext(null);

export function TasksProvider({ ...children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks && savedTasks.length > 0) {
      dispatch({ type: "init", tasks: savedTasks });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <tasksContext.Provider value={tasks}>
        <dispatchTasksContext.Provider
          value={dispatch}
          {...children}
        ></dispatchTasksContext.Provider>
      </tasksContext.Provider>
    </>
  );
}

export function tasksReducer(tasks, action) {
  switch (action.type) {
    case "init": {
      return action.tasks;
    }
    case "added": {
      const options = {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      };
      return [
        {
          id: action.id,
          title: action.title,
          text: "",
          done: false,
          dateCreated: new Date().toLocaleString(undefined, options),
        },
        ...tasks,
      ];
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else return t;
      });
    }
    case "done-task": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else return t;
      });
    }
    case "deleted": {
      return tasks.filter((task) => task.id !== action.id);
    }
    case "sorted-reverse": {
      return [...tasks].reverse();
    }
    case "sorted-by-status": {
      return tasks.toSorted((a, b) => a.done + b.done);
    }
    case "sort-by-date-ascending": { // fix date formatting here or when added new task
      return tasks.toSorted((a, b) => a.dateCreated - b.dateCreated);
    }
    case "sort-by-status": {
      return tasks.toSorted((a, b) =>
        a.done === b.done ? 0 : a.done ? 1 : -1
      );
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
