import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { myCoursesData } from '../data/myCoursesData';

interface MyCoursesEmptyProps {
  onBrowseCourses: () => void;
}

export const MyCoursesEmpty: React.FC<MyCoursesEmptyProps> = ({ onBrowseCourses }) => {
  const { emptyState } = myCoursesData;

  return (
    <div className="text-center py-16">
      <div className="mb-8">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">{emptyState.title}</h3>
        <p className="text-gray-400 text-lg max-w-md mx-auto mb-8">
          {emptyState.description}
        </p>
        <button
          onClick={onBrowseCourses}
          className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
        >
          {emptyState.buttonText}
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};
