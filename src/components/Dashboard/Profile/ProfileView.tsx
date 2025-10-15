import { useMemo } from 'react';
import { User, Mail, Shield, LogOut, Calendar, Globe } from 'lucide-react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useAdminAuth } from '../../Admin';

export function ProfileView() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { isAdminEmail } = useAdminAuth();
  
  // Check if the current user's email is the admin email
  const userEmail = user?.primaryEmailAddress?.emailAddress
  const isAdminByEmail = userEmail ? isAdminEmail(userEmail) : false
  
  // Safe user data extraction
  const userData = useMemo(() => {
    if (!user) {
      return {
        fullName: 'Guest User',
        email: 'Not logged in',
        role: 'Guest',
        firstName: 'Guest',
        lastName: 'User',
        createdAt: null,
        lastSignInAt: null,
        imageUrl: null
      };
    }
    
    return {
      fullName: user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Unknown User',
      email: user.primaryEmailAddress?.emailAddress || 'No email provided',
      role: isAdminByEmail ? 'Admin' : 'Student',
      firstName: user.firstName || 'Not provided',
      lastName: user.lastName || 'Not provided',
      createdAt: user.createdAt,
      lastSignInAt: user.lastSignInAt,
      imageUrl: user.imageUrl
    };
  }, [user, isAdminByEmail]);

  const handleSignOut = () => {
    signOut();
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Not available';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

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
            View and manage your account information and settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Account Information */}
          <div className="bg-black/80 backdrop-blur-2xl border border-white/15 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mr-4">
                <User className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Account Information</h2>
            </div>
            
            <div className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20">
                  {userData.imageUrl ? (
                    <img 
                      src={userData.imageUrl} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/10 flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-white text-xl font-bold">{userData.fullName}</div>
                  <div className="text-gray-400 text-sm">{userData.email}</div>
                </div>
              </div>

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

              {/* First Name */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-1">First Name</label>
                  <div className="text-white text-lg font-medium">{userData.firstName}</div>
                </div>
              </div>

              {/* Last Name */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Last Name</label>
                  <div className="text-white text-lg font-medium">{userData.lastName}</div>
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

          {/* Account Details */}
          <div className="bg-black/80 backdrop-blur-2xl border border-white/15 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mr-4">
                <Calendar className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Account Details</h2>
            </div>

            <div className="space-y-6">
              {/* Account Created */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Account Created</label>
                  <div className="text-white text-lg font-medium">{formatDate(userData.createdAt)}</div>
                </div>
              </div>

              {/* Last Sign In */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Last Sign In</label>
                  <div className="text-white text-lg font-medium">{formatDate(userData.lastSignInAt)}</div>
                </div>
              </div>

              {/* User ID */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-1">User ID</label>
                  <div className="text-white text-sm font-mono bg-white/5 px-3 py-2 rounded-lg">
                    {user?.id || 'Not available'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-sm"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
