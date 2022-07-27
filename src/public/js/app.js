const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName = "";

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerHTML = message;
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#message input");
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${input.value}`);
    input.value = "";
  });
}

function handleNicknameSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#nickname input");
  socket.emit("nickname", input.value);
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `room ${roomName}`;
  const messageForm = room.querySelector("#message");
  const nicknameForm = room.querySelector("#nickname");
  messageForm.addEventListener("submit", handleMessageSubmit);
  nicknameForm.addEventListener("submit", handleNicknameSubmit);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
}

function setRoomCount(count) {
  const h3 = room.querySelector("h3");
  h3.innerText = `room ${roomName} (${count})`;
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user, newCount) => {
  setRoomCount(newCount);
  addMessage(`${user} arrived!`);
});
socket.on("bye", (user, newCount) => {
  setRoomCount(newCount);
  addMessage(`${user} left~`);
});
socket.on("new_message", addMessage);
socket.on("change_room", (rooms) => {
  const ul = welcome.querySelector("ul");
  ul.innerHTML = "";
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.innerText = room;
    ul.appendChild(li);
  });
});
