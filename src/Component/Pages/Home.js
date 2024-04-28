import React, { useState, useEffect } from "react";
import "../Pages/Home.css";

const Home = () => {
  const defaultCity = "Pune";
  const [search, setSearch] = useState(defaultCity);
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=a70993c816dbb5008d66bd73f4d28874`;
      const response = await fetch(url);
      if (!response.ok) {
        setError("Please enter a valid city name.");
        setCity(null);
        return;
      }
      const resJson = await response.json();
      setCity(resJson);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Something went wrong. Please try again later.");
      setCity(null);
    }
  };

  useEffect(() => {
    const fetchDefaultCityData = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=a70993c816dbb5008d66bd73f4d28874`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const resJson = await response.json();
        setCity(resJson);
        setError(null);
      } catch (error) {
        console.error("Error fetching default city data:", error);
        setError("Default city data not available.");
        setCity(null);
      }
    };

    fetchDefaultCityData();
  }, []);

  return (
    <div className="Main_cointainer">
      <div className="container_left">
        <h1>
          <span>Weather</span> App
        </h1>
      </div>

      <div className="container_right">
        <div className="card">
          <div className="card_top_input">
            <input
              type="text"
              placeholder="Search here"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="search_icon" onClick={handleSearch}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          {city && !error && (
            <>
              <div className="weathericon">
                <img
                  src={require("../images/cloudy.png")}
                  alt="Weather Icon"
                />
              </div>

              <div className="temp">
                <p>{parseInt(city.main.temp-273.15)}&#x2103;</p>
              </div>

              <div className="city">
                <p>{city.name}</p>
              </div>

              <div className="Humidity">
                <div className="humidity_left">
                  <img
                    src={require("../images/weather.png")}
                    alt="Humidity Icon"
                  />
                  <div className="Humidity_pre">
                    <span>{city.main.humidity}%</span>
                    <p>Humidity</p>
                  </div>
                </div>

                <div className="humidity_right">
                  <img src={require("../images/wind.png")} alt="Wind Icon" />
                  <div className="Humidity_pre">
                    <span>{city.wind.speed} km/h</span>
                    <p style={{ fontSize: "13px" }}>Wind speed</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
