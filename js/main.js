// Import API helper functions to communicate with the backend server
import { getEvents, createEvent, updateEventRegistration, deleteEvent } from './api.js';
// Import UI helper functions to render cards and validate forms
import { renderEvents, validateEventInput, showError } from './ui.js';

// Select key HTML elements from the webpage
const eventContainer = document.getElementById('event-container');
const eventForm = document.getElementById('event-form');
const searchInput = document.getElementById('search-input');
const adminEventList = document.getElementById('admin-event-list');

// Store all event data in memory once fetched
let allEvents = [];

/*
  Initializes the application: fetches events from the server 
  and displays them on the webpage.
 */
async function initApp() {
  try {
    // Fetch event records from the backend API
    allEvents = await getEvents();
    
    // Render the event cards into the student feed
    renderEvents(allEvents, eventContainer);
    
    // Update the statistics list in the admin panel
    renderAdminStats(allEvents);
  } catch (error) {
    console.error('Initialization Error:', error);
    eventContainer.innerHTML = '<p class="error-msg">⚠️ Cannot connect to server. Please ensure JSON Server is running (`npm start`).</p>';
  }
}

/*
  Renders a summary list of events and their attendance stats in the admin panel.
 */
function renderAdminStats(events) {
  adminEventList.innerHTML = '';
  events.forEach(ev => {
    const li = document.createElement('li');
    li.textContent = `${ev.title} — ${ev.registrations || 0}/${ev.capacity} Registered`;
    adminEventList.appendChild(li);
  });
}

// Listen for user typing in the search bar to filter events live
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  
  // Filter events matching the title, category, or location
  const filteredEvents = allEvents.filter(ev =>
    ev.title.toLowerCase().includes(searchTerm) ||
    ev.category.toLowerCase().includes(searchTerm) ||
    ev.location.toLowerCase().includes(searchTerm)
  );
  
  // Re-render the feed showing only the filtered results
  renderEvents(filteredEvents, eventContainer);
});

// Listen for form submissions when the admin creates a new event
eventForm.addEventListener('submit', async (e) => {
  // Prevent the default browser page reload on submit
  e.preventDefault();

  // Grab text input values from form fields
  const title = document.getElementById('title').value.trim();
  const category = document.getElementById('category').value.trim();
  const date = document.getElementById('date').value;
  const location = document.getElementById('location').value.trim();
  const capacity = document.getElementById('capacity').value;
  const description = document.getElementById('description').value.trim();

  // Validate inputs using our validation function
  const validation = validateEventInput(title, category, date, location, capacity);
  if (!validation.isValid) {
    alert(validation.message);
    return;
  }

  try {
    // Send a POST request to save the new event to the backend
    await createEvent({
      title,
      category,
      date,
      location,
      capacity: Number(capacity),
      description,
      registrations: 0 // New events start with 0 registrations
    });

    // Clear form inputs and reload app data
    eventForm.reset();
    await initApp();
  } catch (error) {
  console.error(error); // This uses the error variable
  showError("...");
}
});

// Use event delegation on the container to handle button clicks inside event cards
eventContainer.addEventListener('click', async (e) => {
  const id = e.target.getAttribute('data-id');

  // Handle RSVP / Claim Ticket button click (PATCH request)
  if (e.target.classList.contains('btn-rsvp')) {
    const currentReg = Number(e.target.getAttribute('data-reg'));
    const capacity = Number(e.target.getAttribute('data-cap'));

    // Check if the event is already full
    if (currentReg >= capacity) {
      alert('Sorry, this event has reached maximum capacity!');
      return;
    }

    try {
      // Increment registration count by 1 on the server
      await updateEventRegistration(id, currentReg + 1);
      alert('🎟️ Ticket claimed successfully!');
      await initApp(); // Refresh data on screen
    } catch (error) {
  console.error(error);
  showError("...");
}
  }

  // Handle Delete button click (DELETE request)
  if (e.target.classList.contains('btn-delete')) {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        await initApp(); // Refresh data on screen
      } catch (error) {
  console.error(error);
}
    }
  }
});

// Automatically run initApp() when the webpage loads completely
document.addEventListener('DOMContentLoaded', initApp);