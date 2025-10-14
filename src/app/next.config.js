/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  
  // Disable webpack bundle analyzer
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Disable source maps
      config.devtool = false;
      
      // Remove console logs in production
      config.optimization.minimizer.push(
        new (require('terser-webpack-plugin'))({
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
            },
          },
        })
      );
    }
    
    return config;
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; frame-ancestors 'none'; base-uri 'self'; form-action 'self';",
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },
  
  // Disable experimental features that might expose code
  experimental: {
    // Disable any experimental features
  },
  
  // Disable API routes that might expose information
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
  
  // Disable static optimization for security
  trailingSlash: false,
  
  // Disable image optimization
  images: {
    unoptimized: true,
  },
  
  // Disable SWC minification
  swcMinify: false,
  
  // Disable compression
  compress: false,
  
  // Disable powered by header
  poweredByHeader: false,
  
  // Disable ETag
  generateEtags: false,
  
  // Disable x-powered-by
  reactStrictMode: false,
  
  // Disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable TypeScript during builds
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
