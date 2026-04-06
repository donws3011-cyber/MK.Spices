// Add subtle scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '15px 60px';
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
    } else {
        navbar.style.padding = '25px 60px';
        navbar.style.background = 'rgba(10, 10, 10, 0.85)';
        navbar.style.boxShadow = 'none';
    }
});

// Cart State & Logic
let cart = [];

const updateCartUI = () => {
    const cartCount = document.getElementById('cart-count');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotalPrice = document.getElementById('cart-total-price');
    
    // Update count
    cartCount.innerText = cart.length;
    
    // Update items list
    cartItemsList.innerHTML = '';
    let total = 0;
    
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            cartItemsList.innerHTML += `
                <div class="cart-item">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>Quantity: ${item.qtyLabel}</p>
                    </div>
                    <div class="cart-item-price">₹${item.price} <span style="cursor:pointer; color:#ff4d4d; margin-left:10px; font-size:1.2rem;" onclick="removeFromCart(${index})">&times;</span></div>
                </div>
            `;
        });
    }
    
    // Update total
    cartTotalPrice.innerText = total;
};

window.removeFromCart = (index) => {
    cart.splice(index, 1);
    updateCartUI();
};

// Add to cart interaction
const cartButtons = document.querySelectorAll('.add-to-cart');
cartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const selectElement = productCard.querySelector('.quantity-select');
        const [multiplierStr, qtyLabel] = selectElement.value.split('|');
        const multiplier = parseInt(multiplierStr);
        
        const basePrice = parseInt(this.getAttribute('data-price'));
        const name = this.getAttribute('data-name');
        const finalPrice = basePrice * multiplier;
        
        // Add to cart object
        cart.push({
            name: name,
            qtyLabel: qtyLabel,
            price: finalPrice
        });
        
        updateCartUI();
        
        const originalText = this.innerText;
        // Add minimal success animation
        this.innerText = 'Added to Cart!';
        this.style.backgroundColor = '#4caf50';
        this.style.borderColor = '#4caf50';
        this.style.color = '#fff';
        
        setTimeout(() => {
            this.innerText = originalText;
            this.style.backgroundColor = 'transparent';
            this.style.borderColor = 'var(--primary-color)';
            this.style.color = 'var(--primary-color)';
        }, 1500);
    });
});

// Modal Logic
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart');

cartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cartModal.classList.add('active');
});

closeCartBtn.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

// Close modal when clicking outside
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
    }
});

// Checkout to WhatsApp Logic
const checkoutForm = document.getElementById('checkout-form');
checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
        alert("Your cart is empty. Please add some products.");
        return;
    }
    
    const name = document.getElementById('c-name').value;
    const address = document.getElementById('c-address').value;
    const pin = document.getElementById('c-pin').value;
    const mobile = document.getElementById('c-mobile').value;
    
    let orderDetails = `*New Order from ${name}*\n\n`;
    orderDetails += `*Customer Details:*\n`;
    orderDetails += `Name: ${name}\n`;
    orderDetails += `Mobile: ${mobile}\n`;
    orderDetails += `Address: \n${address}\n`;
    orderDetails += `Pin Code: ${pin}\n\n`;
    
    orderDetails += `*Order Items:*\n`;
    let total = 0;
    cart.forEach((item, index) => {
        orderDetails += `${index + 1}. ${item.name} (${item.qtyLabel}) - ₹${item.price}\n`;
        total += item.price;
    });
    
    orderDetails += `\n*Total Amount: ₹${total}*\n`;
    
    // WhatsApp URL Encoding
    const waNumber = "919847618036";
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(orderDetails)}`;
    
    // Open in new tab
    window.open(waUrl, '_blank');
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Prevent smooth scroll logic for cart link
        if (href === '#') return;
        
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // offset for fixed navbar
                behavior: 'smooth'
            });
        }
    });
});

