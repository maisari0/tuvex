// JavaScript for enhanced website functionality

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').length > 1) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (mobileMenuToggle) {
                        mobileMenuToggle.classList.remove('active');
                    }
                }
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Language toggle functionality
    const languageToggles = document.querySelectorAll('.language-toggle a, .footer-language-toggle a');
    
    languageToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all toggles in the same group
            const parentToggle = this.closest('.language-toggle') || this.closest('.footer-language-toggle');
            if (parentToggle) {
                const siblings = parentToggle.querySelectorAll('a');
                siblings.forEach(sibling => {
                    sibling.classList.remove('active');
                });
            }
            
            // Add active class to clicked toggle
            this.classList.add('active');
            
            // Here you would normally implement actual language switching
            // For demo purposes, we're just toggling the active state
            
            // Sync the other language toggle if it exists
            const isFooterToggle = this.closest('.footer-language-toggle') !== null;
            const lang = this.textContent.trim();
            
            if (isFooterToggle) {
                const headerToggles = document.querySelectorAll('.language-toggle a');
                headerToggles.forEach(headerToggle => {
                    if (headerToggle.textContent.trim() === lang) {
                        headerToggle.classList.add('active');
                    } else {
                        headerToggle.classList.remove('active');
                    }
                });
            } else {
                const footerToggles = document.querySelectorAll('.footer-language-toggle a');
                footerToggles.forEach(footerToggle => {
                    if (footerToggle.textContent.trim() === lang) {
                        footerToggle.classList.add('active');
                    } else {
                        footerToggle.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Form validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const formElements = this.elements;
            
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].hasAttribute('required') && !formElements[i].value.trim()) {
                    isValid = false;
                    formElements[i].classList.add('error');
                } else if (formElements[i].type === 'email' && formElements[i].value.trim()) {
                    // Simple email validation
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(formElements[i].value.trim())) {
                        isValid = false;
                        formElements[i].classList.add('error');
                    } else {
                        formElements[i].classList.remove('error');
                    }
                } else {
                    formElements[i].classList.remove('error');
                }
            }
            
            if (isValid) {
                // In a real application, you would send the form data to a server
                // For demo purposes, we'll just show a success message
                const formWrapper = contactForm.parentElement;
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message animate-fade-in';
                successMessage.innerHTML = '<p>Thank you for your message! We will get back to you soon.</p>';
                
                // Hide the form and show success message
                contactForm.style.display = 'none';
                formWrapper.appendChild(successMessage);
                
                // Reset form for future use
                contactForm.reset();
            }
        });
    }
    
    // Intersection Observer for animation triggers
    if ('IntersectionObserver' in window) {
        const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up, .animate-slide-in-left, .animate-slide-in-right, .animate-scale');
        const sectionHeaders = document.querySelectorAll('.section-header');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // If the element has a delay class, keep it
                    const hasDelay = Array.from(entry.target.classList).some(className => className.startsWith('delay-'));
                    
                    // If no delay, add the animation immediately
                    if (!hasDelay) {
                        entry.target.style.animationDelay = '0s';
                    }
                    
                    // Add visible class to trigger animation
                    entry.target.classList.add('visible');
                    
                    // Unobserve after animation is triggered
                    animationObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        const headerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    headerObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Observe all animated elements
        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
        
        // Observe all section headers
        sectionHeaders.forEach(header => {
            headerObserver.observe(header);
        });
    }
    
    // Performance optimization - lazy load background images
    const lazyBackgrounds = document.querySelectorAll('.hero-section, .about-section, .why-choose-section');
    
    if ('IntersectionObserver' in window) {
        const backgroundObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible-background');
                    backgroundObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        lazyBackgrounds.forEach(bg => {
            backgroundObserver.observe(bg);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyBackgrounds.forEach(bg => {
            bg.classList.add('visible-background');
        });
    }
});
