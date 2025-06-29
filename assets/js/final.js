// Initialize AOS animation
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Initialize Glide.js carousel
new Glide('.new-arrivals', {
    type: 'carousel',
    perView: 4,
    gap: 20,
    breakpoints: {
        1199: {
            perView: 3
        },
        991: {
            perView: 2
        },
        767: {
            perView: 1
        }
    }
}).mount();

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu close on click
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuLinks = mobileMenu.querySelectorAll('.nav-link');

mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(mobileMenu);
        bsOffcanvas.hide();
    });
});

// Wishlist button toggle
document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            this.classList.add('active');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            this.classList.remove('active');
        }
    });
});

// Quick view modal
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // Don't open modal if clicking on buttons inside card
        if (!e.target.closest('.btn') && !e.target.closest('.wishlist-btn')) {
            const modal = new bootstrap.Modal(document.getElementById('quickViewModal'));
            modal.show();
        }
    });
});

// Quantity input controls
document.querySelectorAll('.input-group button').forEach(button => {
    button.addEventListener('click', function() {
        const input = this.parentNode.querySelector('input');
        let value = parseInt(input.value);

        if (this.textContent === '+') {
            value++;
        } else if (this.textContent === '-' && value > 1) {
            value--;
        }

        input.value = value;
    });
});