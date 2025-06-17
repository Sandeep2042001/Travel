import React from 'react';
import { MapPin } from 'lucide-react';

const ProfileDisplay = ({ user }) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-2xl font-bold text-white">{user.name}</h3>
        <p className="text-gray-400">{user.email}</p>
      </div>
      
      {user.bio && (
        <div>
          <h4 className="text-white font-semibold mb-2">Bio</h4>
          <p className="text-gray-300">{user.bio}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {user.location && (
          <div>
            <h4 className="text-white font-semibold mb-1">Location</h4>
            <p className="text-gray-300 flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {user.location}
            </p>
          </div>
        )}
        
        {user.website && (
          <div>
            <h4 className="text-white font-semibold mb-1">Website</h4>
            <a 
              href={user.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              {user.website}
            </a>
          </div>
        )}
      </div>

      <div>
        <h4 className="text-white font-semibold mb-1">Member Since</h4>
        <p className="text-gray-300">
          {new Date(user.joinedDate).toLocaleDateString('en', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
    </div>
  );
};

export default ProfileDisplay;