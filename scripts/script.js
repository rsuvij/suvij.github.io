document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your user ID
    emailjs.init("RXJF7l7r1oIu9C1dl");

    // Loader
    setTimeout(function() {
        const loader = document.querySelector('.loader');
        if (loader) loader.classList.add('fade-out');
    }, 1500);

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate skill bars on scroll
    const skillItems = document.querySelectorAll('.skill-item');
    const animateSkills = function() {
        skillItems.forEach(item => {
            const percent = item.getAttribute('data-percent');
            const progressBar = item.querySelector('.skill-progress');
            const rect = item.getBoundingClientRect();
            
            if (rect.top <= window.innerHeight - 100) {
                progressBar.style.width = percent + '%';
            }
        });
    };

    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Run once on page load

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Form submission with EmailJS
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
            submitBtn.disabled = true;

            // Add timestamp to form data
            const timestamp = new Date().toLocaleString();
            const hiddenTimeInput = document.createElement('input');
            hiddenTimeInput.type = 'hidden';
            hiddenTimeInput.name = 'timestamp';
            hiddenTimeInput.value = timestamp;
            this.appendChild(hiddenTimeInput);

            // Send email via EmailJS
            emailjs.sendForm('service_w1mzevd', 'template_44r3yu5', this)
                .then(function() {
                    // Success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success-message';
                    successMessage.innerHTML = `
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Message sent successfully!</span>
                    `;
                    
                    contactForm.insertBefore(successMessage, contactForm.firstChild);
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.style.opacity = '0';
                        setTimeout(() => successMessage.remove(), 300);
                    }, 5000);
                }, function(error) {
                    // Error message
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'form-error-message';
                    errorMessage.innerHTML = `
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>Failed to send. Please email me directly at <a href="mailto:hkamal@workwebmail.com">hkamal@workwebmail.com</a></span>
                    `;
                    
                    contactForm.insertBefore(errorMessage, contactForm.firstChild);
                    
                    // Remove error message after 8 seconds
                    setTimeout(() => {
                        errorMessage.style.opacity = '0';
                        setTimeout(() => errorMessage.remove(), 300);
                    }, 8000);
                    
                    console.error('EmailJS Error:', error);
                })
                .finally(() => {
                    // Reset button state
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    hiddenTimeInput.remove();
                });
        });
    }

     // Intersection Observer for scroll animations
     const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-content, .skill-category, .about-stats .stat').forEach(element => {
        observer.observe(element);
    });
});