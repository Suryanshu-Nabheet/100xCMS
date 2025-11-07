import { CourseCard } from './CourseCard'
import { allCourses } from './coursesData'

interface CoursesProps {
  onNavigate?: (view: string, courseId?: string) => void
}

export function Courses({ onNavigate }: CoursesProps) {
  return (
    <div className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="w-full mb-8 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-blue-400">Courses</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Discover amazing courses and start your learning journey today
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {allCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onView={(courseId) => onNavigate?.('course-detail', courseId)}
            />
          ))}
        </div>

        {allCourses.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-900/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Courses Available</h3>
              <p className="text-gray-400 mb-6">
                There are currently no courses to display. Check back later for new content.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
