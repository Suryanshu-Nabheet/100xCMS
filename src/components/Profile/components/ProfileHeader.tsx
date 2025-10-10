import React from 'react';
import { User, Camera, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '../../Auth/contexts/AuthContext';

interface ProfileHeaderProps {
  isEditing: boolean;
  onEditToggle: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  isEditing,
  onEditToggle,
  onSave,
  onCancel
}) => {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
            <User className="w-10 h-10 text-gray-400" />
          </div>
          {isEditing && (
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
              <Camera className="w-4 h-4 text-white" />
            </button>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">{user?.fullName || 'User'}</h1>
          <p className="text-gray-400">{user?.email}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {isEditing ? (
          <>
            <button
              onClick={onSave}
              className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </button>
            <button
              onClick={onCancel}
              className="flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={onEditToggle}
            className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};
