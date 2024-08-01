const connection = new WebSocket("ws://localhost:8080");
const form = document.querySelector("form");
const messages = document.querySelector(".messages");

connection.onopen = (event) => {
  console.log("WebSocket is open now.");
};

connection.onclose = (event) => {
  console.log("WebSocket is closed now.");
};

connection.onerror = (event) => {
  console.error("WebSocket error observed:", event);
};

connection.onmessage = async (event) => {
  const payload = JSON.parse(await event.data.text());

  // append received message from the server to the DOM element
  const newMsg = document.createElement("p");
  newMsg.textContent = `${payload.user} says ${payload.message}`;
  messages.appendChild(newMsg);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const payload = JSON.stringify({
    user: e.target.user.value,
    message: e.target.message.value,
  });
  connection.send(payload);
  form.reset();
});
