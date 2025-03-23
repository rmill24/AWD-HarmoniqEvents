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

// Mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const signOut = document.querySelector('.fa-sign-out-alt');
    
    if (!menuToggle || !sidebar || !overlay) {
        console.error('Menu elements not found');
        return;
    }
    
    // Toggle menu on hamburger click
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    });
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
    
    // Close menu when clicking sign out icon
    if (signOut) {
        signOut.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            // Add sign out functionality here
            console.log('Signing out...');
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    initThemeToggle();
    initMobileMenu();
});