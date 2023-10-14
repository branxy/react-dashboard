import WeatherApp from "../components/weatherApp/weatherApp";
import TaskApp from "./TodoApp/task-app";

export default function Home() {
  return (
    <div className="home-page flex-col">
      <div className="dash-items">
        <div className="tasks-and-weather">
          <div className="tasks">
            <div className="dummy-div flex-col">
              <h2>Agenda</h2>
              <TaskApp source={"dashboard"} />
            </div>
          </div>
          <div className="weather flex-col">
            <WeatherApp />
          </div>
        </div>
      </div>
    </div>
  );
}
