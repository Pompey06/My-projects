/* 
  Елементу при клике на котрый должен открыться попап 
  нужно добавить attribute data-open-popup="popup-id"

  Елементу при клике на котрый попап закроеться data-close-popup
*/
let unlock = true;
const timeout = 200;
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding");

function init_popup() {
   const popupLinks = document.querySelectorAll("[data-open-popup]");

   if (popupLinks.length > 0) {
      for (let index = 0; index < popupLinks.length; index++) {
         const popupLink = popupLinks[index];
         popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute("data-open-popup");
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
         });
      }
   }
   const popupCloseIcon = document.querySelectorAll("[data-close-popup]");
   if (popupCloseIcon.length > 0) {
      for (let index = 0; index < popupCloseIcon.length; index++) {
         const el = popupCloseIcon[index];
         el.addEventListener("click", function (e) {
            popupClose(el.closest(".popup"));
            e.preventDefault();
         });
      }
   }

   document.addEventListener("keydown", function (e) {
      if (e.code === "Escape") {
         const popupActive = document.querySelector(".popup.open");
         popupClose(popupActive);
      }
   });

   (function () {
      // проверяем поддержку
      if (!Element.prototype.closest) {
         // реализуем
         Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
               if (node.matches(css)) return node;
               else node = node.parentElement;
            }
            return null;
         };
      }
   })();
   (function () {
      // проверяем поддержку
      if (!Element.prototype.matches) {
         // определяем свойство
         Element.prototype.matches =
            Element.prototype.matchesSelector ||
            //Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
      }
   })();
}

function popupOpenBySelector(curentPopupSelector) {
   const curentPopup = document.getElementById(curentPopupSelector);
   popupOpen(curentPopup);
}

function popupCloseBySelector(activePopupSelector) {
   const popupActive = document.getElementById(activePopupSelector);
   popupClose(popupActive);
}

function popupOpen(curentPopup) {
   if (curentPopup && unlock) {
      const popupActive = document.querySelector(".popup.open");
      if (popupActive) {
         popupClose(popupActive, false);
      } else {
         bodyLock();
      }
      curentPopup.classList.add("open");
      curentPopup.addEventListener("click", function (e) {
         if (!e.target.closest(".popup__content")) {
            popupClose(e.target.closest(".popup"));
         }
      });
   }
}

function popupClose(popupActive, doUnlock = true) {
   if (unlock) {
      popupActive.classList.remove("open");
      if (doUnlock) {
         bodyUnLock();
      }
   }
}

function bodyLock() {
   const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

   if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];
         el.style.paddingRight = lockPaddingValue;
      }
   }
   body.style.paddingRight = lockPaddingValue;
   body.classList.add("_lock");

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

function bodyUnLock() {
   setTimeout(function () {
      if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = "0px";
         }
      }
      body.style.paddingRight = "0px";
      body.classList.remove("_lock");
   }, timeout);

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

init_popup();

document.addEventListener("DOMContentLoaded", function () {
   const form = document.getElementById("signup-form");
   const inputs = form.querySelectorAll("input[required]");
   const popup = document.getElementById("contact");

   // Функция для закрытия модального окна
   function closePopup() {
      popup.classList.remove("open");
      document.body.classList.remove("_lock");
   }

   // Функция для очистки полей формы
   function clearForm() {
      inputs.forEach((input) => {
         input.value = "";
         input.classList.remove("error");
      });

      // Скрываем все сообщения об ошибках
      document.querySelectorAll(".error-message").forEach((message) => {
         message.style.display = "none";
      });
   }

   // Validate on submit
   form.addEventListener("submit", function (e) {
      e.preventDefault();
      let isValid = true;

      inputs.forEach((input) => {
         if (!validateInput(input)) {
            isValid = false;
         }
      });

      if (isValid) {
         // Форма валидна, выполняем нужные действия
         console.log("Form submitted successfully");

         // 1. Очищаем поля формы
         clearForm();

         // 2. Закрываем модальное окно
         closePopup();

         // 3. Добавляем класс show элементу form_modal
         const formModal = document.querySelector(".form_modal");
         if (formModal) {
            formModal.classList.add("show");

            // Добавляем анимацию появления
            formModal.style.animation = "fadeIn 0.5s ease forwards";
         }

         // Опционально: показываем уведомление об успешной отправке
         showSuccessNotification();
      }
   });

   // Validate on input change
   inputs.forEach((input) => {
      input.addEventListener("input", function () {
         validateInput(this);
      });

      input.addEventListener("blur", function () {
         validateInput(this);
      });
   });

   function validateInput(input) {
      let isValid = true;

      if (input.type === "email") {
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         isValid = emailRegex.test(input.value);
      } else {
         isValid = input.value.trim() !== "";
      }

      if (isValid) {
         input.classList.remove("error");
      } else {
         input.classList.add("error");
      }

      // Показываем или скрываем сообщение об ошибке
      const errorMessage = input.nextElementSibling;
      if (errorMessage && errorMessage.classList.contains("error-message")) {
         errorMessage.style.display = isValid ? "none" : "block";
      }

      return isValid;
   }

   // Функция для показа уведомления об успешной отправке
   function showSuccessNotification() {
      // Создаем элемент уведомления
      const notification = document.createElement("div");
      notification.className = "success-notification";
      notification.innerHTML = `
         <div class="success-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#8A7EFE" stroke-width="2"/>
               <path d="M8 12L10.5 14.5L16 9" stroke="#8A7EFE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
         </div>
         <p>Your account has been created successfully!</p>
      `;

      // Добавляем стили для уведомления
      const style = document.createElement("style");
      style.textContent = `
         .success-notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(26, 26, 46, 0.95);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 12px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            z-index: 9999;
            border: 1px solid rgba(138, 126, 254, 0.3);
            animation: slideIn 0.3s ease forwards, fadeOut 0.3s ease 3s forwards;
            max-width: 300px;
         }
         
         .success-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(138, 126, 254, 0.1);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            flex-shrink: 0;
         }
         
         .success-notification p {
            margin: 0;
            font-size: 14px;
         }
         
         @keyframes slideIn {
            from {
               transform: translateX(100%);
               opacity: 0;
            }
            to {
               transform: translateX(0);
               opacity: 1;
            }
         }
         
         @keyframes fadeOut {
            from {
               opacity: 1;
            }
            to {
               opacity: 0;
               visibility: hidden;
            }
         }
         
         @keyframes fadeIn {
            from {
               opacity: 0;
            }
            to {
               opacity: 1;
            }
         }
      `;

      // Добавляем стили и уведомление в документ
      document.head.appendChild(style);
      document.body.appendChild(notification);

      // Удаляем уведомление через 3.5 секунды
      setTimeout(() => {
         notification.remove();
      }, 3500);
   }

   // Обработчик для закрытия модального окна по клику на крестик
   const closeButtons = document.querySelectorAll("[data-close-popup]");
   closeButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
         e.preventDefault();
         closePopup();
      });
   });

   // Обработчик для закрытия модального окна по клику на область вне контента
   const popupArea = document.querySelector(".popup__area");
   if (popupArea) {
      popupArea.addEventListener("click", function () {
         closePopup();
      });
   }
});
