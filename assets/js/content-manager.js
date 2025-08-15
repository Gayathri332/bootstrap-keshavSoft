import { siteData } from './data.js'

class ContentManager {
  constructor() {
    this.data = siteData
    this.init()
  }

  init() {
    this.populateMetaTags()
    this.renderNavigation()
    this.renderDynamicContent()
    this.initializeAnimations()
  }

  // Populate meta tags dynamically
  populateMetaTags() {
    document.title = this.data.site.title
    
    // Update existing meta tags or create new ones
    const metaTags = [
      { name: 'description', content: this.data.site.description },
      { property: 'og:title', content: this.data.site.title },
      { property: 'og:description', content: this.data.site.description },
      { property: 'og:url', content: this.data.site.url }
    ]

    metaTags.forEach(tag => {
      let meta = document.querySelector(`meta[${Object.keys(tag)[0]}="${Object.values(tag)[0]}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        Object.keys(tag).forEach(key => {
          meta.setAttribute(key, tag[key])
        })
        document.head.appendChild(meta)
      } else {
        meta.setAttribute('content', tag.content)
      }
    })
  }

  // Render navigation dynamically
  renderNavigation() {
    const navLinks = document.querySelectorAll('.navbar-nav')
    const currentPage = window.location.pathname.split('/').pop() || 'index.html'
    
    navLinks.forEach(nav => {
      nav.innerHTML = this.data.navigation.map(item => `
        <li class="nav-item">
          <a class="nav-link ${item.href === currentPage ? 'active' : ''}" href="${item.href}">
            ${item.text}
          </a>
        </li>
      `).join('')
    })
  }

  // Render dynamic content based on page
  renderDynamicContent() {
    const page = this.getCurrentPage()
    
    switch(page) {
      case 'index':
        this.renderHomePage()
        break
      case 'about':
        this.renderAboutPage()
        break
      case 'contact':
        this.renderContactPage()
        break
    }
  }

  getCurrentPage() {
    const path = window.location.pathname
    if (path.includes('about')) return 'about'
    if (path.includes('contact')) return 'contact'
    return 'index'
  }

  renderHomePage() {
    // Render services section
    const servicesContainer = document.querySelector('#services .row.g-4')
    if (servicesContainer) {
      servicesContainer.innerHTML = this.data.services.map(service => `
        <div class="col-lg-4">
          <div class="service-card fade-in">
            <div class="service-icon">
              <i class="${service.icon}"></i>
            </div>
            <h4 class="mb-3">${service.title}</h4>
            <p class="text-muted">${service.description}</p>
          </div>
        </div>
      `).join('')
    }

    // Render portfolio section
    const portfolioContainer = document.querySelector('#portfolio .row.g-4')
    if (portfolioContainer) {
      portfolioContainer.innerHTML = this.data.portfolio.map(item => `
        <div class="col-lg-4 col-md-6">
          <div class="portfolio-item fade-in">
            <img src="${item.image}" alt="${item.title}" class="img-fluid">
            <div class="portfolio-overlay">
              <div class="portfolio-content">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
                <a href="#" class="btn btn-outline-light">View Project</a>
              </div>
            </div>
          </div>
        </div>
      `).join('')
    }

    // Update statistics
    this.updateStatistics()
  }

  renderAboutPage() {
    // Render team members
    const teamContainer = document.querySelector('.team-section .row.g-4, #team .row.g-4')
    if (teamContainer) {
      teamContainer.innerHTML = this.data.team.map(member => `
        <div class="col-md-4 fade-in">
          <div class="card border-0 shadow-sm h-100">
            <img src="${member.image}" class="card-img-top" alt="${member.name}">
            <div class="card-body text-center p-4">
              <h4 class="card-title">${member.name}</h4>
              <p class="text-muted">${member.role}</p>
              <div class="mt-3">
                <a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                <a href="#" class="social-icon"><i class="fas fa-envelope"></i></a>
              </div>
            </div>
          </div>
        </div>
      `).join('')
    }

    // Update company statistics
    this.updateCompanyStats()
  }

  renderContactPage() {
    // Update contact information
    const contactElements = {
      location: document.querySelector('[data-contact="location"]'),
      phone: document.querySelector('[data-contact="phone"]'), 
      email: document.querySelector('[data-contact="email"]')
    }

    if (contactElements.location) {
      contactElements.location.textContent = this.data.company.location
    }
    if (contactElements.phone) {
      contactElements.phone.textContent = this.data.company.phone
    }
    if (contactElements.email) {
      contactElements.email.textContent = this.data.company.email
    }
  }

  updateStatistics() {
    const stats = [
      { selector: '.stat-item:nth-child(1) .stat-number', value: this.data.company.projectsCompleted },
      { selector: '.stat-item:nth-child(2) .stat-number', value: this.data.company.teamSize.replace('+', '') + '+' },
      { selector: '.stat-item:nth-child(3) .stat-number', value: this.data.company.yearsExperience },
      { selector: '.stat-item:nth-child(4) .stat-number', value: '24/7' }
    ]

    stats.forEach(stat => {
      const element = document.querySelector(stat.selector)
      if (element) {
        this.animateNumber(element, stat.value)
      }
    })
  }

  updateCompanyStats() {
    // Update about page statistics
    const aboutStats = document.querySelectorAll('.text-primary')
    if (aboutStats.length >= 3) {
      aboutStats[0].textContent = this.data.company.teamSize
      aboutStats[1].textContent = this.data.company.yearsExperience  
      aboutStats[2].textContent = this.data.company.projectsCompleted
    }
  }

  animateNumber(element, finalValue) {
    const isNumber = !isNaN(parseInt(finalValue))
    if (!isNumber) {
      element.textContent = finalValue
      return
    }

    const duration = 2000
    const startValue = 0
    const endValue = parseInt(finalValue)
    const startTime = performance.now()

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      const current = Math.floor(startValue + (endValue - startValue) * progress)
      element.textContent = current + (finalValue.includes('+') ? '+' : '')
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }

  initializeAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
        }
      })
    }, observerOptions)

    // Observe fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'
      el.style.transition = 'all 0.6s ease'
      observer.observe(el)
    })
  }

  // Method to update content dynamically (for future API integration)
  async updateContent(newData) {
    this.data = { ...this.data, ...newData }
    this.renderDynamicContent()
  }

  // Method to generate static files (Jamstack approach)
  generateStaticContent() {
    return {
      pages: ['index', 'about', 'contact'],
      data: this.data,
      timestamp: new Date().toISOString()
    }
  }
}

// Initialize content manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.contentManager = new ContentManager()
})

// Export for module use
export default ContentManager