var mySwiper1 = new Swiper(".circle-slider__container", {
   //loop: true,
   //autoHeight: true,
   spaceBetween: 12,
   watchSlidesVisibility: true,
   slidesPerView: 1,
   watchSlidesProgress: true,
   pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
   },
   navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
   },
});

var mySwiper2 = new Swiper(".circle-textslider__container", {
   //loop: true,
   //autoHeight: true,
   spaceBetween: 12,
   watchSlidesVisibility: true,
   slidesPerView: "auto",
   watchSlidesProgress: true,
   slidesPerView: 1,
   pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
   },
});
mySwiper1.controller.control = mySwiper2;
mySwiper2.controller.control = mySwiper1;

function generateCalendarSlides() {
   const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
   ];
   const swiperWrapper = document.querySelector(".swiper-wrapper");

   // Очищаем текущие слайды
   swiperWrapper.innerHTML = "";

   // Генерируем слайды для каждого месяца
   months.forEach((month, index) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";

      // Создаем структуру слайда
      slide.innerHTML = `
           <div class="calendar__head">
               <div class="calendar__month">${month}</div>
           </div>
           <div class="calendar__main">
               ${generateDaysForMonth(index)}
           </div>
           <div class="calendar__footer">
               <div class="calendar__month">
                   <span class="arrow-left swiper-button-prev-0">${months[(index + 11) % 12]}</span>
                   <span class="arrow-right swiper-button-next-0">${months[(index + 1) % 12]}</span>
               </div>
           </div>
       `;

      swiperWrapper.appendChild(slide);
   });
}

function generateCalendarSlides() {
   const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
   ];
   const swiperWrapper = document.querySelector(".swiper-wrapper");

   // Очищаем текущие слайды
   swiperWrapper.innerHTML = "";

   // Генерируем слайды для каждого месяца
   months.forEach((month, index) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";

      // Создаем структуру слайда
      slide.innerHTML = `
           <div class="calendar__head">
               <div class="calendar__month">${month}</div>
           </div>
           <div class="calendar__main">
               ${generateDaysForMonth(index)}
           </div>
           <div class="calendar__footer">
               <div class="calendar__month">
                   <span class="arrow-left swiper-button-prev-0">${months[(index + 11) % 12]}</span>
                   <span class="arrow-right swiper-button-next-0">${months[(index + 1) % 12]}</span>
               </div>
           </div>
       `;

      swiperWrapper.appendChild(slide);
   });
}

function generateCalendarSlides() {
   const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
   ];
   const swiperWrapper = document.querySelector(".swiper-wrapper");

   swiperWrapper.innerHTML = "";

   months.forEach((month, index) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";

      slide.innerHTML = `
           <div class="calendar__head">
               <div class="calendar__month">${month}</div>
           </div>
           <div class="calendar__main">
               ${generateDaysForMonth(index)}
           </div>
           <div class="calendar__footer">
               <div class="calendar__month">
                   <span class="arrow-left swiper-button-prev-0">${months[(index + 11) % 12]}</span>
                   <span class="arrow-right swiper-button-next-0">${months[(index + 1) % 12]}</span>
               </div>
           </div>
       `;

      swiperWrapper.appendChild(slide);
   });
}

// Создаем объект для хранения дней с иконками для каждого месяца
const monthsWithIcons = {};

// Генерируем дни с иконками один раз при загрузке скрипта
function generateIconsForYear() {
   const icons = ["moon", "leaf", "drop", "apple", "gym"];

   for (let month = 0; month < 12; month++) {
      const daysWithIcons = new Map(); // Используем Map для хранения пар день-иконка
      const daysInMonth = new Date(2025, month + 1, 0).getDate();
      const numberOfIcons = Math.floor(Math.random() * (10 - 7 + 1)) + 7; // от 7 до 10 иконок

      // Выбираем случайные дни и иконки
      while (daysWithIcons.size < numberOfIcons) {
         const randomDay = Math.floor(Math.random() * daysInMonth) + 1;
         const randomIcon = icons[Math.floor(Math.random() * icons.length)];

         if (!daysWithIcons.has(randomDay)) {
            daysWithIcons.set(randomDay, randomIcon);
         }
      }

      monthsWithIcons[month] = daysWithIcons;
   }
}

// Генерируем один раз при инициализации
generateIconsForYear();

function generateCalendarSlides() {
   const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
   ];
   const swiperWrapper = document.querySelector(".swiper-wrapper");

   swiperWrapper.innerHTML = "";

   months.forEach((month, index) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";

      slide.innerHTML = `
            <div class="calendar__head">
                <div class="calendar__month">${month}</div>
            </div>
            <div class="calendar__main">
                ${generateDaysForMonth(index)}
            </div>
            <div class="calendar__footer">
                <div class="calendar__month">
                    <span class="arrow-left swiper-button-prev-0">${months[(index + 11) % 12]}</span>
                    <span class="arrow-right swiper-button-next-0">${months[(index + 1) % 12]}</span>
                </div>
            </div>
        `;

      swiperWrapper.appendChild(slide);
   });
}

function generateDaysForMonth(monthIndex) {
   const year = 2025;
   const date = new Date(year, monthIndex, 1);
   const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
   let daysHtml = "";

   const totalCells = 35;
   let dayCounter = 1;
   let nextMonthCounter = 1;

   const monthIcons = monthsWithIcons[monthIndex];

   for (let i = 0; i < totalCells; i++) {
      if (dayCounter <= daysInMonth) {
         const icon = monthIcons.has(dayCounter) ? `<span class="icon icon-${monthIcons.get(dayCounter)}"></span>` : "";

         daysHtml += `
                <div class="calendar__current">
                    <b>${dayCounter}${icon}</b>
                </div>
            `;
         dayCounter++;
      } else {
         daysHtml += `
                <div class="calendar__next">
                    <b>${nextMonthCounter}</b>
                </div>
            `;
         nextMonthCounter++;
      }
   }

   return daysHtml;
}

// Инициализируем календарь
generateCalendarSlides();

// Инициализируем Swiper
// Инициализируем Swiper
var mySwiper1 = new Swiper(".calendar-slider-0__container", {
   initialSlide: 1, // Устанавливаем февраль как активный слайд (индекс 1)
   spaceBetween: 12,
   watchSlidesVisibility: true,
   slidesPerView: 1,
   watchSlidesProgress: true,
   allowTouchMove: true,
   pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
   },
   navigation: {
      nextEl: ".swiper-button-next-0",
      prevEl: ".swiper-button-prev-0",
   },
});

//===================================================================================================================================

Inputmask({ mask: "+1 (999) 999-99-99" }).mask(tel);
Inputmask({ mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]" }).mask(email);

//===================================================================================================================================

let qiuz, qiuzProgress, qslides, qactiveSlide, qSlidesCount;

function $(el) {
   return document.getElementById(el);
}

function init() {
   qiuz = document.querySelector(".quiz");
   qiuzProgress = document.querySelector(".quiz-progress__bar");
   qiuzProgressValue = document.querySelector(".quiz-progress__value");
   qslides = qiuz.querySelectorAll(".quiz__slide");

   qButtonsNext = qiuz.querySelectorAll(".quiz-slide__next");
   qButtonsPrev = qiuz.querySelectorAll(".quiz-slide__prev");

   for (let btn of qButtonsNext) {
      btn.onclick = btnClick;
   }

   for (let btn of qButtonsPrev) {
      btn.onclick = btnClick;
   }

   qactiveSlide = 0;
   qSlidesCount = qslides.length;

   // charts

   charts = document.querySelector("progress__main");
}

function btnClick(ev) {
   // Убираем активный класс с текущего слайда
   qslides[qactiveSlide].classList.remove("_active");

   // Логика переключения слайдов
   if (ev.target.className == "quiz-slide__next") qactiveSlide++;

   if (ev.target.className == "quiz-slide__prev") qactiveSlide--;

   // Ограничиваем qactiveSlide, чтобы не выйти за пределы массива
   if (qactiveSlide < 0) qactive = 0;
   if (qactiveSlide >= qSlidesCount) qactiveSlide = qSlidesCount - 1;

   // Корректный расчёт прогресса
   const progress = Math.round((100 / (qSlidesCount - 1)) * qactiveSlide);
   qiuzProgress.style.width = progress + "%";
   qiuzProgressValue.innerText = progress + "%";

   // Добавляем активный класс к текущему слайду
   qslides[qactiveSlide].classList.add("_active");
}

init();

//===================================================================================================================================

let items = document.querySelectorAll(".progress-item1");
const counters = Array(items.length);
const intervals = Array(items.length);
counters.fill(0);
items.forEach((number, index) => {
   intervals[index] = setInterval(() => {
      if (counters[index] == parseInt(number.dataset.num)) {
         clearInterval(intervals[index]);
      } else {
         counters[index] += 1;
         number.style.background = "conic-gradient(red calc(" + counters[index] + "%), gray 0deg)";
         number.setAttribute("data-value", counters[index] + "%");
         number.innerHTML = counters[index] + "%";
      }
   }, 15);
});

//===================================================================================================================================
