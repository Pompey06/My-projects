document.addEventListener("DOMContentLoaded", function () {
   const nextBtn = document.querySelector(".next");
   const textInput = document.querySelector(".chat__form_input");
   const fileInput = document.getElementById("upload");
   const chatWindow = document.querySelector(".chat__window");

   function sendMessage() {
      const messageText = textInput.value.trim();
      if (messageText === "") return; // Не отправляем пустое сообщение

      // Создаём элемент сообщения пользователя
      const userMessage = document.createElement("div");
      userMessage.classList.add("user__message", "message");

      // Если выбран файл, добавляем к сообщению HTML с иконкой файла
      if (fileInput.files && fileInput.files.length > 0) {
         userMessage.innerHTML = messageText + '<img src="./image/file.svg" alt="" class="file" />';
      } else {
         userMessage.textContent = messageText;
      }
      chatWindow.appendChild(userMessage);
      chatWindow.scrollTop = chatWindow.scrollHeight;

      // Очищаем текстовое поле и сбрасываем выбор файла
      textInput.value = "";
      fileInput.value = "";

      // Добавляем индикатор "typing"
      const typingIndicator = document.createElement("div");
      typingIndicator.classList.add("bot__message", "message", "typing");
      typingIndicator.textContent = "typing";
      chatWindow.appendChild(typingIndicator);
      chatWindow.scrollTop = chatWindow.scrollHeight;

      // Через 5 секунд заменяем индикатор сообщением от бота с текстом "рыбой"
      setTimeout(() => {
         if (chatWindow.contains(typingIndicator)) {
            chatWindow.removeChild(typingIndicator);
         }
         const botMessage = document.createElement("div");
         botMessage.classList.add("bot__message", "message");
         botMessage.textContent = "lorem ipsum dolor sit amet";
         chatWindow.appendChild(botMessage);
         chatWindow.scrollTop = chatWindow.scrollHeight;
      }, 5000);
   }

   // Отправка по клику на кнопку "next"
   nextBtn.addEventListener("click", sendMessage);

   // Отправка по нажатию клавиши Enter в текстовом поле
   textInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
         event.preventDefault();
         sendMessage();
      }
   });
});
