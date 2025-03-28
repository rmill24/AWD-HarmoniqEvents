// ============================================
// Theme Toggle Functionality
// ============================================
let themeToggle, themeIcon;
let mobileThemeToggle, mobileThemeIcon;
 
function initThemeToggle() {
  // Get references to theme elements
  themeToggle = document.getElementById("themeToggle");
  themeIcon = document.getElementById("themeIcon");
  mobileThemeToggle = document.getElementById("mobileThemeToggle");
  mobileThemeIcon = document.getElementById("mobileThemeIcon");
 
  // Check for saved theme preference, default to dark
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
 
  // Update icons based on current theme
  updateThemeIcons(savedTheme);
 
  // Add event listeners to theme toggles
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
 
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener("click", toggleTheme);
  }
}
 
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
 
  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcons(newTheme);
}
 
function updateThemeIcons(theme) {
  const moonIcon = "☾";
  const sunIcon = "☀";
 
  if (themeIcon) {
    themeIcon.textContent = theme === "dark" ? moonIcon : sunIcon;
  }
 
  if (mobileThemeIcon) {
    mobileThemeIcon.textContent = theme === "dark" ? moonIcon : sunIcon;
  }
}
 
// Mobile menu functionality
function initMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const signOut = document.querySelector(".sign-out");
 
  if (!menuToggle || !sidebar || !overlay) {
    console.error("Menu elements not found");
    return;
  }
 
  // Function to close menu
  function closeMenu() {
    menuToggle.classList.remove("active");
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }
 
  // Function to open menu
  function openMenu() {
    menuToggle.classList.add("active");
    sidebar.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
 
  // Toggle menu on hamburger click
  menuToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    if (sidebar.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });
 
  // Close menu when clicking overlay
  overlay.addEventListener("click", closeMenu);
 
  // Close menu when clicking sign out
  if (signOut) {
    signOut.addEventListener("click", function () {
      closeMenu();
      // Add sign out functionality here
      console.log("Signing out...");
    });
  }
 
  // Close menu when clicking sidebar links
  const sidebarLinks = sidebar.querySelectorAll("a");
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
 
  // Close menu on escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sidebar.classList.contains("active")) {
      closeMenu();
    }
  });
 
  // Handle window resize
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth > 1024) {
        closeMenu();
      }
    }, 250);
  });
}

// ============================================
// Welcome message
// ============================================
document.addEventListener("DOMContentLoaded", () => {
    const organizerId = localStorage.getItem("organizerId");
   
    if (!organizerId) {
      alert("You are not logged in. Please log in first.");
      window.location.href = "/index.html"; // Redirect to login page
      return;
    }
   
    fetch(
      `https://event-management-api-racelle-millagracias-projects.vercel.app/api/organizers/${organizerId}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Organizer Data:", data);
        document.getElementById("user-name").textContent = `${data.name}`;
      })
      .catch((error) => console.error("Error fetching organizer data:", error));
  });