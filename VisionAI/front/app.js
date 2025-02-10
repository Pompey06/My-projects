document.addEventListener("DOMContentLoaded", () => {
   const form = document.querySelector(".form");
   const analyzeBtn = document.querySelector(".analyze");
   const fileInput = document.querySelector("#file");
   const chatImage = document.querySelector(".chat__image");
   const objectInput = document.querySelector(".input");
   const inputField = document.querySelector(".input");

   const waitingDiv = document.querySelector(".waiting");
   const chatResult = document.querySelector(".chat__result");
   const startImage = document.querySelector(".start");
   const domain = window.location.hostname === "localhost" ? "http://localhost:8000" : "";

   analyzeBtn.addEventListener("click", async () => {
      if (!fileInput.files || !fileInput.files[0]) {
         alert("Please select a file first");
         return;
      }

      // Show analyzing state
      form.classList.add("none");
      startImage.classList.add("none");
      chatResult.classList.remove("none");
      waitingDiv.classList.remove("none");

      const formData = new FormData();
      formData.append("image", fileInput.files[0]);
      formData.append("tags", objectInput.value || "");

      try {
         const response = await fetch(`${domain}/api/generate_yolo`, {
            method: "POST",
            body: formData,
         });

         const data = await response.json();

         if (data.gen_id) {
            const checkStatus = async () => {
               const statusResponse = await fetch(`${domain}/api/status/${data.gen_id}`);
               const statusData = await statusResponse.json();

               if (statusData.status === "completed") {
                  const imageResponse = await fetch(`${domain}/api/commonYOLO`, {
                     method: "POST",
                     headers: {
                        "Content-Type": "application/json",
                     },
                     body: JSON.stringify({ ident: data.gen_id }),
                  });
                  const responseData = await imageResponse.json();

                  // Hide analyzing state and show result
                  chatResult.classList.add("none");
                  waitingDiv.classList.add("none");
                  startImage.classList.remove("none");
                  startImage.src = domain + responseData.url;
                  form.classList.remove("none");
               } else if (statusData.status === "failed") {
                  alert("Detection failed");
                  // Reset UI state
                  chatResult.classList.add("none");
                  waitingDiv.classList.add("none");
                  startImage.classList.remove("none");
               } else {
                  setTimeout(checkStatus, 1000);
               }
            };

            checkStatus();
         }
      } catch (error) {
         console.error("Error:", error);
         alert("An error occurred during detection");
         // Reset UI state
         chatResult.classList.add("none");
         waitingDiv.classList.add("none");
         startImage.classList.remove("none");
      }
   });

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
});

const lineActive = document.querySelector(".line-active");
const lineDef = document.querySelector(".line-def");

window.addEventListener("scroll", () => {
   const scrollTop = window.scrollY;
   const windowHeight = window.innerHeight;
   const docHeight = document.documentElement.scrollHeight;

   const lineDefOffset = lineDef.getBoundingClientRect().top + scrollTop;

   if (scrollTop + windowHeight >= lineDefOffset) {
      const progress = (scrollTop + windowHeight - lineDefOffset) / (docHeight - lineDefOffset);

      lineActive.style.height = `${Math.min(progress * 100, 100)}%`;
   }
});

// Получаем необходимые элементы
const fileInput = document.getElementById("file");
const previewImage = document.getElementById("preview");
const downloadBtn = document.querySelector(".download");
const analyzeBtn = document.querySelector(".analyze");
const input = document.querySelector(".input");

// Изначально скрываем кнопку скачивания
downloadBtn.style.display = "none";

// Слушаем событие изменения файла для загрузки
fileInput.addEventListener("change", (event) => {
   const file = event.target.files[0];

   if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
         previewImage.src = e.target.result;
         previewImage.classList.remove("start");
         // Скрываем кнопку скачивания при загрузке нового файла
         downloadBtn.style.display = "none";
      };

      reader.readAsDataURL(file);
   }
});

// Функция для проверки статуса
async function checkStatus(genId) {
   try {
      const response = await fetch(`/api/status/${genId}`);
      const data = await response.json();

      if (data.status === "completed") {
         // Когда запрос выполнен успешно
         const yoloResponse = await fetch("/api/commonYOLO", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ ident: genId }),
         });

         const yoloData = await yoloResponse.json();

         // Обновляем изображение и показываем кнопку скачивания
         previewImage.src = yoloData.url;
         downloadBtn.style.display = "block";
         return true;
      } else if (data.status === "failed") {
         console.error("Generation failed");
         return true;
      }
      return false;
   } catch (error) {
      console.error("Error checking status:", error);
      return true;
   }
}

// Функция для отправки файла на сервер
async function uploadFile() {
   const file = fileInput.files[0];
   if (!file) return;

   const formData = new FormData();
   formData.append("image", file);
   formData.append("tags", input.value);

   try {
      const response = await fetch("/api/generate_yolo", {
         method: "POST",
         body: formData,
      });

      const data = await response.json();

      if (data.gen_id) {
         // Начинаем проверять статус каждые 2 секунды
         const checkInterval = setInterval(async () => {
            const isDone = await checkStatus(data.gen_id);
            if (isDone) {
               clearInterval(checkInterval);
            }
         }, 2000);
      }
   } catch (error) {
      console.error("Error uploading file:", error);
   }
}

// Слушаем клик на кнопку анализа
analyzeBtn.addEventListener("click", uploadFile);

// Слушаем событие клика для скачивания
downloadBtn.addEventListener("click", function () {
   const link = document.createElement("a");
   const imageUrl = previewImage.src;
   const fileName = imageUrl.split("/").pop() || "downloaded-image.png";

   if (imageUrl.startsWith("data:")) {
      link.href = imageUrl;
   } else {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = previewImage.naturalWidth;
      canvas.height = previewImage.naturalHeight;

      context.drawImage(previewImage, 0, 0);
      link.href = canvas.toDataURL("image/png");
   }

   link.download = fileName;
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
});
