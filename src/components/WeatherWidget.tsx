import { FaSearchLocation } from 'react-icons/fa';
import { BiRefresh } from 'react-icons/bi';
import useWeather from '../hooks/useWeather';
import Loader from './Loader';

function getWeatherImage(imgId: string) {
  return `http://openweathermap.org/img/wn/${imgId}@4x.png`;
}

function Weather() {
  const { weatherData, location, isLoading, error, updateWeather } = useWeather();

  console.log(weatherData);

  return (
    <div className="bg-slate-500 flex flex-col justify-between gap-4 rounded p-4 text-white min-w-[300px] min-h-[250px]">
      {isLoading && <Loader />}
      {isLoading && !location && <p>Please allow geoposition access...</p>}
      {error && <p className="text-red-600 font-bold">Error: {error}</p>}

      {!isLoading && weatherData && (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm cursor-pointer" title="Your location">
              <FaSearchLocation />
              {weatherData.name}
            </div>

            <BiRefresh
              className="hover:animate-spin cursor-pointer"
              onClick={() => updateWeather()}
              title="Press to refresh"
            />
          </div>

          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <div className="w-[100px] h-[100px]">
                <img
                  className="scale-150"
                  src={getWeatherImage(weatherData.weather[0].icon)}
                  alt={weatherData.weather[0].description}
                  draggable="false"
                />
              </div>
              <span className="font-bold text-2xl">{weatherData.weather[0].main}</span>
              <span className="text-sm">{weatherData.weather[0].description}</span>
            </div>

            <div className="text-7xl font-bold">{Math.floor(+weatherData.main.temp)}&deg;</div>
          </div>
        </>
      )}
    </div>
  );
}

export default Weather;
