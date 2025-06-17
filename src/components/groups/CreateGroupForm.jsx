import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CreateGroupForm = ({ onCreateGroup, onCancel }) => {
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    destination: '',
    maxMembers: 10,
    isPrivate: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewGroup(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateGroup(newGroup);
    setNewGroup({ 
      name: '', 
      description: '', 
      destination: '', 
      maxMembers: 10, 
      isPrivate: false 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mb-12"
    >
      <Card className="weather-card border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white">Create New Travel Group</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Group Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={newGroup.name}
                  onChange={handleInputChange}
                  placeholder="e.g., European Adventure Squad"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination" className="text-white">Destination *</Label>
                <Input
                  id="destination"
                  name="destination"
                  value={newGroup.destination}
                  onChange={handleInputChange}
                  placeholder="e.g., Europe, Southeast Asia"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxMembers" className="text-white">Max Members</Label>
                <Input
                  id="maxMembers"
                  name="maxMembers"
                  type="number"
                  min="2"
                  max="50"
                  value={newGroup.maxMembers}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Privacy</Label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPrivate"
                    name="isPrivate"
                    checked={newGroup.isPrivate}
                    onChange={handleInputChange}
                    className="rounded border-white/20 bg-white/10"
                  />
                  <Label htmlFor="isPrivate" className="text-gray-300">
                    Private Group (invite only)
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">Description</Label>
              <textarea
                id="description"
                name="description"
                value={newGroup.description}
                onChange={handleInputChange}
                placeholder="Describe your travel group and what you plan to do..."
                rows={3}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex space-x-4">
              <Button
                type="submit"
                className="weather-gradient text-white hover:opacity-90"
              >
                Create Group
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="glass-effect border-white/20 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CreateGroupForm;