import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react'; 
import axios from 'axios'; 
import { Button } from 'react-bootstrap'; 

function App() {
  const apiKey = "e316df83e13a33c255b83c5a96b2dc2e";
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  const getWeatherDetails = (cityName) => {
    if (!cityName) {
      setError("Please enter a city name");
      return;
    }

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    axios.get(apiURL)
      .then((res) => {
        setData(res.data);
        setError(null);
      })
      .catch((err) => {
        setError("City not found. Please enter a valid city name.");
        console.error("Error fetching weather data:", err);
      });
  };

  const handleChangeInput = (e) => {
    setInputCity(e.target.value);
  };

  const handleSearch = () => {
    getWeatherDetails(inputCity);
  };

  return (
    <div className="col-md-12">
      <div className="weatherBg">
        <h1 className="heading">Weather App</h1>
        <div className="d-grid gap-3 col-4 mt-4">
          <input type="text" className="form-control" onChange={handleChangeInput} placeholder='Enter city name'/>
          <Button className="btn btn-primary" type="button" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>

      {error && (
        <div className="col-md-12 text-center mt-3">
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      )}

      {Object.keys(data).length > 0 && (
        <div className="col-md-12 text-center mt-5">
          <div className="shadow rounded weatherResultBox">
            {/* Use data from the state to display weather information */}
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyuz8rpIECy6SIVENxlR9NJ_EE6vwJV3ZHZpflaV5gK_VivwOeR8oOQKuG_PD7jeAJ0Ow&usqp=CAU" className="icon" alt="Weather Icon" />
            <h5 className="weatherCity">{data.name}</h5>
            <h1 className="WeatherTemp">{(data.main && (data.main.temp - 273.15).toFixed(2))} °C</h1>
            <p className="weather-description">Weather Description: {data.weather && data.weather[0].description}</p>
            <p className="humidity">Humidity: {data.main && data.main.humidity}%</p>
            <p className="pressure">Pressure: {data.main && data.main.pressure} hPa</p>
            <p className="windspeed">Wind Speed: {data.wind && data.wind.speed} m/s</p>
            <p className="visibility">Visibility: {data.visibility} meters</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
