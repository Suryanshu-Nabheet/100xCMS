# ClassX CMS - Production Ready Setup

A modern, production-ready Content Management System built with React, TypeScript, and Clerk authentication.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Clerk account (for authentication)

### Installation

1. **Clone and install dependencies:**
```bash
git clone https://github.com/Suryanshu-Nabheet/ClassX.git
cd cms
npm install
```

2. **Set up environment variables:**
```bash
# Copy the example file
cp env.example .env

# Edit .env with your Clerk keys
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here
```

3. **Start development server:**
```bash
npm run dev
```

## 🔧 Production Deployment

### Environment Setup

1. **Create production environment file:**
```bash
cp .env.production .env
```

2. **Update with production Clerk keys:**
```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_live_your_production_key
CLERK_SECRET_KEY=sk_live_your_production_secret
VITE_APP_URL=https://your-domain.com
```

### Build for Production

```bash
# Type check
npm run type-check

# Build for production
npm run build:production

# Preview production build
npm run preview
```

### Deployment Options

#### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `VITE_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `VITE_APP_URL`
3. Deploy automatically on push to main branch

#### Netlify
1. Connect repository to Netlify
2. Set build command: `npm run build:production`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build:production
EXPOSE 3000
CMD ["npm", "run", "start"]
```

## 🔐 Authentication Setup

### Clerk Configuration

1. **Create Clerk Application:**
   - Go to [Clerk Dashboard](https://dashboard.clerk.com)
   - Create new application
   - Choose "React" as framework

2. **Configure OAuth Providers:**
   - Enable Google, Apple, Microsoft (optional)
   - Set redirect URLs for production

3. **Environment Variables:**
   ```bash
   # Development
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   
   # Production
   VITE_CLERK_PUBLISHABLE_KEY=pk_live_...
   CLERK_SECRET_KEY=sk_live_...
   ```

### Security Best Practices

- ✅ Never commit `.env` files
- ✅ Use different keys for development/production
- ✅ Enable HTTPS in production
- ✅ Set up proper CORS policies
- ✅ Use environment-specific Clerk instances

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Project Structure

```
src/
├── components/
│   ├── Auth/           # Authentication components
│   ├── Dashboard/      # Main dashboard components
│   ├── Admin/          # Admin panel components
│   └── Landing/        # Landing page components
├── lib/                # Utility functions
└── App.tsx             # Main application component
```

## 🔍 Troubleshooting

### Common Issues

1. **"Missing Clerk Configuration" error:**
   - Check if `.env` file exists
   - Verify `VITE_CLERK_PUBLISHABLE_KEY` is set
   - Restart development server

2. **Authentication not working:**
   - Verify Clerk keys are correct
   - Check Clerk dashboard for application status
   - Ensure redirect URLs are configured

3. **Build errors:**
   - Run `npm run type-check` to identify TypeScript errors
   - Check for missing dependencies
   - Verify environment variables are properly set

### Debug Mode

Enable debug logging by adding to your `.env`:
```bash
VITE_DEBUG=true
```

## 📊 Performance Optimization

### Production Optimizations

- ✅ Code splitting with dynamic imports
- ✅ Tree shaking for smaller bundles
- ✅ Image optimization
- ✅ CSS purging
- ✅ Gzip compression
- ✅ CDN integration

### Monitoring

Consider adding:
- Error tracking (Sentry)
- Analytics (Google Analytics)
- Performance monitoring
- Uptime monitoring

## 🔒 Security Checklist

- [ ] Environment variables secured
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Content Security Policy set
- [ ] Rate limiting implemented
- [ ] Input validation in place
- [ ] SQL injection prevention
- [ ] XSS protection enabled

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check documentation
- Contact development team

---

**Made with ❤️ for ClassX**
