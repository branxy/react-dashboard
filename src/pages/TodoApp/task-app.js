import "./todo-app.css";
import TasksList from "./TasksList";
import AddTask from "./AddTask";
import { TasksProvider } from "./tasksContext";

export default function TaskApp({ source }) {
  switch (source) {
    case "dashboard": {
      return (
        <div className="to-do-app">
          <TasksProvider>
            <TasksList source="dashboard" />
          </TasksProvider>
        </div>
      );
    }
    default: {
      return (
        <div className="to-do-app">
          <h2>To-do list</h2>
          <TasksProvider>
            <AddTask />
            <TasksList />
          </TasksProvider>
        </div>
      );
    }
  }
}
