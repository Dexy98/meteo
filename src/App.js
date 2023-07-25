import axios from 'axios';
import './App.css';
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import sun from './assets/sun.png';
import Clouds from './assets/clouds.png';
import rain from './assets/cloudy.png';
import clearSky from './assets/clear-sky.png';

function App() {
  const [city, setCity] = useState('Cosenza');
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  
  function getWeatherImage(main) {
    const lowerCaseDescription = main.trim();
  
    if (lowerCaseDescription === 'Clear') {
      return sun;
    }
    if (lowerCaseDescription === 'Clouds') {
      return Clouds;
    }
    if (lowerCaseDescription === 'Rain') {
      return rain;
    }

    return clearSky;
  };

  const apiKey = process.env.REACT_APP_WEATHER_KEY;

  const fetchWeather = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
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
    <div className='bg-gray-600 mx-auto flex justify-center max-w-xl flex-col h-screen transition-all'>
      <div className='bg-gray-600 mx-auto flex justify-center max-w-xl p-3
    '>
        <form onSubmit={fetchWeather} className='flex items-center '>
          <input
            className='bg-gray-600 text-white p-2 border border-black shadow-sm shadow-black'
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">
            <BsSearch size={30} className='text-white mx-2' />
          </button>
        </form>
        {loading && <div>Caricamento...</div>}

      </div>
      {weatherData && (
        <div className='flex items-center p-4 h-screen text-white flex-col transition-all'>
          <h2 className='pt-3 text-6xl text-red-500 drop-shadow shadow-neutral-800 capitalize'>{weatherData.name}</h2>
          <p className=' pt-3 text-3xl text capitalize'>{weatherData.weather[0].description}</p>
          <img
            src={getWeatherImage(weatherData.weather[0].main)}
            alt={weatherData.weather[0].main}
            className='w-32 h-32'
          />
          <p className='pt-3 text-6xl '>{weatherData.main.temp}°C</p>
        </div>
      )}
    </div>

  );
}

export default App;
