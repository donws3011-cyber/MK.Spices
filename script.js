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

// Simple add to cart interaction
const cartButtons = document.querySelectorAll('.add-to-cart');

cartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const originalText = this.innerText;
        
        // Add minimal success animation
        this.innerText = 'Added!';
        this.style.backgroundColor = '#4caf50';
        this.style.borderColor = '#4caf50';
        this.style.color = '#fff';
        
        setTimeout(() => {
            this.innerText = originalText;
            this.style.backgroundColor = 'transparent';
            this.style.borderColor = 'var(--primary-color)';
            this.style.color = 'var(--primary-color)';
        }, 2000);
    });
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // offset for fixed navbar
                behavior: 'smooth'
            });
        }
    });
});
