import React from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, MessageCircle, Crown, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const GroupCard = ({ group, user, onJoinGroup, toast, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full weather-card border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-lg">{group.name}</CardTitle>
            {group.createdBy === user?.id && (
              <Crown className="h-5 w-5 text-yellow-400" />
            )}
          </div>
          <p className="text-gray-400 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {group.destination}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-300 text-sm">{group.description}</p>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-300">
                <Users className="h-4 w-4 mr-1" />
                <span>{group.memberCount}/{group.maxMembers} members</span>
              </div>
              {group.isPrivate && (
                <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs">
                  Private
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {group.members.slice(0, 4).map((member, idx) => (
                  <div
                    key={idx}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold border-2 border-gray-800"
                  >
                    {member.avatar ? (
                      <img 
                        src={member.avatar} 
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      member.name.charAt(0).toUpperCase()
                    )}
                  </div>
                ))}
                {group.memberCount > 4 && (
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xs font-semibold border-2 border-gray-800">
                    +{group.memberCount - 4}
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-2">
              {group.createdBy === user?.id ? (
                <>
                  <Button
                    onClick={() => toast({
                      title: "🚧 Feature Coming Soon!",
                      description: "Group management isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                    })}
                    className="flex-1 weather-gradient text-white hover:opacity-90"
                  >
                    Manage
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast({
                      title: "🚧 Feature Coming Soon!",
                      description: "Group chat isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                    })}
                    className="glass-effect border-white/20 text-white hover:bg-white/10"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => onJoinGroup(group.id)}
                    disabled={group.memberCount >= group.maxMembers || group.members.some(m => m.id === user?.id)}
                    className="flex-1 weather-gradient text-white hover:opacity-90 disabled:opacity-50"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    {group.members.some(m => m.id === user?.id) ? 'Joined' : group.memberCount >= group.maxMembers ? 'Full' : 'Join'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast({
                      title: "🚧 Feature Coming Soon!",
                      description: "Group details view isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
                    })}
                    className="glass-effect border-white/20 text-white hover:bg-white/10"
                  >
                    View
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GroupCard;