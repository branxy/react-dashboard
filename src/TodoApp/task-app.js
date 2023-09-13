import TasksList from "./TasksList";
import AddTask from "./AddTask";
import { TasksProvider } from "./tasksContext";

export default function TaskApp() {

  return (
    <>
      <div className="to-do-app">
        <h2>To-do list</h2>
        <TasksProvider>
          <AddTask />
          <TasksList />
        </TasksProvider>
      </div>
    </>
  );
}
