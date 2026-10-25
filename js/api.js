/* global localStorage */
// LocalStorage key for storing campus events data
const STORAGE_KEY = 'campus_events_data';
const defaultEvents = [
  {
    id: '1',
    title: 'Tech club hackathon',
    category: 'Technology',
    date: '2026-11-10',
    location: 'Aud A',
    description: 'Annual 12 hour coding challenge.',
    capacity: 50,
    registrations: 38
  },
  {
    id: '2',
    title: 'Campus acoustic nights',
    category: 'Arts',
    date: '2026-11-15',
    location: 'stage',
    description: 'live musical perfomances and spoken word poetry.',
    capacity: 100,
    registrations: 85
  }
];

// Helper: Get events from localStorage (seeds defaults if none exist)
function getStoredEvents() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultEvents));
    return defaultEvents;
  }
  return JSON.parse(data);
}

// Helper: Save events array to localStorage
function saveStoredEvents(events) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

// GET: Fetch all events
export async function getEvents() {
  return getStoredEvents();
}

// POST: Create a new event
export async function createEvent(eventData) {
  const events = getStoredEvents();
  const newEvent = {
    ...eventData,
    id: Date.now().toString()
  };
  events.push(newEvent);
  saveStoredEvents(events);
  return newEvent;
}

// PATCH: Update ticket / RSVP registration count
export async function updateEventRegistration(id, updatedData) {
  const events = getStoredEvents();
  let updatedEvent = null;
  
  const newEvents = events.map(event => {
    if (event.id === String(id)) {
      updatedEvent = { ...event, ...updatedData };
      return updatedEvent;
    }
    return event;
  });
  
  saveStoredEvents(newEvents);
  return updatedEvent;
}

// DELETE: Remove an event
export async function deleteEvent(id) {
  const events = getStoredEvents();
  const newEvents = events.filter(event => event.id !== String(id));
  saveStoredEvents(newEvents);
  return { success: true };
}