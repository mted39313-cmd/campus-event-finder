/*
  Dynamic DOM renderer for event cards and Google Calendar URL generation
 */
export function renderEvents(events, containerElement) {
  containerElement.innerHTML = '';

  if (!events || events.length === 0) {
    containerElement.innerHTML = '<p class="empty-msg">No campus events available.</p>';
    return;
  }

  events.forEach(event => {
    const card = document.createElement('div');
    card.className = 'event-card';

    // Generate dynamic Google Calendar link
    const cleanDate = event.date ? event.date.replace(/-/g, '') : '';
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${cleanDate}/${cleanDate}&details=${encodeURIComponent(event.description || '')}&location=${encodeURIComponent(event.location || '')}`;

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

    containerElement.appendChild(card);
  });
}

/*
  Validates input parameters for creating new events
 */
export function validateEventInput(title, category, date, location, capacity) {
  if (!title || !category || !date || !location || !capacity) {
    return { isValid: false, message: 'All required fields must be filled out.' };
  }
  if (isNaN(capacity) || Number(capacity) <= 0) {
    return { isValid: false, message: 'Capacity must be a positive number.' };
  }
  return { isValid: true, message: '' };
}
/*
  Displays a temporary error message banner on the UI
 */
export function showError(message) {
  let errorBanner = document.getElementById('error-banner');

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

  errorBanner.textContent = message;
/* global setTimeout */
  setTimeout(() => {
    if (errorBanner) {
      errorBanner.remove();
    }
  }, 4000);
}