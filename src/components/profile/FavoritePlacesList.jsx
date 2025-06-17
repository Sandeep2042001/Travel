import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const FavoritePlacesList = ({ favorites, toast }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mb-8"
    >
      <Card className="weather-card border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Heart className="h-5 w-5 mr-2 text-red-400" />
            Favorite Places
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.slice(0, 6).map((favorite, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold">{favorite.name}</h4>
                <p className="text-gray-400 text-sm">{favorite.country}</p>
                {favorite.temperature && (
                  <p className="text-blue-400 text-sm">{favorite.temperature}</p>
                )}
              </div>
            ))}
          </div>
          {favorites.length > 6 && (
            <Button
              onClick={() => toast({
                title: "🚧 Feature Coming Soon!",
                description: "View all favorites isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
              })}
              variant="outline"
              className="w-full mt-4 glass-effect border-white/20 text-white hover:bg-white/10"
            >
              View All {favorites.length} Favorites
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FavoritePlacesList;