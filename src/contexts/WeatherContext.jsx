import React, { createContext, useContext, useState } from 'react';

const WeatherContext = createContext();

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

const OPENWEATHER_API_KEY = 'b7da20eb59fe26481fe97a3ceb54a70b'; // Updated with user provided API key
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

const kelvinToCelsius = (kelvin) => Math.round(kelvin - 273.15);

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeather = async (city) => {
    setIsLoading(true);
    try {
      // Fetch current weather data
      const currentRes = await fetch(
        `${OPENWEATHER_BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}`
      );
      if (!currentRes.ok) {
        throw new Error('Failed to fetch current weather data');
      }
      const currentData = await currentRes.json();

      // Fetch 5-day forecast data
      const forecastRes = await fetch(
        `${OPENWEATHER_BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}`
      );
      if (!forecastRes.ok) {
        throw new Error('Failed to fetch forecast data');
      }
      const forecastData = await forecastRes.json();

      // Parse current weather
      const parsedCurrent = {
        city: currentData.name,
        temperature: kelvinToCelsius(currentData.main.temp),
        condition: currentData.weather[0].main,
        humidity: currentData.main.humidity,
        windSpeed: Math.round(currentData.wind.speed * 3.6), // m/s to km/h
        timezone: `UTC${currentData.timezone >= 0 ? '+' : ''}${currentData.timezone / 3600}`,
        localTime: new Date((Date.now() + currentData.timezone * 1000) - (new Date().getTimezoneOffset() * 60000)).toLocaleTimeString(),
        forecast: []
      };

      // Parse 5-day forecast (group by day, take one forecast per day at 12:00)
      const dailyForecastMap = {};
      forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en', { weekday: 'short' });
        const hour = date.getHours();
        if (hour === 12 && !dailyForecastMap[day]) {
          dailyForecastMap[day] = {
            day,
            temp: kelvinToCelsius(item.main.temp),
            condition: item.weather[0].main
          };
        }
      });
      parsedCurrent.forecast = Object.values(dailyForecastMap).slice(0, 5);

      setWeatherData(prev => ({ ...prev, [city]: parsedCurrent }));
      return parsedCurrent;
    } catch (error) {
      console.error('Weather fetch error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    weatherData,
    fetchWeather,
    isLoading
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};
