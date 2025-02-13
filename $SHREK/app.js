document.addEventListener("DOMContentLoaded", function () {
   const header = document.querySelector(".header");
   const leftNetwork = header.querySelector(".networks:first-child");
   const rightNetwork = header.querySelector(".networks:last-child");
   const title = document.querySelector(".title");

   function calculateMaxMove() {
      if (window.innerWidth <= 600) {
         return 0;
      }

      const headerWidth = header.offsetWidth;
      const leftNetworkWidth = leftNetwork.offsetWidth;
      const rightNetworkWidth = rightNetwork.offsetWidth;
      const currentGap = headerWidth - (leftNetworkWidth + rightNetworkWidth);

      // Определяем желаемое расстояние в зависимости от ширины экрана
      const desiredGap = window.innerWidth <= 900 ? 13 : 60;

      const moveDistance = (currentGap - desiredGap) / 2;

      return Math.max(moveDistance, 0);
   }

   function handleScroll() {
      if (window.innerWidth <= 600) {
         leftNetwork.style.transform = `translateX(0)`;
         rightNetwork.style.transform = `translateX(0)`;
         return;
      }

      const titleBottom = title.getBoundingClientRect().bottom;
      const maxMove = calculateMaxMove();

      if (titleBottom > 0) {
         leftNetwork.style.transform = `translateX(0)`;
         rightNetwork.style.transform = `translateX(0)`;
      } else {
         leftNetwork.style.transform = `translateX(${maxMove}px)`;
         rightNetwork.style.transform = `translateX(-${maxMove}px)`;
      }
   }

   const resizeObserver = new ResizeObserver(() => {
      handleScroll();
   });
   resizeObserver.observe(header);

   window.addEventListener("scroll", handleScroll);
   window.addEventListener("resize", handleScroll); // Добавим обработчик изменения размера окна
   handleScroll();
});

function random(min, max) {
   return Math.random() * (max - min) + min;
}

function createArrow() {
   const arrow = document.createElement("div");
   arrow.className = "arrow";

   const side = Math.random() > 0.5 ? "left" : "right";
   // Увеличиваем отступ для старта и финиша на 300px
   const startX = side === "left" ? -300 : window.innerWidth + 300;
   const startY = random(window.innerHeight * 0.1, window.innerHeight * 0.9);
   const endX = side === "left" ? window.innerWidth + 300 : -300;
   const endY = random(window.innerHeight * 0.1, window.innerHeight * 0.9);

   // Длительность полета от 3 до 4.5 секунд
   const flightDuration = random(1500, 2500) + "ms";

   arrow.classList.add(side === "left" ? "left-side" : "right-side");
   arrow.style.setProperty("--flight-duration", flightDuration);
   arrow.style.setProperty("--start-x", `${startX}px`);
   arrow.style.setProperty("--start-y", `${startY}px`);
   arrow.style.setProperty("--end-x", `${endX}px`);
   arrow.style.setProperty("--end-y", `${endY}px`);
   arrow.style.setProperty("--rotation", side === "left" ? "45deg" : "-135deg");

   document.getElementById("arrowContainer").appendChild(arrow);
   arrow.classList.add("flying");

   setTimeout(() => {
      arrow.remove();
   }, parseInt(flightDuration));
}

function launchArrows() {
   const arrowCount = Math.floor(Math.random() * 2) + 1;

   for (let i = 0; i < arrowCount; i++) {
      setTimeout(() => {
         createArrow();
      }, i * random(400, 800));
   }
}

function autoLaunch() {
   launchArrows();
   setTimeout(autoLaunch, random(2500, 4000));
}

autoLaunch();

let lastLaunch = 0;
window.addEventListener("scroll", () => {
   const now = Date.now();
   if (now - lastLaunch > 2500) {
      lastLaunch = now;
      launchArrows();
   }
});
function updateHeartsContainer() {
   const pageHeight = document.documentElement.scrollHeight;
   const containers = document.querySelectorAll(".loop-images .left, .loop-images .center, .loop-images .right");

   containers.forEach((container) => {
      container.style.height = pageHeight + "px";
   });
}

window.addEventListener("load", updateHeartsContainer);
window.addEventListener("resize", updateHeartsContainer);
