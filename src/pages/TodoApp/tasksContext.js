import { createContext, useReducer, useEffect } from "react";

const options = {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
};

const initialTasks = [
  {
    id: 1,
    title: "Example task",
    text: "",
    dueDate: new Date(),
    status: "Not started",
    dateCreated: new Date().toLocaleString(undefined, options),
  },
];

export const tasksContext = createContext(null);
export const dispatchTasksContext = createContext(null);

export function TasksProvider({ ...children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks && savedTasks.length > 0) {
      const convertedTasks = savedTasks.map((task) => ({
        ...task,
        dueDate: new Date(task.dueDate),
      }));
      dispatch({ type: "init", tasks: convertedTasks });
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
      return [
        {
          id: action.id,
          title: action.title,
          text: "",
          dueDate: new Date(),
          status: "Not started",
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
    case "deleted": {
      return tasks.filter((task) => task.id !== action.id);
    }
    case "sorted-reverse": {
      return [...tasks].reverse();
    }
    case "sorted-by-status": {
      return tasks.toSorted((a, b) => a.status + b.status);
    }
    case "sort-by-date-ascending": {
      return tasks.toSorted((a, b) => a.dateCreated - b.dateCreated);
    }
    case "sort-by-status": {
      return tasks.toSorted((a, b) =>
        a.status === b.status ? 0 : a.status ? 1 : -1
      );
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
