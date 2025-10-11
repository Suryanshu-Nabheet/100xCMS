# ClassX API Documentation

Complete API reference for ClassX platform integration and development.

## Table of Contents

1. [Authentication](#authentication)
2. [User Management](#user-management)
3. [Course Management](#course-management)
4. [Content Management](#content-management)
5. [Analytics](#analytics)
6. [File Upload](#file-upload)
7. [Webhooks](#webhooks)
8. [Rate Limiting](#rate-limiting)
9. [Error Handling](#error-handling)
10. [SDK Examples](#sdk-examples)

## Base URL

```
Production: https://api.classx.com/v1
Staging: https://staging-api.classx.com/v1
Development: http://localhost:3000/api/v1
```

## Authentication

### JWT Token Authentication

All API requests require a valid JWT token in the Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

### Login Endpoint

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "student",
      "avatar": "https://api.classx.com/avatars/user_123.jpg"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here",
    "expiresIn": 3600
  }
}
```

### Register Endpoint

```http
POST /auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "Jane Doe",
  "role": "student"
}
```

### Refresh Token

```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "refresh_token_here"
}
```

## User Management

### Get User Profile

```http
GET /users/profile
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "student",
    "avatar": "https://api.classx.com/avatars/user_123.jpg",
    "createdAt": "2024-01-15T10:30:00Z",
    "lastLogin": "2024-01-20T14:22:00Z",
    "preferences": {
      "theme": "dark",
      "notifications": true,
      "language": "en"
    },
    "stats": {
      "coursesCompleted": 5,
      "totalHours": 120,
      "certificatesEarned": 3
    }
  }
}
```

### Update User Profile

```http
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Smith",
  "preferences": {
    "theme": "light",
    "notifications": false
  }
}
```

### Get User Courses

```http
GET /users/courses
Authorization: Bearer <token>
Query Parameters:
- status: enrolled | completed | in-progress
- limit: 10 (default)
- offset: 0 (default)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "courses": [
      {
        "id": "course_123",
        "title": "React Fundamentals",
        "description": "Learn React from scratch",
        "status": "in-progress",
        "progress": 65,
        "enrolledAt": "2024-01-15T10:30:00Z",
        "lastAccessed": "2024-01-20T14:22:00Z",
        "instructor": {
          "id": "instructor_456",
          "name": "Sarah Johnson"
        }
      }
    ],
    "pagination": {
      "total": 25,
      "limit": 10,
      "offset": 0,
      "hasMore": true
    }
  }
}
```

## Course Management

### Get All Courses

```http
GET /courses
Query Parameters:
- category: programming | design | business
- level: beginner | intermediate | advanced
- search: "react"
- limit: 20 (default)
- offset: 0 (default)
- sort: popularity | newest | rating
```

**Response:**
```json
{
  "success": true,
  "data": {
    "courses": [
      {
        "id": "course_123",
        "title": "React Fundamentals",
        "description": "Learn React from scratch",
        "category": "programming",
        "level": "beginner",
        "duration": "40 hours",
        "price": 99.99,
        "rating": 4.8,
        "reviewCount": 1250,
        "instructor": {
          "id": "instructor_456",
          "name": "Sarah Johnson",
          "avatar": "https://api.classx.com/avatars/instructor_456.jpg"
        },
        "thumbnail": "https://api.classx.com/thumbnails/course_123.jpg",
        "tags": ["react", "javascript", "frontend"],
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "total": 150,
      "limit": 20,
      "offset": 0,
      "hasMore": true
    }
  }
}
```

### Get Course Details

```http
GET /courses/{courseId}
Authorization: Bearer <token> (optional)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "course_123",
    "title": "React Fundamentals",
    "description": "Learn React from scratch",
    "category": "programming",
    "level": "beginner",
    "duration": "40 hours",
    "price": 99.99,
    "rating": 4.8,
    "reviewCount": 1250,
    "instructor": {
      "id": "instructor_456",
      "name": "Sarah Johnson",
      "avatar": "https://api.classx.com/avatars/instructor_456.jpg",
      "bio": "Senior React Developer with 8 years experience",
      "rating": 4.9
    },
    "thumbnail": "https://api.classx.com/thumbnails/course_123.jpg",
    "tags": ["react", "javascript", "frontend"],
    "modules": [
      {
        "id": "module_1",
        "title": "Introduction to React",
        "description": "Getting started with React",
        "duration": "2 hours",
        "lessons": [
          {
            "id": "lesson_1",
            "title": "What is React?",
            "type": "video",
            "duration": "15 minutes",
            "isPreview": true
          }
        ]
      }
    ],
    "requirements": [
      "Basic JavaScript knowledge",
      "HTML/CSS fundamentals"
    ],
    "learningOutcomes": [
      "Build React applications",
      "Understand component lifecycle",
      "Use React hooks effectively"
    ],
    "isEnrolled": false,
    "progress": 0,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### Enroll in Course

```http
POST /courses/{courseId}/enroll
Authorization: Bearer <token>
Content-Type: application/json

{
  "paymentMethod": "stripe",
  "couponCode": "SAVE20" // optional
}
```

### Get Course Progress

```http
GET /courses/{courseId}/progress
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "courseId": "course_123",
    "userId": "user_123",
    "overallProgress": 65,
    "modules": [
      {
        "moduleId": "module_1",
        "title": "Introduction to React",
        "progress": 100,
        "completedAt": "2024-01-16T10:30:00Z"
      },
      {
        "moduleId": "module_2",
        "title": "Components and Props",
        "progress": 50,
        "completedAt": null
      }
    ],
    "lastAccessed": "2024-01-20T14:22:00Z",
    "totalTimeSpent": "2h 30m",
    "certificateEligible": false
  }
}
```

## Content Management

### Get Lesson Content

```http
GET /courses/{courseId}/modules/{moduleId}/lessons/{lessonId}
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "lesson_1",
    "title": "What is React?",
    "type": "video",
    "content": {
      "videoUrl": "https://api.classx.com/videos/lesson_1.mp4",
      "duration": "15 minutes",
      "transcript": "Welcome to React fundamentals...",
      "subtitles": [
        {
          "language": "en",
          "url": "https://api.classx.com/subtitles/lesson_1_en.vtt"
        }
      ]
    },
    "resources": [
      {
        "id": "resource_1",
        "title": "React Documentation",
        "type": "link",
        "url": "https://reactjs.org/docs"
      },
      {
        "id": "resource_2",
        "title": "Code Examples",
        "type": "file",
        "url": "https://api.classx.com/files/examples.zip"
      }
    ],
    "quiz": {
      "id": "quiz_1",
      "questions": [
        {
          "id": "q1",
          "question": "What is React?",
          "type": "multiple-choice",
          "options": [
            "A JavaScript library",
            "A CSS framework",
            "A database",
            "A server"
          ],
          "correctAnswer": 0
        }
      ]
    },
    "isCompleted": false,
    "completedAt": null
  }
}
```

### Mark Lesson as Complete

```http
POST /courses/{courseId}/modules/{moduleId}/lessons/{lessonId}/complete
Authorization: Bearer <token>
Content-Type: application/json

{
  "timeSpent": 900, // seconds
  "quizAnswers": {
    "q1": 0,
    "q2": 2
  }
}
```

### Get Course Reviews

```http
GET /courses/{courseId}/reviews
Query Parameters:
- limit: 10 (default)
- offset: 0 (default)
- rating: 1-5 (filter by rating)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": "review_1",
        "userId": "user_123",
        "userName": "John Doe",
        "userAvatar": "https://api.classx.com/avatars/user_123.jpg",
        "rating": 5,
        "comment": "Excellent course! Very well structured.",
        "createdAt": "2024-01-15T10:30:00Z",
        "helpful": 12
      }
    ],
    "pagination": {
      "total": 50,
      "limit": 10,
      "offset": 0,
      "hasMore": true
    },
    "summary": {
      "averageRating": 4.8,
      "totalReviews": 1250,
      "ratingDistribution": {
        "5": 800,
        "4": 300,
        "3": 100,
        "2": 30,
        "1": 20
      }
    }
  }
}
```

## Analytics

### Get User Analytics

```http
GET /analytics/user
Authorization: Bearer <token>
Query Parameters:
- period: 7d | 30d | 90d | 1y
- startDate: 2024-01-01
- endDate: 2024-01-31
```

**Response:**
```json
{
  "success": true,
  "data": {
    "learningTime": {
      "total": "45h 30m",
      "daily": [
        {
          "date": "2024-01-20",
          "time": "2h 15m"
        }
      ]
    },
    "courses": {
      "enrolled": 8,
      "completed": 3,
      "inProgress": 5
    },
    "achievements": [
      {
        "id": "achievement_1",
        "title": "First Course Completed",
        "description": "Completed your first course",
        "earnedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "streak": {
      "current": 7,
      "longest": 15
    }
  }
}
```

### Get Course Analytics (Instructor)

```http
GET /analytics/courses/{courseId}
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "courseId": "course_123",
    "enrollments": {
      "total": 1250,
      "monthly": [
        {
          "month": "2024-01",
          "count": 150
        }
      ]
    },
    "completion": {
      "rate": 78.5,
      "averageTime": "35h 20m"
    },
    "ratings": {
      "average": 4.8,
      "distribution": {
        "5": 800,
        "4": 300,
        "3": 100,
        "2": 30,
        "1": 20
      }
    },
    "revenue": {
      "total": 125000,
      "monthly": [
        {
          "month": "2024-01",
          "amount": 15000
        }
      ]
    }
  }
}
```

## File Upload

### Upload Avatar

```http
POST /upload/avatar
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
- file: <image file>
- crop: {"x": 0, "y": 0, "width": 200, "height": 200}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://api.classx.com/avatars/user_123.jpg",
    "filename": "avatar_123.jpg",
    "size": 45678,
    "mimeType": "image/jpeg"
  }
}
```

### Upload Course Thumbnail

```http
POST /upload/thumbnail
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
- file: <image file>
- courseId: course_123
```

## Webhooks

### Webhook Events

ClassX sends webhooks for the following events:

- `user.registered`
- `user.login`
- `course.enrolled`
- `course.completed`
- `payment.succeeded`
- `payment.failed`

### Webhook Payload Example

```json
{
  "id": "evt_123",
  "type": "course.completed",
  "created": "2024-01-20T14:22:00Z",
  "data": {
    "courseId": "course_123",
    "userId": "user_123",
    "completedAt": "2024-01-20T14:22:00Z",
    "certificateUrl": "https://api.classx.com/certificates/cert_123.pdf"
  }
}
```

### Webhook Endpoint Setup

```http
POST /webhooks
Content-Type: application/json

{
  "url": "https://your-app.com/webhooks/classx",
  "events": ["course.completed", "payment.succeeded"],
  "secret": "your-webhook-secret"
}
```

## Rate Limiting

### Rate Limits

- **Authentication**: 5 requests per minute
- **General API**: 1000 requests per hour
- **File Upload**: 10 requests per minute
- **Webhooks**: 100 requests per hour

### Rate Limit Headers

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

### Rate Limit Exceeded Response

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Try again later.",
    "retryAfter": 3600
  }
}
```

## Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ],
    "requestId": "req_123"
  }
}
```

### Common Error Codes

- `VALIDATION_ERROR`: Invalid input data
- `AUTHENTICATION_REQUIRED`: Missing or invalid token
- `PERMISSION_DENIED`: Insufficient permissions
- `RESOURCE_NOT_FOUND`: Requested resource doesn't exist
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_SERVER_ERROR`: Server error

## SDK Examples

### JavaScript/TypeScript SDK

```typescript
import { ClassXClient } from '@classx/sdk';

const client = new ClassXClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.classx.com/v1'
});

// Get courses
const courses = await client.courses.list({
  category: 'programming',
  limit: 10
});

// Enroll in course
const enrollment = await client.courses.enroll('course_123', {
  paymentMethod: 'stripe'
});

// Get user progress
const progress = await client.courses.getProgress('course_123');
```

### Python SDK

```python
from classx import ClassXClient

client = ClassXClient(
    api_key='your-api-key',
    base_url='https://api.classx.com/v1'
)

# Get courses
courses = client.courses.list(
    category='programming',
    limit=10
)

# Enroll in course
enrollment = client.courses.enroll('course_123', {
    'payment_method': 'stripe'
})
```

### React Hook Example

```typescript
import { useClassX } from '@classx/react-sdk';

const CourseComponent = () => {
  const { courses, loading, error } = useClassX('courses', {
    category: 'programming'
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {courses.map(course => (
        <div key={course.id}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
        </div>
      ))}
    </div>
  );
};
```

## Testing

### Postman Collection

Download our Postman collection for easy API testing:

[ClassX API Collection](https://api.classx.com/postman/collection.json)

### API Testing Tools

- **Postman**: GUI-based API testing
- **Insomnia**: Alternative to Postman
- **curl**: Command-line testing
- **HTTPie**: User-friendly command-line client

### Example curl Commands

```bash
# Login
curl -X POST https://api.classx.com/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Get courses
curl -X GET https://api.classx.com/v1/courses \
  -H "Authorization: Bearer YOUR_TOKEN"

# Enroll in course
curl -X POST https://api.classx.com/v1/courses/course_123/enroll \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"paymentMethod":"stripe"}'
```

---

**Need help?** Check out our [Support Guide](SUPPORT.md) or contact us at api-support@classx.com.
