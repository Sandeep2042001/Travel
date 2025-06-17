import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Heart, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useToast } from '@/components/ui/use-toast';
import ProfileForm from '@/components/profile/ProfileForm';
import ProfileDisplay from '@/components/profile/ProfileDisplay';
import ProfileStats from '@/components/profile/ProfileStats';
import FavoritePlacesList from '@/components/profile/FavoritePlacesList';
import ProfileSettingsOptions from '@/components/profile/ProfileSettingsOptions';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { favorites } = useFavorites();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    location: user?.location || '',
    website: user?.website || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    toast({
      title: "Profile Updated!",
      description: "Your profile has been successfully updated"
    });
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || '',
      location: user?.location || '',
      website: user?.website || ''
    });
    setIsEditing(false);
  };

  const stats = [
    {
      icon: Heart,
      label: "Favorite Places",
      value: favorites.length,
      color: "text-red-400"
    },
    {
      icon: MapPin,
      label: "Countries Visited",
      value: "12",
      color: "text-blue-400"
    },
    {
      icon: Calendar,
      label: "Trips Planned",
      value: "8",
      color: "text-green-400"
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <Card className="weather-card border-blue-500/20 p-8 text-center">
          <div className="text-6xl mb-6">👤</div>
          <h2 className="text-2xl font-bold text-white mb-4">Please Sign In</h2>
          <p className="text-gray-300">You need to be signed in to view your profile.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="text-gradient">Your</span> Profile
          </h1>
          <p className="text-xl text-gray-300">
            Manage your account and travel preferences
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="weather-card border-blue-500/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Profile Information
                </CardTitle>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="outline"
                  className="glass-effect border-white/20 text-white hover:bg-white/10"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl text-white font-bold">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <Button
                    onClick={() => toast({
                      title: "🚧 Feature Coming Soon!",
                      description: "Avatar upload isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                    })}
                    variant="outline"
                    className="w-full mt-4 glass-effect border-white/20 text-white hover:bg-white/10"
                  >
                    Change Avatar
                  </Button>
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <ProfileForm
                      formData={formData}
                      handleInputChange={handleInputChange}
                      handleSave={handleSave}
                      handleCancel={handleCancel}
                    />
                  ) : (
                    <ProfileDisplay user={user} />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <ProfileStats stats={stats} />
        
        {favorites.length > 0 && <FavoritePlacesList favorites={favorites} toast={toast} />}

        <ProfileSettingsOptions toast={toast} />
      </div>
    </div>
  );
};

export default Profile;