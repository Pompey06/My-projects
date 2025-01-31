"use strict";

window.addEventListener("load", windowLoad);

function windowLoad() {
   // Function to initialize counters
   function digitsCountersInit(digitsCountersItems) {
      let digitsCounters = digitsCountersItems
         ? digitsCountersItems
         : document.querySelectorAll("[data-digits-counter]");
      if (digitsCounters.length) {
         digitsCounters.forEach((digitsCounter) => {
            digitsCountersAnimate(digitsCounter);
         });
      }
   }

   // Function to animate counters
   function digitsCountersAnimate(digitsCounter) {
      let startTimestamp = null;
      const duration = parseInt(digitsCounter.dataset.digitsCounter)
         ? parseInt(digitsCounter.dataset.digitsCounter)
         : 1000;

      // Extract the start value and symbols from the element's content
      const originalText = digitsCounter.innerHTML.trim();
      const endValue = parseFloat(originalText.replace(/[^0-9.]/g, "")) || 0; // Extract only numbers and decimal point
      const startPosition = 0; // Start counting from 0

      // Detect prefix and suffix (e.g., "$", "%")
      const prefix = originalText.match(/^[^\d]+/)?.[0] || ""; // Non-numeric characters at the start
      const suffix = originalText.match(/[^\d]+$/)?.[0] || ""; // Non-numeric characters at the end

      // Determine the number of decimal places
      const decimalPlaces = (originalText.split(".")[1] || "").length;

      const isPercentage = suffix.includes("%"); // Проверка, является ли значение процентом

      const step = (timestamp) => {
         if (!startTimestamp) startTimestamp = timestamp;
         const progress = Math.min((timestamp - startTimestamp) / duration, 1);
         const currentValue = (progress * (endValue - startPosition) + startPosition).toFixed(decimalPlaces); // Keep decimal places

         // Format the number with thousand separators
         const formattedValue = currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

         // Update the element's content with the formatted value
         digitsCounter.innerHTML = isPercentage ? `${formattedValue}${suffix}` : `${prefix}${formattedValue}${suffix}`; // Добавляем % только для процентных значений

         if (progress < 1) {
            window.requestAnimationFrame(step);
         } else {
            // Ensure the final value is properly formatted
            const finalValue = endValue
               .toFixed(decimalPlaces) // Keep decimal places
               .toString()
               .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            digitsCounter.innerHTML = isPercentage ? `${prefix}${finalValue}%` : `${prefix}${finalValue}${suffix}`;
         }
      };

      window.requestAnimationFrame(step);
   }

   // Initialize counters on page load
   digitsCountersInit();
}

const input = document.querySelector(".wallet__input");
const cursor = document.querySelector(".custom-cursor");

// Функция для вычисления ширины текста
function getTextWidth(text, font) {
   const canvas = document.createElement("canvas");
   const context = canvas.getContext("2d");
   context.font = font;
   return context.measureText(text).width;
}

// Обновление позиции курсора
function updateCursorPosition() {
   const caretPosition = input.selectionStart; // Позиция каретки
   const inputValue = input.value.substring(0, caretPosition); // Текст до каретки
   const font = window.getComputedStyle(input).font; // Шрифт инпута
   const textWidth = getTextWidth(inputValue, font); // Ширина текста до каретки

   cursor.style.left = `${18 + textWidth + 2}px`; // Обновляем позицию курсора с отступом 1px
   cursor.style.display = "block"; // Показываем курсор
}

// Событие ввода текста
input.addEventListener("input", updateCursorPosition);

// Событие фокуса
input.addEventListener("focus", () => {
   cursor.style.display = "block"; // Показываем курсор
   updateCursorPosition();
});

// Событие потери фокуса
input.addEventListener("blur", () => {
   cursor.style.display = "none"; // Скрываем курсор
});

// Событие перемещения каретки (например, стрелками)
input.addEventListener("keyup", updateCursorPosition);
input.addEventListener("click", updateCursorPosition);
