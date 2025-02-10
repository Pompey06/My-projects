document.addEventListener("DOMContentLoaded", () => {
   const mario = document.querySelector(".loading__mario");
   const overlay = document.querySelector(".overlay");
   const loadingSection = document.querySelector(".loading");
   const mainContent = document.querySelectorAll(".wrapper")[1];

   // Показываем первую секцию
   loadingSection.style.display = "flex";
   mainContent.style.display = "none";

   mario.addEventListener("animationend", () => {
      // Показываем оверлей и запускаем анимацию затемнения
      overlay.style.display = "block";
      overlay.classList.add("fade-in");

      overlay.addEventListener("animationend", function onFadeInEnd() {
         overlay.removeEventListener("animationend", onFadeInEnd);

         // Меняем контент
         loadingSection.style.display = "none";
         mainContent.style.display = "block";

         // Добавляем небольшую задержку перед второй анимацией
         setTimeout(() => {
            overlay.classList.remove("fade-in");
            void overlay.offsetWidth; // Форсируем перерисовку
            overlay.classList.add("fade-out");
         }, 50);
      });
   });

   // Слушаем завершение анимации исчезновения
   overlay.addEventListener("animationend", (e) => {
      if (e.animationName === "fadeOut") {
         overlay.classList.remove("fade-out");
      }
   });
});
