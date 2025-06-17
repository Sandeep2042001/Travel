import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Thermometer, Droplets, Wind, Clock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useWeather } from '@/contexts/WeatherContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useToast } from '@/components/ui/use-toast';

const Weather = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const { fetchWeather, weatherData, isLoading } = useWeather();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const weather = await fetchWeather(searchQuery);
      setSelectedCity(weather);
      toast({
        title: "Weather Updated!",
        description: `Found weather data for ${searchQuery}`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch weather data",
        variant: "destructive"
      });
    }
  };

  const handleFavoriteToggle = (city) => {
    if (isFavorite(city.city)) {
      removeFavorite(city.city);
      toast({
        title: "Removed from Favorites",
        description: `${city.city} has been removed from your favorites`
      });
    } else {
      addFavorite({
        name: city.city,
        temperature: city.temperature,
        condition: city.condition,
        country: 'Unknown'
      });
      toast({
        title: "Added to Favorites",
        description: `${city.city} has been added to your favorites`
      });
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return '☀️';
      case 'cloudy': return '☁️';
      case 'rainy': return '🌧️';
      case 'snowy': return '❄️';
      default: return '🌤️';
    }
  };

  const getWeatherGradient = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return 'from-yellow-400 to-orange-500';
      case 'cloudy': return 'from-gray-400 to-gray-600';
      case 'rainy': return 'from-blue-400 to-blue-600';
      case 'snowy': return 'from-blue-200 to-blue-400';
      default: return 'from-blue-400 to-cyan-500';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="text-gradient">Weather</span> Dashboard
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get real-time weather data, compare time zones, and discover the perfect time to visit any destination
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for any city worldwide..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-32 h-14 text-lg glass-effect border-white/20 text-white placeholder:text-gray-400"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="absolute right-2 top-2 weather-gradient text-white hover:opacity-90"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </form>
        </motion.div>

        {/* Current Weather Display */}
        {selectedCity && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12"
          >
            <Card className={`weather-card border-blue-500/20 bg-gradient-to-br ${getWeatherGradient(selectedCity.condition)} p-8`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <MapPin className="h-6 w-6 text-white" />
                  <h2 className="text-3xl font-bold text-white">{selectedCity.city}</h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleFavoriteToggle(selectedCity)}
                  className="text-white hover:bg-white/20"
                >
                  <Heart 
                    className={`h-6 w-6 ${isFavorite(selectedCity.city) ? 'fill-current text-red-400' : ''}`} 
                  />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-6xl mb-2">{getWeatherIcon(selectedCity.condition)}</div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {selectedCity.temperature}°C
                  </div>
                  <p className="text-white/80">{selectedCity.condition}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-white">
                    <Droplets className="h-5 w-5" />
                    <span>Humidity: {selectedCity.humidity}%</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white">
                    <Wind className="h-5 w-5" />
                    <span>Wind: {selectedCity.windSpeed} km/h</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-white">
                    <Clock className="h-5 w-5" />
                    <span>Local Time: {selectedCity.localTime}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white">
                    <Thermometer className="h-5 w-5" />
                    <span>Timezone: {selectedCity.timezone}</span>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    onClick={() => toast({
                      title: "🚧 Feature Coming Soon!",
                      description: "Detailed forecast isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                    })}
                    className="bg-white/20 text-white hover:bg-white/30 border-white/30"
                  >
                    View 7-Day Forecast
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* 5-Day Forecast */}
        {selectedCity && selectedCity.forecast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-white mb-6">5-Day Forecast</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {selectedCity.forecast.map((day, index) => (
                <Card key={index} className="weather-card border-blue-500/20 text-center">
                  <CardContent className="p-4">
                    <p className="text-white font-semibold mb-2">{day.day}</p>
                    <div className="text-3xl mb-2">{getWeatherIcon(day.condition)}</div>
                    <p className="text-2xl font-bold text-blue-400 mb-1">{day.temp}°C</p>
                    <p className="text-gray-300 text-sm">{day.condition}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Recent Searches */}
        {Object.keys(weatherData).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Recent Searches</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.values(weatherData).slice(-6).map((weather, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedCity(weather)}
                >
                  <Card className="weather-card border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center justify-between">
                        <span>{weather.city}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFavoriteToggle(weather);
                          }}
                          className="text-white hover:bg-white/20"
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
                          <p className="text-gray-300">{weather.condition}</p>
                        </div>
                        <div className="text-4xl">
                          {getWeatherIcon(weather.condition)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!selectedCity && Object.keys(weatherData).length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-6">🌍</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Search for any city to get started
            </h3>
            <p className="text-gray-300 max-w-md mx-auto">
              Enter a city name in the search bar above to view real-time weather data, 
              forecasts, and time zone information.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Weather;