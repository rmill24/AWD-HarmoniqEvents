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
// Sign Out Button
// ============================================
document.querySelector(".sign-out").addEventListener("click", () => {
  // Clear stored data
  localStorage.removeItem("vendorId");
  localStorage.removeItem("organizerId");

  // Redirect to login page
  window.location.href = "/AWD-HarmoniqEvents/index.html";
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded");
  initThemeToggle();
  initMobileMenu();
});

// ==============================================
// START THE APPLICATION
// ==============================================

// Function to set up the initial state
function setupInitialState() {
  // Find the active sidebar link
  var activeLink = document.querySelector(".sidebar-tab.active");

  // If we found an active link, show its section
  if (activeLink) {
    var sectionId = activeLink.getAttribute("data-section");
    var section = document.getElementById(sectionId);
    if (section) {
      section.classList.add("active");
    }

    // Update the header title
    var sectionTitle = document.getElementById("sectionTitle");
    if (sectionTitle) {
      sectionTitle.textContent = activeLink.textContent.trim();
    }
  }
}

// Start everything when the page loads
document.addEventListener("DOMContentLoaded", function () {
  console.log("Starting the application...");

  // Start the sidebar navigation
  startSidebarNavigation();

  // Start the event tabs
  startEventTabs();

  // Set up the initial state
  setupInitialState();

  console.log("Application started successfully");
});

// ==============================================
// Modal Functionality
// ==============================================

const addButton = document.querySelector(".add-task-btn");
const modal = document.getElementById("addTaskModal");
const cancelButton = document.querySelector("#addTaskModal .cancel-modal");
const form = document.getElementById("addTaskForm");
const description = document.getElementById("taskDescription");
const counter = document.getElementById("currentCount");

// When you click the add button
addButton.onclick = function () {
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
};

// When you click the cancel button
cancelButton.onclick = function () {
  modal.classList.remove("active");
  document.body.style.overflow = "";
  form.reset();
  if (counter) counter.textContent = "0";
};

// When you click outside the modal
modal.onclick = function (event) {
  if (event.target == modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    form.reset();
    if (counter) counter.textContent = "0";
  }
};

// Add Vendor Modal Functionality
document.addEventListener("DOMContentLoaded", () => {
  const requestVendorModal = document.getElementById("requestVendorModal");

  if (!requestVendorModal) {
    console.error("Modal with id 'requestVendorModal' not found in the DOM.");
    return;
  }

  // Open modal when Add Vendor button is clicked
  document.addEventListener("click", (event) => {
    const addVendorButton = event.target.closest(".add-vendor");
    if (addVendorButton) {
      console.log("Add Vendor button clicked.");
      requestVendorModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  });

  // Close modal when Cancel button is clicked
  const cancelVendorButton = requestVendorModal.querySelector(".btn-secondary");
  if (cancelVendorButton) {
    cancelVendorButton.addEventListener("click", () => {
      console.log("Cancel button clicked.");
      requestVendorModal.classList.remove("active");
      document.body.style.overflow = "";
    });
  } else {
    console.error("Cancel button not found inside the modal.");
  }

  // Close modal when clicking outside
  requestVendorModal.addEventListener("click", (e) => {
    if (e.target === requestVendorModal) {
      console.log("Clicked outside modal content.");
      requestVendorModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});

// Edit Guest Modal
const editGuestButtons = document.querySelectorAll("#guests .edit-guest-btn");
const editGuestModal = document.getElementById("editGuestModal");
const editGuestCancelButton = editGuestModal.querySelector(".cancel-modal");
const editGuestForm = document.getElementById("editGuestForm");

// When you click any edit button in the guests table
editGuestButtons.forEach((button) => {
  button.addEventListener("click", function () {
    editGuestModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

// When you click the cancel button
editGuestCancelButton.addEventListener("click", function () {
  editGuestModal.classList.remove("active");
  document.body.style.overflow = "";
  editGuestForm.reset();
});

// When you click outside the modal
editGuestModal.addEventListener("click", function (event) {
  if (event.target === editGuestModal) {
    editGuestModal.classList.remove("active");
    document.body.style.overflow = "";
    editGuestForm.reset();
  }
});

// ============================================
// Welcome message
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  const organizerId = localStorage.getItem("organizerId");

  if (!organizerId) {
    alert("You are not logged in. Please log in first.");
    window.location.href = "/AWD-HarmoniqEvents/index.html"; // Redirect to login page
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
  const requestsContainer = document.querySelector(
    ".requests .task-attribute-list"
  );
  const guestsContainer = document.querySelector(
    ".guests .task-attribute-list"
  );

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
      taskDiv.innerHTML = `<p>${task.title}</p><p>${new Date(
        task.dueDate
      ).toLocaleDateString()}</p>`;
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
      guestDiv.innerHTML = `<p>${
        status.charAt(0).toUpperCase() + status.slice(1)
      }</p><p>${count}</p>`;
      guestsContainer.appendChild(guestDiv);
    });
  } catch (error) {
    console.error("Error fetching event details:", error);
  }
}

// Initial Fetch
fetchEvents();

// ==============================================
// EVENTS MANAGEMENT
// ==============================================
document.addEventListener("DOMContentLoaded", async () => {
  const organizerId = localStorage.getItem("organizerId");

  try {
    const response = await fetch(
      `https://event-management-api-racelle-millagracias-projects.vercel.app/api/events?organizerId=${organizerId}`
    );
    const events = await response.json();

    if (response.ok) {
      populateEventTables(events);
    } else {
      console.error("Error fetching events:", events);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
});

// Populate event tables dynamically
async function populateEventTables(events) {
  const pendingTable = document.querySelector("#pending tbody");
  const completedTable = document.querySelector("#completed tbody");

  pendingTable.innerHTML = "";
  completedTable.innerHTML = "";

  const today = new Date().toISOString().split("T")[0]; // Get today's date

  events.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort events by date

  for (const event of events) {
    const row = document.createElement("tr");

    let eventDateTime = event.date ? new Date(event.date) : null;
    let eventDate = eventDateTime
      ? eventDateTime.toLocaleDateString("en-CA")
      : "N/A";
    let eventTime = eventDateTime
      ? eventDateTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : "N/A";

    // If event is pending but past today, auto-mark it as completed
    if (event.status === "pending" && eventDate < today) {
      await updateEventStatus(event._id, "completed");
      event.status = "completed";
    }

    row.innerHTML = `
            <td>${event.title}</td>
            <td>${event.description || "-"}</td>
            <td>${eventDate} ${eventTime}</td>
            <td>${event.venue || "<i>Venue not assigned</i>"}</td>
            <td>${event.expectedGuests || "Not Specified"}</td>
            <td>${event.guestCount || "-"}</td>
            <td>
                ${
                  event.status === "pending"
                    ? `<button class="edit-event-button" data-event-id="${event._id}">
                        <i class="fa-solid fa-pen"></i>
                    </button>`
                    : ""
                }
                <button class="delete-event-btn" data-event-id="${event._id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;

    if (event.status === "pending") {
      pendingTable.appendChild(row);
    } else if (event.status === "completed") {
      completedTable.appendChild(row);
    }
  }
}

//  Add Event Modal
const addEventButton = document.querySelector(".add-event-btn");
const addEventModal = document.getElementById("addEventModal");
const eventCancelButton = addEventModal.querySelector(".cancel-modal");
const eventForm = document.getElementById("addEventForm");
const eventDescription = document.getElementById("eventDescription");
const eventDescriptionCounter = document.getElementById(
  "eventDescriptionCount"
);

// Open Add Event Modal
addEventButton.addEventListener("click", () => {
  addEventModal.classList.add("active");
  document.body.style.overflow = "hidden";
});

// Close Add Event Modal
eventCancelButton.addEventListener("click", closeAddEventModal);

function closeAddEventModal() {
  addEventModal.classList.remove("active");
  document.body.style.overflow = "";
  eventForm.reset();
  eventDescriptionCounter.textContent = "0";
}

//  Handle Adding an Event
document
  .getElementById("addEventForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const organizerId = localStorage.getItem("organizerId");

    if (!organizerId) {
      alert("You must be logged in to add an event.");
      return;
    }

    const dateValue = document.getElementById("eventDate").value;
    const timeValue = document.getElementById("eventTime").value;

    // Convert user input time to UTC before storing
    const fullDateTime =
      dateValue && timeValue
        ? new Date(`${dateValue}T${timeValue}`).toISOString()
        : null;

    const eventData = {
      organizerId: organizerId,
      title: document.getElementById("eventTitle").value,
      description: document.getElementById("eventDescription").value,
      date: fullDateTime,
      expectedGuests: document.getElementById("eventGuests").value,
      status: "pending",
    };

    try {
      const response = await fetch(
        "https://event-management-api-racelle-millagracias-projects.vercel.app/api/events",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(eventData),
        }
      );

      if (response.ok) {
        addEventModal.classList.remove("active");
        alert("Event created successfully!");

        // Fetch and refresh the events
        const organizerId = localStorage.getItem("organizerId");
        const eventsResponse = await fetch(
          `https://event-management-api-racelle-millagracias-projects.vercel.app/api/events?organizerId=${organizerId}`
        );
        const events = await eventsResponse.json();
        populateEventTables(events); // Refresh the event tables
      } else {
        alert("Error adding event.");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  });

//  Handle Edit Event Modal
const editEventModal = document.getElementById("editEventModal");
const editEventCancelButton = editEventModal.querySelector(".cancel-modal");
const editEventForm = document.getElementById("editEventForm");

// Handle Updating an Event
document
  .getElementById("editEventForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const eventId = e.target.dataset.eventId;

    const dateValue = document.getElementById("editEventDate").value;
    const timeValue = document.getElementById("editEventTime").value;

    // Convert user input time to UTC before storing
    const fullDateTime =
      dateValue && timeValue
        ? new Date(`${dateValue}T${timeValue}`).toISOString()
        : null;

    const updatedData = {
      title: document.getElementById("editEventTitle").value,
      description: document.getElementById("editEventDescription").value,
      date: fullDateTime,
      expectedGuests: document.getElementById("editEventGuests").value,
    };

    try {
      const response = await fetch(
        `https://event-management-api-racelle-millagracias-projects.vercel.app/api/events/${eventId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        closeEditEventModal();
        alert("Event updated successfully!");

        // Fetch and refresh the events
        const organizerId = localStorage.getItem("organizerId");
        const eventsResponse = await fetch(
          `https://event-management-api-racelle-millagracias-projects.vercel.app/api/events?organizerId=${organizerId}`
        );
        const events = await eventsResponse.json();
        populateEventTables(events); // Refresh the event tables
      } else {
        alert("Error updating event.");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  });

// Function to update event status in the backend
async function updateEventStatus(eventId, newStatus) {
  try {
    const response = await fetch(
      `https://event-management-api-racelle-millagracias-projects.vercel.app/api/events/${eventId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    if (!response.ok) {
      console.error(`Failed to update event ${eventId} to ${newStatus}`);
    }
  } catch (error) {
    console.error("Error updating event status:", error);
  }
}

// Prevent editing completed events
document.addEventListener("click", (event) => {
  if (event.target.closest(".edit-event-button")) {
    if (event.target.closest(".edit-event-button").hasAttribute("disabled")) {
      alert("Completed events cannot be edited.");
      return;
    }
    const eventId = event.target.closest(".edit-event-button").dataset.eventId;
    openEditModal(eventId);
  }
});

// Open Edit Event Modal
document.addEventListener("click", (event) => {
  const editButton = event.target.closest(".edit-event-button");

  if (editButton) {
    if (editButton.hasAttribute("disabled")) {
      alert("Completed events cannot be edited.");
      return;
    }

    const eventId = editButton.dataset.eventId;
    openEditModal(eventId);
  }
});

// Close Edit Event Modal
editEventCancelButton.addEventListener("click", closeEditEventModal);

function closeEditEventModal() {
  editEventModal.classList.remove("active");
  document.body.style.overflow = "";
  editEventForm.reset();
}

// Open Edit Modal and Populate Fields
function openEditModal(eventId) {
  fetch(
    `https://event-management-api-racelle-millagracias-projects.vercel.app/api/events/${eventId}`
  )
    .then((response) => response.json())
    .then((event) => {
      if (!event) {
        alert("Event not found.");
        return;
      }

      const eventDateTime = event.date ? new Date(event.date) : null;

      document.getElementById("editEventTitle").value = event.title;
      document.getElementById("editEventDescription").value =
        event.description || "";
      document.getElementById("editEventDate").value = eventDateTime
        ? eventDateTime.toISOString().split("T")[0] // Convert UTC to YYYY-MM-DD
        : "";

      document.getElementById("editEventTime").value = eventDateTime
        ? eventDateTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }) // Show in local time
        : "";

      document.getElementById("editEventGuests").value =
        event.expectedGuests || "";
      document.getElementById("editEventForm").dataset.eventId = eventId;

      document.getElementById("editEventModal").classList.add("active");
      document.body.style.overflow = "hidden";
    })
    .catch((error) => console.error("Error fetching event details:", error));
}

// Handle deleting events
document.addEventListener("click", async (event) => {
  const deleteButton = event.target.closest(".delete-event-btn"); // Ensure it works even if clicking the icon inside

  if (!deleteButton) return; // Exit if not clicking the delete button

  const eventId = deleteButton.dataset.eventId;

  if (!confirm("Are you sure you want to delete this event?")) return;

  try {
    const response = await fetch(
      `https://event-management-api-racelle-millagracias-projects.vercel.app/api/events/${eventId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      alert("Event deleted successfully!");
      // Fetch and refresh the events
      const organizerId = localStorage.getItem("organizerId");
      const eventsResponse = await fetch(
        `https://event-management-api-racelle-millagracias-projects.vercel.app/api/events?organizerId=${organizerId}`
      );
      const events = await eventsResponse.json();
      populateEventTables(events); // Refresh the event tables
    } else {
      alert("Failed to delete event.");
    }
  } catch (error) {
    console.error("Error deleting event:", error);
  }
});

// ==============================================
// TASKS MANAGEMENT
// ==============================================
let eventDates = {};

function formatDateTime(dateString) {
  const date = new Date(dateString);

  // Extract individual parts
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // Convert 24-hour time to 12-hour format

  return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
}

// Fetch Events for Dropdown
async function loadEventDropdown() {
  try {
    const response = await fetch(`${apiUrl}/api/events`);
    const events = await response.json();

    const eventDropdown = document.querySelector(".event-dropdown-task");
    const eventDateDisplay = document.getElementById("event-date-display");
    eventDropdown.innerHTML = `<option value="">Select Event</option>`;

    events.forEach((event) => {
      eventDates[event._id] = new Date(event.date); // Store event date
      const option = document.createElement("option");
      option.value = event._id;
      option.textContent = event.title;
      eventDropdown.appendChild(option);
    });

    // Listen for event selection change
    eventDropdown.addEventListener("change", () => {
      const selectedEventId = eventDropdown.value;
      if (selectedEventId) {
        const eventDate = eventDates[selectedEventId];
        eventDateDisplay.textContent = `Event Date: ${eventDate.toLocaleDateString()}`;
        loadTasksForEvent(selectedEventId); // Load tasks
      } else {
        eventDateDisplay.textContent = ""; // Clear if no event selected
        document.getElementById("tasksTableBody").innerHTML = "";
        document.querySelector("#completedTasks tbody").innerHTML = "";
      }
    });
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

// Fetch Tasks for Selected Event
async function loadTasksForEvent(eventId) {
  const tasksTableBody = document.getElementById("tasksTableBody");
  const completedTasksTableBody = document.querySelector(
    "#completedTasks tbody"
  );

  if (eventId === "") {
    tasksTableBody.innerHTML = "";
    completedTasksTableBody.innerHTML = "";
    return;
  }

  try {
    // Fetch tasks
    const response = await fetch(`${apiUrl}/api/tasks/${eventId}`);
    let tasks = await response.json();

    // Fetch pending vendor requests for this event
    const requestResponse = await fetch(`${apiUrl}/api/requests/${eventId}`);
    const vendorRequests = await requestResponse.json();

    // Sort tasks by dueDate
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    tasksTableBody.innerHTML = "";
    completedTasksTableBody.innerHTML = "";

    const today = new Date();

    for (const task of tasks) {
      const row = document.createElement("tr");

      const taskDueDate = new Date(task.dueDate);
      const isPastCompleted =
        task.status === "completed" && taskDueDate < today;

      let vendorDisplay = "";

      let requestedVendor = vendorRequests.find(
        (req) => req.taskId === task._id.toString()
      );

      if (task.assignedVendorId) {
        // Vendor has accepted the request
        try {
          const vendorResponse = await fetch(
            `${apiUrl}/api/vendors/${task.assignedVendorId}`
          );
          if (vendorResponse.ok) {
            const vendorData = await vendorResponse.json();
            vendorDisplay = `<span>${vendorData.name}</span>`;
          } else {
            vendorDisplay = `<span>Vendor Assigned</span>`;
          }
        } catch (error) {
          console.error("Error fetching assigned vendor details:", error);
          vendorDisplay = `<span>Vendor Assigned</span>`;
        }
      } else if (requestedVendor && requestedVendor.status === "pending") {
        vendorDisplay = `<span>Request sent to: ${requestedVendor.vendorName} (${requestedVendor.serviceType})</span>`;
      } else {
        // No vendor assigned, show add vendor button
        vendorDisplay = isPastCompleted
          ? `<button class="disabled-btn" disabled>
                 <i class="fa-solid fa-ban"></i> Cannot Request Vendor
               </button>`
          : `<button class="add-vendor" data-task-id="${task._id}">
                 <i class="fa-solid fa-plus"></i> Request Vendor
               </button>`;
      }

      // Toggle Task Status Button
      const toggleStatusButton = isPastCompleted
        ? `<button class="disabled-btn" disabled>
               <i class="fa-solid fa-ban"></i> Cannot Revert
             </button>`
        : `<button class="toggle-status-btn" data-task-id="${
            task._id
          }" data-status="${task.status}">
               ${
                 task.status === "completed"
                   ? `<i class="fa-solid fa-arrow-rotate-left"></i> Mark as Pending`
                   : `<i class="fa-solid fa-check"></i> Mark as Complete`
               }
             </button>`;

      row.innerHTML = `
          <td>${task.title}</td>
          <td>${task.description || "-"}</td>
          <td>${formatDateTime(task.dueDate)}</td>
          <td>${task.status}</td>
          <td>${vendorDisplay}</td>
          <td>
            ${toggleStatusButton}
            <button class="edit-task-btn" data-task-id="${task._id}">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="delete-task-btn" data-task-id="${task._id}">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        `;

      if (task.status === "completed") {
        completedTasksTableBody.appendChild(row);
      } else {
        tasksTableBody.appendChild(row);
      }
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

// Toggle Task Status (Complete ↔ Pending)
document.addEventListener("click", async (event) => {
  if (event.target.closest(".toggle-status-btn")) {
    const button = event.target.closest(".toggle-status-btn");
    const taskId = button.getAttribute("data-task-id");
    const currentStatus = button.getAttribute("data-status");

    if (!taskId) {
      console.error("No Task ID found!");
      return;
    }

    const newStatus = currentStatus === "completed" ? "pending" : "completed";

    try {
      const response = await fetch(`${apiUrl}/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        alert(`Task marked as ${newStatus}`);
        loadTasksForEvent(document.querySelector(".event-dropdown-task").value);
      } else {
        console.error("Failed to update task status:", await response.text());
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  }
});

// Initialize Dropdown and Fetch Events
loadEventDropdown();

document.addEventListener("DOMContentLoaded", () => {
  const editTaskModal = document.getElementById("editTaskModal");
  const editTaskForm = document.getElementById("editTaskForm");
  let currentEditingTaskId = null;

  // Open Edit Task Modal
  document.addEventListener("click", async (event) => {
    const editButton = event.target.closest(".edit-task-btn");
    if (editButton) {
      const taskId = editButton.getAttribute("data-task-id");

      console.log("Editing Task ID:", taskId); // Debugging

      if (!taskId) {
        console.error("No Task ID found!");
        return;
      }

      // Store taskId for later use in the update function
      currentEditingTaskId = taskId;

      try {
        const response = await fetch(`${apiUrl}/api/tasks/task/${taskId}`);

        if (!response.ok) {
          console.error("Error fetching task details:", await response.text());
          return;
        }

        const task = await response.json();

        // Ensure task.dueDate exists before using .split()
        if (!task || !task.dueDate) {
          console.error("Task data is missing or invalid:", task);
          alert("Error: Task data is missing. Please try again.");
          return;
        }

        // Populate the modal with task data
        document.getElementById("editTaskTitle").value = task.title || "";
        document.getElementById("editTaskDescription").value =
          task.description || "";

        // Ensure dueDate is valid
        const taskDate = new Date(task.dueDate);
        if (isNaN(taskDate.getTime())) {
          console.error("Invalid date format:", task.dueDate);
          alert("Error: Task has an invalid date.");
          return;
        }

        document.getElementById("editTaskDate").value =
          task.dueDate.split("T")[0];
          const hours = taskDate.getHours().toString().padStart(2, "0");
          const minutes = taskDate.getMinutes().toString().padStart(2, "0");
          
          document.getElementById("editTaskTime").value = `${hours}:${minutes}`;
          

        // Show the modal
        document.getElementById("editTaskModal").classList.add("active");
        document.body.style.overflow = "hidden";
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    }
  });

  // Handle Edit Task Form Submission
  document
    .getElementById("editTaskForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!currentEditingTaskId) return;

      const taskDateInput = document.getElementById("editTaskDate").value;
      const taskDueDate = new Date(taskDateInput);

      const selectedEventId = document.querySelector(
        ".event-dropdown-task"
      ).value;
      const eventDate = eventDates[selectedEventId]; // Get event date

      if (taskDueDate > eventDate) {
        alert("Task due date cannot be later than the event date.");
        return;
      }

      const updatedTask = {
        title: document.getElementById("editTaskTitle").value,
        description: document.getElementById("editTaskDescription").value,
        dueDate: new Date(
          `${taskDateInput}T${document.getElementById("editTaskTime").value}`
        ).toISOString(),
      };

      try {
        const response = await fetch(
          `${apiUrl}/api/tasks/${currentEditingTaskId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTask),
          }
        );

        if (response.ok) {
          alert("Task updated successfully!");
          document.getElementById("editTaskModal").classList.remove("active");
          loadTasksForEvent(selectedEventId);
        } else {
          console.error("Failed to update task:", await response.text());
        }
      } catch (error) {
        console.error("Error updating task:", error);
      }
    });

  // ============================
  // DELETE TASK FUNCTIONALITY
  // ============================
  document.addEventListener("click", async (event) => {
    if (event.target.closest(".delete-task-btn")) {
      const taskId = event.target.getAttribute("data-task-id");

      console.log(taskId);

      if (!taskId) {
        console.error("No Task ID found for deletion!");
        return;
      }

      const confirmDelete = confirm(
        "Are you sure you want to delete this task?"
      );
      if (!confirmDelete) return;

      try {
        const response = await fetch(`${apiUrl}/api/tasks/${taskId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Task deleted successfully!");
          loadTasksForEvent(
            document.querySelector(".event-dropdown-task").value
          ); // Refresh task list
        } else {
          console.error("Failed to delete task:", await response.text());
        }
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  });

  // Close Edit Modal
  document.querySelectorAll(".cancel-modal").forEach((btn) => {
    btn.addEventListener("click", () => {
      editTaskModal.classList.remove("active");
    });
  });

  // ============================
  // ADD VENDOR FUNCTIONALITY
  // ============================
  const requestVendorModal = document.getElementById("requestVendorModal");
  const categoryDropdown = requestVendorModal.querySelector("#vendorCategory");
  const vendorDropdown = requestVendorModal.querySelector("#vendorList");
  const confirmVendorBtn = requestVendorModal.querySelector(".btn-primary");
  let currentTaskForVendor = null;

  // Open Add Vendor Modal
  document.addEventListener("click", async (event) => {
    if (event.target.classList.contains("add-vendor")) {
      currentTaskForVendor = event.target.getAttribute("data-task-id");

      if (!currentTaskForVendor) {
        console.error("No Task ID found for adding a vendor!");
        return;
      }

      try {
        // Fetch Unique Service Categories
        const response = await fetch(`${apiUrl}/api/vendors`);
        if (!response.ok) {
          console.error("Error fetching vendors:", await response.text());
          return;
        }

        const vendors = await response.json();

        // Extract unique categories from vendors
        const categories = [
          ...new Set(vendors.map((vendor) => vendor.serviceType)),
        ];

        // Populate Category Dropdown
        categoryDropdown.innerHTML = `<option disabled selected>Select Category</option>`;
        categories.forEach((category) => {
          const option = document.createElement("option");
          option.value = category;
          option.textContent = category;
          categoryDropdown.appendChild(option);
        });

        // Show Modal
        requestVendorModal.classList.add("active");
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    }
  });

  // Fetch Vendors Based on Selected Category
  categoryDropdown.addEventListener("change", async () => {
    const selectedCategory = categoryDropdown.value;
    if (!selectedCategory) return;

    try {
      const response = await fetch(
        `${apiUrl}/api/vendors?serviceType=${selectedCategory}`
      );
      if (!response.ok) {
        console.error("Error fetching vendors:", await response.text());
        return;
      }

      const vendors = await response.json();

      // Populate Vendor Dropdown
      vendorDropdown.innerHTML = `<option disabled selected>Select Vendor</option>`;
      vendors.forEach((vendor) => {
        const option = document.createElement("option");
        option.value = vendor._id;
        option.textContent = vendor.name;
        vendorDropdown.appendChild(option);
      });

      // Clear Venue Details when category changes
      document.getElementById("venueDetailsContainer").style.display = "none";
    } catch (error) {
      console.error("Error fetching vendors by category:", error);
    }
  });

  vendorDropdown.addEventListener("change", async () => {
    const selectedVendorId = vendorDropdown.value;
    if (!selectedVendorId) return;

    console.log("Selected Vendor ID:", selectedVendorId); // Debugging

    try {
      const response = await fetch(`${apiUrl}/api/vendors/${selectedVendorId}`);
      if (!response.ok) {
        console.error("Error fetching vendor details:", await response.text());
        return;
      }

      const vendor = await response.json();
      console.log("Fetched Vendor Data:", vendor); // Debugging

      // Check if vendor is a Venue Manager and has venue details
      if (vendor.serviceType === "Venue Manager" && vendor.venueDetails) {
        console.log("Vendor is a Venue Manager. Showing details..."); // Debugging
        document.getElementById("venueName").textContent =
          vendor.venueDetails.name || "N/A";
        document.getElementById("venueLocation").textContent =
          vendor.venueDetails.location || "N/A";
        document.getElementById("venueCapacity").textContent =
          vendor.venueDetails.capacity || "N/A";
        document.getElementById("venueAmenities").textContent =
          vendor.venueDetails.amenities?.join(", ") || "None";

        // Show venue details section
        document.getElementById("venueDetailsContainer").style.display =
          "block";
      } else {
        console.log("Vendor is NOT a Venue Manager. Hiding details..."); // Debugging
        document.getElementById("venueDetailsContainer").style.display = "none";
      }
    } catch (error) {
      console.error("Error fetching vendor details:", error);
    }
  });

  // Handle Assign Vendor Confirmation
  confirmVendorBtn.addEventListener("click", async () => {
    if (!currentTaskForVendor) return;

    const selectedVendorId = vendorDropdown.value;
    if (!selectedVendorId) {
      alert("Please select a vendor.");
      return;
    }

    try {
      const selectedEventId = document.querySelector(
        ".event-dropdown-task"
      ).value;

      const response = await fetch(`${apiUrl}/api/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vendorId: selectedVendorId,
          eventId: selectedEventId,
          taskId: currentTaskForVendor, // Ensure correct event association
        }),
      });

      if (response.ok) {
        alert("Vendor request sent successfully!");
        requestVendorModal.style.display = "none";
        loadTasksForEvent(selectedEventId); // Reload tasks for the selected event
      } else {
        const errorData = await response.json(); // Read error response
        if (response.status === 422) {
          alert(errorData.message); // Display validation error
        } else {
          alert("Failed to send vendor request. Please try again.");
          console.error("Error:", errorData);
        }
      }
    } catch (error) {
      console.error("Error sending vendor request:", error);
      alert("An error occurred while sending the request.");
    }
  });

  // Close Modal on Cancel
  requestVendorModal
    .querySelector(".btn-secondary")
    .addEventListener("click", () => {
      requestVendorModal.classList.remove("active");
    });

  // ============================
  // ADD TASK FUNCTIONALITY
  // ============================
  const addTaskModal = document.getElementById("addTaskModal");
  const addTaskForm = document.getElementById("addTaskForm");
  const eventDropdown = document.querySelector(".event-dropdown-task");

  // OPEN ADD TASK MODAL
  document.querySelector(".add-task-btn").addEventListener("click", () => {
    const selectedEventId = eventDropdown.value;

    if (!selectedEventId) {
      alert("Please select an event first.");
      addTaskModal.classList.remove("active");
      return;
    }

    // Reset Form Fields
    addTaskForm.reset();

    // Show Modal
    addTaskModal.classList.add("active");
  });

  // HANDLE ADD TASK FORM SUBMISSION
  document
    .getElementById("addTaskForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const selectedEventId = document.querySelector(
        ".event-dropdown-task"
      ).value;
      if (!selectedEventId) {
        alert("Please select an event first.");
        return;
      }

      const eventDate = eventDates[selectedEventId]; // Get event date
      const taskDateInput = document.getElementById("taskDate").value;
      const taskDueDate = new Date(taskDateInput);

      if (taskDueDate > eventDate) {
        alert("Task due date cannot be later than the event date.");
        return;
      }

      const newTask = {
        title: document.getElementById("taskTitle").value,
        description: document.getElementById("taskDescription").value,
        dueDate: new Date(
          `${taskDateInput}T${document.getElementById("taskTime").value}`
        ).toISOString(),
        eventId: selectedEventId,
      };

      try {
        const response = await fetch(`${apiUrl}/api/tasks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask),
        });

        if (response.ok) {
          alert("Task added successfully!");
          document.getElementById("addTaskModal").classList.remove("active");
          loadTasksForEvent(selectedEventId); // Refresh tasks
        } else {
          console.error("Failed to add task:", await response.text());
        }
      } catch (error) {
        console.error("Error adding task:", error);
      }
    });

  // Close Modal on Cancel
  addTaskModal.querySelector(".btn-secondary").addEventListener("click", () => {
    addTaskModal.classList.remove("active");
  });

  async function autoCompleteExpiredTasks() {
    try {
      console.log("Checking for expired tasks...");

      const response = await fetch(`${apiUrl}/api/tasks`);
      if (!response.ok) {
        console.error("Error fetching tasks:", await response.text());
        return;
      }

      const tasks = await response.json();
      const today = new Date();

      for (const task of tasks) {
        const taskDueDate = new Date(task.dueDate);

        // If the task is pending and past due, update it to completed
        if (task.status === "pending" && taskDueDate < today) {
          await updateTaskStatus(task._id, "completed");
          task.status = "completed"; // Reflect the change in local data
          console.log(`Updated Task ${task._id} to Completed`);
        }
      }

      // Refresh task lists
      loadTasksForEvent(document.querySelector(".event-dropdown-task").value);
    } catch (error) {
      console.error("Error updating expired tasks:", error);
    }
  }

  // Function to update a task's status
  async function updateTaskStatus(taskId, newStatus) {
    try {
      const response = await fetch(`${apiUrl}/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        console.error(`Failed to update task ${taskId} to ${newStatus}`);
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  }

  // Run the function every minute to check for expired tasks
  autoCompleteExpiredTasks();
  setInterval(autoCompleteExpiredTasks, 60000);
});

// ==============================================
// GUESTS MANAGEMENT
// ==============================================

async function loadGuestEventDropdown() {
  try {
    const response = await fetch(`${apiUrl}/api/events`);
    const events = await response.json();

    const eventDropdown = document.querySelector(".event-dropdown-guests");
    eventDropdown.innerHTML = `<option value="">Select Event</option>`;

    events.forEach((event) => {
      const option = document.createElement("option");
      option.value = event._id;
      option.textContent = event.title;
      eventDropdown.appendChild(option);
    });

    // Load guests when an event is selected
    eventDropdown.addEventListener("change", () => {
      loadGuestsForEvent(eventDropdown.value);
    });
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

async function loadGuestsForEvent(eventId) {
  const guestsTableBody = document.querySelector(".guest-table tbody");
  const guestCountList = document.querySelector(".guest-count-list");
  const eventDateDisplay = document.getElementById("event-date-display-guest");

  if (eventId === "") {
    guestsTableBody.innerHTML =
      "<tr><td colspan='6'>No event selected</td></tr>";
    guestCountList.innerHTML = `
        <div class="guest-attribute">
          <p>0</p>
          <p>0</p>
          <p>0</p>
        </div>
      `;
    eventDateDisplay.textContent = "No event selected";
    return;
  }

  try {
    // Fetch event details to get the date
    const eventResponse = await fetch(`${apiUrl}/api/events/${eventId}`);
    const eventData = await eventResponse.json();

    if (!eventResponse.ok) {
      throw new Error("Failed to fetch event details");
    }

    // Convert event date to MM/DD/YYYY format
    const eventDate = new Date(eventData.date);
    const formattedDate = `${eventDate.getMonth() + 1}/${eventDate.getDate()}/${eventDate.getFullYear()}`;

    // Update event date display
    eventDateDisplay.textContent = `Event Date: ${formattedDate}`;

    // Fetch guests
    const response = await fetch(`${apiUrl}/api/guests/${eventId}`);
    const guests = await response.json();

    // Count guests based on status
    const statusCounts = { confirmed: 0, pending: 0, declined: 0 };
    guests.forEach((guest) => {
      if (statusCounts.hasOwnProperty(guest.status)) {
        statusCounts[guest.status]++;
      }
    });

    // Update the guest count display
    guestCountList.innerHTML = `
        <div class="guest-attribute">
          <p>${statusCounts.confirmed}</p>
          <p>${statusCounts.pending}</p>
          <p>${statusCounts.declined}</p>
        </div>
      `;

    // Populate the guest table
    guestsTableBody.innerHTML = ""; // Clear previous data
    guests.forEach((guest) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${guest.name}</td>
          <td>${guest.email}</td>
          <td>${guest.phone || "-"}</td>
          <td>
            <span class="status-badge status-${guest.status.toLowerCase()}">${
        guest.status
      }</span>
          </td>
          <td>
            <button class="edit-guest-btn" data-guest-id="${guest._id}">
              <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <button class="delete-guest-btn" data-guest-id="${guest._id}">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        `;
      guestsTableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching guests or event details:", error);
  }
}

// Initialize Guest Event Dropdown
loadGuestEventDropdown();

// ==============================================
// ADD GUEST FUNCTIONALITY
// ==============================================

document.querySelector(".add-guest-btn").addEventListener("click", () => {
  const selectedEventId = document.querySelector(
    ".event-dropdown-guests"
  ).value;

  if (!selectedEventId) {
    alert("Please select an event first.");
    return;
  }

  // Reset form fields before opening the modal
  document.getElementById("addGuestForm").reset();

  // Show modal
  document.getElementById("addGuestModal").classList.add("active");
});

document
  .getElementById("addGuestForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const selectedEventId = document.querySelector(
      ".event-dropdown-guests"
    ).value;
    if (!selectedEventId) {
      alert("Please select an event first.");
      return;
    }

    const newGuest = {
      name: document.getElementById("guestName").value,
      email: document.getElementById("guestEmail").value,
      phone: document.getElementById("guestPhone").value,
      status: document.getElementById("guestStatus").value,
      eventId: selectedEventId, // Assign guest to selected event
    };

    try {
      const response = await fetch(`${apiUrl}/api/guests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGuest),
      });

      if (response.ok) {
        alert("Guest added successfully!");
        document.getElementById("addGuestModal").classList.remove("active");
        loadGuestsForEvent(selectedEventId); // Refresh the guest list
      } else {
        console.error("Failed to add guest:", await response.text());
      }
    } catch (error) {
      console.error("Error adding guest:", error);
    }
  });

document.querySelectorAll(".cancel-modal").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.getElementById("addGuestModal").classList.remove("active");
  });
});

// ==============================================
// EDIT GUEST FUNCTIONALITY
// ==============================================
let currentEditingGuestId = null;

document.addEventListener("click", async (event) => {
  if (event.target.closest(".edit-guest-btn")) {
    const guestId = event.target
      .closest(".edit-guest-btn")
      .getAttribute("data-guest-id");
    currentEditingGuestId = guestId; // Store the guest ID for editing

    console.log(guestId);

    if (!guestId) {
      console.error("No Guest ID found!");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/guests/guest/${guestId}`);

      if (!response.ok) {
        console.error("Error fetching guest details:", await response.text());
        return;
      }

      const guest = await response.json();

      // Populate the edit form with guest data
      document.getElementById("editGuestName").value = guest.name;
      document.getElementById("editGuestEmail").value = guest.email;
      document.getElementById("editGuestPhone").value = guest.phone || "";
      document.getElementById("editGuestStatus").value = guest.status;

      // Show the modal
      document.getElementById("editGuestModal").classList.add("active");
    } catch (error) {
      console.error("Error fetching guest details:", error);
    }
  }
});

// Handle Guest Form Submission
document
  .getElementById("editGuestForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!currentEditingGuestId) {
      console.error("No Guest ID found for editing!");
      return;
    }

    const updatedGuest = {
      name: document.getElementById("editGuestName").value,
      email: document.getElementById("editGuestEmail").value,
      phone: document.getElementById("editGuestPhone").value,
      status: document.getElementById("editGuestStatus").value,
    };

    try {
      const response = await fetch(
        `${apiUrl}/api/guests/${currentEditingGuestId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedGuest),
        }
      );

      if (response.ok) {
        alert("Guest information updated successfully!");
        document.getElementById("editGuestModal").classList.remove("active");
        loadGuestsForEvent(
          document.querySelector(".event-dropdown-guests").value
        ); // Refresh guest list
      } else {
        console.error("Failed to update guest:", await response.text());
      }
    } catch (error) {
      console.error("Error updating guest:", error);
    }
  });

document.querySelectorAll(".cancel-modal").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.getElementById("editGuestModal").classList.remove("active");
  });
});

// ==============================================
// DELETE GUEST FUNCTIONALITY
// ==============================================
document.addEventListener("click", async (event) => {
    if (event.target.closest(".delete-guest-btn")) {
      const guestId = event.target
        .closest(".delete-guest-btn")
        .getAttribute("data-guest-id");
   
      if (!guestId) {
        console.error("No Guest ID found for deletion!");
        return;
      }
   
      const confirmDelete = confirm(
        "Are you sure you want to delete this guest?"
      );
      if (!confirmDelete) return;
   
      try {
        const response = await fetch(`${apiUrl}/api/guests/${guestId}`, {
          method: "DELETE",
        });
   
        if (response.ok) {
          alert("Guest deleted successfully!");
          loadGuestsForEvent(
            document.querySelector(".event-dropdown-guests").value
          ); // Refresh guest list
        } else {
          console.error("Failed to delete guest:", await response.text());
        }
      } catch (error) {
        console.error("Error deleting guest:", error);
      }
    }
  });

  // ==============================================
// REQUESTS MANAGEMENT
// ==============================================
async function loadRequestEventDropdown() {
    try {
      const response = await fetch(`${apiUrl}/api/events`);
      const events = await response.json();
   
      const eventDropdown = document.querySelector(".event-name-dropdown");
      eventDropdown.innerHTML = `<option value="">Select Event</option>`;
   
      events.forEach((event) => {
        const option = document.createElement("option");
        option.value = event._id;
        option.textContent = event.title;
        eventDropdown.appendChild(option);
      });
   
      // Load requests when an event is selected
      eventDropdown.addEventListener("change", () => {
        loadRequestsForEvent(eventDropdown.value);
      });
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }
   
  // Initialize the event dropdown
  loadRequestEventDropdown();
   
  async function loadRequestsForEvent(eventId) {
    const requestsTableBody = document.querySelector(".requests-table tbody");
   
    if (!eventId) {
      requestsTableBody.innerHTML =
        "<tr><td colspan='5'>No event selected</td></tr>";
      return;
    }
   
    try {
      const response = await fetch(`${apiUrl}/api/requests/${eventId}`);
      const requests = await response.json();
   
      requestsTableBody.innerHTML = ""; // Clear previous data
   
      requests.forEach((request) => {
        const isPending = request.status === "pending";
        const cancelBtn = isPending
          ? `<button class="cancel-request-btn" data-request-id="${request._id}">
                     <i class="fa-solid fa-ban"></i> Cancel
                   </button>`
          : `<button class="disabled-btn" disabled>
                     <i class="fa-solid fa-lock"></i> Cannot Cancel
                   </button>`;
   
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${request.taskName}</td>
                <td>${request.vendorName}</td>
                <td>${request.serviceType}</td>
                <td><span class="status-badge status-${request.status.toLowerCase()}">${
          request.status
        }</span></td>
                <td>${cancelBtn}</td>
            `;
        requestsTableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  }
   
  document.addEventListener("click", async (event) => {
    if (event.target.closest(".cancel-request-btn")) {
      const requestId = event.target
        .closest(".cancel-request-btn")
        .getAttribute("data-request-id");
   
      if (!requestId) {
        console.error("No Request ID found!");
        return;
      }
   
      const confirmCancel = confirm(
        "Are you sure you want to cancel this request?"
      );
      if (!confirmCancel) return;
   
      try {
        const response = await fetch(`${apiUrl}/api/requests/${requestId}`, {
          method: "DELETE",
        });
   
        if (response.ok) {
          alert("Request canceled successfully!");
          loadRequestsForEvent(
            document.querySelector(".event-name-dropdown").value
          ); // Refresh requests list
        } else {
          console.error("Failed to cancel request:", await response.text());
        }
      } catch (error) {
        console.error("Error canceling request:", error);
      }
    }
  });
