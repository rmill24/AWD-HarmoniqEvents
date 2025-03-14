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
