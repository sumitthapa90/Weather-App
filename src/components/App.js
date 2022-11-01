import axios from "axios";
import React, { useEffect, useState } from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";

function App() {
  const apiKey = "b177e52541d5eff79cb14a7b879ef9c2";

  const [data, setData] = useState({});
  const [input, setInput] = useState("");

  const getWeatherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey;
    axios
      .get(apiURL)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setInput("");
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    getWeatherDetails("delhi");
  }, []);

  const handleInput = (event) => {
    console.log(event.target.value);
    setInput(event.target.value);
  };

  const handleSearch = () => {
    getWeatherDetails(input);
  };

  return (
    <div className="col-md-12 ">
      <div className="weatherBg">
        <h1 className="heading">Weather App</h1>

        <div className="d-grid gap-2 col-4">
          <input
            value={input}
            onChange={(event) => handleInput(event)}
            type="text"
            placeholder="Enter-city"
            className="form-control my-2 fs-2 "
          />
          <button
            onClick={handleSearch}
            type="button"
            className="btn btn-success"
          >
            Search
          </button>
        </div>
      </div>

      <div className="col-md-12 text-center mt-4">
        <div className="weather-detail">
          <TiWeatherPartlySunny className="weather-icon" />

          <h2 className="weather-city">{data?.name}</h2>
          <h2 className="weather-temp">
            <span className="text">Temp:</span>
            {(data?.main?.temp - 273.15).toFixed(2)}°C
          </h2>

          <h2 className="weather-temp">
            <span className="text">Humadity:</span>
            {data?.main?.humidity}
          </h2>
          <h2 className="weather-temp">
            <span className="text">Pressure:</span> {data?.main?.pressure}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default App;
