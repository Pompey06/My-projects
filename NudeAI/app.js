// Находим все нужные элементы
const fileInput = document.getElementById("file");
const fileInput2 = document.getElementById("file2");
const chatWindow = document.querySelector(".chat__window");
const uploadedImage = document.querySelector(".uploaded__image");
const resultBlock = document.querySelector(".result");
const uploadedImg = document.querySelector(".uploaded");
const deleteBtn = document.querySelector(".delete");
const nextBtn = document.querySelector(".next");
const saveBtn = document.querySelector(".save");
const resultImage = document.querySelector(".result__image");

function updateCardBackgrounds() {
   if (clothesGroups.pose) {
      const poseItems = clothesGroups.pose.querySelectorAll(".clothes__item");
      if (poseItems.length) {
         poseItems[0].style.backgroundImage = `url(${uploadedImg.src})`;
      }
   }
}

// Функция обработки загрузки файла
function handleFileUpload(input) {
   const file = input.files[0];

   if (file) {
      // Создаем URL для загруженного файла
      const imageUrl = URL.createObjectURL(file);

      // Устанавливаем загруженное изображение в элемент .uploaded
      uploadedImg.src = imageUrl;

      // Переходим в режим показа загруженной картинки
      chatWindow.classList.add("none");
      uploadedImage.classList.remove("none");
      resultBlock.classList.add("none");

      // Обновляем фон карточек, где должна отображаться загруженная картинка
      updateCardBackgrounds();
   }
}

// Обработчик для первого input file
fileInput.addEventListener("change", (event) => {
   handleFileUpload(event.target);
});

// Обработчик для второго input file
fileInput2.addEventListener("change", (event) => {
   handleFileUpload(event.target);
});

// Обработчик кнопки удаления
deleteBtn.addEventListener("click", () => {
   // Очищаем оба input file
   fileInput.value = "";
   fileInput2.value = "";

   // Возвращаем исходное изображение
   uploadedImg.src = "./image/uploaded.png";

   // Возвращаемся к начальному состоянию
   chatWindow.classList.remove("none");
   uploadedImage.classList.add("none");
   resultBlock.classList.add("none");

   // Обновляем фон карточек, чтобы подставить исходную картинку
   updateCardBackgrounds();
});

nextBtn.addEventListener("click", async () => {
   // Hide uploaded__image and result
   uploadedImage.classList.add("none");
   resultBlock.classList.add("none");

   // Get selected clothes, butt size, body type, and pose
   const selectedClothes = [];
   const selectedButtSize = [];
   const selectedBodyType = [];
   const selectedPose = [];

   // Iterate through all clothing groups and extract selected items
   Object.entries(clothesGroups).forEach(([groupName, group]) => {
      if (group) {
         const activeItem = group.querySelector(".clothes__item.active");
         if (activeItem) {
            if (groupName === "butt") {
               selectedButtSize.push(activeItem.textContent.trim());
            } else if (groupName === "type") {
               selectedBodyType.push(activeItem.textContent.trim());
            } else if (groupName === "pose") {
               selectedPose.push(activeItem.textContent.trim());
            } else {
               selectedClothes.push(activeItem.textContent.trim());
            }
         }
      }
   });

   // Get uploaded image file
   const imageFile = document.querySelector('input[type="file"]').files[0];

   // Log all collected data to the console
   console.log("Selected Clothes:", selectedClothes);
   console.log("Selected Butt Size:", selectedButtSize);
   console.log("Selected Body Type:", selectedBodyType);
   console.log("Selected Pose:", selectedPose);
   console.log("Uploaded Image:", imageFile ? imageFile.name : "No file selected");

   // Create FormData for submission
   const formData = new FormData();
   formData.append("image", imageFile);
   formData.append("cloth", selectedClothes.join(", "));
   formData.append("butt_size", selectedButtSize.join(", "));
   formData.append("body_type", selectedBodyType.join(", "));
   formData.append("pose", selectedPose.join(", "));
   // Show "Generating..." message
   const generatingText = document.createElement("p");
   generatingText.style.fontSize = "16px";
   generatingText.style.color = "blue";
   generatingText.style.fontWeight = "bold";
   generatingText.style.textAlign = "center";
   generatingText.style.marginTop = "20px";
   resultBlock.appendChild(generatingText);
   resultBlock.classList.remove("none"); // Показываем блок результата
   document.querySelector(".result__image").src = "";
   try {
      const response = await fetch("https://nude-ai.site:443/process-image/", {
         method: "POST",
         body: formData,
      });

      if (!response.ok) {
         throw new Error(`Server response error: ${response.status}`);
      }

      const generatingText = document.createElement("p");
      generatingText.textContent = "Generating... Please wait.";
      resultBlock.appendChild(generatingText);
      document.querySelector(".result__image").src = "";
      setTimeout(() => {
         generatingText.style.display = "none";
         document.querySelector(".result__image").src = "http://62.72.20.247:4000/uploads/resImage.png";
         resultBlock.classList.remove("none");
         generatingText.style.display = "none";
      }, 20000);
   } catch (error) {
      console.error("Server request error:", error);

      generatingText.style.display = "none";
      const errorText = document.createElement("p");
      errorText.textContent = "Error: Failed to process the image. Please try again.";
      errorText.style.color = "red";
      errorText.style.fontSize = "16px";
      errorText.style.textAlign = "center";
      errorText.style.marginTop = "20px";
      resultBlock.appendChild(errorText);
   }
});

// Обработчик кнопки save (скачивание изображения)
saveBtn.addEventListener("click", () => {
   // Создаем ссылку для скачивания
   const link = document.createElement("a");
   link.href = resultImage.src;
   link.download = "result-image.png"; // Имя файла при скачивании

   // Добавляем ссылку на страницу, кликаем по ней и удаляем
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
});

// Обработчик для кнопки удаления в блоке result
const resultDeleteBtn = document.querySelector(".result-delete");
if (resultDeleteBtn) {
   resultDeleteBtn.addEventListener("click", () => {
      // Очищаем оба input file
      fileInput.value = "";
      fileInput2.value = "";

      // Возвращаемся к начальному состоянию
      chatWindow.classList.remove("none");
      uploadedImage.classList.add("none");
      resultBlock.classList.add("none");
      uploadedImg.src = "./image/uploaded.png";

      // Обновляем фон карточек, чтобы подставить исходную картинку
      updateCardBackgrounds();
   });
}

// Определяем группы карточек
const clothesGroups = {
   clothes: document.querySelector(".clothes:not(.bust):not(.butt):not(.age)"),
   butt: document.querySelector(".clothes.butt"),
   type: document.querySelector(".clothes.type"),
   pose: document.querySelector(".clothes.pose"),
};

// Инициализируем активное состояние и обработчики кликов для каждой группы
Object.entries(clothesGroups).forEach(([groupName, group]) => {
   if (!group) return;

   const items = group.querySelectorAll(".clothes__item");

   if (items.length) {
      // Делаем первый элемент активным по умолчанию
      items[0].classList.add("active");
   }

   items.forEach((item) => {
      item.addEventListener("click", () => {
         items.forEach((el) => {
            el.classList.remove("active");
         });
         item.classList.add("active");
      });
   });
});

// При загрузке страницы обновляем фон карточек (будет исходная картинка)
updateCardBackgrounds();
