import ContentManager from './content-manager.js'

class PixelForgeApp {
  constructor() {
    this.contentManager = null
    this.isLoaded = false
    this.init()
  }

  async init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeApp())
    } else {
      this.initializeApp()
    }
  }

  async initializeApp() {
    try {
      console.log('🚀 Initializing PixelForge Application...')
      
      // Initialize content manager
      this.contentManager = new ContentManager()
      
      // Register service worker for PWA functionality
      await this.registerServiceWorker()
      
      // Initialize performance monitoring
      this.initPerformanceMonitoring()
      
      // Setup form handlers
      this.setupFormHandlers()
      
      // Initialize smooth scrolling
      this.initSmoothScrolling()
      
      // Setup intersection observer for animations
      this.setupIntersectionObserver()
      
      // Initialize lazy loading
      this.initLazyLoading()
      
      // Setup error handling
      this.setupErrorHandling()
      
      this.isLoaded = true
      console.log('✅ PixelForge Application initialized successfully!')
      
      // Dispatch custom event for other scripts
      document.dispatchEvent(new CustomEvent('pixelforge:ready', {
        detail: { app: this, timestamp: new Date() }
      }))
      
    } catch (error) {
      console.error('❌ Error initializing application:', error)
      this.handleInitializationError(error)
    }
  }

  async registerServiceWorker() {
    if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js')
        console.log('✅ Service Worker registered:', registration)
        
        // Handle service worker updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                this.showUpdateNotification()
              }
            })
          }
        })
        
      } catch (error) {
        console.warn('Service Worker registration failed:', error)
      }
    }
  }

  showUpdateNotification() {
    // Create update notification
    const notification = document.createElement('div')
    notification.className = 'update-notification'
    notification.innerHTML = `
      <div class="notification-content">
        <span>A new version is available!</span>
        <button onclick="window.location.reload()" class="btn btn-sm btn-primary">Update</button>
        <button onclick="this.parentElement.parentElement.remove()" class="btn btn-sm btn-secondary">Later</button>
      </div>
    `
    document.body.appendChild(notification)
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove()
      }
    }, 10000)
  }

  initPerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('web-vitals' in window) {
      // This would normally import from web-vitals package
      // For demo purposes, we'll simulate basic performance monitoring
      this.measurePerformance()
    }
    
    // Monitor loading times
    window.addEventListener('load', () => {
      const loadTime = performance.now()
      console.log(`📊 Page loaded in ${Math.round(loadTime)}ms`)
      
      // Send performance data to analytics (if implemented)
      this.trackPerformance('page_load_time', loadTime)
    })
  }

  measurePerformance() {
    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach(entry => {
            if (entry.entryType === 'largest-contentful-paint') {
              console.log(`📊 LCP: ${Math.round(entry.startTime)}ms`)
              this.trackPerformance('lcp', entry.startTime)
            }
          })
        })
        observer.observe({ entryTypes: ['largest-contentful-paint'] })
      } catch (e) {
        console.warn('Performance monitoring not available')
      }
    }
  }

  trackPerformance(metric, value) {
    // This would integrate with your analytics service
    // For now, we'll store in localStorage for demo
    const performanceData = JSON.parse(localStorage.getItem('pixelforge_performance') || '{}')
    performanceData[metric] = {
      value: Math.round(value),
      timestamp: new Date().toISOString(),
      url: window.location.pathname
    }
    localStorage.setItem('pixelforge_performance', JSON.stringify(performanceData))
  }

  setupFormHandlers() {
    // Handle contact form submission
    const contactForm = document.querySelector('form')
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e))
    }
    
    // Add real-time validation
    const formInputs = document.querySelectorAll('input, textarea')
    formInputs.forEach(input => {
      input.addEventListener('blur', (e) => this.validateField(e.target))
      input.addEventListener('input', (e) => this.clearFieldError(e.target))
    })
  }

  async handleFormSubmit(e) {
    e.preventDefault()
    
    const form = e.target
    const submitBtn = form.querySelector('button[type="submit"]')
    const formData = new FormData(form)
    
    // Show loading state
    submitBtn.disabled = true
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
    
    try {
      // Validate form
      if (!this.validateForm(form)) {
        throw new Error('Please fill in all required fields correctly')
      }
      
      // Simulate form submission (replace with actual endpoint)
      await this.submitForm(formData)
      
      // Show success message
      this.showFormMessage('success', 'Thank you! Your message has been sent successfully.')
      form.reset()
      
    } catch (error) {
      console.error('Form submission error:', error)
      this.showFormMessage('error', error.message || 'Sorry, there was an error sending your message. Please try again.')
    } finally {
      // Reset button state
      submitBtn.disabled = false
      submitBtn.innerHTML = 'Send Message'
    }
  }

  async submitForm(formData) {
    // Simulate API call - replace with actual endpoint
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random success/failure for demo
        if (Math.random() > 0.1) { // 90% success rate
          resolve({ success: true, id: Date.now() })
        } else {
          reject(new Error('Server error - please try again later'))
        }
      }, 2000)
    })
  }

  validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]')
    let isValid = true
    
    requiredFields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false
      }
    })
    
    return isValid
  }

  validateField(field) {
    const value = field.value.trim()
    const type = field.type || field.tagName.toLowerCase()
    let isValid = true
    let message = ''
    
    // Clear previous errors
    this.clearFieldError(field)
    
    // Required field check
    if (field.hasAttribute('required') && !value) {
      isValid = false
      message = 'This field is required'
    }
    
    // Email validation
    else if (type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      isValid = false
      message = 'Please enter a valid email address'
    }
    
    // Phone validation
    else if (type === 'tel' && value && !/^[\d\s\-\+\(\)]+$/.test(value)) {
      isValid = false
      message = 'Please enter a valid phone number'
    }
    
    // Show error if invalid
    if (!isValid) {
      this.showFieldError(field, message)
    }
    
    return isValid
  }

  showFieldError(field, message) {
    field.classList.add('is-invalid')
    
    let errorDiv = field.parentNode.querySelector('.field-error')
    if (!errorDiv) {
      errorDiv = document.createElement('div')
      errorDiv.className = 'field-error text-danger small mt-1'
      field.parentNode.appendChild(errorDiv)
    }
    errorDiv.textContent = message
  }

  clearFieldError(field) {
    field.classList.remove('is-invalid')
    const errorDiv = field.parentNode.querySelector('.field-error')
    if (errorDiv) {
      errorDiv.remove()
    }
  }

  showFormMessage(type, message) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message')
    if (existingMessage) {
      existingMessage.remove()
    }
    
    // Create new message
    const messageDiv = document.createElement('div')
    messageDiv.className = `form-message alert alert-${type === 'success' ? 'success' : 'danger'}`
    messageDiv.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
      ${message}
    `
    
    // Insert before form
    const form = document.querySelector('form')
    if (form) {
      form.parentNode.insertBefore(messageDiv, form)
      
      // Auto-hide success messages
      if (type === 'success') {
        setTimeout(() => messageDiv.remove(), 5000)
      }
    }
  }

  initSmoothScrolling() {
    // Handle anchor link clicks
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href').substring(1)
        const targetElement = document.getElementById(targetId)
        
        if (targetElement) {
          e.preventDefault()
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
          
          // Update URL without triggering scroll
          history.replaceState(null, null, `#${targetId}`)
        }
      })
    })
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          
          // Trigger counter animations for stat numbers
          if (entry.target.querySelector('.stat-number[data-target]')) {
            this.animateCounters(entry.target)
          }
        }
      })
    }, observerOptions)

    // Observe elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el)
    })
  }

  animateCounters(container) {
    const counters = container.querySelectorAll('.stat-number[data-target]')
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'))
      const duration = 2000
      const start = performance.now()
      
      const animate = (currentTime) => {
        const elapsed = currentTime - start
        const progress = Math.min(elapsed / duration, 1)
        
        const current = Math.floor(target * progress)
        counter.textContent = current.toLocaleString()
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          counter.textContent = target.toLocaleString()
        }
      }
      
      requestAnimationFrame(animate)
    })
  }

  initLazyLoading() {
    // Lazy load images
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.classList.add('loaded')
            imageObserver.unobserve(img)
          }
        }
      })
    })

    // Observe images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img)
    })
  }

  setupErrorHandling() {
    // Global error handler
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error)
      this.trackError('javascript_error', e.error)
    })

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason)
      this.trackError('promise_rejection', e.reason)
    })
  }

  trackError(type, error) {
    // Error tracking for analytics
    const errorData = {
      type,
      message: error.message || error.toString(),
      stack: error.stack || '',
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    }
    
    // Store locally for now (would send to analytics service)
    const errors = JSON.parse(localStorage.getItem('pixelforge_errors') || '[]')
    errors.push(errorData)
    localStorage.setItem('pixelforge_errors', JSON.stringify(errors.slice(-10))) // Keep last 10 errors
  }

  handleInitializationError(error) {
    // Fallback initialization for critical errors
    console.error('Critical initialization error:', error)
    
    // Show user-friendly error message
    document.body.insertAdjacentHTML('afterbegin', `
      <div class="alert alert-warning" role="alert">
        <i class="fas fa-exclamation-triangle me-2"></i>
        <strong>Notice:</strong> Some features may not work properly. Please refresh the page or try again later.
      </div>
    `)
  }

  // Public API methods
  getPerformanceData() {
    return JSON.parse(localStorage.getItem('pixelforge_performance') || '{}')
  }

  getErrorLogs() {
    return JSON.parse(localStorage.getItem('pixelforge_errors') || '[]')
  }

  updateContent(newData) {
    if (this.contentManager) {
      return this.contentManager.updateContent(newData)
    }
  }
}

// Initialize the application
const app = new PixelForgeApp()

// Export for use in other modules or console debugging
window.PixelForge = app

export default PixelForgeApp