const swiper = new Swiper(".about-swiper", {
   direction: "vertical",
   slidesPerView: 1,
   spaceBetween: 30,
   autoplay: {
      delay: 3000,
      disableOnInteraction: false,
   },
   pagination: {
      el: ".custom-pagination",
      clickable: true,
   },
});

// Получаем все слайды
const slides = document.querySelectorAll(".how__cards .swiper-slide");
const count = slides.length;
// Если слайдов четное число – выбираем левый из двух центральных, иначе центральный
const initialSlideIndex = count % 2 === 0 ? count / 2 - 1 : Math.floor(count / 2);

const swiper2 = new Swiper(".how__cards", {
   initialSlide: initialSlideIndex, // задаем активный слайд при загрузке
   slidesPerView: "auto",
   centeredSlides: true,
   spaceBetween: 160,
   navigation: {
      nextEl: ".right",
      prevEl: ".left",
   },
});
