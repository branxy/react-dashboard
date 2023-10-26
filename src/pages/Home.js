import { Tooltip } from "../components/Tooltip";
import WeatherApp from "../components/weatherApp/weatherApp";
import TaskApp from "./TodoApp/task-app";

export default function Home() {
  return (
    <div className="home-page flex-col">
      <div className="dash-items">
        <div className="tasks-and-weather">
          <div className="tasks">
            <div className="dummy-div flex-col">
              <div className="title-and-info flex">
                <h2>Agenda</h2>
                <Tooltip text={"Today's tasks, filtered by date"} />
              </div>
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
