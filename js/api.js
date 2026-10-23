// Base URL pointing to deployed or local JSON Server
const API_URL = `http://localhost:3000`;

/*
  1. GET METHOD: Retrieve all event listings from backend
 */
export async function getEvents() {
  const response = await fetch(`${API_URL}/events`);
  if (!response.ok) throw new Error('Failed to fetch events.');
  return await response.json();
}

/*
  2. POST METHOD: Submit a new campus event listing
 */
export async function createEvent(eventData) {
  const response = await fetch(`${API_URL}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData)
  });
  if (!response.ok) throw new Error('Failed to create event.');
  return await response.json();
}

/*
  3. PUT METHOD: Full record update for an event
 */
export async function updateEventFull(id, updatedData) {
  const response = await fetch(`${API_URL}/events/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData)
  });
  if (!response.ok) throw new Error('Failed to perform full update.');
  return await response.json();
}

/*
  4. PATCH METHOD: Partial update to increment RSVP registration numbers
 */
export async function updateEventRegistration(id, newRegistrationCount) {
  const response = await fetch(`${API_URL}/events/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ registrations: newRegistrationCount })
  });
  if (!response.ok) throw new Error('Failed to update registration.');
  return await response.json();
}

/*
  5. DELETE METHOD: Remove an event record from backend
 */
export async function deleteEvent(id) {
  const response = await fetch(`${API_URL}/events/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete event.');
  return await response.json();
}