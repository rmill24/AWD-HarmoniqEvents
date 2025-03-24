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

// ==============================================
// SIDEBAR NAVIGATION
// ==============================================

// Function to start the sidebar navigation
function startSidebarNavigation() {
    // Get all the sidebar links
    var sidebarLinks = document.querySelectorAll('.sidebar-tab');
    
    // Check if any links found
    if (!sidebarLinks || sidebarLinks.length === 0) {
        console.log('No sidebar links found');
        return;
    }
    
    // Show the first active section
    showFirstActiveSection();
    
    // Add click events to all sidebar links
    for (var i = 0; i < sidebarLinks.length; i++) {
        sidebarLinks[i].addEventListener('click', function(e) {
            e.preventDefault();
            handleSidebarClick(this, sidebarLinks);
        });
    }
}

// Function to show the first active section
function showFirstActiveSection() {
    // Find the first active link
    var activeLink = document.querySelector('.sidebar-tab.active');
    
    // If we found an active link, show its section
    if (activeLink) {
        var sectionId = activeLink.getAttribute('data-section');
        showSection(sectionId);
    }
}

// Function to handle sidebar link clicks
function handleSidebarClick(clickedLink, allLinks) {
    // Remove active class from all links
    for (var i = 0; i < allLinks.length; i++) {
        allLinks[i].classList.remove('active');
    }
    
    // Add active class to clicked link
    clickedLink.classList.add('active');
    
    // Get the section to show
    var sectionId = clickedLink.getAttribute('data-section');
    
    // Show the section
    showSection(sectionId);
    
    // Update the header title
    var sectionTitle = document.getElementById('sectionTitle');
    if (sectionTitle) {
        sectionTitle.textContent = clickedLink.textContent.trim();
    }
    
    // Handle special sections (events and tasks)
    if (sectionId === 'events' || sectionId === 'tasks') {
        resetTabs(sectionId);
    }
}

// Function to show a section and hide others
function showSection(sectionId) {
    // Get all content sections
    var sections = document.querySelectorAll('.content-section');
    
    // Hide all sections
    for (var i = 0; i < sections.length; i++) {
        sections[i].classList.remove('active');
    }
    
    // Show the selected section
    var selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
}

// Function to reset tabs in events and tasks sections
function resetTabs(sectionId) {
    // Get the section
    var section = document.getElementById(sectionId);
    if (!section) return;
    
    // Get all tabs in the section
    var tabs = section.querySelectorAll('.tab');
    
    // Remove active class from all tabs
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    
    // Make the first tab active
    if (tabs[0]) {
        tabs[0].classList.add('active');
    }
    
    // Get all tab contents
    var contents = section.querySelectorAll('.tab-content');
    
    // Hide all tab contents
    for (var i = 0; i < contents.length; i++) {
        contents[i].classList.remove('active');
    }
    
    // Show the default content
    var defaultContentId = sectionId === 'events' ? 'pending' : 'pendingTasks';
    var defaultContent = document.getElementById(defaultContentId);
    if (defaultContent) {
        defaultContent.classList.add('active');
    }
}

// ==============================================
// EVENT TABS FUNCTIONALITY
// ==============================================

// Function to start the event tabs
function startEventTabs() {
    // Get all tab buttons
    var tabButtons = document.querySelectorAll('.tab');
    
    // Check if we found any tabs
    if (!tabButtons || tabButtons.length === 0) {
        console.log('No event tabs found');
        return;
    }
    
    // Add click events to all tabs
    for (var i = 0; i < tabButtons.length; i++) {
        tabButtons[i].addEventListener('click', function() {
            handleTabClick(this, tabButtons);
        });
    }
}

// Function to handle tab clicks
function handleTabClick(clickedTab, allTabs) {
    // Remove active class from all tabs
    for (var i = 0; i < allTabs.length; i++) {
        allTabs[i].classList.remove('active');
    }
    
    // Add active class to clicked tab
    clickedTab.classList.add('active');
    
    // Get the content to show
    var tabId = clickedTab.getAttribute('data-tab');
    
    // Hide all tab contents
    var contents = document.querySelectorAll('.tab-content');
    for (var i = 0; i < contents.length; i++) {
        contents[i].classList.remove('active');
    }
    
    // Show the selected content
    var selectedContent = document.getElementById(tabId);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }
}

// ==============================================
// START THE APPLICATION
// ==============================================

// Function to set up the initial state
function setupInitialState() {
    // Find the active sidebar link
    var activeLink = document.querySelector('.sidebar-tab.active');
    
    // If we found an active link, show its section
    if (activeLink) {
        var sectionId = activeLink.getAttribute('data-section');
        var section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('active');
        }
        
        // Update the header title
        var sectionTitle = document.getElementById('sectionTitle');
        if (sectionTitle) {
            sectionTitle.textContent = activeLink.textContent.trim();
        }
    }
}

// Start everything when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Starting the application...');
    
    // Start the sidebar navigation
    startSidebarNavigation();
    
    // Start the event tabs
    startEventTabs();
    
    // Set up the initial state
    setupInitialState();
    
    console.log('Application started successfully');
});