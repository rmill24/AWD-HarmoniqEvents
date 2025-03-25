// Theme Toggle Functionality
function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  // Add click event to theme toggle
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

// Update theme icon based on current theme
function updateThemeIcon(theme) {
  const themeIcon = document.getElementById("themeIcon");
  if (themeIcon) {
    themeIcon.textContent = theme === "dark" ? "☾" : "☀";
  }
}

// Initialize everything when the page loads
document.addEventListener("DOMContentLoaded", () => {
  console.log("Initializing vendor dashboard...");
  initThemeToggle();
  initSignOut();
  initRequestActions();
});

// ============================================
// VENDOR DASHBOARD
// ============================================

// API Base URL
const apiUrl =
  "https://event-management-api-racelle-millagracias-projects.vercel.app";

document.addEventListener("DOMContentLoaded", () => {
  const vendorId = localStorage.getItem("vendorId");

  if (!vendorId) {
    alert("You are not logged in. Please log in first.");
    window.location.href = "/index.html"; // Redirect to login page
    return;
  }

  fetch(
    `https://event-management-api-racelle-millagracias-projects.vercel.app/api/vendors/${vendorId}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Organizer Data:", data);
      document.getElementById("vendor-name").textContent = `${data.name}`;
      document.getElementById("vendor-serviceType").textContent = `${data.serviceType}`;
    })
    .catch((error) => console.error("Error fetching organizer data:", error));
});

// ============================================
// Sign Out Button
// ============================================
document.querySelector(".sign-out").addEventListener("click", () => {
    // Clear stored data
    localStorage.removeItem("vendorId");
    localStorage.removeItem("organizerId");
  
    // Redirect to login page
    window.location.href = "/index.html";
  });
  
  // Initialize on page load
  document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM loaded");
    initThemeToggle();
    initMobileMenu();
  });
