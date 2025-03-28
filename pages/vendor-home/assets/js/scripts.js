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

// ============================================
// Sign Out Button
// ============================================
document.querySelector(".sign-out").addEventListener("click", () => {
  // Get the current vendorId before clearing
  const vendorId = localStorage.getItem("vendorId");

  // Clear stored data
  localStorage.removeItem("vendorId");
  localStorage.removeItem("organizerId");

  // Remove venue setup flag for the current vendor
  if (vendorId) {
    localStorage.removeItem(`venueSetUp_${vendorId}`);
  }

  // Redirect to login page
  window.location.href = "/index.html";
});

// ============================================

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded");
  initThemeToggle();
});
