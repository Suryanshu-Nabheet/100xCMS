# Installation Guide

This guide will help you set up ClassX on your local machine for development.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** (version 8.0 or higher) or **yarn**
- **Git**
- **VS Code** (recommended) or any code editor

### Check Your Versions

```bash
node --version
npm --version
git --version
```

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/suryanshunabheet/classx.git
cd classx
```

### 2. Install Dependencies

```bash
npm install
# or if you prefer yarn
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# API Configuration
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=ClassX

# Authentication
VITE_JWT_SECRET=your-jwt-secret-here

# Database (if using local database)
DATABASE_URL=mongodb://localhost:27017/classx

# AI Integration (optional)
VITE_OPENAI_API_KEY=your-openai-api-key
```

### 4. Start Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Development Commands

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Run type checking
npm run type-check

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch
```

## Project Structure

```
classx/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── Landing/       # Landing page components
│   │   │   ├── Components/ # Design components
│   │   │   ├── landing-page.tsx
│   │   │   └── main.tsx
│   │   └── Auth/          # Authentication components
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript type definitions
│   ├── styles/            # Global styles
│   ├── App.tsx            # Main App component
│   └── main.tsx           # Application entry point
├── docs/                  # Documentation
├── README.md
├── package.json
└── vite.config.ts
```

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
# or
lsof -ti:5173 | xargs kill -9
```

#### Node Version Issues
```bash
# Use Node Version Manager (nvm)
nvm install 18
nvm use 18
```

#### Dependency Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Errors
```bash
# Run type checking
npm run type-check

# Restart TypeScript server in VS Code
# Ctrl/Cmd + Shift + P -> "TypeScript: Restart TS Server"
```

### Getting Help

If you encounter issues:

1. Check the [FAQ](FAQ.md)
2. Search existing [GitHub Issues](https://github.com/suryanshunabheet/classx/issues)
3. Create a new issue with:
   - Your OS and Node.js version
   - Error messages
   - Steps to reproduce

## Next Steps

After successful installation:

1. Read the [Contributing Guidelines](../CONTRIBUTING.md)
2. Check out the [Code of Conduct](../CODE_OF_CONDUCT.md)
3. Explore the codebase
4. Start contributing! 🚀

## Additional Resources

- [Development Setup](DEVELOPMENT.md)
- [API Documentation](API.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Testing Guide](TESTING.md)

---

**Happy coding! 🎉**
