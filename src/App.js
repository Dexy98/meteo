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
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=5&units=metric&appid=${apiKey}`
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
    <div className='bg-gray-600 mx-auto flex justify-center max-w-xl flex-col h-screen transition-all drop-shadow-2xl shadow-black shadow-xl'>
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
        {loading && <div>Caricamento...</div>}

      </div>
      {weatherData && (
        <div className='flex items-center p-4 h-screen text-white flex-col transition-all'>
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
            <div className='grid grid-flow-col grid-cols-3 gap-4' style={{ width: `${weatherData.list.length * 190}px` }}>
              <div className='flex flex-col justify-center items-center h-[auto] w-[auto] text-center'>
                <h4>Data: {weatherData.list[1].dt_txt}</h4>
                <p className=' pt-3 text-3xl text capitalize drop-shadow-md shadow-black font-normal'>{weatherData.list[1].weather[0].description}</p>
                <img
                  src={getWeatherImage(weatherData.list[1].weather[0].main)}
                  alt={weatherData.list[1].weather[0].main}
                  className='w-20 h-20 drop-shadow-2xl shadow-black'
                />
                <p className='pt-3 text-3xl drop-shadow-lg shadow-black font-bold'>{weatherData.list[1].main.temp}°C</p>
                {/* <p className=' pt-3 text-sm text capitalize drop-shadow-md shadow-black font-thin'>Visibilità: {visibilityInKM} Km</p> */}
                <p className=' text-sm text capitalize drop-shadow-md shadow-black font-thin'>Umidità: {weatherData.list[1].main.humidity} %</p>
                {/* <p className=' text-sm text  drop-shadow-md shadow-black font-thin'>Vento: {roundedSpeed} Km/h</p> */}
              </div>

              <div className='flex flex-col justify-center items-center h-[auto] w-[auto] text-center'>
                <h4>Data: {weatherData.list[2].dt_txt}</h4>
                <p className=' pt-3 text-3xl text capitalize drop-shadow-md shadow-black font-normal'>{weatherData.list[1].weather[0].description}</p>
                <img
                  src={getWeatherImage(weatherData.list[2].weather[0].main)}
                  alt={weatherData.list[2].weather[0].main}
                  className='w-20 h-20 drop-shadow-2xl shadow-black'
                />
                <p className='pt-3 text-3xl drop-shadow-lg shadow-black font-bold'>{weatherData.list[2].main.temp}°C</p>
                {/* <p className=' pt-3 text-sm text capitalize drop-shadow-md shadow-black font-thin'>Visibilità: {visibilityInKM} Km</p> */}
                <p className=' text-sm text capitalize drop-shadow-md shadow-black font-thin'>Umidità: {weatherData.list[2].main.humidity} %</p>
                {/* <p className=' text-sm text text drop-shadow-md shadow-black font-thin'>Vento: {roundedSpeed} Km/h</p> */}
              </div>

              <div className='flex flex-col justify-center items-center h-[auto] w-[auto] text-center'>
                <h4>Data: {weatherData.list[3].dt_txt}</h4>
                <p className=' pt-3 text-3xl capitalize drop-shadow-md shadow-black font-normal'>{weatherData.list[3].weather[0].description}</p>
                <img
                  src={getWeatherImage(weatherData.list[3].weather[0].main)}
                  alt={weatherData.list[3].weather[0].main}
                  className='w-20 h-20 drop-shadow-2xl shadow-black'
                />
                <p className='pt-3 text-2xl drop-shadow-lg shadow-black font-bold'>{weatherData.list[3].main.temp}°C</p>
                {/* <p className=' pt-3 text-sm text capitalize drop-shadow-md shadow-black font-thin'>Visibilità: {visibilityInKM} Km</p> */}
                <p className=' text-sm text capitalize drop-shadow-md shadow-black font-thin'>Umidità: {weatherData.list[3].main.humidity} %</p>
                {/* <p className=' text-sm text  drop-shadow-md shadow-black font-thin'>Vento: {roundedSpeed} Km/h</p> */}
              </div>

              <div className='flex flex-col justify-center items-center h-[auto] w-[auto] text-center '>
                <h4>Data: {weatherData.list[4].dt_txt}</h4>
                <p className=' pt-3 text-3xl text capitalize drop-shadow-md shadow-black font-normal'>{weatherData.list[4].weather[0].description}</p>
                <img
                  src={getWeatherImage(weatherData.list[4].weather[0].main)}
                  alt={weatherData.list[4].weather[0].main}
                  className=' w-20 h-20 drop-shadow-2xl shadow-black'
                />
                <p className='pt-3 text-2xl drop-shadow-lg shadow-black font-bold'>{weatherData.list[4].main.temp}°C</p>
                {/* <p className=' pt-3 text-sm text capitalize drop-shadow-md shadow-black font-thin'>Visibilità: {visibilityInKM} Km</p> */}
                <p className=' text-sm capitalize drop-shadow-md shadow-black font-thin'>Umidità: {weatherData.list[4].main.humidity} %</p>
                {/* <p className=' text-sm text  drop-shadow-md shadow-black font-thin'>Vento: {roundedSpeed} Km/h</p> */}
              </div>
            </div>
          </article>
        </div>
      )}
    </div>

  );
}

export default App;
