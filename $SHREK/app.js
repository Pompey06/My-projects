document.addEventListener("DOMContentLoaded", function () {
   const header = document.querySelector(".header");
   const leftNetwork = header.querySelector(".networks:first-child");
   const rightNetwork = header.querySelector(".networks:last-child");
   const title = document.querySelector(".title");

   function calculateMaxMove() {
      // Если ширина экрана меньше или равна 600px, возвращаем 0
      if (window.innerWidth <= 600) {
         return 0;
      }

      const headerWidth = header.offsetWidth;
      const leftNetworkWidth = leftNetwork.offsetWidth;
      const rightNetworkWidth = rightNetwork.offsetWidth;
      const targetGap = 60; // Желаемое расстояние между элементами

      // Текущее расстояние между элементами
      const currentGap = headerWidth - (leftNetworkWidth + rightNetworkWidth);

      // Рассчитываем, насколько нужно сдвинуть каждый элемент
      // (текущий отступ - целевой отступ) / 2, так как движение с обеих сторон
      return Math.max((currentGap - targetGap) / 2, 0);
   }

   function handleScroll() {
      // Если ширина экрана меньше или равна 600px, отменяем анимацию
      if (window.innerWidth <= 600) {
         leftNetwork.style.transform = `translateX(0)`;
         rightNetwork.style.transform = `translateX(0)`;
         return;
      }

      const documentHeight = Math.max(
         document.body.scrollHeight,
         document.body.offsetHeight,
         document.documentElement.clientHeight,
         document.documentElement.scrollHeight,
         document.documentElement.offsetHeight
      );
      const windowHeight = window.innerHeight;
      const scrollable = documentHeight - windowHeight;

      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      const titleBottom = title.getBoundingClientRect().bottom;

      if (titleBottom > 0) {
         leftNetwork.style.transform = `translateX(0)`;
         rightNetwork.style.transform = `translateX(0)`;
         return;
      }

      const scrollProgress = Math.min(currentScroll / (scrollable * 0.7), 1);
      const eased = easeInOutQuad(scrollProgress);
      const maxMove = calculateMaxMove();
      const moveDistance = maxMove * eased;

      leftNetwork.style.transform = `translateX(${moveDistance}px)`;
      rightNetwork.style.transform = `translateX(-${moveDistance}px)`;
   }

   function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
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

   // Более случайная начальная высота
   const startY = random(window.innerHeight * 0.1, window.innerHeight * 0.9);
   const endX = side === "left" ? window.innerWidth + 100 : -100;

   // Случайная конечная высота, независимая от начальной
   const endY = random(window.innerHeight * 0.1, window.innerHeight * 0.9);

   const distance = Math.abs(endX - startX);

   // Более случайные контрольные точки
   const point1X = startX + distance * random(0.2, 0.4);
   const point2X = startX + distance * random(0.6, 0.8);

   // Более разнообразная высота параболы
   const baseHeight = Math.min(startY, endY);
   const maxHeight = baseHeight - random(100, 400);
   const point1Y = maxHeight + random(-50, 50);
   const point2Y = maxHeight + random(-50, 50);

   // Более разнообразные углы поворота
   const startRotation = side === "left" ? `${random(40, 50)}deg` : `${random(-140, -130)}deg`;
   const midRotation = side === "left" ? `${random(25, 35)}deg` : `${random(-155, -145)}deg`;
   const endRotation = side === "left" ? `${random(40, 50)}deg` : `${random(-140, -130)}deg`;

   // Длительность полета от 2 до 4 секунд
   const flightDuration = random(2000, 4000) + "ms";

   arrow.classList.add(side === "left" ? "left-side" : "right-side");
   arrow.style.setProperty("--flight-duration", flightDuration);
   arrow.style.setProperty("--start-x", `${startX}px`);
   arrow.style.setProperty("--start-y", `${startY}px`);
   arrow.style.setProperty("--point1-x", `${point1X}px`);
   arrow.style.setProperty("--point1-y", `${point1Y}px`);
   arrow.style.setProperty("--point2-x", `${point2X}px`);
   arrow.style.setProperty("--point2-y", `${point2Y}px`);
   arrow.style.setProperty("--end-x", `${endX}px`);
   arrow.style.setProperty("--end-y", `${endY}px`);
   arrow.style.setProperty("--start-rotation", startRotation);
   arrow.style.setProperty("--mid-rotation", midRotation);
   arrow.style.setProperty("--end-rotation", endRotation);

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
      }, i * random(300, 600));
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
