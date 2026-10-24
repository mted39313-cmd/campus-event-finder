# Campus Event Finder

A dynamic, single-page web application designed for students and campus organizations to discover, create, and manage upcoming events, workshops, and hackathons with seamless REST API persistence and Google Calendar integration.

---

##  Features

* **Event Browsing & Cards:** Dynamically renders event cards with categories, dates, locations, descriptions, and real-time registration capacities.
* **Full CRUD Operations:** 
  * **Create:** Add new campus events with input validation.
  * **Read:** Fetch and display events from a mock backend.
  * **Update:** RSVP / claim tickets to increment registration counts dynamically.
  * **Delete:** Remove events from the database.
* **Google Calendar Integration:** Automatically generates a custom Google Calendar event link for every listing so attendees can schedule events instantly with one click.
* **Robust Error Handling:** Features a responsive notification banner (`showError`) to handle failed network operations gracefully.

---

##  Tech Stack

* **Frontend:** Vanilla JavaScript (ES6+ Modules), HTML5, CSS3
* **Backend / Database:** `json-server` (REST API over mock JSON storage)
* **Testing:** Jest (Unit testing suites)
* **Code Quality:** ESLint (Flat Config)
* **License:** MIT

---

##  Getting Started & Installation

Follow these instructions to set up and run the project locally on your machine.

### 1. Prerequisites
Ensure you have **Node.js** and **npm** installed on your system.

### 2. Clone the Repository
```bash
git clone [https://github.com/mted39313-cmd/campus-event-finder.git](https://github.com/mted39313-cmd/campus-event-finder.git)
cd campus-event-finder