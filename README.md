<div align="center">

# 100xDevs Platform

**A Next-Generation Educational Technology Platform**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

*Empowering learners worldwide through cutting-edge educational technology*

</div>

---
## 🎯 Overview

100xDevs is a comprehensive educational technology platform designed to revolutionize how students learn programming and technical skills. Built with modern web technologies and a focus on user experience, 100xDevs provides an immersive learning environment that combines interactive content, AI-powered assistance, and community-driven learning.

### 🚀 Key Features

- **🎨 Modern Landing Experience**: Responsive, animated landing page with glass-morphism design
- **🔐 Clerk Authentication**: Secure user authentication and management with Clerk
- **📚 Course Management**: Comprehensive course browsing with individual course pages
- **🎥 Advanced Video Player**: YouTube-like video player with timeline navigation and keyboard shortcuts
- **👨‍💼 Admin Dashboard**: Real-time course management and student analytics
- **📱 Mobile-First Design**: Fully responsive across all device sizes
- **⚡ Performance Optimized**: Lazy loading, code splitting, and optimized assets
- **🎯 Real-Time Sync**: Automatic course updates between main platform and admin dashboard

---

## 🏗️ Architecture & File Structure

```
100xCMS/
├── 📁 src/                          # Source code directory
│   ├── 📁 components/              # React components
│   │   ├── 📁 Auth/                # Authentication components
│   │   │   ├── SignIn.tsx          # Sign-in modal component
│   │   │   ├── SignUp.tsx          # Sign-up modal component
│   │   │   └── index.ts            # Auth module exports
│   │   │
│   │   ├── 📁 Admin/               # Admin dashboard components
│   │   │   ├── AdminGuard.tsx      # Admin access protection
│   │   │   ├── AdminPanel.tsx      # Main admin interface
│   │   │   ├── auth.tsx            # Admin authentication
│   │   │   ├── dashboard.tsx       # Admin dashboard
│   │   │   ├── index.ts            # Admin module exports
│   │   │   └── USAGE.md            # Admin usage guide
│   │   │
│   │   ├── 📁 Dashboard/           # Main application dashboard
│   │   │   ├── 📁 Courses/         # Course management
│   │   │   │   ├── 📁 CompleteWebDevDevOpsBlockchain/
│   │   │   │   │   ├── CompleteWebDevDevOpsBlockchainUI.tsx
│   │   │   │   │   ├── data.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── 📁 CompleteWebDevDevOps/
│   │   │   │   │   ├── CompleteWebDevDevOpsUI.tsx
│   │   │   │   │   ├── data.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── 📁 CompleteWeb3Blockchain/
│   │   │   │   │   ├── CompleteWeb3BlockchainUI.tsx
│   │   │   │   │   ├── data.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── 📁 CompleteWebDev/
│   │   │   │   │   ├── CompleteWebDevUI.tsx
│   │   │   │   │   ├── data.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── 📁 CompleteDevOps/
│   │   │   │   │   ├── CompleteDevOpsUI.tsx
│   │   │   │   │   ├── data.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── 📁 Live0to100Complete/
│   │   │   │   │   ├── Live0to100CompleteUI.tsx
│   │   │   │   │   ├── data.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── 📁 Live0to1/
│   │   │   │   │   ├── Live0to1UI.tsx
│   │   │   │   │   ├── data.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── 📁 Live1to100/
│   │   │   │   │   ├── Live1to100UI.tsx
│   │   │   │   │   ├── data.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── 📁 FullStackOpenSourceCohort1/
│   │   │   │   │   ├── FullStackOpenSourceCohort1UI.tsx
│   │   │   │   │   ├── data.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── CourseCard.tsx    # Course card component
│   │   │   │   ├── CourseDetail.tsx # Course detail page
│   │   │   │   ├── Courses.tsx       # Courses listing page
│   │   │   │   └── coursesData.ts   # Course data aggregation
│   │   │   │
│   │   │   ├── 📁 Content/          # Content components
│   │   │   │   ├── 📁 Video/        # Video player
│   │   │   │   │   └── VideoPlayer.tsx
│   │   │   │   ├── 📁 Pdf/          # PDF viewer
│   │   │   │   │   └── PdfViewer.tsx
│   │   │   │   └── 📁 [Course Folders]/ # Course-specific content
│   │   │   │
│   │   │   ├── 📁 Home/            # Dashboard home
│   │   │   │   └── HomePage.tsx
│   │   │   │
│   │   │   ├── 📁 Layout/          # Layout components
│   │   │   │   ├── 📁 Account/     # Account management
│   │   │   │   │   ├── ClerkAccountHandler.tsx
│   │   │   │   │   ├── ClerkAccountManagement.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── LayoutShell.tsx # Main layout shell
│   │   │   │
│   │   │   └── 📁 Profile/         # User profile
│   │   │       └── ProfileView.tsx
│   │   │
│   │   └── 📁 Landing/            # Landing page components
│   │       ├── 📁 Components/     # Reusable UI components
│   │       │   ├── footer-cta.tsx # Call-to-action footer
│   │       │   ├── footer.tsx     # Main footer component
│   │       │   └── index.ts       # Component exports
│   │       ├── 📁 Links/          # Legal and info pages
│   │       │   ├── PrivacyPolicy.tsx
│   │       │   ├── RefundPolicy.tsx
│   │       │   ├── TermsConditions.tsx
│   │       │   └── ...
│   │       ├── landing-page.tsx   # Main landing page
│   │       ├── main.tsx           # Landing page entry point
│   │       └── index.ts           # Landing module exports
│   │
│   ├── 📁 lib/                    # Utility libraries
│   │   └── utils.ts               # Common utility functions
│   │
│   ├── App.tsx                    # Main application component
│   ├── main.tsx                   # Application entry point
│   ├── index.css                  # Global styles
│   └── vite-env.d.ts             # Vite environment types
│
├── 📁 docs/                       # Documentation
│   ├── ADMIN_SYSTEM.md            # Admin system documentation
│   ├── API.md                     # API documentation
│   ├── CSS_ORGANIZATION.md        # CSS organization guide
│   ├── DEPLOYMENT.md              # Deployment guide
│   ├── DEVELOPMENT.md              # Development guide
│   ├── HARDCODED_COURSES.md       # Course management guide
│   ├── INSTALL.md                 # Installation guide
│   ├── SECURITY.md                # Security documentation
│   └── TESTING.md                 # Testing guide
│
├── 📁 Public/                    # Static assets
│   ├── Mockup.png                 # Project mockup
│   └── [Course thumbnails and assets]
│
├── 📄 Configuration Files
├── components.json                # UI component configuration
├── eslint.config.js              # ESLint configuration
├── package.json                   # Project dependencies
├── package-lock.json             # Dependency lock file
├── postcss.config.js             # PostCSS configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── tsconfig.app.json             # App-specific TypeScript config
├── tsconfig.node.json             # Node-specific TypeScript config
├── vercel.json                   # Vercel deployment configuration
├── vite.config.ts                # Vite build configuration
│
├── 📄 Documentation
├── README.md                     # This file
├── CONTRIBUTING.md               # Contribution guidelines
├── CODE_OF_CONDUCT.md            # Code of conduct
├── LICENSE.md                    # MIT License
├── SECURITY.md                   # Security policy
├── SUPPORT.md                    # Support information
├── FAQ.md                        # Frequently asked questions
├── CHANGELOG.md                  # Version history
├── ROADMAP.md                    # Future development plans
├── AUTHORS.md                    # Project authors
├── ACKNOWLEDGEMENTS.md           # Acknowledgments
└── .gitignore                    # Git ignore rules
```

---

## 🛠️ Technology Stack

### Frontend Technologies
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **Clerk** - Authentication and user management
- **Vite** - Next-generation frontend tooling
- **Lucide React** - Beautiful icon library

### Development Tools
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS post-processing
- **Git** - Version control
- **npm** - Package management

### Deployment & Infrastructure
- **Vercel** - Cloud platform for frontend deployment
- **GitHub** - Code repository and collaboration platform

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** (v2.30.0 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Suryanshu-Nabheet/100xCMS.git
   cd 100xCMS
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

---

## 📚 Documentation

- **[Installation Guide](docs/INSTALL.md)** - Detailed setup instructions
- **[Admin System](docs/ADMIN_SYSTEM.md)** - Admin dashboard documentation
- **[Course Management](docs/HARDCODED_COURSES.md)** - Course management guide
- **[Development Guide](docs/DEVELOPMENT.md)** - Development workflow
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Deployment instructions
- **[Security Guide](docs/SECURITY.md)** - Security best practices
- **[API Documentation](docs/API.md)** - API reference
- **[CSS Organization](docs/CSS_ORGANIZATION.md)** - Styling guidelines
- **[Testing Guide](docs/TESTING.md)** - Testing procedures
- **[Contributing Guidelines](CONTRIBUTING.md)** - How to contribute to the project
- **[Code of Conduct](CODE_OF_CONDUCT.md)** - Community guidelines
- **[Security Policy](SECURITY.md)** - Security reporting and policies
- **[Support Guide](SUPPORT.md)** - Getting help and support
- **[FAQ](FAQ.md)** - Frequently asked questions
- **[Changelog](CHANGELOG.md)** - Version history and updates
- **[Roadmap](ROADMAP.md)** - Future development plans

---

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (`from-blue-400 to-blue-700`)
- **Secondary**: Dark theme with glass-morphism effects
- **Accent**: White with blue highlights
- **Background**: Black with transparency layers

### Typography
- **Headings**: Bold, large-scale typography with drop shadows
- **Body**: Clean, readable fonts with proper contrast
- **Interactive**: Hover effects and smooth transitions

### Components
- **Modals**: Dark-themed with gradient backgrounds
- **Buttons**: Rounded corners with hover animations
- **Cards**: Glass-morphism with subtle shadows
- **Navigation**: Transparent with backdrop blur

---

## 🔧 Development

### Code Style
- **ESLint**: Enforced code quality and consistency
- **TypeScript**: Strict type checking enabled
- **Prettier**: Automatic code formatting (if configured)

### Component Architecture
- **Functional Components**: Modern React with hooks
- **TypeScript Interfaces**: Strongly typed props and state
- **CSS Modules**: Scoped styling with Tailwind CSS
- **Responsive Design**: Mobile-first approach

### Performance Optimizations
- **Lazy Loading**: Images and components loaded on demand
- **Code Splitting**: Automatic bundle optimization
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Compressed images and fonts

---

## 🚀 Deployment

### Vercel Deployment

The project is configured for automatic deployment on Vercel:

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Automatic Builds**: Every push to main triggers a deployment
3. **Preview Deployments**: Pull requests get preview URLs
4. **Custom Domain**: Configure your domain in Vercel dashboard

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to Vercel
npx vercel --prod
```

---

## 🤝 Contributing

We welcome contributions from the community! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

Please read our [Contributing Guidelines](CONTRIBUTING.md) for detailed information.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

---

## 👥 Team

### Core Contributors
- **Suryanshu Nabheet** - *Lead Developer & Founder*
  - GitHub: [@Suryanshu-Nabheet](https://github.com/Suryanshu-Nabheet)
  - LinkedIn: [Suryanshu Nabheet](https://www.linkedin.com/in/suryanshu-nabheet/)
  - Email: suryanshunab@gmail.com

---

## 🙏 Acknowledgments

- **Open Source Community** - For inspiration and tools
- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS approach
- **Framer Motion** - For smooth animations
- **Vercel** - For seamless deployment platform

---

## 📞 Support & Contact

- **📧 Email**: suryanshunab@gmail.com
- **💼 LinkedIn**: [Suryanshu Nabheet](https://www.linkedin.com/in/suryanshu-nabheet/)
- **🐦 X (Twitter)**: [@SuryanshuXDev](https://x.com/suryanshuxdev)
- **📖 Documentation**: [GitHub Repository](https://github.com/Suryanshu-Nabheet/100xCMS)
- **🐛 Issues**: [GitHub Issues](https://github.com/Suryanshu-Nabheet/100xCMS/issues)

---

<div align="center">

**Made with ❤️ by [Suryanshu Nabheet](https://github.com/Suryanshu-Nabheet)**

*Empowering the next generation of developers*

</div>