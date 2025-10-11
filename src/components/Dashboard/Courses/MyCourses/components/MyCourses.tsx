import React, { useState } from 'react';
import { BookOpen, Clock, CheckCircle, PlayCircle } from 'lucide-react';
import { CourseCard } from '../../BrowseCourses/components/CourseCard';
import { useUser } from '@clerk/clerk-react';
import { useApp } from '../../../App/contexts/AppContext';
import { MyCoursesHeader } from './MyCoursesHeader';
import { MyCoursesEmpty } from './MyCoursesEmpty';

interface MyCoursesProps {
  onNavigate: (view: string, courseId?: string) => void;
}

export function MyCourses({ onNavigate }: MyCoursesProps) {
  const { user } = useUser();
  const { enrollments, courses } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Get enrolled courses
  const enrolledCourses = courses.filter(course => 
    enrollments.some(enrollment => 
      enrollment.courseId === course.id && enrollment.userId === user?.id
    )
  );

  // Filter courses based on search and filter
  const filteredCourses = enrolledCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'in-progress') return matchesSearch && course.progress && course.progress > 0 && course.progress < 100;
    if (activeFilter === 'completed') return matchesSearch && course.progress === 100;
    if (activeFilter === 'new') return matchesSearch && course.progress === 0;
    
    return matchesSearch;
  });

  if (enrolledCourses.length === 0) {
    return (
      <div className="p-6 md:p-4 sm:p-2 relative bg-black min-h-screen">
        <MyCoursesHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <MyCoursesEmpty onBrowseCourses={() => onNavigate('browse')} />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-4 sm:p-2 relative bg-black min-h-screen">
      <MyCoursesHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            enrolled={true}
            progress={course.progress || 0}
            onView={(courseId) => onNavigate('course-detail', courseId)}
          />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">No courses match your current filters.</p>
        </div>
      )}
    </div>
  );
}
