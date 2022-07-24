const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
const socket = new WebSocket(`ws://${window.location.host}`);

function handleSocketOpen() {
  console.log("Connected to Browser ✅");
}

function handleSocketMessage(message) {
  console.log("New message: ", message.data);
}

function handleSocketClose() {
  console.log("Disconnected from Server ❌");
}

socket.addEventListener("open", handleSocketOpen);
socket.addEventListener("message", handleSocketMessage);
socket.addEventListener("close", handleSocketClose);

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
