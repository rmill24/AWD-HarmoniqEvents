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
