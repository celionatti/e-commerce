// Simple animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Cart functionality
    const addToCartButtons = document.querySelectorAll('.btn-primary');
    const cartBadge = document.querySelector('.badge.bg-white');
    let cartCount = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (e.target.textContent.trim() === 'Add to Cart') {
                cartCount++;
                cartBadge.textContent = cartCount;

                // Button feedback
                const originalText = e.target.textContent;
                e.target.textContent = 'Added!';
                e.target.classList.add('btn-success');
                e.target.classList.remove('btn-primary');

                setTimeout(() => {
                    e.target.textContent = originalText;
                    e.target.classList.remove('btn-success');
                    e.target.classList.add('btn-primary');
                }, 1500);
            }
        });
    });
});