import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

const form = document.querySelector("form");
const textarea = document.querySelector("textarea");
const chatContainer = document.getElementById("chat_container");

let loadInterval;

function loader(element) {
  element.textContent = "";

  loadInterval = setInterval(() => {
    element.textContent += "♥";

    if (element.textContent === "♥♥♥♥") {
      element.textContent = "";
    }
  }, 300);
}

function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 200);
}

function generateUniqueId() {
  const timeStamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timeStamp}-${hexadecimalString}`;
}
function chatStripe(isAi, value, uniqueId) {
  const copySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="copy-data"><path fill="#F15439" d="M45.321 16.538h13.217L45.321 3z"></path><path fill="#399BB9" d="M33.308 11.923H7.923V61h38.923V25.462H33.308V11.923z"></path><path fill="#FFF" d="M33.308 25.462h13.538L33.308 11.923z"></path><path d="M47.846 62H6.923V10.923h26.799l14.125 14.125V62zM8.923 60h36.923V25.876L32.894 12.923H8.923V60z"></path><path d="M46.846 26.462H32.308V11.923h2v12.539h12.538zM12.154 29.538h30.461v2H12.154zM12.154 54.923h30.461v2H12.154zM12.154 49.846h30.461v2H12.154zM12.154 44.77h30.461v2H12.154zM12.154 39.692h30.461v2H12.154zM12.154 34.615h30.461v2H12.154zM12.154 19.385h15.231v2H12.154zM29.077 19.385h1.692v2h-1.692zM12.154 24.462h15.231v2H12.154zM29.077 24.462h1.692v2h-1.692zM12.154 14.308h15.231v2H12.154zM29.077 14.308h1.692v2h-1.692z"></path><path d="M59.527 53.065h-9.588v-1.976h7.611V16.94L44.905 3.988H21.527v4.589H19.55V2.012h26.187l13.79 14.124z"></path><path d="M58.539 17.526H44.333V3h1.977v12.55h12.229z"></path></svg>`;

  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  if (isAi) {
    wrapper.classList.add("ai");
    const button = document.createElement("button");
    button.setAttribute("id", "btn");
    button.innerHTML = copySvg;
    button.setAttribute("onClick", "handleClick(event)");
    wrapper.appendChild(button);
  }

  const chatDiv = document.createElement("div");
  chatDiv.classList.add("chat");
  const profileDiv = document.createElement("div");
  profileDiv.classList.add("profile");
  const profileImg = document.createElement("img");
  profileImg.setAttribute("src", isAi ? bot : user);
  profileImg.setAttribute("alt", isAi ? bot : "user");
  profileDiv.appendChild(profileImg);
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  messageDiv.setAttribute("id", uniqueId);
  messageDiv.innerText = value;
  chatDiv.appendChild(profileDiv);
  chatDiv.appendChild(messageDiv);
  wrapper.appendChild(chatDiv);

  return wrapper.outerHTML;
}

const handleSubmit = async (e) => {
  e.preventDefault();
  const welcome = document.getElementById("typing-text");
  welcome.classList.add("hidden");
  const data = new FormData(form);
  textarea.value = "";
  if (textarea.value === "") {
    // Reset form height to default value
    form.style.height = "auto";
  }
  //user's chat box
  chatContainer.innerHTML += chatStripe(false, data.get("prompt"));

  form.reset();

  // A.i chat box
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, "", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);

  //fetch data from server
  const response = await fetch("http://localhost:5000", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      prompt: data.get("prompt"),
    }),
  });
  clearInterval(loadInterval);
  messageDiv.innerHTML = "";

  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim();

    typeText(messageDiv, parsedData);
  } else {
    const err = await response.text();

    messageDiv.innerHTML = "Houston, we have a problem! 🤯🤯";

    alert(err);
  }
};

form.addEventListener("submit", handleSubmit);
form.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
});
