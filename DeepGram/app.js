document.addEventListener("DOMContentLoaded", () => {
   let selectedLanguage = null;
   let selectedCountry = null;
   let selectedPeerType = "Channels";
   let term = "";
   let userId = null; // Для хранения user_id после успешного запроса

   const cards = document.querySelectorAll(".heading__card");
   const inputField = document.querySelector(".key");
   const submitButton = document.querySelector(".submit");
   const messagesContainer = document.querySelector(".messages");
   const userMessageInput = document.querySelector(".chat__input");
   const sendMessageButton = document.querySelector(".chat__submit");

   cards.forEach((card) => {
      card.addEventListener("click", () => {
         const group = card.dataset.group;
         const value = card.dataset.value;

         cards.forEach((c) => {
            if (c.dataset.group === group) {
               c.classList.remove("selected", "error");
            }
         });

         card.classList.add("selected");

         if (group === "language") {
            selectedLanguage = value;
         } else if (group === "country") {
            selectedCountry = value;
         } else if (group === "peer_type") {
            selectedPeerType = value;
         }
      });
   });

   function addChannelMessageToChat(title, photoUrl, link) {
      const channelMessageHTML = `
         <div class="channel__message">
            <img src="${photoUrl}" alt="Channel Icon" class="icon" />
            <div class="channel__message_info">
               <p class="channel__message_text">${title}</p>
               <a href="${link}" class="button3 btn _scale_hover" target="_blank">Link</a>
            </div>
         </div>
      `;
      messagesContainer.insertAdjacentHTML("beforeend", channelMessageHTML);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
   }

   inputField.addEventListener("input", () => {
      const value = inputField.value.trim();

      if (value.length === 0) {
         term = "";
         inputField.classList.remove("error");
      } else if (value.length < 4) {
         term = "";
         inputField.classList.add("error");
      } else {
         term = value;
         inputField.classList.remove("error");
      }
   });

   function validateSelections() {
      let isValid = true;

      if (!selectedLanguage) {
         isValid = false;
         highlightError("language");
      }
      if (!selectedCountry) {
         isValid = false;
         highlightError("country");
      }
      if (!selectedPeerType) {
         isValid = false;
         highlightError("peer_type");
      }

      if (inputField.value.trim().length > 0 && inputField.value.trim().length < 4) {
         isValid = false;
         inputField.classList.add("error");
      }

      return isValid;
   }

   function highlightError(group) {
      cards.forEach((card) => {
         if (card.dataset.group === group) {
            card.classList.add("error");
         }
      });
   }

   function resetSelections() {
      cards.forEach((card) => {
         card.classList.remove("selected", "error");
      });

      selectedLanguage = null;
      selectedCountry = null;
      selectedPeerType = null;

      inputField.value = "";
      term = "";
   }

   function addBotMessageToChat(message) {
      const formattedMessage = message.replace(/\n/g, "<br>");
      const botMessageHTML = `
         <div class="bot__message">
            <img src="./image/assistant.png" alt="" />
            <div class="bot__message_info">
               <h5 class="bot__name">Assistant</h5>
               <p class="bot__message_text">${formattedMessage}</p>
            </div>
         </div>
      `;
      messagesContainer.insertAdjacentHTML("beforeend", botMessageHTML);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
   }

   function addUserMessageToChat(message) {
      const userMessageHTML = `
         <div class="user__message">
            <div class="bot__message_info">
               <h5 class="bot__name">User</h5>
               <p class="bot__message_text">${message}</p>
            </div>
            <img src="./image/user.png" alt="" />
         </div>
      `;
      messagesContainer.insertAdjacentHTML("beforeend", userMessageHTML);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
   }

   let isFirstRequest = true; // Флаг для отслеживания первого запроса

   function sendDataToBackend() {
      const data = {
         country: selectedCountry,
         language: selectedLanguage,
         peer_type: selectedPeerType,
         term: term || "no", // Если term пустой, передаём "no"
         search_in_about: term ? "yes" : "no", // Если term пустой, search_in_about = "no"
      };

      // Добавляем временное сообщение "Writing..."
      const tempMessage = addTemporaryBotMessage();

      fetch("https://telemetry2api-production.up.railway.app/user/create_user", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "x-api-key": "ST80Ea7R1SmgcGZyEzPTBZ",
         },
         body: JSON.stringify(data),
      })
         .then((response) => {
            if (!response.ok) {
               throw new Error("Failed to send data to backend");
            }
            return response.json(); // Преобразуем ответ в JSON
         })
         .then((result) => {
            console.log("Server response:", result); // Логируем ответ для отладки

            let fullMessage = result.assistant_answer || ""; // Если assistant_answer отсутствует, используем пустую строку

            // Сохраняем userId из ответа сервера
            if (result.user_id) {
               userId = result.user_id; // Сохраняем userId для последующих запросов
            } else {
               console.error("User ID not found in the response");
            }

            // Проверяем наличие entities
            const entities = result.entities || [];

            if (isFirstRequest) {
               // Логика для первого запроса
               if (fullMessage) {
                  addBotMessageToChat(fullMessage);
               } else {
                  addBotMessageToChat("Sorry, no matches were found for your search.");
               }
               isFirstRequest = false; // После первого запроса переключаем флаг
            } else {
               // Логика для второго и последующих запросов
               if (entities.length > 0) {
                  // Если есть каналы, выводим их по одному
                  entities.forEach((entity) => {
                     const title = entity.title || "No Title";
                     const photoUrl = entity.photo_url || "./image/default-icon.png"; // Если photo_url отсутствует, используем иконку по умолчанию
                     const link = entity.link || "#"; // Если link отсутствует, оставляем пустую ссылку
                     addChannelMessageToChat(title, photoUrl, link);
                  });
               } else {
                  // Если каналы не найдены, выводим сообщение об отсутствии результатов
                  fullMessage = "Sorry, no matches were found for your search.";
                  addBotMessageToChat(fullMessage);
               }
            }

            // Удаляем временное сообщение "Writing..."
            removeTemporaryBotMessage(tempMessage);

            resetSelections();
         })
         .catch((error) => {
            console.error("Error sending data:", error);

            // Удаляем временное сообщение "Writing..." в случае ошибки
            removeTemporaryBotMessage(tempMessage);

            // Добавляем сообщение об ошибке от бота
            addBotMessageToChat("Sorry, there was an error, please try again.");
         });
   }

   function sendMessageToBackend(userInput) {
      if (!userId) {
         console.error("User ID is null. Please complete the initial setup first.");
         addBotMessageToChat("Error: User ID is missing. Please start a new session.");
         return;
      }

      const data = {
         user_id: userId, // Используем сохранённый user_id
         user_input: userInput, // Сообщение пользователя
      };

      // Добавляем временное сообщение "Writing..."
      const tempMessage = addTemporaryBotMessage();

      fetch("https://telemetry2api-production.up.railway.app/assistant/message", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "x-api-key": "ST80Ea7R1SmgcGZyEzPTBZ",
         },
         body: JSON.stringify(data),
      })
         .then((response) => {
            if (!response.ok) {
               throw new Error("Failed to send message to backend");
            }
            return response.json();
         })
         .then((result) => {
            let fullMessage = result.assistant_answer || ""; // Ответ ассистента
            const entities = result.entities || []; // Каналы, если они есть

            if (entities.length > 0) {
               // Если есть каналы, выводим их по одному
               entities.forEach((entity) => {
                  const title = entity.title || "No Title";
                  const photoUrl = entity.photo_url || "./image/default-icon.png"; // Если photo_url отсутствует, используем иконку по умолчанию
                  const link = entity.link || "#"; // Если link отсутствует, оставляем пустую ссылку
                  addChannelMessageToChat(title, photoUrl, link);
               });
            } else {
               // Если каналов нет, выводим обычное сообщение ассистента
               if (fullMessage) {
                  addBotMessageToChat(fullMessage);
               } else {
                  addBotMessageToChat("Sorry, no matches were found for your search.");
               }
            }

            // Удаляем временное сообщение "Writing..."
            removeTemporaryBotMessage(tempMessage);
         })
         .catch((error) => {
            console.error("Error sending message:", error);

            // Удаляем временное сообщение "Writing..." в случае ошибки
            removeTemporaryBotMessage(tempMessage);

            // Добавляем сообщение об ошибке от бота
            addBotMessageToChat("Sorry, there was an error, please rewrite your message.");
         });
   }

   function addTemporaryBotMessage() {
      const tempMessageId = `temp-${Date.now()}`;
      const tempMessageHTML = `
      <div class="bot__message" id="${tempMessageId}">
         <img src="./image/assistant.png" alt="" />
         <div class="bot__message_info">
            <h5 class="bot__name">Assistant</h5>
            <p class="bot__message_text">Writing<span class="dots"></span></p>
         </div>
      </div>
   `;
      messagesContainer.insertAdjacentHTML("beforeend", tempMessageHTML);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      const dotsElement = document.querySelector(`#${tempMessageId} .dots`);
      let dotsCount = 0;
      const intervalId = setInterval(() => {
         if (dotsElement) {
            dotsCount = (dotsCount + 1) % 4;
            dotsElement.textContent = ".".repeat(dotsCount);
         }
      }, 500);

      return { tempMessageId, intervalId };
   }

   function removeTemporaryBotMessage({ tempMessageId, intervalId }) {
      clearInterval(intervalId);
      const tempMessageElement = document.getElementById(tempMessageId);
      if (tempMessageElement) {
         tempMessageElement.remove();
      }
   }

   submitButton.addEventListener("click", (e) => {
      e.preventDefault();

      if (validateSelections()) {
         const chatSection = document.querySelector("#chat");
         if (chatSection) {
            chatSection.scrollIntoView({ behavior: "smooth" });
         }

         sendDataToBackend();
      } else {
         console.log("error");
      }
   });

   function handleUserMessage() {
      const userMessage = userMessageInput.value.trim();

      if (userMessage === "") {
         userMessageInput.classList.add("error");
         return;
      }

      userMessageInput.classList.remove("error");
      addUserMessageToChat(userMessage);
      sendMessageToBackend(userMessage);
      userMessageInput.value = "";
   }

   sendMessageButton.addEventListener("click", (e) => {
      e.preventDefault();
      handleUserMessage();
   });

   userMessageInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
         e.preventDefault();
         handleUserMessage();
      }
   });

   userMessageInput.addEventListener("input", () => {
      if (userMessageInput.value.trim() !== "") {
         userMessageInput.classList.remove("error");
      }
   });
});
