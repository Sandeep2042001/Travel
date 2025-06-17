
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Heart, Camera, Navigation, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useToast } from '@/components/ui/use-toast';

const Destinations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();

  const categories = [
    { id: 'all', name: 'All Destinations' },
    { id: 'beaches', name: 'Beaches' },
    { id: 'mountains', name: 'Mountains' },
    { id: 'cities', name: 'Cities' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'adventure', name: 'Adventure' }
  ];

  const destinations = [
    {
      id: 1,
      name: 'Santorini',
      country: 'Greece',
      category: 'beaches',
      rating: 4.8,
      temperature: '24°C',
      condition: 'Sunny',
      description: 'Beautiful Greek island with stunning sunsets and white-washed buildings',
      attractions: ['Oia Village', 'Red Beach', 'Ancient Thera'],
      bestTime: 'April - October'
    },
    {
      id: 2,
      name: 'Kyoto',
      country: 'Japan',
      category: 'cultural',
      rating: 4.9,
      temperature: '18°C',
      condition: 'Cloudy',
      description: 'Ancient capital with beautiful temples, gardens, and traditional culture',
      attractions: ['Fushimi Inari Shrine', 'Bamboo Grove', 'Kiyomizu Temple'],
      bestTime: 'March - May, September - November'
    },
    {
      id: 3,
      name: 'Swiss Alps',
      country: 'Switzerland',
      category: 'mountains',
      rating: 4.7,
      temperature: '8°C',
      condition: 'Snowy',
      description: 'Majestic mountain range perfect for skiing and hiking',
      attractions: ['Matterhorn', 'Jungfraujoch', 'Lake Geneva'],
      bestTime: 'December - March, June - September'
    },
    {
      id: 4,
      name: 'New York City',
      country: 'USA',
      category: 'cities',
      rating: 4.6,
      temperature: '15°C',
      condition: 'Rainy',
      description: 'The city that never sleeps with iconic landmarks and culture',
      attractions: ['Times Square', 'Central Park', 'Statue of Liberty'],
      bestTime: 'April - June, September - November'
    },
    {
      id: 5,
      name: 'Bali',
      country: 'Indonesia',
      category: 'beaches',
      rating: 4.8,
      temperature: '28°C',
      condition: 'Sunny',
      description: 'Tropical paradise with beautiful beaches and rich culture',
      attractions: ['Uluwatu Temple', 'Rice Terraces', 'Mount Batur'],
      bestTime: 'April - October'
    },
    {
      id: 6,
      name: 'Patagonia',
      country: 'Chile/Argentina',
      category: 'adventure',
      rating: 4.9,
      temperature: '12°C',
      condition: 'Windy',
      description: 'Wild landscape perfect for trekking and adventure sports',
      attractions: ['Torres del Paine', 'Perito Moreno Glacier', 'Fitz Roy'],
      bestTime: 'November - March'
    }
  ];

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFavoriteToggle = (destination) => {
    if (isFavorite(destination.name)) {
      removeFavorite(destination.name);
      toast({
        title: "Removed from Favorites",
        description: `${destination.name} has been removed from your favorites`
      });
    } else {
      addFavorite({
        name: destination.name,
        country: destination.country,
        temperature: destination.temperature,
        condition: destination.condition
      });
      toast({
        title: "Added to Favorites",
        description: `${destination.name} has been added to your favorites`
      });
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return '☀️';
      case 'cloudy': return '☁️';
      case 'rainy': return '🌧️';
      case 'snowy': return '❄️';
      case 'windy': return '💨';
      default: return '🌤️';
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
            <span className="text-gradient">Discover</span> Destinations
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore amazing destinations worldwide with real-time weather data and travel recommendations
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 glass-effect border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <Button
              variant="outline"
              className="glass-effect border-white/20 text-white hover:bg-white/10"
              onClick={() => toast({
                title: "🚧 Feature Coming Soon!",
                description: "Advanced filters aren't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
              })}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id
                    ? "weather-gradient text-white"
                    : "glass-effect border-white/20 text-white hover:bg-white/10"
                }
              >
                {category.name}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Destinations Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="h-full weather-card border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 overflow-hidden">
                {/* Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <img  
                    className="w-full h-full object-cover" 
                    alt={`${destination.name} scenic view`}
                   src="https://images.unsplash.com/photo-1698329446430-f64ced79c82e" />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleFavoriteToggle(destination)}
                      className="bg-black/20 text-white hover:bg-black/40"
                    >
                      <Heart 
                        className={`h-4 w-4 ${isFavorite(destination.name) ? 'fill-current text-red-400' : ''}`} 
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toast({
                        title: "🚧 Feature Coming Soon!",
                        description: "Photo gallery isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                      })}
                      className="bg-black/20 text-white hover:bg-black/40"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-black/40 rounded-lg px-3 py-1">
                    <span className="text-2xl">{getWeatherIcon(destination.condition)}</span>
                    <span className="text-white font-semibold">{destination.temperature}</span>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white text-xl">{destination.name}</CardTitle>
                      <p className="text-gray-400 flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {destination.country}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-white font-semibold">{destination.rating}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-300 mb-4">{destination.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-blue-400 mb-1">Top Attractions:</p>
                      <div className="flex flex-wrap gap-1">
                        {destination.attractions.slice(0, 2).map((attraction, idx) => (
                          <span key={idx} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">
                            {attraction}
                          </span>
                        ))}
                        {destination.attractions.length > 2 && (
                          <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">
                            +{destination.attractions.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-blue-400 mb-1">Best Time to Visit:</p>
                      <p className="text-sm text-gray-300">{destination.bestTime}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-6">
                    <Button
                      onClick={() => toast({
                        title: "🚧 Feature Coming Soon!",
                        description: "Detailed destination view isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                      })}
                      className="flex-1 weather-gradient text-white hover:opacity-90"
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => toast({
                        title: "🚧 Feature Coming Soon!",
                        description: "Interactive map isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                      })}
                      className="glass-effect border-white/20 text-white hover:bg-white/10"
                    >
                      <Navigation className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredDestinations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              No destinations found
            </h3>
            <p className="text-gray-300 max-w-md mx-auto">
              Try adjusting your search terms or category filters to find more destinations.
            </p>
          </motion.div>
        )}

        {/* Interactive Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20"
        >
          <Card className="weather-card border-blue-500/20 p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Explore on Interactive Map
              </h2>
              <p className="text-gray-300 mb-6">
                Discover destinations visually with our interactive world map
              </p>
              <div className="h-64 bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <Button
                    onClick={() => toast({
                      title: "🚧 Feature Coming Soon!",
                      description: "Interactive map isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                    })}
                    className="weather-gradient text-white hover:opacity-90"
                  >
                    Launch Interactive Map
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Destinations;
