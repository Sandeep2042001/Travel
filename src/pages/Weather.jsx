import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Thermometer, Droplets, Wind, Clock, Heart, Sunrise, Sunset, Eye, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useWeather } from '@/contexts/WeatherContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useToast } from '@/components/ui/use-toast';
import CitySearchInput from '@/components/CitySearchInput';

const Weather = () => {
  const [selectedCityData, setSelectedCityData] = useState(null);
  const { fetchWeather, weatherData, isLoading } = useWeather();
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites(); // Destructure favorites here
  const { toast } = useToast();

  const handleCitySearch = async (city) => {
    if (!city) return;
    
    const query = city.lat && city.lon ? { lat: city.lat, lon: city.lon } : city.value || city.name;
    
    try {
      const weatherInfo = await fetchWeather(query);
      setSelectedCityData(weatherInfo);
      toast({
        title: "Weather Updated!",
        description: `Found weather data for ${weatherInfo.city}`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch weather data",
        variant: "destructive"
      });
      setSelectedCityData(null);
    }
  };

  useEffect(() => {
    const lastSearchedCityName = Object.keys(weatherData).pop();
    if (lastSearchedCityName && weatherData[lastSearchedCityName]) {
        setSelectedCityData(weatherData[lastSearchedCityName]);
    }
  }, []);


  const handleFavoriteToggle = (cityData) => {
    if (!cityData || !cityData.city) return;
    if (isFavorite(cityData.city)) {
      const favToRemove = favorites.find(f => f.name === cityData.city); // favorites is now defined
      if (favToRemove) removeFavorite(favToRemove.id); 
      toast({
        title: "Removed from Favorites",
        description: `${cityData.city} has been removed from your favorites`
      });
    } else {
      addFavorite({ 
        id: `${cityData.city}-${Date.now()}`, 
        name: cityData.city, 
        country: cityData.country,
        temperature: cityData.temperature, 
        condition: cityData.condition,
        icon: cityData.icon,
        lat: cityData.coord.lat,
        lon: cityData.coord.lon
      });
      toast({
        title: "Added to Favorites",
        description: `${cityData.city} has been added to your favorites`
      });
    }
  };

  const getWeatherGradient = (icon) => {
    if (icon?.includes('d')) { 
        if (icon?.startsWith('01')) return 'from-yellow-400 to-orange-500'; 
        if (icon?.startsWith('02') || icon?.startsWith('03') || icon?.startsWith('04')) return 'from-sky-400 to-blue-500'; 
        if (icon?.startsWith('09') || icon?.startsWith('10')) return 'from-blue-500 to-indigo-600'; 
        if (icon?.startsWith('11')) return 'from-slate-500 to-slate-700'; 
        if (icon?.startsWith('13')) return 'from-blue-200 to-blue-400'; 
        if (icon?.startsWith('50')) return 'from-gray-400 to-gray-500'; 
    } else if (icon?.includes('n')) { 
        if (icon?.startsWith('01')) return 'from-indigo-700 to-purple-800'; 
        if (icon?.startsWith('02') || icon?.startsWith('03') || icon?.startsWith('04')) return 'from-slate-600 to-slate-800'; 
        return 'from-gray-700 to-gray-900'; 
    }
    return 'from-blue-400 to-cyan-500'; 
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="text-gradient">Weather</span> Dashboard
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get real-time weather data, forecasts, and more for any destination
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <CitySearchInput onCitySelect={handleCitySearch} />
        </motion.div>

        {isLoading && !selectedCityData && (
            <div className="text-center py-10">
                 <div role="status" className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
                <p className="text-white mt-2">Fetching weather data...</p>
            </div>
        )}


        {selectedCityData && (
          <motion.div
            key={selectedCityData.city}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12"
          >
            <Card className={`weather-card border-blue-500/20 bg-gradient-to-br ${getWeatherGradient(selectedCityData.icon)} p-6 md:p-8 shadow-2xl`}>
              <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
                <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                  <MapPin className="h-7 w-7 text-white" />
                  <h2 className="text-3xl md:text-4xl font-bold text-white">{selectedCityData.city}, {selectedCityData.country}</h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleFavoriteToggle(selectedCityData)}
                  className="text-white hover:bg-white/20 p-2 rounded-full"
                >
                  <Heart 
                    className={`h-7 w-7 transition-all ${isFavorite(selectedCityData.city) ? 'fill-red-500 text-red-500' : 'text-white'}`} 
                  />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="flex flex-col items-center justify-center text-center">
                  <img src={`https://openweathermap.org/img/wn/${selectedCityData.icon}@4x.png`} alt={selectedCityData.condition} className="w-32 h-32 md:w-40 md:h-40 -mt-4 md:-mt-8"/>
                  <p className="text-6xl md:text-7xl font-bold text-white">{selectedCityData.temperature}°C</p>
                  <p className="text-xl text-white/90 capitalize">{selectedCityData.description}</p>
                  <p className="text-sm text-white/70">Feels like {selectedCityData.feelsLike}°C</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-white">
                  {[
                    { icon: Droplets, label: "Humidity", value: `${selectedCityData.humidity}%` },
                    { icon: Wind, label: "Wind", value: `${selectedCityData.windSpeed} km/h` },
                    { icon: Sunrise, label: "Sunrise", value: selectedCityData.sunrise },
                    { icon: Sunset, label: "Sunset", value: selectedCityData.sunset },
                    { icon: Thermometer, label: "Pressure", value: `${selectedCityData.pressure} hPa` },
                    { icon: Eye, label: "Visibility", value: `${selectedCityData.visibility} km` },
                    { icon: Clock, label: "Local Time", value: selectedCityData.localTime },
                    { icon: BarChart, label: "Coordinates", value: `Lat: ${selectedCityData.coord.lat.toFixed(2)}, Lon: ${selectedCityData.coord.lon.toFixed(2)}` },
                  ].map(item => (
                    <div key={item.label} className="glass-effect p-3 rounded-lg flex items-center space-x-2 border border-white/10">
                      <item.icon className="h-5 w-5 text-blue-300 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-white/70">{item.label}</p>
                        <p className="text-sm font-semibold">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {selectedCityData.forecast && selectedCityData.forecast.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center md:text-left">5-Day Forecast</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {selectedCityData.forecast.map((day, index) => (
                      <Card key={index} className="weather-card border-blue-500/10 text-center glass-effect">
                        <CardContent className="p-3">
                          <p className="text-white font-semibold text-sm mb-1">{day.day}</p>
                          <img src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} alt={day.condition} className="w-12 h-12 mx-auto"/>
                          <p className="text-lg font-bold text-blue-300">{day.temp}°C</p>
                          <p className="text-gray-300 text-xs capitalize">{day.condition}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        )}

        {Object.keys(weatherData).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Recently Viewed</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.values(weatherData).filter(w => w.city !== selectedCityData?.city).slice(-6).reverse().map((weather, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedCityData(weather)}
                >
                  <Card className="weather-card border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center justify-between">
                        <span>{weather.city}, {weather.country}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFavoriteToggle(weather);
                          }}
                          className="text-white hover:bg-white/20 p-1"
                        >
                          <Heart 
                            className={`h-4 w-4 ${isFavorite(weather.city) ? 'fill-current text-red-400' : ''}`} 
                          />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-blue-400">
                            {weather.temperature}°C
                          </div>
                          <p className="text-gray-300 capitalize">{weather.description}</p>
                        </div>
                         <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.condition} className="w-16 h-16"/>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {!isLoading && !selectedCityData && Object.keys(weatherData).length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-6">🌍</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Search for a city to get started
            </h3>
            <p className="text-gray-300 max-w-md mx-auto">
              Enter a city name in the search bar above to view real-time weather data, 
              forecasts, and more details.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Weather;