/**
 * WebFlow - JavaScript Functions
 * Desenvolvimento e Modernização de Sistemas
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('WebFlow - Site carregado com sucesso! 🚀');
    
    // Initialize all functions
    initSmoothScrolling();
    initScrollAnimations();
    initHeaderEffects();
    initContactForm();
    initServiceCards();
    initStatsCounter();
    initMobileMenu();
});

/**
 * SMOOTH SCROLLING
 * Navegação suave entre seções
 */
function initSmoothScrolling() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80; // Account for fixed header
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * SCROLL ANIMATIONS
 * Animações ao fazer scroll da página
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special animation for stats counter
                if (entry.target.classList.contains('stats-container')) {
                    animateStats();
                }
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

/**
 * HEADER EFFECTS
 * Efeitos do cabeçalho baseados no scroll
 */
function initHeaderEffects() {
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Change header background opacity based on scroll
        if (currentScroll > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.98)';
            header.style.backdropFilter = 'blur(25px)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * CONTACT FORM - WHATSAPP DIRETO
 * Formulário que envia dados direto para WhatsApp
 */
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return; // Safety check
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            service: formData.get('service'),
            message: formData.get('message')
        };

        // Validate required fields
        if (!data.name || !data.email) {
            showNotification('Por favor, preencha nome e e-mail.', 'error');
            return;
        }

        // Validate email format
        if (!isValidEmail(data.email)) {
            showNotification('Por favor, insira um e-mail válido.', 'error');
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Redirecionando...';
        submitBtn.classList.add('loading');

        // Wait 1 second then open WhatsApp
        setTimeout(() => {
            openWhatsAppWithFormData(data);
            
            // Show success message
            showNotification('Redirecionando para WhatsApp com suas informações!', 'success');
            
            // Reset form
            form.reset();
            
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            submitBtn.classList.remove('loading');
        }, 1000);
    });
}

/**
 * SERVICE CARDS
 * Efeitos interativos nos cards de serviços
 */
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle scale and shadow effect
            this.style.transform = 'translateY(-20px) scale(1.02)';
            
            // Add glow effect to icon
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset transform
            this.style.transform = 'translateY(0) scale(1)';
            
            // Reset icon glow
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.boxShadow = 'none';
            }
        });

        // Add click effect
        card.addEventListener('click', function() {
            // Add pulse effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            }, 150);
            
            // Scroll to contact section
            document.querySelector('#contact').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

/**
 * STATS COUNTER
 * Animação dos números das estatísticas
 */
function initStatsCounter() {
    // This will be called when stats section comes into view
    window.animateStats = function() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const targetText = stat.textContent;
            const targetNumber = parseInt(targetText.replace(/\D/g, ''));
            const suffix = targetText.replace(/[\d]/g, '');
            
            if (targetNumber) {
                animateNumber(stat, 0, targetNumber, suffix, 2000);
            }
        });
    };
}

/**
 * MOBILE MENU
 * Menu mobile responsivo
 */
function initMobileMenu() {
    // Create mobile menu toggle button
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Create hamburger button for mobile
    const mobileToggle = document.createElement('button');
    mobileToggle.classList.add('mobile-toggle');
    mobileToggle.innerHTML = '☰';
    mobileToggle.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
    `;
    
    nav.appendChild(mobileToggle);
    
    // Toggle mobile menu
    mobileToggle.addEventListener('click', function() {
        navLinks.classList.toggle('mobile-open');
        this.innerHTML = navLinks.classList.contains('mobile-open') ? '✕' : '☰';
    });
    
    // Close mobile menu when clicking on links
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-open');
            mobileToggle.innerHTML = '☰';
        });
    });
    
    // Add mobile styles
    const mobileStyles = `
        @media (max-width: 768px) {
            .mobile-toggle {
                display: block !important;
            }
            
            .nav-links {
                position: fixed;
                top: 80px;
                left: -100%;
                width: 100%;
                height: calc(100vh - 80px);
                background: rgba(0, 0, 0, 0.98);
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                padding-top: 2rem;
                transition: left 0.3s ease;
            }
            
            .nav-links.mobile-open {
                left: 0;
            }
            
            .nav-links li {
                margin: 1rem 0;
            }
            
            .nav-links a {
                font-size: 1.2rem;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = mobileStyles;
    document.head.appendChild(styleSheet);
}

/**
 * UTILITY FUNCTIONS
 */

// Enhanced WhatsApp function with form data
function openWhatsAppWithFormData(data) {
    const phone = '5519999365777';
    
    // Get service name
    const serviceName = getServiceName(data.service);
    
    // Create detailed message
    const message = encodeURIComponent(
        `🌐 *SOLICITAÇÃO DE ORÇAMENTO - WEBFLOW*\n\n` +
        `👤 *Nome:* ${data.name}\n` +
        `📧 *E-mail:* ${data.email}\n` +
        `📱 *Telefone:* ${data.phone || 'Não informado'}\n` +
        `⚙️ *Serviço:* ${serviceName}\n\n` +
        `💬 *Mensagem:*\n${data.message || 'Gostaria de solicitar um orçamento.'}\n\n` +
        `---\n` +
        `Enviado através do site WebFlow`
    );
    
    const whatsappURL = `https://wa.me/${phone}?text=${message}`;
    window.open(whatsappURL, '_blank');
}

// Get service name from value
function getServiceName(value) {
    const services = {
        'modernizacao': 'Modernização de Sistemas',
        'desenvolvimento': 'Desenvolvimento Web Moderno',
        'automacao': 'Automação e Testes',
        'integracao': 'Integração de Dados',
        'consultoria': 'Consultoria Técnica',
        'suporte': 'Manutenção e Suporte'
    };
    
    return services[value] || 'Serviço não especificado';
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('notification', `notification-${type}`);
    notification.textContent = message;
    
    // Notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        max-width: 300px;
        transform: translateX(400px);
        transition: all 0.3s ease;
        ${type === 'success' ? 'background: linear-gradient(135deg, #10b981, #059669);' : ''}
        ${type === 'error' ? 'background: linear-gradient(135deg, #ef4444, #dc2626);' : ''}
        ${type === 'info' ? 'background: linear-gradient(135deg, #667eea, #764ba2);' : ''}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Animate number counting
function animateNumber(element, start, end, suffix, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOut);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Lazy load images when they come into viewport
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * ERROR HANDLING
 */
window.addEventListener('error', function(e) {
    console.error('WebFlow - Erro JavaScript:', e.error);
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('WebFlow - Service Worker registrado com sucesso:', registration.scope);
            })
            .catch(function(error) {
                console.log('WebFlow - Falha no registro do Service Worker:', error);
            });
    });
}

console.log('WebFlow - Todos os scripts carregados! ✅');