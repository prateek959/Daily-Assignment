const rooms = {
  general: [],
  random: []
};

let currentRoom = "general";
const messagesDiv = document.getElementById("messages");
const typingDiv = document.getElementById("typing");

function renderMessages() {
  messagesDiv.innerHTML = "";
  rooms[currentRoom].forEach(msg => {
    const div = document.createElement("div");
    div.className = "message";
    div.textContent = msg;
    messagesDiv.appendChild(div);
  });
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function switchRoom(room) {
  currentRoom = room;
  document.getElementById("room-title").textContent = `#${room}`;
  document.querySelectorAll(".sidebar button").forEach(btn => {
    btn.classList.remove("active");
  });
  document.getElementById(`${room}Btn`).classList.add("active");
  renderMessages();
}

function sendMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();
  if (text === "") return;

  typingDiv.style.display = "block";
  setTimeout(() => {
    typingDiv.style.display = "none";
    rooms[currentRoom].push(`You: ${text}`);
    renderMessages();
  }, 500);

  input.value = "";
}

// Simulate real-time incoming messages
setInterval(() => {
  const fakeMessages = ["Hey there!", "How's it going?", "This is fun!", "Let's switch rooms."];
  const randomMsg = fakeMessages[Math.floor(Math.random() * fakeMessages.length)];
  rooms[currentRoom].push(`Friend: ${randomMsg}`);
  renderMessages();
}, 5000);

switchRoom("general"); // Initialize
