document.addEventListener("DOMContentLoaded", () => {
   const analyzeButton = document.querySelector(".analyze"); // Кнопка analyze
   const start = document.querySelector(".start"); // Элемент start
   const form = document.querySelector(".form"); // Элемент form
   const analyzing = document.querySelector(".chat__result"); // Элемент analyzing
   const waiting = document.querySelector(".waiting"); // Элемент waiting
   const inputField = document.querySelector(".input"); // Поле ввода

   // Функция для выполнения действий
   const performAnalysis = () => {
      // Убираем класс none у analyzing и waiting
      analyzing.classList.remove("none");
      waiting.classList.remove("none");

      // Добавляем класс none к start и form
      start.classList.add("none");
      form.classList.add("none");
   };

   // Обработчик для кнопки analyze
   analyzeButton.addEventListener("click", () => {
      performAnalysis();
   });

   // Обработчик для нажатия Enter в поле ввода
   inputField.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
         // Проверяем, что нажата клавиша Enter
         event.preventDefault(); // Отменяем стандартное действие (отправку формы)
         if (inputField.value.trim() !== "") {
            // Проверяем, что поле не пустое
            inputField.classList.remove("error"); // Убираем класс ошибки, если он был
            performAnalysis();
         } else {
            inputField.classList.add("error"); // Добавляем класс ошибки
         }
      }
   });

   // Убираем класс ошибки при вводе текста
   inputField.addEventListener("input", () => {
      if (inputField.classList.contains("error")) {
         inputField.classList.remove("error");
      }
   });
});

document.addEventListener("scroll", () => {
   const line = document.getElementById("line");
   const lineRect = line.getBoundingClientRect();

   // Проверяем, находится ли линия в видимой области
   if (lineRect.top < window.innerHeight && lineRect.bottom > 0) {
      line.classList.add("active"); // Меняем цвет линии
   } else {
      line.classList.remove("active"); // Возвращаем исходный цвет
   }
});
