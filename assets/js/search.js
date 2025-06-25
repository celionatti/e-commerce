// Products data for search functionality
const products = [
    {
        name: "Wireless Headphones",
        description: "Premium sound quality with noise cancellation",
        price: "129.99",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "electronics"
    },
    {
        name: "Smart Watch",
        description: "Track your fitness and stay connected",
        price: "199.99",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "electronics"
    },
    {
        name: "Bluetooth Speaker",
        description: "Portable with 20 hours battery life",
        price: "89.99",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "electronics"
    }
];

// Search functionality
const searchBtn = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchSuggestions = document.querySelectorAll('.search-suggestion');

// Open search overlay
searchBtn.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    setTimeout(() => {
        searchInput.focus();
    }, 300);
});

// Close search overlay
searchClose.addEventListener('click', closeSearch);
searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
        closeSearch();
    }
});

// Close search with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSearch();
    }
});

function closeSearch() {
    searchOverlay.classList.remove('active');
    searchInput.value = '';
    searchResults.innerHTML = '';
}

// Search input functionality
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (query === '') {
        searchResults.innerHTML = '';
        return;
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );

    displaySearchResults(filteredProducts, query);
});

// Search suggestions functionality
searchSuggestions.forEach(suggestion => {
    suggestion.addEventListener('click', () => {
        const searchTerm = suggestion.getAttribute('data-search');
        searchInput.value = searchTerm;
        searchInput.dispatchEvent(new Event('input'));
    });
});

function displaySearchResults(products, query) {
    if (products.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search fa-3x mb-3" style="color: #666;"></i>
                <p>No products found for "${query}"</p>
                <p>Try searching for headphones, watch, or speaker</p>
            </div>
        `;
        return;
    }

    const resultsHTML = products.map(product => `
        <div class="search-result-item" onclick="selectProduct('${product.name}')">
            <img src="${product.image}" alt="${product.name}" class="search-result-image">
            <div class="search-result-info flex-grow-1">
                <h6>${product.name}</h6>
                <p>${product.description}</p>
                <span class="search-result-price">${product.price}</span>
            </div>
        </div>
    `).join('');

    searchResults.innerHTML = resultsHTML;
}

function selectProduct(productName) {
    // Close search and scroll to product
    closeSearch();

    // Find and highlight the product
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        const name = item.getAttribute('data-name');
        if (name === productName) {
            item.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Add highlight effect
            const card = item.querySelector('.product-card');
            card.style.border = '3px solid var(--secondary-color)';
            card.style.boxShadow = '0 0 30px rgba(137, 207, 240, 0.5)';

            // Remove highlight after 3 seconds
            setTimeout(() => {
                card.style.border = '2px solid #333';
                card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
            }, 3000);
        }
    });
}