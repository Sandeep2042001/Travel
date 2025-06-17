import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, MapPin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import CreateGroupForm from '@/components/groups/CreateGroupForm';
import GroupCard from '@/components/groups/GroupCard';
import GroupsHeader from '@/components/groups/GroupsHeader';
import GroupsFeatureSection from '@/components/groups/GroupsFeatureSection';

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleCreateGroup = (newGroupData) => {
    const group = {
      id: Date.now(),
      ...newGroupData,
      createdBy: user?.id,
      createdAt: new Date().toISOString(),
      members: [
        {
          id: user?.id,
          name: user?.name,
          avatar: user?.avatar,
          role: 'admin',
          joinedAt: new Date().toISOString()
        }
      ],
      memberCount: 1
    };

    setGroups(prev => [group, ...prev]);
    setIsCreating(false);
    toast({
      title: "Group Created!",
      description: `Your travel group "${group.name}" has been created successfully`
    });
  };

  const handleJoinGroup = (groupId) => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to join travel groups",
        variant: "destructive"
      });
      return;
    }

    setGroups(prev => prev.map(group => {
      if (group.id === groupId) {
        const isAlreadyMember = group.members.some(member => member.id === user.id);
        if (isAlreadyMember) {
          toast({
            title: "Already a Member",
            description: "You're already a member of this group"
          });
          return group;
        }

        const newMember = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          role: 'member',
          joinedAt: new Date().toISOString()
        };

        toast({
          title: "Joined Group!",
          description: `You've successfully joined "${group.name}"`
        });

        return {
          ...group,
          members: [...group.members, newMember],
          memberCount: group.memberCount + 1
        };
      }
      return group;
    }));
  };

  const popularGroups = [
    {
      id: 'popular-1',
      name: 'European Backpackers',
      description: 'Exploring Europe on a budget with fellow travelers',
      destination: 'Europe',
      memberCount: 24,
      maxMembers: 30,
      isPrivate: false,
      createdBy: 'other-user',
      members: [
        { id: 'user1', name: 'Sarah Johnson', avatar: null, role: 'admin' },
        { id: 'user2', name: 'Mike Chen', avatar: null, role: 'member' },
        { id: 'user3', name: 'Emma Wilson', avatar: null, role: 'member' }
      ]
    },
    {
      id: 'popular-2',
      name: 'Southeast Asia Adventure',
      description: 'Discovering the wonders of Southeast Asia together',
      destination: 'Southeast Asia',
      memberCount: 18,
      maxMembers: 25,
      isPrivate: false,
      createdBy: 'other-user',
      members: [
        { id: 'user4', name: 'Alex Rodriguez', avatar: null, role: 'admin' },
        { id: 'user5', name: 'Lisa Park', avatar: null, role: 'member' }
      ]
    },
    {
      id: 'popular-3',
      name: 'Japan Culture Enthusiasts',
      description: 'Immersing ourselves in Japanese culture and traditions',
      destination: 'Japan',
      memberCount: 15,
      maxMembers: 20,
      isPrivate: false,
      createdBy: 'other-user',
      members: [
        { id: 'user6', name: 'David Kim', avatar: null, role: 'admin' },
        { id: 'user7', name: 'Anna Schmidt', avatar: null, role: 'member' }
      ]
    }
  ];

  const allGroups = [...groups, ...popularGroups];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <GroupsHeader />

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
            Create New Group
          </Button>
        </motion.div>

        {isCreating && (
          <CreateGroupForm 
            onCreateGroup={handleCreateGroup} 
            onCancel={() => setIsCreating(false)} 
          />
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {allGroups.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold text-white mb-6">
                {groups.length > 0 ? 'Your Groups & Popular Groups' : 'Popular Groups'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allGroups.map((group, index) => (
                  <GroupCard 
                    key={group.id} 
                    group={group} 
                    user={user}
                    onJoinGroup={handleJoinGroup} 
                    toast={toast}
                    index={index}
                  />
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-6">👥</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                No travel groups yet
              </h3>
              <p className="text-gray-300 max-w-md mx-auto mb-8">
                Create your first travel group or join existing ones to connect with fellow travelers 
                and plan amazing adventures together.
              </p>
              <Button
                onClick={() => setIsCreating(true)}
                className="weather-gradient text-white hover:opacity-90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Group
              </Button>
            </motion.div>
          )}
        </motion.div>
        <GroupsFeatureSection />
      </div>
    </div>
  );
};

export default Groups;