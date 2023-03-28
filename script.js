const chatBox = document.querySelector(".chat-box");
let userMessages = [];
let assistantMessages = [];
let myDateTime = "";

function spinner() {
  document.getElementById("loader").style.display = "block";
}

function start() {
  const date = document.getElementById("date").value;
  const hour = document.getElementById("hour").value;
  if (date === "") {
    alert("생년월일을 입력해주세요.");
    return;
  }
  myDateTime = date + hour;

  document.getElementById("intro").style.display = "none";
  document.getElementById("chat").style.display = "block";
}

const sendMessage = async () => {
  const chatInput = document.querySelector(".chat-input input");
  const chatMessage = document.createElement("div");
  chatMessage.classList.add("chat-message");
  chatMessage.innerHTML = `
<p>${chatInput.value}</p>
`;
  chatBox.appendChild(chatMessage);

  //userMessage 메세지 추가
  userMessages.push(chatInput.value);

  chatInput.value = "";

  const response = await fetch("secret", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      myDateTime: myDateTime,
      userMessages: userMessages,
      assistantMessages: assistantMessages,
    }),
  });

  const data = await response.json();
  document.getElementById("loader").style.display = "none";

  //assistantMessage 메세지 추가
  assistantMessages.push(data.assistant);

  const astrologerMessage = document.createElement("div");
  astrologerMessage.classList.add("chat-message");
  astrologerMessage.innerHTML = `<p class='assistant'>${data.assistant}</p>`;
  const p = document.createElement("p");
  p.innerHTML =
    "추가로 링크를 눌러 작은 정성을 배풀어주시면 더욱 좋은 행운이 있으실겁니다. 👉 ";
  p.classList.add("assistant");
  const link = document.createElement("a");
  link.href = "https://toss.me/dothur";
  link.innerHTML = "복채 보내기";
  p.appendChild(link);
  astrologerMessage.appendChild(p);
  ("<p> <a href='https://toss.me/dothur'>복채 보내기</a></p>");
  chatBox.appendChild(astrologerMessage);
};

document
  .querySelector(".chat-input button")
  .addEventListener("click", sendMessage);
