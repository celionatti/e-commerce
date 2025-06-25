// Cart functionality
let cartCount = 0;
let selectedColor = 'Black';

function updateCartDisplay() {
    document.getElementById('cartCount').textContent = cartCount;
}

function changeImage(thumbnail) {
    // Remove active class from all thumbnails
    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    // Add active class to clicked thumbnail
    thumbnail.classList.add('active');
    // Change main image
    document.getElementById('mainImage').src = thumbnail.src;
}

function selectColor(colorOption) {
    // Remove active class from all color options
    document.querySelectorAll('.color-option').forEach(c => c.classList.remove('active'));
    // Add active class to selected color
    colorOption.classList.add('active');
    // Store selected color
    selectedColor = colorOption.dataset.color;
}

function changeQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    let currentValue = parseInt(quantityInput.value);
    let newValue = currentValue + change;

    if (newValue >= 1 && newValue <= 10) {
        quantityInput.value = newValue;
    }
}

function addToCart() {
    const quantity = parseInt(document.getElementById('quantity').value);
    cartCount += quantity;
    updateCartDisplay();

    // Show success feedback
    const btn = document.querySelector('.btn-add-cart');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check me-2"></i>Added to Cart!';
    btn.style.backgroundColor = '#28a745';

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.backgroundColor = '';
    }, 2000);
}

function addToWishlist() {
    const btn = document.querySelector('.btn-wishlist');
    const icon = btn.querySelector('i');

    if (icon.classList.contains('fas')) {
        icon.classList.remove('fas');
        icon.classList.add('far');
        btn.style.color = '#cccccc';
        btn.style.borderColor = '#cccccc';
    } else {
        icon.classList.remove('far');
        icon.classList.add('fas');
        btn.style.color = '#FF6B35';
        btn.style.borderColor = '#FF6B35';
    }
}

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

// Quantity input validation
document.getElementById('quantity').addEventListener('input', function() {
    let value = parseInt(this.value);
    if (value < 1) this.value = 1;
    if (value > 10) this.value = 10;
});

// Image zoom effect
document.getElementById('mainImage').addEventListener('mouseover', function() {
    this.style.cursor = 'zoom-in';
});

document.getElementById('mainImage').addEventListener('click', function() {
    // Simple zoom effect
    if (this.style.transform === 'scale(1.5)') {
        this.style.transform = 'scale(1)';
        this.style.cursor = 'zoom-in';
    } else {
        this.style.transform = 'scale(1.5)';
        this.style.cursor = 'zoom-out';
    }
});

// Smooth scrolling
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

// Initialize
updateCartDisplay();