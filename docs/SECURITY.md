# ClassX Security Guide

Comprehensive security implementation and best practices for ClassX platform.

## Table of Contents

1. [Security Overview](#security-overview)
2. [Authentication & Authorization](#authentication--authorization)
3. [Data Protection](#data-protection)
4. [Input Validation](#input-validation)
5. [API Security](#api-security)
6. [Frontend Security](#frontend-security)
7. [Infrastructure Security](#infrastructure-security)
8. [Monitoring & Incident Response](#monitoring--incident-response)
9. [Compliance & Privacy](#compliance--privacy)
10. [Security Testing](#security-testing)

## Security Overview

### Security Principles

- **Defense in Depth**: Multiple layers of security controls
- **Least Privilege**: Minimal necessary access permissions
- **Zero Trust**: Verify everything, trust nothing
- **Security by Design**: Built-in security from the start
- **Regular Updates**: Keep all components updated

### Threat Model

#### Potential Threats

1. **Authentication Bypass**: Unauthorized access to user accounts
2. **Data Breach**: Unauthorized access to sensitive data
3. **Injection Attacks**: SQL injection, XSS, command injection
4. **Session Hijacking**: Unauthorized session access
5. **CSRF Attacks**: Cross-site request forgery
6. **DDoS Attacks**: Service disruption
7. **Man-in-the-Middle**: Intercepted communications
8. **Social Engineering**: Human-based attacks

#### Security Controls

- **Authentication**: Multi-factor authentication, strong passwords
- **Authorization**: Role-based access control (RBAC)
- **Encryption**: Data at rest and in transit
- **Input Validation**: Sanitization and validation
- **Rate Limiting**: Prevent abuse and DDoS
- **Monitoring**: Real-time threat detection
- **Backup**: Regular data backups
- **Incident Response**: Prepared response procedures

## Authentication & Authorization

### JWT Implementation

```typescript
// src/auth/jwt.ts
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';
const JWT_EXPIRES_IN = '1h';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export class JWTService {
  static generateAccessToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
      issuer: 'classx.com',
      audience: 'classx-users',
    });
  }

  static generateRefreshToken(userId: string): string {
    const payload = { userId, type: 'refresh' };
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
      issuer: 'classx.com',
      audience: 'classx-users',
    });
  }

  static verifyToken(token: string): JWTPayload {
    try {
      return jwt.verify(token, JWT_SECRET, {
        issuer: 'classx.com',
        audience: 'classx-users',
      }) as JWTPayload;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  static generateSecureRandomToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }
}
```

### Password Security

```typescript
// src/auth/password.ts
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const SALT_ROUNDS = 12;

export class PasswordService {
  static async hashPassword(password: string): Promise<string> {
    // Validate password strength
    this.validatePasswordStrength(password);
    
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static validatePasswordStrength(password: string): void {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      throw new Error('Password must be at least 8 characters long');
    }

    if (!hasUpperCase) {
      throw new Error('Password must contain at least one uppercase letter');
    }

    if (!hasLowerCase) {
      throw new Error('Password must contain at least one lowercase letter');
    }

    if (!hasNumbers) {
      throw new Error('Password must contain at least one number');
    }

    if (!hasSpecialChar) {
      throw new Error('Password must contain at least one special character');
    }
  }

  static generateSecurePassword(): string {
    const length = 16;
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    
    for (let i = 0; i < length; i++) {
      password += charset.charAt(crypto.randomInt(0, charset.length));
    }
    
    return password;
  }
}
```

### Multi-Factor Authentication

```typescript
// src/auth/mfa.ts
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

export class MFAService {
  static generateSecret(userEmail: string): { secret: string; qrCodeUrl: string } {
    const secret = speakeasy.generateSecret({
      name: `ClassX (${userEmail})`,
      issuer: 'ClassX',
      length: 32,
    });

    return {
      secret: secret.base32,
      qrCodeUrl: secret.otpauth_url,
    };
  }

  static verifyToken(token: string, secret: string): boolean {
    return speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 2, // Allow 2 time steps tolerance
    });
  }

  static generateBackupCodes(count: number = 10): string[] {
    const codes: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const code = crypto.randomBytes(4).toString('hex').toUpperCase();
      codes.push(code);
    }
    
    return codes;
  }

  static async sendSMS(phoneNumber: string, code: string): Promise<void> {
    // Implement SMS sending logic
    // Use services like Twilio, AWS SNS, etc.
    console.log(`SMS sent to ${phoneNumber}: Your ClassX verification code is ${code}`);
  }

  static async sendEmail(email: string, code: string): Promise<void> {
    // Implement email sending logic
    console.log(`Email sent to ${email}: Your ClassX verification code is ${code}`);
  }
}
```

### Role-Based Access Control

```typescript
// src/auth/rbac.ts
export enum Role {
  STUDENT = 'student',
  INSTRUCTOR = 'instructor',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

export enum Permission {
  // Course permissions
  CREATE_COURSE = 'create_course',
  EDIT_COURSE = 'edit_course',
  DELETE_COURSE = 'delete_course',
  VIEW_COURSE = 'view_course',
  
  // User permissions
  VIEW_USERS = 'view_users',
  EDIT_USERS = 'edit_users',
  DELETE_USERS = 'delete_users',
  
  // Admin permissions
  MANAGE_SYSTEM = 'manage_system',
  VIEW_ANALYTICS = 'view_analytics',
}

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.STUDENT]: [
    Permission.VIEW_COURSE,
  ],
  [Role.INSTRUCTOR]: [
    Permission.CREATE_COURSE,
    Permission.EDIT_COURSE,
    Permission.VIEW_COURSE,
  ],
  [Role.MODERATOR]: [
    Permission.VIEW_COURSE,
    Permission.EDIT_COURSE,
    Permission.VIEW_USERS,
    Permission.EDIT_USERS,
  ],
  [Role.ADMIN]: Object.values(Permission),
};

export class RBACService {
  static hasPermission(userRole: Role, permission: Permission): boolean {
    const rolePermissions = ROLE_PERMISSIONS[userRole];
    return rolePermissions.includes(permission);
  }

  static canAccessResource(userRole: Role, resource: string): boolean {
    // Implement resource-specific access control
    switch (resource) {
      case 'admin-panel':
        return this.hasPermission(userRole, Permission.MANAGE_SYSTEM);
      case 'course-management':
        return this.hasPermission(userRole, Permission.CREATE_COURSE);
      default:
        return false;
    }
  }
}
```

## Data Protection

### Encryption Service

```typescript
// src/security/encryption.ts
import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;

export class EncryptionService {
  private static getKey(password: string, salt: Buffer): Buffer {
    return crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha512');
  }

  static encrypt(text: string, password: string): string {
    const salt = crypto.randomBytes(SALT_LENGTH);
    const iv = crypto.randomBytes(IV_LENGTH);
    const key = this.getKey(password, salt);
    
    const cipher = crypto.createCipher(ALGORITHM, key);
    cipher.setAAD(salt);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const tag = cipher.getAuthTag();
    
    return salt.toString('hex') + ':' + iv.toString('hex') + ':' + tag.toString('hex') + ':' + encrypted;
  }

  static decrypt(encryptedData: string, password: string): string {
    const parts = encryptedData.split(':');
    const salt = Buffer.from(parts[0], 'hex');
    const iv = Buffer.from(parts[1], 'hex');
    const tag = Buffer.from(parts[2], 'hex');
    const encrypted = parts[3];
    
    const key = this.getKey(password, salt);
    
    const decipher = crypto.createDecipher(ALGORITHM, key);
    decipher.setAAD(salt);
    decipher.setAuthTag(tag);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }

  static hashData(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
  }
}
```

### Data Sanitization

```typescript
// src/security/sanitization.ts
import DOMPurify from 'isomorphic-dompurify';
import validator from 'validator';

export class SanitizationService {
  static sanitizeHTML(input: string): string {
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
      ALLOWED_ATTR: [],
    });
  }

  static sanitizeInput(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, ''); // Remove event handlers
  }

  static validateEmail(email: string): boolean {
    return validator.isEmail(email) && validator.isLength(email, { max: 254 });
  }

  static validateURL(url: string): boolean {
    return validator.isURL(url, {
      protocols: ['http', 'https'],
      require_protocol: true,
    });
  }

  static sanitizeFilename(filename: string): string {
    return filename
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/_{2,}/g, '_')
      .substring(0, 255);
  }

  static escapeSQL(input: string): string {
    return input
      .replace(/'/g, "''")
      .replace(/;/g, '')
      .replace(/--/g, '')
      .replace(/\/\*/g, '')
      .replace(/\*\//g, '');
  }
}
```

## Input Validation

### Validation Schemas

```typescript
// src/validation/schemas.ts
import Joi from 'joi';

export const userSchema = Joi.object({
  email: Joi.string()
    .email()
    .max(254)
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'string.max': 'Email address is too long',
      'any.required': 'Email is required',
    }),
  
  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password is too long',
      'string.pattern.base': 'Password must contain uppercase, lowercase, number, and special character',
      'any.required': 'Password is required',
    }),
  
  name: Joi.string()
    .min(2)
    .max(100)
    .pattern(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name is too long',
      'string.pattern.base': 'Name can only contain letters and spaces',
      'any.required': 'Name is required',
    }),
  
  role: Joi.string()
    .valid('student', 'instructor', 'admin')
    .default('student'),
});

export const courseSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(200)
    .required(),
  
  description: Joi.string()
    .min(10)
    .max(2000)
    .required(),
  
  category: Joi.string()
    .valid('programming', 'design', 'business', 'marketing')
    .required(),
  
  level: Joi.string()
    .valid('beginner', 'intermediate', 'advanced')
    .required(),
  
  price: Joi.number()
    .min(0)
    .max(10000)
    .precision(2)
    .required(),
  
  tags: Joi.array()
    .items(Joi.string().max(50))
    .max(10)
    .default([]),
});
```

### Validation Middleware

```typescript
// src/middleware/validation.ts
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input data',
          details: errors,
        },
      });
    }

    req.body = value;
    next();
  };
};

export const validateQuery = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid query parameters',
          details: errors,
        },
      });
    }

    req.query = value;
    next();
  };
};
```

## API Security

### Rate Limiting

```typescript
// src/middleware/rateLimiting.ts
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export const createRateLimit = (windowMs: number, max: number, message?: string) => {
  return rateLimit({
    store: new RedisStore({
      sendCommand: (...args: string[]) => redis.call(...args),
    }),
    windowMs,
    max,
    message: {
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: message || 'Too many requests, please try again later.',
        retryAfter: Math.ceil(windowMs / 1000),
      },
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// Different rate limits for different endpoints
export const authRateLimit = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  5, // 5 attempts
  'Too many login attempts, please try again later.'
);

export const apiRateLimit = createRateLimit(
  60 * 60 * 1000, // 1 hour
  1000, // 1000 requests
  'API rate limit exceeded, please try again later.'
);

export const uploadRateLimit = createRateLimit(
  60 * 1000, // 1 minute
  10, // 10 uploads
  'Too many file uploads, please try again later.'
);
```

### CORS Configuration

```typescript
// src/middleware/cors.ts
import cors from 'cors';

const corsOptions = {
  origin: (origin: string | undefined, callback: Function) => {
    const allowedOrigins = [
      'https://classx.com',
      'https://www.classx.com',
      'https://staging.classx.com',
    ];

    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'X-CSRF-Token',
  ],
  exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset'],
};

export const corsMiddleware = cors(corsOptions);
```

### Security Headers

```typescript
// src/middleware/security.ts
import helmet from 'helmet';

export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'https:'],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", 'https://api.classx.com'],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  noSniff: true,
  xssFilter: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
});
```

## Frontend Security

### XSS Prevention

```typescript
// src/utils/security.tsx
import DOMPurify from 'isomorphic-dompurify';
import { escape } from 'html-escaper';

export const sanitizeHTML = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: [],
  });
};

export const escapeHTML = (text: string): string => {
  return escape(text);
};

// Safe component for rendering user content
export const SafeHTML: React.FC<{ content: string }> = ({ content }) => {
  const sanitizedContent = sanitizeHTML(content);
  
  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      className="safe-content"
    />
  );
};
```

### CSRF Protection

```typescript
// src/utils/csrf.ts
import crypto from 'crypto';

export class CSRFService {
  private static tokens = new Map<string, string>();

  static generateToken(sessionId: string): string {
    const token = crypto.randomBytes(32).toString('hex');
    this.tokens.set(sessionId, token);
    
    // Set expiration (1 hour)
    setTimeout(() => {
      this.tokens.delete(sessionId);
    }, 60 * 60 * 1000);
    
    return token;
  }

  static validateToken(sessionId: string, token: string): boolean {
    const storedToken = this.tokens.get(sessionId);
    return storedToken === token;
  }

  static invalidateToken(sessionId: string): void {
    this.tokens.delete(sessionId);
  }
}

// React hook for CSRF tokens
export const useCSRFToken = () => {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('/api/csrf-token', {
          credentials: 'include',
        });
        const data = await response.json();
        setToken(data.token);
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
      }
    };

    fetchToken();
  }, []);

  return token;
};
```

### Secure Storage

```typescript
// src/utils/secureStorage.ts
export class SecureStorage {
  static setItem(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Failed to store data securely:', error);
    }
  }

  static getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Failed to retrieve data securely:', error);
      return null;
    }
  }

  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove data securely:', error);
    }
  }

  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Failed to clear storage securely:', error);
    }
  }
}

// Secure token storage
export class TokenStorage {
  private static readonly TOKEN_KEY = 'classx_auth_token';
  private static readonly REFRESH_TOKEN_KEY = 'classx_refresh_token';

  static setTokens(accessToken: string, refreshToken: string): void {
    SecureStorage.setItem(this.TOKEN_KEY, accessToken);
    SecureStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  static getAccessToken(): string | null {
    return SecureStorage.getItem<string>(this.TOKEN_KEY);
  }

  static getRefreshToken(): string | null {
    return SecureStorage.getItem<string>(this.REFRESH_TOKEN_KEY);
  }

  static clearTokens(): void {
    SecureStorage.removeItem(this.TOKEN_KEY);
    SecureStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }
}
```

## Infrastructure Security

### Environment Security

```bash
# .env.example (never commit actual .env files)
# Database
DATABASE_URL=mongodb://username:password@host:port/database
REDIS_URL=redis://username:password@host:port

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here

# External Services
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
OPENAI_API_KEY=sk-...
SENDGRID_API_KEY=SG....

# Security
BCRYPT_ROUNDS=12
SESSION_SECRET=your-session-secret-here
CSRF_SECRET=your-csrf-secret-here

# Monitoring
SENTRY_DSN=https://your-sentry-dsn
LOG_LEVEL=info
```

### Docker Security

```dockerfile
# Dockerfile.security
FROM node:18-alpine AS builder

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with security audit
RUN npm ci --only=production && npm audit --audit-level=moderate

# Copy source code
COPY --chown=nextjs:nodejs . .

# Build application
RUN npm run build

# Production stage
FROM nginx:alpine

# Remove default nginx user and create new one
RUN deluser nginx && adduser -D -s /bin/sh nginx

# Copy built application
COPY --from=builder --chown=nginx:nginx /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY --chown=nginx:nginx nginx.conf /etc/nginx/nginx.conf

# Set proper permissions
RUN chmod -R 755 /usr/share/nginx/html
RUN chmod 644 /etc/nginx/nginx.conf

# Switch to non-root user
USER nginx

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### Kubernetes Security

```yaml
# k8s-security.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: classx-app
  namespace: classx
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: classx-app-role
  namespace: classx
rules:
- apiGroups: [""]
  resources: ["secrets"]
  verbs: ["get", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: classx-app-rolebinding
  namespace: classx
subjects:
- kind: ServiceAccount
  name: classx-app
  namespace: classx
roleRef:
  kind: Role
  name: classx-app-role
  apiGroup: rbac.authorization.k8s.io
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: classx-app
  namespace: classx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: classx-app
  template:
    metadata:
      labels:
        app: classx-app
    spec:
      serviceAccountName: classx-app
      securityContext:
        runAsNonRoot: true
        runAsUser: 1001
        runAsGroup: 1001
        fsGroup: 1001
      containers:
      - name: classx-app
        image: classx/app:latest
        ports:
        - containerPort: 8080
        securityContext:
          allowPrivilegeEscalation: false
          readOnlyRootFilesystem: true
          capabilities:
            drop:
            - ALL
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
```

## Monitoring & Incident Response

### Security Monitoring

```typescript
// src/monitoring/security.ts
import winston from 'winston';

const securityLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'security.log' }),
    new winston.transports.Console(),
  ],
});

export class SecurityMonitor {
  static logFailedLogin(email: string, ip: string, userAgent: string): void {
    securityLogger.warn('Failed login attempt', {
      email,
      ip,
      userAgent,
      timestamp: new Date().toISOString(),
      event: 'failed_login',
    });
  }

  static logSuspiciousActivity(userId: string, activity: string, details: any): void {
    securityLogger.warn('Suspicious activity detected', {
      userId,
      activity,
      details,
      timestamp: new Date().toISOString(),
      event: 'suspicious_activity',
    });
  }

  static logDataAccess(userId: string, resource: string, action: string): void {
    securityLogger.info('Data access', {
      userId,
      resource,
      action,
      timestamp: new Date().toISOString(),
      event: 'data_access',
    });
  }

  static logSecurityEvent(event: string, details: any): void {
    securityLogger.error('Security event', {
      event,
      details,
      timestamp: new Date().toISOString(),
    });
  }
}
```

### Incident Response

```typescript
// src/security/incidentResponse.ts
export class IncidentResponseService {
  static async handleSecurityIncident(incident: SecurityIncident): Promise<void> {
    // Log the incident
    SecurityMonitor.logSecurityEvent('security_incident', incident);

    // Notify security team
    await this.notifySecurityTeam(incident);

    // Take immediate action based on incident type
    switch (incident.type) {
      case 'data_breach':
        await this.handleDataBreach(incident);
        break;
      case 'unauthorized_access':
        await this.handleUnauthorizedAccess(incident);
        break;
      case 'malicious_activity':
        await this.handleMaliciousActivity(incident);
        break;
      default:
        await this.handleGenericIncident(incident);
    }
  }

  private static async notifySecurityTeam(incident: SecurityIncident): Promise<void> {
    // Send email notification
    await this.sendEmailNotification(incident);
    
    // Send Slack notification
    await this.sendSlackNotification(incident);
    
    // Create incident ticket
    await this.createIncidentTicket(incident);
  }

  private static async handleDataBreach(incident: SecurityIncident): Promise<void> {
    // Immediate actions for data breach
    await this.blockAffectedUsers(incident.affectedUsers);
    await this.revokeAllSessions(incident.affectedUsers);
    await this.notifyAffectedUsers(incident.affectedUsers);
    
    // Regulatory compliance
    if (incident.severity === 'high') {
      await this.notifyRegulatoryBodies(incident);
    }
  }

  private static async handleUnauthorizedAccess(incident: SecurityIncident): Promise<void> {
    // Block the IP address
    await this.blockIPAddress(incident.sourceIP);
    
    // Revoke user sessions
    await this.revokeUserSessions(incident.userId);
    
    // Force password reset
    await this.forcePasswordReset(incident.userId);
  }
}
```

## Compliance & Privacy

### GDPR Compliance

```typescript
// src/compliance/gdpr.ts
export class GDPRService {
  static async processDataRequest(userId: string, requestType: 'export' | 'delete'): Promise<void> {
    switch (requestType) {
      case 'export':
        await this.exportUserData(userId);
        break;
      case 'delete':
        await this.deleteUserData(userId);
        break;
    }
  }

  static async exportUserData(userId: string): Promise<UserDataExport> {
    const userData = await this.collectUserData(userId);
    
    // Anonymize sensitive data
    const anonymizedData = this.anonymizeData(userData);
    
    // Generate export file
    const exportFile = await this.generateExportFile(anonymizedData);
    
    // Send to user
    await this.sendExportToUser(userId, exportFile);
    
    return {
      userId,
      exportDate: new Date(),
      dataTypes: ['profile', 'courses', 'progress', 'certificates'],
    };
  }

  static async deleteUserData(userId: string): Promise<void> {
    // Soft delete user account
    await this.softDeleteUser(userId);
    
    // Anonymize user data
    await this.anonymizeUserData(userId);
    
    // Delete from all systems
    await this.deleteFromAllSystems(userId);
    
    // Log deletion for audit
    await this.logDataDeletion(userId);
  }

  private static anonymizeData(data: any): any {
    // Remove or hash personally identifiable information
    return {
      ...data,
      email: this.hashEmail(data.email),
      name: this.anonymizeName(data.name),
      ipAddress: this.hashIP(data.ipAddress),
    };
  }
}
```

### Privacy Policy Implementation

```typescript
// src/compliance/privacy.ts
export class PrivacyService {
  static async recordConsent(userId: string, consent: ConsentRecord): Promise<void> {
    await this.storeConsentRecord(userId, consent);
    await this.updateUserPreferences(userId, consent.preferences);
  }

  static async checkConsent(userId: string, purpose: string): Promise<boolean> {
    const consent = await this.getConsentRecord(userId);
    return consent?.purposes.includes(purpose) || false;
  }

  static async updateConsent(userId: string, newConsent: ConsentRecord): Promise<void> {
    await this.updateConsentRecord(userId, newConsent);
    await this.notifyConsentChange(userId, newConsent);
  }

  static async auditDataProcessing(userId: string): Promise<DataProcessingAudit> {
    const processingActivities = await this.getProcessingActivities(userId);
    
    return {
      userId,
      auditDate: new Date(),
      processingActivities,
      legalBasis: this.determineLegalBasis(processingActivities),
      retentionPeriods: this.getRetentionPeriods(processingActivities),
    };
  }
}
```

## Security Testing

### Security Test Suite

```typescript
// src/test/security.test.ts
import { describe, it, expect } from 'vitest';
import { PasswordService } from '../auth/password';
import { JWTService } from '../auth/jwt';
import { SanitizationService } from '../security/sanitization';

describe('Security Tests', () => {
  describe('Password Security', () => {
    it('should reject weak passwords', async () => {
      const weakPasswords = [
        '123456',
        'password',
        'abc123',
        'Password',
        'PASSWORD123',
      ];

      for (const password of weakPasswords) {
        await expect(PasswordService.hashPassword(password)).rejects.toThrow();
      }
    });

    it('should accept strong passwords', async () => {
      const strongPassword = 'StrongP@ssw0rd123!';
      const hash = await PasswordService.hashPassword(strongPassword);
      expect(hash).toBeDefined();
      expect(hash).not.toBe(strongPassword);
    });

    it('should verify passwords correctly', async () => {
      const password = 'TestP@ssw0rd123!';
      const hash = await PasswordService.hashPassword(password);
      
      const isValid = await PasswordService.verifyPassword(password, hash);
      expect(isValid).toBe(true);
      
      const isInvalid = await PasswordService.verifyPassword('wrongpassword', hash);
      expect(isInvalid).toBe(false);
    });
  });

  describe('JWT Security', () => {
    it('should generate valid tokens', () => {
      const payload = {
        userId: 'user_123',
        email: 'test@example.com',
        role: 'student',
      };

      const token = JWTService.generateAccessToken(payload);
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });

    it('should verify tokens correctly', () => {
      const payload = {
        userId: 'user_123',
        email: 'test@example.com',
        role: 'student',
      };

      const token = JWTService.generateAccessToken(payload);
      const verified = JWTService.verifyToken(token);
      
      expect(verified.userId).toBe(payload.userId);
      expect(verified.email).toBe(payload.email);
      expect(verified.role).toBe(payload.role);
    });

    it('should reject invalid tokens', () => {
      const invalidToken = 'invalid.jwt.token';
      
      expect(() => JWTService.verifyToken(invalidToken)).toThrow();
    });
  });

  describe('Input Sanitization', () => {
    it('should sanitize HTML input', () => {
      const maliciousInput = '<script>alert("xss")</script><p>Safe content</p>';
      const sanitized = SanitizationService.sanitizeHTML(maliciousInput);
      
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).not.toContain('alert');
      expect(sanitized).toContain('<p>Safe content</p>');
    });

    it('should validate email addresses', () => {
      expect(SanitizationService.validateEmail('test@example.com')).toBe(true);
      expect(SanitizationService.validateEmail('invalid-email')).toBe(false);
      expect(SanitizationService.validateEmail('')).toBe(false);
    });

    it('should sanitize filenames', () => {
      const maliciousFilename = '../../../etc/passwd<script>';
      const sanitized = SanitizationService.sanitizeFilename(maliciousFilename);
      
      expect(sanitized).not.toContain('../');
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).toMatch(/^[a-zA-Z0-9._-]+$/);
    });
  });
});
```

---

**Security is everyone's responsibility.** For security concerns, contact us at security@classx.com or check our [Security Policy](../SECURITY.md).
