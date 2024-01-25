// Existing imports...

function App() {
  const apiKey = "e316df83e13a33c255b83c5a96b2dc2e";
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  const getWeatherDetails = (cityName) => {
    if (!cityName) {
      setError("Please enter a city name");
      setData({}); // Clear previous data if any
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
        document.getElementsByName("p").innerHTML="err";
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

      {Object.keys(data).length > 0 ? (
        <div className="col-md-12 text-center mt-5">
          <div className="shadow rounded weatherResultBox">
            {/* Use data from the state to display weather information */}
            {/* Existing weather display code */}
          </div>
        </div>
      ) : (
        // Display "Result not found" message if no data is available
        <div className="col-md-12 text-center mt-5">
          <p style={{ color: 'red' }}>Result not found</p>
        </div>
      )}
    </div>
  );
}

export default App;
