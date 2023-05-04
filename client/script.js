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
  const copySvg = isAi ? `<svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.77694 2.23897C3.22117 1.76175 3.84977 1.5 4.57718 1.5H8.04193C8.68333 1.5 9.24873 1.70147 9.67967 2.07935C10.1091 2.45587 10.3737 2.97994 10.4656 3.57221C10.5079 3.84509 10.321 4.10061 10.0481 4.14291C9.7752 4.18521 9.51967 3.99829 9.4774 3.72541C9.4166 3.33341 9.2506 3.03307 9.0204 2.83125C8.7918 2.6308 8.46873 2.5 8.04193 2.5H4.57718C4.09841 2.5 3.74506 2.66661 3.50889 2.92033C3.26905 3.17797 3.11328 3.56573 3.11328 4.06699V8.53027C3.11328 8.98693 3.24317 9.34987 3.44735 9.60407C3.6483 9.85427 3.94371 10.0282 4.33819 10.0771C4.61223 10.1111 4.80684 10.3609 4.77285 10.6349C4.73887 10.9089 4.48916 11.1035 4.21512 11.0695C3.5764 10.9903 3.04012 10.694 2.66769 10.2303C2.29848 9.7706 2.11328 9.17607 2.11328 8.53027V4.06699C2.11328 3.35799 2.33637 2.71225 2.77694 2.23897Z"
      fill="#9747FF"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.1598 5.64625C6.60417 5.16965 7.2328 4.90881 7.96 4.90881H11.4236C12.1525 4.90881 12.7814 5.16941 13.2256 5.64653C13.666 6.1196 13.8875 6.76489 13.8875 7.47289V11.9362C13.8875 12.6442 13.666 13.2894 13.2255 13.7626C12.7812 14.2397 12.1521 14.5002 11.423 14.5002H7.96C7.23107 14.5002 6.60219 14.2396 6.15801 13.7625C5.71761 13.2894 5.49609 12.6442 5.49609 11.9362V7.47289C5.49609 6.76416 5.71905 6.11899 6.1598 5.64625ZM6.8912 6.32819C6.65171 6.58508 6.49609 6.97189 6.49609 7.47289V11.9362C6.49609 12.4378 6.65111 12.8246 6.88993 13.0811C7.125 13.3336 7.47807 13.5002 7.96 13.5002H11.423C11.9053 13.5002 12.2585 13.3336 12.4936 13.0811C12.7325 12.8246 12.8875 12.4378 12.8875 11.9362V7.47289C12.8875 6.97123 12.7325 6.58446 12.4937 6.32791C12.2586 6.07541 11.9055 5.90881 11.4236 5.90881H7.96C7.48047 5.90881 7.12713 6.07518 6.8912 6.32819Z"
      fill="#9747FF"
    />
  </svg>` : "";

  const checkCircle = `<svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.7604 4.08001C7.38595 4.08001 3.84039 7.62557 3.84039 12C3.84039 16.3736 7.38601 19.92 11.7604 19.92C16.1348 19.92 19.6804 16.3736 19.6804 12C19.6804 7.62557 16.1348 4.08001 11.7604 4.08001ZM2.40039 12C2.40039 6.83029 6.59067 2.64001 11.7604 2.64001C16.9301 2.64001 21.1204 6.83029 21.1204 12C21.1204 17.1687 16.9302 21.36 11.7604 21.36C6.59061 21.36 2.40039 17.1687 2.40039 12Z"
      fill="#9747FF"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.5935 9.27461C15.8746 9.55578 15.8746 10.0117 15.5935 10.2928L11.1604 14.7259C10.8793 15.007 10.4235 15.0071 10.1423 14.726L7.92486 12.5094C7.64362 12.2284 7.64352 11.7725 7.92464 11.4913C8.20577 11.21 8.66164 11.2099 8.94287 11.491L10.6512 13.1986L14.5752 9.27461C14.8564 8.99342 15.3123 8.99342 15.5935 9.27461Z"
      fill="#9747FF"
    />
  </svg>`;
  return `
    <div class="wrapper ${isAi && "ai"}">
    ${copySvg}
    <div class="chat">
      <div class="profile">
      <img src="${isAi ? bot : user}" 
       alt="${isAi ? bot : "user"}" 
       />
      </div>
      <div class="message" id=${uniqueId}>${value}</div>
      </div>
    </div>
  `;
}

const handleSubmit = async (e) => {
  e.preventDefault();
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
