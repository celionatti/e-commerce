// Cart functionality
let cartCount = 0;
const cartBtn = document.getElementById('cartBtn');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        cartCount++;
        cartBtn.innerHTML = `<i class="fas fa-shopping-cart"></i> Cart (${cartCount})`;

        // Animation feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);

        // Temporary success state
        const originalText = this.textContent;
        this.textContent = 'Added!';
        this.style.backgroundColor = '#28a745';
        setTimeout(() => {
            this.textContent = originalText;
            this.style.backgroundColor = '';
        }, 1500);
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.98)';
    } else {
        navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
    }
});