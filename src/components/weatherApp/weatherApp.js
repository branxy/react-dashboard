import { useEffect, useState } from "react";
import { getWeatherData, startFetchingInterval } from "./weatherApi";
import ShowDate from "../Date-comp/date-now";
import { Tooltip } from "../Tooltip";

export default function WeatherApp() {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setDetails(data.data[0]);
      })
      .catch((error) => console.error("Error fetching initial data:", error));

    startFetchingInterval();
  }, []);

  if (details) {
    const wind = Math.round(details.gust);
    const windDir = details.wind_cdir;
    const humidity = details.rh;
    const pressure = details.pres;
    const clouds = details.clouds;
    return (
      <>
        {details && (
          <>
            <div className="heading-and-info flex">
              <div className="title-and-date">
                <h2>Weather</h2>
                <span className="title">in {details.city_name}</span>
              </div>
              <Tooltip
                text={
                  "Dynamic weather report based on Weatherbit data and Fetch API"
                }
              />
            </div>
            <div className="stats flex-col">
              <div className="main-stats">
                <div className="temp-and-icon">
                  <span className="temperature">
                    {details.temp > 0 ? "+" : "-"}
                    {details.temp}℃
                  </span>
                  <img
                    className="icon"
                    src={`/img/${details.weather.icon}.png`}
                    alt=""
                  />
                </div>
                <div className="text flex-col">
                  <span>{details.weather.description}</span>
                  <div className="feels-like">
                    <span className="text">Feels like </span>
                    <span className="temp">
                      {details.app_temp > 0 ? "+" : "-"}
                      {details.app_temp}℃
                    </span>
                  </div>
                </div>
              </div>
              <div className="secondary-stats">
                <WeatherStatsElement
                  img="wind"
                  mainDigit={wind}
                  measure=" m/s,"
                  additionalInfo={windDir}
                />
                <WeatherStatsElement
                  img="humidity"
                  mainDigit={humidity}
                  measure="%"
                  additionalInfo={""}
                />
                <WeatherStatsElement
                  img="pressure"
                  mainDigit={pressure}
                  measure=" mb"
                  additionalInfo={""}
                />
                <WeatherStatsElement
                  img="clouds"
                  mainDigit={clouds}
                  measure="%"
                  additionalInfo={""}
                />
              </div>
            </div>
          </>
        )}
      </>
    );
  }
  return (
    <>
      <div className="heading-and-info flex">
        <div className="title-and-date">
          <h2>Weather</h2>
          <span className="title">in Saint-Petersburg,</span>
          <ShowDate />
        </div>
        <Tooltip
          text={"Dynamic weather report based on Weatherbit data and Fetch API"}
        />
      </div>
      <div>Loading...</div>
    </>
  );
}

function WeatherStatsElement({ img, mainDigit, measure, additionalInfo }) {
  return (
    <div className="stat">
      <img src={`/img/stats-icons/${img}.svg`} alt={img} />
      <span>
        {mainDigit}
        {measure} {additionalInfo}
      </span>
    </div>
  );
}
