// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('header nav ul');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
});

// Hero Slider
const slides = document.querySelectorAll('.hero-slider .slide');
let currentSlide = 0;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

setInterval(nextSlide, 4000);

// Contact Form
const form = document.getElementById('contact-form');
form.addEventListener('submit', function(e){
    e.preventDefault();
    alert('Thank you! Your message has been sent.');
    form.reset();
});

// Quick Booking Form
const quickBookingForm = document.getElementById('quickBookingForm');
if (quickBookingForm) {
    quickBookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('bookName').value;
        const phone = document.getElementById('bookPhone').value;
        const roomType = document.getElementById('bookRoomType').value;
        const checkin = document.getElementById('bookCheckin').value;
        const checkout = document.getElementById('bookCheckout').value;
        const message = document.getElementById('bookMessage').value;

        if (new Date(checkout) <= new Date(checkin)) {
            alert("Check-out date must be after check-in.");
            return;
        }

        // Calculate nights
        const nights = Math.ceil((new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24));

        // Create WhatsApp message
        const whatsappMessage = `Hello! I want to book a room at Freetown Hotel and Suites.

Name: ${name}
Phone: ${phone}
Room Type: ${roomType}
Check-in: ${checkin}
Check-out: ${checkout}
Nights: ${nights}
${message ? 'Message: ' + message : ''}

Please confirm my booking.`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // WhatsApp URL (replace with your hotel's WhatsApp number)
        const whatsappURL = `https://wa.me/2341234567890?text=${encodedMessage}`;

        // Open WhatsApp
        window.open(whatsappURL, '_blank');

        // Reset form
        quickBookingForm.reset();
    });
}

// Advanced Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.room-card, .service-card, .gallery-item, .review-card, .contact form, .quick-booking .booking-form').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.style.transform = `translateY(${rate}px)`;
    }
});

// Floating effect for elements
function addFloatingEffect() {
    const elements = document.querySelectorAll('.btn, .service-card, .gallery-item, .review-card');
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.5}s`;
    });
}

addFloatingEffect();

// Glow effect on hover for advanced interaction
document.querySelectorAll('.room-card, .service-card, .gallery-item').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.filter = 'drop-shadow(0 0 20px rgba(255,215,0,0.5))';
    });
    card.addEventListener('mouseleave', () => {
        card.style.filter = 'none';
    });
});