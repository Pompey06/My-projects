document.querySelectorAll(".menu__item").forEach((item) => {
  const link = item.querySelector(".menu__link");

  link.addEventListener("click", (e) => {
    e.preventDefault();
    item.classList.toggle("_active");
  });
});

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

if (isMobile.any()) {
  document.body.classList.add("_touch");
  let menuArrows = document.querySelectorAll(".menu__arrow");
  if (menuArrows.length > 0) {
    for (let index = 0; index < menuArrows.length; index++) {
      const menuArrow = menuArrows[index];
      menuArrow.addEventListener("click", function (e) {
        menuArrow.parentElement.classList.toggle("_active");
      });
    }
  }
} else {
  document.body.classList.add("_pc");
}

const menuLinks = document.querySelectorAll(".menu__link[data-goto");
if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", function (e) {
      const menuLink = e.target;
      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
        const gotoBlock = document.querySelector(menuLink.dataset.goto);
        const gotoBlockValue =
          gotoBlock.getBoundingClientRect().top +
          pageYOffset -
          document.querySelector("header").offsetHeight;
        if (iconMenu.classList.contains("_active")) {
          iconMenu.classList.remove("_active");
          menuBody.classList.remove("_active");
          document.body.classList.remove("_lock");
        }
        window.scrollTo({
          top: gotoBlockValue,
          behavior: "smooth",
        });
        e.preventDefault();
      }
    });
  });
}

const iconMenu = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".menu__body");
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    iconMenu.classList.toggle("_active");
    menuBody.classList.toggle("_active");
    document.body.classList.toggle("_lock");
  });
}

// Используем уже объявленные переменные menuBody и menuToggle
// menuToggle.addEventListener("click", () => {
//   if (menuBody.classList.contains("_active")) {
//     // Если меню открыто, запускаем анимацию скрытия
//     menuBody.classList.remove("_active");
//     menuBody.classList.add("_closing");

//     // Удаляем элемент из DOM после завершения анимации
//     menuBody.addEventListener(
//       "animationend",
//       () => {
//         menuBody.classList.remove("_closing");
//         menuBody.style.display = "none";
//       },
//       { once: true }
//     );
//   } else {
//     // Если меню закрыто, показываем его
//     menuBody.style.display = "flex";
//     menuBody.classList.add("_active");
//   }
// });