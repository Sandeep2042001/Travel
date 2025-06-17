import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Thermometer, Users, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useWeather } from '@/contexts/WeatherContext';
import { useToast } from '@/components/ui/use-toast';
import CitySearchInput from '@/components/CitySearchInput'; 

const Home = () => {
  const { fetchWeather, weatherData } = useWeather();
  const { toast } = useToast();
  const [currentSearchQueryValue, setCurrentSearchQueryValue] = useState('');


  const handleCitySearch = async (city) => {
    if (!city) return;
    
    const query = city.lat && city.lon ? { lat: city.lat, lon: city.lon } : city.value || city.name;
    setCurrentSearchQueryValue(city.value || city.name);

    try {
      await fetchWeather(query);
      toast({
        title: "Weather Updated!",
        description: `Found weather data for ${city.name}`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch weather data",
        variant: "destructive"
      });
    }
  };


  const features = [
    {
      icon: Thermometer,
      title: "Real-time Weather",
      description: "Get accurate weather data for any destination worldwide"
    },
    {
      icon: Clock,
      title: "Time Zone Comparison",
      description: "Compare time zones and plan your trips accordingly"
    },
    {
      icon: MapPin,
      title: "Interactive Maps",
      description: "Explore destinations with detailed interactive maps"
    },
    {
      icon: Calendar,
      title: "Trip Planning",
      description: "Schedule and organize your perfect travel itinerary"
    },
    {
      icon: Users,
      title: "Travel Groups",
      description: "Connect with fellow travelers and plan group adventures"
    },
    {
      icon: Star,
      title: "Favorites",
      description: "Save your favorite destinations for quick access"
    }
  ];

  const popularDestinations = [
    { name: "Paris", country: "France", lat: 48.8566, lon: 2.3522 },
    { name: "Tokyo", country: "Japan", lat: 35.6895, lon: 139.6917 },
    { name: "New York", country: "USA", lat: 40.7128, lon: -74.0060 },
    { name: "London", country: "UK", lat: 51.5074, lon: -0.1278 }
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">Weather</span>
              <span className="text-white">Trip</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover the world with real-time weather data, plan amazing trips, 
              and connect with fellow travelers on the ultimate smart tourism platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <CitySearchInput onCitySelect={handleCitySearch} />
          </motion.div>

          {Object.keys(weatherData).length > 0 && (
             <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl mx-auto mb-16"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.values(weatherData)
                  .filter(w => w.city.toLowerCase().includes(currentSearchQueryValue.split(',')[0].toLowerCase())) // Basic filter for current search display
                  .slice(-3) 
                  .map((weather, index) => (
                  <Card key={index} className="weather-card border-blue-500/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center justify-between">
                        {weather.city}
                        <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.condition} className="w-10 h-10 -mr-2 -mt-2"/>
                      </CardTitle>
                       <p className="text-gray-400 text-xs">{weather.description}</p>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold text-blue-300 mb-2">{weather.temperature}°C</p>
                      <div className="space-y-1 text-gray-300 text-sm">
                        <p>Humidity: {weather.humidity}%</p>
                        <p>Wind: {weather.windSpeed} km/h</p>
                        <p>Local Time: {weather.localTime}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything You Need for Perfect Trips
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From real-time weather updates to comprehensive trip planning, 
              WeatherTrip has all the tools you need for unforgettable adventures.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="h-full weather-card border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 weather-gradient rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-300">
              Explore trending destinations with live weather updates
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                 onClick={() => handleCitySearch(destination)}
              >
                <Card className="weather-card border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
                   <CardHeader>
                     <CardTitle className="text-white text-xl"> {destination.name}</CardTitle>
                      <p className="text-gray-400 text-sm">{destination.country}</p>
                   </CardHeader>
                  <CardContent className="p-6 pt-0">
                      <Button variant="link" className="text-blue-300 p-0 h-auto">View Weather</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="weather-card p-12 rounded-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of travelers who trust WeatherTrip for their journeys
            </p>
            <Button
              onClick={() => toast({
                title: "🚧 Feature Coming Soon!",
                description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
              })}
              size="lg"
              className="weather-gradient text-white hover:opacity-90 text-lg px-8 py-4"
            >
              Start Planning Now
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;