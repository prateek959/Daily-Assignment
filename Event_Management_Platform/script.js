const eventForm = document.getElementById('eventForm');
const eventList = document.getElementById('eventList');
let events = [];

function renderEvents() {
  eventList.innerHTML = '';
  events.forEach((event, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${event.name}</strong> (${event.type}) - ${new Date(event.date).toLocaleString()} at ${event.venue}
      <button onclick="deleteEvent(${index})">Delete</button>
    `;
    eventList.appendChild(li);

    const now = new Date();
    const timeUntilEvent = new Date(event.date) - now;
    if (timeUntilEvent > 0) {
      setTimeout(() => {
        alert(`Reminder: ${event.name} is starting soon!`);
      }, timeUntilEvent);
    }
  });
}

function deleteEvent(index) {
  events.splice(index, 1);
  renderEvents();
}

eventForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const newEvent = {
    name: document.getElementById('eventName').value,
    type: document.getElementById('eventType').value,
    date: document.getElementById('eventDate').value,
    venue: document.getElementById('venue').value,
  };
  events.push(newEvent);
  eventForm.reset();
  renderEvents();
});
