document.addEventListener("DOMContentLoaded", () => {
   // Находим все слайдеры на странице
   const sliders = document.querySelectorAll(".Slider_pagination__ul_9_");

   sliders.forEach((slider) => {
      const track = slider.querySelector(".slick-track");
      const slides = slider.querySelectorAll(".slick-slide");
      const dots = slider.querySelectorAll(".slick-dots li");
      const slideWidth = slides[0].offsetWidth; // Ширина одного слайда
      const sliderWidth = slider.querySelector(".slick-list").offsetWidth; // Ширина видимой области слайдера
      const centerOffset = (sliderWidth - slideWidth) / 2; // Смещение для центрирования
      let currentIndex = 0; // Начинаем с первого слайда

      // Корректируем начальную позицию для первого слайда
      // Используем 0 для правильного центрирования первого слайда
      const initialPosition = 0;

      // Добавляем плавный переход для трека
      track.style.transition = "transform 0.5s ease-in-out";

      // Функция для обновления состояния слайдов
      const updateSlides = () => {
         let newPosition;

         if (currentIndex === 0) {
            // Для первого слайда используем начальную позицию
            newPosition = initialPosition;
         } else {
            // Для остальных слайдов рассчитываем позицию
            const slideElement = slides[currentIndex];
            const slideLeft = slideElement.offsetLeft;
            newPosition = slideLeft - centerOffset;
         }

         // Применяем трансформацию
         track.style.transform = `translate3d(-${newPosition}px, 0px, 0px)`;

         // Обновляем классы активных слайдов
         slides.forEach((slide, index) => {
            const isActive = index === currentIndex;
            slide.classList.toggle("slick-active", isActive);
            slide.classList.toggle("slick-center", isActive);
            slide.classList.toggle("slick-current", isActive);
            slide.setAttribute("aria-hidden", !isActive);
         });

         // Обновляем классы активных точек
         dots.forEach((dot, index) => {
            dot.classList.toggle("slick-active", index === currentIndex);
         });
      };

      // Добавляем обработчики кликов на точки
      dots.forEach((dot, index) => {
         dot.addEventListener("click", (e) => {
            e.preventDefault();
            currentIndex = index;
            updateSlides();
         });
      });

      // Инициализация слайдера
      updateSlides();
   });
});

document.addEventListener("DOMContentLoaded", () => {
   // Находим все элементы навигации
   const navItems = document.querySelectorAll(".Header_navItem__aNvef");

   // Добавляем обработчик клика для каждого элемента
   navItems.forEach((item) => {
      item.addEventListener("click", function (e) {
         // Находим все span элементы внутри навигации
         const allSpans = document.querySelectorAll(".Header_navItem__aNvef span");

         // Удаляем активный класс у всех span элементов
         allSpans.forEach((span) => {
            span.classList.remove("Header_activeSection__sLnQ1");
         });

         // Добавляем активный класс к span элементу внутри кликнутого пункта
         const span = this.querySelector("span");
         span.classList.add("Header_activeSection__sLnQ1");
      });
   });
});

document.addEventListener("DOMContentLoaded", function () {
   // Находим все элементы с классом Growth_flipCard__A54UC
   const flipCards = document.querySelectorAll(".Growth_flipCard__A54UC");

   // Для каждой карточки добавляем обработчики событий
   flipCards.forEach((card) => {
      // Добавляем класс при наведении мыши
      card.addEventListener("mouseenter", function () {
         card.classList.add("Growth_isFlipped__72xk2");
      });

      // Удаляем класс при уходе мыши
      card.addEventListener("mouseleave", function () {
         card.classList.remove("Growth_isFlipped__72xk2");
      });
   });
});

//document.addEventListener("DOMContentLoaded", function () {
//   // Регистрируем плагин ScrollTrigger
//   gsap.registerPlugin(ScrollTrigger);

//   // Получаем длину пути для анимации
//   const pathline = document.getElementById("pathline");
//   const pathLength = pathline.getTotalLength();

//   // Устанавливаем начальное состояние
//   gsap.set("#pathline", {
//      strokeDasharray: pathLength,
//      strokeDashoffset: pathLength,
//   });

//   // Скрываем все прямоугольники и линии изначально
//   gsap.set(".rect", {
//      opacity: 0,
//      scale: 0,
//      transformOrigin: "center center",
//   });

//   gsap.set(".line", {
//      opacity: 0,
//      scaleX: 0,
//      transformOrigin: "left center",
//   });

//   gsap.set('[fill="url(#paint0_linear_38_1938)"]', {
//      opacity: 0,
//   });

//   // Создаем временную шкалу для анимации
//   const tl = gsap.timeline({
//      scrollTrigger: {
//         trigger: ".Products_sticky__TAgV_",
//         start: "top center",
//         end: "bottom center",
//         scrub: 1,
//         // markers: true, // Раскомментируйте для отладки
//      },
//   });

//   // Анимация линии графика
//   tl.to(
//      "#pathline",
//      {
//         strokeDashoffset: 0,
//         duration: 2,
//         ease: "power2.out",
//      },
//      0
//   );

//   // Анимация прямоугольников
//   tl.to(
//      ".rect",
//      {
//         opacity: 1,
//         scale: 1,
//         stagger: {
//            each: 0.02,
//            from: "random",
//         },
//         duration: 0.5,
//      },
//      0.5
//   );

//   // Анимация линий
//   tl.to(
//      ".line",
//      {
//         opacity: 1,
//         scaleX: 1,
//         stagger: 0.01,
//         duration: 0.3,
//      },
//      0.7
//   );

//   // Анимация заливки графика
//   tl.to(
//      '[fill="url(#paint0_linear_38_1938)"]',
//      {
//         opacity: 1,
//         duration: 1,
//      },
//      1
//   );

//   // Альтернативный вариант - анимация при появлении в области видимости
//   const observer = new IntersectionObserver(
//      (entries) => {
//         entries.forEach((entry) => {
//            if (entry.isIntersecting) {
//               // Если элемент не виден при прокрутке, запускаем анимацию здесь
//               if (!ScrollTrigger.isScrolling()) {
//                  const tl = gsap.timeline();

//                  tl.to(
//                     "#pathline",
//                     {
//                        strokeDashoffset: 0,
//                        duration: 2,
//                        ease: "power2.out",
//                     },
//                     0
//                  );

//                  tl.to(
//                     ".rect",
//                     {
//                        opacity: 1,
//                        scale: 1,
//                        stagger: {
//                           each: 0.02,
//                           from: "random",
//                        },
//                        duration: 0.5,
//                     },
//                     0.5
//                  );

//                  tl.to(
//                     ".line",
//                     {
//                        opacity: 1,
//                        scaleX: 1,
//                        stagger: 0.01,
//                        duration: 0.3,
//                     },
//                     0.7
//                  );

//                  tl.to(
//                     '[fill="url(#paint0_linear_38_1938)"]',
//                     {
//                        opacity: 1,
//                        duration: 1,
//                     },
//                     1
//                  );
//               }

//               observer.unobserve(entry.target);
//            }
//         });
//      },
//      { threshold: 0.3 }
//   );

//   observer.observe(document.querySelector(".Products_sticky__TAgV_"));
//});
