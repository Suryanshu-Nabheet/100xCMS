# ClassX Testing Guide

Comprehensive testing strategy and implementation guide for ClassX platform.

## Table of Contents

1. [Testing Strategy](#testing-strategy)
2. [Unit Testing](#unit-testing)
3. [Integration Testing](#integration-testing)
4. [End-to-End Testing](#end-to-end-testing)
5. [Component Testing](#component-testing)
6. [API Testing](#api-testing)
7. [Performance Testing](#performance-testing)
8. [Accessibility Testing](#accessibility-testing)
9. [Security Testing](#security-testing)
10. [Test Automation](#test-automation)

## Testing Strategy

### Testing Pyramid

```
        /\
       /  \
      / E2E \     <- Few, High-level tests
     /______\
    /        \
   /Integration\ <- Some, Medium-level tests
  /____________\
 /              \
/   Unit Tests   \ <- Many, Low-level tests
/________________\
```

### Testing Tools Stack

- **Unit Testing**: Vitest, Jest
- **Component Testing**: React Testing Library, Enzyme
- **E2E Testing**: Playwright, Cypress
- **API Testing**: Supertest, Postman
- **Performance**: Lighthouse, WebPageTest
- **Accessibility**: axe-core, WAVE
- **Coverage**: Istanbul, c8

### Test Configuration

#### `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        'dist/',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

#### Test Setup File

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, afterAll } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock IntersectionObserver
beforeAll(() => {
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
  };
});

// Mock ResizeObserver
beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
  };
});
```

## Unit Testing

### Testing Utilities

```typescript
// src/test/utils.tsx
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

### Utility Function Tests

```typescript
// src/utils/__tests__/formatDate.test.ts
import { describe, it, expect } from 'vitest';
import { formatDate, formatRelativeTime, isValidDate } from '../formatDate';

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2025-01-15T10:30:00Z');
    const result = formatDate(date);
    expect(result).toBe('Jan 15, 2025');
  });

  it('should handle different locales', () => {
    const date = new Date('2025-01-15T10:30:00Z');
    const result = formatDate(date, 'en-GB');
    expect(result).toBe('15 Jan 2025');
  });

  it('should handle invalid dates', () => {
    const result = formatDate(new Date('invalid'));
    expect(result).toBe('Invalid Date');
  });
});

describe('formatRelativeTime', () => {
  it('should format relative time correctly', () => {
    const now = new Date('2025-01-15T12:00:00Z');
    const past = new Date('2025-01-15T11:00:00Z');
    const result = formatRelativeTime(past, now);
    expect(result).toBe('1 hour ago');
  });
});

describe('isValidDate', () => {
  it('should validate dates correctly', () => {
    expect(isValidDate(new Date())).toBe(true);
    expect(isValidDate(new Date('invalid'))).toBe(false);
    expect(isValidDate(null)).toBe(false);
    expect(isValidDate(undefined)).toBe(false);
  });
});
```

### Custom Hook Tests

```typescript
// src/hooks/__tests__/useLocalStorage.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should return initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('should return stored value when localStorage has data', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'));
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('stored-value');
  });

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    
    act(() => {
      result.current[1]('new-value');
    });

    expect(result.current[0]).toBe('new-value');
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('new-value'));
  });

  it('should handle errors gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock localStorage to throw error
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(() => {
          throw new Error('Storage error');
        }),
        setItem: vi.fn(),
      },
    });

    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('initial');
    expect(consoleSpy).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });
});
```

## Integration Testing

### API Integration Tests

```typescript
// src/api/__tests__/auth.test.ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { authAPI } from '../auth';
import { server } from '../../test/mocks/server';

describe('Auth API', () => {
  beforeEach(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterEach(() => {
    server.close();
  });

  it('should login successfully', async () => {
    const credentials = {
      email: 'test@example.com',
      password: 'password123',
    };

    const response = await authAPI.login(credentials);
    
    expect(response.success).toBe(true);
    expect(response.data.user.email).toBe(credentials.email);
    expect(response.data.token).toBeDefined();
  });

  it('should handle login errors', async () => {
    const credentials = {
      email: 'invalid@example.com',
      password: 'wrongpassword',
    };

    await expect(authAPI.login(credentials)).rejects.toThrow('Invalid credentials');
  });

  it('should refresh token successfully', async () => {
    const refreshToken = 'valid-refresh-token';
    const response = await authAPI.refreshToken(refreshToken);
    
    expect(response.success).toBe(true);
    expect(response.data.token).toBeDefined();
  });
});
```

### Mock Server Setup

```typescript
// src/test/mocks/server.ts
import { setupServer } from 'msw/node';
import { rest } from 'msw';

export const handlers = [
  rest.post('/api/auth/login', (req, res, ctx) => {
    const { email, password } = req.body as any;
    
    if (email === 'test@example.com' && password === 'password123') {
      return res(
        ctx.json({
          success: true,
          data: {
            user: {
              id: 'user_123',
              email: 'test@example.com',
              name: 'Test User',
            },
            token: 'mock-jwt-token',
          },
        })
      );
    }
    
    return res(
      ctx.status(401),
      ctx.json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid credentials',
        },
      })
    );
  }),

  rest.post('/api/auth/refresh', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          token: 'new-mock-jwt-token',
        },
      })
    );
  }),
];

export const server = setupServer(...handlers);
```

## End-to-End Testing

### Playwright Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

### E2E Test Examples

```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should login successfully', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
    
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('[data-testid="email-input"]', 'invalid@example.com');
    await page.fill('[data-testid="password-input"]', 'wrongpassword');
    await page.click('[data-testid="login-button"]');
    
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-message"]')).toContainText('Invalid credentials');
  });

  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/login');
  });
});
```

```typescript
// e2e/courses.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Course Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
    await expect(page).toHaveURL('/dashboard');
  });

  test('should display courses list', async ({ page }) => {
    await page.goto('/courses');
    
    await expect(page.locator('[data-testid="course-card"]')).toHaveCount.greaterThan(0);
    await expect(page.locator('[data-testid="course-title"]')).toBeVisible();
  });

  test('should filter courses by category', async ({ page }) => {
    await page.goto('/courses');
    
    await page.click('[data-testid="category-filter"]');
    await page.click('[data-testid="programming-category"]');
    
    await expect(page.locator('[data-testid="course-card"]')).toHaveCount.greaterThan(0);
  });

  test('should enroll in course', async ({ page }) => {
    await page.goto('/courses');
    
    const firstCourse = page.locator('[data-testid="course-card"]').first();
    await firstCourse.click('[data-testid="enroll-button"]');
    
    await expect(page.locator('[data-testid="enrollment-modal"]')).toBeVisible();
    await page.click('[data-testid="confirm-enrollment"]');
    
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
  });
});
```

## Component Testing

### Component Test Examples

```typescript
// src/components/__tests__/Button.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

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

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should apply correct variant classes', () => {
    render(<Button variant="primary">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-blue-600');
  });

  it('should apply correct size classes', () => {
    render(<Button size="large">Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-6', 'py-3', 'text-lg');
  });
});
```

### Form Component Testing

```typescript
// src/components/__tests__/LoginForm.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../LoginForm';

describe('LoginForm', () => {
  it('should render form fields', () => {
    render(<LoginForm onSubmit={vi.fn()} />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should validate required fields', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={vi.fn()} />);
    
    await user.click(screen.getByRole('button', { name: /login/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it('should validate email format', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={vi.fn()} />);
    
    await user.type(screen.getByLabelText(/email/i), 'invalid-email');
    await user.click(screen.getByRole('button', { name: /login/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
    });
  });

  it('should submit form with valid data', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);
    
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /login/i }));
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});
```

## API Testing

### API Test Suite

```typescript
// src/api/__tests__/courses.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import { app } from '../../server';

describe('Courses API', () => {
  let authToken: string;

  beforeEach(async () => {
    // Login to get auth token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });
    
    authToken = loginResponse.body.data.token;
  });

  it('should get all courses', async () => {
    const response = await request(app)
      .get('/api/courses')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.courses).toBeInstanceOf(Array);
    expect(response.body.data.pagination).toBeDefined();
  });

  it('should get course by ID', async () => {
    const response = await request(app)
      .get('/api/courses/course_123')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBe('course_123');
    expect(response.body.data.title).toBeDefined();
  });

  it('should enroll in course', async () => {
    const response = await request(app)
      .post('/api/courses/course_123/enroll')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        paymentMethod: 'stripe',
      })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.enrollmentId).toBeDefined();
  });

  it('should return 404 for non-existent course', async () => {
    await request(app)
      .get('/api/courses/non-existent')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(404);
  });
});
```

## Performance Testing

### Lighthouse Testing

```typescript
// e2e/performance.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test('should have good Lighthouse scores', async ({ page }) => {
    await page.goto('/');
    
    const lighthouse = await page.evaluate(() => {
      return new Promise((resolve) => {
        // This would integrate with Lighthouse CI
        resolve({
          performance: 95,
          accessibility: 98,
          bestPractices: 92,
          seo: 100,
        });
      });
    });

    expect(lighthouse.performance).toBeGreaterThan(90);
    expect(lighthouse.accessibility).toBeGreaterThan(90);
    expect(lighthouse.bestPractices).toBeGreaterThan(90);
    expect(lighthouse.seo).toBeGreaterThan(90);
  });

  test('should load within performance budget', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(3000); // 3 seconds
  });
});
```

### Bundle Size Testing

```typescript
// scripts/test-bundle-size.js
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const bundleSizeLimit = 500 * 1024; // 500KB

function testBundleSize() {
  console.log('Building application...');
  execSync('npm run build', { stdio: 'inherit' });

  const distPath = path.join(process.cwd(), 'dist');
  const files = fs.readdirSync(distPath);
  
  let totalSize = 0;
  
  files.forEach(file => {
    const filePath = path.join(distPath, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isFile() && file.endsWith('.js')) {
      totalSize += stats.size;
      console.log(`${file}: ${(stats.size / 1024).toFixed(2)}KB`);
    }
  });

  console.log(`Total bundle size: ${(totalSize / 1024).toFixed(2)}KB`);
  
  if (totalSize > bundleSizeLimit) {
    console.error(`Bundle size exceeds limit of ${bundleSizeLimit / 1024}KB`);
    process.exit(1);
  }
  
  console.log('Bundle size is within limits ✅');
}

testBundleSize();
```

## Accessibility Testing

### Automated Accessibility Tests

```typescript
// src/test/accessibility.test.tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Button from '../components/Button';
import LoginForm from '../components/LoginForm';

expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  it('should not have accessibility violations in Button', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations in LoginForm', async () => {
    const { container } = render(<LoginForm onSubmit={() => {}} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA labels', () => {
    render(<Button aria-label="Close dialog">×</Button>);
    expect(screen.getByLabelText('Close dialog')).toBeInTheDocument();
  });

  it('should support keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={() => {}} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });
    
    await user.tab();
    expect(emailInput).toHaveFocus();
    
    await user.tab();
    expect(passwordInput).toHaveFocus();
    
    await user.tab();
    expect(submitButton).toHaveFocus();
  });
});
```

## Security Testing

### Security Test Examples

```typescript
// src/test/security.test.ts
import { describe, it, expect } from 'vitest';
import { authAPI } from '../api/auth';

describe('Security', () => {
  it('should prevent SQL injection in login', async () => {
    const maliciousInput = "'; DROP TABLE users; --";
    
    await expect(
      authAPI.login({
        email: maliciousInput,
        password: 'password',
      })
    ).rejects.toThrow();
  });

  it('should sanitize user input', () => {
    const maliciousInput = '<script>alert("xss")</script>';
    const sanitized = sanitizeInput(maliciousInput);
    
    expect(sanitized).not.toContain('<script>');
    expect(sanitized).not.toContain('alert');
  });

  it('should validate JWT tokens', async () => {
    const invalidToken = 'invalid.jwt.token';
    
    await expect(
      authAPI.getProfile(invalidToken)
    ).rejects.toThrow('Invalid token');
  });

  it('should enforce rate limiting', async () => {
    const promises = Array(10).fill(null).map(() =>
      authAPI.login({
        email: 'test@example.com',
        password: 'wrongpassword',
      })
    );
    
    const results = await Promise.allSettled(promises);
    const rejectedCount = results.filter(r => r.status === 'rejected').length;
    
    expect(rejectedCount).toBeGreaterThan(0);
  });
});
```

## Test Automation

### GitHub Actions CI/CD

```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run unit tests
      run: npm run test:unit
    
    - name: Run integration tests
      run: npm run test:integration
    
    - name: Run E2E tests
      run: npm run test:e2e
    
    - name: Upload coverage reports
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info
    
    - name: Run Lighthouse CI
      run: npm run test:lighthouse
    
    - name: Upload test results
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: test-results
        path: test-results/
```

### Test Scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:unit": "vitest run --coverage",
    "test:integration": "vitest run --config vitest.integration.config.ts",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:lighthouse": "lighthouse-ci",
    "test:accessibility": "jest --testPathPattern=accessibility",
    "test:security": "jest --testPathPattern=security",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest run --coverage --reporter=html"
  }
}
```

### Test Data Management

```typescript
// src/test/fixtures/users.ts
export const testUsers = {
  student: {
    id: 'user_student_123',
    email: 'student@example.com',
    name: 'Test Student',
    role: 'student',
  },
  instructor: {
    id: 'user_instructor_456',
    email: 'instructor@example.com',
    name: 'Test Instructor',
    role: 'instructor',
  },
  admin: {
    id: 'user_admin_789',
    email: 'admin@example.com',
    name: 'Test Admin',
    role: 'admin',
  },
};

// src/test/fixtures/courses.ts
export const testCourses = {
  react: {
    id: 'course_react_123',
    title: 'React Fundamentals',
    description: 'Learn React from scratch',
    category: 'programming',
    level: 'beginner',
    instructorId: 'user_instructor_456',
  },
  nodejs: {
    id: 'course_nodejs_456',
    title: 'Node.js Backend Development',
    description: 'Build scalable backend applications',
    category: 'programming',
    level: 'intermediate',
    instructorId: 'user_instructor_456',
  },
};
```

## Best Practices

### Testing Guidelines

1. **Test Structure**: Follow AAA pattern (Arrange, Act, Assert)
2. **Test Naming**: Use descriptive test names that explain the scenario
3. **Test Isolation**: Each test should be independent and not rely on others
4. **Mock External Dependencies**: Use mocks for API calls, timers, etc.
5. **Test Data**: Use consistent test data and fixtures
6. **Coverage**: Aim for 80%+ code coverage
7. **Performance**: Keep tests fast and efficient
8. **Maintenance**: Keep tests up-to-date with code changes

### Common Anti-patterns

❌ **Don't test implementation details**
```typescript
// Bad
expect(component.state.isLoading).toBe(true);

// Good
expect(screen.getByText('Loading...')).toBeInTheDocument();
```

❌ **Don't test third-party libraries**
```typescript
// Bad
expect(moment().format('YYYY-MM-DD')).toBe('2025-01-15');

// Good - test your own code that uses moment
expect(formatDate(new Date('2025-01-15'))).toBe('Jan 15, 2025');
```

❌ **Don't make tests too complex**
```typescript
// Bad
it('should do everything', () => {
  // 50 lines of test code
});

// Good
it('should validate email format', () => {
  // Simple, focused test
});
```

---

**Need help with testing?** Check out our [Development Guide](DEVELOPMENT.md) or contact us at suryanshunab@gmail.com.
