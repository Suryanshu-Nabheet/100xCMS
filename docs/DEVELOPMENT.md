# ClassX Development Guide

This comprehensive guide covers all aspects of developing with ClassX, from setup to deployment.

## Table of Contents

1. [Development Environment](#development-environment)
2. [Code Standards](#code-standards)
3. [Component Architecture](#component-architecture)
4. [State Management](#state-management)
5. [Styling Guidelines](#styling-guidelines)
6. [Testing Strategy](#testing-strategy)
7. [Performance Optimization](#performance-optimization)
8. [Debugging](#debugging)
9. [Build Process](#build-process)
10. [Deployment](#deployment)

## Development Environment

### Required Tools

- **Node.js**: v18.0+ (LTS recommended)
- **npm**: v8.0+ or **yarn**: v1.22+
- **Git**: v2.30+
- **VS Code**: Latest version with recommended extensions
- **Chrome DevTools**: For debugging

### VS Code Extensions

Install these essential extensions:

```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json"
  ]
}
```

### Environment Variables

Create `.env.local` for local development:

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
VITE_CLERK_SECRET_KEY=your-clerk-secret-key

# Application
VITE_APP_NAME=ClassX
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development

# Features Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
```

## Code Standards

### TypeScript Guidelines

- Use strict TypeScript configuration
- Define interfaces for all props and data structures
- Use type guards for runtime type checking
- Prefer `interface` over `type` for object shapes
- Use generic types for reusable components

```typescript
// Good
interface UserProps {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
}

// Avoid
type UserProps = {
  id: string;
  name: string;
}
```

### React Best Practices

- Use functional components with hooks
- Implement proper error boundaries
- Use React.memo for performance optimization
- Follow the single responsibility principle
- Use custom hooks for reusable logic

```typescript
// Good
const UserProfile: React.FC<UserProps> = ({ user }) => {
  const { data, loading, error } = useUserData(user.id);
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return <ProfileContent user={data} />;
};
```

### File Naming Conventions

- Components: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useUserData.ts`)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- Types: `camelCase.ts` (e.g., `userTypes.ts`)
- Constants: `UPPER_SNAKE_CASE.ts` (e.g., `API_ENDPOINTS.ts`)

## Component Architecture

### Component Structure

```
src/components/
├── Auth/                 # Authentication components
│   ├── SignIn.tsx
│   ├── SignUp.tsx
│   └── index.ts
├── Admin/                # Admin dashboard components
│   ├── AdminGuard.tsx
│   ├── AdminPanel.tsx
│   ├── auth.tsx
│   ├── dashboard.tsx
│   ├── index.ts
│   └── USAGE.md
├── Dashboard/            # Main application dashboard
│   ├── Courses/          # Course management
│   │   ├── AdhocClasses/
│   │   ├── DevopsCohort/
│   │   ├── DsaClasses/
│   │   ├── SolanaFellowship/
│   │   ├── Web3Cohort/
│   │   ├── WebDevCohort/
│   │   ├── CourseDetail.tsx
│   │   └── coursesData.ts
│   ├── Home/
│   ├── Layout/
│   ├── Profile/
│   ├── Updates/
│   └── Video/
└── Landing/              # Landing page components
    ├── Components/
    ├── landing-page.tsx
    ├── main.tsx
    └── index.ts
```

### Component Template

```typescript
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface ComponentProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
  onBack?: () => void;
}

const Component: React.FC<ComponentProps> = ({
  title,
  children,
  className = '',
  onBack
}) => {
  return (
    <div className={`min-h-screen bg-black text-white ${className}`}>
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-md border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-blue-900/90 hover:bg-blue-800/90 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
          <div className="flex-1 text-center">
            <h1 className="text-lg font-bold">{title}</h1>
            <p className="text-sm text-gray-400">By Suryanshu Nabheet</p>
          </div>
          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default Component;
```

## State Management

### Context API Usage

Use React Context for global state management when needed:

```typescript
// Example context for theme management
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

### Clerk Authentication Integration

The project uses Clerk for authentication and user management:

```typescript
// Example Clerk integration
import { useUser, useAuth } from '@clerk/clerk-react';

const ProtectedComponent = () => {
  const { user, isLoaded } = useUser();
  const { signOut } = useAuth();

  if (!isLoaded) return <div>Loading...</div>;
  if (!user) return <div>Please sign in</div>;

  return (
    <div>
      <h1>Welcome, {user.firstName}!</h1>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};
```

### Custom Hooks

Create custom hooks for reusable state logic:

```typescript
// hooks/useLocalStorage.ts
export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};
```

## Styling Guidelines

### Tailwind CSS Best Practices

- Use utility classes for styling
- Create custom components for repeated patterns
- Use CSS variables for theme colors
- Implement responsive design with mobile-first approach
- Follow the dark theme design system

```typescript
// Good - Dark theme button component
const Button: React.FC<ButtonProps> = ({ variant, size, children }) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-800 text-gray-200 hover:bg-gray-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
  };
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {children}
    </button>
  );
};
```

### CSS Custom Properties

Define theme variables in `index.css`:

```css
:root {
  --color-primary: #3b82f6;
  --color-secondary: #64748b;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  
  --bg-primary: #000000;
  --bg-secondary: #111111;
  --bg-tertiary: #1a1a1a;
  
  --text-primary: #ffffff;
  --text-secondary: #d1d5db;
  --text-muted: #9ca3af;
  
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  --border-radius-sm: 0.25rem;
  --border-radius-md: 0.5rem;
  --border-radius-lg: 0.75rem;
  
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}
```

## Testing Strategy

### Unit Testing with Vitest

```typescript
// __tests__/utils/formatDate.test.ts
import { describe, it, expect } from 'vitest';
import { formatDate } from '../../src/utils/formatDate';

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2024-01-15T10:30:00Z');
    const result = formatDate(date);
    expect(result).toBe('Jan 15, 2024');
  });

  it('should handle invalid dates', () => {
    const result = formatDate(new Date('invalid'));
    expect(result).toBe('Invalid Date');
  });
});
```

### Component Testing with Testing Library

```typescript
// __tests__/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '../../src/components/Button';

describe('Button', () => {
  it('should render with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Performance Optimization

### Code Splitting

```typescript
// Lazy load components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

// Use Suspense for loading states
<Suspense fallback={<LoadingSpinner />}>
  <Dashboard />
</Suspense>
```

### Image Optimization

```typescript
// Optimized image component
const OptimizedImage: React.FC<ImageProps> = ({ src, alt, ...props }) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
};
```

### Memoization

```typescript
// Memoize expensive calculations
const ExpensiveComponent = memo(({ data }: { data: ComplexData[] }) => {
  const processedData = useMemo(() => {
    return data.map(item => expensiveCalculation(item));
  }, [data]);

  return <div>{/* Render processed data */}</div>;
});
```

## Debugging

### Development Tools

1. **React Developer Tools**: Browser extension for React debugging
2. **Redux DevTools**: For state management debugging
3. **Chrome DevTools**: Performance profiling and network analysis
4. **VS Code Debugger**: Breakpoint debugging

### Debugging Techniques

```typescript
// Use console.log strategically
const useDebugLog = (value: any, label?: string) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(label || 'Debug:', value);
    }
  }, [value, label]);
};

// Error boundaries for graceful error handling
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
```

## Build Process

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/lib'),
    },
  },
  define: {
    VITE_CLERK_SECRET_KEY: JSON.stringify(process.env.VITE_CLERK_SECRET_KEY),
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          clerk: ['@clerk/clerk-react'],
          ui: ['lucide-react'],
        },
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
```

### Build Optimization

```bash
# Production build
npm run build

# Analyze bundle size
npm run build -- --analyze

# Preview production build
npm run preview
```

## Deployment

### Environment-Specific Builds

```typescript
// vite.config.ts
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
      VITE_CLERK_SECRET_KEY: JSON.stringify(process.env.VITE_CLERK_SECRET_KEY),
    },
    build: {
      minify: mode === 'production',
      sourcemap: mode === 'development',
    },
  };
});
```

### Deployment Checklist

- [ ] Clerk environment variables configured
- [ ] Build passes without errors
- [ ] Tests pass
- [ ] Performance audit completed
- [ ] Security scan completed
- [ ] Accessibility audit completed
- [ ] Cross-browser testing completed
- [ ] Video player functionality tested
- [ ] Admin dashboard access verified
- [ ] Course data synchronization confirmed

## Best Practices Summary

1. **Code Quality**: Follow TypeScript and React best practices
2. **Performance**: Implement lazy loading and memoization
3. **Testing**: Write comprehensive unit and integration tests
4. **Accessibility**: Ensure WCAG compliance
5. **Security**: Validate inputs and sanitize outputs
6. **Documentation**: Keep code and documentation in sync
7. **Monitoring**: Implement error tracking and analytics
8. **Authentication**: Use Clerk for secure user management
9. **Course Management**: Follow the real course data system
10. **Admin Dashboard**: Ensure proper admin access controls

---

**Happy coding! 🚀**

For more information, check out our [Course Management Guide](HARDCODED_COURSES.md), [Admin System Documentation](ADMIN_SYSTEM.md), and [Deployment Guide](DEPLOYMENT.md).
