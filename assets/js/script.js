// ============================================
// Theme Toggle Functionality
// ============================================
let themeToggle, themeIcon;
let mobileThemeToggle, mobileThemeIcon;

function initThemeToggle() {
    // Get references to theme elements
    themeToggle = document.getElementById('themeToggle');
    themeIcon = document.getElementById('themeIcon');
    mobileThemeToggle = document.getElementById('mobileThemeToggle');
    mobileThemeIcon = document.getElementById('mobileThemeIcon');
    
    // Check for saved theme preference, default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update icons based on current theme
    updateThemeIcons(savedTheme);
    
    // Add event listeners to theme toggles
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcons(newTheme);
}

function updateThemeIcons(theme) {
    const moonIcon = '☾';
    const sunIcon = '☀';
    
    if (themeIcon) {
        themeIcon.textContent = theme === 'dark' ? moonIcon : sunIcon;
    }
    
    if (mobileThemeIcon) {
        mobileThemeIcon.textContent = theme === 'dark' ? moonIcon : sunIcon;
    }
}

// ============================================
// Mobile Menu Functionality
// ============================================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const menuOverlay = document.getElementById('menuOverlay');
    
    // Create overlay if it doesn't exist
    let overlay = menuOverlay;
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'menuOverlay';
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
    }
    
    if (menuToggle && navLinks) {
        // Toggle menu when clicked
        menuToggle.addEventListener('click', function(event) {
            event.stopPropagation();
            navLinks.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // Close menu when clicking outside
        overlay.addEventListener('click', closeMenu);
        
        // Close menu when pressing escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
    }
    
    function closeMenu() {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}
// ============================================
// Feature Carousel Functionality
// ============================================
function initFeatureCarousel() {
    const carousel = document.getElementById('featuresCarousel');
    if (!carousel) return;
    
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.carousel-slide').length;
    
    // Update carousel position using transform
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Navigation event handlers
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        });
    }
    
    // Dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentSlide = parseInt(dot.getAttribute('data-index'));
            updateCarousel();
        });
    });
    
    // Auto-advance carousel every 5 seconds
    let autoplayInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }, 5000);
    
    // Pause autoplay on hover
    if (carousel) {
        carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
        carousel.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateCarousel();
            }, 5000);
        });
    }
    
    // Initialize carousel
    updateCarousel();
}
// Testimonial Carousel Functionality
function initTestimonialCarousel() {
    const track = document.getElementById('carousel-track');
    if (!track) return; // Exit if element doesn't exist
    
    const cards = track.querySelectorAll('.carousel-card');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const indicators = document.getElementById('indicators');
    const container = track.parentElement; // Get the container for width calculations
    
    // Guard against empty collections
    if (cards.length === 0) return;
    
    let indicatorDots;
    if (indicators) {
        indicatorDots = indicators.querySelectorAll('.indicator');
    }
    
    // Calculate how many cards to show based on screen width
    const getCardsToShow = () => {
        if (window.innerWidth < 600) return 1;
        if (window.innerWidth < 900) return 2;
        return 3;
    };
    
    let cardsToShow = getCardsToShow();
    let currentPosition = 0;
    const totalCards = cards.length;
    
    // Update indicators based on card count and visible cards
    const updateIndicators = () => {
        if (!indicators) return;
        
        // Clear existing indicators
        indicators.innerHTML = '';
        
        // Calculate the maximum number of positions (pages)
        const maxPositions = Math.max(1, totalCards - cardsToShow + 1);
        
        // Create indicator for each position
        for (let i = 0; i < maxPositions; i++) {
            const dot = document.createElement('div');
            dot.classList.add('indicator');
            if (i === currentPosition) {
                dot.classList.add('active');
            }
            dot.setAttribute('data-index', i);
            dot.addEventListener('click', () => {
                goToPosition(i);
            });
            indicators.appendChild(dot);
        }
        
        // Update reference to indicators
        indicatorDots = indicators.querySelectorAll('.indicator');
    };
    
    // Function to update card positions
    const updateCarousel = () => {
        if (!track || cards.length === 0) return;
        
        // Calculate card width and gap from actual computed styles
        const cardStyle = window.getComputedStyle(cards[0]);
        const trackStyle = window.getComputedStyle(track);
        const cardWidth = cards[0].offsetWidth;
        const gap = parseFloat(trackStyle.gap) || 32; // Default to 2rem (32px) if gap isn't set
        
        // Calculate the exact scroll amount
        const scrollAmount = cardWidth + gap;
        
        // Move the track
        track.style.transform = `translateX(-${currentPosition * scrollAmount}px)`;
        
        // Update active indicator
        if (indicatorDots) {
            indicatorDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentPosition);
            });
        }
        
        // Update button states
        if (prevButton) {
            prevButton.disabled = currentPosition <= 0;
        }
        
        if (nextButton) {
            const maxPosition = totalCards - cardsToShow;
            nextButton.disabled = currentPosition >= maxPosition;
        }
    };
    
    // Go to specific position
    const goToPosition = (position) => {
        // Ensure position is within valid range
        const maxPosition = Math.max(0, totalCards - cardsToShow);
        currentPosition = Math.max(0, Math.min(position, maxPosition));
        updateCarousel();
    };
    
    // Event listeners for buttons
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            goToPosition(currentPosition - 1);
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            goToPosition(currentPosition + 1);
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const newCardsToShow = getCardsToShow();
        if (newCardsToShow !== cardsToShow) {
            cardsToShow = newCardsToShow;
            // Ensure current position is valid with new cardsToShow value
            currentPosition = Math.min(currentPosition, totalCards - cardsToShow);
            updateIndicators();
            updateCarousel();
        } else {
            // Even if cards to show hasn't changed, we still need to recalculate
            // the positions since card width might have changed
            updateCarousel();
        }
    });
    
    // Auto-play functionality
    let autoplayInterval;
    
    const startAutoplay = () => {
        clearInterval(autoplayInterval); // Clear any existing interval
        autoplayInterval = setInterval(() => {
            if (currentPosition >= totalCards - cardsToShow) {
                // Loop back to beginning
                goToPosition(0);
            } else {
                // Advance by one
                goToPosition(currentPosition + 1);
            }
        }, 5000);
    };
    
    const stopAutoplay = () => {
        clearInterval(autoplayInterval);
    };
    
    // Pause autoplay on hover
    if (track) {
        track.addEventListener('mouseenter', stopAutoplay);
        track.addEventListener('mouseleave', startAutoplay);
    }
    
    // Touch events for mobile swiping
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (track) {
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoplay();
        });
        
        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoplay();
        });
    }
    
    const handleSwipe = () => {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left, go to next
            goToPosition(currentPosition + 1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right, go to previous
            goToPosition(currentPosition - 1);
        }
    };
    
    // Initialize the carousel
    updateIndicators();
    updateCarousel();
    startAutoplay();
}

// ============================================
// Password Toggle Functionality
// ============================================
function initPasswordToggle() {
    const toggleBtn = document.getElementById("togglePassword");
    if (!toggleBtn) return;
    
    toggleBtn.addEventListener("click", function() {
        const passwordInput = document.getElementById("password");
        if (!passwordInput) return;
        
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            this.classList.replace("fa-eye", "fa-eye-slash");
        } else {
            passwordInput.type = "password";
            this.classList.replace("fa-eye-slash", "fa-eye");
        }
    });
}

// ============================================
// Signup Redirect Function
// ============================================
function redirectToSignup() {
    window.location.href = "index.html#signup-form";
}