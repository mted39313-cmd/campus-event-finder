/* global setTimeout */

/**
  Dynamic DOM renderer for event cards and Google Calendar URL generation.
  Clears the container, handles empty states, and builds interactive event cards.
  
  @param {Array<Object>} events - Array of event objects from the backend.
  @param {HTMLElement} containerElement - The DOM container where cards will be rendered.
 */
export function renderEvents(events, containerElement) {
  // Clear any existing content inside the container
  containerElement.innerHTML = '';

  // Handle empty state if no events are found
  if (!events || events.length === 0) {
    containerElement.innerHTML = '<p class="empty-msg">No campus events available.</p>';
    return;
  }

  // Iterate through each event to build its card
  events.forEach(event => {
    const card = document.createElement('div');
    card.className = 'event-card';

    // Format date string for Google Calendar URL (YYYYMMDD format)
    const cleanDate = event.date ? event.date.replace(/-/g, '') : '';
    
    // Generate dynamic Google Calendar template link
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${cleanDate}/${cleanDate}&details=${encodeURIComponent(event.description || '')}&location=${encodeURIComponent(event.location || '')}`;

    // Populate the card's inner HTML structure
    card.innerHTML = `
      <span class="badge">${event.category}</span>
      <h3>${event.title}</h3>
      <p class="meta">📅 ${event.date} | 📍 ${event.location}</p>
      <p class="desc">${event.description || ''}</p>
      <p class="capacity">Registrations: <strong>${event.registrations || 0} / ${event.capacity}</strong></p>
      <div class="card-actions">
        <button class="btn-rsvp" data-id="${event.id}" data-reg="${event.registrations || 0}" data-cap="${event.capacity}">🎟️ RSVP / Claim Ticket</button>
        <a href="${gCalUrl}" target="_blank" rel="noopener noreferrer" class="btn-cal">📅 Add to Google Calendar</a>
        <button class="btn-delete" data-id="${event.id}">Delete</button>
      </div>
    `;

    // Append the constructed card to the DOM container
    containerElement.appendChild(card);
  });
}

/**
  Validates user input parameters before submitting a new event to the backend.
  
  @param {string} title - The title of the event.
  @param {string} category - The event category or tag.
  @param {string} date - The scheduled date of the event.
  @param {string} location - The venue or location.
  @param {number|string} capacity - Maximum allowed seating/registrations.
  @returns {Object} An object containing validity status and error message if invalid.
 */
export function validateEventInput(title, category, date, location, capacity) {
  // Check if any required text field is empty
  if (!title || !category || !date || !location || !capacity) {
    return { isValid: false, message: 'All required fields must be filled out.' };
  }
  // Validate that capacity is a valid positive number
  if (isNaN(capacity) || Number(capacity) <= 0) {
    return { isValid: false, message: 'Capacity must be a positive number.' };
  }
  return { isValid: true, message: '' };
}

/*
  Displays a temporary error message banner at the top of the UI.
  Automatically clears and removes itself after 4 seconds.
  
  @param {string} message - The error message text to display.
 */
export function showError(message) {
  let errorBanner = document.getElementById('error-banner');

  // Create the banner element dynamically if it doesn't exist yet
  if (!errorBanner) {
    errorBanner = document.createElement('div');
    errorBanner.id = 'error-banner';
    errorBanner.style.backgroundColor = '#ffdddd';
    errorBanner.style.color = '#d8000c';
    errorBanner.style.padding = '10px 15px';
    errorBanner.style.margin = '10px 0';
    errorBanner.style.borderRadius = '4px';
    errorBanner.style.border = '1px solid #d8000c';
    
    const container = document.querySelector('main') || document.body;
    container.prepend(errorBanner);
  }

  // Set the error message text
  errorBanner.textContent = message;

  // Automatically remove the banner after 4000ms (4 seconds)
  setTimeout(() => {
    if (errorBanner) {
      errorBanner.remove();
    }
  }, 4000);
}