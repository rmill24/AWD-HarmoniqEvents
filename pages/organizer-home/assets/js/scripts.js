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

// ============================================
// Welcome message
// ============================================
// Example for organizer-home/index.html
document.addEventListener("DOMContentLoaded", () => {
    const organizerId = localStorage.getItem("organizerId");

    if (!organizerId) {
        alert("You are not logged in. Please log in first.");
        window.location.href = "/index.html"; // Redirect to login page
        return;
    }

    // Fetch Organizer Data (Optional, if you want to retrieve data from API)
    fetch(`https://event-management-api-racelle-millagracias-projects.vercel.app/api/organizers/${organizerId}`)
        .then(response => response.json())
        .then(data => {
            console.log("Organizer Data:", data);
            document.getElementById("user-name").textContent = `${data.name}`;
        })
        .catch(error => console.error("Error fetching organizer data:", error));
});


// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    initThemeToggle();
    initMobileMenu();
});