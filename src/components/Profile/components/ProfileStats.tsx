import React from 'react';
import { BookOpen, Clock, Award, Calendar } from 'lucide-react';
import { profileData } from '../data/profileData';

export const ProfileStats: React.FC = () => {
  const { stats } = profileData;

  const iconMap = {
    BookOpen,
    Clock,
    Award,
    Calendar
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => {
        const IconComponent = iconMap[stat.icon as keyof typeof iconMap];
        
        return (
          <div
            key={stat.id}
            className="bg-white/5 border border-white/10 rounded-lg p-4 text-center"
          >
            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mx-auto mb-3">
              <IconComponent className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
};
