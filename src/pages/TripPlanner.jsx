
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Plus, Clock, Users, Plane, Hotel, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const TripPlanner = () => {
  const [trips, setTrips] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newTrip, setNewTrip] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: '',
    notes: ''
  });

  const { toast } = useToast();

  const handleCreateTrip = (e) => {
    e.preventDefault();
    
    if (!newTrip.title || !newTrip.destination || !newTrip.startDate || !newTrip.endDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const trip = {
      id: Date.now(),
      ...newTrip,
      createdAt: new Date().toISOString(),
      status: 'planning'
    };

    setTrips(prev => [trip, ...prev]);
    setNewTrip({
      title: '',
      destination: '',
      startDate: '',
      endDate: '',
      travelers: 1,
      budget: '',
      notes: ''
    });
    setIsCreating(false);

    toast({
      title: "Trip Created!",
      description: `Your trip to ${trip.destination} has been created successfully`
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrip(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getDaysUntilTrip = (startDate) => {
    const start = new Date(startDate);
    const today = new Date();
    const diffTime = start - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getTripDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const quickActions = [
    {
      icon: Plane,
      title: "Find Flights",
      description: "Search and compare flight prices"
    },
    {
      icon: Hotel,
      title: "Book Hotels",
      description: "Discover accommodations for your trip"
    },
    {
      icon: Car,
      title: "Rent a Car",
      description: "Find rental cars at your destination"
    },
    {
      icon: MapPin,
      title: "Local Attractions",
      description: "Explore things to do and see"
    }
  ];

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
            <span className="text-gradient">Trip</span> Planner
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Plan your perfect journey with our comprehensive trip planning tools
          </p>
        </motion.div>

        {/* Create Trip Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Button
            onClick={() => setIsCreating(true)}
            className="weather-gradient text-white hover:opacity-90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Trip
          </Button>
        </motion.div>

        {/* Create Trip Form */}
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12"
          >
            <Card className="weather-card border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white">Create New Trip</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateTrip} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-white">Trip Title *</Label>
                      <Input
                        id="title"
                        name="title"
                        value={newTrip.title}
                        onChange={handleInputChange}
                        placeholder="e.g., Summer Vacation in Europe"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="destination" className="text-white">Destination *</Label>
                      <Input
                        id="destination"
                        name="destination"
                        value={newTrip.destination}
                        onChange={handleInputChange}
                        placeholder="e.g., Paris, France"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="startDate" className="text-white">Start Date *</Label>
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={newTrip.startDate}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endDate" className="text-white">End Date *</Label>
                      <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={newTrip.endDate}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="travelers" className="text-white">Number of Travelers</Label>
                      <Input
                        id="travelers"
                        name="travelers"
                        type="number"
                        min="1"
                        value={newTrip.travelers}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget" className="text-white">Budget (Optional)</Label>
                      <Input
                        id="budget"
                        name="budget"
                        value={newTrip.budget}
                        onChange={handleInputChange}
                        placeholder="e.g., $2000"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-white">Notes (Optional)</Label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={newTrip.notes}
                      onChange={handleInputChange}
                      placeholder="Add any special notes or requirements..."
                      rows={3}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      type="submit"
                      className="weather-gradient text-white hover:opacity-90"
                    >
                      Create Trip
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsCreating(false)}
                      className="glass-effect border-white/20 text-white hover:bg-white/10"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="cursor-pointer"
                onClick={() => toast({
                  title: "🚧 Feature Coming Soon!",
                  description: `${action.title} feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`
                })}
              >
                <Card className="weather-card border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 weather-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">{action.title}</h3>
                    <p className="text-gray-300 text-sm">{action.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trips List */}
        {trips.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Your Trips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="weather-card border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white text-lg">{trip.title}</CardTitle>
                        <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                          {trip.status}
                        </span>
                      </div>
                      <p className="text-gray-400 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {trip.destination}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-300">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span className="text-sm">
                            {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center text-gray-300">
                          <Clock className="h-4 w-4 mr-2" />
                          <span className="text-sm">
                            {getTripDuration(trip.startDate, trip.endDate)} days
                          </span>
                        </div>

                        <div className="flex items-center text-gray-300">
                          <Users className="h-4 w-4 mr-2" />
                          <span className="text-sm">
                            {trip.travelers} traveler{trip.travelers > 1 ? 's' : ''}
                          </span>
                        </div>

                        {trip.budget && (
                          <div className="text-gray-300">
                            <span className="text-sm">Budget: {trip.budget}</span>
                          </div>
                        )}

                        <div className="pt-2">
                          {getDaysUntilTrip(trip.startDate) > 0 ? (
                            <p className="text-blue-400 text-sm font-semibold">
                              {getDaysUntilTrip(trip.startDate)} days until departure
                            </p>
                          ) : getDaysUntilTrip(trip.startDate) === 0 ? (
                            <p className="text-green-400 text-sm font-semibold">
                              Departing today!
                            </p>
                          ) : (
                            <p className="text-gray-400 text-sm">
                              Trip completed
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-6">
                        <Button
                          onClick={() => toast({
                            title: "🚧 Feature Coming Soon!",
                            description: "Trip details view isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                          })}
                          className="flex-1 weather-gradient text-white hover:opacity-90"
                        >
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => toast({
                            title: "🚧 Feature Coming Soon!",
                            description: "Trip editing isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                          })}
                          className="glass-effect border-white/20 text-white hover:bg-white/10"
                        >
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {trips.length === 0 && !isCreating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-6">✈️</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              No trips planned yet
            </h3>
            <p className="text-gray-300 max-w-md mx-auto mb-8">
              Start planning your next adventure by creating your first trip. 
              Add destinations, dates, and all the details you need for the perfect journey.
            </p>
            <Button
              onClick={() => setIsCreating(true)}
              className="weather-gradient text-white hover:opacity-90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Trip
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TripPlanner;
