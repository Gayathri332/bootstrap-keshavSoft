import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Site data for static generation
const siteData = {
  site: {
    title: "PixelForge - Creative Digital Agency",
    description: "Creating amazing digital experiences that inspire and engage users worldwide.",
    url: "https://pixelforge.com",
    buildTime: new Date().toISOString()
  },
  company: {
    founded: 2020,
    teamSize: "50+",
    projectsCompleted: "150+",
    yearsExperience: "5+"
  },
  services: [
    {
      icon: "fas fa-code",
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies and best practices."
    },
    {
      icon: "fas fa-mobile-alt",
      title: "Mobile Apps", 
      description: "Native and cross-platform mobile applications that provide exceptional user experiences."
    },
    {
      icon: "fas fa-paint-brush",
      title: "UI/UX Design",
      description: "Beautiful and intuitive designs that engage users and drive conversions."
    }
  ]
}

class StaticSiteGenerator {
  constructor() {
    this.distPath = path.join(__dirname, '../dist')
    this.templatePath = path.join(__dirname, '../templates')
    this.outputPath = this.distPath
  }

  async generate() {
    console.log('🚀 Starting static site generation...')
    
    try {
      // Ensure output directory exists
      this.ensureDirectory(this.outputPath)
      
      // Generate sitemap
      await this.generateSitemap()
      
      // Generate robots.txt
      await this.generateRobots()
      
      // Generate manifest.json for PWA
      await this.generateManifest()
      
      // Generate service worker for offline functionality
      await this.generateServiceWorker()
      
      // Optimize build
      await this.optimizeBuild()
      
      console.log('✅ Static site generation completed successfully!')
      
    } catch (error) {
      console.error('❌ Error during static site generation:', error)
      process.exit(1)
    }
  }

  ensureDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }
  }

  async generateSitemap() {
    const pages = [
      { url: '/', changefreq: 'monthly', priority: '1.0' },
      { url: '/about.html', changefreq: 'monthly', priority: '0.8' },
      { url: '/contact.html', changefreq: 'monthly', priority: '0.8' }
    ]

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${siteData.site.url}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

    fs.writeFileSync(path.join(this.outputPath, 'sitemap.xml'), sitemap)
    console.log('📄 Generated sitemap.xml')
  }

  async generateRobots() {
    const robots = `User-agent: *
Allow: /

Sitemap: ${siteData.site.url}/sitemap.xml

# Block access to admin areas
Disallow: /admin/
Disallow: /private/
Disallow: /.git/

# Allow all crawlers to access public content
Allow: /assets/
Allow: /images/`

    fs.writeFileSync(path.join(this.outputPath, 'robots.txt'), robots)
    console.log('🤖 Generated robots.txt')
  }

  async generateManifest() {
    const manifest = {
      name: "PixelForge - Creative Digital Agency",
      short_name: "PixelForge",
      description: siteData.site.description,
      start_url: "/",
      display: "standalone",
      background_color: "#667eea",
      theme_color: "#667eea",
      icons: [
        {
          src: "/assets/icons/icon-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/assets/icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ],
      categories: ["business", "productivity", "design"],
      lang: "en-US",
      dir: "ltr",
      orientation: "portrait-primary"
    }

    fs.writeFileSync(
      path.join(this.outputPath, 'manifest.json'), 
      JSON.stringify(manifest, null, 2)
    )
    console.log('📱 Generated manifest.json for PWA')
  }

  async generateServiceWorker() {
    const serviceWorker = `
// Service Worker for PixelForge Website
const CACHE_NAME = 'pixelforge-v1.0.0'
const ASSETS_TO_CACHE = [
  '/',
  '/about.html',
  '/contact.html',
  '/assets/css/custom.css',
  '/assets/js/content-manager.js',
  '/assets/js/script.js',
  '/assets/js/data.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
]

// Install event
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...')
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching files')
        return cache.addAll(ASSETS_TO_CACHE)
      })
      .then(() => self.skipWaiting())
  )
})

// Activate event
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...')
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache')
            return caches.delete(cache)
          }
        })
      )
    })
  )
})

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
      })
      .catch(() => {
        // Fallback for offline pages
        if (event.request.destination === 'document') {
          return caches.match('/')
        }
      })
  )
})
`

    fs.writeFileSync(path.join(this.outputPath, 'sw.js'), serviceWorker.trim())
    console.log('⚡ Generated service worker for offline functionality')
  }

  async optimizeBuild() {
    // Generate build info
    const buildInfo = {
      timestamp: new Date().toISOString(),
      version: "2.0.0",
      environment: process.env.NODE_ENV || 'production',
      features: [
        'Vite Build System',
        'Dynamic Content Management', 
        'Jamstack Architecture',
        'PWA Support',
        'Service Worker',
        'SEO Optimized'
      ]
    }

    fs.writeFileSync(
      path.join(this.outputPath, 'build-info.json'),
      JSON.stringify(buildInfo, null, 2)
    )

    // Create .htaccess for Apache servers
    const htaccess = `
# PixelForge Website .htaccess Configuration

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Set cache headers
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Redirect to HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
`

    fs.writeFileSync(path.join(this.outputPath, '.htaccess'), htaccess.trim())
    
    console.log('🔧 Generated .htaccess for server configuration')
    console.log('📊 Generated build-info.json')
  }
}

// Run the static site generator
const generator = new StaticSiteGenerator()
generator.generate()