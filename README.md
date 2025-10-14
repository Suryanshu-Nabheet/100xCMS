<div align="center">

# ClassX Platform

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

ClassX is a comprehensive educational technology platform designed to revolutionize how students learn programming and technical skills. Built with modern web technologies and a focus on user experience, ClassX provides an immersive learning environment that combines interactive content, AI-powered assistance, and community-driven learning.

### 🚀 Key Features

- **🎨 Modern Landing Experience**: Responsive, animated landing page with glass-morphism design
- **🔐 Secure Authentication**: JWT-based authentication with dark-themed modals
- **📚 Course Management**: Comprehensive course browsing and enrollment system
- **🎥 Video Learning**: Integrated video player for course content
- **📊 Progress Tracking**: Detailed analytics and learning progress monitoring
- **👤 User Profiles**: Personalized user dashboard and profile management
- **📱 Mobile-First Design**: Fully responsive across all device sizes
- **⚡ Performance Optimized**: Lazy loading, code splitting, and optimized assets

---

## 🏗️ Architecture & File Structure

```
ClassX/
├── 📁 src/                          # Source code directory
│   ├── 📁 components/              # React components
│   │   ├── 📁 Auth/                # Authentication components
│   │   │   ├── SignIn.tsx          # Sign-in modal component
│   │   │   ├── SignUp.tsx          # Sign-up modal component
│   │   │   ├── auth.css            # Authentication styling
│   │   │   └── index.ts            # Auth module exports
│   │   │
│   │   ├── 📁 Dashboard/           # Main application dashboard
│   │   │   │
│   │   │   ├── 📁 Courses/         # Course management
│   │   │   │   ├── Courses.tsx
│   │   │   │   ├── CourseCard.tsx
│   │   │   │   ├── CourseDetail.tsx
│   │   │   │   ├── coursesData.ts
│   │   │   │   ├── 📁 AdhocClasses/
│   │   │   │   ├── 📁 DevopsCohort/
│   │   │   │   ├── 📁 DsaClasses/
│   │   │   │   ├── 📁 SolanaFellowship/
│   │   │   │   ├── 📁 Web3Cohort/
│   │   │   │   └── 📁 WebDevCohort/
│   │   │   │   │
│   │   │   ├── 📁 Home/            # Dashboard home
│   │   │   │   └── HomePage.tsx
│   │   │   │
│   │   │   ├── 📁 Layout/          # Layout components
│   │   │   │   └── LayoutShell.tsx
│   │   │   │
│   │   │   ├── 📁 Profile/         # User profile
│   │   │   │   └── ProfileView.tsx
│   │   │   │
│   │   │   └── 📁 Video/          # Video player
│   │   │       └── VideoPlayer.tsx
│   │   │
│   │   └── 📁 Landing/            # Landing page components
│   │       ├── 📁 Components/     # Reusable UI components
│   │       │   ├── footer-cta.tsx # Call-to-action footer
│   │       │   ├── footer.tsx     # Main footer component
│   │       │   └── index.ts       # Component exports
│   │       ├── landing-page.tsx   # Main landing page
│   │       ├── main.tsx           # Landing page entry point
│   │       └── index.ts           # Landing module exports
│   │
│   ├── 📁 lib/                    # Utility libraries
│   │   └── utils.ts               # Common utility functions
│   │
│   ├── 📁 types/                  # TypeScript type definitions
│   │   └── index.ts               # Global type definitions
│   │
│   ├── App.tsx                    # Main application component
│   ├── main.tsx                   # Application entry point
│   ├── index.css                  # Global styles
│   └── vite-env.d.ts             # Vite environment types
│
├── 📁 docs/                       # Documentation
│   └── INSTALL.md                 # Installation guide
│
├── 📁 Public/                    # Static assets
│   └── Suryanshu Nabheet.jpg     # Profile image
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
- **Framer Motion** - Production-ready motion library
- **Vite** - Next-generation frontend tooling

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
   git clone https://github.com/Suryanshu-Nabheet/ClassX.git
   cd ClassX
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
- **📖 Documentation**: [GitHub Repository](https://github.com/Suryanshu-Nabheet/ClassX)
- **🐛 Issues**: [GitHub Issues](https://github.com/Suryanshu-Nabheet/ClassX/issues)

---

<div align="center">

**Made with ❤️ by [Suryanshu Nabheet](https://github.com/Suryanshu-Nabheet)**

*Empowering the next generation of developers*

</div>