import React, { useState } from 'react';

function App() {
  // ========== STEP 2: STATES ==========
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  // ========== STEP 5: API FUNCTION  ==========
  const API_KEY = process.env.REACT_APP_API_KEY;
  
  const getWeather = async () => {
    try {
      setError("");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error("City not found");
      }
      
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      
      {/* ========== STEP 3: INPUT + BUTTON ========== */}
      <input 
        type="text" 
        placeholder="Enter city" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
      />
      <button onClick={getWeather}>Get Weather</button>
      
      {/* ========== STEP 6: DISPLAY WEATHER (later) ========== */}
      {error && <p>{error}</p>}
      
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;