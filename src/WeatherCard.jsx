// WeatherCard.js
import React from 'react';

function WeatherCard(props) {
  
  const index = props.index; // questo è il nuovo props che aggiungi
  const visibilityInKM = props.weatherData?.list[index].visibility / 1000;
  const speedInKmh = props.weatherData?.list[index].wind.speed * 3.6;
  const roundedSpeed = Math.round(speedInKmh);

  let ora = props.weatherData.list[index].dt_txt
  const currentDate = new Date();
  const tomorrowDate = currentDate.getDate()+ 1 +"-" +( currentDate.getMonth()+1) ;

  const parts = ora.split(' ')
  const data = parts[0]
  const time = parts[1]


  return (
    <div className='flex flex-col justify-center items-center h-[auto] w-[auto] text-center '>
      <h4>{props.weatherData.list[index].dt_txt}</h4>
      <p className=' pt-3 text-3xl text capitalize drop-shadow-md shadow-black font-normal'>{props.weatherData.list[index].weather[0].description}</p>
      <img
        src={props.getWeatherImage(props.weatherData.list[index].weather[0].main)}
        alt={props.weatherData.list[index].weather[0].main}
        className=' w-20 h-20 drop-shadow-2xl shadow-black'
      />
      <p className='pt-3 text-2xl drop-shadow-lg shadow-black font-bold'>{props.weatherData.list[index].main.temp}°C</p>
      <p className=' pt-3 text-sm text capitalize drop-shadow-md shadow-black font-thin'>Visibilità: {visibilityInKM} Km</p>
      <p className=' text-sm capitalize drop-shadow-md shadow-black font-thin'>Umidità: {props.weatherData.list[index].main.humidity} %</p>
      <p className=' text-sm text  drop-shadow-md shadow-black font-thin'>Vento: {roundedSpeed} Km/h</p>
    </div>
  );
}

export default WeatherCard;
