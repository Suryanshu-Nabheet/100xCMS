# Admin System Documentation

## Overview

The admin system provides streamlined management capabilities for the ClassX platform, focusing on student management and admin account administration. Courses are managed through hardcoded files.

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
- **Students Tab**: View all registered students from Clerk API
- **Admins Tab**: Manage admin accounts (Super Admin only)
- **Real-time Stats**: Total students and admins count

### 2. Student Management
- **Student List**: View all registered students
- **Student Details**: Name, email, status, last sign-in
- **Search Functionality**: Search students by name or email
- **Clerk Integration**: Real-time data from Clerk API

### 3. Admin Management
- **Admin List**: View all admin accounts
- **Add Admins**: Create new admin accounts (Super Admin only)
- **Remove Admins**: Delete admin accounts (Super Admin only)
- **Role Management**: Super Admin and Admin roles

## File Structure

```
src/components/Admin/
├── auth.tsx              # Admin authentication logic
├── dashboard.tsx         # Admin dashboard interface
├── AdminGuard.tsx        # Route protection
├── AdminPanel.tsx        # Main admin component
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
- Tabbed interface (Students, Admins)
- Real-time data display
- Action buttons for management

### AdminPanel Component
- Main admin component wrapper
- Includes AdminGuard for protection
- Simplified admin interface

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

### Clerk API Integration
- Real student data from Clerk
- Server-side API calls for security
- Error handling and fallbacks

## Usage Instructions

### For Admins
1. Sign in with regular Clerk authentication
2. Enter admin credentials when prompted
3. Access admin dashboard
4. Manage students and admin accounts
5. View student data from Clerk API

### For Developers
1. Admin system is self-contained
2. Easy to extend with new features
3. Modular component structure
4. TypeScript support throughout

## Future Enhancements

### Planned Features
- Enhanced student management
- Advanced admin controls
- System analytics
- Content moderation
- System settings
- Audit logs

### API Integration
- Enhanced Clerk API integration
- Student management endpoints
- Admin management operations
- Real-time data updates

## Troubleshooting

### Common Issues
1. **Admin login not working**: Check email/password
2. **Session expired**: Re-login required
3. **Menu items missing**: Check admin authentication
4. **Student data not loading**: Check Clerk API integration

### Debug Mode
- Check localStorage for admin session
- Verify email matching
- Check console for errors
- Validate form inputs

## Notes

- Admin system is designed for single admin (Suryanshu Nabheet)
- Courses are managed through hardcoded files
- Student data comes from Clerk API
- Secure and private admin access
- Easy to maintain and extend
