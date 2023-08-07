import axios from 'axios';
import './App.css';
import WeatherCard from './WeatherCard';
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import sun from './assets/sun.png';
import Clouds from './assets/clouds.png';
import rain from './assets/cloudy.png';
import clearSky from './assets/clear-sky.png';
import Lottie from "lottie-react";
import Loading from "./assets/lottie/loading.json"

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
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=10&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);
      console.log(response.data)


      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

  };
  const visibilityInKM = weatherData?.list[0].visibility / 1000;
  const speedInKmh = weatherData?.list[0].wind.speed * 3.6;
  const roundedSpeed = Math.round(speedInKmh);
  return (
    <div className='bg-gray-600 mx-auto flex justify-center max-w-xl flex-col h-full transition-all drop-shadow-2xl shadow-black shadow-xl'>
      {loading && <div><Lottie animationData={Loading} loop={true}/></div>}

      <h1 className='flex justify-center text-white text-4xl font-bold -tracking-tighter mt-1'>METEO</h1>
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

      </div>
      {weatherData && (
        <div className='flex items-center p-4 h-full text-white flex-col transition-all'>
          <h2 className='pt-3 text-6xl text-red-500 drop-shadow-lg shadow-neutral-800 uppercase tracking-tighter font-black'>{weatherData.city.name}</h2>
          <p className=' pt-3 text-3xl text capitalize drop-shadow-md shadow-black font-normal'>{weatherData.list[0].weather[0].description}</p>
          <img
            src={getWeatherImage(weatherData.list[0].weather[0].main)}
            alt={weatherData.list[0].weather[0].main}
            className='w-32 h-32 drop-shadow-2xl shadow-black'
          />
          <p className='pt-3 text-6xl drop-shadow-lg shadow-black font-bold'>{weatherData.list[0].main.temp}°C</p>
          <p className=' pt-3 text-2xl text capitalize drop-shadow-md shadow-black font-thin'>Visibilità: {visibilityInKM} Km</p>
          <p className=' text-2xl text capitalize drop-shadow-md shadow-black font-thin'>Umidità: {weatherData.list[0].main.humidity} %</p>
          <p className=' text-2xl text  drop-shadow-md shadow-black font-thin'>Vento: {roundedSpeed} Km/h</p>

          <article className='w-full overflow-x-auto mt-8'>
            <div className=' grid-flow-col gap-5 inline-grid' style={{gridAutoColumns: "15ch"}}  >
            <WeatherCard weatherData={weatherData} getWeatherImage={getWeatherImage} index={1} /> 
            <WeatherCard weatherData={weatherData} getWeatherImage={getWeatherImage} index={2} /> 
            <WeatherCard weatherData={weatherData} getWeatherImage={getWeatherImage} index={3} /> 
            <WeatherCard weatherData={weatherData} getWeatherImage={getWeatherImage} index={4} /> 
            <WeatherCard weatherData={weatherData} getWeatherImage={getWeatherImage} index={5} /> 
            <WeatherCard weatherData={weatherData} getWeatherImage={getWeatherImage} index={6} /> 
            <WeatherCard weatherData={weatherData} getWeatherImage={getWeatherImage} index={7} /> 
            <WeatherCard weatherData={weatherData} getWeatherImage={getWeatherImage} index={8} /> 
            <WeatherCard weatherData={weatherData} getWeatherImage={getWeatherImage} index={9} /> 
            </div>
          </article>
        </div>
      )}
    </div>

  );
}

export default App;
