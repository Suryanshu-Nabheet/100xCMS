# Admin System Documentation

## Overview

The admin system provides comprehensive management capabilities for the ClassX platform, including user management, course creation, and system administration.

## Admin Authentication

### Admin Credentials
- **Name**: Suryanshu Nabheet
- **Email**: suryanshunab@gmail.com
- **Password**: suryanshu@30052010

### Authentication Flow
1. Users sign in through Clerk authentication
2. System checks if the user's email matches admin credentials
3. If admin email is detected, admin login form is shown
4. Admin enters credentials to access admin dashboard
5. Session is stored in localStorage for persistence

## Admin Features

### 1. Admin Dashboard
- **Overview**: System statistics and metrics
- **Users Tab**: View all registered users
- **Courses Tab**: Manage all courses
- **Real-time Stats**: Total users, courses, enrollments

### 2. Course Manager
- **Create Course**: Full course creation interface
- **Course Details**: Title, description, price, category, level
- **Lessons Management**: Add/edit/remove course lessons
- **Media Support**: Thumbnail images, video URLs
- **Publishing**: Draft and published course states

### 3. User Management
- **User List**: View all registered users
- **User Details**: Name, email, role, enrollment count
- **User Actions**: View, edit, delete users
- **Role Management**: Student, instructor, admin roles

## File Structure

```
src/components/Admin/
├── auth.tsx              # Admin authentication logic
├── dashboard.tsx         # Admin dashboard interface
├── course-manager.tsx    # Course creation and management
└── index.ts             # Export declarations
```

## Components

### useAdminAuth Hook
```typescript
const {
  isAdmin,           // Boolean: Is user admin
  isLoading,         // Boolean: Loading state
  adminUser,         // AdminUser: Current admin data
  loginAdmin,        // Function: Login admin
  logoutAdmin,       // Function: Logout admin
  isAdminEmail,      // Function: Check if email is admin
  ADMIN_CREDENTIALS // Object: Admin credentials
} = useAdminAuth()
```

### AdminLoginForm Component
- Secure admin login interface
- Email and password validation
- Error handling and feedback
- Responsive design

### AdminDashboard Component
- System overview with statistics
- Tabbed interface (Overview, Users, Courses)
- Real-time data display
- Action buttons for management

### CourseManager Component
- Course creation form
- Course management interface
- Lesson management system
- Media upload support

## Integration Points

### LayoutShell Integration
- Admin menu items added dynamically
- Role-based navigation
- Admin-specific icons and labels

### App.tsx Integration
- Admin authentication check
- Conditional rendering based on admin status
- Route handling for admin features

## Security Features

### Authentication Security
- Email-based admin identification
- Password verification
- Session management
- Automatic logout on session expiry

### Access Control
- Admin-only features
- Role-based menu items
- Protected admin routes
- User permission checks

## Data Management

### Local Storage
- Admin session persistence
- Login time tracking
- Session validation

### Mock Data
- Sample users and courses
- Realistic test data
- Easy to replace with real API

## Usage Instructions

### For Admins
1. Sign in with regular Clerk authentication
2. Enter admin credentials when prompted
3. Access admin dashboard
4. Manage users and courses
5. Create and publish content

### For Developers
1. Admin system is self-contained
2. Easy to extend with new features
3. Modular component structure
4. TypeScript support throughout

## Future Enhancements

### Planned Features
- Real database integration
- Advanced user management
- Course analytics
- Content moderation
- System settings
- Audit logs

### API Integration
- Replace mock data with real APIs
- User management endpoints
- Course CRUD operations
- File upload handling

## Troubleshooting

### Common Issues
1. **Admin login not working**: Check email/password
2. **Session expired**: Re-login required
3. **Menu items missing**: Check admin authentication
4. **Course creation fails**: Validate form data

### Debug Mode
- Check localStorage for admin session
- Verify email matching
- Check console for errors
- Validate form inputs

## Notes

- Admin system is designed for single admin (Suryanshu Nabheet)
- All content creation is done through local code
- No external posting capabilities
- Secure and private admin access
- Easy to maintain and extend
