let socket = null;
const form = document.querySelector("form");
const input = document.getElementById("sen01");
const messagesElem = document.getElementById("messages");
const smallStatus = document.querySelector("small");

function randomTime(timeToUse) {
  return Math.floor(Math.random() * timeToUse);
}

function renderMessage(message) {
  const li = document.createElement("li");
  li.innerHTML = message;
  messagesElem.prepend(li);
}

function sendMessage(message) {
  if (message.length > 0 && socket) {
    socket.send(message);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage(input.value);
  input.value = "";
});

function connectToServer() {
  socket = new WebSocket("ws://localhost:3000");

  socket.onopen = (event) => {
    smallStatus.innerHTML = "Online";
    smallStatus.style.color = "green";
  };

  socket.onclose = (event) => {
    smallStatus.innerHTML = "Offline";
    smallStatus.style.color = "red";
    setTimeout(() => {
      connectToServer();
    }, randomTime(1500));
  };

  socket.onmessage = (event) => {
    const { payload } = JSON.parse(event.data);
    renderMessage(payload);
  };
}

connectToServer();
