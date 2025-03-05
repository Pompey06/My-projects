var swiper = new Swiper(".swiper-characters", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 3,
  spaceBetween: 30,
  breakpoints: {
    1600: {
      slidesPerView: 3,
    },
    1000: {
      slidesPerView: 2,
    },
    320: {
      slidesPerView: 1,
    },
  },
});

const video = document.querySelector("[data-video]");
const playButton = document.querySelector("[data-video-play]");
const darkBackground = document.querySelector("[data-video-dark]");

playButton.addEventListener("click", function () {
  video.play();
  video.controls = true;
  darkBackground.style.display = "none";
  playButton.style.display = "none";
});