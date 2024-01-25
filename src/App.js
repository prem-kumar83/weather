import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react'; 
import axios from 'axios'; 
import { Button } from 'react-bootstrap'; 
function App() {
  const apiKey = "e316df83e13a33c255b83c5a96b2dc2e";
  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({});

  const getWeatherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    axios.get(apiURL)
      .then((res) => {
        setData(res.data); // Store the response data in the state or for save data
      })
      .catch((err) => {
        console.error("Error fetching weather data:", err);
      });
  };

  const handleChangeInput = (e) =>
  { 
   setInputCity(e.target.value)
  }
  const handleSearch= () =>
  {
    getWeatherDetails(inputCity);
  }
  function showNotFoundMessage() {
    document.getElementById("notfound").innerHTML = '<p class="not-found">No images found. Please try a different search term.</p>';
    userInput.style.borderColor = 'red';
    galleryContainer.style.display='none';
    showMoreButton.style.display = 'none';
}
  
//these are used for test purpose that means if need to display by-default weather of delhi, then used. 
  /* useEffect(() => {
    getWeatherDetails("Delhi"); // Calling the function with an initial city name
  }, []); // Empty dependency array to ensure it runs only once
  */

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
        <div id="notfound"></div>
      </div>
      
     { Object.keys(data).length>0 && 
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
      }
    </div>
  );
}

export default App;
