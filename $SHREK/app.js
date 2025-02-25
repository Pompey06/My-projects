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

function getDocumentHeight() {
   return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
   );
}

function createArrow() {
   const arrow = document.createElement("div");
   arrow.className = "arrow";

   const side = Math.random() > 0.5 ? "left" : "right";

   // Базовая позиция по Y (начальная точка)
   const baseY = random(0, getDocumentHeight());

   // Ограничиваем вертикальное смещение для конечной точки
   const maxVerticalOffset = random(100, 400);
   const verticalDirection = Math.random() > 0.5 ? 1 : -1;

   const startY = baseY;
   const endY = baseY + verticalDirection * maxVerticalOffset;

   // Стартовая и конечная позиция по X относительно ширины окна
   const startX = side === "left" ? -300 : window.innerWidth + 300;
   const endX = side === "left" ? window.innerWidth + 300 : -300;

   const flightDuration = random(3000, 4500) + "ms";

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

window.addEventListener("resize", () => {
   document.getElementById("arrowContainer").style.height = getDocumentHeight() + "px";
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
