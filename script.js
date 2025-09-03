// Slideshow functionality
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    if (slides.length === 0) return;
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        if (indicators[i]) {
            indicators[i].classList.toggle('active', i === index);
        }
    });
    currentSlide = index;
}

function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
}

function prevSlide() {
    let prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
}

function startSlideshow() {
    if (slides.length === 0) return;
    stopSlideshow();
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideshow() {
    if (slideInterval) clearInterval(slideInterval);
}

if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
        stopSlideshow();
        nextSlide();
        startSlideshow();
    });
    prevBtn.addEventListener('click', () => {
        stopSlideshow();
        prevSlide();
        startSlideshow();
    });
}

if (indicators.length > 0) {
    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            stopSlideshow();
            showSlide(i);
            startSlideshow();
        });
    });
}

if (slides.length > 0) {
    showSlide(0);
    startSlideshow();
}

// Packages slideshow functionality
const packageSlides = document.querySelectorAll('.package-slide');
const packageIndicators = document.querySelectorAll('.package-indicator');
const packagePrevBtn = document.querySelector('.package-prev-btn');
const packageNextBtn = document.querySelector('.package-next-btn');
let currentPackageSlide = 0;
let packageSlideInterval;

function showPackageSlide(index) {
    if (packageSlides.length === 0) return;
    packageSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        if (packageIndicators[i]) {
            packageIndicators[i].classList.toggle('active', i === index);
        }
    });
    currentPackageSlide = index;
}

function nextPackageSlide() {
    let next = (currentPackageSlide + 1) % packageSlides.length;
    showPackageSlide(next);
}

function prevPackageSlide() {
    let prev = (currentPackageSlide - 1 + packageSlides.length) % packageSlides.length;
    showPackageSlide(prev);
}

function startPackageSlideshow() {
    if (packageSlides.length === 0) return;
    stopPackageSlideshow();
    packageSlideInterval = setInterval(nextPackageSlide, 6000);
}

function stopPackageSlideshow() {
    if (packageSlideInterval) clearInterval(packageSlideInterval);
}

if (packageNextBtn && packagePrevBtn) {
    packageNextBtn.addEventListener('click', () => {
        stopPackageSlideshow();
        nextPackageSlide();
        startPackageSlideshow();
    });
    packagePrevBtn.addEventListener('click', () => {
        stopPackageSlideshow();
        prevPackageSlide();
        startPackageSlideshow();
    });
}

if (packageIndicators.length > 0) {
    packageIndicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            stopPackageSlideshow();
            showPackageSlide(i);
            startPackageSlideshow();
        });
    });
}

if (packageSlides.length > 0) {
    showPackageSlide(0);
    startPackageSlideshow();
}

// Enhanced mobile menu functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// Close menu on link click (mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu && navMenu.classList.remove('active');
        hamburger && hamburger.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (hamburger && navMenu && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close menu on window resize (if menu was open on mobile and screen gets larger)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu && hamburger) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Section animations on scroll
const animatedSections = document.querySelectorAll('.about, .services, .packages, .gallery, .contact, .testimonials');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

animatedSections.forEach(section => {
    observer.observe(section);
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add touch/swipe support for slideshow on mobile
let touchStartX = 0;
let touchEndX = 0;

const heroSlideshow = document.querySelector('.hero-slideshow');

if (heroSlideshow) {
    heroSlideshow.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    heroSlideshow.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            stopSlideshow();
            nextSlide();
            startSlideshow();
        } else {
            stopSlideshow();
            prevSlide();
            startSlideshow();
        }
    }
}

// Enhanced image loading functionality
function handleImageLoad(img) {
    img.classList.add('loaded');
}

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.src.startsWith('data:')) {
            img.classList.add('loaded');
        } else {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', () => handleImageLoad(img));
                img.addEventListener('error', () => {
                    img.style.display = 'none';
                    console.warn('Failed to load image:', img.src);
                });
            }
        }
    });
});

window.addEventListener('load', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.classList.contains('loaded')) {
            img.classList.add('loaded');
        }
    });
});

// Testimonials auto-scroll carousel
const testimonialSlides = document.querySelectorAll('.testimonial');
const testimonialIndicators = document.querySelectorAll('.testi-indicator');
const testimonialsSlideshow = document.querySelector('.testimonials-slideshow');
let currentTestimonial = 0;
let testimonialInterval;

function showTestimonial(index) {
    if (testimonialSlides.length === 0) return;
    testimonialSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        if (testimonialIndicators[i]) {
            testimonialIndicators[i].classList.toggle('active', i === index);
        }
    });
    currentTestimonial = index;
}

function nextTestimonial() {
    let next = (currentTestimonial + 1) % testimonialSlides.length;
    showTestimonial(next);
}

function startTestimonials() {
    if (testimonialSlides.length === 0) return;
    stopTestimonials();
    testimonialInterval = setInterval(nextTestimonial, 5000);
}

function stopTestimonials() {
    if (testimonialInterval) clearInterval(testimonialInterval);
}

if (testimonialSlides.length > 0) {
    showTestimonial(0);
    startTestimonials();
    if (testimonialsSlideshow) {
        testimonialsSlideshow.addEventListener('mouseenter', stopTestimonials);
        testimonialsSlideshow.addEventListener('mouseleave', startTestimonials);
    }
    if (testimonialIndicators.length > 0) {
        testimonialIndicators.forEach((indicator, i) => {
            indicator.addEventListener('click', () => {
                stopTestimonials();
                showTestimonial(i);
                startTestimonials();
            });
        });
    }
} 