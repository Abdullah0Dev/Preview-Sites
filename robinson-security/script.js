document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = navMenu.querySelectorAll('a');
    const icon = mobileMenuBtn.querySelector('i'); // Defined once in the outer scope

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Toggle icon between bars and X
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            // No need to re-declare 'icon' here, we use the one from the top scope
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

    // Simple scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation to sections
    const sections = document.querySelectorAll('.service-card, .stat-item, .sector-item, .about-content');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});