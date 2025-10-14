import { useMemo } from 'react';
import { User, Mail, Shield, BookOpen, Clock, CheckCircle } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { useAdminAuth } from '../../Admin';

interface CourseProgress {
  courseId: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
}

export function ProfileView() {
  const { user } = useUser();
  // Mock data for enrolled courses (since we removed the App context)
  const mockEnrolledCourses = [];
  const mockCourseProgress = {};
  const { isAdminEmail } = useAdminAuth();
  
  // Check if the current user's email is the admin email
  const userEmail = user?.primaryEmailAddress?.emailAddress
  const isAdminByEmail = userEmail ? isAdminEmail(userEmail) : false
  
  // Mock enrolled courses data
  const enrolledCourses = useMemo(() => {
    return mockEnrolledCourses;
  }, []);

  // Mock course progress data
  const courseProgressData = useMemo((): CourseProgress[] => {
    return enrolledCourses.map(course => ({
      courseId: course.id,
      progress: 0,
      completedLessons: 0,
      totalLessons: 0
    }));
  }, [enrolledCourses]);

  // Safe user data extraction
  const userData = useMemo(() => {
    if (!user) {
      return {
        fullName: 'Guest User',
        email: 'Not logged in',
        role: 'Guest'
      };
    }
    
    return {
      fullName: user.fullName || user.firstName + ' ' + user.lastName || 'Unknown User',
      email: user.primaryEmailAddress?.emailAddress || 'No email provided',
      role: isAdminByEmail ? 'Admin' : 'Student'
    };
  }, [user, isAdminByEmail]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Pure black background with subtle blue accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-900/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-10 w-80 h-80 bg-blue-800/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-blue-700/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-6 md:p-8 lg:p-12 max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6">
            <User className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Profile</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Manage your account information and track your learning progress
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Login Credentials */}
          <div className="bg-black/80 backdrop-blur-2xl border border-white/15 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mr-4">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Account Information</h2>
            </div>
            
            <div className="space-y-6">
              {/* Full Name */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                  <div className="text-white text-lg font-medium">{userData.fullName}</div>
                </div>
                  </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                  <div className="text-white text-lg font-medium">{userData.email}</div>
                </div>
              </div>

              {/* Role */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Account Role</label>
                  <div className="text-white text-lg font-medium capitalize">{userData.role}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Statistics */}
          <div className="bg-black/80 backdrop-blur-2xl border border-white/15 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mr-4">
                <BookOpen className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Learning Statistics</h2>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{enrolledCourses.length}</div>
                <div className="text-gray-400 text-sm">Courses Enrolled</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {courseProgressData.reduce((acc, course) => acc + course.completedLessons, 0)}
                  </div>
                <div className="text-gray-400 text-sm">Lessons Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {enrolledCourses.length > 0 
                    ? Math.round(courseProgressData.reduce((acc, course) => acc + course.progress, 0) / enrolledCourses.length)
                    : 0}%
                  </div>
                <div className="text-gray-400 text-sm">Average Progress</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {courseProgressData.reduce((acc, course) => acc + course.totalLessons, 0)}
                  </div>
                <div className="text-gray-400 text-sm">Total Lessons</div>
              </div>
            </div>
              </div>
            </div>

        {/* Enrolled Courses */}
        <div className="bg-white/3 backdrop-blur-2xl border border-white/10 rounded-3xl p-8">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mr-4">
              <BookOpen className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Enrolled Courses</h2>
            <div className="ml-auto bg-white/5 rounded-full px-4 py-2">
              <span className="text-white font-medium">{enrolledCourses.length}</span>
                </div>
                </div>
          
          {enrolledCourses.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-gray-400" />
                </div>
              <h3 className="text-2xl font-semibold text-white mb-4">No Courses Enrolled</h3>
              <p className="text-gray-400 text-lg max-w-md mx-auto">
                You haven't enrolled in any courses yet. Browse our course catalog to get started with your learning journey.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {enrolledCourses.map((course, index) => {
                const progressData = courseProgressData.find(p => p.courseId === course.id);
                const progress = progressData?.progress || 0;
                const completedLessons = progressData?.completedLessons || 0;
                const totalLessons = progressData?.totalLessons || 0;
                
                return (
                  <div
                    key={course.id}
                    className="bg-white/2 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                  >
                    {/* Course Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-blue-400" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400">Course #{index + 1}</div>
                        <div className="text-lg font-bold text-white">{progress}%</div>
                      </div>
                    </div>
                    
                    {/* Course Info */}
            <div className="space-y-4">
                  <div>
                        <h3 className="font-bold text-white text-lg mb-2 line-clamp-2">{course.title}</h3>
                        <p className="text-gray-400 text-sm line-clamp-3">{course.description}</p>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-white font-medium">{progress}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Course Stats */}
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-1 text-gray-400 mb-1">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">Total</span>
                          </div>
                          <div className="text-white font-semibold">{totalLessons}</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-1 text-gray-400 mb-1">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm">Done</span>
                          </div>
                          <div className="text-white font-semibold">{completedLessons}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
