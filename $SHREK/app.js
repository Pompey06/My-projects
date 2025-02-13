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

      // Определяем желаемое расстояние между networks
      const targetGap = window.innerWidth <= 800 ? 13 : 60;

      // Вычисляем текущее расстояние между networks
      const currentGap = headerWidth - (leftNetworkWidth + rightNetworkWidth);

      // Вычисляем на сколько нужно сдвинуть каждый блок
      const moveDistance = (currentGap - targetGap) / 2;

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
   handleScroll();
});

function random(min, max) {
   return Math.random() * (max - min) + min;
}

function createArrow() {
   const arrow = document.createElement("div");
   arrow.className = "arrow";

   const side = Math.random() > 0.5 ? "left" : "right";
   const startX = side === "left" ? -100 : window.innerWidth + 100;
   const startY = random(window.innerHeight * 0.1, window.innerHeight * 0.9);
   const endX = side === "left" ? window.innerWidth + 100 : -100;
   const endY = random(window.innerHeight * 0.1, window.innerHeight * 0.9);

   // Длительность полета от 3 до 4.5 секунд
   const flightDuration = random(3000, 4500) + "ms";

   if (side === "right") {
      // Параболическая траектория для стрел справа
      const distance = Math.abs(endX - startX);
      const midX = startX + distance * 0.5;
      const baseHeight = Math.min(startY, endY);
      const maxHeight = baseHeight - random(100, 300);

      arrow.style.animation = "flyParabolic var(--flight-duration) cubic-bezier(0.45, 0, 0.55, 1) forwards";
      arrow.style.setProperty("--mid-x", `${midX}px`);
      arrow.style.setProperty("--mid-y", `${maxHeight}px`);
      arrow.style.setProperty("--start-rotation", "-135deg");
      arrow.style.setProperty("--mid-rotation", "-150deg");
      arrow.style.setProperty("--end-rotation", "-135deg");
   } else {
      // Прямая траектория для стрел слева
      arrow.style.setProperty("--rotation", "45deg");
   }

   arrow.classList.add(side === "left" ? "left-side" : "right-side");
   arrow.style.setProperty("--flight-duration", flightDuration);
   arrow.style.setProperty("--start-x", `${startX}px`);
   arrow.style.setProperty("--start-y", `${startY}px`);
   arrow.style.setProperty("--end-x", `${endX}px`);
   arrow.style.setProperty("--end-y", `${endY}px`);

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
