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
    themeIcon.textContent = theme === "dark" ? "☾" : "☼";
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
  window.location.href = "/AWD-HarmoniqEvents/index.html";
});

// ============================================
// Initialize on page load
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded");
  initThemeToggle();
});

// ============================================
// VENDOR DASHBOARD
// ============================================
// API Base URL
const apiUrl =
  "https://event-management-api-snowy.vercel.app";

// Fetch vendor data
document.addEventListener("DOMContentLoaded", async () => {
  const vendorId = localStorage.getItem("vendorId");

  if (!vendorId) {
    alert("You are not logged in. Please log in first.");
    window.location.href = "/AWD-HarmoniqEvents/index.html";
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/api/vendors/${vendorId}`);
    const data = await response.json();

    console.log("Fetched Vendor Data:", data);

    document.getElementById("vendor-name").textContent = data.name;
    document.getElementById("vendor-serviceType").textContent =
      data.serviceType;

    const venueDetailsSection = document.getElementById("venue-details");
    const venueDetailsContent = document.getElementById(
      "venue-details-content"
    );
    const venueModal = document.getElementById("venue-modal");
    const editVenueBtn = document.getElementById("edit-venue-btn");

    if (data.serviceType === "Venue Manager") {
      const venueDetails = data.venueDetails;
      const isVenueComplete =
        venueDetails &&
        venueDetails.name &&
        venueDetails.location &&
        venueDetails.capacity &&
        Array.isArray(venueDetails.amenities) &&
        venueDetails.amenities.length > 0;

      if (isVenueComplete) {
        // Venue details exist, show them
        venueDetailsSection.style.display = "block";
        venueDetailsContent.style.display = "block";
        editVenueBtn.style.display = "block";
        venueDetailsContent.innerHTML = `
              <strong>Name:</strong> ${venueDetails.name}<br>
              <strong>Location:</strong> ${venueDetails.location}<br>
              <strong>Capacity:</strong> ${venueDetails.capacity}<br>
              <strong>Amenities:</strong> ${venueDetails.amenities.join(", ")}
            `;

        venueModal.style.display = "none";
        localStorage.setItem(`venueSetUp_${vendorId}`, "true"); // Set unique flag per vendor

        console.log("Venue details exist, modal should NOT show.");
      } else if (!localStorage.getItem(`venueSetUp_${vendorId}`)) {
        // Only show modal if it's the first login AND venue details are missing
        venueModal.style.display = "flex";
        console.log("No venue details found, modal SHOULD show.");
      }
    } else {
      venueDetailsSection.style.display = "none";
      venueModal.style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching vendor data:", error);
  }
});

// Handle venue form submission
document
  .getElementById("venue-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const vendorId = localStorage.getItem("vendorId");

    if (!vendorId) {
      console.error("Vendor ID not found in localStorage!");
      alert("Vendor ID not found. Please log in again.");
      return;
    }

    const venueDetails = {
      name: document.getElementById("venue-name").value,
      location: document.getElementById("venue-location").value,
      capacity: document.getElementById("venue-capacity").value,
      amenities: document
        .getElementById("venue-amenities")
        .value.split(",")
        .map((a) => a.trim()),
    };

    try {
      const response = await fetch(`${apiUrl}/api/vendors/${vendorId}/venue`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(venueDetails),
      });

      if (!response.ok) throw new Error("Failed to update venue");

      // Fetch updated data to ensure latest venue details are displayed
      const updatedResponse = await fetch(`${apiUrl}/api/vendors/${vendorId}`);
      const updatedData = await updatedResponse.json();

      console.log("Updated Vendor Data:", updatedData);

      alert("Venue details updated successfully!");
      localStorage.setItem("venueSetUp", "true");

      // Hide modal
      document.getElementById("venue-modal").style.display = "none";
      location.reload();

      // Update UI with new values
      document.getElementById("venue-details-content").innerHTML = `
          <strong>Name:</strong> ${updatedData.venueDetails.name}<br>
          <strong>Location:</strong> ${updatedData.venueDetails.location}<br>
          <strong>Capacity:</strong> ${updatedData.venueDetails.capacity}<br>
          <strong>Amenities:</strong> ${updatedData.venueDetails.amenities.join(
            ", "
          )}
      `;
    } catch (error) {
      console.error("Error updating venue details:", error);
    }
  });

// Handle edit venue form submission
document
  .getElementById("edit-venue-btn")
  .addEventListener("click", async function () {
    const vendorId = localStorage.getItem("vendorId");

    if (!vendorId) {
      console.error("Vendor ID not found in localStorage!");
      alert("Vendor ID not found. Please log in again.");
      return;
    }

    try {
      // Fetch the current venue details
      const response = await fetch(`${apiUrl}/api/vendors/${vendorId}`);
      const data = await response.json();

      if (!data.venueDetails) {
        alert("No venue details found to edit.");
        return;
      }

      // Pre-fill the form fields with existing data
      document.getElementById("venue-name").value =
        data.venueDetails.name || "";
      document.getElementById("venue-location").value =
        data.venueDetails.location || "";
      document.getElementById("venue-capacity").value =
        data.venueDetails.capacity || "";
      document.getElementById("venue-amenities").value = data.venueDetails
        .amenities
        ? data.venueDetails.amenities.join(", ")
        : "";

      // Show the modal for editing
      document.getElementById("venue-modal").style.display = "flex";
    } catch (error) {
      console.error("Error fetching venue details for editing:", error);
      alert("Failed to fetch venue details. Please try again.");
    }
  });

document.getElementById("close-btn").addEventListener("click", function () {
  document.getElementById("venue-modal").style.display = "none";
});

async function fetchVendorRequests() {
  const vendorId = localStorage.getItem("vendorId");

  if (!vendorId) {
    console.error("Vendor ID not found in localStorage!");
    alert("Vendor ID not found. Please log in again.");
    return;
  }

  try {
    const response = await fetch(`${apiUrl}/api/requests/vendor/${vendorId}`);
    const requests = await response.json();

    console.log("Fetched Vendor Requests:", requests);

    const requestsTableBody = document.querySelector("#requests-table tbody");

    requestsTableBody.innerHTML = ""; // Clear previous content

    if (requests.length === 0) {
      requestsTableBody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center;">No requests found.</td>
        </tr>`;
      return;
    }

    // Sort requests: pending first, then accepted/declined
    requests.sort((a, b) => {
      if (a.status === "pending" && b.status !== "pending") return -1;
      if (a.status !== "pending" && b.status === "pending") return 1;
      return 0;
    });

    // Render sorted requests
    requests.forEach((request) => {
      const row = document.createElement("tr");

      let actionButtons = "";
      if (request.status === "pending") {
        actionButtons = `
          <button class="btn-accept" data-request-id="${request._id}">Accept</button>
          <button class="btn-reject" data-request-id="${request._id}">Reject</button>
        `;
      } else {
        actionButtons = `
          <span>You have already ${request.status} this request.</span>
        `;
      }

      row.innerHTML = `
        <td>${request.eventTitle}</td>
        <td>${request.taskTitle}</td>
        <td>${request.organizerName} (${request.organizerEmail})</td>
        <td><span id="request-status-${request._id}">${request.status}</span></td>
        <td>${actionButtons}</td>
      `;

      requestsTableBody.appendChild(row);
    });

    // Attach event listeners to buttons
    document.querySelectorAll(".btn-accept").forEach((button) => {
      button.addEventListener("click", () =>
        handleRequestAction(button.dataset.requestId, "accepted")
      );
    });

    document.querySelectorAll(".btn-reject").forEach((button) => {
      button.addEventListener("click", () =>
        handleRequestAction(button.dataset.requestId, "declined")
      );
    });
  } catch (error) {
    console.error("Error fetching requests:", error);
  }
}

async function handleRequestAction(requestId, newStatus) {
  const actionText = newStatus === "accepted" ? "accepting" : "declining";
  const confirmation = confirm(
    `Are you sure you want to proceed with ${actionText} this request? This action cannot be undone.`
  );
  if (!confirmation) return;

  try {
    const response = await fetch(`${apiUrl}/api/requests/${requestId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok)
      throw new Error(`Failed to update request status to ${newStatus}`);

    console.log(`Request ${requestId} updated to ${newStatus}`);

    // Update UI
    const statusElement = document.getElementById(`request-status-${requestId}`);
    if (statusElement) {
      statusElement.textContent = newStatus;
    }

    // Replace buttons with a message
    const actionCell = document.querySelector(
      `td > [data-request-id="${requestId}"]`
    ).parentElement;
    if (actionCell) {
      actionCell.innerHTML = `<span>You have already ${newStatus} this request.</span>`;
    }

    alert(
      `Request has been successfully ${newStatus}. You can no longer change this decision.`
    );
  } catch (error) {
    console.error("❌ Error updating request status:", error);
  }
}

// Call the function on page load
document.addEventListener("DOMContentLoaded", fetchVendorRequests);

// Automatic fetching every 1 minute
setInterval(fetchVendorRequests, 60000);