const initCounterAnimation = () => {
    const statsSection = document.querySelector('.impact-stats');
    const counters = document.querySelectorAll('.counter');

    if (!statsSection || counters.length === 0) return;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // Animation duration in milliseconds (2 seconds)
            const startTime = performance.now();

            const updateCount = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                
                // easeOutQuart easing function for a professional deceleration effect
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentCount = Math.floor(easeOutQuart * target);

                counter.innerText = currentCount;

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target; // Ensure it finishes exactly on the target number
                }
            };

            requestAnimationFrame(updateCount);
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                animateCounters();
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, { 
        threshold: 0.4 // Triggers when 40% of the section is visible on screen
    });

    observer.observe(statsSection);
};


document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    initCounterAnimation();

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Change icon
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});