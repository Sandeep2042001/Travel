import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { WeatherProvider } from '@/contexts/WeatherContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import Weather from '@/pages/Weather';
import Destinations from '@/pages/Destinations';
import TripPlanner from '@/pages/TripPlanner';
import Profile from '@/pages/Profile.jsx';
import Groups from '@/pages/Groups.jsx';

function App() {
  return (
    <AuthProvider>
      <WeatherProvider>
        <FavoritesProvider>
          <Router>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 weather-pattern">
              <Navbar />
              <main className="pt-16">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/weather" element={<Weather />} />
                  <Route path="/destinations" element={<Destinations />} />
                  <Route path="/trip-planner" element={<TripPlanner />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/groups" element={<Groups />} />
                </Routes>
              </main>
              <Toaster />
            </div>
          </Router>
        </FavoritesProvider>
      </WeatherProvider>
    </AuthProvider>
  );
}

export default App;