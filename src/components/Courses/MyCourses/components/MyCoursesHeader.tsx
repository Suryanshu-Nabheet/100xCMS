import React from 'react';
import { BookOpen, Filter, Search } from 'lucide-react';
import { myCoursesData } from '../data/myCoursesData';

interface MyCoursesHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const MyCoursesHeader: React.FC<MyCoursesHeaderProps> = ({
  searchTerm,
  onSearchChange,
  activeFilter,
  onFilterChange
}) => {
  const { filters } = myCoursesData;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <BookOpen className="w-8 h-8 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">My Courses</h1>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search your courses..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex space-x-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeFilter === filter.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {filter.label}
                {filter.count > 0 && (
                  <span className="ml-2 px-2 py-1 bg-white/10 rounded-full text-xs">
                    {filter.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
