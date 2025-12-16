// Smooth scrolling for navigation links using event delegation
function handleNavigationClick(e) {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Setup navigation links using event delegation
    document.addEventListener('click', handleNavigationClick);

    // Sticky header effect
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
});
