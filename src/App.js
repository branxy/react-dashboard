import "./App.css";
import ShowDate from "./Date-comp/date-now";
import TaskApp from "./TodoApp/task-app";

function App() {
  return (
    <div className="App">
      <ShowDate />
      <TaskApp />
    </div>
  );
}

export default App;
