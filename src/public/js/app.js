const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

function handleSocketOpen() {
  console.log("Connected to Browser ✅");
}

function handleSocketMessage(message) {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
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
  socket.send(makeMessage("new_message", input.value));
  input.value = "";
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
}

nickForm.addEventListener("submit", handleNickSubmit);
messageForm.addEventListener("submit", handleSubmit);
