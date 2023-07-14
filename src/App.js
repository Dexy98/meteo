import axios from 'axios';
import './App.css';
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
function App() {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);


  const apiKey = process.env.REACT_APP_WEATHER_KEY;

  const fetchWeather = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      setWeatherData(response.data);
      console.log(response.data)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

  };
  return (
    <div className='bg-gray-600 mx-auto flex justify-center max-w-xl flex-col'>
      <div className='bg-gray-600 mx-auto flex justify-center max-w-xl p-3
    '>
        <form onSubmit={fetchWeather} className='flex items-center'>
          <input
            className='bg-gray-600 text-white p-2 border border-black'
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">
            <BsSearch size={30} className='text-white mx-2' />
          </button>
        </form>
        {loading && <div>Caricamento...</div>}
        {loading && <div>Caricamento...</div>}

      </div>
      {weatherData && (
        <div className='flex items-center p-4 h-screen text-white flex-col'>
          <h2 className='text-6xl'>{weatherData.name}</h2>
          <p className='text-1xl'>{weatherData.weather.description}</p>
          <p className='text-6xl '>{weatherData.main.temp}°C</p>
        </div>
      )}
    </div>

  );
}

export default App;
