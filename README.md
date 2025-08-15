# PixelForge Website - Task 2 Implementation

## 🚀 Task 2 Overview

This project implements **Task 2** using modern **Jamstack architecture** with **Vite** as the build tool, incorporating dynamic content management, static site generation, and PWA capabilities.

## 📋 Technologies Used

- **Vite** - Modern build tool and dev server
- **Jamstack Architecture** - Pre-built markup and dynamic functionality
- **Vanilla JavaScript (ES6+)** - Dynamic content management
- **Bootstrap 5.3.2** - Responsive UI framework
- **Service Workers** - PWA functionality and offline support
- **Intersection Observer API** - Performance-optimized animations
- **CSS Custom Properties** - Theming and consistency

## 🎯 Key Features Implemented

### 1. **Dynamic Content Management System**
- Template-driven content rendering
- JSON-based data management
- Real-time content updates without page reload
- SEO-friendly meta tag generation

### 2. **Modern Jamstack Architecture**
- Static site generation with dynamic capabilities
- Pre-built HTML for performance
- API-ready for future CMS integration
- Build-time optimization

### 3. **Progressive Web App (PWA)**
- Service Worker for offline functionality
- App manifest for installability
- Caching strategies for performance
- Update notifications

### 4. **Performance Optimizations**
- Lazy loading for images
- Intersection Observer for animations
- Critical CSS inlining
- Asset optimization and compression

### 5. **Enhanced User Experience**
- Smooth scrolling navigation
- Form validation with real-time feedback
- Loading states and error handling
- Responsive animations

## 📁 Project Structure

```
pixelforge-website/
├── assets/
│   ├── css/
│   │   └── custom.css          # Enhanced styles with CSS variables
│   └── js/
│       ├── content-manager.js  # Dynamic content management
│       ├── script.js          # Main application logic
│       └── data.js            # Generated site data
├── scripts/
│   └── generate-static.js     # Static site generation
├── index.html                 # Enhanced homepage
├── about.html                 # About page
├── contact.html              # Contact page
├── vite.config.js            # Vite configuration
├── package.json              # Project dependencies
└── README.md                 # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (18+ recommended)
- npm or yarn package manager

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Development Server**
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:5173`

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

5. **Generate Static Site with Optimizations**
   ```bash
   npm run build-static
   ```

## 🔧 Configuration

### Vite Configuration
The `vite.config.js` includes:
- Multi-page setup
- Template processing
- Dynamic data generation
- Build optimizations


## 📱 PWA Features

### Service Worker
- Caches critical assets for offline use
- Provides update notifications
- Fallback pages for offline scenarios

### Manifest
- App installation capability
- Theme colors and icons
- Standalone display mode


## 🚀 Deployment

### Static Hosting (Recommended)
- **Netlify**: Deploy directly from GitHub
- **Vercel**: Automatic deployments with Git integration
- **GitHub Pages**: Free hosting for public repositories

### Build Process
1. `npm run build-static` - Generates optimized static files
2. Upload `dist/` folder to your hosting provider
3. Configure server for SPA routing (if needed)

## 📊 Performance Features

### Core Web Vitals Monitoring
- Largest Contentful Paint (LCP) tracking
- Performance metrics logging
- Error tracking and reporting

### Optimization Techniques
- Critical CSS extraction
- Asset compression and minification
- Service Worker caching strategies
- Lazy loading implementation

## 🛡️ Security & SEO

### Security Headers
- Content Security Policy ready
- X-Frame-Options protection
- HTTPS enforcement

### SEO Optimizations
- Dynamic meta tags
- Structured data (JSON-LD)
- Sitemap generation
- Robots.txt configuration

## 🧪 Development Tools

### Available Scripts
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Preview build locally
- `npm run lint` - Code linting
- `npm run format` - Code formatting
