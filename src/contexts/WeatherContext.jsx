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

  const fetchWeather = async (city) => {
    setIsLoading(true);
    try {
      // Mock weather data for demonstration
      const mockWeather = {
        city,
        temperature: Math.floor(Math.random() * 30) + 5,
        condition: ['Sunny', 'Cloudy', 'Rainy', 'Snowy'][Math.floor(Math.random() * 4)],
        humidity: Math.floor(Math.random() * 50) + 30,
        windSpeed: Math.floor(Math.random() * 20) + 5,
        timezone: `UTC${Math.floor(Math.random() * 24) - 12}`,
        localTime: new Date().toLocaleTimeString(),
        forecast: Array.from({ length: 5 }, (_, i) => ({
          day: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString('en', { weekday: 'short' }),
          temp: Math.floor(Math.random() * 25) + 10,
          condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)]
        }))
      };
      
      setWeatherData(prev => ({ ...prev, [city]: mockWeather }));
      return mockWeather;
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