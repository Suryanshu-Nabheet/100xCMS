# ClassX Deployment Guide

Complete guide for deploying ClassX to various platforms and environments.

## Table of Contents

1. [Deployment Overview](#deployment-overview)
2. [Environment Setup](#environment-setup)
3. [Vercel Deployment](#vercel-deployment)
4. [Docker Deployment](#docker-deployment)
5. [AWS Deployment](#aws-deployment)
6. [Database Setup](#database-setup)
7. [CDN Configuration](#cdn-configuration)
8. [Monitoring & Logging](#monitoring--logging)
9. [SSL & Security](#ssl--security)
10. [Troubleshooting](#troubleshooting)

## Deployment Overview

ClassX supports multiple deployment strategies:

- **Static Hosting**: Vercel, Netlify, AWS S3
- **Container Deployment**: Docker, Kubernetes
- **Cloud Platforms**: AWS, Google Cloud, Azure
- **Traditional Hosting**: VPS, Dedicated Servers

### Prerequisites

- Node.js 18+ installed
- Git repository access
- Domain name (optional)
- SSL certificate (for production)

## Environment Setup

### Environment Variables

Create environment-specific configuration files:

#### `.env.production`

```env
# Application
NODE_ENV=production
VITE_APP_NAME=ClassX
VITE_APP_VERSION=1.0.0
VITE_APP_URL=https://classx.com

# API Configuration
VITE_API_BASE_URL=https://api.classx.com/v1
VITE_API_TIMEOUT=10000

# Authentication
VITE_JWT_SECRET=your-production-jwt-secret
VITE_AUTH_TOKEN_KEY=classx_auth_token

# Database
DATABASE_URL=mongodb://username:password@host:port/database
REDIS_URL=redis://username:password@host:port

# External Services
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
VITE_OPENAI_API_KEY=sk-...
VITE_GOOGLE_ANALYTICS_ID=GA-...

# File Storage
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_S3_BUCKET=classx-production
AWS_REGION=us-east-1

# Email Service
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-key

# Monitoring
SENTRY_DSN=https://your-sentry-dsn
LOG_LEVEL=info
```

#### `.env.staging`

```env
# Application
NODE_ENV=staging
VITE_APP_NAME=ClassX Staging
VITE_APP_VERSION=1.0.0-staging
VITE_APP_URL=https://staging.classx.com

# API Configuration
VITE_API_BASE_URL=https://staging-api.classx.com/v1
VITE_API_TIMEOUT=10000

# Authentication
VITE_JWT_SECRET=your-staging-jwt-secret
VITE_AUTH_TOKEN_KEY=classx_auth_token_staging

# Database
DATABASE_URL=mongodb://username:password@staging-host:port/database
REDIS_URL=redis://username:password@staging-host:port

# External Services (Staging keys)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
VITE_OPENAI_API_KEY=sk-...
VITE_GOOGLE_ANALYTICS_ID=GA-STAGING-...

# File Storage
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_S3_BUCKET=classx-staging
AWS_REGION=us-east-1

# Email Service
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-key

# Monitoring
SENTRY_DSN=https://your-sentry-dsn-staging
LOG_LEVEL=debug
```

## Vercel Deployment

### Automatic Deployment

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy from project directory
   vercel
   ```

2. **Configure Project**
   ```bash
   # Set environment variables
   vercel env add VITE_API_BASE_URL
   vercel env add VITE_JWT_SECRET
   vercel env add DATABASE_URL
   ```

3. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Manual Configuration

Create `vercel.json`:

```json
{
  "version": 2,
  "name": "classx",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "functions": {
    "api/**/*.js": {
      "runtime": "nodejs18.x"
    }
  }
}
```

### Environment Variables in Vercel

```bash
# Set production environment variables
vercel env add VITE_API_BASE_URL production
vercel env add VITE_JWT_SECRET production
vercel env add DATABASE_URL production

# Set preview environment variables
vercel env add VITE_API_BASE_URL preview
vercel env add VITE_JWT_SECRET preview
vercel env add DATABASE_URL preview
```

## Docker Deployment

### Dockerfile

```dockerfile
# Multi-stage build
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built application
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
      - VITE_API_BASE_URL=http://api:3000/v1
    depends_on:
      - api
      - database
      - redis

  api:
    build: ./api
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=mongodb://database:27017/classx
      - REDIS_URL=redis://redis:6379
    depends_on:
      - database
      - redis

  database:
    image: mongo:6.0
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  mongodb_data:
  redis_data:
```

### Nginx Configuration

```nginx
# nginx.conf
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Handle client-side routing
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # API proxy
        location /api/ {
            proxy_pass http://api:3000/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

## AWS Deployment

### AWS S3 + CloudFront

1. **Build and Upload**
   ```bash
   # Build application
   npm run build
   
   # Install AWS CLI
   pip install awscli
   
   # Configure AWS credentials
   aws configure
   
   # Upload to S3
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

2. **CloudFront Configuration**
   ```json
   {
     "Origins": [
       {
         "DomainName": "your-bucket-name.s3.amazonaws.com",
         "Id": "S3-origin",
         "S3OriginConfig": {
           "OriginAccessIdentity": "origin-access-identity/cloudfront/..."
         }
       }
     ],
     "DefaultCacheBehavior": {
       "TargetOriginId": "S3-origin",
       "ViewerProtocolPolicy": "redirect-to-https",
       "CachePolicyId": "4135ea2d-6df8-44a3-9df3-4b5a84be39ad"
     },
     "CustomErrorResponses": [
       {
         "ErrorCode": 404,
         "ResponsePagePath": "/index.html",
         "ResponseCode": "200"
       }
     ]
   }
   ```

### AWS Elastic Beanstalk

1. **Create Application**
   ```bash
   # Install EB CLI
   pip install awsebcli
   
   # Initialize EB application
   eb init
   
   # Create environment
   eb create production
   ```

2. **Configuration Files**

   `.ebextensions/01-packages.config`:
   ```yaml
   packages:
     yum:
       nginx: []
   ```

   `.ebextensions/02-nginx.config`:
   ```yaml
   files:
     "/etc/nginx/conf.d/proxy.conf":
       mode: "000644"
       owner: root
       group: root
       content: |
         upstream nodejs {
             server 127.0.0.1:8081;
         }
         server {
             listen 80;
             location / {
                 proxy_pass http://nodejs;
                 proxy_set_header Host $host;
                 proxy_set_header X-Real-IP $remote_addr;
                 proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                 proxy_set_header X-Forwarded-Proto $scheme;
             }
         }
   ```

## Database Setup

### MongoDB Atlas

1. **Create Cluster**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create new cluster
   - Configure network access
   - Create database user

2. **Connection String**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/classx?retryWrites=true&w=majority
   ```

3. **Environment Variables**
   ```env
   DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/classx
   ```

### Redis Setup

1. **Redis Cloud**
   - Sign up at [Redis Cloud](https://redis.com/redis-enterprise-cloud/)
   - Create database
   - Get connection details

2. **Environment Variables**
   ```env
   REDIS_URL=redis://username:password@host:port
   ```

## CDN Configuration

### CloudFlare Setup

1. **Add Domain**
   - Add domain to CloudFlare
   - Update nameservers
   - Configure DNS records

2. **Page Rules**
   ```
   *.classx.com/* -> Cache Level: Cache Everything
   classx.com/api/* -> Cache Level: Bypass
   ```

3. **Security Settings**
   - Enable SSL/TLS encryption
   - Configure security level
   - Enable bot protection

### AWS CloudFront

1. **Create Distribution**
   - Origin: S3 bucket or ALB
   - Default root object: index.html
   - Error pages: 404 -> /index.html

2. **Cache Behaviors**
   ```
   Path Pattern: /api/*
   Cache Policy: CachingDisabled
   
   Path Pattern: /*
   Cache Policy: Managed-CachingOptimized
   ```

## Monitoring & Logging

### Sentry Integration

1. **Install Sentry**
   ```bash
   npm install @sentry/react @sentry/tracing
   ```

2. **Configure Sentry**
   ```typescript
   // main.tsx
   import * as Sentry from "@sentry/react";
   import { BrowserTracing } from "@sentry/tracing";

   Sentry.init({
     dsn: process.env.VITE_SENTRY_DSN,
     integrations: [new BrowserTracing()],
     tracesSampleRate: 1.0,
     environment: process.env.NODE_ENV,
   });
   ```

### Logging Configuration

```typescript
// utils/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

export default logger;
```

### Health Checks

```typescript
// api/health.ts
export const healthCheck = async (req: Request, res: Response) => {
  try {
    // Check database connection
    await mongoose.connection.db.admin().ping();
    
    // Check Redis connection
    await redis.ping();
    
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.VITE_APP_VERSION,
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message,
    });
  }
};
```

## SSL & Security

### SSL Certificate Setup

1. **Let's Encrypt (Certbot)**
   ```bash
   # Install Certbot
   sudo apt install certbot python3-certbot-nginx
   
   # Get certificate
   sudo certbot --nginx -d classx.com -d www.classx.com
   
   # Auto-renewal
   sudo crontab -e
   # Add: 0 12 * * * /usr/bin/certbot renew --quiet
   ```

2. **AWS Certificate Manager**
   - Request certificate in AWS ACM
   - Validate domain ownership
   - Attach to CloudFront distribution

### Security Headers

```nginx
# Security headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https:;" always;
```

### Environment Security

```bash
# Generate secure secrets
openssl rand -base64 32  # For JWT secret
openssl rand -hex 16     # For session secret

# Use environment-specific secrets
# Never commit secrets to version control
# Use secret management services (AWS Secrets Manager, Azure Key Vault)
```

## Troubleshooting

### Common Issues

#### Build Failures

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Check Node.js version
node --version  # Should be 18+

# Check environment variables
echo $NODE_ENV
```

#### Database Connection Issues

```bash
# Test MongoDB connection
mongosh "mongodb://username:password@host:port/database"

# Test Redis connection
redis-cli -h host -p port -a password ping
```

#### Performance Issues

```bash
# Analyze bundle size
npm run build -- --analyze

# Check for memory leaks
node --inspect dist/server.js

# Monitor resource usage
htop
iostat -x 1
```

### Debugging Commands

```bash
# Check application logs
docker logs -f container_name

# Check nginx logs
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log

# Check system resources
free -h
df -h
```

### Rollback Procedures

```bash
# Vercel rollback
vercel rollback

# Docker rollback
docker-compose down
docker-compose up -d --scale app=0
docker-compose up -d --scale app=1

# AWS rollback
eb deploy previous-version
```

## Deployment Checklist

### Pre-Deployment

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations completed
- [ ] SSL certificates valid
- [ ] CDN configuration updated
- [ ] Monitoring alerts configured

### Post-Deployment

- [ ] Health checks passing
- [ ] Application accessible
- [ ] Database connections working
- [ ] File uploads working
- [ ] Email notifications working
- [ ] Analytics tracking active
- [ ] Error monitoring active

### Performance Verification

- [ ] Page load times < 3 seconds
- [ ] API response times < 500ms
- [ ] Database query performance optimal
- [ ] CDN cache hit ratio > 90%
- [ ] Error rate < 1%

---

**Need help with deployment?** Check out our [Support Guide](SUPPORT.md) or contact us at devops@classx.com.
