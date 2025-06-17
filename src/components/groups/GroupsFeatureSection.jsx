import React from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

const GroupsFeatureSection = () => {
  const features = [
    {
      icon: Users,
      title: "Meet Fellow Travelers",
      description: "Connect with like-minded people who share your passion for travel and adventure"
    },
    {
      icon: MapPin,
      title: "Plan Together",
      description: "Collaborate on itineraries, share costs, and make group decisions for better trips"
    },
    {
      icon: MessageCircle,
      title: "Share Experiences",
      description: "Exchange tips, photos, and memories with your travel companions"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-20"
    >
      <Card className="weather-card border-blue-500/20 p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Why Join Travel Groups?
          </h2>
          <p className="text-gray-300">
            Connect, share, and explore the world together
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 weather-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default GroupsFeatureSection;