import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Shield, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ProfileSettingsOptions = ({ toast }) => {
  const settingsOptions = [
    {
      icon: Bell,
      title: "Notifications",
      description: "Manage your notification preferences",
      action: () => toast({
        title: "🚧 Feature Coming Soon!",
        description: "Notification settings aren't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
      })
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Control your privacy and security settings",
      action: () => toast({
        title: "🚧 Feature Coming Soon!",
        description: "Privacy settings aren't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
      })
    },
    {
      icon: Globe,
      title: "Language & Region",
      description: "Set your preferred language and region",
      action: () => toast({
        title: "🚧 Feature Coming Soon!",
        description: "Language settings aren't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
      })
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="weather-card border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {settingsOptions.map((option, index) => (
              <div
                key={index}
                onClick={option.action}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <option.icon className="h-5 w-5 text-blue-400" />
                  <div>
                    <h4 className="text-white font-semibold">{option.title}</h4>
                    <p className="text-gray-400 text-sm">{option.description}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  →
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfileSettingsOptions;