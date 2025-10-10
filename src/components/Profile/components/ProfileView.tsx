import React, { useState } from 'react';
import { User, Mail, Shield } from 'lucide-react';
import { useAuth } from '../../Auth/contexts/AuthContext';
import { useApp } from '../../App/contexts/AppContext';
import { ProfileHeader } from './ProfileHeader';
import { ProfileStats } from './ProfileStats';
import { profileData } from '../data/profileData';

export function ProfileView() {
  const { user } = useAuth();
  const { userStats } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    bio: user?.bio || ''
  });

  const handleSave = () => {
    // TODO: Implement save functionality
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser({
      fullName: user?.fullName || '',
      email: user?.email || '',
      bio: user?.bio || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="p-6 md:p-4 sm:p-2 relative bg-black min-h-screen">
      <ProfileHeader
        isEditing={isEditing}
        onEditToggle={() => setIsEditing(true)}
        onSave={handleSave}
        onCancel={handleCancel}
      />

      <ProfileStats />

      {/* Profile Information */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>
        
        <div className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editedUser.fullName}
                onChange={(e) => setEditedUser({ ...editedUser, fullName: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-white">{user?.fullName || 'Not provided'}</span>
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            {isEditing ? (
              <input
                type="email"
                value={editedUser.email}
                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-white">{user?.email || 'Not provided'}</span>
              </div>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Role
            </label>
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-gray-400" />
              <span className="text-white capitalize">{user?.role || 'Student'}</span>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Bio
            </label>
            {isEditing ? (
              <textarea
                value={editedUser.bio}
                onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-white">{user?.bio || 'No bio provided'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {profileData.achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border ${
                achievement.earned
                  ? 'bg-green-500/10 border-green-500/20'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  achievement.earned ? 'bg-green-500/20' : 'bg-white/5'
                }`}>
                  <span className="text-2xl">🏆</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">{achievement.title}</h3>
                  <p className="text-sm text-gray-400">{achievement.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
