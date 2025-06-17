import React, { createContext, useContext, useState } from 'react';

const WeatherContext = createContext();

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const OPENWEATHERMAP_API_KEY = '9f9a85f06e24e2a917773642a084f998'; 

  const fetchWeather = async (cityOrLatLon) => {
    setIsLoading(true);
    let url;
    let cityNameForStorage = '';

    if (typeof cityOrLatLon === 'string') {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${cityOrLatLon}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`;
      cityNameForStorage = cityOrLatLon;
    } else if (typeof cityOrLatLon === 'object' && cityOrLatLon.lat && cityOrLatLon.lon) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${cityOrLatLon.lat}&lon=${cityOrLatLon.lon}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`;
    } else {
      setIsLoading(false);
      throw new Error('Invalid input for fetchWeather. Provide city name or {lat, lon} object.');
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch weather data');
      }
      const data = await response.json();

      if (!cityNameForStorage && data.name) {
        cityNameForStorage = data.name;
      }

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`;
      const forecastResponse = await fetch(forecastUrl);
      if (!forecastResponse.ok) {
          throw new Error('Failed to fetch forecast data');
      }
      const forecastData = await forecastResponse.json();
      
      const dailyForecast = forecastData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 5).map(item => ({
          day: new Date(item.dt * 1000).toLocaleDateString('en', { weekday: 'short' }),
          temp: Math.round(item.main.temp),
          condition: item.weather[0].main,
          icon: item.weather[0].icon
      }));


      const formattedWeather = {
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), 
        timezoneOffset: data.timezone, 
        localTime: new Date(Date.now() + data.timezone * 1000).toLocaleTimeString('en-US', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit'}),
        sunrise: new Date((data.sys.sunrise + data.timezone) * 1000).toLocaleTimeString('en-US', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit'}),
        sunset: new Date((data.sys.sunset + data.timezone) * 1000).toLocaleTimeString('en-US', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit'}),
        feelsLike: Math.round(data.main.feels_like),
        pressure: data.main.pressure,
        visibility: data.visibility / 1000,
        coord: data.coord,
        forecast: dailyForecast
      };
      
      setWeatherData(prev => ({ ...prev, [cityNameForStorage.toLowerCase()]: formattedWeather }));
      return formattedWeather;
    } catch (error) {
      console.error('Weather fetch error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCitySuggestions = async (query) => {
    if (!query || query.length < 3) return [];
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${OPENWEATHERMAP_API_KEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch city suggestions');
      }
      const data = await response.json();
      return data.map(city => ({
        name: city.name,
        country: city.country,
        state: city.state,
        lat: city.lat,
        lon: city.lon,
        value: `${city.name}${city.state ? ', ' + city.state : ''}, ${city.country}`
      }));
    } catch (error) {
      console.error('City suggestions fetch error:', error);
      return [];
    }
  };


  const value = {
    weatherData,
    fetchWeather,
    fetchCitySuggestions,
    isLoading
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};