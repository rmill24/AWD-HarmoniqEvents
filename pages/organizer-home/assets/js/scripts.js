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

// ==============================================
// SIDEBAR NAVIGATION
// ==============================================
 
// Function to start the sidebar navigation
function startSidebarNavigation() {
    // Get all the sidebar links
    var sidebarLinks = document.querySelectorAll(".sidebar-tab");
   
    // Check if any links found
    if (!sidebarLinks || sidebarLinks.length === 0) {
      console.log("No sidebar links found");
      return;
    }
   
    // Show the first active section
    showFirstActiveSection();
   
    // Add click events to all sidebar links
    for (var i = 0; i < sidebarLinks.length; i++) {
      sidebarLinks[i].addEventListener("click", function (e) {
        e.preventDefault();
        handleSidebarClick(this, sidebarLinks);
      });
    }
  }
   
  // Function to show the first active section
  function showFirstActiveSection() {
    // Find the first active link
    var activeLink = document.querySelector(".sidebar-tab.active");
   
    // If we found an active link, show its section
    if (activeLink) {
      var sectionId = activeLink.getAttribute("data-section");
      showSection(sectionId);
    }
  }
   
  // Function to handle sidebar link clicks
  function handleSidebarClick(clickedLink, allLinks) {
    // Remove active class from all links
    for (var i = 0; i < allLinks.length; i++) {
      allLinks[i].classList.remove("active");
    }
   
    // Add active class to clicked link
    clickedLink.classList.add("active");
   
    // Get the section to show
    var sectionId = clickedLink.getAttribute("data-section");
   
    // Show the section
    showSection(sectionId);
   
    // Update the header title
    var sectionTitle = document.getElementById("sectionTitle");
    if (sectionTitle) {
      sectionTitle.textContent = clickedLink.textContent.trim();
    }
   
    // Handle special sections (events and tasks)
    if (sectionId === "events" || sectionId === "tasks") {
      resetTabs(sectionId);
    }
  }
   
  // Function to show a section and hide others
  function showSection(sectionId) {
    // Get all content sections
    var sections = document.querySelectorAll(".content-section");
   
    // Hide all sections
    for (var i = 0; i < sections.length; i++) {
      sections[i].classList.remove("active");
    }
   
    // Show the selected section
    var selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
      selectedSection.classList.add("active");
    }
  }
   
  // Function to reset tabs in events and tasks sections
  function resetTabs(sectionId) {
    // Get the section
    var section = document.getElementById(sectionId);
    if (!section) return;
   
    // Get all tabs in the section
    var tabs = section.querySelectorAll(".tab");
   
    // Remove active class from all tabs
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove("active");
    }
   
    // Make the first tab active
    if (tabs[0]) {
      tabs[0].classList.add("active");
    }
   
    // Get all tab contents
    var contents = section.querySelectorAll(".tab-content");
   
    // Hide all tab contents
    for (var i = 0; i < contents.length; i++) {
      contents[i].classList.remove("active");
    }
   
    // Show the default content
    var defaultContentId = sectionId === "events" ? "pending" : "pendingTasks";
    var defaultContent = document.getElementById(defaultContentId);
    if (defaultContent) {
      defaultContent.classList.add("active");
    }
  }

  // ==============================================
// EVENT TABS FUNCTIONALITY
// ==============================================
 
// Function to start the event tabs
function startEventTabs() {
    // Get all tab buttons
    var tabButtons = document.querySelectorAll(".tab");
   
    // Check if we found any tabs
    if (!tabButtons || tabButtons.length === 0) {
      console.log("No event tabs found");
      return;
    }
   
    // Add click events to all tabs
    for (var i = 0; i < tabButtons.length; i++) {
      tabButtons[i].addEventListener("click", function () {
        handleTabClick(this, tabButtons);
      });
    }
  }
   
  // Function to handle tab clicks
  function handleTabClick(clickedTab, allTabs) {
    // Remove active class from all tabs
    for (var i = 0; i < allTabs.length; i++) {
      allTabs[i].classList.remove("active");
    }
   
    // Add active class to clicked tab
    clickedTab.classList.add("active");
   
    // Get the content to show
    var tabId = clickedTab.getAttribute("data-tab");
   
    // Hide all tab contents
    var contents = document.querySelectorAll(".tab-content");
    for (var i = 0; i < contents.length; i++) {
      contents[i].classList.remove("active");
    }
   
    // Show the selected content
    var selectedContent = document.getElementById(tabId);
    if (selectedContent) {
      selectedContent.classList.add("active");
    }
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

// ============================================
// Dashboard Tasks List
// ============================================
// API Base URL
const apiUrl =
  "https://event-management-api-racelle-millagracias-projects.vercel.app";
 
// Fetch Events by Organizer
async function fetchEvents() {
  try {
    const response = await fetch(`${apiUrl}/api/events`);
    const events = await response.json();
 
    const eventSelect = document.querySelector("select");
    eventSelect.innerHTML = `<option value="">Select Event</option>`;
 
    events.forEach((event) => {
      const option = document.createElement("option");
      option.value = event._id;
      option.textContent = event.title;
      eventSelect.appendChild(option);
    });
 
    eventSelect.addEventListener("change", () =>
      fetchEventDetails(eventSelect.value)
    );
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}
 
// Fetch Tasks and Requests for a Specific Event
async function fetchEventDetails(eventId) {
  const tasksContainer = document.querySelector(".tasks .task-attribute-list");
  const requestsContainer = document.querySelector(".requests .task-attribute-list");
  const guestsContainer = document.querySelector(".guests .task-attribute-list");
 
  // If the user selects "Select Event", clear the content
  if (eventId === "") {
    tasksContainer.innerHTML = "";
    requestsContainer.innerHTML = "";
    guestsContainer.innerHTML = "";
    return; // Stop the function here
  }
 
  try {
    // Fetch Tasks
    const tasksResponse = await fetch(`${apiUrl}/api/tasks/${eventId}`);
    const tasks = await tasksResponse.json();
 
    tasksContainer.innerHTML = ""; // Clear previous tasks
    tasks.forEach((task) => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task-attribute");
      taskDiv.innerHTML = `<p>${task.title}</p><p>${new Date(task.dueDate).toLocaleDateString()}</p>`;
      tasksContainer.appendChild(taskDiv);
    });
 
    // Fetch Requests Related to the Event (With Vendor Names)
    const requestsResponse = await fetch(`${apiUrl}/api/requests/${eventId}`);
    const vendorRequests = await requestsResponse.json();
 
    requestsContainer.innerHTML = ""; // Clear previous requests
    vendorRequests.forEach((request) => {
      const requestDiv = document.createElement("div");
      requestDiv.classList.add("task-attribute");
      requestDiv.innerHTML = `<p>${request.vendorName}</p><p>${request.status}</p>`;
      requestsContainer.appendChild(requestDiv);
    });
 
    // Fetch Guests and Count Their Statuses
    const guestsResponse = await fetch(`${apiUrl}/api/guests/${eventId}`);
    const guests = await guestsResponse.json();
 
    // Count guest statuses
    const statusCounts = { confirmed: 0, pending: 0, declined: 0 };
    guests.forEach((guest) => {
      if (statusCounts.hasOwnProperty(guest.status)) {
        statusCounts[guest.status]++;
      }
    });
 
    // Update Guest Count Display
    guestsContainer.innerHTML = ""; // Clear previous counts
    Object.entries(statusCounts).forEach(([status, count]) => {
      const guestDiv = document.createElement("div");
      guestDiv.classList.add("task-attribute");
      guestDiv.innerHTML = `<p>${status.charAt(0).toUpperCase() + status.slice(1)}</p><p>${count}</p>`;
      guestsContainer.appendChild(guestDiv);
    });
 
  } catch (error) {
    console.error("Error fetching event details:", error);
  }
}

// Initial Fetch
fetchEvents();

