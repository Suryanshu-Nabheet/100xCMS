import React, { useState, useMemo } from 'react';
import { CourseCard } from './CourseCard';
import { useUser } from '@clerk/clerk-react';
import { useApp } from '../../../App/contexts/AppContext';
import { BrowseCoursesHeader } from './BrowseCoursesHeader';
import { browseCoursesData } from '../data/browseCoursesData';

export function CourseCatalog() {
  const { user } = useUser();
  const { courses, enrollments, enrollInCourse } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let filtered = courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
      
      const matchesFilter = (() => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'free') return course.price === 0;
        if (activeFilter === 'paid') return course.price > 0;
        if (activeFilter === 'new') return course.createdAt && new Date(course.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        return true;
      })();

      return matchesSearch && matchesCategory && matchesFilter;
    });

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        case 'popular':
          return (b.enrollmentCount || 0) - (a.enrollmentCount || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return filtered;
  }, [courses, searchTerm, activeFilter, activeCategory, sortBy]);

  const handleEnroll = async (courseId: string) => {
    if (user) {
      try {
        await enrollInCourse(courseId, user.id);
      } catch (error) {
        console.error('Failed to enroll in course:', error);
      }
    }
  };

  const isEnrolled = (courseId: string) => {
    return enrollments.some(enrollment => 
      enrollment.courseId === courseId && enrollment.userId === user?.id
    );
  };

  return (
    <div className="p-6 md:p-4 sm:p-2 relative bg-black min-h-screen">
      <BrowseCoursesHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Courses Grid/List */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            enrolled={isEnrolled(course.id)}
            onEnroll={handleEnroll}
            onView={(courseId) => console.log('View course:', courseId)}
            viewMode={viewMode}
          />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">{browseCoursesData.emptyState.title}</p>
          <p className="text-gray-500 text-sm mt-2">{browseCoursesData.emptyState.description}</p>
        </div>
      )}
    </div>
  );
}
