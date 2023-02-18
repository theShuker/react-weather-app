import { useEffect, useState } from 'react';

async function getWeather(params: any) {
  const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather?';
  const defaultParams = {
    lat: '7.8446592',
    lon: '98.3826432',
    appid: 'f46c800cbf0f4f93605257f2a3410edf',
    units: 'metric',
    lang: 'en',
  };

  const response = await fetch(
    WEATHER_API_URL + new URLSearchParams({ ...defaultParams, ...params })
  );
  return await response.json();
}

type LocationType = {
  lat: number;
  lon: number;
};

function getStoredLocation(): LocationType | null {
  return (
    localStorage.getItem('location') &&
    JSON.parse(localStorage.getItem('location') as string)
  );
}

function setStoredLocation(location: LocationType) {
  localStorage.setItem('location', JSON.stringify(location));
}


export default function () {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<LocationType | null>(
    getStoredLocation()
  );

  const [weatherData, setWeatherData] = useState<any>();

  async function updateWeather() {
    try {
      setIsLoading(true);

      const data = await getWeather(location);

      setWeatherData(data);
      setIsLoading(false);
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    if (!getStoredLocation()){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation: LocationType = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          }
          setStoredLocation(newLocation)
          setLocation(newLocation)
          updateWeather()
        },
        (error) => {
          setError(error.message)
          setIsLoading(false)
        }
      )
    }
    if (location) updateWeather();
  }, [location]);

  return {
    weatherData,
    isLoading,
    error,
    updateWeather,
    location
  };
}
