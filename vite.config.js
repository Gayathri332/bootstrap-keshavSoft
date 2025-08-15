// import { defineConfig } from 'vite';

// export default defineConfig({
//   base: '/bootstrap-keshavSoft/' // your repo name
// });

import { defineConfig } from 'vite'
import { resolve } from 'path'
import fs from 'fs'

// Template data for dynamic content generation
const siteData = {
  site: {
    title: "PixelForge - Creative Digital Agency",
    description: "Creating amazing digital experiences that inspire and engage users worldwide.",
    url: "https://pixelforge.com",
    author: "PixelForge Team"
  },
  company: {
    founded: 2020,
    teamSize: "50+",
    projectsCompleted: "150+",
    yearsExperience: "5+",
    location: "123 Design Street, Creative City, CC 12345",
    phone: "+1 (555) 123-4567",
    email: "hello@pixelforge.com"
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
  ],
  portfolio: [
    {
      title: "E-commerce Platform",
      description: "Modern online shopping experience",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Health & Fitness App", 
      description: "Cross-platform mobile application",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "SaaS Dashboard",
      description: "Analytics and data visualization", 
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ],
  team: [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Sarah Williams", 
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Michael Chen",
      role: "Lead Developer", 
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ],
  navigation: [
    { href: "index.html", text: "Home" },
    { href: "#services", text: "Services" },
    { href: "#portfolio", text: "Portfolio" }, 
    { href: "about.html", text: "About" },
    { href: "contact.html", text: "Contact" }
  ]
}

// Simple template engine function
function processTemplate(template, data) {
  return template.replace(/\{\{(.*?)\}\}/g, (match, key) => {
    const keys = key.trim().split('.')
    let value = data
    for (const k of keys) {
      value = value?.[k]
    }
    return value || match
  })
}

// Plugin to generate pages from templates
function templatePlugin() {
  return {
    name: 'template-generator',
    buildStart() {
      // Generate data.js file for client-side access
      const dataContent = `export const siteData = ${JSON.stringify(siteData, null, 2)}`
      fs.writeFileSync(resolve(__dirname, 'assets/js/data.js'), dataContent)
    },
    generateBundle() {
      console.log('✓ Template processing completed')
      console.log('✓ Site data generated')
    }
  }
}

export default defineConfig({
  plugins: [templatePlugin()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'), 
        contact: resolve(__dirname, 'contact.html')
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
})