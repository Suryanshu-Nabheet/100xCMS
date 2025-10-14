# Admin System Usage

## Overview
The admin system has been simplified to focus on core functionality:
- Student management (from Clerk API)
- Admin account management
- No course management (courses are hardcoded)

## Default Admin Credentials
```
Email: suryanshunab@gmail.com
Password: suryanshu@30052010
Role: Super Admin
```

## Usage

### 1. Access Admin Panel
```tsx
import { AdminPanel } from './components/Admin'

// Use the admin panel
<AdminPanel />
```

### 2. Admin Authentication
```tsx
import { AdminLoginForm } from './components/Admin'

// Show login form
<AdminLoginForm />
```

### 3. Admin Dashboard Only
```tsx
import { AdminDashboard } from './components/Admin'

// Use dashboard with guard
<AdminGuard>
  <AdminDashboard />
</AdminGuard>
```

## Features

### Admin Dashboard
- **Students Tab**: View all students from Clerk API
- **Admins Tab**: Manage admin accounts (Super Admin only)
- **Stats**: Total students and admins count

### Admin Management
- Add new admins (Super Admin only)
- Remove admins (Super Admin only)
- View admin details and roles

### Student Management
- View all students from Clerk API
- Search students by name or email
- View student details and status

## Security
- Admin-only access with authentication
- Role-based permissions (Super Admin vs Admin)
- Session management
- Input validation and sanitization

## Integration
- Clerk API for student data
- Local storage for admin data
- No database required
- No course management (hardcoded courses)

## Files Structure
```
src/components/Admin/
├── auth.tsx          # Authentication logic
├── dashboard.tsx     # Main dashboard
├── AdminGuard.tsx    # Route protection
├── AdminPanel.tsx    # Main admin component
└── index.ts         # Exports
```

## Notes
- Courses are managed through hardcoded files
- No course CRUD operations
- Focus on student and admin management
- Simplified interface
- Production-ready with proper error handling
