# Deployment Guide

## Required Dependencies

The following packages are required for the Updates section to work properly:

### Core Dependencies
- `react-syntax-highlighter` - For code syntax highlighting in posts
- `@types/react-syntax-highlighter` - TypeScript types for react-syntax-highlighter
- `framer-motion` - For smooth animations and transitions
- `lucide-react` - For icons used in the UI

### Installation
```bash
npm install react-syntax-highlighter @types/react-syntax-highlighter framer-motion lucide-react
```

## Deployment Checklist

### 1. Environment Setup
- Ensure all dependencies are installed
- Verify that `package.json` includes all required packages
- Check that `.gitignore` excludes unnecessary files

### 2. Build Process
```bash
npm run build
```

### 3. Static Assets
- All post JSON files should be included in the build
- Code block styling will be bundled automatically
- Images and other assets should be optimized

### 4. Deployment Platforms

#### Vercel
- Automatic deployment from Git
- No additional configuration needed
- Supports React and TypeScript out of the box

#### Netlify
- Drag and drop deployment
- Supports Vite builds automatically
- Configure redirects if needed

#### AWS S3 + CloudFront
- Upload `dist/` folder to S3 bucket
- Configure CloudFront for CDN
- Set up proper caching headers

### 5. Environment Variables
Create `.env.production` with:
```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

### 6. Post Content Management
- Posts are stored as JSON files in `src/components/Dashboard/Updates/posts/`
- Add new posts by creating JSON files with proper structure
- Update `index.ts` to import new posts

### 7. Performance Optimization
- Code splitting is handled by Vite
- Images are optimized automatically
- Syntax highlighting is bundled efficiently

## Troubleshooting

### Common Issues
1. **Syntax highlighting not working**: Ensure `react-syntax-highlighter` is installed
2. **Animations not smooth**: Check that `framer-motion` is properly imported
3. **Icons missing**: Verify `lucide-react` installation
4. **Build failures**: Check TypeScript types and imports

### Build Optimization
- Use `npm run build` for production builds
- Check bundle size with `npm run preview`
- Optimize images before adding to posts

## File Structure
```
src/components/Dashboard/Updates/
├── components/
│   └── code-block.tsx          # Syntax highlighting component
├── posts/                      # JSON post files
├── index.ts                    # Post imports and exports
├── main.tsx                    # Main updates page
└── post.tsx                    # Individual post component
```

## Notes
- All dependencies are listed in `package.json`
- `.gitignore` excludes unnecessary files
- Build process handles all optimizations
- No additional configuration needed for most platforms