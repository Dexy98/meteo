// WeatherCard.js
import React from 'react';

function WeatherCard(props) {
  
  const index = props.index; // questo è il nuovo props che aggiungi
  const visibilityInKM = props.weatherData?.list[index].visibility / 1000;
  const speedInKmh = props.weatherData?.list[index].wind.speed * 3.6;
  const roundedSpeed = Math.round(speedInKmh);

  let ora = new Date (props.weatherData.list[index].dt_txt)
  const options = {
    // weekday: false,
    // year: false,
    month: "long",
    day: "numeric",
    hour12: false ,
    hour: "2-digit", 
    // minute: "2-digit",

  }
  const ok = ora.toLocaleDateString("it-IT", options);
  const diviso = ok.split(' ')
  const giorno = diviso[0] + ' ' + diviso[1]
  const time = diviso[3] + ' ' + diviso[4];
  
  const currentDate = new Date();
  const dataCorrente = currentDate.getDate();
  const dataDomani = currentDate.getDate()+1;
  let data = '';
  if (dataCorrente == diviso[0]) {
    data = "OGGI";
  } else if(dataDomani == diviso[0]) {
    data = "Domani";
  }
  



  return (
    <div className='flex flex-col justify-center items-center h-[auto] w-[auto] text-center '>
      <h4>{data} <br /> {time}</h4>
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
