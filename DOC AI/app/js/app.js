var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = {
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
      return navigator.userAgent.match(/IEMobile/i);
   },
   any: function () {
      return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
   },
};
function isIE() {
   ua = navigator.userAgent;
   var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
   return is_ie;
}
if (isIE()) {
   document.querySelector("body").classList.add("ie");
}
if (isMobile.any()) {
   document.querySelector("body").classList.add("_touch");
}
function testWebP(callback) {
   var webP = new Image();
   webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
   };
   webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
   if (support == true) {
      document.querySelector("body").classList.add("_webp");
   } else {
      document.querySelector("body").classList.add("_no-webp");
   }
});
function ibg() {
   if (isIE()) {
      let ibg = document.querySelectorAll("._ibg");
      for (var i = 0; i < ibg.length; i++) {
         if (ibg[i].querySelector("img") && ibg[i].querySelector("img").getAttribute("src") != null) {
            ibg[i].style.backgroundImage = "url(" + ibg[i].querySelector("img").getAttribute("src") + ")";
         }
      }
   }
}
ibg();

if (document.querySelector(".wrapper")) {
   document.querySelector(".wrapper").classList.add("_loaded");
}

let unlock = true;

//BodyLock
function body_lock(delay) {
   let body = document.querySelector("body");
   if (body.classList.contains("_lock")) {
      body_lock_remove(delay);
   } else {
      body_lock_add(delay);
   }
}
function body_lock_remove(delay) {
   let body = document.querySelector("body");
   if (unlock) {
      let lock_padding = document.querySelectorAll("._lp");
      setTimeout(() => {
         for (let index = 0; index < lock_padding.length; index++) {
            const el = lock_padding[index];
            el.style.paddingRight = "0px";
         }
         body.style.paddingRight = "0px";
         body.classList.remove("_lock");
      }, delay);

      unlock = false;
      setTimeout(function () {
         unlock = true;
      }, delay);
   }
}
function body_lock_add(delay) {
   let body = document.querySelector("body");
   if (unlock) {
      let lock_padding = document.querySelectorAll("._lp");
      for (let index = 0; index < lock_padding.length; index++) {
         const el = lock_padding[index];
         el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
      }
      body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
      body.classList.add("_lock");

      unlock = false;
      setTimeout(function () {
         unlock = true;
      }, delay);
   }
}

//Menu
let iconMenu = document.querySelector(".menu__icon");
let menulist = document.querySelector(".menu__list");
let body = document.querySelector("body");
let menuBody = document.querySelector(".menu__body");

function clickOff(event) {
   console.log(event);
   iconMenu.classList.remove("_active");
   menuBody.classList.remove("_active");
   html.classList.remove("lock");
}

if (iconMenu) {
   iconMenu.addEventListener("click", function () {
      iconMenu.classList.toggle("_active");
      html.classList.toggle("lock");
      menuBody.classList.toggle("_active");
   });
   menulist.addEventListener("mouseup", clickOff);

   document.addEventListener("click", function (e) {
      var target = e.target;
      var its_menu = target == menuBody || menuBody.contains(target);
      var its_iconMenu = target == iconMenu || iconMenu.contains(target);
      var menu_is_active = menuBody.classList.contains("_active");

      if (!its_menu && !its_iconMenu && menu_is_active) {
         clickOff();
      }
   });
}

// Вспомогательные модули плавного расскрытия и закрытия объекта ======================================================================================================================================================================
let _slideUp = (target, duration = 500, showmore = 0) => {
   if (!target.classList.contains("_slide")) {
      target.classList.add("_slide");
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + "ms";
      target.style.height = `${target.offsetHeight}px`;
      target.offsetHeight;
      target.style.overflow = "hidden";
      target.style.height = showmore ? `${showmore}px` : `0px`;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(() => {
         target.hidden = !showmore ? true : false;
         !showmore ? target.style.removeProperty("height") : null;
         target.style.removeProperty("padding-top");
         target.style.removeProperty("padding-bottom");
         target.style.removeProperty("margin-top");
         target.style.removeProperty("margin-bottom");
         !showmore ? target.style.removeProperty("overflow") : null;
         target.style.removeProperty("transition-duration");
         target.style.removeProperty("transition-property");
         target.classList.remove("_slide");
         // Создаем событие
         document.dispatchEvent(
            new CustomEvent("slideUpDone", {
               detail: {
                  target: target,
               },
            })
         );
      }, duration);
   }
};
let _slideDown = (target, duration = 500, showmore = 0) => {
   if (!target.classList.contains("_slide")) {
      target.classList.add("_slide");
      target.hidden = target.hidden ? false : null;
      showmore ? target.style.removeProperty("height") : null;
      let height = target.offsetHeight;
      target.style.overflow = "hidden";
      target.style.height = showmore ? `${showmore}px` : `0px`;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight;
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + "ms";
      target.style.height = height + "px";
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      window.setTimeout(() => {
         target.style.removeProperty("height");
         target.style.removeProperty("overflow");
         target.style.removeProperty("transition-duration");
         target.style.removeProperty("transition-property");
         target.classList.remove("_slide");
         // Создаем событие
         document.dispatchEvent(
            new CustomEvent("slideDownDone", {
               detail: {
                  target: target,
               },
            })
         );
      }, duration);
   }
};
let _slideToggle = (target, duration = 500) => {
   if (target.hidden) {
      return _slideDown(target, duration);
   } else {
      return _slideUp(target, duration);
   }
};
// Вспомогательные модули блокировки прокрутки и скочка ====================================================================================================================================================================================================================================================================================
let bodyLockStatus = true;
let bodyLockToggle = (delay = 500) => {
   if (document.documentElement.classList.contains("lock")) {
      bodyUnlock(delay);
   } else {
      bodyLock(delay);
   }
};
let bodyUnlock = (delay = 500) => {
   let body = document.querySelector("body");
   if (bodyLockStatus) {
      let lock_padding = document.querySelectorAll("[data-lp]");
      setTimeout(() => {
         for (let index = 0; index < lock_padding.length; index++) {
            const el = lock_padding[index];
            el.style.paddingRight = "0px";
         }
         body.style.paddingRight = "0px";
         document.documentElement.classList.remove("lock");
      }, delay);
      bodyLockStatus = false;
      setTimeout(function () {
         bodyLockStatus = true;
      }, delay);
   }
};
let bodyLock = (delay = 500) => {
   let body = document.querySelector("body");
   if (bodyLockStatus) {
      let lock_padding = document.querySelectorAll("[data-lp]");
      for (let index = 0; index < lock_padding.length; index++) {
         const el = lock_padding[index];
         el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
      }
      body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
      document.documentElement.classList.add("lock");

      bodyLockStatus = false;
      setTimeout(function () {
         bodyLockStatus = true;
      }, delay);
   }
};

//================================================================================================================================================================================================================================================================================================================
// Прочие полезные функции ================================================================================================================================================================================================================================================================================================================
//================================================================================================================================================================================================================================================================================================================
// Получение хеша в адресе сайта
function getHash() {
   if (location.hash) {
      return location.hash.replace("#", "");
   }
}

// FLS (Full Logging System)
function FLS(message) {
   setTimeout(() => {
      if (window.FLS) {
         console.log(message);
      }
   }, 0);
}
// Получить цифры из строки
function getDigFromString(item) {
   return parseInt(item.replace(/[^\d]/g, ""));
}
// Форматирование цифр типа 100 000 000
function getDigFormat(item) {
   return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
}
// Убрать класс из всех элементов массива
function removeClasses(array, className) {
   for (var i = 0; i < array.length; i++) {
      array[i].classList.remove(className);
   }
}
// Уникализация массива
function uniqArray(array) {
   return array.filter(function (item, index, self) {
      return self.indexOf(item) === index;
   });
}
// Функция получения индекса внутри родителя
function indexInParent(parent, element) {
   const array = Array.prototype.slice.call(parent.children);
   return Array.prototype.indexOf.call(array, element);
}
// Обработа медиа запросов из атрибутов
function dataMediaQueries(array, dataSetValue) {
   // Получение объектов с медиа запросами
   const media = Array.from(array).filter(function (item, index, self) {
      if (item.dataset[dataSetValue]) {
         return item.dataset[dataSetValue].split(",")[0];
      }
   });
   // Инициализация объектов с медиа запросами
   if (media.length) {
      const breakpointsArray = [];
      media.forEach((item) => {
         const params = item.dataset[dataSetValue];
         const breakpoint = {};
         const paramsArray = params.split(",");
         breakpoint.value = paramsArray[0];
         breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
         breakpoint.item = item;
         breakpointsArray.push(breakpoint);
      });
      // Получаем уникальные брейкпоинты
      let mdQueries = breakpointsArray.map(function (item) {
         return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
      });
      mdQueries = uniqArray(mdQueries);
      const mdQueriesArray = [];

      if (mdQueries.length) {
         // Работаем с каждым брейкпоинтом
         mdQueries.forEach((breakpoint) => {
            const paramsArray = breakpoint.split(",");
            const mediaBreakpoint = paramsArray[1];
            const mediaType = paramsArray[2];
            const matchMedia = window.matchMedia(paramsArray[0]);
            // Объекты с нужными условиями
            const itemsArray = breakpointsArray.filter(function (item) {
               if (item.value === mediaBreakpoint && item.type === mediaType) {
                  return true;
               }
            });
            mdQueriesArray.push({
               itemsArray,
               matchMedia,
            });
         });
         return mdQueriesArray;
      }
   }
}
//================================================================================================================================================================================================================================================================================================================
//===Dropdown Block================================================================================================================================

/*
классы для автоматического определения его типа
block-click-on      - по клику на нём у родительского элемента назначится _active
block-click-off     - по клику на нём у родительского элемента снимется _active
block-click-toggle  - по клику на нём у родительского элемента инвертируется _active

Если просто добавить block-click-toggle, то _active добавится родителю

<div class="block-click-toggle" data-target-el='target-4'></div>
класс target-4 - кому нужен _active

Так же скрипт меняет input type с text на password (когда нужен глаз при вводе пароля)
*/

clicksOn = document.getElementsByClassName("block-click-on");
clicksOff = document.getElementsByClassName("block-click-off");
clicksToggle = document.getElementsByClassName("block-click-toggle");
var alltargets = [];
var touched = 0;
var target;

if (clicksOn)
   for (key in clicksOn) {
      if (!isNaN(key) && clicksOn[key]) {
         //console.log(clicksOn[key], key);
         let targetName = clicksOn[key].dataset["targetEl"];

         let el;
         if (!targetName) {
            el = clicksOn[key].parentElement;
         } else el = document.getElementsByClassName(targetName)[0];

         if (el) {
            //if (alltargets.indexOf(targetName) == -1) alltargets[alltargets.length] = targetName;
            alltargets[alltargets.length] = el; // !

            clicksOn[key].addEventListener(
               "click",
               (e) => {
                  setActive(el, 1, e.currentTarget);
                  e.stopPropagation;
                  e.preventDefault;
                  touched = 1;

                  target = e.currentTarget.className;
               },
               false
            );
         }
      }
   }

if (clicksToggle)
   for (key in clicksToggle) {
      if (!isNaN(key) && clicksToggle[key]) {
         //console.log(clicksOn[key], key);
         let targetName = clicksToggle[key].dataset["targetEl"];

         let el;
         if (!targetName) el = clicksToggle[key].parentElement;
         else el = document.getElementsByClassName(targetName)[0];

         if (el) {
            //         if (alltargets.indexOf(targetName) == -1) alltargets[alltargets.length] = targetName;
            alltargets[alltargets.length] = el; // !

            clicksToggle[key].addEventListener(
               "click",
               (e) => {
                  setActive(el, 2, e.currentTarget);
                  touched = 1;
                  target = e.currentTarget.className;

                  if (e.currentTarget.classList.contains("popup-login-form__eye")) {
                     if (e.currentTarget.classList.contains("_active"))
                        e.currentTarget.previousElementSibling.type = "text";
                     else e.currentTarget.previousElementSibling.type = "password";
                  }
                  //
               },
               false
            );
         }
      }
   }

function setActive(el, state, target) {
   if (state == 1) {
      el.classList.add("_active");
   }
   if (state == 0) {
      el.classList.remove("_active");
   }
   if (state == 2) {
      el.classList.toggle("_active");
   }

   let lock;

   if (target) lock = target.classList.contains("block-click-lock") ? 1 : 0;
   else lock = 0;

   if (el.classList.contains("_active")) {
      if (lock) document.body.classList.add("_lock");
   } else {
      if (lock) document.body.classList.remove("_lock");
   }

   return el.classList.contains("_active");
}

if (clicksOff)
   for (key in clicksOff) {
      if (!isNaN(key) && clicksOff[key]) {
         //console.log(clicksOff[key], key);
         let targetName = clicksOff[key].dataset["targetEl"];

         let el;
         if (!targetName) el = clicksOff[key].parentElement;
         else el = document.getElementsByClassName(targetName)[0];

         if (el) {
            alltargets[alltargets.length] = el; // !
            clicksOff[key].addEventListener(
               "click",
               (e) => {
                  setActive(el, 0, e.currentTarget);

                  touched = 1;
                  target = e.currentTarget.className;
               },
               false
            );
         }
      }
   }

document.addEventListener("click", (e) => {
   let withinBoundaries;
   if (/*!touched && */ target != e.currentTarget.className) {
      for (key in alltargets) {
         if (!isNaN(key) && alltargets[key]) {
            // el = document.getElementsByClassName(alltargets[key])[0];

            withinBoundaries = e.composedPath().includes(alltargets[key]);
            if (!withinBoundaries) {
               setActive(alltargets[key], 0);
            }
         }
      }
   }
   touched = 0;
});

// Модуль попапов

// Класс Popup
class Popup {
   constructor(options) {
      let config = {
         logging: true,
         init: true,
         // Для кнопок
         attributeOpenButton: "data-popup", // Атрибут для кнопки, которая вызывает попап
         attributeCloseButton: "data-close", // Атрибут для кнопки, которая закрывает попап
         // Для сторонних объектов
         fixElementSelector: "[data-lp]", // Атрибут для элементов с левым паддингом (которые fixed)
         // Для объекта попапа
         youtubeAttribute: "data-popup-youtube", // Атрибут для кода youtube
         youtubePlaceAttribute: "data-popup-youtube-place", // Атрибут для вставки ролика youtube
         setAutoplayYoutube: true,
         // Изменение классов
         classes: {
            popup: "popup",
            // popupWrapper: 'popup__wrapper',
            popupContent: "popup__content",
            popupActive: "popup_show", // Добавляется для попапа, когда он открывается
            bodyActive: "popup-show", // Добавляется для боди, когда попап открыт
         },
         focusCatch: true, // Фокус внутри попапа зациклен
         closeEsc: true, // Закрытие по ESC
         bodyLock: true, // Блокировка скролла
         hashSettings: {
            location: true, // Хэш в адресной строке
            goHash: true, // Переход по наличию в адресной строке
         },
         on: {
            // События
            beforeOpen: function () {},
            afterOpen: function () {},
            beforeClose: function () {},
            afterClose: function () {},
         },
      };
      this.youTubeCode;
      this.isOpen = false;
      // Текущее окно
      this.targetOpen = {
         selector: false,
         element: false,
      };
      // Предыдущее открытое
      this.previousOpen = {
         selector: false,
         element: false,
      };
      // Последнее закрытое
      this.lastClosed = {
         selector: false,
         element: false,
      };
      this._dataValue = false;
      this.hash = false;

      this._reopen = false;
      this._selectorOpen = false;

      this.lastFocusEl = false;
      this._focusEl = [
         "a[href]",
         'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
         "button:not([disabled]):not([aria-hidden])",
         "select:not([disabled]):not([aria-hidden])",
         "textarea:not([disabled]):not([aria-hidden])",
         "area[href]",
         "iframe",
         "object",
         "embed",
         "[contenteditable]",
         '[tabindex]:not([tabindex^="-"])',
      ];
      //this.options = Object.assign(config, options);
      this.options = {
         ...config,
         ...options,
         classes: {
            ...config.classes,
            ...options?.classes,
         },
         hashSettings: {
            ...config.hashSettings,
            ...options?.hashSettings,
         },
         on: {
            ...config.on,
            ...options?.on,
         },
      };
      this.bodyLock = false;
      this.options.init ? this.initPopups() : null;
   }
   initPopups() {
      this.popupLogging(`Проснулся`);
      this.eventsPopup();
   }
   eventsPopup() {
      // Клик на всем документе
      document.addEventListener(
         "click",
         function (e) {
            // Клик по кнопке "открыть"
            const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
            if (buttonOpen) {
               e.preventDefault();
               this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton)
                  ? buttonOpen.getAttribute(this.options.attributeOpenButton)
                  : "error";
               this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute)
                  ? buttonOpen.getAttribute(this.options.youtubeAttribute)
                  : null;
               if (this._dataValue !== "error") {
                  if (!this.isOpen) this.lastFocusEl = buttonOpen;
                  this.targetOpen.selector = `${this._dataValue}`;
                  this._selectorOpen = true;
                  this.open();
                  return;
               } else this.popupLogging(`Ой ой, не заполнен атрибут у ${buttonOpen.classList}`);

               return;
            } else {
               if (e.target.hash) {
                  let addr = e.target.hash.split("-");
                  let tabsc = document.querySelectorAll(".tabs__content");
                  if (tabsc[addr[1]]) {
                     for (let child of tabsc[addr[1]].children) {
                        child.hidden = 1;
                     }
                     tabsc[addr[1]].children[addr[2]].hidden = 0;
                  }
               }
            }

            // Закрытие на пустом месте (popup__wrapper) и кнопки закрытия (popup__close) для закрытия
            const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
            if (buttonClose || (!e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen)) {
               e.preventDefault();
               this.close();
               return;
            }
         }.bind(this)
      );
      // Закрытие по ESC
      document.addEventListener(
         "keydown",
         function (e) {
            if (this.options.closeEsc && e.which == 27 && e.code === "Escape" && this.isOpen) {
               e.preventDefault();
               this.close();
               return;
            }
            if (this.options.focusCatch && e.which == 9 && this.isOpen) {
               this._focusCatch(e);
               return;
            }
         }.bind(this)
      );

      // Открытие по хешу
      if (this.options.hashSettings.goHash && !window.location.hash.includes("#tab")) {
         // Проверка изменения адресной строки
         window.addEventListener(
            "hashchange",
            function () {
               if (window.location.hash) {
                  this._openToHash();
               } else {
                  this.close(this.targetOpen.selector);
               }
            }.bind(this)
         );

         window.addEventListener(
            "load",
            function () {
               if (window.location.hash) {
                  this._openToHash();
               }
            }.bind(this)
         );
      }
   }
   open(selectorValue) {
      if (bodyLockStatus) {
         // -------------------- [
         //this.bodyLock = document.documentElement.classList.contains('lock') ? true : false;
         // -------------------- ]

         // Если ввести значение селектора (селектор настраивается в options)
         if (selectorValue && typeof selectorValue === "string" && selectorValue.trim() !== "") {
            this.targetOpen.selector = selectorValue;
            this._selectorOpen = true;
         }
         if (this.isOpen) {
            this._reopen = true;
            this.close();
         }
         // -------------------- [
         // Если перед открытием попапа был режим lock
         else this.bodyLock = document.documentElement.classList.contains("lock") ? true : false;
         // -------------------- ]

         if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
         if (!this._reopen) this.previousActiveElement = document.activeElement;

         this.targetOpen.element = document.querySelector(this.targetOpen.selector);

         if (this.targetOpen.element) {
            // YouTube
            if (this.youTubeCode) {
               const codeVideo = this.youTubeCode;
               const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
               const iframe = document.createElement("iframe");
               iframe.setAttribute("allowfullscreen", "");

               const autoplay = this.options.setAutoplayYoutube ? "autoplay;" : "";
               iframe.setAttribute("allow", `${autoplay}; encrypted-media`);

               iframe.setAttribute("src", urlVideo);

               if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
                  const youtubePlace = this.targetOpen.element
                     .querySelector(".popup__text")
                     .setAttribute(`${this.options.youtubePlaceAttribute}`, "");
               }
               this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
            }
            if (this.options.hashSettings.location) {
               // Получение хэша и его выставление
               this._getHash();
               this._setHash();
            }

            // До открытия
            this.options.on.beforeOpen(this);
            // Создаем свое событие после открытия попапа
            document.dispatchEvent(
               new CustomEvent("beforePopupOpen", {
                  detail: {
                     popup: this,
                  },
               })
            );

            this.targetOpen.element.classList.add(this.options.classes.popupActive);
            document.documentElement.classList.add(this.options.classes.bodyActive);

            if (!this._reopen) {
               !this.bodyLock ? bodyLock() : null;
            } else this._reopen = false;

            this.targetOpen.element.setAttribute("aria-hidden", "false");

            // Запоминаю это открытое окно. Оно будет последним открытым
            this.previousOpen.selector = this.targetOpen.selector;
            this.previousOpen.element = this.targetOpen.element;

            this._selectorOpen = false;

            this.isOpen = true;

            setTimeout(() => {
               this._focusTrap();
            }, 50);

            // После открытия
            this.options.on.afterOpen(this);
            // Создаем свое событие после открытия попапа
            document.dispatchEvent(
               new CustomEvent("afterPopupOpen", {
                  detail: {
                     popup: this,
                  },
               })
            );
            this.popupLogging(`Открыл попап`);
         } else this.popupLogging(`Ой ой, такого попапа нет.Проверьте корректность ввода. `);
      }
   }
   close(selectorValue) {
      if (selectorValue && typeof selectorValue === "string" && selectorValue.trim() !== "") {
         this.previousOpen.selector = selectorValue;
      }
      if (!this.isOpen || !bodyLockStatus) {
         return;
      }
      // До закрытия
      this.options.on.beforeClose(this);
      // Создаем свое событие перед закрытием попапа
      document.dispatchEvent(
         new CustomEvent("beforePopupClose", {
            detail: {
               popup: this,
            },
         })
      );

      // YouTube
      if (this.youTubeCode) {
         if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`))
            this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = "";
      }
      this.previousOpen.element.classList.remove(this.options.classes.popupActive);
      // aria-hidden
      this.previousOpen.element.setAttribute("aria-hidden", "true");
      if (!this._reopen) {
         document.documentElement.classList.remove(this.options.classes.bodyActive);
         !this.bodyLock ? bodyUnlock() : null;
         this.isOpen = false;
      }
      // Очищение адресной строки
      this._removeHash();
      if (this._selectorOpen) {
         this.lastClosed.selector = this.previousOpen.selector;
         this.lastClosed.element = this.previousOpen.element;
      }
      // После закрытия
      this.options.on.afterClose(this);
      // Создаем свое событие после закрытия попапа
      document.dispatchEvent(
         new CustomEvent("afterPopupClose", {
            detail: {
               popup: this,
            },
         })
      );

      setTimeout(() => {
         this._focusTrap();
      }, 50);

      this.popupLogging(`Закрыл попап`);
   }
   // Получение хэша
   _getHash() {
      if (this.options.hashSettings.location) {
         this.hash = this.targetOpen.selector.includes("#")
            ? this.targetOpen.selector
            : this.targetOpen.selector.replace(".", "#");
      }
   }
   _openToHash() {
      let classInHash = document.querySelector(`.${window.location.hash.replace("#", "")}`)
         ? `.${window.location.hash.replace("#", "")}`
         : document.querySelector(`${window.location.hash}`)
         ? `${window.location.hash}`
         : null;

      const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`)
         ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`)
         : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace(".", "#")}"]`);
      if (buttons && classInHash) this.open(classInHash);
   }
   // Утсановка хэша
   _setHash() {
      history.pushState("", "", this.hash);
   }
   _removeHash() {
      history.pushState("", "", window.location.href.split("#")[0]);
   }
   _focusCatch(e) {
      const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
      const focusArray = Array.prototype.slice.call(focusable);
      const focusedIndex = focusArray.indexOf(document.activeElement);

      if (e.shiftKey && focusedIndex === 0) {
         focusArray[focusArray.length - 1].focus();
         e.preventDefault();
      }
      if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
         focusArray[0].focus();
         e.preventDefault();
      }
   }
   _focusTrap() {
      const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
      if (!this.isOpen && this.lastFocusEl) {
         this.lastFocusEl.focus();
      } else {
         focusable[0].focus();
      }
   }
   // Функция вывода в консоль
   popupLogging(message) {
      this.options.logging ? FLS(`[Попап]: ${message}`) : null;
   }
}

const flsModules = {};

// Запускаем и добавляем в объект модулей
setTimeout(() => {
   var popup = new Popup({});
   flsModules.popup = new Popup({});
}, 100);

("use strict");
!(function () {
   let t = [],
      e = document.querySelectorAll("[data-da]"),
      n = [],
      i = [];
   if (e.length > 0) {
      let c = 0;
      for (let i = 0; i < e.length; i++) {
         const a = e[i],
            l = a.getAttribute("data-da");
         if ("" != l) {
            const e = l.split(","),
               i = e[1] ? e[1].trim() : "last",
               d = e[2] ? e[2].trim() : "767",
               s = document.querySelector("." + e[0].trim());
            e.length > 0 &&
               s &&
               (a.setAttribute("data-da-index", c),
               (t[c] = {
                  parent: a.parentNode,
                  index: ((r = a), (o = void 0), (o = Array.prototype.slice.call(r.parentNode.children)), o.indexOf(r)),
               }),
               (n[c] = { element: a, destination: document.querySelector("." + e[0].trim()), place: i, breakpoint: d }),
               c++);
         }
      }
      (a = n).sort(function (t, e) {
         return t.breakpoint > e.breakpoint ? -1 : 1;
      }),
         a.sort(function (t, e) {
            return t.place > e.place ? 1 : -1;
         });
      for (let t = 0; t < n.length; t++) {
         const e = n[t].breakpoint,
            a = "max";
         i.push(window.matchMedia("(" + a + "-width: " + e + "px)")), i[t].addListener(l);
      }
   }
   var a, r, o;
   function l(t) {
      for (let t = 0; t < n.length; t++) {
         const e = n[t],
            a = e.element,
            r = e.destination,
            o = e.place,
            l = "_dynamic_adapt_" + e.breakpoint;
         if (i[t].matches) {
            if (!a.classList.contains(l)) {
               let t = d(r)[o];
               "first" === o ? (t = d(r)[0]) : "last" === o && (t = d(r)[d(r).length]),
                  r.insertBefore(a, r.children[t]),
                  a.classList.add(l);
            }
         } else a.classList.contains(l) && (c(a), a.classList.remove(l));
      }
      Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
   }
   function c(e) {
      const n = e.getAttribute("data-da-index"),
         i = t[n],
         a = i.parent,
         r = i.index,
         o = d(a, !0)[r];
      a.insertBefore(e, a.children[o]);
   }
   function d(t, e) {
      const n = t.children,
         i = [];
      for (let t = 0; t < n.length; t++) {
         const a = n[t];
         (e || null == a.getAttribute("data-da")) && i.push(t);
      }
      return i;
   }
   l();
})();
// Модуь работы с табами =======================================================================================================================================================================================================================
/*
Для родителя табов пишем атрибут data-tabs
Для родителя заголовков табов пишем атрибут data-tabs-titles
Для родителя блоков табов пишем атрибут data-tabs-body
Для родителя блоков табов можно указать data-tabs-hash, это втключит добавление хеша

Если нужно чтобы табы открывались с анимацией 
добавляем к data-tabs data-tabs-animate
По умолчанию, скорость анимации 500ms, 
указать свою скорость можно так: data-tabs-animate="1000"

Если нужно чтобы табы превращались в "спойлеры", на неком размере экранов, пишем параметры ширины.
Например: data-tabs="992" - табы будут превращаться в спойлеры на экранах меньше или равно 992px
*/
function tabs() {
   const tabs = document.querySelectorAll("[data-tabs]");
   let tabsActiveHash = [];

   if (tabs.length > 0) {
      const hash = getHash();
      if (hash && hash.startsWith("tab-")) {
         tabsActiveHash = hash.replace("tab-", "").split("-");
      }
      tabs.forEach((tabsBlock, index) => {
         tabsBlock.classList.add("_tab-init");
         tabsBlock.setAttribute("data-tabs-index", index);
         tabsBlock.addEventListener("click", setTabsAction);
         initTabs(tabsBlock);
      });

      // Получение слойлеров с медиа запросами
      let mdQueriesArray = dataMediaQueries(tabs, "tabs");
      if (mdQueriesArray && mdQueriesArray.length) {
         mdQueriesArray.forEach((mdQueriesItem) => {
            // Событие
            mdQueriesItem.matchMedia.addEventListener("change", function () {
               setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
            setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
         });
      }
   }
   // Установка позиций заголовков
   function setTitlePosition(tabsMediaArray, matchMedia) {
      tabsMediaArray.forEach((tabsMediaItem) => {
         tabsMediaItem = tabsMediaItem.item;
         let tabsTitles = tabsMediaItem.querySelector("[data-tabs-titles]");
         let tabsTitleItems = tabsMediaItem.querySelectorAll("[data-tabs-title]");
         let tabsContent = tabsMediaItem.querySelector("[data-tabs-body]");
         let tabsContentItems = tabsMediaItem.querySelectorAll("[data-tabs-item]");
         tabsTitleItems = Array.from(tabsTitleItems).filter((item) => item.closest("[data-tabs]") === tabsMediaItem);
         tabsContentItems = Array.from(tabsContentItems).filter(
            (item) => item.closest("[data-tabs]") === tabsMediaItem
         );
         tabsContentItems.forEach((tabsContentItem, index) => {
            if (matchMedia.matches) {
               tabsContent.append(tabsTitleItems[index]);
               tabsContent.append(tabsContentItem);
               tabsMediaItem.classList.add("_tab-spoller");
            } else {
               tabsTitles.append(tabsTitleItems[index]);
               tabsMediaItem.classList.remove("_tab-spoller");
            }
         });
      });
   }
   // Работа с контентом
   function initTabs(tabsBlock) {
      let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
      let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
      const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
      const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

      if (tabsActiveHashBlock) {
         const tabsActiveTitle = tabsBlock.querySelector("[data-tabs-titles]>._tab-active");
         tabsActiveTitle ? tabsActiveTitle.classList.remove("_tab-active") : null;
      }
      if (tabsContent.length) {
         tabsContent = Array.from(tabsContent).filter((item) => item.closest("[data-tabs]") === tabsBlock);
         tabsTitles = Array.from(tabsTitles).filter((item) => item.closest("[data-tabs]") === tabsBlock);
         tabsContent.forEach((tabsContentItem, index) => {
            tabsTitles[index].setAttribute("data-tabs-title", "");
            tabsContentItem.setAttribute("data-tabs-item", "");

            if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
               tabsTitles[index].classList.add("_tab-active");
            }
            tabsContentItem.hidden = !tabsTitles[index].classList.contains("_tab-active");
         });
      }
   }
   function setTabsStatus(tabsBlock) {
      let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
      let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
      const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
      function isTabsAnamate(tabsBlock) {
         if (tabsBlock.hasAttribute("data-tabs-animate")) {
            return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
         }
      }
      const tabsBlockAnimate = isTabsAnamate(tabsBlock);
      if (tabsContent.length > 0) {
         const isHash = tabsBlock.hasAttribute("data-tabs-hash");
         tabsContent = Array.from(tabsContent).filter((item) => item.closest("[data-tabs]") === tabsBlock);
         tabsTitles = Array.from(tabsTitles).filter((item) => item.closest("[data-tabs]") === tabsBlock);
         tabsContent.forEach((tabsContentItem, index) => {
            if (tabsTitles[index].classList.contains("_tab-active")) {
               if (tabsBlockAnimate) {
                  _slideDown(tabsContentItem, tabsBlockAnimate);
               } else {
                  tabsContentItem.hidden = false;
                  // ------------->
                  chartStart(1);
                  // <-------------
               }
               if (isHash && !tabsContentItem.closest(".popup")) {
                  setHash(`tab-${tabsBlockIndex}-${index}`);
               }
            } else {
               if (tabsBlockAnimate) {
                  _slideUp(tabsContentItem, tabsBlockAnimate);
               } else {
                  tabsContentItem.hidden = true;
               }
            }
         });
      }
   }
   function setTabsAction(e) {
      const el = e.target;
      if (el.closest("[data-tabs-title]")) {
         const tabTitle = el.closest("[data-tabs-title]");
         const tabsBlock = tabTitle.closest("[data-tabs]");
         if (!tabTitle.classList.contains("_tab-active") && !tabsBlock.querySelector("._slide")) {
            let tabActiveTitle = tabsBlock.querySelectorAll("[data-tabs-title]._tab-active");
            tabActiveTitle.length
               ? (tabActiveTitle = Array.from(tabActiveTitle).filter(
                    (item) => item.closest("[data-tabs]") === tabsBlock
                 ))
               : null;
            tabActiveTitle.length ? tabActiveTitle[0].classList.remove("_tab-active") : null;
            tabTitle.classList.add("_tab-active");
            setTabsStatus(tabsBlock);
         }
         e.preventDefault();
      }
   }
}

tabs();

// ------------- >

function chartStart(delay) {
   let charts = document.querySelectorAll(".progress-item__act");
   for (let chart of charts) {
      let u = chart.dataset["change"];
      let i = chart.style[u];
      chart.dataset["new"] = i;
      chart.style.transitionDuration = 0;
      chart.style[u] = "0%";

      setTimeout(() => {
         chart.classList.add("transition");
         chart.style[u] = i;
      }, delay);
   }
}

chartStart(500);

// <-------------

// Наблюдатель объектов [всевидещее око]
// data-watch - можно писать значение для применения кастомного кода
// data-watch-root - родитель внутри которого налюдать за объектом
// data-watch-margin - отступ
// data-watch-threshold - процент показа объекта для срабатывания
// data-watch-once - наблюдать только один раз
// _watcher-view - класс который добавляется при появлении объекта

class ScrollWatcher {
   constructor(props) {
      let defaultConfig = {
         logging: true,
      };
      this.config = Object.assign(defaultConfig, props);
      this.observer;
      !document.documentElement.classList.contains("watcher") ? this.scrollWatcherRun() : null;
   }
   // Обновляем конструктор
   scrollWatcherUpdate() {
      this.scrollWatcherRun();
   }
   // Запускаем конструктор
   scrollWatcherRun() {
      document.documentElement.classList.add("watcher");
      this.scrollWatcherConstructor(document.querySelectorAll("[data-watch]"));
   }
   // Конструктор наблюдателей
   scrollWatcherConstructor(items) {
      if (items.length) {
         this.scrollWatcherLogging(`Проснулся, слежу за объектами (${items.length})...`);
         // Уникализируем параметры
         let uniqParams = uniqArray(
            Array.from(items).map(function (item) {
               return `${
                  item.dataset.watchRoot ? item.dataset.watchRoot : null
               }|${item.dataset.watchMargin ? item.dataset.watchMargin : "0px"}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
            })
         );
         // Получаем группы объектов с одинаковыми параметрами,
         // создаем настройки, инициализируем наблюдатель
         uniqParams.forEach((uniqParam) => {
            let uniqParamArray = uniqParam.split("|");
            let paramsWatch = {
               root: uniqParamArray[0],
               margin: uniqParamArray[1],
               threshold: uniqParamArray[2],
            };
            let groupItems = Array.from(items).filter(function (item) {
               let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
               let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : "0px";
               let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
               if (
                  String(watchRoot) === paramsWatch.root &&
                  String(watchMargin) === paramsWatch.margin &&
                  String(watchThreshold) === paramsWatch.threshold
               ) {
                  return item;
               }
            });

            let configWatcher = this.getScrollWatcherConfig(paramsWatch);

            // Инициализация наблюдателя со своими настройками
            this.scrollWatcherInit(groupItems, configWatcher);
         });
      } else {
         this.scrollWatcherLogging("Сплю, нет объектов для слежения. ZzzZZzz");
      }
   }
   // Функция создания настроек
   getScrollWatcherConfig(paramsWatch) {
      // Создаем настройки
      let configWatcher = {};
      // Родитель, внутри которого ведется наблюдение
      if (document.querySelector(paramsWatch.root)) {
         configWatcher.root = document.querySelector(paramsWatch.root);
      } else if (paramsWatch.root !== "null") {
         this.scrollWatcherLogging(`Эмм... родительского объекта ${paramsWatch.root} нет на странице`);
      }
      // Отступ срабатывания
      configWatcher.rootMargin = paramsWatch.margin;
      if (paramsWatch.margin.indexOf("px") < 0 && paramsWatch.margin.indexOf("%") < 0) {
         this.scrollWatcherLogging(`Ой ой, настройку data-watch-margin нужно задавать в PX или %`);
         return;
      }
      // Точки срабатывания
      if (paramsWatch.threshold === "prx") {
         // Режим параллакса
         paramsWatch.threshold = [];
         for (let i = 0; i <= 1.0; i += 0.005) {
            paramsWatch.threshold.push(i);
         }
      } else {
         paramsWatch.threshold = paramsWatch.threshold.split(",");
      }
      configWatcher.threshold = paramsWatch.threshold;

      return configWatcher;
   }
   // Функция создания нового наблюдателя со своими настройками
   scrollWatcherCreate(configWatcher) {
      this.observer = new IntersectionObserver((entries, observer) => {
         entries.forEach((entry) => {
            this.scrollWatcherCallback(entry, observer);
         });
      }, configWatcher);
   }
   // Функция инициализации наблюдателя со своими настройками
   scrollWatcherInit(items, configWatcher) {
      // Создание нового наблюдателя со своими настройками
      this.scrollWatcherCreate(configWatcher);
      // Передача наблюдателю элементов
      items.forEach((item) => this.observer.observe(item));
   }
   // Функция обработки базовых действий точек срабатываения
   scrollWatcherIntersecting(entry, targetElement) {
      if (entry.isIntersecting) {
         // Видим объект
         // Добавляем класс
         !targetElement.classList.contains("_watcher-view") ? targetElement.classList.add("_watcher-view") : null;
         this.scrollWatcherLogging(`Я вижу ${targetElement.classList}, добавил класс _watcher-view`);
      } else {
         // Не видим объект
         // Убираем класс
         targetElement.classList.contains("_watcher-view") ? targetElement.classList.remove("_watcher-view") : null;
         this.scrollWatcherLogging(`Я не вижу ${targetElement.classList}, убрал класс _watcher-view`);
      }
   }
   // Функция отключения слежения за объектом
   scrollWatcherOff(targetElement, observer) {
      observer.unobserve(targetElement);
      this.scrollWatcherLogging(`Я перестал следить за ${targetElement.classList}`);
   }
   // Функция вывода в консоль
   scrollWatcherLogging(message) {
      this.config.logging ? FLS(`[Наблюдатель]: ${message}`) : null;
   }
   // Функция обработки наблюдения
   scrollWatcherCallback(entry, observer) {
      const targetElement = entry.target;
      // Обработка базовых действий точек срабатываения
      this.scrollWatcherIntersecting(entry, targetElement);
      // Если есть атрибут data-watch-once убираем слежку
      targetElement.hasAttribute("data-watch-once") && entry.isIntersecting
         ? this.scrollWatcherOff(targetElement, observer)
         : null;
      // Создаем свое событие отбратной связи
      document.dispatchEvent(
         new CustomEvent("watcherCallback", {
            detail: {
               entry: entry,
            },
         })
      );

      /*
		// Выбираем нужные объекты
		if (targetElement.dataset.watch === 'some value') {
			// пишем уникальную специфику
		}
		if (entry.isIntersecting) {
			// Видим объект
		} else {
			// Не видим объект
		}
		*/
   }
}
// Запускаем и добавляем в объект модулей
watcher = new ScrollWatcher({});

let addWindowScrollEvent = false;
//====================================================================================================================================================================================================================================================================================================
// Плавная навигация по странице
function pageNavigation() {
   // data-goto - указать ID блока
   // data-goto-header - учитывать header
   // data-goto-top - недокрутить на указанный размер
   // data-goto-speed - скорость (только если используется доп плагин)
   // Работаем при клике на пункт
   document.addEventListener("click", pageNavigationAction);
   // Если подключен scrollWatcher, подсвечиваем текущий пукт меню
   document.addEventListener("watcherCallback", pageNavigationAction);
   // Основная функция
   function pageNavigationAction(e) {
      if (e.type === "click") {
         const targetElement = e.target;
         if (targetElement.closest("[data-goto]")) {
            const gotoLink = targetElement.closest("[data-goto]");
            const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : "";
            const noHeader = gotoLink.hasAttribute("data-goto-header") ? true : false;
            const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
            const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
            gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
            e.preventDefault();
         }
      } else if (e.type === "watcherCallback" && e.detail) {
         const entry = e.detail.entry;
         const targetElement = entry.target;
         // Обработка пунктов навигации, если указано значение navigator подсвечиваем текущий пукт меню
         if (targetElement.dataset.watch === "navigator") {
            const navigatorActiveItem = document.querySelector(`[data-goto]._navigator-active`);
            let navigatorCurrentItem;
            if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) {
               navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`);
            } else if (targetElement.classList.length) {
               for (let index = 0; index < targetElement.classList.length; index++) {
                  const element = targetElement.classList[index];
                  if (document.querySelector(`[data-goto=".${element}"]`)) {
                     navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
                     break;
                  }
               }
            }
            if (entry.isIntersecting) {
               // Видим объект
               // navigatorActiveItem ? navigatorActiveItem.classList.remove('_navigator-active') : null;
               navigatorCurrentItem ? navigatorCurrentItem.classList.add("_navigator-active") : null;
            } else {
               // Не видим объект
               navigatorCurrentItem ? navigatorCurrentItem.classList.remove("_navigator-active") : null;
            }
         }
      }
   }
   // Прокрутка по хешу
   if (getHash()) {
      let goToHash;
      if (document.querySelector(`#${getHash()}`)) {
         goToHash = `#${getHash()}`;
      } else if (document.querySelector(`.${getHash()}`)) {
         goToHash = `.${getHash()}`;
      }
      goToHash ? gotoBlock(goToHash, true, 500, -100) : null;
   }
}
// Работа с шапкой при скроле
function headerScroll() {
   addWindowScrollEvent = true;
   const header = document.querySelector("header.header");
   const headerShow = header.hasAttribute("data-scroll-show");
   const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
   const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
   let scrollDirection = 0;
   let timer;
   document.addEventListener("windowScroll", function (e) {
      const scrollTop = window.scrollY;
      clearTimeout(timer);
      if (scrollTop >= startPoint) {
         !header.classList.contains("_header-scroll") ? header.classList.add("_header-scroll") : null;
         if (headerShow) {
            if (scrollTop > scrollDirection) {
               // downscroll code
               header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null;
            } else {
               // upscroll code
               !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
            }
            timer = setTimeout(() => {
               !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
            }, headerShowTimer);
         }
      } else {
         header.classList.contains("_header-scroll") ? header.classList.remove("_header-scroll") : null;
         if (headerShow) {
            header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null;
         }
      }
      scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
   });
}
// Прилипающий блок
function stickyBlock() {
   addWindowScrollEvent = true;
   // data-sticky для родителя внутри которого прилипает блок *
   // data-sticky-header для родителя, учитываем высоту хедера
   // data-sticky-top="" для родителя, можно указать отступ сверху
   // data-sticky-bottom="" для родителя, можно указать отступ снизу
   // data-sticky-item для прилипающего блока *
   function stickyBlockInit() {
      const stickyParents = document.querySelectorAll("[data-sticky]");
      if (stickyParents.length) {
         stickyParents.forEach((stickyParent) => {
            let stickyConfig = {
               media: stickyParent.dataset.sticky ? parseInt(stickyParent.dataset.sticky) : null,
               top: stickyParent.dataset.stickyTop ? parseInt(stickyParent.dataset.stickyTop) : 0,
               bottom: stickyParent.dataset.stickyBottom ? parseInt(stickyParent.dataset.stickyBottom) : 0,
               header: stickyParent.hasAttribute("data-sticky-header")
                  ? document.querySelector("header.header").offsetHeight
                  : 0,
            };
            stickyBlockItem(stickyParent, stickyConfig);
         });
      }
   }
   function stickyBlockItem(stickyParent, stickyConfig) {
      const stickyBlockItem = stickyParent.querySelector("[data-sticky-item]");
      const headerHeight = stickyConfig.header;
      const offsetTop = headerHeight + stickyConfig.top;
      const startPoint = stickyBlockItem.getBoundingClientRect().top + scrollY - offsetTop;

      document.addEventListener("windowScroll", stickyBlockActions);
      //window.addEventListener("resize", stickyBlockActions);

      function stickyBlockActions(e) {
         const endPoint =
            stickyParent.offsetHeight +
            stickyParent.getBoundingClientRect().top +
            scrollY -
            (offsetTop + stickyBlockItem.offsetHeight + stickyConfig.bottom);
         let stickyItemValues = {
            position: "relative",
            bottom: "auto",
            top: "0px",
            left: "0px",
            width: "auto",
         };
         if (!stickyConfig.media || stickyConfig.media < window.innerWidth) {
            if (offsetTop + stickyConfig.bottom + stickyBlockItem.offsetHeight < window.innerHeight) {
               if (scrollY >= startPoint && scrollY <= endPoint) {
                  stickyItemValues.position = `fixed`;
                  stickyItemValues.bottom = `auto`;
                  stickyItemValues.top = `${offsetTop}px`;
                  stickyItemValues.left = `${stickyBlockItem.getBoundingClientRect().left}px`; // Учесть разницу в ширине экрана?
                  stickyItemValues.width = `${stickyBlockItem.offsetWidth}px`;
               } else if (scrollY >= endPoint) {
                  stickyItemValues.position = `absolute`;
                  stickyItemValues.bottom = `${stickyConfig.bottom}px`;
                  stickyItemValues.top = `auto`;
                  stickyItemValues.left = `0px`;
                  stickyItemValues.width = `${stickyBlockItem.offsetWidth}px`;
               }
            }
         }
         stickyBlockType(stickyBlockItem, stickyItemValues);
      }
   }
   function stickyBlockType(stickyBlockItem, stickyItemValues) {
      stickyBlockItem.style.cssText = `position:${stickyItemValues.position};bottom:${stickyItemValues.bottom};top:${stickyItemValues.top};left:${stickyItemValues.left};width:${stickyItemValues.width};`;
   }
   stickyBlockInit();
}
// При подключении модуля обработчик события запустится автоматически
setTimeout(() => {
   if (addWindowScrollEvent) {
      let windowScroll = new Event("windowScroll");
      window.addEventListener("scroll", function (e) {
         document.dispatchEvent(windowScroll);
      });
   }
}, 0);
// Подключение дополнения для увеличения возможностей
// import SmoothScroll from 'smooth-scroll';
//==============================================================================================================================================================================================================================================================================================================================

// Модуль плавной проктутки к блоку
let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
   const targetBlockElement = document.querySelector(targetBlock);
   if (targetBlockElement) {
      let headerItem = "";
      let headerItemHeight = 0;
      if (noHeader) {
         headerItem = "header.header";
         headerItemHeight = document.querySelector(headerItem).offsetHeight;
      }
      let options = {
         speedAsDuration: true,
         speed: speed,
         header: headerItem,
         offset: offsetTop,
         easing: "easeOutQuad",
      };
      // Закрываем меню, если оно открыто
      document.documentElement.classList.contains("menu-open") ? menuClose() : null;

      if (typeof SmoothScroll !== "undefined") {
         // Прокрутка с использованием дополнения
         new SmoothScroll().animateScroll(targetBlockElement, "", options);
      } else {
         // Прокрутка стандартными средствами
         let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
         targetBlockElementPosition = headerItemHeight
            ? targetBlockElementPosition - headerItemHeight
            : targetBlockElementPosition;
         targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
         window.scrollTo({
            top: targetBlockElementPosition,
            behavior: "smooth",
         });
      }
      FLS(`[gotoBlock]: Юхуу...едем к ${targetBlock}`);
   } else {
      FLS(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${targetBlock}`);
   }
};

pageNavigation();
//======================================== Scroll To Top Button + Fixed Header
var html, scrollToTopButton;
window.onload = function () {
   html = document.documentElement;
   body = document.body;
   scrollToTopButton = document.getElementById("scrollToTopButton");

   window.onscroll = function () {
      windowScroll();
      controlScrollToTopButton();
   };
};

function scrollToTop(totalTime, easingPower) {
   //console.log("here");
   var timeInterval = 1; //in ms
   var scrollTop = Math.round(body.scrollTop || html.scrollTop);
   //var by=- scrollTop;
   var timeLeft = totalTime;
   var scrollByPixel = setInterval(function () {
      var percentSpent = (totalTime - timeLeft) / totalTime;
      if (timeLeft >= 0) {
         var newScrollTop = scrollTop * (1 - easeInOut(percentSpent, easingPower));
         body.scrollTop = newScrollTop;
         html.scrollTop = newScrollTop;
         //console.log(easeInOut(percentSpent,easingPower));
         timeLeft--;
      } else {
         clearInterval(scrollByPixel);
         //Add hash to the url after scrolling
         //window.location.hash = hash;
      }
   }, timeInterval);
}

function easeInOut(t, power) {
   if (t < 0.5) {
      return 0.5 * Math.pow(2 * t, power);
   } else {
      return 0.5 * (2 - Math.pow(2 * (1 - t), power));
   }
}

//window.onscroll = controlScrollToTopButton;

function controlScrollToTopButton() {
   if (!scrollToTopButton) return;
   var windowInnerHeight = 2 * window.innerHeight;
   if (body.scrollTop > windowInnerHeight || html.scrollTop > windowInnerHeight) {
      scrollToTopButton.classList.add("show");
   } else {
      scrollToTopButton.classList.remove("show");
   }
}

var mainNav = document.querySelector(".header");

function windowScroll() {
   if (!mainNav) return;
   mainNav.classList.toggle("_fixed", mainNav.scrollTop > 50 || document.documentElement.scrollTop > 50);
}

var mainNav = document.querySelector(".header");

window.onscroll = function () {
   windowScroll();
};

function windowScroll() {
   mainNav.classList.toggle("_fixed", mainNav.scrollTop > 50 || document.documentElement.scrollTop > 50);
}

/*
Чтобы поле участвовало в валидации добавляем атрибут data-required
Особые проверки:
data-required="email" - вадидация E-mail

Чтобы поле валидировалось при потере фокуса, 
к атрибуту data-required добавляем атрибут data-validate

Чтобы вывести текст ошибки, нужно указать его в атрибуте data-error

data-popup-message - указываем селектор попапа который нужно показать после отправки формы (режимы data-ajax или data-dev) ! необходимо подключить функционал попапов в app.js
data-ajax - отправляем данные формы AJAX запросом по адресу указанному в action методом указанным в method
data-dev - режим разработчика - эмитируем отправку формы
data-goto-error - прокрутить страницу к ошибке
*/

formFieldsInit({ viewPass: true });
formSubmit();

// Работа с полями формы. Добавление классов, работа с placeholder
function formFieldsInit(options = { viewPass: false }) {
   // Если включено, добавляем функционал "скрыть плейсходлер при фокусе"
   const formFields = document.querySelectorAll("input[placeholder],textarea[placeholder]");
   if (formFields.length) {
      formFields.forEach((formField) => {
         if (!formField.hasAttribute("data-placeholder-nohide")) {
            formField.dataset.placeholder = formField.placeholder;
         }
      });
   }
   document.body.addEventListener("focusin", function (e) {
      const targetElement = e.target;
      if (targetElement.tagName === "INPUT" || targetElement.tagName === "TEXTAREA") {
         if (targetElement.dataset.placeholder) {
            targetElement.placeholder = "";
         }
         if (!targetElement.hasAttribute("data-no-focus-classes")) {
            targetElement.classList.add("_form-focus");
            targetElement.parentElement.classList.add("_form-focus");
         }
         formValidate.removeError(targetElement);
      }
   });
   document.body.addEventListener("focusout", function (e) {
      const targetElement = e.target;
      if (targetElement.tagName === "INPUT" || targetElement.tagName === "TEXTAREA") {
         if (targetElement.dataset.placeholder) {
            targetElement.placeholder = targetElement.dataset.placeholder;
         }
         if (!targetElement.hasAttribute("data-no-focus-classes")) {
            targetElement.classList.remove("_form-focus");
            targetElement.parentElement.classList.remove("_form-focus");
         }
         // Моментальная валидация
         if (targetElement.hasAttribute("data-validate")) {
            formValidate.validateInput(targetElement);
         }
      }
   });

   // Если включено, добавляем функционал "Показать пароль"
   if (options.viewPass) {
      document.addEventListener("click", function (e) {
         let targetElement = e.target;
         if (targetElement.closest('[class*="__viewpass"]')) {
            let inputType = targetElement.classList.contains("_viewpass-active") ? "password" : "text";
            targetElement.parentElement.querySelector("input").setAttribute("type", inputType);
            targetElement.classList.toggle("_viewpass-active");
         }
      });
   }
}
// Валидация форм
let formValidate = {
   getErrors(form) {
      let error = 0;
      let formRequiredItems = form.querySelectorAll("*[data-required]");
      if (formRequiredItems.length) {
         formRequiredItems.forEach((formRequiredItem) => {
            if (
               (formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") &&
               !formRequiredItem.disabled
            ) {
               error += this.validateInput(formRequiredItem);
            }
         });
      }
      return error;
   },
   validateInput(formRequiredItem) {
      let error = 0;
      if (formRequiredItem.dataset.required === "email") {
         formRequiredItem.value = formRequiredItem.value.replace(" ", "");
         if (this.emailTest(formRequiredItem)) {
            this.addError(formRequiredItem);
            error++;
         } else {
            this.removeError(formRequiredItem);
         }
      } else if (formRequiredItem.dataset.required === "phone") {
         formRequiredItem.value = formRequiredItem.value.replace(" ", "");
         if (this.phoneTest(formRequiredItem)) {
            this.addError(formRequiredItem);
            error++;
         } else {
            this.removeError(formRequiredItem);
         }
      } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
         this.addError(formRequiredItem);
         error++;
      } else {
         if (!formRequiredItem.value) {
            this.addError(formRequiredItem);
            error++;
         } else {
            this.removeError(formRequiredItem);
         }
      }
      return error;
   },
   addError(formRequiredItem) {
      formRequiredItem.classList.add("_form-error");
      formRequiredItem.parentElement.classList.add("_form-error");
      let inputError = formRequiredItem.parentElement.querySelector(".form__error");
      if (inputError) formRequiredItem.parentElement.removeChild(inputError);
      if (formRequiredItem.dataset.error) {
         formRequiredItem.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form__error">${formRequiredItem.dataset.error}</div>`
         );
      }
   },
   removeError(formRequiredItem) {
      formRequiredItem.classList.remove("_form-error");
      formRequiredItem.parentElement.classList.remove("_form-error");
      if (formRequiredItem.parentElement.querySelector(".form__error")) {
         formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector(".form__error"));
      }
   },
   formClean(form) {
      form.reset();
      setTimeout(() => {
         let inputs = form.querySelectorAll("input,textarea");
         for (let index = 0; index < inputs.length; index++) {
            const el = inputs[index];
            el.parentElement.classList.remove("_form-focus");
            el.classList.remove("_form-focus");
            formValidate.removeError(el);
         }
         let checkboxes = form.querySelectorAll(".checkbox__input");
         if (checkboxes.length > 0) {
            for (let index = 0; index < checkboxes.length; index++) {
               const checkbox = checkboxes[index];
               checkbox.checked = false;
            }
         }
         if (flsModules.select) {
            let selects = form.querySelectorAll(".select");
            if (selects.length) {
               for (let index = 0; index < selects.length; index++) {
                  const select = selects[index].querySelector("select");

                  flsModules.select.selectBuild(select);
               }
            }
         }
      }, 0);
   },
   emailTest(formRequiredItem) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
   },
   phoneTest(formRequiredItem) {
      var re = /(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}/;
      var valid = re.test(formRequiredItem.value);
      console.log(formRequiredItem.value + " : " + valid);
      return !valid;
   },
};

/* Отправка форм */
function formSubmit(options = { validate: true }) {
   const forms = document.forms;
   const formModal = document.querySelector(".modal__form");
   if (forms.length) {
      for (const form of forms) {
         form.addEventListener("submit", function (e) {
            const form = e.target;
            formModal.classList.add("_show");
            setTimeout(() => {
               formModal.classList.remove("_show");
            }, 2000);

            // Задерживаем отправку формы
            e.preventDefault();
            setTimeout(() => {
               form.submit(); // Программно отправляем форму через 2 секунды
            }, 2000);

            formSubmitAction(form, e);
         });
      }
   }
   async function formSubmitAction(form, e) {
      const error = !form.hasAttribute("data-no-validate") ? formValidate.getErrors(form) : 0;
      if (error === 0) {
         const ajax = form.hasAttribute("data-ajax");
         if (ajax) {
            const formAction = form.getAttribute("action") ? form.getAttribute("action").trim() : "#";
            const formMethod = form.getAttribute("method") ? form.getAttribute("method").trim() : "GET";
            const formData = new FormData(form);

            form.classList.add("_sending");
            const response = await fetch(formAction, {
               method: formMethod,
               body: formData,
            });
            if (response.ok) {
               let responseResult = await response.json();
               form.classList.remove("_sending");
               formSent(form);
            } else {
               alert("Ошибка");
               form.classList.remove("_sending");
            }
         } else if (form.hasAttribute("data-dev")) {
            formSent(form);
         }
      } else {
         const formError = form.querySelector("._form-error");
         if (formError && form.hasAttribute("data-goto-error")) {
            gotoBlock(formError, true, 1000);
         }
      }
   }
   function formSent(form) {
      document.dispatchEvent(
         new CustomEvent("formSent", {
            detail: {
               form: form,
            },
         })
      );
      setTimeout(() => {
         if (flsModules.popup) {
            const pop = form.dataset.popupMessage;
            const window = form.dataset.thiswindow;
            let pu = document.querySelector(pop);
            if (pu) {
               popup.close();
               setTimeout(() => {
                  pu.classList.add("_active");
               }, 500);
               setTimeout(() => {
                  pu.classList.remove("_active");
               }, 3000);
            }
         }
      }, 0);
      formValidate.formClean(form);
      formLogging(`Форма отправлена!`);
   }
   function formLogging(message) {
      FLS(`[Формы]: ${message}`);
   }
}
/* Модуь формы "колличество" */
let quantityButtons = document.querySelectorAll(".quantity__button");
if (quantityButtons.length > 0) {
   for (let index = 0; index < quantityButtons.length; index++) {
      const quantityButton = quantityButtons[index];
      quantityButton.addEventListener("click", function (e) {
         let value = parseInt(quantityButton.closest(".quantity").querySelector("input").value);
         if (quantityButton.classList.contains("quantity__button_plus")) {
            value++;
         } else {
            value = value - 1;
            if (value < 1) {
               value = 1;
            }
         }
         quantityButton.closest(".quantity").querySelector("input").value = value;
      });
   }
}
/* Модуь звездного рейтинга */
function formRating() {
   const ratings = document.querySelectorAll(".rating");
   if (ratings.length > 0) {
      initRatings();
   }
   // Основная функция
   function initRatings() {
      let ratingActive, ratingValue;
      // "Бегаем" по всем рейтингам на странице
      for (let index = 0; index < ratings.length; index++) {
         const rating = ratings[index];
         initRating(rating);
      }
      // Инициализируем конкретный рейтинг
      function initRating(rating) {
         initRatingVars(rating);

         setRatingActiveWidth();

         if (rating.classList.contains("rating_set")) {
            setRating(rating);
         }
      }
      // Инициализайция переменных
      function initRatingVars(rating) {
         ratingActive = rating.querySelector(".rating__active");
         ratingValue = rating.querySelector(".rating__value");
      }
      // Изменяем ширину активных звезд
      function setRatingActiveWidth(index = ratingValue.innerHTML) {
         const ratingActiveWidth = index / 0.05;
         ratingActive.style.width = `${ratingActiveWidth}%`;
      }
      // Возможность указать оценку
      function setRating(rating) {
         const ratingItems = rating.querySelectorAll(".rating__item");
         for (let index = 0; index < ratingItems.length; index++) {
            const ratingItem = ratingItems[index];
            ratingItem.addEventListener("mouseenter", function (e) {
               // Обновление переменных
               initRatingVars(rating);
               // Обновление активных звезд
               setRatingActiveWidth(ratingItem.value);
            });
            ratingItem.addEventListener("mouseleave", function (e) {
               // Обновление активных звезд
               setRatingActiveWidth();
            });
            ratingItem.addEventListener("click", function (e) {
               // Обновление переменных
               initRatingVars(rating);

               if (rating.dataset.ajax) {
                  // "Отправить" на сервер
                  setRatingValue(ratingItem.value, rating);
               } else {
                  // Отобразить указанную оцнку
                  ratingValue.innerHTML = index + 1;
                  setRatingActiveWidth();
               }
            });
         }
      }
      async function setRatingValue(value, rating) {
         if (!rating.classList.contains("rating_sending")) {
            rating.classList.add("rating_sending");

            // Отправика данных (value) на сервер
            let response = await fetch("rating.json", {
               method: "GET",

               //body: JSON.stringify({
               // userRating: value
               //}),
               //headers: {
               // 'content-type': 'application/json'
               //}
            });
            if (response.ok) {
               const result = await response.json();

               // Получаем новый рейтинг
               const newRating = result.newRating;

               // Вывод нового среднего результата
               ratingValue.innerHTML = newRating;

               // Обновление активных звезд
               setRatingActiveWidth();

               rating.classList.remove("rating_sending");
            } else {
               alert("Ошибка");

               rating.classList.remove("rating_sending");
            }
         }
      }
   }
}

// Подключение файла стилей
// Базовые стили поключаются в src/scss/forms.scss
// Файл базовых стилей src/scss/forms/select.scss

/*
Документация:
Снипет (HTML): sel
*/
/*
// Настройки
Для селекта (select):
class="имя класса" - модификатор к конкретному селекту
multiple - мультивыбор
data-tags - режим тегов, только для (только для multiple)
data-scroll - включит прокрутку для выпадающего списка, дополнительно можно подключить кастомный скролл simplebar в app.js. Указанное число для атрибута ограничит высоту
data-checkbox - стилизация элементов по checkbox (только для multiple)
data-show-selected - отключает скрытие выбранного элемента
data-search - позволяет искать по выпадающему списку
data-open - селект открыт сразу
data-submit - отправляет форму при изменении селекта

data-one-select - селекты внутри оболочки с атрибутом будут показываться только по одному
data-pseudo-label - добавляет псевдоэлемент к заголовку селекта с указанным текстом

Для плейсхолдера (Плейсхолдер - это option с value=""):
data-label для плейсхолдера, добавляет label к селекту
data-show для плейсхолдера, показывает его в списке (только для единичного выбора)

Для элемента (option):
data-class="имя класса" - добавляет класс
data-asset="путь к картинке или текст" - добавляет структуру 2х колонок и данными
data-href="адрес ссылки" - добавляет ссылку в элемент списка
data-href-blank - откроет ссылку в новом окне
*/

/*
// Возможные доработки:
попап на мобилке
*/

// Класс построения Select
class SelectConstructor {
   constructor(props, data = null) {
      let defaultConfig = {
         init: true,
         logging: true,
      };
      this.config = Object.assign(defaultConfig, props);
      // CSS классы модуля
      this.selectClasses = {
         classSelect: "select", // Главный блок
         classSelectBody: "select__body", // Тело селекта
         classSelectTitle: "select__title", // Заголовок
         classSelectValue: "select__value", // Значение в заголовке
         classSelectLabel: "select__label", // Лабел
         classSelectInput: "select__input", // Поле ввода
         classSelectText: "select__text", // Оболочка текстовых данных
         classSelectLink: "select__link", // Ссылка в элементе
         classSelectOptions: "select__options", // Выпадающий список
         classSelectOptionsScroll: "select__scroll", // Оболочка при скролле
         classSelectOption: "select__option", // Пункт
         classSelectContent: "select__content", // Оболочка контента в заголовке
         classSelectRow: "select__row", // Ряд
         classSelectData: "select__asset", // Дополнительные данные
         classSelectDisabled: "_select-disabled", // Запрешен
         classSelectTag: "_select-tag", // Класс тега
         classSelectOpen: "_select-open", // Список открыт
         classSelectActive: "_select-active", // Список выбран
         classSelectFocus: "_select-focus", // Список в фокусе
         classSelectMultiple: "_select-multiple", // Мультивыбор
         classSelectCheckBox: "_select-checkbox", // Стиль чекбокса
         classSelectOptionSelected: "_select-selected", // Выбранный пункт
         classSelectPseudoLabel: "_select-pseudo-label", // Псевдолейбл
      };
      this._this = this;
      // Запуск инициализации
      if (this.config.init) {
         // Получение всех select на странице
         const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll("select");
         if (selectItems.length) {
            this.selectsInit(selectItems);
            this.setLogging(`Проснулся, построил селектов: (${selectItems.length})`);
         } else {
            this.setLogging("Сплю, нет ни одного select zzZZZzZZz");
         }
      }
   }
   // Конструктор CSS класса
   getSelectClass(className) {
      return `.${className}`;
   }
   // Геттер элементов псевдоселекта
   getSelectElement(selectItem, className) {
      return {
         originalSelect: selectItem.querySelector("select"),
         selectElement: selectItem.querySelector(this.getSelectClass(className)),
      };
   }
   // Функция инициализации всех селектов
   selectsInit(selectItems) {
      selectItems.forEach((originalSelect, index) => {
         this.selectInit(originalSelect, index + 1);
      });
      // Обработчики событий...
      // ...при клике
      document.addEventListener(
         "click",
         function (e) {
            this.selectsActions(e);
         }.bind(this)
      );
      // ...при нажатии клавиши
      document.addEventListener(
         "keydown",
         function (e) {
            this.selectsActions(e);
         }.bind(this)
      );
      // ...при фокусе
      document.addEventListener(
         "focusin",
         function (e) {
            this.selectsActions(e);
         }.bind(this)
      );
      // ...при потере фокуса
      document.addEventListener(
         "focusout",
         function (e) {
            this.selectsActions(e);
         }.bind(this)
      );
   }
   // Функция инициализации конкретного селекта
   selectInit(originalSelect, index) {
      const _this = this;
      // Создаем оболочку
      let selectItem = document.createElement("div");
      selectItem.classList.add(this.selectClasses.classSelect);
      // Выводим оболочку перед оригинальным селектом
      originalSelect.parentNode.insertBefore(selectItem, originalSelect);
      // Помещаем оригинальный селект в оболочку
      selectItem.appendChild(originalSelect);
      // Скрываем оригинальный селект
      originalSelect.hidden = true;
      // Присваиваем уникальный ID
      index ? (originalSelect.dataset.id = index) : null;

      // Работа с плейсхолдером
      if (this.getSelectPlaceholder(originalSelect)) {
         // Запоминаем плейсхолдер
         originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
         // Если включен режим label
         if (this.getSelectPlaceholder(originalSelect).label.show) {
            const selectItemTitle = this.getSelectElement(
               selectItem,
               this.selectClasses.classSelectTitle
            ).selectElement;
            selectItemTitle.insertAdjacentHTML(
               "afterbegin",
               `<span class="${this.selectClasses.classSelectLabel}">${
                  this.getSelectPlaceholder(originalSelect).label.text
                     ? this.getSelectPlaceholder(originalSelect).label.text
                     : this.getSelectPlaceholder(originalSelect).value
               }</span>`
            );
         }
      }
      // Конструктор основных элементов
      selectItem.insertAdjacentHTML(
         "beforeend",
         `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`
      );
      // Запускаем конструктор псевдоселекта
      this.selectBuild(originalSelect);

      // Запоминаем скорость
      originalSelect.dataset.speed = originalSelect.dataset.speed ? originalSelect.dataset.speed : "150";
      // Событие при изменении оригинального select
      originalSelect.addEventListener("change", function (e) {
         _this.selectChange(e);
      });
   }
   // Конструктор псевдоселекта
   selectBuild(originalSelect) {
      const selectItem = originalSelect.parentElement;
      // Добавляем ID селекта
      selectItem.dataset.id = originalSelect.dataset.id;
      // Получаем класс оригинального селекта, создаем модификатор и добавляем его
      selectItem.classList.add(
         originalSelect.getAttribute("class") ? `select_${originalSelect.getAttribute("class")}` : ""
      );
      // Если множественный выбор, добавляем класс
      originalSelect.multiple
         ? selectItem.classList.add(this.selectClasses.classSelectMultiple)
         : selectItem.classList.remove(this.selectClasses.classSelectMultiple);
      // Cтилизация элементов под checkbox (только для multiple)
      originalSelect.hasAttribute("data-checkbox") && originalSelect.multiple
         ? selectItem.classList.add(this.selectClasses.classSelectCheckBox)
         : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);
      // Сеттер значения заголовка селекта
      this.setSelectTitleValue(selectItem, originalSelect);
      // Сеттер элементов списка (options)
      this.setOptions(selectItem, originalSelect);
      // Если включена опция поиска data-search, запускаем обработчик
      originalSelect.hasAttribute("data-search") ? this.searchActions(selectItem) : null;
      // Если указана настройка data-open, открываем селект
      originalSelect.hasAttribute("data-open") ? this.selectAction(selectItem) : null;
      // Обработчик disabled
      this.selectDisabled(selectItem, originalSelect);
   }
   // Функция реакций на события
   selectsActions(e) {
      const targetElement = e.target;
      const targetType = e.type;
      if (
         targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) ||
         targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))
      ) {
         const selectItem = targetElement.closest(".select")
            ? targetElement.closest(".select")
            : document.querySelector(
                 `.${this.selectClasses.classSelect}[data-id="${
                    targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId
                 }"]`
              );
         const originalSelect = this.getSelectElement(selectItem).originalSelect;
         if (targetType === "click") {
            if (!originalSelect.disabled) {
               if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
                  // Обработка клика на тег
                  const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
                  const optionItem = document.querySelector(
                     `.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`
                  );
                  this.optionAction(selectItem, originalSelect, optionItem);
               } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) {
                  // Обработка клика на заголовок селекта
                  this.selectAction(selectItem);
               } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
                  // Обработка клика на элемент селекта
                  const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
                  this.optionAction(selectItem, originalSelect, optionItem);
               }
            }
         } else if (targetType === "focusin" || targetType === "focusout") {
            if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) {
               targetType === "focusin"
                  ? selectItem.classList.add(this.selectClasses.classSelectFocus)
                  : selectItem.classList.remove(this.selectClasses.classSelectFocus);
            }
         } else if (targetType === "keydown" && e.code === "Escape") {
            this.selectsСlose();
         }
      } else {
         this.selectsСlose();
      }
   }
   // Функция закрытия всех селектов
   selectsСlose(selectOneGroup) {
      const selectsGroup = selectOneGroup ? selectOneGroup : document;
      const selectActiveItems = selectsGroup.querySelectorAll(
         `${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(
            this.selectClasses.classSelectOpen
         )}`
      );
      if (selectActiveItems.length) {
         selectActiveItems.forEach((selectActiveItem) => {
            this.selectСlose(selectActiveItem);
         });
      }
   }
   // Функция закрытия конкретного селекта
   selectСlose(selectItem) {
      const originalSelect = this.getSelectElement(selectItem).originalSelect;
      const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
      if (!selectOptions.classList.contains("_slide")) {
         selectItem.classList.remove(this.selectClasses.classSelectOpen);
         _slideUp(selectOptions, originalSelect.dataset.speed);
      }
   }
   // Функция открытия/закрытия конкретного селекта
   selectAction(selectItem) {
      const originalSelect = this.getSelectElement(selectItem).originalSelect;
      const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;

      // Если селекты помещенны в элемент с дата атрибутом data-one-select
      // закрываем все открытые селекты
      if (originalSelect.closest("[data-one-select]")) {
         const selectOneGroup = originalSelect.closest("[data-one-select]");
         this.selectsСlose(selectOneGroup);
      }

      if (!selectOptions.classList.contains("_slide")) {
         selectItem.classList.toggle(this.selectClasses.classSelectOpen);
         _slideToggle(selectOptions, originalSelect.dataset.speed);
      }
   }
   // Сеттер значения заголовка селекта
   setSelectTitleValue(selectItem, originalSelect) {
      const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
      const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
      if (selectItemTitle) selectItemTitle.remove();
      selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));
   }
   // Конструктор значения заголовка
   getSelectTitleValue(selectItem, originalSelect) {
      // Получаем выбранные текстовые значения
      let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
      // Обработка значений мультивыбора
      // Если включен режим тегов (указана настройка data-tags)
      if (originalSelect.multiple && originalSelect.hasAttribute("data-tags")) {
         selectTitleValue = this.getSelectedOptionsData(originalSelect)
            .elements.map(
               (option) =>
                  `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${
                     option.value
                  }" class="_select-tag">${this.getSelectElementContent(option)}</span>`
            )
            .join("");
         // Если вывод тегов во внешний блок
         if (originalSelect.dataset.tags && document.querySelector(originalSelect.dataset.tags)) {
            document.querySelector(originalSelect.dataset.tags).innerHTML = selectTitleValue;
            if (originalSelect.hasAttribute("data-search")) selectTitleValue = false;
         }
      }
      // Значение(я) или плейсхолдер
      selectTitleValue = selectTitleValue.length
         ? selectTitleValue
         : originalSelect.dataset.placeholder
         ? originalSelect.dataset.placeholder
         : "";
      // Если включен режим pseudo
      let pseudoAttribute = "";
      let pseudoAttributeClass = "";
      if (originalSelect.hasAttribute("data-pseudo-label")) {
         pseudoAttribute = originalSelect.dataset.pseudoLabel
            ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"`
            : ` data-pseudo-label="Заполните атрибут"`;
         pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
      }
      // Если есть значение, добавляем класс
      this.getSelectedOptionsData(originalSelect).values.length
         ? selectItem.classList.add(this.selectClasses.classSelectActive)
         : selectItem.classList.remove(this.selectClasses.classSelectActive);
      // Возвращаем поле ввода для поиска или текст
      if (originalSelect.hasAttribute("data-search")) {
         // Выводим поле ввода для поиска
         return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`;
      } else {
         // Если выбран элемент со своим классом
         const customClass =
            this.getSelectedOptionsData(originalSelect).elements.length &&
            this.getSelectedOptionsData(originalSelect).elements[0].dataset.class
               ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.class}`
               : "";
         // Выводим текстовое значение
         return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
      }
   }
   // Конструктор данных для значения заголовка
   getSelectElementContent(selectOption) {
      // Если для элемента указан вывод картинки или текста, перестраиваем конструкцию
      const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : "";
      const selectOptionDataHTML =
         selectOptionData.indexOf("img") >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
      let selectOptionContentHTML = ``;
      selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : "";
      selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : "";
      selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : "";
      selectOptionContentHTML += selectOptionData ? `</span>` : "";
      selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : "";
      selectOptionContentHTML += selectOption.textContent;
      selectOptionContentHTML += selectOptionData ? `</span>` : "";
      selectOptionContentHTML += selectOptionData ? `</span>` : "";
      return selectOptionContentHTML;
   }
   // Получение данных плейсхолдера
   getSelectPlaceholder(originalSelect) {
      const selectPlaceholder = Array.from(originalSelect.options).find((option) => !option.value);
      if (selectPlaceholder) {
         return {
            value: selectPlaceholder.textContent,
            show: selectPlaceholder.hasAttribute("data-show"),
            label: {
               show: selectPlaceholder.hasAttribute("data-label"),
               text: selectPlaceholder.dataset.label,
            },
         };
      }
   }
   // Получение данных из выбранных элементов
   getSelectedOptionsData(originalSelect, type) {
      // Получаем все выбранные объекты из select
      let selectedOptions = [];
      if (originalSelect.multiple) {
         // Если мультивыбор
         // Убираем плейсхолдер, получаем остальные выбранные элементы
         selectedOptions = Array.from(originalSelect.options)
            .filter((option) => option.value)
            .filter((option) => option.selected);
      } else {
         // Если единичный выбор
         selectedOptions.push(originalSelect.options[originalSelect.selectedIndex]);
      }
      return {
         elements: selectedOptions.map((option) => option),
         values: selectedOptions.filter((option) => option.value).map((option) => option.value),
         html: selectedOptions.map((option) => this.getSelectElementContent(option)),
      };
   }
   // Конструктор элементов списка
   getOptions(originalSelect) {
      // Настрока скролла элементов
      let selectOptionsScroll = originalSelect.hasAttribute("data-scroll") ? `data-simplebar` : "";
      let selectOptionsScrollHeight = originalSelect.dataset.scroll
         ? `style="max-height:${originalSelect.dataset.scroll}px"`
         : "";
      // Получаем элементы списка
      let selectOptions = Array.from(originalSelect.options);
      if (selectOptions.length > 0) {
         let selectOptionsHTML = ``;
         // Если указана настройка data-show, показываем плейсхолдер в списке
         if (
            (this.getSelectPlaceholder(originalSelect) && !this.getSelectPlaceholder(originalSelect).show) ||
            originalSelect.multiple
         ) {
            selectOptions = selectOptions.filter((option) => option.value);
         }
         // Строим и выводим основную конструкцию
         selectOptionsHTML += selectOptionsScroll
            ? `<div ${selectOptionsScroll} ${selectOptionsScrollHeight} class="${this.selectClasses.classSelectOptionsScroll}">`
            : "";
         selectOptions.forEach((selectOption) => {
            // Получаем конструкцию конкретного элемента списка
            selectOptionsHTML += this.getOption(selectOption, originalSelect);
         });
         selectOptionsHTML += selectOptionsScroll ? `</div>` : "";
         return selectOptionsHTML;
      }
   }
   // Конструктор конкретного элемента списка
   getOption(selectOption, originalSelect) {
      // Если элемент выбран и включен режим мультивыбора, добавляем класс
      const selectOptionSelected =
         selectOption.selected && originalSelect.multiple ? ` ${this.selectClasses.classSelectOptionSelected}` : "";
      // Если элемент выбрани и нет настройки data-show-selected, скрываем элемент
      const selectOptionHide =
         selectOption.selected && !originalSelect.hasAttribute("data-show-selected") && !originalSelect.multiple
            ? `hidden`
            : ``;
      // Если для элемента указан класс добавляем
      const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : "";
      // Если указан режим ссылки
      const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false;
      const selectOptionLinkTarget = selectOption.hasAttribute("data-href-blank") ? `target="_blank"` : "";
      // Строим и возвращаем конструкцию элемента
      let selectOptionHTML = ``;
      selectOptionHTML += selectOptionLink
         ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">`
         : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
      selectOptionHTML += this.getSelectElementContent(selectOption);
      selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
      return selectOptionHTML;
   }
   // Сеттер элементов списка (options)
   setOptions(selectItem, originalSelect) {
      // Получаем объект тела псевдоселекта
      const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
      // Запускаем конструктор элементов списка (options) и добавляем в тело псевдоселекта
      selectItemOptions.innerHTML = this.getOptions(originalSelect);
   }
   // Обработчик клика на элемент списка
   optionAction(selectItem, originalSelect, optionItem) {
      if (originalSelect.multiple) {
         // Если мультивыбор
         // Выделяем классом элемент
         optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
         // Очищаем выбранные элементы
         const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
         originalSelectSelectedItems.forEach((originalSelectSelectedItem) => {
            originalSelectSelectedItem.removeAttribute("selected");
         });
         // Выбираем элементы
         const selectSelectedItems = selectItem.querySelectorAll(
            this.getSelectClass(this.selectClasses.classSelectOptionSelected)
         );
         selectSelectedItems.forEach((selectSelectedItems) => {
            originalSelect
               .querySelector(`option[value="${selectSelectedItems.dataset.value}"]`)
               .setAttribute("selected", "selected");
         });
      } else {
         // Если единичный выбор
         // Если не указана настройка data-show-selected, скрываем выбранный элемент
         if (!originalSelect.hasAttribute("data-show-selected")) {
            // Сначала все показать
            if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) {
               selectItem.querySelector(
                  `${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`
               ).hidden = false;
            }
            // Скрываем выбранную
            optionItem.hidden = true;
         }
         originalSelect.value = optionItem.hasAttribute("data-value")
            ? optionItem.dataset.value
            : optionItem.textContent;
         this.selectAction(selectItem);
      }
      // Обновляем заголовок селекта
      this.setSelectTitleValue(selectItem, originalSelect);
      // Вызываем реакцию на изменение селекта
      this.setSelectChange(originalSelect);
   }
   // Реакция на измененение оригинального select
   selectChange(e) {
      const originalSelect = e.target;
      this.selectBuild(originalSelect);
      this.setSelectChange(originalSelect);
   }
   // Обработчик изменения в селекте
   setSelectChange(originalSelect) {
      // Моментальная валидация селекта
      if (originalSelect.hasAttribute("data-validate")) {
         formValidate.validateInput(originalSelect);
      }
      // При изменении селекта отправляем форму
      if (originalSelect.hasAttribute("data-submit") && originalSelect.value) {
         let tempButton = document.createElement("button");
         tempButton.type = "submit";
         originalSelect.closest("form").append(tempButton);
         tempButton.click();
         tempButton.remove();
      }
      const selectItem = originalSelect.parentElement;
      // Вызов коллбэк функции
      this.selectCallback(selectItem, originalSelect);
   }
   // Обработчик disabled
   selectDisabled(selectItem, originalSelect) {
      if (originalSelect.disabled) {
         selectItem.classList.add(this.selectClasses.classSelectDisabled);
         this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = true;
      } else {
         selectItem.classList.remove(this.selectClasses.classSelectDisabled);
         this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = false;
      }
   }
   // Обработчик поиска по элементам списка
   searchActions(selectItem) {
      const originalSelect = this.getSelectElement(selectItem).originalSelect;
      const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
      const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
      const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption}`);
      const _this = this;
      selectInput.addEventListener("input", function () {
         selectOptionsItems.forEach((selectOptionsItem) => {
            if (selectOptionsItem.textContent.toUpperCase().indexOf(selectInput.value.toUpperCase()) >= 0) {
               selectOptionsItem.hidden = false;
            } else {
               selectOptionsItem.hidden = true;
            }
         });
         // Если список закрыт открываем
         selectOptions.hidden === true ? _this.selectAction(selectItem) : null;
      });
   }
   // Коллбэк функция
   selectCallback(selectItem, originalSelect) {
      document.dispatchEvent(
         new CustomEvent("selectCallback", {
            detail: {
               select: originalSelect,
            },
         })
      );
   }
   // Логгинг в консоль
   setLogging(message) {
      this.config.logging ? FLS(`[select]: ${message}`) : null;
   }
}
// Запускаем и добавляем в объект модулей
select = new SelectConstructor({});

/*!
 * dist/inputmask.min
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2022 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.0.8-beta.52
 */
!(function (e, t) {
   if ("object" == typeof exports && "object" == typeof module) module.exports = t();
   else if ("function" == typeof define && define.amd) define([], t);
   else {
      var i = t();
      for (var a in i) ("object" == typeof exports ? exports : e)[a] = i[a];
   }
})("undefined" != typeof self ? self : this, function () {
   return (function () {
      "use strict";
      var e = {
            8741: function (e, t) {
               Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
               var i = !("undefined" == typeof window || !window.document || !window.document.createElement);
               t.default = i;
            },
            3976: function (e, t, i) {
               Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
               var a = i(2839),
                  n = {
                     _maxTestPos: 500,
                     placeholder: "_",
                     optionalmarker: ["[", "]"],
                     quantifiermarker: ["{", "}"],
                     groupmarker: ["(", ")"],
                     alternatormarker: "|",
                     escapeChar: "\\",
                     mask: null,
                     regex: null,
                     oncomplete: function () {},
                     onincomplete: function () {},
                     oncleared: function () {},
                     repeat: 0,
                     greedy: !1,
                     autoUnmask: !1,
                     removeMaskOnSubmit: !1,
                     clearMaskOnLostFocus: !0,
                     insertMode: !0,
                     insertModeVisual: !0,
                     clearIncomplete: !1,
                     alias: null,
                     onKeyDown: function () {},
                     onBeforeMask: null,
                     onBeforePaste: function (e, t) {
                        return "function" == typeof t.onBeforeMask ? t.onBeforeMask.call(this, e, t) : e;
                     },
                     onBeforeWrite: null,
                     onUnMask: null,
                     showMaskOnFocus: !0,
                     showMaskOnHover: !0,
                     onKeyValidation: function () {},
                     skipOptionalPartCharacter: " ",
                     numericInput: !1,
                     rightAlign: !1,
                     undoOnEscape: !0,
                     radixPoint: "",
                     _radixDance: !1,
                     groupSeparator: "",
                     keepStatic: null,
                     positionCaretOnTab: !0,
                     tabThrough: !1,
                     supportsInputType: ["text", "tel", "url", "password", "search"],
                     ignorables: [
                        a.keys.Backspace,
                        a.keys.Tab,
                        a.keys.Pause,
                        a.keys.Escape,
                        a.keys.PageUp,
                        a.keys.PageDown,
                        a.keys.End,
                        a.keys.Home,
                        a.keys.ArrowLeft,
                        a.keys.ArrowUp,
                        a.keys.ArrowRight,
                        a.keys.ArrowDown,
                        a.keys.Insert,
                        a.keys.Delete,
                        a.keys.ContextMenu,
                        a.keys.F1,
                        a.keys.F2,
                        a.keys.F3,
                        a.keys.F4,
                        a.keys.F5,
                        a.keys.F6,
                        a.keys.F7,
                        a.keys.F8,
                        a.keys.F9,
                        a.keys.F10,
                        a.keys.F11,
                        a.keys.F12,
                        a.keys.Process,
                        a.keys.Unidentified,
                        a.keys.Shift,
                        a.keys.Control,
                        a.keys.Alt,
                        a.keys.Tab,
                        a.keys.AltGraph,
                        a.keys.CapsLock,
                     ],
                     isComplete: null,
                     preValidation: null,
                     postValidation: null,
                     staticDefinitionSymbol: void 0,
                     jitMasking: !1,
                     nullable: !0,
                     inputEventOnly: !1,
                     noValuePatching: !1,
                     positionCaretOnClick: "lvp",
                     casing: null,
                     inputmode: "text",
                     importDataAttributes: !0,
                     shiftPositions: !0,
                     usePrototypeDefinitions: !0,
                     validationEventTimeOut: 3e3,
                     substitutes: {},
                  };
               t.default = n;
            },
            7392: function (e, t) {
               Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
               t.default = {
                  9: { validator: "[0-9\uff10-\uff19]", definitionSymbol: "*" },
                  a: { validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]", definitionSymbol: "*" },
                  "*": { validator: "[0-9\uff10-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]" },
               };
            },
            253: function (e, t) {
               Object.defineProperty(t, "__esModule", { value: !0 }),
                  (t.default = function (e, t, i) {
                     if (void 0 === i) return e.__data ? e.__data[t] : null;
                     (e.__data = e.__data || {}), (e.__data[t] = i);
                  });
            },
            3776: function (e, t, i) {
               Object.defineProperty(t, "__esModule", { value: !0 }),
                  (t.Event = void 0),
                  (t.off = function (e, t) {
                     var i, a;
                     function n(e, t, n) {
                        if (e in i == !0)
                           if (
                              (a.removeEventListener
                                 ? a.removeEventListener(e, n, !1)
                                 : a.detachEvent && a.detachEvent("on" + e, n),
                              "global" === t)
                           )
                              for (var r in i[e]) i[e][r].splice(i[e][r].indexOf(n), 1);
                           else i[e][t].splice(i[e][t].indexOf(n), 1);
                     }
                     function r(e, a) {
                        var n,
                           r,
                           o = [];
                        if (e.length > 0)
                           if (void 0 === t)
                              for (n = 0, r = i[e][a].length; n < r; n++)
                                 o.push({ ev: e, namespace: a && a.length > 0 ? a : "global", handler: i[e][a][n] });
                           else o.push({ ev: e, namespace: a && a.length > 0 ? a : "global", handler: t });
                        else if (a.length > 0)
                           for (var s in i)
                              for (var l in i[s])
                                 if (l === a)
                                    if (void 0 === t)
                                       for (n = 0, r = i[s][l].length; n < r; n++)
                                          o.push({ ev: s, namespace: l, handler: i[s][l][n] });
                                    else o.push({ ev: s, namespace: l, handler: t });
                        return o;
                     }
                     if (c(this[0]) && e) {
                        (i = this[0].eventRegistry), (a = this[0]);
                        for (var o = e.split(" "), s = 0; s < o.length; s++)
                           for (var l = o[s].split("."), u = r(l[0], l[1]), f = 0, d = u.length; f < d; f++)
                              n(u[f].ev, u[f].namespace, u[f].handler);
                     }
                     return this;
                  }),
                  (t.on = function (e, t) {
                     function i(e, i) {
                        n.addEventListener ? n.addEventListener(e, t, !1) : n.attachEvent && n.attachEvent("on" + e, t),
                           (a[e] = a[e] || {}),
                           (a[e][i] = a[e][i] || []),
                           a[e][i].push(t);
                     }
                     if (c(this[0]))
                        for (var a = this[0].eventRegistry, n = this[0], r = e.split(" "), o = 0; o < r.length; o++) {
                           var s = r[o].split("."),
                              l = s[0],
                              u = s[1] || "global";
                           i(l, u);
                        }
                     return this;
                  }),
                  (t.trigger = function (e) {
                     if (c(this[0]))
                        for (
                           var t = this[0].eventRegistry,
                              i = this[0],
                              a = "string" == typeof e ? e.split(" ") : [e.type],
                              r = 0;
                           r < a.length;
                           r++
                        ) {
                           var s = a[r].split("."),
                              l = s[0],
                              u = s[1] || "global";
                           if (void 0 !== document && "global" === u) {
                              var f,
                                 d,
                                 p = { bubbles: !0, cancelable: !0, composed: !0, detail: arguments[1] };
                              if (document.createEvent) {
                                 try {
                                    if ("input" === l) (p.inputType = "insertText"), (f = new InputEvent(l, p));
                                    else f = new CustomEvent(l, p);
                                 } catch (e) {
                                    (f = document.createEvent("CustomEvent")).initCustomEvent(
                                       l,
                                       p.bubbles,
                                       p.cancelable,
                                       p.detail
                                    );
                                 }
                                 e.type && (0, n.default)(f, e), i.dispatchEvent(f);
                              } else
                                 ((f = document.createEventObject()).eventType = l),
                                    (f.detail = arguments[1]),
                                    e.type && (0, n.default)(f, e),
                                    i.fireEvent("on" + f.eventType, f);
                           } else if (void 0 !== t[l])
                              if (
                                 ((arguments[0] = arguments[0].type ? arguments[0] : o.default.Event(arguments[0])),
                                 (arguments[0].detail = arguments.slice(1)),
                                 "global" === u)
                              )
                                 for (var h in t[l])
                                    for (d = 0; d < t[l][h].length; d++) t[l][h][d].apply(i, arguments);
                              else for (d = 0; d < t[l][u].length; d++) t[l][u][d].apply(i, arguments);
                        }
                     return this;
                  });
               var a,
                  n = l(i(600)),
                  r = l(i(9380)),
                  o = l(i(4963)),
                  s = l(i(8741));
               function l(e) {
                  return e && e.__esModule ? e : { default: e };
               }
               function c(e) {
                  return e instanceof Element;
               }
               (t.Event = a),
                  "function" == typeof r.default.CustomEvent
                     ? (t.Event = a = r.default.CustomEvent)
                     : s.default &&
                       ((t.Event = a =
                          function (e, t) {
                             t = t || { bubbles: !1, cancelable: !1, composed: !0, detail: void 0 };
                             var i = document.createEvent("CustomEvent");
                             return i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i;
                          }),
                       (a.prototype = r.default.Event.prototype));
            },
            600: function (e, t) {
               function i(e) {
                  return (
                     (i =
                        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                           ? function (e) {
                                return typeof e;
                             }
                           : function (e) {
                                return e &&
                                   "function" == typeof Symbol &&
                                   e.constructor === Symbol &&
                                   e !== Symbol.prototype
                                   ? "symbol"
                                   : typeof e;
                             }),
                     i(e)
                  );
               }
               Object.defineProperty(t, "__esModule", { value: !0 }),
                  (t.default = function e() {
                     var t,
                        a,
                        n,
                        r,
                        o,
                        s,
                        l = arguments[0] || {},
                        c = 1,
                        u = arguments.length,
                        f = !1;
                     "boolean" == typeof l && ((f = l), (l = arguments[c] || {}), c++);
                     "object" !== i(l) && "function" != typeof l && (l = {});
                     for (; c < u; c++)
                        if (null != (t = arguments[c]))
                           for (a in t)
                              (n = l[a]),
                                 (r = t[a]),
                                 l !== r &&
                                    (f &&
                                    r &&
                                    ("[object Object]" === Object.prototype.toString.call(r) || (o = Array.isArray(r)))
                                       ? (o
                                            ? ((o = !1), (s = n && Array.isArray(n) ? n : []))
                                            : (s =
                                                 n && "[object Object]" === Object.prototype.toString.call(n) ? n : {}),
                                         (l[a] = e(f, s, r)))
                                       : void 0 !== r && (l[a] = r));
                     return l;
                  });
            },
            4963: function (e, t, i) {
               Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
               var a = s(i(600)),
                  n = s(i(9380)),
                  r = s(i(253)),
                  o = i(3776);
               function s(e) {
                  return e && e.__esModule ? e : { default: e };
               }
               var l = n.default.document;
               function c(e) {
                  return e instanceof c
                     ? e
                     : this instanceof c
                     ? void (
                          null != e &&
                          e !== n.default &&
                          ((this[0] = e.nodeName ? e : void 0 !== e[0] && e[0].nodeName ? e[0] : l.querySelector(e)),
                          void 0 !== this[0] &&
                             null !== this[0] &&
                             (this[0].eventRegistry = this[0].eventRegistry || {}))
                       )
                     : new c(e);
               }
               (c.prototype = { on: o.on, off: o.off, trigger: o.trigger }),
                  (c.extend = a.default),
                  (c.data = r.default),
                  (c.Event = o.Event);
               var u = c;
               t.default = u;
            },
            9845: function (e, t, i) {
               Object.defineProperty(t, "__esModule", { value: !0 }),
                  (t.mobile = t.iphone = t.iemobile = t.ie = void 0);
               var a,
                  n = (a = i(9380)) && a.__esModule ? a : { default: a };
               var r = (n.default.navigator && n.default.navigator.userAgent) || "",
                  o = r.indexOf("MSIE ") > 0 || r.indexOf("Trident/") > 0,
                  s = (n.default.navigator && n.default.navigator.maxTouchPoints) || "ontouchstart" in n.default,
                  l = /iemobile/i.test(r),
                  c = /iphone/i.test(r) && !l;
               (t.iphone = c), (t.iemobile = l), (t.mobile = s), (t.ie = o);
            },
            7184: function (e, t) {
               Object.defineProperty(t, "__esModule", { value: !0 }),
                  (t.default = function (e) {
                     return e.replace(i, "\\$1");
                  });
               var i = new RegExp(
                  "(\\" +
                     ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"].join("|\\") +
                     ")",
                  "gim"
               );
            },
            6030: function (e, t, i) {
               Object.defineProperty(t, "__esModule", { value: !0 }), (t.EventHandlers = void 0);
               var a = i(8711),
                  n = i(2839),
                  r = i(9845),
                  o = i(7215),
                  s = i(7760),
                  l = i(4713);
               function c(e, t) {
                  var i = ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
                  if (!i) {
                     if (
                        Array.isArray(e) ||
                        (i = (function (e, t) {
                           if (!e) return;
                           if ("string" == typeof e) return u(e, t);
                           var i = Object.prototype.toString.call(e).slice(8, -1);
                           "Object" === i && e.constructor && (i = e.constructor.name);
                           if ("Map" === i || "Set" === i) return Array.from(e);
                           if ("Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)) return u(e, t);
                        })(e)) ||
                        (t && e && "number" == typeof e.length)
                     ) {
                        i && (e = i);
                        var a = 0,
                           n = function () {};
                        return {
                           s: n,
                           n: function () {
                              return a >= e.length ? { done: !0 } : { done: !1, value: e[a++] };
                           },
                           e: function (e) {
                              throw e;
                           },
                           f: n,
                        };
                     }
                     throw new TypeError(
                        "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                     );
                  }
                  var r,
                     o = !0,
                     s = !1;
                  return {
                     s: function () {
                        i = i.call(e);
                     },
                     n: function () {
                        var e = i.next();
                        return (o = e.done), e;
                     },
                     e: function (e) {
                        (s = !0), (r = e);
                     },
                     f: function () {
                        try {
                           o || null == i.return || i.return();
                        } finally {
                           if (s) throw r;
                        }
                     },
                  };
               }
               function u(e, t) {
                  (null == t || t > e.length) && (t = e.length);
                  for (var i = 0, a = new Array(t); i < t; i++) a[i] = e[i];
                  return a;
               }
               var f = {
                  keyEvent: function (e, t, i, c, u) {
                     var d = this.inputmask,
                        p = d.opts,
                        h = d.dependencyLib,
                        v = d.maskset,
                        m = this,
                        g = h(m),
                        k = e.key,
                        y = a.caret.call(d, m),
                        b = p.onKeyDown.call(this, e, a.getBuffer.call(d), y, p);
                     if (void 0 !== b) return b;
                     if (
                        k === n.keys.Backspace ||
                        k === n.keys.Delete ||
                        (r.iphone && k === n.keys.BACKSPACE_SAFARI) ||
                        (e.ctrlKey && k === n.keys.x && !("oncut" in m))
                     )
                        e.preventDefault(),
                           o.handleRemove.call(d, m, k, y),
                           (0, s.writeBuffer)(
                              m,
                              a.getBuffer.call(d, !0),
                              v.p,
                              e,
                              m.inputmask._valueGet() !== a.getBuffer.call(d).join("")
                           );
                     else if (k === n.keys.End || k === n.keys.PageDown) {
                        e.preventDefault();
                        var x = a.seekNext.call(d, a.getLastValidPosition.call(d));
                        a.caret.call(d, m, e.shiftKey ? y.begin : x, x, !0);
                     } else
                        (k === n.keys.Home && !e.shiftKey) || k === n.keys.PageUp
                           ? (e.preventDefault(), a.caret.call(d, m, 0, e.shiftKey ? y.begin : 0, !0))
                           : p.undoOnEscape && k === n.keys.Escape && !0 !== e.altKey
                           ? ((0, s.checkVal)(m, !0, !1, d.undoValue.split("")), g.trigger("click"))
                           : k !== n.keys.Insert || e.shiftKey || e.ctrlKey || void 0 !== d.userOptions.insertMode
                           ? !0 === p.tabThrough && k === n.keys.Tab
                              ? !0 === e.shiftKey
                                 ? ((y.end = a.seekPrevious.call(d, y.end, !0)),
                                   !0 === l.getTest.call(d, y.end - 1).match.static && y.end--,
                                   (y.begin = a.seekPrevious.call(d, y.end, !0)),
                                   y.begin >= 0 &&
                                      y.end > 0 &&
                                      (e.preventDefault(), a.caret.call(d, m, y.begin, y.end)))
                                 : ((y.begin = a.seekNext.call(d, y.begin, !0)),
                                   (y.end = a.seekNext.call(d, y.begin, !0)),
                                   y.end < v.maskLength && y.end--,
                                   y.begin <= v.maskLength && (e.preventDefault(), a.caret.call(d, m, y.begin, y.end)))
                              : k == n.keys.Process || k == n.keys.Unidentified
                              ? (d.isComposing = !0)
                              : e.shiftKey ||
                                (p.insertModeVisual &&
                                   !1 === p.insertMode &&
                                   (k === n.keys.ArrowRight
                                      ? setTimeout(function () {
                                           var e = a.caret.call(d, m);
                                           a.caret.call(d, m, e.begin);
                                        }, 0)
                                      : k === n.keys.ArrowLeft &&
                                        setTimeout(function () {
                                           var e = a.translatePosition.call(d, m.inputmask.caretPos.begin);
                                           a.translatePosition.call(d, m.inputmask.caretPos.end);
                                           d.isRTL
                                              ? a.caret.call(d, m, e + (e === v.maskLength ? 0 : 1))
                                              : a.caret.call(d, m, e - (0 === e ? 0 : 1));
                                        }, 0)))
                           : o.isSelection.call(d, y)
                           ? (p.insertMode = !p.insertMode)
                           : ((p.insertMode = !p.insertMode), a.caret.call(d, m, y.begin, y.begin));
                     return (d.ignorable = p.ignorables.includes(k)), f.keypressEvent.call(this, e, t, i, c, u);
                  },
                  keypressEvent: function (e, t, i, r, l) {
                     var c = this.inputmask || this,
                        u = c.opts,
                        f = c.dependencyLib,
                        d = c.maskset,
                        p = c.el,
                        h = f(p),
                        v = e.key;
                     if (!0 === t || (e.ctrlKey && e.altKey) || !(e.ctrlKey || e.metaKey || c.ignorable)) {
                        if (v) {
                           var m,
                              g = t ? { begin: l, end: l } : a.caret.call(c, p);
                           (v = u.substitutes[v] || v), (d.writeOutBuffer = !0);
                           var k = o.isValid.call(c, g, v, r, void 0, void 0, void 0, t);
                           if (
                              (!1 !== k &&
                                 (a.resetMaskSet.call(c, !0),
                                 (m =
                                    void 0 !== k.caret
                                       ? k.caret
                                       : a.seekNext.call(c, k.pos.begin ? k.pos.begin : k.pos)),
                                 (d.p = m)),
                              (m = u.numericInput && void 0 === k.caret ? a.seekPrevious.call(c, m) : m),
                              !1 !== i &&
                                 (setTimeout(function () {
                                    u.onKeyValidation.call(p, v, k);
                                 }, 0),
                                 d.writeOutBuffer && !1 !== k))
                           ) {
                              var y = a.getBuffer.call(c);
                              (0, s.writeBuffer)(p, y, m, e, !0 !== t);
                           }
                           if ((e.preventDefault(), t)) return !1 !== k && (k.forwardPosition = m), k;
                        }
                     } else
                        v === n.keys.Enter &&
                           (c.undoValue !== c._valueGet(!0) &&
                              ((c.undoValue = c._valueGet(!0)),
                              setTimeout(function () {
                                 h.trigger("change");
                              }, 0)),
                           c.isComposing && (h.trigger("input"), (c.isComposing = !1)));
                  },
                  pasteEvent: function (e) {
                     var t,
                        i = this.inputmask,
                        n = i.opts,
                        r = i._valueGet(!0),
                        o = a.caret.call(i, this);
                     i.isRTL &&
                        ((t = o.end),
                        (o.end = a.translatePosition.call(i, o.begin)),
                        (o.begin = a.translatePosition.call(i, t)));
                     var l = r.substr(0, o.begin),
                        u = r.substr(o.end, r.length);
                     if (
                        (l ==
                           (i.isRTL ? a.getBufferTemplate.call(i).slice().reverse() : a.getBufferTemplate.call(i))
                              .slice(0, o.begin)
                              .join("") && (l = ""),
                        u ==
                           (i.isRTL ? a.getBufferTemplate.call(i).slice().reverse() : a.getBufferTemplate.call(i))
                              .slice(o.end)
                              .join("") && (u = ""),
                        window.clipboardData && window.clipboardData.getData)
                     )
                        r = l + window.clipboardData.getData("Text") + u;
                     else {
                        if (!e.clipboardData || !e.clipboardData.getData) return !0;
                        r = l + e.clipboardData.getData("text/plain") + u;
                     }
                     var f = r;
                     if (i.isRTL) {
                        f = f.split("");
                        var d,
                           p = c(a.getBufferTemplate.call(i));
                        try {
                           for (p.s(); !(d = p.n()).done; ) {
                              var h = d.value;
                              f[0] === h && f.shift();
                           }
                        } catch (e) {
                           p.e(e);
                        } finally {
                           p.f();
                        }
                        f = f.join("");
                     }
                     if ("function" == typeof n.onBeforePaste) {
                        if (!1 === (f = n.onBeforePaste.call(i, f, n))) return !1;
                        f || (f = r);
                     }
                     (0, s.checkVal)(this, !0, !1, f.toString().split(""), e), e.preventDefault();
                  },
                  inputFallBackEvent: function (e) {
                     var t = this.inputmask,
                        i = t.opts,
                        o = t.dependencyLib;
                     var c,
                        u = this,
                        d = u.inputmask._valueGet(!0),
                        p = (t.isRTL ? a.getBuffer.call(t).slice().reverse() : a.getBuffer.call(t)).join(""),
                        h = a.caret.call(t, u, void 0, void 0, !0);
                     if (p !== d && (void 0 === e.inputType || "insertCompositionText" !== e.inputType)) {
                        switch (
                           ((d = (function (e, i, n) {
                              if (r.iemobile) {
                                 var o = i.replace(a.getBuffer.call(t).join(""), "");
                                 if (1 === o.length) {
                                    var s = i.split("");
                                    s.splice(n.begin, 0, o), (i = s.join(""));
                                 }
                              }
                              return i;
                           })(0, d, h)),
                           (c = (function (e, n, r) {
                              for (
                                 var o,
                                    s,
                                    c,
                                    u = e.substr(0, r.begin).split(""),
                                    f = e.substr(r.begin).split(""),
                                    d = n.substr(0, r.begin).split(""),
                                    p = n.substr(r.begin).split(""),
                                    h = u.length >= d.length ? u.length : d.length,
                                    v = f.length >= p.length ? f.length : p.length,
                                    m = "",
                                    g = [],
                                    k = "~";
                                 u.length < h;

                              )
                                 u.push(k);
                              for (; d.length < h; ) d.push(k);
                              for (; f.length < v; ) f.unshift(k);
                              for (; p.length < v; ) p.unshift(k);
                              var y = u.concat(f),
                                 b = d.concat(p);
                              for (s = 0, o = y.length; s < o; s++)
                                 switch (((c = l.getPlaceholder.call(t, a.translatePosition.call(t, s))), m)) {
                                    case "insertText":
                                       b[s - 1] === y[s] && r.begin == y.length - 1 && g.push(y[s]), (s = o);
                                       break;
                                    case "insertReplacementText":
                                    case "deleteContentBackward":
                                       y[s] === k ? r.end++ : (s = o);
                                       break;
                                    default:
                                       y[s] !== b[s] &&
                                          ((y[s + 1] !== k && y[s + 1] !== c && void 0 !== y[s + 1]) ||
                                          ((b[s] !== c || b[s + 1] !== k) && b[s] !== k)
                                             ? b[s + 1] === k && b[s] === y[s + 1]
                                                ? ((m = "insertText"), g.push(y[s]), r.begin--, r.end--)
                                                : y[s] !== c &&
                                                  y[s] !== k &&
                                                  (y[s + 1] === k || (b[s] !== y[s] && b[s + 1] === y[s + 1]))
                                                ? ((m = "insertReplacementText"), g.push(y[s]), r.begin--)
                                                : y[s] === k
                                                ? ((m = "deleteContentBackward"),
                                                  (a.isMask.call(t, a.translatePosition.call(t, s), !0) ||
                                                     b[s] === i.radixPoint) &&
                                                     r.end++)
                                                : (s = o)
                                             : ((m = "insertText"), g.push(y[s]), r.begin--, r.end--));
                                 }
                              return { action: m, data: g, caret: r };
                           })(d, p, h)),
                           (u.inputmask.shadowRoot || u.ownerDocument).activeElement !== u && u.focus(),
                           (0, s.writeBuffer)(u, a.getBuffer.call(t)),
                           a.caret.call(t, u, h.begin, h.end, !0),
                           c.action)
                        ) {
                           case "insertText":
                           case "insertReplacementText":
                              c.data.forEach(function (e, i) {
                                 var a = new o.Event("keypress");
                                 (a.key = e), (t.ignorable = !1), f.keypressEvent.call(u, a);
                              }),
                                 setTimeout(function () {
                                    t.$el.trigger("keyup");
                                 }, 0);
                              break;
                           case "deleteContentBackward":
                              var v = new o.Event("keydown");
                              (v.key = n.keys.Backspace), f.keyEvent.call(u, v);
                              break;
                           default:
                              (0, s.applyInputValue)(u, d), a.caret.call(t, u, h.begin, h.end, !0);
                        }
                        e.preventDefault();
                     }
                  },
                  setValueEvent: function (e) {
                     var t = this.inputmask,
                        i = this,
                        n = e && e.detail ? e.detail[0] : arguments[1];
                     void 0 === n && (n = i.inputmask._valueGet(!0)),
                        (0, s.applyInputValue)(i, n),
                        ((e.detail && void 0 !== e.detail[1]) || void 0 !== arguments[2]) &&
                           a.caret.call(t, i, e.detail ? e.detail[1] : arguments[2]);
                  },
                  focusEvent: function (e) {
                     var t = this.inputmask,
                        i = t.opts,
                        n = this,
                        r = n.inputmask._valueGet();
                     i.showMaskOnFocus &&
                        r !== a.getBuffer.call(t).join("") &&
                        (0, s.writeBuffer)(n, a.getBuffer.call(t), a.seekNext.call(t, a.getLastValidPosition.call(t))),
                        !0 !== i.positionCaretOnTab ||
                           !1 !== t.mouseEnter ||
                           (o.isComplete.call(t, a.getBuffer.call(t)) && -1 !== a.getLastValidPosition.call(t)) ||
                           f.clickEvent.apply(n, [e, !0]),
                        (t.undoValue = t._valueGet(!0));
                  },
                  invalidEvent: function (e) {
                     this.inputmask.validationEvent = !0;
                  },
                  mouseleaveEvent: function () {
                     var e = this.inputmask,
                        t = e.opts,
                        i = this;
                     (e.mouseEnter = !1),
                        t.clearMaskOnLostFocus &&
                           (i.inputmask.shadowRoot || i.ownerDocument).activeElement !== i &&
                           (0, s.HandleNativePlaceholder)(i, e.originalPlaceholder);
                  },
                  clickEvent: function (e, t) {
                     var i = this.inputmask;
                     i.clicked++;
                     var n = this;
                     if ((n.inputmask.shadowRoot || n.ownerDocument).activeElement === n) {
                        var r = a.determineNewCaretPosition.call(i, a.caret.call(i, n), t);
                        void 0 !== r && a.caret.call(i, n, r);
                     }
                  },
                  cutEvent: function (e) {
                     var t = this.inputmask,
                        i = t.maskset,
                        r = this,
                        l = a.caret.call(t, r),
                        c = t.isRTL
                           ? a.getBuffer.call(t).slice(l.end, l.begin)
                           : a.getBuffer.call(t).slice(l.begin, l.end),
                        u = t.isRTL ? c.reverse().join("") : c.join("");
                     window.navigator.clipboard
                        ? window.navigator.clipboard.writeText(u)
                        : window.clipboardData &&
                          window.clipboardData.getData &&
                          window.clipboardData.setData("Text", u),
                        o.handleRemove.call(t, r, n.keys.Delete, l),
                        (0, s.writeBuffer)(r, a.getBuffer.call(t), i.p, e, t.undoValue !== t._valueGet(!0));
                  },
                  blurEvent: function (e) {
                     var t = this.inputmask,
                        i = t.opts,
                        n = t.dependencyLib;
                     t.clicked = 0;
                     var r = n(this),
                        l = this;
                     if (l.inputmask) {
                        (0, s.HandleNativePlaceholder)(l, t.originalPlaceholder);
                        var c = l.inputmask._valueGet(),
                           u = a.getBuffer.call(t).slice();
                        "" !== c &&
                           (i.clearMaskOnLostFocus &&
                              (-1 === a.getLastValidPosition.call(t) && c === a.getBufferTemplate.call(t).join("")
                                 ? (u = [])
                                 : s.clearOptionalTail.call(t, u)),
                           !1 === o.isComplete.call(t, u) &&
                              (setTimeout(function () {
                                 r.trigger("incomplete");
                              }, 0),
                              i.clearIncomplete &&
                                 (a.resetMaskSet.call(t),
                                 (u = i.clearMaskOnLostFocus ? [] : a.getBufferTemplate.call(t).slice()))),
                           (0, s.writeBuffer)(l, u, void 0, e)),
                           t.undoValue !== t._valueGet(!0) && ((t.undoValue = t._valueGet(!0)), r.trigger("change"));
                     }
                  },
                  mouseenterEvent: function () {
                     var e = this.inputmask,
                        t = e.opts,
                        i = this;
                     if (((e.mouseEnter = !0), (i.inputmask.shadowRoot || i.ownerDocument).activeElement !== i)) {
                        var n = (
                           e.isRTL ? a.getBufferTemplate.call(e).slice().reverse() : a.getBufferTemplate.call(e)
                        ).join("");
                        e.placeholder !== n &&
                           i.placeholder !== e.originalPlaceholder &&
                           (e.originalPlaceholder = i.placeholder),
                           t.showMaskOnHover && (0, s.HandleNativePlaceholder)(i, n);
                     }
                  },
                  submitEvent: function () {
                     var e = this.inputmask,
                        t = e.opts;
                     e.undoValue !== e._valueGet(!0) && e.$el.trigger("change"),
                        -1 === a.getLastValidPosition.call(e) &&
                           e._valueGet &&
                           e._valueGet() === a.getBufferTemplate.call(e).join("") &&
                           e._valueSet(""),
                        t.clearIncomplete && !1 === o.isComplete.call(e, a.getBuffer.call(e)) && e._valueSet(""),
                        t.removeMaskOnSubmit &&
                           (e._valueSet(e.unmaskedvalue(), !0),
                           setTimeout(function () {
                              (0, s.writeBuffer)(e.el, a.getBuffer.call(e));
                           }, 0));
                  },
                  resetEvent: function () {
                     var e = this.inputmask;
                     (e.refreshValue = !0),
                        setTimeout(function () {
                           (0, s.applyInputValue)(e.el, e._valueGet(!0));
                        }, 0);
                  },
               };
               t.EventHandlers = f;
            },
            9716: function (e, t, i) {
               Object.defineProperty(t, "__esModule", { value: !0 }), (t.EventRuler = void 0);
               var a,
                  n = (a = i(2394)) && a.__esModule ? a : { default: a },
                  r = i(2839),
                  o = i(8711),
                  s = i(7760);
               var l = {
                  on: function (e, t, i) {
                     var a = e.inputmask.dependencyLib,
                        l = function (t) {
                           t.originalEvent && ((t = t.originalEvent || t), (arguments[0] = t));
                           var l,
                              c = this,
                              u = c.inputmask,
                              f = u ? u.opts : void 0;
                           if (void 0 === u && "FORM" !== this.nodeName) {
                              var d = a.data(c, "_inputmask_opts");
                              a(c).off(), d && new n.default(d).mask(c);
                           } else {
                              if (
                                 ["submit", "reset", "setvalue"].includes(t.type) ||
                                 "FORM" === this.nodeName ||
                                 !(
                                    c.disabled ||
                                    (c.readOnly &&
                                       !(
                                          ("keydown" === t.type && t.ctrlKey && t.key === r.keys.c) ||
                                          (!1 === f.tabThrough && t.key === r.keys.Tab)
                                       ))
                                 )
                              ) {
                                 switch (t.type) {
                                    case "input":
                                       if (!0 === u.skipInputEvent) return (u.skipInputEvent = !1), t.preventDefault();
                                       break;
                                    case "click":
                                    case "focus":
                                       return u.validationEvent
                                          ? ((u.validationEvent = !1),
                                            e.blur(),
                                            (0, s.HandleNativePlaceholder)(
                                               e,
                                               (u.isRTL
                                                  ? o.getBufferTemplate.call(u).slice().reverse()
                                                  : o.getBufferTemplate.call(u)
                                               ).join("")
                                            ),
                                            setTimeout(function () {
                                               e.focus();
                                            }, f.validationEventTimeOut),
                                            !1)
                                          : ((l = arguments),
                                            void setTimeout(function () {
                                               e.inputmask && i.apply(c, l);
                                            }, 0));
                                 }
                                 var p = i.apply(c, arguments);
                                 return !1 === p && (t.preventDefault(), t.stopPropagation()), p;
                              }
                              t.preventDefault();
                           }
                        };
                     ["submit", "reset"].includes(t)
                        ? ((l = l.bind(e)), null !== e.form && a(e.form).on(t, l))
                        : a(e).on(t, l),
                        (e.inputmask.events[t] = e.inputmask.events[t] || []),
                        e.inputmask.events[t].push(l);
                  },
                  off: function (e, t) {
                     if (e.inputmask && e.inputmask.events) {
                        var i = e.inputmask.dependencyLib,
                           a = e.inputmask.events;
                        for (var n in (t && ((a = [])[t] = e.inputmask.events[t]), a)) {
                           for (var r = a[n]; r.length > 0; ) {
                              var o = r.pop();
                              ["submit", "reset"].includes(n) ? null !== e.form && i(e.form).off(n, o) : i(e).off(n, o);
                           }
                           delete e.inputmask.events[n];
                        }
                     }
                  },
               };
               t.EventRuler = l;
            },
            219: function (e, t, i) {
               var a = d(i(2394)),
                  n = i(2839),
                  r = d(i(7184)),
                  o = i(8711),
                  s = i(4713);
               function l(e) {
                  return (
                     (l =
                        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                           ? function (e) {
                                return typeof e;
                             }
                           : function (e) {
                                return e &&
                                   "function" == typeof Symbol &&
                                   e.constructor === Symbol &&
                                   e !== Symbol.prototype
                                   ? "symbol"
                                   : typeof e;
                             }),
                     l(e)
                  );
               }
               function c(e, t) {
                  return (
                     (function (e) {
                        if (Array.isArray(e)) return e;
                     })(e) ||
                     (function (e, t) {
                        var i =
                           null == e ? null : ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
                        if (null == i) return;
                        var a,
                           n,
                           r = [],
                           o = !0,
                           s = !1;
                        try {
                           for (
                              i = i.call(e);
                              !(o = (a = i.next()).done) && (r.push(a.value), !t || r.length !== t);
                              o = !0
                           );
                        } catch (e) {
                           (s = !0), (n = e);
                        } finally {
                           try {
                              o || null == i.return || i.return();
                           } finally {
                              if (s) throw n;
                           }
                        }
                        return r;
                     })(e, t) ||
                     (function (e, t) {
                        if (!e) return;
                        if ("string" == typeof e) return u(e, t);
                        var i = Object.prototype.toString.call(e).slice(8, -1);
                        "Object" === i && e.constructor && (i = e.constructor.name);
                        if ("Map" === i || "Set" === i) return Array.from(e);
                        if ("Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)) return u(e, t);
                     })(e, t) ||
                     (function () {
                        throw new TypeError(
                           "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                        );
                     })()
                  );
               }
               function u(e, t) {
                  (null == t || t > e.length) && (t = e.length);
                  for (var i = 0, a = new Array(t); i < t; i++) a[i] = e[i];
                  return a;
               }
               function f(e, t) {
                  for (var i = 0; i < t.length; i++) {
                     var a = t[i];
                     (a.enumerable = a.enumerable || !1),
                        (a.configurable = !0),
                        "value" in a && (a.writable = !0),
                        Object.defineProperty(e, a.key, a);
                  }
               }
               function d(e) {
                  return e && e.__esModule ? e : { default: e };
               }
               var p = a.default.dependencyLib,
                  h = (function () {
                     function e(t, i, a) {
                        !(function (e, t) {
                           if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                        })(this, e),
                           (this.mask = t),
                           (this.format = i),
                           (this.opts = a),
                           (this._date = new Date(1, 0, 1)),
                           this.initDateObject(t, this.opts);
                     }
                     var t, i, a;
                     return (
                        (t = e),
                        (i = [
                           {
                              key: "date",
                              get: function () {
                                 return (
                                    void 0 === this._date &&
                                       ((this._date = new Date(1, 0, 1)), this.initDateObject(void 0, this.opts)),
                                    this._date
                                 );
                              },
                           },
                           {
                              key: "initDateObject",
                              value: function (e, t) {
                                 var i;
                                 for (P(t).lastIndex = 0; (i = P(t).exec(this.format)); ) {
                                    var a = new RegExp("\\d+$").exec(i[0]),
                                       n = a ? i[0][0] + "x" : i[0],
                                       r = void 0;
                                    if (void 0 !== e) {
                                       if (a) {
                                          var o = P(t).lastIndex,
                                             s = E(i.index, t);
                                          (P(t).lastIndex = o), (r = e.slice(0, e.indexOf(s.nextMatch[0])));
                                       } else r = e.slice(0, (g[n] && g[n][4]) || n.length);
                                       e = e.slice(r.length);
                                    }
                                    Object.prototype.hasOwnProperty.call(g, n) &&
                                       this.setValue(this, r, n, g[n][2], g[n][1]);
                                 }
                              },
                           },
                           {
                              key: "setValue",
                              value: function (e, t, i, a, n) {
                                 if (
                                    (void 0 !== t &&
                                       ((e[a] = "ampm" === a ? t : t.replace(/[^0-9]/g, "0")),
                                       (e["raw" + a] = t.replace(/\s/g, "_"))),
                                    void 0 !== n)
                                 ) {
                                    var r = e[a];
                                    (("day" === a && 29 === parseInt(r)) || ("month" === a && 2 === parseInt(r))) &&
                                       (29 !== parseInt(e.day) ||
                                          2 !== parseInt(e.month) ||
                                          ("" !== e.year && void 0 !== e.year) ||
                                          e._date.setFullYear(2012, 1, 29)),
                                       "day" === a && ((m = !0), 0 === parseInt(r) && (r = 1)),
                                       "month" === a && (m = !0),
                                       "year" === a && ((m = !0), r.length < 4 && (r = _(r, 4, !0))),
                                       "" === r || isNaN(r) || n.call(e._date, r),
                                       "ampm" === a && n.call(e._date, r);
                                 }
                              },
                           },
                           {
                              key: "reset",
                              value: function () {
                                 this._date = new Date(1, 0, 1);
                              },
                           },
                           {
                              key: "reInit",
                              value: function () {
                                 (this._date = void 0), this.date;
                              },
                           },
                        ]) && f(t.prototype, i),
                        a && f(t, a),
                        Object.defineProperty(t, "prototype", { writable: !1 }),
                        e
                     );
                  })(),
                  v = new Date().getFullYear(),
                  m = !1,
                  g = {
                     d: ["[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", Date.prototype.getDate],
                     dd: [
                        "0[1-9]|[12][0-9]|3[01]",
                        Date.prototype.setDate,
                        "day",
                        function () {
                           return _(Date.prototype.getDate.call(this), 2);
                        },
                     ],
                     ddd: [""],
                     dddd: [""],
                     m: [
                        "[1-9]|1[012]",
                        function (e) {
                           var t = e ? parseInt(e) : 0;
                           return t > 0 && t--, Date.prototype.setMonth.call(this, t);
                        },
                        "month",
                        function () {
                           return Date.prototype.getMonth.call(this) + 1;
                        },
                     ],
                     mm: [
                        "0[1-9]|1[012]",
                        function (e) {
                           var t = e ? parseInt(e) : 0;
                           return t > 0 && t--, Date.prototype.setMonth.call(this, t);
                        },
                        "month",
                        function () {
                           return _(Date.prototype.getMonth.call(this) + 1, 2);
                        },
                     ],
                     mmm: [""],
                     mmmm: [""],
                     yy: [
                        "[0-9]{2}",
                        Date.prototype.setFullYear,
                        "year",
                        function () {
                           return _(Date.prototype.getFullYear.call(this), 2);
                        },
                     ],
                     yyyy: [
                        "[0-9]{4}",
                        Date.prototype.setFullYear,
                        "year",
                        function () {
                           return _(Date.prototype.getFullYear.call(this), 4);
                        },
                     ],
                     h: ["[1-9]|1[0-2]", Date.prototype.setHours, "hours", Date.prototype.getHours],
                     hh: [
                        "0[1-9]|1[0-2]",
                        Date.prototype.setHours,
                        "hours",
                        function () {
                           return _(Date.prototype.getHours.call(this), 2);
                        },
                     ],
                     hx: [
                        function (e) {
                           return "[0-9]{".concat(e, "}");
                        },
                        Date.prototype.setHours,
                        "hours",
                        function (e) {
                           return Date.prototype.getHours;
                        },
                     ],
                     H: ["1?[0-9]|2[0-3]", Date.prototype.setHours, "hours", Date.prototype.getHours],
                     HH: [
                        "0[0-9]|1[0-9]|2[0-3]",
                        Date.prototype.setHours,
                        "hours",
                        function () {
                           return _(Date.prototype.getHours.call(this), 2);
                        },
                     ],
                     Hx: [
                        function (e) {
                           return "[0-9]{".concat(e, "}");
                        },
                        Date.prototype.setHours,
                        "hours",
                        function (e) {
                           return function () {
                              return _(Date.prototype.getHours.call(this), e);
                           };
                        },
                     ],
                     M: ["[1-5]?[0-9]", Date.prototype.setMinutes, "minutes", Date.prototype.getMinutes],
                     MM: [
                        "0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]",
                        Date.prototype.setMinutes,
                        "minutes",
                        function () {
                           return _(Date.prototype.getMinutes.call(this), 2);
                        },
                     ],
                     s: ["[1-5]?[0-9]", Date.prototype.setSeconds, "seconds", Date.prototype.getSeconds],
                     ss: [
                        "0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]",
                        Date.prototype.setSeconds,
                        "seconds",
                        function () {
                           return _(Date.prototype.getSeconds.call(this), 2);
                        },
                     ],
                     l: [
                        "[0-9]{3}",
                        Date.prototype.setMilliseconds,
                        "milliseconds",
                        function () {
                           return _(Date.prototype.getMilliseconds.call(this), 3);
                        },
                        3,
                     ],
                     L: [
                        "[0-9]{2}",
                        Date.prototype.setMilliseconds,
                        "milliseconds",
                        function () {
                           return _(Date.prototype.getMilliseconds.call(this), 2);
                        },
                        2,
                     ],
                     t: ["[ap]", y, "ampm", b, 1],
                     tt: ["[ap]m", y, "ampm", b, 2],
                     T: ["[AP]", y, "ampm", b, 1],
                     TT: ["[AP]M", y, "ampm", b, 2],
                     Z: [
                        ".*",
                        void 0,
                        "Z",
                        function () {
                           var e = this.toString().match(/\((.+)\)/)[1];
                           e.includes(" ") &&
                              (e = (e = e.replace("-", " ").toUpperCase())
                                 .split(" ")
                                 .map(function (e) {
                                    return c(e, 1)[0];
                                 })
                                 .join(""));
                           return e;
                        },
                     ],
                     o: [""],
                     S: [""],
                  },
                  k = {
                     isoDate: "yyyy-mm-dd",
                     isoTime: "HH:MM:ss",
                     isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
                     isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
                  };
               function y(e) {
                  var t = this.getHours();
                  e.toLowerCase().includes("p")
                     ? this.setHours(t + 12)
                     : e.toLowerCase().includes("a") && t >= 12 && this.setHours(t - 12);
               }
               function b() {
                  var e = this.getHours();
                  return (e = e || 12) >= 12 ? "PM" : "AM";
               }
               function x(e) {
                  var t = new RegExp("\\d+$").exec(e[0]);
                  if (t && void 0 !== t[0]) {
                     var i = g[e[0][0] + "x"].slice("");
                     return (i[0] = i[0](t[0])), (i[3] = i[3](t[0])), i;
                  }
                  if (g[e[0]]) return g[e[0]];
               }
               function P(e) {
                  if (!e.tokenizer) {
                     var t = [],
                        i = [];
                     for (var a in g)
                        if (/\.*x$/.test(a)) {
                           var n = a[0] + "\\d+";
                           -1 === i.indexOf(n) && i.push(n);
                        } else -1 === t.indexOf(a[0]) && t.push(a[0]);
                     (e.tokenizer = "(" + (i.length > 0 ? i.join("|") + "|" : "") + t.join("+|") + ")+?|."),
                        (e.tokenizer = new RegExp(e.tokenizer, "g"));
                  }
                  return e.tokenizer;
               }
               function w(e, t, i) {
                  if (!m) return !0;
                  if (
                     void 0 === e.rawday ||
                     (!isFinite(e.rawday) &&
                        new Date(
                           e.date.getFullYear(),
                           isFinite(e.rawmonth) ? e.month : e.date.getMonth() + 1,
                           0
                        ).getDate() >= e.day) ||
                     ("29" == e.day && (!isFinite(e.rawyear) || void 0 === e.rawyear || "" === e.rawyear)) ||
                     new Date(
                        e.date.getFullYear(),
                        isFinite(e.rawmonth) ? e.month : e.date.getMonth() + 1,
                        0
                     ).getDate() >= e.day
                  )
                     return t;
                  if ("29" == e.day) {
                     var a = E(t.pos, i);
                     if ("yyyy" === a.targetMatch[0] && t.pos - a.targetMatchIndex == 2)
                        return (t.remove = t.pos + 1), t;
                  } else if ("02" == e.month && "30" == e.day && void 0 !== t.c)
                     return (
                        (e.day = "03"),
                        e.date.setDate(3),
                        e.date.setMonth(1),
                        (t.insert = [
                           { pos: t.pos, c: "0" },
                           { pos: t.pos + 1, c: t.c },
                        ]),
                        (t.caret = o.seekNext.call(this, t.pos + 1)),
                        t
                     );
                  return !1;
               }
               function S(e, t, i, a) {
                  var n,
                     o,
                     s = "";
                  for (P(i).lastIndex = 0; (n = P(i).exec(e)); ) {
                     if (void 0 === t)
                        if ((o = x(n))) s += "(" + o[0] + ")";
                        else
                           switch (n[0]) {
                              case "[":
                                 s += "(";
                                 break;
                              case "]":
                                 s += ")?";
                                 break;
                              default:
                                 s += (0, r.default)(n[0]);
                           }
                     else if ((o = x(n)))
                        if (!0 !== a && o[3]) s += o[3].call(t.date);
                        else o[2] ? (s += t["raw" + o[2]]) : (s += n[0]);
                     else s += n[0];
                  }
                  return s;
               }
               function _(e, t, i) {
                  for (e = String(e), t = t || 2; e.length < t; ) e = i ? e + "0" : "0" + e;
                  return e;
               }
               function M(e, t, i) {
                  return "string" == typeof e
                     ? new h(e, t, i)
                     : e && "object" === l(e) && Object.prototype.hasOwnProperty.call(e, "date")
                     ? e
                     : void 0;
               }
               function O(e, t) {
                  return S(t.inputFormat, { date: e }, t);
               }
               function E(e, t) {
                  var i,
                     a,
                     n = 0,
                     r = 0;
                  for (P(t).lastIndex = 0; (a = P(t).exec(t.inputFormat)); ) {
                     var o = new RegExp("\\d+$").exec(a[0]);
                     if ((n += r = o ? parseInt(o[0]) : a[0].length) >= e + 1) {
                        (i = a), (a = P(t).exec(t.inputFormat));
                        break;
                     }
                  }
                  return { targetMatchIndex: n - r, nextMatch: a, targetMatch: i };
               }
               a.default.extendAliases({
                  datetime: {
                     mask: function (e) {
                        return (
                           (e.numericInput = !1),
                           (g.S = e.i18n.ordinalSuffix.join("|")),
                           (e.inputFormat = k[e.inputFormat] || e.inputFormat),
                           (e.displayFormat = k[e.displayFormat] || e.displayFormat || e.inputFormat),
                           (e.outputFormat = k[e.outputFormat] || e.outputFormat || e.inputFormat),
                           (e.placeholder = "" !== e.placeholder ? e.placeholder : e.inputFormat.replace(/[[\]]/, "")),
                           (e.regex = S(e.inputFormat, void 0, e)),
                           (e.min = M(e.min, e.inputFormat, e)),
                           (e.max = M(e.max, e.inputFormat, e)),
                           null
                        );
                     },
                     placeholder: "",
                     inputFormat: "isoDateTime",
                     displayFormat: null,
                     outputFormat: null,
                     min: null,
                     max: null,
                     skipOptionalPartCharacter: "",
                     i18n: {
                        dayNames: [
                           "Mon",
                           "Tue",
                           "Wed",
                           "Thu",
                           "Fri",
                           "Sat",
                           "Sun",
                           "Monday",
                           "Tuesday",
                           "Wednesday",
                           "Thursday",
                           "Friday",
                           "Saturday",
                           "Sunday",
                        ],
                        monthNames: [
                           "Jan",
                           "Feb",
                           "Mar",
                           "Apr",
                           "May",
                           "Jun",
                           "Jul",
                           "Aug",
                           "Sep",
                           "Oct",
                           "Nov",
                           "Dec",
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
                        ],
                        ordinalSuffix: ["st", "nd", "rd", "th"],
                     },
                     preValidation: function (e, t, i, a, n, r, o, s) {
                        if (s) return !0;
                        if (isNaN(i) && e[t] !== i) {
                           var l = E(t, n);
                           if (l.nextMatch && l.nextMatch[0] === i && l.targetMatch[0].length > 1) {
                              var c = g[l.targetMatch[0]][0];
                              if (new RegExp(c).test("0" + e[t - 1]))
                                 return (
                                    (e[t] = e[t - 1]),
                                    (e[t - 1] = "0"),
                                    {
                                       fuzzy: !0,
                                       buffer: e,
                                       refreshFromBuffer: { start: t - 1, end: t + 1 },
                                       pos: t + 1,
                                    }
                                 );
                           }
                        }
                        return !0;
                     },
                     postValidation: function (e, t, i, a, n, r, o, l) {
                        var c, u;
                        if (o) return !0;
                        if (
                           !1 === a &&
                           ((((c = E(t + 1, n)).targetMatch &&
                              c.targetMatchIndex === t &&
                              c.targetMatch[0].length > 1 &&
                              void 0 !== g[c.targetMatch[0]]) ||
                              ((c = E(t + 2, n)).targetMatch &&
                                 c.targetMatchIndex === t + 1 &&
                                 c.targetMatch[0].length > 1 &&
                                 void 0 !== g[c.targetMatch[0]])) &&
                              (u = g[c.targetMatch[0]][0]),
                           void 0 !== u &&
                              (void 0 !== r.validPositions[t + 1] && new RegExp(u).test(i + "0")
                                 ? ((e[t] = i), (e[t + 1] = "0"), (a = { pos: t + 2, caret: t }))
                                 : new RegExp(u).test("0" + i) && ((e[t] = "0"), (e[t + 1] = i), (a = { pos: t + 2 }))),
                           !1 === a)
                        )
                           return a;
                        if (
                           (a.fuzzy && ((e = a.buffer), (t = a.pos)),
                           (c = E(t, n)).targetMatch && c.targetMatch[0] && void 0 !== g[c.targetMatch[0]])
                        ) {
                           var f = g[c.targetMatch[0]];
                           u = f[0];
                           var d = e.slice(c.targetMatchIndex, c.targetMatchIndex + c.targetMatch[0].length);
                           if (
                              (!1 === new RegExp(u).test(d.join("")) &&
                                 2 === c.targetMatch[0].length &&
                                 r.validPositions[c.targetMatchIndex] &&
                                 r.validPositions[c.targetMatchIndex + 1] &&
                                 (r.validPositions[c.targetMatchIndex + 1].input = "0"),
                              "year" == f[2])
                           )
                              for (
                                 var p = s.getMaskTemplate.call(this, !1, 1, void 0, !0), h = t + 1;
                                 h < e.length;
                                 h++
                              )
                                 (e[h] = p[h]), delete r.validPositions[h];
                        }
                        var m = a,
                           k = M(e.join(""), n.inputFormat, n);
                        return (
                           m &&
                              !isNaN(k.date.getTime()) &&
                              (n.prefillYear &&
                                 (m = (function (e, t, i) {
                                    if (e.year !== e.rawyear) {
                                       var a = v.toString(),
                                          n = e.rawyear.replace(/[^0-9]/g, ""),
                                          r = a.slice(0, n.length),
                                          o = a.slice(n.length);
                                       if (2 === n.length && n === r) {
                                          var s = new Date(v, e.month - 1, e.day);
                                          e.day == s.getDate() &&
                                             (!i.max || i.max.date.getTime() >= s.getTime()) &&
                                             (e.date.setFullYear(v),
                                             (e.year = a),
                                             (t.insert = [
                                                { pos: t.pos + 1, c: o[0] },
                                                { pos: t.pos + 2, c: o[1] },
                                             ]));
                                       }
                                    }
                                    return t;
                                 })(k, m, n)),
                              (m = (function (e, t, i, a, n) {
                                 if (!t) return t;
                                 if (t && i.min && !isNaN(i.min.date.getTime())) {
                                    var r;
                                    for (e.reset(), P(i).lastIndex = 0; (r = P(i).exec(i.inputFormat)); ) {
                                       var o;
                                       if ((o = x(r)) && o[3]) {
                                          for (
                                             var s = o[1],
                                                l = e[o[2]],
                                                c = i.min[o[2]],
                                                u = i.max ? i.max[o[2]] : c,
                                                f = [],
                                                d = !1,
                                                p = 0;
                                             p < c.length;
                                             p++
                                          )
                                             void 0 !== a.validPositions[p + r.index] || d
                                                ? ((f[p] = l[p]), (d = d || l[p] > c[p]))
                                                : ((f[p] = c[p]),
                                                  "year" === o[2] &&
                                                     l.length - 1 == p &&
                                                     c != u &&
                                                     (f = (parseInt(f.join("")) + 1).toString().split("")),
                                                  "ampm" === o[2] &&
                                                     c != u &&
                                                     i.min.date.getTime() > e.date.getTime() &&
                                                     (f[p] = u[p]));
                                          s.call(e._date, f.join(""));
                                       }
                                    }
                                    (t = i.min.date.getTime() <= e.date.getTime()), e.reInit();
                                 }
                                 return (
                                    t &&
                                       i.max &&
                                       (isNaN(i.max.date.getTime()) || (t = i.max.date.getTime() >= e.date.getTime())),
                                    t
                                 );
                              })(k, (m = w.call(this, k, m, n)), n, r))),
                           void 0 !== t && m && a.pos !== t
                              ? {
                                   buffer: S(n.inputFormat, k, n).split(""),
                                   refreshFromBuffer: { start: t, end: a.pos },
                                   pos: a.caret || a.pos,
                                }
                              : m
                        );
                     },
                     onKeyDown: function (e, t, i, a) {
                        e.ctrlKey &&
                           e.key === n.keys.ArrowRight &&
                           (this.inputmask._valueSet(O(new Date(), a)), p(this).trigger("setvalue"));
                     },
                     onUnMask: function (e, t, i) {
                        return t ? S(i.outputFormat, M(e, i.inputFormat, i), i, !0) : t;
                     },
                     casing: function (e, t, i, a) {
                        return 0 == t.nativeDef.indexOf("[ap]")
                           ? e.toLowerCase()
                           : 0 == t.nativeDef.indexOf("[AP]")
                           ? e.toUpperCase()
                           : e;
                     },
                     onBeforeMask: function (e, t) {
                        return "[object Date]" === Object.prototype.toString.call(e) && (e = O(e, t)), e;
                     },
                     insertMode: !1,
                     insertModeVisual: !1,
                     shiftPositions: !1,
                     keepStatic: !1,
                     inputmode: "numeric",
                     prefillYear: !0,
                  },
               });
            },
            3851: function (e, t, i) {
               var a,
                  n = (a = i(2394)) && a.__esModule ? a : { default: a },
                  r = i(8711),
                  o = i(4713);
               n.default.extendDefinitions({
                  A: { validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]", casing: "upper" },
                  "&": { validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]", casing: "upper" },
                  "#": { validator: "[0-9A-Fa-f]", casing: "upper" },
               });
               var s = new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]");
               function l(e, t, i, a, n) {
                  return (
                     i - 1 > -1 && "." !== t.buffer[i - 1]
                        ? ((e = t.buffer[i - 1] + e),
                          (e = i - 2 > -1 && "." !== t.buffer[i - 2] ? t.buffer[i - 2] + e : "0" + e))
                        : (e = "00" + e),
                     s.test(e)
                  );
               }
               n.default.extendAliases({
                  cssunit: { regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)" },
                  url: { regex: "(https?|ftp)://.*", autoUnmask: !1, keepStatic: !1, tabThrough: !0 },
                  ip: {
                     mask: "i{1,3}.j{1,3}.k{1,3}.l{1,3}",
                     definitions: {
                        i: { validator: l },
                        j: { validator: l },
                        k: { validator: l },
                        l: { validator: l },
                     },
                     onUnMask: function (e, t, i) {
                        return e;
                     },
                     inputmode: "decimal",
                     substitutes: { ",": "." },
                  },
                  email: {
                     mask: function (e) {
                        var t = "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
                           i = t;
                        if (e.separator)
                           for (var a = 0; a < e.quantifier; a++) i += "[".concat(e.separator).concat(t, "]");
                        return i;
                     },
                     greedy: !1,
                     casing: "lower",
                     separator: null,
                     quantifier: 5,
                     skipOptionalPartCharacter: "",
                     onBeforePaste: function (e, t) {
                        return (e = e.toLowerCase()).replace("mailto:", "");
                     },
                     definitions: {
                        "*": {
                           validator:
                              "[0-9\uff11-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5!#$%&'*+/=?^_`{|}~-]",
                        },
                        "-": { validator: "[0-9A-Za-z-]" },
                     },
                     onUnMask: function (e, t, i) {
                        return e;
                     },
                     inputmode: "email",
                  },
                  mac: { mask: "##:##:##:##:##:##" },
                  vin: {
                     mask: "V{13}9{4}",
                     definitions: { V: { validator: "[A-HJ-NPR-Za-hj-npr-z\\d]", casing: "upper" } },
                     clearIncomplete: !0,
                     autoUnmask: !0,
                  },
                  ssn: {
                     mask: "999-99-9999",
                     postValidation: function (e, t, i, a, n, s, l) {
                        var c = o.getMaskTemplate.call(this, !0, r.getLastValidPosition.call(this), !0, !0);
                        return /^(?!219-09-9999|078-05-1120)(?!666|000|9.{2}).{3}-(?!00).{2}-(?!0{4}).{4}$/.test(
                           c.join("")
                        );
                     },
                  },
               });
            },
            207: function (e, t, i) {
               var a = s(i(2394)),
                  n = s(i(7184)),
                  r = i(8711),
                  o = i(2839);
               function s(e) {
                  return e && e.__esModule ? e : { default: e };
               }
               var l = a.default.dependencyLib;
               function c(e, t) {
                  for (var i = "", n = 0; n < e.length; n++)
                     a.default.prototype.definitions[e.charAt(n)] ||
                     t.definitions[e.charAt(n)] ||
                     t.optionalmarker[0] === e.charAt(n) ||
                     t.optionalmarker[1] === e.charAt(n) ||
                     t.quantifiermarker[0] === e.charAt(n) ||
                     t.quantifiermarker[1] === e.charAt(n) ||
                     t.groupmarker[0] === e.charAt(n) ||
                     t.groupmarker[1] === e.charAt(n) ||
                     t.alternatormarker === e.charAt(n)
                        ? (i += "\\" + e.charAt(n))
                        : (i += e.charAt(n));
                  return i;
               }
               function u(e, t, i, a) {
                  if (e.length > 0 && t > 0 && (!i.digitsOptional || a)) {
                     var n = e.indexOf(i.radixPoint),
                        r = !1;
                     i.negationSymbol.back === e[e.length - 1] && ((r = !0), e.length--),
                        -1 === n && (e.push(i.radixPoint), (n = e.length - 1));
                     for (var o = 1; o <= t; o++) isFinite(e[n + o]) || (e[n + o] = "0");
                  }
                  return r && e.push(i.negationSymbol.back), e;
               }
               function f(e, t) {
                  var i = 0;
                  for (var a in ("+" === e && (i = r.seekNext.call(this, t.validPositions.length - 1)), t.tests))
                     if ((a = parseInt(a)) >= i)
                        for (var n = 0, o = t.tests[a].length; n < o; n++)
                           if ((void 0 === t.validPositions[a] || "-" === e) && t.tests[a][n].match.def === e)
                              return a + (void 0 !== t.validPositions[a] && "-" !== e ? 1 : 0);
                  return i;
               }
               function d(e, t) {
                  for (var i = -1, a = 0, n = t.validPositions.length; a < n; a++) {
                     var r = t.validPositions[a];
                     if (r && r.match.def === e) {
                        i = a;
                        break;
                     }
                  }
                  return i;
               }
               function p(e, t, i, a, n) {
                  var r = t.buffer ? t.buffer.indexOf(n.radixPoint) : -1,
                     o = (-1 !== r || (a && n.jitMasking)) && new RegExp(n.definitions[9].validator).test(e);
                  return n._radixDance && -1 !== r && o && null == t.validPositions[r]
                     ? { insert: { pos: r === i ? r + 1 : r, c: n.radixPoint }, pos: i }
                     : o;
               }
               a.default.extendAliases({
                  numeric: {
                     mask: function (e) {
                        (e.repeat = 0),
                           e.groupSeparator === e.radixPoint &&
                              e.digits &&
                              "0" !== e.digits &&
                              ("." === e.radixPoint
                                 ? (e.groupSeparator = ",")
                                 : "," === e.radixPoint
                                 ? (e.groupSeparator = ".")
                                 : (e.groupSeparator = "")),
                           " " === e.groupSeparator && (e.skipOptionalPartCharacter = void 0),
                           e.placeholder.length > 1 && (e.placeholder = e.placeholder.charAt(0)),
                           "radixFocus" === e.positionCaretOnClick &&
                              "" === e.placeholder &&
                              (e.positionCaretOnClick = "lvp");
                        var t = "0",
                           i = e.radixPoint;
                        !0 === e.numericInput && void 0 === e.__financeInput
                           ? ((t = "1"),
                             (e.positionCaretOnClick =
                                "radixFocus" === e.positionCaretOnClick ? "lvp" : e.positionCaretOnClick),
                             (e.digitsOptional = !1),
                             isNaN(e.digits) && (e.digits = 2),
                             (e._radixDance = !1),
                             (i = "," === e.radixPoint ? "?" : "!"),
                             "" !== e.radixPoint &&
                                void 0 === e.definitions[i] &&
                                ((e.definitions[i] = {}),
                                (e.definitions[i].validator = "[" + e.radixPoint + "]"),
                                (e.definitions[i].placeholder = e.radixPoint),
                                (e.definitions[i].static = !0),
                                (e.definitions[i].generated = !0)))
                           : ((e.__financeInput = !1), (e.numericInput = !0));
                        var a,
                           r = "[+]";
                        if (
                           ((r += c(e.prefix, e)),
                           "" !== e.groupSeparator
                              ? (void 0 === e.definitions[e.groupSeparator] &&
                                   ((e.definitions[e.groupSeparator] = {}),
                                   (e.definitions[e.groupSeparator].validator = "[" + e.groupSeparator + "]"),
                                   (e.definitions[e.groupSeparator].placeholder = e.groupSeparator),
                                   (e.definitions[e.groupSeparator].static = !0),
                                   (e.definitions[e.groupSeparator].generated = !0)),
                                (r += e._mask(e)))
                              : (r += "9{+}"),
                           void 0 !== e.digits && 0 !== e.digits)
                        ) {
                           var o = e.digits.toString().split(",");
                           isFinite(o[0]) && o[1] && isFinite(o[1])
                              ? (r += i + t + "{" + e.digits + "}")
                              : (isNaN(e.digits) || parseInt(e.digits) > 0) &&
                                (e.digitsOptional || e.jitMasking
                                   ? ((a = r + i + t + "{0," + e.digits + "}"), (e.keepStatic = !0))
                                   : (r += i + t + "{" + e.digits + "}"));
                        } else e.inputmode = "numeric";
                        return (
                           (r += c(e.suffix, e)),
                           (r += "[-]"),
                           a && (r = [a + c(e.suffix, e) + "[-]", r]),
                           (e.greedy = !1),
                           (function (e) {
                              void 0 === e.parseMinMaxOptions &&
                                 (null !== e.min &&
                                    ((e.min = e.min
                                       .toString()
                                       .replace(new RegExp((0, n.default)(e.groupSeparator), "g"), "")),
                                    "," === e.radixPoint && (e.min = e.min.replace(e.radixPoint, ".")),
                                    (e.min = isFinite(e.min) ? parseFloat(e.min) : NaN),
                                    isNaN(e.min) && (e.min = Number.MIN_VALUE)),
                                 null !== e.max &&
                                    ((e.max = e.max
                                       .toString()
                                       .replace(new RegExp((0, n.default)(e.groupSeparator), "g"), "")),
                                    "," === e.radixPoint && (e.max = e.max.replace(e.radixPoint, ".")),
                                    (e.max = isFinite(e.max) ? parseFloat(e.max) : NaN),
                                    isNaN(e.max) && (e.max = Number.MAX_VALUE)),
                                 (e.parseMinMaxOptions = "done"));
                           })(e),
                           "" !== e.radixPoint &&
                              e.substituteRadixPoint &&
                              (e.substitutes["." == e.radixPoint ? "," : "."] = e.radixPoint),
                           r
                        );
                     },
                     _mask: function (e) {
                        return "(" + e.groupSeparator + "999){+|1}";
                     },
                     digits: "*",
                     digitsOptional: !0,
                     enforceDigitsOnBlur: !1,
                     radixPoint: ".",
                     positionCaretOnClick: "radixFocus",
                     _radixDance: !0,
                     groupSeparator: "",
                     allowMinus: !0,
                     negationSymbol: { front: "-", back: "" },
                     prefix: "",
                     suffix: "",
                     min: null,
                     max: null,
                     SetMaxOnOverflow: !1,
                     step: 1,
                     inputType: "text",
                     unmaskAsNumber: !1,
                     roundingFN: Math.round,
                     inputmode: "decimal",
                     shortcuts: { k: "1000", m: "1000000" },
                     placeholder: "0",
                     greedy: !1,
                     rightAlign: !0,
                     insertMode: !0,
                     autoUnmask: !1,
                     skipOptionalPartCharacter: "",
                     usePrototypeDefinitions: !1,
                     stripLeadingZeroes: !0,
                     substituteRadixPoint: !0,
                     definitions: {
                        0: { validator: p },
                        1: { validator: p, definitionSymbol: "9" },
                        9: { validator: "[0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]", definitionSymbol: "*" },
                        "+": {
                           validator: function (e, t, i, a, n) {
                              return n.allowMinus && ("-" === e || e === n.negationSymbol.front);
                           },
                        },
                        "-": {
                           validator: function (e, t, i, a, n) {
                              return n.allowMinus && e === n.negationSymbol.back;
                           },
                        },
                     },
                     preValidation: function (e, t, i, a, n, r, o, s) {
                        if (!1 !== n.__financeInput && i === n.radixPoint) return !1;
                        var l = e.indexOf(n.radixPoint),
                           c = t;
                        if (
                           ((t = (function (e, t, i, a, n) {
                              return (
                                 n._radixDance &&
                                    n.numericInput &&
                                    t !== n.negationSymbol.back &&
                                    e <= i &&
                                    (i > 0 || t == n.radixPoint) &&
                                    (void 0 === a.validPositions[e - 1] ||
                                       a.validPositions[e - 1].input !== n.negationSymbol.back) &&
                                    (e -= 1),
                                 e
                              );
                           })(t, i, l, r, n)),
                           "-" === i || i === n.negationSymbol.front)
                        ) {
                           if (!0 !== n.allowMinus) return !1;
                           var u = !1,
                              p = d("+", r),
                              h = d("-", r);
                           return (
                              -1 !== p && (u = [p, h]),
                              !1 !== u
                                 ? { remove: u, caret: c - n.negationSymbol.back.length }
                                 : {
                                      insert: [
                                         { pos: f.call(this, "+", r), c: n.negationSymbol.front, fromIsValid: !0 },
                                         { pos: f.call(this, "-", r), c: n.negationSymbol.back, fromIsValid: void 0 },
                                      ],
                                      caret: c + n.negationSymbol.back.length,
                                   }
                           );
                        }
                        if (i === n.groupSeparator) return { caret: c };
                        if (s) return !0;
                        if (
                           -1 !== l &&
                           !0 === n._radixDance &&
                           !1 === a &&
                           i === n.radixPoint &&
                           void 0 !== n.digits &&
                           (isNaN(n.digits) || parseInt(n.digits) > 0) &&
                           l !== t
                        )
                           return { caret: n._radixDance && t === l - 1 ? l + 1 : l };
                        if (!1 === n.__financeInput)
                           if (a) {
                              if (n.digitsOptional) return { rewritePosition: o.end };
                              if (!n.digitsOptional) {
                                 if (o.begin > l && o.end <= l)
                                    return i === n.radixPoint
                                       ? { insert: { pos: l + 1, c: "0", fromIsValid: !0 }, rewritePosition: l }
                                       : { rewritePosition: l + 1 };
                                 if (o.begin < l) return { rewritePosition: o.begin - 1 };
                              }
                           } else if (
                              !n.showMaskOnHover &&
                              !n.showMaskOnFocus &&
                              !n.digitsOptional &&
                              n.digits > 0 &&
                              "" === this.__valueGet.call(this.el)
                           )
                              return { rewritePosition: l };
                        return { rewritePosition: t };
                     },
                     postValidation: function (e, t, i, a, n, r, o) {
                        if (!1 === a) return a;
                        if (o) return !0;
                        if (null !== n.min || null !== n.max) {
                           var s = n.onUnMask(
                              e.slice().reverse().join(""),
                              void 0,
                              l.extend({}, n, { unmaskAsNumber: !0 })
                           );
                           if (null !== n.min && s < n.min && (s.toString().length > n.min.toString().length || s < 0))
                              return !1;
                           if (null !== n.max && s > n.max)
                              return (
                                 !!n.SetMaxOnOverflow && {
                                    refreshFromBuffer: !0,
                                    buffer: u(
                                       n.max.toString().replace(".", n.radixPoint).split(""),
                                       n.digits,
                                       n
                                    ).reverse(),
                                 }
                              );
                        }
                        return a;
                     },
                     onUnMask: function (e, t, i) {
                        if ("" === t && !0 === i.nullable) return t;
                        var a = e.replace(i.prefix, "");
                        return (
                           (a = (a = a.replace(i.suffix, "")).replace(
                              new RegExp((0, n.default)(i.groupSeparator), "g"),
                              ""
                           )),
                           "" !== i.placeholder.charAt(0) &&
                              (a = a.replace(new RegExp(i.placeholder.charAt(0), "g"), "0")),
                           i.unmaskAsNumber
                              ? ("" !== i.radixPoint &&
                                   -1 !== a.indexOf(i.radixPoint) &&
                                   (a = a.replace(n.default.call(this, i.radixPoint), ".")),
                                (a = (a = a.replace(
                                   new RegExp("^" + (0, n.default)(i.negationSymbol.front)),
                                   "-"
                                )).replace(new RegExp((0, n.default)(i.negationSymbol.back) + "$"), "")),
                                Number(a))
                              : a
                        );
                     },
                     isComplete: function (e, t) {
                        var i = (t.numericInput ? e.slice().reverse() : e).join("");
                        return (
                           (i = (i = (i = (i = (i = i.replace(
                              new RegExp("^" + (0, n.default)(t.negationSymbol.front)),
                              "-"
                           )).replace(new RegExp((0, n.default)(t.negationSymbol.back) + "$"), "")).replace(
                              t.prefix,
                              ""
                           )).replace(t.suffix, "")).replace(
                              new RegExp((0, n.default)(t.groupSeparator) + "([0-9]{3})", "g"),
                              "$1"
                           )),
                           "," === t.radixPoint && (i = i.replace((0, n.default)(t.radixPoint), ".")),
                           isFinite(i)
                        );
                     },
                     onBeforeMask: function (e, t) {
                        var i = t.radixPoint || ",";
                        isFinite(t.digits) && (t.digits = parseInt(t.digits)),
                           ("number" != typeof e && "number" !== t.inputType) ||
                              "" === i ||
                              (e = e.toString().replace(".", i));
                        var a = "-" === e.charAt(0) || e.charAt(0) === t.negationSymbol.front,
                           r = e.split(i),
                           o = r[0].replace(/[^\-0-9]/g, ""),
                           s = r.length > 1 ? r[1].replace(/[^0-9]/g, "") : "",
                           l = r.length > 1;
                        e = o + ("" !== s ? i + s : s);
                        var c = 0;
                        if (
                           "" !== i &&
                           ((c = t.digitsOptional ? (t.digits < s.length ? t.digits : s.length) : t.digits),
                           "" !== s || !t.digitsOptional)
                        ) {
                           var f = Math.pow(10, c || 1);
                           (e = e.replace((0, n.default)(i), ".")),
                              isNaN(parseFloat(e)) || (e = (t.roundingFN(parseFloat(e) * f) / f).toFixed(c)),
                              (e = e.toString().replace(".", i));
                        }
                        if (
                           (0 === t.digits && -1 !== e.indexOf(i) && (e = e.substring(0, e.indexOf(i))),
                           null !== t.min || null !== t.max)
                        ) {
                           var d = e.toString().replace(i, ".");
                           null !== t.min && d < t.min
                              ? (e = t.min.toString().replace(".", i))
                              : null !== t.max && d > t.max && (e = t.max.toString().replace(".", i));
                        }
                        return a && "-" !== e.charAt(0) && (e = "-" + e), u(e.toString().split(""), c, t, l).join("");
                     },
                     onBeforeWrite: function (e, t, i, a) {
                        function r(e, t) {
                           if (!1 !== a.__financeInput || t) {
                              var i = e.indexOf(a.radixPoint);
                              -1 !== i && e.splice(i, 1);
                           }
                           if ("" !== a.groupSeparator)
                              for (; -1 !== (i = e.indexOf(a.groupSeparator)); ) e.splice(i, 1);
                           return e;
                        }
                        var o, s;
                        if (
                           a.stripLeadingZeroes &&
                           (s = (function (e, t) {
                              var i = new RegExp(
                                    "(^" +
                                       ("" !== t.negationSymbol.front
                                          ? (0, n.default)(t.negationSymbol.front) + "?"
                                          : "") +
                                       (0, n.default)(t.prefix) +
                                       ")(.*)(" +
                                       (0, n.default)(t.suffix) +
                                       ("" != t.negationSymbol.back
                                          ? (0, n.default)(t.negationSymbol.back) + "?"
                                          : "") +
                                       "$)"
                                 ).exec(e.slice().reverse().join("")),
                                 a = i ? i[2] : "",
                                 r = !1;
                              return (
                                 a &&
                                    ((a = a.split(t.radixPoint.charAt(0))[0]),
                                    (r = new RegExp("^[0" + t.groupSeparator + "]*").exec(a))),
                                 !(!r || !(r[0].length > 1 || (r[0].length > 0 && r[0].length < a.length))) && r
                              );
                           })(t, a))
                        )
                           for (
                              var c =
                                    t.join("").lastIndexOf(s[0].split("").reverse().join("")) -
                                    (s[0] == s.input ? 0 : 1),
                                 f = s[0] == s.input ? 1 : 0,
                                 d = s[0].length - f;
                              d > 0;
                              d--
                           )
                              delete this.maskset.validPositions[c + d], delete t[c + d];
                        if (e)
                           switch (e.type) {
                              case "blur":
                              case "checkval":
                                 if (null !== a.min) {
                                    var p = a.onUnMask(
                                       t.slice().reverse().join(""),
                                       void 0,
                                       l.extend({}, a, { unmaskAsNumber: !0 })
                                    );
                                    if (null !== a.min && p < a.min)
                                       return {
                                          refreshFromBuffer: !0,
                                          buffer: u(
                                             a.min.toString().replace(".", a.radixPoint).split(""),
                                             a.digits,
                                             a
                                          ).reverse(),
                                       };
                                 }
                                 if (t[t.length - 1] === a.negationSymbol.front) {
                                    var h = new RegExp(
                                       "(^" +
                                          ("" != a.negationSymbol.front
                                             ? (0, n.default)(a.negationSymbol.front) + "?"
                                             : "") +
                                          (0, n.default)(a.prefix) +
                                          ")(.*)(" +
                                          (0, n.default)(a.suffix) +
                                          ("" != a.negationSymbol.back
                                             ? (0, n.default)(a.negationSymbol.back) + "?"
                                             : "") +
                                          "$)"
                                    ).exec(r(t.slice(), !0).reverse().join(""));
                                    0 == (h ? h[2] : "") && (o = { refreshFromBuffer: !0, buffer: [0] });
                                 } else if ("" !== a.radixPoint) {
                                    t.indexOf(a.radixPoint) === a.suffix.length &&
                                       (o && o.buffer
                                          ? o.buffer.splice(0, 1 + a.suffix.length)
                                          : (t.splice(0, 1 + a.suffix.length),
                                            (o = { refreshFromBuffer: !0, buffer: r(t) })));
                                 }
                                 if (a.enforceDigitsOnBlur) {
                                    var v = ((o = o || {}) && o.buffer) || t.slice().reverse();
                                    (o.refreshFromBuffer = !0), (o.buffer = u(v, a.digits, a, !0).reverse());
                                 }
                           }
                        return o;
                     },
                     onKeyDown: function (e, t, i, a) {
                        var n,
                           r = l(this);
                        if (3 != e.location) {
                           var s,
                              c = e.key;
                           if ((s = a.shortcuts && a.shortcuts[c]) && s.length > 1)
                              return (
                                 this.inputmask.__valueSet.call(
                                    this,
                                    parseFloat(this.inputmask.unmaskedvalue()) * parseInt(s)
                                 ),
                                 r.trigger("setvalue"),
                                 !1
                              );
                        }
                        if (e.ctrlKey)
                           switch (e.key) {
                              case o.keys.ArrowUp:
                                 return (
                                    this.inputmask.__valueSet.call(
                                       this,
                                       parseFloat(this.inputmask.unmaskedvalue()) + parseInt(a.step)
                                    ),
                                    r.trigger("setvalue"),
                                    !1
                                 );
                              case o.keys.ArrowDown:
                                 return (
                                    this.inputmask.__valueSet.call(
                                       this,
                                       parseFloat(this.inputmask.unmaskedvalue()) - parseInt(a.step)
                                    ),
                                    r.trigger("setvalue"),
                                    !1
                                 );
                           }
                        if (
                           !e.shiftKey &&
                           (e.key === o.keys.Delete ||
                              e.key === o.keys.Backspace ||
                              e.key === o.keys.BACKSPACE_SAFARI) &&
                           i.begin !== t.length
                        ) {
                           if (t[e.key === o.keys.Delete ? i.begin - 1 : i.end] === a.negationSymbol.front)
                              return (
                                 (n = t.slice().reverse()),
                                 "" !== a.negationSymbol.front && n.shift(),
                                 "" !== a.negationSymbol.back && n.pop(),
                                 r.trigger("setvalue", [n.join(""), i.begin]),
                                 !1
                              );
                           if (!0 === a._radixDance) {
                              var f = t.indexOf(a.radixPoint);
                              if (a.digitsOptional) {
                                 if (0 === f)
                                    return (
                                       (n = t.slice().reverse()).pop(),
                                       r.trigger("setvalue", [n.join(""), i.begin >= n.length ? n.length : i.begin]),
                                       !1
                                    );
                              } else if (
                                 -1 !== f &&
                                 (i.begin < f ||
                                    i.end < f ||
                                    (e.key === o.keys.Delete && (i.begin === f || i.begin - 1 === f)))
                              ) {
                                 var d = void 0;
                                 return (
                                    i.begin === i.end &&
                                       (e.key === o.keys.Backspace || e.key === o.keys.BACKSPACE_SAFARI
                                          ? i.begin++
                                          : e.key === o.keys.Delete &&
                                            i.begin - 1 === f &&
                                            ((d = l.extend({}, i)), i.begin--, i.end--)),
                                    (n = t.slice().reverse()).splice(n.length - i.begin, i.begin - i.end + 1),
                                    (n = u(n, a.digits, a).join("")),
                                    d && (i = d),
                                    r.trigger("setvalue", [n, i.begin >= n.length ? f + 1 : i.begin]),
                                    !1
                                 );
                              }
                           }
                        }
                     },
                  },
                  currency: { prefix: "", groupSeparator: ",", alias: "numeric", digits: 2, digitsOptional: !1 },
                  decimal: { alias: "numeric" },
                  integer: { alias: "numeric", inputmode: "numeric", digits: 0 },
                  percentage: { alias: "numeric", min: 0, max: 100, suffix: " %", digits: 0, allowMinus: !1 },
                  indianns: {
                     alias: "numeric",
                     _mask: function (e) {
                        return "(" + e.groupSeparator + "99){*|1}(" + e.groupSeparator + "999){1|1}";
                     },
                     groupSeparator: ",",
                     radixPoint: ".",
                     placeholder: "0",
                     digits: 2,
                     digitsOptional: !1,
                  },
               });
            },
            9380: function (e, t, i) {
               var a;
               Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
               var n = ((a = i(8741)) && a.__esModule ? a : { default: a }).default ? window : {};
               t.default = n;
            },
            7760: function (e, t, i) {
               Object.defineProperty(t, "__esModule", { value: !0 }),
                  (t.HandleNativePlaceholder = function (e, t) {
                     var i = e ? e.inputmask : this;
                     if (s.ie) {
                        if (e.inputmask._valueGet() !== t && (e.placeholder !== t || "" === e.placeholder)) {
                           var a = r.getBuffer.call(i).slice(),
                              n = e.inputmask._valueGet();
                           if (n !== t) {
                              var o = r.getLastValidPosition.call(i);
                              -1 === o && n === r.getBufferTemplate.call(i).join("")
                                 ? (a = [])
                                 : -1 !== o && u.call(i, a),
                                 d(e, a);
                           }
                        }
                     } else
                        e.placeholder !== t &&
                           ((e.placeholder = t), "" === e.placeholder && e.removeAttribute("placeholder"));
                  }),
                  (t.applyInputValue = c),
                  (t.checkVal = f),
                  (t.clearOptionalTail = u),
                  (t.unmaskedvalue = function (e) {
                     var t = e ? e.inputmask : this,
                        i = t.opts,
                        a = t.maskset;
                     if (e) {
                        if (void 0 === e.inputmask) return e.value;
                        e.inputmask && e.inputmask.refreshValue && c(e, e.inputmask._valueGet(!0));
                     }
                     for (var n = [], o = a.validPositions, s = 0, l = o.length; s < l; s++)
                        o[s] &&
                           o[s].match &&
                           (1 != o[s].match.static || (Array.isArray(a.metadata) && !0 !== o[s].generatedInput)) &&
                           n.push(o[s].input);
                     var u = 0 === n.length ? "" : (t.isRTL ? n.reverse() : n).join("");
                     if ("function" == typeof i.onUnMask) {
                        var f = (t.isRTL ? r.getBuffer.call(t).slice().reverse() : r.getBuffer.call(t)).join("");
                        u = i.onUnMask.call(t, f, u, i);
                     }
                     return u;
                  }),
                  (t.writeBuffer = d);
               var a = i(2839),
                  n = i(4713),
                  r = i(8711),
                  o = i(7215),
                  s = i(9845),
                  l = i(6030);
               function c(e, t) {
                  var i = e ? e.inputmask : this,
                     a = i.opts;
                  (e.inputmask.refreshValue = !1),
                     "function" == typeof a.onBeforeMask && (t = a.onBeforeMask.call(i, t, a) || t),
                     f(e, !0, !1, (t = t.toString().split(""))),
                     (i.undoValue = i._valueGet(!0)),
                     (a.clearMaskOnLostFocus || a.clearIncomplete) &&
                        e.inputmask._valueGet() === r.getBufferTemplate.call(i).join("") &&
                        -1 === r.getLastValidPosition.call(i) &&
                        e.inputmask._valueSet("");
               }
               function u(e) {
                  e.length = 0;
                  for (var t, i = n.getMaskTemplate.call(this, !0, 0, !0, void 0, !0); void 0 !== (t = i.shift()); )
                     e.push(t);
                  return e;
               }
               function f(e, t, i, a, s) {
                  var c = e ? e.inputmask : this,
                     u = c.maskset,
                     f = c.opts,
                     p = c.dependencyLib,
                     h = a.slice(),
                     v = "",
                     m = -1,
                     g = void 0,
                     k = f.skipOptionalPartCharacter;
                  (f.skipOptionalPartCharacter = ""),
                     r.resetMaskSet.call(c),
                     (u.tests = {}),
                     (m = f.radixPoint
                        ? r.determineNewCaretPosition.call(
                             c,
                             { begin: 0, end: 0 },
                             !1,
                             !1 === f.__financeInput ? "radixFocus" : void 0
                          ).begin
                        : 0),
                     (u.p = m),
                     (c.caretPos = { begin: m });
                  var y = [],
                     b = c.caretPos;
                  if (
                     (h.forEach(function (e, t) {
                        if (void 0 !== e) {
                           var a = new p.Event("_checkval");
                           (a.key = e), (v += e);
                           var o = r.getLastValidPosition.call(c, void 0, !0);
                           !(function (e, t) {
                              for (
                                 var i = n.getMaskTemplate
                                       .call(c, !0, 0)
                                       .slice(e, r.seekNext.call(c, e, !1, !1))
                                       .join("")
                                       .replace(/'/g, ""),
                                    a = i.indexOf(t);
                                 a > 0 && " " === i[a - 1];

                              )
                                 a--;
                              var o =
                                 0 === a &&
                                 !r.isMask.call(c, e) &&
                                 (n.getTest.call(c, e).match.nativeDef === t.charAt(0) ||
                                    (!0 === n.getTest.call(c, e).match.static &&
                                       n.getTest.call(c, e).match.nativeDef === "'" + t.charAt(0)) ||
                                    (" " === n.getTest.call(c, e).match.nativeDef &&
                                       (n.getTest.call(c, e + 1).match.nativeDef === t.charAt(0) ||
                                          (!0 === n.getTest.call(c, e + 1).match.static &&
                                             n.getTest.call(c, e + 1).match.nativeDef === "'" + t.charAt(0)))));
                              if (!o && a > 0 && !r.isMask.call(c, e, !1, !0)) {
                                 var s = r.seekNext.call(c, e);
                                 c.caretPos.begin < s && (c.caretPos = { begin: s });
                              }
                              return o;
                           })(m, v)
                              ? (g = l.EventHandlers.keypressEvent.call(c, a, !0, !1, i, c.caretPos.begin)) &&
                                ((m = c.caretPos.begin + 1), (v = ""))
                              : (g = l.EventHandlers.keypressEvent.call(c, a, !0, !1, i, o + 1)),
                              g
                                 ? (void 0 !== g.pos &&
                                      u.validPositions[g.pos] &&
                                      !0 === u.validPositions[g.pos].match.static &&
                                      void 0 === u.validPositions[g.pos].alternation &&
                                      (y.push(g.pos), c.isRTL || (g.forwardPosition = g.pos + 1)),
                                   d.call(c, void 0, r.getBuffer.call(c), g.forwardPosition, a, !1),
                                   (c.caretPos = { begin: g.forwardPosition, end: g.forwardPosition }),
                                   (b = c.caretPos))
                                 : void 0 === u.validPositions[t] &&
                                   h[t] === n.getPlaceholder.call(c, t) &&
                                   r.isMask.call(c, t, !0)
                                 ? c.caretPos.begin++
                                 : (c.caretPos = b);
                        }
                     }),
                     y.length > 0)
                  ) {
                     var x,
                        P,
                        w = r.seekNext.call(c, -1, void 0, !1);
                     if (
                        (!o.isComplete.call(c, r.getBuffer.call(c)) && y.length <= w) ||
                        (o.isComplete.call(c, r.getBuffer.call(c)) && y.length > 0 && y.length !== w && 0 === y[0])
                     )
                        for (var S = w; void 0 !== (x = y.shift()); ) {
                           var _ = new p.Event("_checkval");
                           if (
                              (((P = u.validPositions[x]).generatedInput = !0),
                              (_.key = P.input),
                              (g = l.EventHandlers.keypressEvent.call(c, _, !0, !1, i, S)) &&
                                 void 0 !== g.pos &&
                                 g.pos !== x &&
                                 u.validPositions[g.pos] &&
                                 !0 === u.validPositions[g.pos].match.static)
                           )
                              y.push(g.pos);
                           else if (!g) break;
                           S++;
                        }
                  }
                  t &&
                     d.call(
                        c,
                        e,
                        r.getBuffer.call(c),
                        g ? g.forwardPosition : c.caretPos.begin,
                        s || new p.Event("checkval"),
                        s &&
                           (("input" === s.type && c.undoValue !== r.getBuffer.call(c).join("")) || "paste" === s.type)
                     ),
                     (f.skipOptionalPartCharacter = k);
               }
               function d(e, t, i, n, s) {
                  var l = e ? e.inputmask : this,
                     c = l.opts,
                     u = l.dependencyLib;
                  if (n && "function" == typeof c.onBeforeWrite) {
                     var f = c.onBeforeWrite.call(l, n, t, i, c);
                     if (f) {
                        if (f.refreshFromBuffer) {
                           var d = f.refreshFromBuffer;
                           o.refreshFromBuffer.call(l, !0 === d ? d : d.start, d.end, f.buffer || t),
                              (t = r.getBuffer.call(l, !0));
                        }
                        void 0 !== i && (i = void 0 !== f.caret ? f.caret : i);
                     }
                  }
                  if (
                     void 0 !== e &&
                     (e.inputmask._valueSet(t.join("")),
                     void 0 === i ||
                        (void 0 !== n && "blur" === n.type) ||
                        r.caret.call(
                           l,
                           e,
                           i,
                           void 0,
                           void 0,
                           void 0 !== n &&
                              "keydown" === n.type &&
                              (n.key === a.keys.Delete || n.key === a.keys.Backspace)
                        ),
                     !0 === s)
                  ) {
                     var p = u(e),
                        h = e.inputmask._valueGet();
                     (e.inputmask.skipInputEvent = !0),
                        p.trigger("input"),
                        setTimeout(function () {
                           h === r.getBufferTemplate.call(l).join("")
                              ? p.trigger("cleared")
                              : !0 === o.isComplete.call(l, t) && p.trigger("complete");
                        }, 0);
                  }
               }
            },
            2394: function (e, t, i) {
               Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0), i(7149), i(3194);
               var a = i(157),
                  n = m(i(4963)),
                  r = m(i(9380)),
                  o = i(2391),
                  s = i(4713),
                  l = i(8711),
                  c = i(7215),
                  u = i(7760),
                  f = i(9716),
                  d = m(i(7392)),
                  p = m(i(3976)),
                  h = m(i(8741));
               function v(e) {
                  return (
                     (v =
                        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                           ? function (e) {
                                return typeof e;
                             }
                           : function (e) {
                                return e &&
                                   "function" == typeof Symbol &&
                                   e.constructor === Symbol &&
                                   e !== Symbol.prototype
                                   ? "symbol"
                                   : typeof e;
                             }),
                     v(e)
                  );
               }
               function m(e) {
                  return e && e.__esModule ? e : { default: e };
               }
               var g = r.default.document,
                  k = "_inputmask_opts";
               function y(e, t, i) {
                  if (h.default) {
                     if (!(this instanceof y)) return new y(e, t, i);
                     (this.dependencyLib = n.default),
                        (this.el = void 0),
                        (this.events = {}),
                        (this.maskset = void 0),
                        !0 !== i &&
                           ("[object Object]" === Object.prototype.toString.call(e)
                              ? (t = e)
                              : ((t = t || {}), e && (t.alias = e)),
                           (this.opts = n.default.extend(!0, {}, this.defaults, t)),
                           (this.noMasksCache = t && void 0 !== t.definitions),
                           (this.userOptions = t || {}),
                           b(this.opts.alias, t, this.opts)),
                        (this.refreshValue = !1),
                        (this.undoValue = void 0),
                        (this.$el = void 0),
                        (this.skipInputEvent = !1),
                        (this.validationEvent = !1),
                        (this.ignorable = !1),
                        this.maxLength,
                        (this.mouseEnter = !1),
                        (this.clicked = 0),
                        (this.originalPlaceholder = void 0),
                        (this.isComposing = !1);
                  }
               }
               function b(e, t, i) {
                  var a = y.prototype.aliases[e];
                  return a
                     ? (a.alias && b(a.alias, void 0, i), n.default.extend(!0, i, a), n.default.extend(!0, i, t), !0)
                     : (null === i.mask && (i.mask = e), !1);
               }
               (y.prototype = {
                  dataAttribute: "data-inputmask",
                  defaults: p.default,
                  definitions: d.default,
                  aliases: {},
                  masksCache: {},
                  get isRTL() {
                     return this.opts.isRTL || this.opts.numericInput;
                  },
                  mask: function (e) {
                     var t = this;
                     return (
                        "string" == typeof e && (e = g.getElementById(e) || g.querySelectorAll(e)),
                        (e = e.nodeName ? [e] : Array.isArray(e) ? e : [].slice.call(e)).forEach(function (e, i) {
                           var s = n.default.extend(!0, {}, t.opts);
                           if (
                              (function (e, t, i, a) {
                                 function o(t, n) {
                                    var o = "" === a ? t : a + "-" + t;
                                    null !== (n = void 0 !== n ? n : e.getAttribute(o)) &&
                                       ("string" == typeof n &&
                                          (0 === t.indexOf("on")
                                             ? (n = r.default[n])
                                             : "false" === n
                                             ? (n = !1)
                                             : "true" === n && (n = !0)),
                                       (i[t] = n));
                                 }
                                 if (!0 === t.importDataAttributes) {
                                    var s,
                                       l,
                                       c,
                                       u,
                                       f = e.getAttribute(a);
                                    if (
                                       (f && "" !== f && ((f = f.replace(/'/g, '"')), (l = JSON.parse("{" + f + "}"))),
                                       l)
                                    )
                                       for (u in ((c = void 0), l))
                                          if ("alias" === u.toLowerCase()) {
                                             c = l[u];
                                             break;
                                          }
                                    for (s in (o("alias", c), i.alias && b(i.alias, i, t), t)) {
                                       if (l)
                                          for (u in ((c = void 0), l))
                                             if (u.toLowerCase() === s.toLowerCase()) {
                                                c = l[u];
                                                break;
                                             }
                                       o(s, c);
                                    }
                                 }
                                 n.default.extend(!0, t, i),
                                    ("rtl" === e.dir || t.rightAlign) && (e.style.textAlign = "right");
                                 ("rtl" === e.dir || t.numericInput) &&
                                    ((e.dir = "ltr"), e.removeAttribute("dir"), (t.isRTL = !0));
                                 return Object.keys(i).length;
                              })(e, s, n.default.extend(!0, {}, t.userOptions), t.dataAttribute)
                           ) {
                              var l = (0, o.generateMaskSet)(s, t.noMasksCache);
                              void 0 !== l &&
                                 (void 0 !== e.inputmask && ((e.inputmask.opts.autoUnmask = !0), e.inputmask.remove()),
                                 (e.inputmask = new y(void 0, void 0, !0)),
                                 (e.inputmask.opts = s),
                                 (e.inputmask.noMasksCache = t.noMasksCache),
                                 (e.inputmask.userOptions = n.default.extend(!0, {}, t.userOptions)),
                                 (e.inputmask.el = e),
                                 (e.inputmask.$el = (0, n.default)(e)),
                                 (e.inputmask.maskset = l),
                                 n.default.data(e, k, t.userOptions),
                                 a.mask.call(e.inputmask));
                           }
                        }),
                        (e && e[0] && e[0].inputmask) || this
                     );
                  },
                  option: function (e, t) {
                     return "string" == typeof e
                        ? this.opts[e]
                        : "object" === v(e)
                        ? (n.default.extend(this.userOptions, e), this.el && !0 !== t && this.mask(this.el), this)
                        : void 0;
                  },
                  unmaskedvalue: function (e) {
                     if (
                        ((this.maskset = this.maskset || (0, o.generateMaskSet)(this.opts, this.noMasksCache)),
                        void 0 === this.el || void 0 !== e)
                     ) {
                        var t = (
                           ("function" == typeof this.opts.onBeforeMask &&
                              this.opts.onBeforeMask.call(this, e, this.opts)) ||
                           e
                        ).split("");
                        u.checkVal.call(this, void 0, !1, !1, t),
                           "function" == typeof this.opts.onBeforeWrite &&
                              this.opts.onBeforeWrite.call(this, void 0, l.getBuffer.call(this), 0, this.opts);
                     }
                     return u.unmaskedvalue.call(this, this.el);
                  },
                  remove: function () {
                     if (this.el) {
                        n.default.data(this.el, k, null);
                        var e = this.opts.autoUnmask
                           ? (0, u.unmaskedvalue)(this.el)
                           : this._valueGet(this.opts.autoUnmask);
                        e !== l.getBufferTemplate.call(this).join("")
                           ? this._valueSet(e, this.opts.autoUnmask)
                           : this._valueSet(""),
                           f.EventRuler.off(this.el),
                           Object.getOwnPropertyDescriptor && Object.getPrototypeOf
                              ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.el), "value") &&
                                this.__valueGet &&
                                Object.defineProperty(this.el, "value", {
                                   get: this.__valueGet,
                                   set: this.__valueSet,
                                   configurable: !0,
                                })
                              : g.__lookupGetter__ &&
                                this.el.__lookupGetter__("value") &&
                                this.__valueGet &&
                                (this.el.__defineGetter__("value", this.__valueGet),
                                this.el.__defineSetter__("value", this.__valueSet)),
                           (this.el.inputmask = void 0);
                     }
                     return this.el;
                  },
                  getemptymask: function () {
                     return (
                        (this.maskset = this.maskset || (0, o.generateMaskSet)(this.opts, this.noMasksCache)),
                        (this.isRTL ? l.getBufferTemplate.call(this).reverse() : l.getBufferTemplate.call(this)).join(
                           ""
                        )
                     );
                  },
                  hasMaskedValue: function () {
                     return !this.opts.autoUnmask;
                  },
                  isComplete: function () {
                     return (
                        (this.maskset = this.maskset || (0, o.generateMaskSet)(this.opts, this.noMasksCache)),
                        c.isComplete.call(this, l.getBuffer.call(this))
                     );
                  },
                  getmetadata: function () {
                     if (
                        ((this.maskset = this.maskset || (0, o.generateMaskSet)(this.opts, this.noMasksCache)),
                        Array.isArray(this.maskset.metadata))
                     ) {
                        var e = s.getMaskTemplate.call(this, !0, 0, !1).join("");
                        return (
                           this.maskset.metadata.forEach(function (t) {
                              return t.mask !== e || ((e = t), !1);
                           }),
                           e
                        );
                     }
                     return this.maskset.metadata;
                  },
                  isValid: function (e) {
                     if (((this.maskset = this.maskset || (0, o.generateMaskSet)(this.opts, this.noMasksCache)), e)) {
                        var t = (
                           ("function" == typeof this.opts.onBeforeMask &&
                              this.opts.onBeforeMask.call(this, e, this.opts)) ||
                           e
                        ).split("");
                        u.checkVal.call(this, void 0, !0, !1, t);
                     } else
                        e = this.isRTL
                           ? l.getBuffer.call(this).slice().reverse().join("")
                           : l.getBuffer.call(this).join("");
                     for (
                        var i = l.getBuffer.call(this),
                           a = l.determineLastRequiredPosition.call(this),
                           n = i.length - 1;
                        n > a && !l.isMask.call(this, n);
                        n--
                     );
                     return (
                        i.splice(a, n + 1 - a),
                        c.isComplete.call(this, i) &&
                           e ===
                              (this.isRTL
                                 ? l.getBuffer.call(this).slice().reverse().join("")
                                 : l.getBuffer.call(this).join(""))
                     );
                  },
                  format: function (e, t) {
                     this.maskset = this.maskset || (0, o.generateMaskSet)(this.opts, this.noMasksCache);
                     var i = (
                        ("function" == typeof this.opts.onBeforeMask &&
                           this.opts.onBeforeMask.call(this, e, this.opts)) ||
                        e
                     ).split("");
                     u.checkVal.call(this, void 0, !0, !1, i);
                     var a = this.isRTL
                        ? l.getBuffer.call(this).slice().reverse().join("")
                        : l.getBuffer.call(this).join("");
                     return t ? { value: a, metadata: this.getmetadata() } : a;
                  },
                  setValue: function (e) {
                     this.el && (0, n.default)(this.el).trigger("setvalue", [e]);
                  },
                  analyseMask: o.analyseMask,
               }),
                  (y.extendDefaults = function (e) {
                     n.default.extend(!0, y.prototype.defaults, e);
                  }),
                  (y.extendDefinitions = function (e) {
                     n.default.extend(!0, y.prototype.definitions, e);
                  }),
                  (y.extendAliases = function (e) {
                     n.default.extend(!0, y.prototype.aliases, e);
                  }),
                  (y.format = function (e, t, i) {
                     return y(t).format(e, i);
                  }),
                  (y.unmask = function (e, t) {
                     return y(t).unmaskedvalue(e);
                  }),
                  (y.isValid = function (e, t) {
                     return y(t).isValid(e);
                  }),
                  (y.remove = function (e) {
                     "string" == typeof e && (e = g.getElementById(e) || g.querySelectorAll(e)),
                        (e = e.nodeName ? [e] : e).forEach(function (e) {
                           e.inputmask && e.inputmask.remove();
                        });
                  }),
                  (y.setValue = function (e, t) {
                     "string" == typeof e && (e = g.getElementById(e) || g.querySelectorAll(e)),
                        (e = e.nodeName ? [e] : e).forEach(function (e) {
                           e.inputmask ? e.inputmask.setValue(t) : (0, n.default)(e).trigger("setvalue", [t]);
                        });
                  }),
                  (y.dependencyLib = n.default),
                  (r.default.Inputmask = y);
               var x = y;
               t.default = x;
            },
            5296: function (e, t, i) {
               function a(e) {
                  return (
                     (a =
                        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                           ? function (e) {
                                return typeof e;
                             }
                           : function (e) {
                                return e &&
                                   "function" == typeof Symbol &&
                                   e.constructor === Symbol &&
                                   e !== Symbol.prototype
                                   ? "symbol"
                                   : typeof e;
                             }),
                     a(e)
                  );
               }
               var n = h(i(9380)),
                  r = h(i(2394)),
                  o = h(i(8741));
               function s(e, t) {
                  for (var i = 0; i < t.length; i++) {
                     var a = t[i];
                     (a.enumerable = a.enumerable || !1),
                        (a.configurable = !0),
                        "value" in a && (a.writable = !0),
                        Object.defineProperty(e, a.key, a);
                  }
               }
               function l(e, t) {
                  if (t && ("object" === a(t) || "function" == typeof t)) return t;
                  if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                  return (function (e) {
                     if (void 0 === e)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                     return e;
                  })(e);
               }
               function c(e) {
                  var t = "function" == typeof Map ? new Map() : void 0;
                  return (
                     (c = function (e) {
                        if (null === e || ((i = e), -1 === Function.toString.call(i).indexOf("[native code]")))
                           return e;
                        var i;
                        if ("function" != typeof e)
                           throw new TypeError("Super expression must either be null or a function");
                        if (void 0 !== t) {
                           if (t.has(e)) return t.get(e);
                           t.set(e, a);
                        }
                        function a() {
                           return u(e, arguments, p(this).constructor);
                        }
                        return (
                           (a.prototype = Object.create(e.prototype, {
                              constructor: { value: a, enumerable: !1, writable: !0, configurable: !0 },
                           })),
                           d(a, e)
                        );
                     }),
                     c(e)
                  );
               }
               function u(e, t, i) {
                  return (
                     (u = f()
                        ? Reflect.construct
                        : function (e, t, i) {
                             var a = [null];
                             a.push.apply(a, t);
                             var n = new (Function.bind.apply(e, a))();
                             return i && d(n, i.prototype), n;
                          }),
                     u.apply(null, arguments)
                  );
               }
               function f() {
                  if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                  if (Reflect.construct.sham) return !1;
                  if ("function" == typeof Proxy) return !0;
                  try {
                     return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
                  } catch (e) {
                     return !1;
                  }
               }
               function d(e, t) {
                  return (
                     (d =
                        Object.setPrototypeOf ||
                        function (e, t) {
                           return (e.__proto__ = t), e;
                        }),
                     d(e, t)
                  );
               }
               function p(e) {
                  return (
                     (p = Object.setPrototypeOf
                        ? Object.getPrototypeOf
                        : function (e) {
                             return e.__proto__ || Object.getPrototypeOf(e);
                          }),
                     p(e)
                  );
               }
               function h(e) {
                  return e && e.__esModule ? e : { default: e };
               }
               var v = n.default.document;
               if (
                  o.default &&
                  v &&
                  v.head &&
                  v.head.attachShadow &&
                  n.default.customElements &&
                  void 0 === n.default.customElements.get("input-mask")
               ) {
                  var m = (function (e) {
                     !(function (e, t) {
                        if ("function" != typeof t && null !== t)
                           throw new TypeError("Super expression must either be null or a function");
                        (e.prototype = Object.create(t && t.prototype, {
                           constructor: { value: e, writable: !0, configurable: !0 },
                        })),
                           Object.defineProperty(e, "prototype", { writable: !1 }),
                           t && d(e, t);
                     })(u, e);
                     var t,
                        i,
                        a,
                        n,
                        o,
                        c =
                           ((t = u),
                           (i = f()),
                           function () {
                              var e,
                                 a = p(t);
                              if (i) {
                                 var n = p(this).constructor;
                                 e = Reflect.construct(a, arguments, n);
                              } else e = a.apply(this, arguments);
                              return l(this, e);
                           });
                     function u() {
                        var e;
                        !(function (e, t) {
                           if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                        })(this, u);
                        var t = (e = c.call(this)).getAttributeNames(),
                           i = e.attachShadow({ mode: "closed" }),
                           a = v.createElement("input");
                        for (var n in ((a.type = "text"), i.appendChild(a), t))
                           Object.prototype.hasOwnProperty.call(t, n) && a.setAttribute(t[n], e.getAttribute(t[n]));
                        var o = new r.default();
                        return (o.dataAttribute = ""), o.mask(a), (a.inputmask.shadowRoot = i), e;
                     }
                     return (
                        (a = u),
                        n && s(a.prototype, n),
                        o && s(a, o),
                        Object.defineProperty(a, "prototype", { writable: !1 }),
                        a
                     );
                  })(c(HTMLElement));
                  n.default.customElements.define("input-mask", m);
               }
            },
            2839: function (e, t) {
               function i(e, t) {
                  return (
                     (function (e) {
                        if (Array.isArray(e)) return e;
                     })(e) ||
                     (function (e, t) {
                        var i =
                           null == e ? null : ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
                        if (null == i) return;
                        var a,
                           n,
                           r = [],
                           o = !0,
                           s = !1;
                        try {
                           for (
                              i = i.call(e);
                              !(o = (a = i.next()).done) && (r.push(a.value), !t || r.length !== t);
                              o = !0
                           );
                        } catch (e) {
                           (s = !0), (n = e);
                        } finally {
                           try {
                              o || null == i.return || i.return();
                           } finally {
                              if (s) throw n;
                           }
                        }
                        return r;
                     })(e, t) ||
                     (function (e, t) {
                        if (!e) return;
                        if ("string" == typeof e) return a(e, t);
                        var i = Object.prototype.toString.call(e).slice(8, -1);
                        "Object" === i && e.constructor && (i = e.constructor.name);
                        if ("Map" === i || "Set" === i) return Array.from(e);
                        if ("Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)) return a(e, t);
                     })(e, t) ||
                     (function () {
                        throw new TypeError(
                           "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                        );
                     })()
                  );
               }
               function a(e, t) {
                  (null == t || t > e.length) && (t = e.length);
                  for (var i = 0, a = new Array(t); i < t; i++) a[i] = e[i];
                  return a;
               }
               Object.defineProperty(t, "__esModule", { value: !0 }),
                  (t.keys = t.keyCode = void 0),
                  (t.toKey = function (e, t) {
                     return r[e] || (t ? String.fromCharCode(e) : String.fromCharCode(e).toLowerCase());
                  }),
                  (t.toKeyCode = function (e) {
                     return n[e];
                  });
               var n = {
                  AltGraph: 18,
                  ArrowDown: 40,
                  ArrowLeft: 37,
                  ArrowRight: 39,
                  ArrowUp: 38,
                  Backspace: 8,
                  BACKSPACE_SAFARI: 127,
                  CapsLock: 20,
                  Delete: 46,
                  End: 35,
                  Enter: 13,
                  Escape: 27,
                  Home: 36,
                  Insert: 45,
                  PageDown: 34,
                  PageUp: 33,
                  Space: 32,
                  Tab: 9,
                  c: 67,
                  x: 88,
                  z: 90,
                  Shift: 16,
                  Control: 17,
                  Alt: 18,
                  Pause: 19,
                  Meta_LEFT: 91,
                  Meta_RIGHT: 92,
                  ContextMenu: 93,
                  Process: 229,
                  Unidentified: 229,
                  F1: 112,
                  F2: 113,
                  F3: 114,
                  F4: 115,
                  F5: 116,
                  F6: 117,
                  F7: 118,
                  F8: 119,
                  F9: 120,
                  F10: 121,
                  F11: 122,
                  F12: 123,
               };
               t.keyCode = n;
               var r = Object.entries(n).reduce(function (e, t) {
                     var a = i(t, 2),
                        n = a[0],
                        r = a[1];
                     return (e[r] = void 0 === e[r] ? n : e[r]), e;
                  }, {}),
                  o = Object.entries(n).reduce(function (e, t) {
                     var a = i(t, 2),
                        n = a[0];
                     a[1];
                     return (e[n] = "Space" === n ? " " : n), e;
                  }, {});
               t.keys = o;
            },
            2391: function (e, t, i) {
               Object.defineProperty(t, "__esModule", { value: !0 }),
                  (t.analyseMask = function (e, t, i) {
                     var a,
                        o,
                        s,
                        l,
                        c,
                        u,
                        f = /(?:[?*+]|\{[0-9+*]+(?:,[0-9+*]*)?(?:\|[0-9+*]*)?\})|[^.?*+^${[]()|\\]+|./g,
                        d =
                           /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
                        p = !1,
                        h = new n.default(),
                        v = [],
                        m = [],
                        g = !1;
                     function k(e, a, n) {
                        n = void 0 !== n ? n : e.matches.length;
                        var o = e.matches[n - 1];
                        if (t) {
                           if (0 === a.indexOf("[") || (p && /\\d|\\s|\\w|\\p/i.test(a)) || "." === a) {
                              var s = i.casing ? "i" : "";
                              /^\\p\{.*}$/i.test(a) && (s += "u"),
                                 e.matches.splice(n++, 0, {
                                    fn: new RegExp(a, s),
                                    static: !1,
                                    optionality: !1,
                                    newBlockMarker: void 0 === o ? "master" : o.def !== a,
                                    casing: null,
                                    def: a,
                                    placeholder: void 0,
                                    nativeDef: a,
                                 });
                           } else
                              p && (a = a[a.length - 1]),
                                 a.split("").forEach(function (t, a) {
                                    (o = e.matches[n - 1]),
                                       e.matches.splice(n++, 0, {
                                          fn: /[a-z]/i.test(i.staticDefinitionSymbol || t)
                                             ? new RegExp(
                                                  "[" + (i.staticDefinitionSymbol || t) + "]",
                                                  i.casing ? "i" : ""
                                               )
                                             : null,
                                          static: !0,
                                          optionality: !1,
                                          newBlockMarker: void 0 === o ? "master" : o.def !== t && !0 !== o.static,
                                          casing: null,
                                          def: i.staticDefinitionSymbol || t,
                                          placeholder: void 0 !== i.staticDefinitionSymbol ? t : void 0,
                                          nativeDef: (p ? "'" : "") + t,
                                       });
                                 });
                           p = !1;
                        } else {
                           var l =
                              (i.definitions && i.definitions[a]) ||
                              (i.usePrototypeDefinitions && r.default.prototype.definitions[a]);
                           l && !p
                              ? e.matches.splice(n++, 0, {
                                   fn: l.validator
                                      ? "string" == typeof l.validator
                                         ? new RegExp(l.validator, i.casing ? "i" : "")
                                         : new (function () {
                                              this.test = l.validator;
                                           })()
                                      : new RegExp("."),
                                   static: l.static || !1,
                                   optionality: l.optional || !1,
                                   defOptionality: l.optional || !1,
                                   newBlockMarker:
                                      void 0 === o || l.optional ? "master" : o.def !== (l.definitionSymbol || a),
                                   casing: l.casing,
                                   def: l.definitionSymbol || a,
                                   placeholder: l.placeholder,
                                   nativeDef: a,
                                   generated: l.generated,
                                })
                              : (e.matches.splice(n++, 0, {
                                   fn: /[a-z]/i.test(i.staticDefinitionSymbol || a)
                                      ? new RegExp("[" + (i.staticDefinitionSymbol || a) + "]", i.casing ? "i" : "")
                                      : null,
                                   static: !0,
                                   optionality: !1,
                                   newBlockMarker: void 0 === o ? "master" : o.def !== a && !0 !== o.static,
                                   casing: null,
                                   def: i.staticDefinitionSymbol || a,
                                   placeholder: void 0 !== i.staticDefinitionSymbol ? a : void 0,
                                   nativeDef: (p ? "'" : "") + a,
                                }),
                                (p = !1));
                        }
                     }
                     function y() {
                        if (v.length > 0) {
                           if ((k((l = v[v.length - 1]), o), l.isAlternator)) {
                              c = v.pop();
                              for (var e = 0; e < c.matches.length; e++)
                                 c.matches[e].isGroup && (c.matches[e].isGroup = !1);
                              v.length > 0 ? (l = v[v.length - 1]).matches.push(c) : h.matches.push(c);
                           }
                        } else k(h, o);
                     }
                     function b(e) {
                        var t = new n.default(!0);
                        return (t.openGroup = !1), (t.matches = e), t;
                     }
                     function x() {
                        if ((((s = v.pop()).openGroup = !1), void 0 !== s))
                           if (v.length > 0) {
                              if (((l = v[v.length - 1]).matches.push(s), l.isAlternator)) {
                                 for (
                                    var e = (c = v.pop()).matches[0].matches ? c.matches[0].matches.length : 1, t = 0;
                                    t < c.matches.length;
                                    t++
                                 )
                                    (c.matches[t].isGroup = !1),
                                       (c.matches[t].alternatorGroup = !1),
                                       null === i.keepStatic &&
                                          e < (c.matches[t].matches ? c.matches[t].matches.length : 1) &&
                                          (i.keepStatic = !0),
                                       (e = c.matches[t].matches ? c.matches[t].matches.length : 1);
                                 v.length > 0 ? (l = v[v.length - 1]).matches.push(c) : h.matches.push(c);
                              }
                           } else h.matches.push(s);
                        else y();
                     }
                     function P(e) {
                        var t = e.pop();
                        return t.isQuantifier && (t = b([e.pop(), t])), t;
                     }
                     t && ((i.optionalmarker[0] = void 0), (i.optionalmarker[1] = void 0));
                     for (; (a = t ? d.exec(e) : f.exec(e)); ) {
                        if (((o = a[0]), t)) {
                           switch (o.charAt(0)) {
                              case "?":
                                 o = "{0,1}";
                                 break;
                              case "+":
                              case "*":
                                 o = "{" + o + "}";
                                 break;
                              case "|":
                                 if (0 === v.length) {
                                    var w = b(h.matches);
                                    (w.openGroup = !0), v.push(w), (h.matches = []), (g = !0);
                                 }
                           }
                           switch (o) {
                              case "\\d":
                                 o = "[0-9]";
                                 break;
                              case "\\p":
                                 (o += d.exec(e)[0]), (o += d.exec(e)[0]);
                           }
                        }
                        if (p) y();
                        else
                           switch (o.charAt(0)) {
                              case "$":
                              case "^":
                                 t || y();
                                 break;
                              case i.escapeChar:
                                 (p = !0), t && y();
                                 break;
                              case i.optionalmarker[1]:
                              case i.groupmarker[1]:
                                 x();
                                 break;
                              case i.optionalmarker[0]:
                                 v.push(new n.default(!1, !0));
                                 break;
                              case i.groupmarker[0]:
                                 v.push(new n.default(!0));
                                 break;
                              case i.quantifiermarker[0]:
                                 var S = new n.default(!1, !1, !0),
                                    _ = (o = o.replace(/[{}?]/g, "")).split("|"),
                                    M = _[0].split(","),
                                    O = isNaN(M[0]) ? M[0] : parseInt(M[0]),
                                    E = 1 === M.length ? O : isNaN(M[1]) ? M[1] : parseInt(M[1]),
                                    T = isNaN(_[1]) ? _[1] : parseInt(_[1]);
                                 ("*" !== O && "+" !== O) || (O = "*" === E ? 0 : 1),
                                    (S.quantifier = { min: O, max: E, jit: T });
                                 var D = v.length > 0 ? v[v.length - 1].matches : h.matches;
                                 (a = D.pop()).isGroup || (a = b([a])), D.push(a), D.push(S);
                                 break;
                              case i.alternatormarker:
                                 if (v.length > 0) {
                                    var j = (l = v[v.length - 1]).matches[l.matches.length - 1];
                                    u =
                                       l.openGroup &&
                                       (void 0 === j.matches || (!1 === j.isGroup && !1 === j.isAlternator))
                                          ? v.pop()
                                          : P(l.matches);
                                 } else u = P(h.matches);
                                 if (u.isAlternator) v.push(u);
                                 else if (
                                    (u.alternatorGroup
                                       ? ((c = v.pop()), (u.alternatorGroup = !1))
                                       : (c = new n.default(!1, !1, !1, !0)),
                                    c.matches.push(u),
                                    v.push(c),
                                    u.openGroup)
                                 ) {
                                    u.openGroup = !1;
                                    var A = new n.default(!0);
                                    (A.alternatorGroup = !0), v.push(A);
                                 }
                                 break;
                              default:
                                 y();
                           }
                     }
                     g && x();
                     for (; v.length > 0; ) (s = v.pop()), h.matches.push(s);
                     h.matches.length > 0 &&
                        (!(function e(a) {
                           a &&
                              a.matches &&
                              a.matches.forEach(function (n, r) {
                                 var o = a.matches[r + 1];
                                 (void 0 === o || void 0 === o.matches || !1 === o.isQuantifier) &&
                                    n &&
                                    n.isGroup &&
                                    ((n.isGroup = !1),
                                    t || (k(n, i.groupmarker[0], 0), !0 !== n.openGroup && k(n, i.groupmarker[1]))),
                                    e(n);
                              });
                        })(h),
                        m.push(h));
                     (i.numericInput || i.isRTL) &&
                        (function e(t) {
                           for (var a in ((t.matches = t.matches.reverse()), t.matches))
                              if (Object.prototype.hasOwnProperty.call(t.matches, a)) {
                                 var n = parseInt(a);
                                 if (t.matches[a].isQuantifier && t.matches[n + 1] && t.matches[n + 1].isGroup) {
                                    var r = t.matches[a];
                                    t.matches.splice(a, 1), t.matches.splice(n + 1, 0, r);
                                 }
                                 void 0 !== t.matches[a].matches
                                    ? (t.matches[a] = e(t.matches[a]))
                                    : (t.matches[a] =
                                         ((o = t.matches[a]) === i.optionalmarker[0]
                                            ? (o = i.optionalmarker[1])
                                            : o === i.optionalmarker[1]
                                            ? (o = i.optionalmarker[0])
                                            : o === i.groupmarker[0]
                                            ? (o = i.groupmarker[1])
                                            : o === i.groupmarker[1] && (o = i.groupmarker[0]),
                                         o));
                              }
                           var o;
                           return t;
                        })(m[0]);
                     return m;
                  }),
                  (t.generateMaskSet = function (e, t) {
                     var i;
                     function n(e, i, n) {
                        var s,
                           l,
                           c = !1;
                        return (
                           (null !== e && "" !== e) ||
                              ((c = null !== n.regex)
                                 ? (e = (e = n.regex).replace(/^(\^)(.*)(\$)$/, "$2"))
                                 : ((c = !0), (e = ".*"))),
                           1 === e.length && !1 === n.greedy && 0 !== n.repeat && (n.placeholder = ""),
                           (e = (function (e, t) {
                              if (t.repeat > 0 || "*" === t.repeat || "+" === t.repeat) {
                                 var i = "*" === t.repeat ? 0 : "+" === t.repeat ? 1 : t.repeat;
                                 e =
                                    t.groupmarker[0] +
                                    e +
                                    t.groupmarker[1] +
                                    t.quantifiermarker[0] +
                                    i +
                                    "," +
                                    t.repeat +
                                    t.quantifiermarker[1];
                              }
                              if (!0 === t.keepStatic) {
                                 var a = e.match(new RegExp("(.)\\[([^\\]]*)\\]", "g"));
                                 a &&
                                    a.forEach(function (t, i) {
                                       var a = t.split("["),
                                          n = a[0],
                                          r = a[1].replace("]", "");
                                       e = e.replace(
                                          new RegExp(
                                             "".concat((0, o.default)(n), "\\[").concat((0, o.default)(r), "\\]")
                                          ),
                                          n.charAt(0) === r.charAt(0)
                                             ? "(".concat(n, "|").concat(n).concat(r, ")")
                                             : "".concat(n, "[").concat(r, "]")
                                       );
                                    });
                              }
                              return e;
                           })(e, n)),
                           (l = c ? "regex_" + n.regex : n.numericInput ? e.split("").reverse().join("") : e),
                           null !== n.keepStatic && (l = "ks_" + n.keepStatic + l),
                           void 0 === r.default.prototype.masksCache[l] || !0 === t
                              ? ((s = {
                                   mask: e,
                                   maskToken: r.default.prototype.analyseMask(e, c, n),
                                   validPositions: [],
                                   _buffer: void 0,
                                   buffer: void 0,
                                   tests: {},
                                   excludes: {},
                                   metadata: i,
                                   maskLength: void 0,
                                   jitOffset: {},
                                }),
                                !0 !== t &&
                                   ((r.default.prototype.masksCache[l] = s),
                                   (s = a.default.extend(!0, {}, r.default.prototype.masksCache[l]))))
                              : (s = a.default.extend(!0, {}, r.default.prototype.masksCache[l])),
                           s
                        );
                     }
                     "function" == typeof e.mask && (e.mask = e.mask(e));
                     if (Array.isArray(e.mask)) {
                        if (e.mask.length > 1) {
                           null === e.keepStatic && (e.keepStatic = !0);
                           var s = e.groupmarker[0];
                           return (
                              (e.isRTL ? e.mask.reverse() : e.mask).forEach(function (t) {
                                 s.length > 1 && (s += e.alternatormarker),
                                    void 0 !== t.mask && "function" != typeof t.mask ? (s += t.mask) : (s += t);
                              }),
                              n((s += e.groupmarker[1]), e.mask, e)
                           );
                        }
                        e.mask = e.mask.pop();
                     }
                     i =
                        e.mask && void 0 !== e.mask.mask && "function" != typeof e.mask.mask
                           ? n(e.mask.mask, e.mask, e)
                           : n(e.mask, e.mask, e);
                     null === e.keepStatic && (e.keepStatic = !1);
                     return i;
                  });
               var a = s(i(4963)),
                  n = s(i(9695)),
                  r = s(i(2394)),
                  o = s(i(7184));
               function s(e) {
                  return e && e.__esModule ? e : { default: e };
               }
            },
            157: function (e, t, i) {
               Object.defineProperty(t, "__esModule", { value: !0 }),
                  (t.mask = function () {
                     var e = this,
                        t = this.opts,
                        i = this.el,
                        u = this.dependencyLib;
                     o.EventRuler.off(i);
                     var f = (function (t, i) {
                        "textarea" !== t.tagName.toLowerCase() && i.ignorables.push(a.keys.Enter);
                        var s = t.getAttribute("type"),
                           l =
                              ("input" === t.tagName.toLowerCase() && i.supportsInputType.includes(s)) ||
                              t.isContentEditable ||
                              "textarea" === t.tagName.toLowerCase();
                        if (!l)
                           if ("input" === t.tagName.toLowerCase()) {
                              var c = document.createElement("input");
                              c.setAttribute("type", s), (l = "text" === c.type), (c = null);
                           } else l = "partial";
                        return (
                           !1 !== l
                              ? (function (t) {
                                   var a, s;
                                   function l() {
                                      return this.inputmask
                                         ? this.inputmask.opts.autoUnmask
                                            ? this.inputmask.unmaskedvalue()
                                            : -1 !== n.getLastValidPosition.call(e) || !0 !== i.nullable
                                            ? (this.inputmask.shadowRoot || this.ownerDocument).activeElement ===
                                                 this && i.clearMaskOnLostFocus
                                               ? (e.isRTL
                                                    ? r.clearOptionalTail.call(e, n.getBuffer.call(e).slice()).reverse()
                                                    : r.clearOptionalTail.call(e, n.getBuffer.call(e).slice())
                                                 ).join("")
                                               : a.call(this)
                                            : ""
                                         : a.call(this);
                                   }
                                   function c(e) {
                                      s.call(this, e), this.inputmask && (0, r.applyInputValue)(this, e);
                                   }
                                   if (!t.inputmask.__valueGet) {
                                      if (!0 !== i.noValuePatching) {
                                         if (Object.getOwnPropertyDescriptor) {
                                            var f = Object.getPrototypeOf
                                               ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(t), "value")
                                               : void 0;
                                            f && f.get && f.set
                                               ? ((a = f.get),
                                                 (s = f.set),
                                                 Object.defineProperty(t, "value", {
                                                    get: l,
                                                    set: c,
                                                    configurable: !0,
                                                 }))
                                               : "input" !== t.tagName.toLowerCase() &&
                                                 ((a = function () {
                                                    return this.textContent;
                                                 }),
                                                 (s = function (e) {
                                                    this.textContent = e;
                                                 }),
                                                 Object.defineProperty(t, "value", {
                                                    get: l,
                                                    set: c,
                                                    configurable: !0,
                                                 }));
                                         } else
                                            document.__lookupGetter__ &&
                                               t.__lookupGetter__("value") &&
                                               ((a = t.__lookupGetter__("value")),
                                               (s = t.__lookupSetter__("value")),
                                               t.__defineGetter__("value", l),
                                               t.__defineSetter__("value", c));
                                         (t.inputmask.__valueGet = a), (t.inputmask.__valueSet = s);
                                      }
                                      (t.inputmask._valueGet = function (t) {
                                         return e.isRTL && !0 !== t
                                            ? a.call(this.el).split("").reverse().join("")
                                            : a.call(this.el);
                                      }),
                                         (t.inputmask._valueSet = function (t, i) {
                                            s.call(
                                               this.el,
                                               null == t ? "" : !0 !== i && e.isRTL ? t.split("").reverse().join("") : t
                                            );
                                         }),
                                         void 0 === a &&
                                            ((a = function () {
                                               return this.value;
                                            }),
                                            (s = function (e) {
                                               this.value = e;
                                            }),
                                            (function (t) {
                                               if (
                                                  u.valHooks &&
                                                  (void 0 === u.valHooks[t] || !0 !== u.valHooks[t].inputmaskpatch)
                                               ) {
                                                  var a =
                                                        u.valHooks[t] && u.valHooks[t].get
                                                           ? u.valHooks[t].get
                                                           : function (e) {
                                                                return e.value;
                                                             },
                                                     o =
                                                        u.valHooks[t] && u.valHooks[t].set
                                                           ? u.valHooks[t].set
                                                           : function (e, t) {
                                                                return (e.value = t), e;
                                                             };
                                                  u.valHooks[t] = {
                                                     get: function (t) {
                                                        if (t.inputmask) {
                                                           if (t.inputmask.opts.autoUnmask)
                                                              return t.inputmask.unmaskedvalue();
                                                           var r = a(t);
                                                           return -1 !==
                                                              n.getLastValidPosition.call(
                                                                 e,
                                                                 void 0,
                                                                 void 0,
                                                                 t.inputmask.maskset.validPositions
                                                              ) || !0 !== i.nullable
                                                              ? r
                                                              : "";
                                                        }
                                                        return a(t);
                                                     },
                                                     set: function (e, t) {
                                                        var i = o(e, t);
                                                        return e.inputmask && (0, r.applyInputValue)(e, t), i;
                                                     },
                                                     inputmaskpatch: !0,
                                                  };
                                               }
                                            })(t.type),
                                            (function (e) {
                                               o.EventRuler.on(e, "mouseenter", function () {
                                                  var e = this,
                                                     t = e.inputmask._valueGet(!0);
                                                  t !=
                                                     (e.inputmask.isRTL
                                                        ? n.getBuffer.call(e.inputmask).slice().reverse()
                                                        : n.getBuffer.call(e.inputmask)
                                                     ).join("") && (0, r.applyInputValue)(e, t);
                                               });
                                            })(t));
                                   }
                                })(t)
                              : (t.inputmask = void 0),
                           l
                        );
                     })(i, t);
                     if (!1 !== f) {
                        (e.originalPlaceholder = i.placeholder),
                           (e.maxLength = void 0 !== i ? i.maxLength : void 0),
                           -1 === e.maxLength && (e.maxLength = void 0),
                           "inputMode" in i &&
                              null === i.getAttribute("inputmode") &&
                              ((i.inputMode = t.inputmode), i.setAttribute("inputmode", t.inputmode)),
                           !0 === f &&
                              ((t.showMaskOnFocus =
                                 t.showMaskOnFocus && -1 === ["cc-number", "cc-exp"].indexOf(i.autocomplete)),
                              s.iphone && ((t.insertModeVisual = !1), i.setAttribute("autocorrect", "off")),
                              o.EventRuler.on(i, "submit", c.EventHandlers.submitEvent),
                              o.EventRuler.on(i, "reset", c.EventHandlers.resetEvent),
                              o.EventRuler.on(i, "blur", c.EventHandlers.blurEvent),
                              o.EventRuler.on(i, "focus", c.EventHandlers.focusEvent),
                              o.EventRuler.on(i, "invalid", c.EventHandlers.invalidEvent),
                              o.EventRuler.on(i, "click", c.EventHandlers.clickEvent),
                              o.EventRuler.on(i, "mouseleave", c.EventHandlers.mouseleaveEvent),
                              o.EventRuler.on(i, "mouseenter", c.EventHandlers.mouseenterEvent),
                              o.EventRuler.on(i, "paste", c.EventHandlers.pasteEvent),
                              o.EventRuler.on(i, "cut", c.EventHandlers.cutEvent),
                              o.EventRuler.on(i, "complete", t.oncomplete),
                              o.EventRuler.on(i, "incomplete", t.onincomplete),
                              o.EventRuler.on(i, "cleared", t.oncleared),
                              !0 !== t.inputEventOnly && o.EventRuler.on(i, "keydown", c.EventHandlers.keyEvent),
                              (s.mobile || t.inputEventOnly) && i.removeAttribute("maxLength"),
                              o.EventRuler.on(i, "input", c.EventHandlers.inputFallBackEvent)),
                           o.EventRuler.on(i, "setvalue", c.EventHandlers.setValueEvent),
                           n.getBufferTemplate.call(e).join(""),
                           (e.undoValue = e._valueGet(!0));
                        var d = (i.inputmask.shadowRoot || i.ownerDocument).activeElement;
                        if ("" !== i.inputmask._valueGet(!0) || !1 === t.clearMaskOnLostFocus || d === i) {
                           (0, r.applyInputValue)(i, i.inputmask._valueGet(!0), t);
                           var p = n.getBuffer.call(e).slice();
                           !1 === l.isComplete.call(e, p) && t.clearIncomplete && n.resetMaskSet.call(e),
                              t.clearMaskOnLostFocus &&
                                 d !== i &&
                                 (-1 === n.getLastValidPosition.call(e) ? (p = []) : r.clearOptionalTail.call(e, p)),
                              (!1 === t.clearMaskOnLostFocus ||
                                 (t.showMaskOnFocus && d === i) ||
                                 "" !== i.inputmask._valueGet(!0)) &&
                                 (0, r.writeBuffer)(i, p),
                              d === i && n.caret.call(e, i, n.seekNext.call(e, n.getLastValidPosition.call(e)));
                        }
                     }
                  });
               var a = i(2839),
                  n = i(8711),
                  r = i(7760),
                  o = i(9716),
                  s = i(9845),
                  l = i(7215),
                  c = i(6030);
            },
            9695: function (e, t) {
               Object.defineProperty(t, "__esModule", { value: !0 }),
                  (t.default = function (e, t, i, a) {
                     (this.matches = []),
                        (this.openGroup = e || !1),
                        (this.alternatorGroup = !1),
                        (this.isGroup = e || !1),
                        (this.isOptional = t || !1),
                        (this.isQuantifier = i || !1),
                        (this.isAlternator = a || !1),
                        (this.quantifier = { min: 1, max: 1 });
                  });
            },
            3194: function () {
               Array.prototype.includes ||
                  Object.defineProperty(Array.prototype, "includes", {
                     value: function (e, t) {
                        if (null == this) throw new TypeError('"this" is null or not defined');
                        var i = Object(this),
                           a = i.length >>> 0;
                        if (0 === a) return !1;
                        for (var n = 0 | t, r = Math.max(n >= 0 ? n : a - Math.abs(n), 0); r < a; ) {
                           if (i[r] === e) return !0;
                           r++;
                        }
                        return !1;
                     },
                  });
            },
            7149: function () {
               function e(t) {
                  return (
                     (e =
                        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                           ? function (e) {
                                return typeof e;
                             }
                           : function (e) {
                                return e &&
                                   "function" == typeof Symbol &&
                                   e.constructor === Symbol &&
                                   e !== Symbol.prototype
                                   ? "symbol"
                                   : typeof e;
                             }),
                     e(t)
                  );
               }
               "function" != typeof Object.getPrototypeOf &&
                  (Object.getPrototypeOf =
                     "object" === e("test".__proto__)
                        ? function (e) {
                             return e.__proto__;
                          }
                        : function (e) {
                             return e.constructor.prototype;
                          });
            },
            8711: function (e, t, i) {
               Object.defineProperty(t, "__esModule", { value: !0 }),
                  (t.caret = function (e, t, i, a, n) {
                     var r,
                        o = this,
                        s = this.opts;
                     if (void 0 === t)
                        return (
                           "selectionStart" in e && "selectionEnd" in e
                              ? ((t = e.selectionStart), (i = e.selectionEnd))
                              : window.getSelection
                              ? ((r = window.getSelection().getRangeAt(0)).commonAncestorContainer.parentNode !== e &&
                                   r.commonAncestorContainer !== e) ||
                                ((t = r.startOffset), (i = r.endOffset))
                              : document.selection &&
                                document.selection.createRange &&
                                ((r = document.selection.createRange()),
                                (t = 0 - r.duplicate().moveStart("character", -e.inputmask._valueGet().length)),
                                (i = t + r.text.length)),
                           { begin: a ? t : c.call(o, t), end: a ? i : c.call(o, i) }
                        );
                     if (
                        (Array.isArray(t) && ((i = o.isRTL ? t[0] : t[1]), (t = o.isRTL ? t[1] : t[0])),
                        void 0 !== t.begin && ((i = o.isRTL ? t.begin : t.end), (t = o.isRTL ? t.end : t.begin)),
                        "number" == typeof t)
                     ) {
                        (t = a ? t : c.call(o, t)), (i = "number" == typeof (i = a ? i : c.call(o, i)) ? i : t);
                        var l =
                           parseInt(
                              ((e.ownerDocument.defaultView || window).getComputedStyle
                                 ? (e.ownerDocument.defaultView || window).getComputedStyle(e, null)
                                 : e.currentStyle
                              ).fontSize
                           ) * i;
                        if (
                           ((e.scrollLeft = l > e.scrollWidth ? l : 0),
                           (e.inputmask.caretPos = { begin: t, end: i }),
                           s.insertModeVisual && !1 === s.insertMode && t === i && (n || i++),
                           e === (e.inputmask.shadowRoot || e.ownerDocument).activeElement)
                        )
                           if ("setSelectionRange" in e) e.setSelectionRange(t, i);
                           else if (window.getSelection) {
                              if (((r = document.createRange()), void 0 === e.firstChild || null === e.firstChild)) {
                                 var u = document.createTextNode("");
                                 e.appendChild(u);
                              }
                              r.setStart(
                                 e.firstChild,
                                 t < e.inputmask._valueGet().length ? t : e.inputmask._valueGet().length
                              ),
                                 r.setEnd(
                                    e.firstChild,
                                    i < e.inputmask._valueGet().length ? i : e.inputmask._valueGet().length
                                 ),
                                 r.collapse(!0);
                              var f = window.getSelection();
                              f.removeAllRanges(), f.addRange(r);
                           } else
                              e.createTextRange &&
                                 ((r = e.createTextRange()).collapse(!0),
                                 r.moveEnd("character", i),
                                 r.moveStart("character", t),
                                 r.select());
                     }
                  }),
                  (t.determineLastRequiredPosition = function (e) {
                     var t,
                        i,
                        r = this,
                        s = this.maskset,
                        l = this.dependencyLib,
                        c = a.getMaskTemplate.call(r, !0, o.call(r), !0, !0),
                        u = c.length,
                        f = o.call(r),
                        d = {},
                        p = s.validPositions[f],
                        h = void 0 !== p ? p.locator.slice() : void 0;
                     for (t = f + 1; t < c.length; t++)
                        (i = a.getTestTemplate.call(r, t, h, t - 1)),
                           (h = i.locator.slice()),
                           (d[t] = l.extend(!0, {}, i));
                     var v = p && void 0 !== p.alternation ? p.locator[p.alternation] : void 0;
                     for (
                        t = u - 1;
                        t > f &&
                        ((i = d[t]).match.optionality ||
                           (i.match.optionalQuantifier && i.match.newBlockMarker) ||
                           (v &&
                              ((v !== d[t].locator[p.alternation] && 1 != i.match.static) ||
                                 (!0 === i.match.static &&
                                    i.locator[p.alternation] &&
                                    n.checkAlternationMatch.call(
                                       r,
                                       i.locator[p.alternation].toString().split(","),
                                       v.toString().split(",")
                                    ) &&
                                    "" !== a.getTests.call(r, t)[0].def)))) &&
                        c[t] === a.getPlaceholder.call(r, t, i.match);
                        t--
                     )
                        u--;
                     return e ? { l: u, def: d[u] ? d[u].match : void 0 } : u;
                  }),
                  (t.determineNewCaretPosition = function (e, t, i) {
                     var n = this,
                        c = this.maskset,
                        u = this.opts;
                     t && (n.isRTL ? (e.end = e.begin) : (e.begin = e.end));
                     if (e.begin === e.end) {
                        switch ((i = i || u.positionCaretOnClick)) {
                           case "none":
                              break;
                           case "select":
                              e = { begin: 0, end: r.call(n).length };
                              break;
                           case "ignore":
                              e.end = e.begin = l.call(n, o.call(n));
                              break;
                           case "radixFocus":
                              if (n.clicked > 1 && 0 == c.validPositions.length) break;
                              if (
                                 (function (e) {
                                    if ("" !== u.radixPoint && 0 !== u.digits) {
                                       var t = c.validPositions;
                                       if (void 0 === t[e] || t[e].input === a.getPlaceholder.call(n, e)) {
                                          if (e < l.call(n, -1)) return !0;
                                          var i = r.call(n).indexOf(u.radixPoint);
                                          if (-1 !== i) {
                                             for (var o = 0, s = t.length; o < s; o++)
                                                if (t[o] && i < o && t[o].input !== a.getPlaceholder.call(n, o))
                                                   return !1;
                                             return !0;
                                          }
                                       }
                                    }
                                    return !1;
                                 })(e.begin)
                              ) {
                                 var f = r.call(n).join("").indexOf(u.radixPoint);
                                 e.end = e.begin = u.numericInput ? l.call(n, f) : f;
                                 break;
                              }
                           default:
                              var d = e.begin,
                                 p = o.call(n, d, !0),
                                 h = l.call(n, -1 !== p || s.call(n, 0) ? p : -1);
                              if (d <= h) e.end = e.begin = s.call(n, d, !1, !0) ? d : l.call(n, d);
                              else {
                                 var v = c.validPositions[p],
                                    m = a.getTestTemplate.call(n, h, v ? v.match.locator : void 0, v),
                                    g = a.getPlaceholder.call(n, h, m.match);
                                 if (
                                    ("" !== g &&
                                       r.call(n)[h] !== g &&
                                       !0 !== m.match.optionalQuantifier &&
                                       !0 !== m.match.newBlockMarker) ||
                                    (!s.call(n, h, u.keepStatic, !0) && m.match.def === g)
                                 ) {
                                    var k = l.call(n, h);
                                    (d >= k || d === h) && (h = k);
                                 }
                                 e.end = e.begin = h;
                              }
                        }
                        return e;
                     }
                  }),
                  (t.getBuffer = r),
                  (t.getBufferTemplate = function () {
                     var e = this.maskset;
                     void 0 === e._buffer &&
                        ((e._buffer = a.getMaskTemplate.call(this, !1, 1)),
                        void 0 === e.buffer && (e.buffer = e._buffer.slice()));
                     return e._buffer;
                  }),
                  (t.getLastValidPosition = o),
                  (t.isMask = s),
                  (t.resetMaskSet = function (e) {
                     var t = this.maskset;
                     (t.buffer = void 0), !0 !== e && ((t.validPositions = []), (t.p = 0));
                  }),
                  (t.seekNext = l),
                  (t.seekPrevious = function (e, t) {
                     var i = this,
                        n = e - 1;
                     if (e <= 0) return 0;
                     for (
                        ;
                        n > 0 &&
                        ((!0 === t &&
                           (!0 !== a.getTest.call(i, n).match.newBlockMarker || !s.call(i, n, void 0, !0))) ||
                           (!0 !== t && !s.call(i, n, void 0, !0)));

                     )
                        n--;
                     return n;
                  }),
                  (t.translatePosition = c);
               var a = i(4713),
                  n = i(7215);
               function r(e) {
                  var t = this.maskset;
                  return (
                     (void 0 !== t.buffer && !0 !== e) ||
                        ((t.buffer = a.getMaskTemplate.call(this, !0, o.call(this), !0)),
                        void 0 === t._buffer && (t._buffer = t.buffer.slice())),
                     t.buffer
                  );
               }
               function o(e, t, i) {
                  var a = this.maskset,
                     n = -1,
                     r = -1,
                     o = i || a.validPositions;
                  void 0 === e && (e = -1);
                  for (var s = 0, l = o.length; s < l; s++)
                     o[s] && (t || !0 !== o[s].generatedInput) && (s <= e && (n = s), s >= e && (r = s));
                  return -1 === n || n == e ? r : -1 == r || e - n < r - e ? n : r;
               }
               function s(e, t, i) {
                  var n = this,
                     r = this.maskset,
                     o = a.getTestTemplate.call(n, e).match;
                  if (("" === o.def && (o = a.getTest.call(n, e).match), !0 !== o.static)) return o.fn;
                  if (!0 === i && void 0 !== r.validPositions[e] && !0 !== r.validPositions[e].generatedInput)
                     return !0;
                  if (!0 !== t && e > -1) {
                     if (i) {
                        var s = a.getTests.call(n, e);
                        return s.length > 1 + ("" === s[s.length - 1].match.def ? 1 : 0);
                     }
                     var l = a.determineTestTemplate.call(n, e, a.getTests.call(n, e)),
                        c = a.getPlaceholder.call(n, e, l.match);
                     return l.match.def !== c;
                  }
                  return !1;
               }
               function l(e, t, i) {
                  var n = this;
                  void 0 === i && (i = !0);
                  for (
                     var r = e + 1;
                     "" !== a.getTest.call(n, r).match.def &&
                     ((!0 === t && (!0 !== a.getTest.call(n, r).match.newBlockMarker || !s.call(n, r, void 0, !0))) ||
                        (!0 !== t && !s.call(n, r, void 0, i)));

                  )
                     r++;
                  return r;
               }
               function c(e) {
                  var t = this.opts,
                     i = this.el;
                  return (
                     !this.isRTL ||
                        "number" != typeof e ||
                        (t.greedy && "" === t.placeholder) ||
                        !i ||
                        ((e = this._valueGet().length - e) < 0 && (e = 0)),
                     e
                  );
               }
            },
            4713: function (e, t, i) {
               Object.defineProperty(t, "__esModule", { value: !0 }),
                  (t.determineTestTemplate = c),
                  (t.getDecisionTaker = o),
                  (t.getMaskTemplate = function (e, t, i, a, n) {
                     var r = this,
                        o = this.opts,
                        u = this.maskset,
                        f = o.greedy;
                     n && o.greedy && ((o.greedy = !1), (r.maskset.tests = {}));
                     t = t || 0;
                     var p,
                        h,
                        v,
                        m,
                        g = [],
                        k = 0;
                     do {
                        if (!0 === e && u.validPositions[k])
                           (v =
                              n &&
                              u.validPositions[k].match.optionality &&
                              void 0 === u.validPositions[k + 1] &&
                              (!0 === u.validPositions[k].generatedInput ||
                                 (u.validPositions[k].input == o.skipOptionalPartCharacter && k > 0))
                                 ? c.call(r, k, d.call(r, k, p, k - 1))
                                 : u.validPositions[k]),
                              (h = v.match),
                              (p = v.locator.slice()),
                              g.push(!0 === i ? v.input : !1 === i ? h.nativeDef : s.call(r, k, h));
                        else {
                           (v = l.call(r, k, p, k - 1)), (h = v.match), (p = v.locator.slice());
                           var y = !0 !== a && (!1 !== o.jitMasking ? o.jitMasking : h.jit);
                           (m =
                              ((m && h.static && h.def !== o.groupSeparator && null === h.fn) ||
                                 (u.validPositions[k - 1] &&
                                    h.static &&
                                    h.def !== o.groupSeparator &&
                                    null === h.fn)) &&
                              u.tests[k] &&
                              1 === u.tests[k].length) ||
                           !1 === y ||
                           void 0 === y ||
                           ("number" == typeof y && isFinite(y) && y > k)
                              ? g.push(!1 === i ? h.nativeDef : s.call(r, g.length, h))
                              : (m = !1);
                        }
                        k++;
                     } while (!0 !== h.static || "" !== h.def || t > k);
                     "" === g[g.length - 1] && g.pop();
                     (!1 === i && void 0 !== u.maskLength) || (u.maskLength = k - 1);
                     return (o.greedy = f), g;
                  }),
                  (t.getPlaceholder = s),
                  (t.getTest = u),
                  (t.getTestTemplate = l),
                  (t.getTests = d),
                  (t.isSubsetOf = f);
               var a,
                  n = (a = i(2394)) && a.__esModule ? a : { default: a };
               function r(e, t) {
                  var i = (null != e.alternation ? e.mloc[o(e)] : e.locator).join("");
                  if ("" !== i) for (; i.length < t; ) i += "0";
                  return i;
               }
               function o(e) {
                  var t = e.locator[e.alternation];
                  return (
                     "string" == typeof t && t.length > 0 && (t = t.split(",")[0]), void 0 !== t ? t.toString() : ""
                  );
               }
               function s(e, t, i) {
                  var a = this.opts,
                     n = this.maskset;
                  if (void 0 !== (t = t || u.call(this, e).match).placeholder || !0 === i)
                     return "function" == typeof t.placeholder ? t.placeholder(a) : t.placeholder;
                  if (!0 === t.static) {
                     if (e > -1 && void 0 === n.validPositions[e]) {
                        var r,
                           o = d.call(this, e),
                           s = [];
                        if (o.length > 1 + ("" === o[o.length - 1].match.def ? 1 : 0))
                           for (var l = 0; l < o.length; l++)
                              if (
                                 "" !== o[l].match.def &&
                                 !0 !== o[l].match.optionality &&
                                 !0 !== o[l].match.optionalQuantifier &&
                                 (!0 === o[l].match.static ||
                                    void 0 === r ||
                                    !1 !== o[l].match.fn.test(r.match.def, n, e, !0, a)) &&
                                 (s.push(o[l]),
                                 !0 === o[l].match.static && (r = o[l]),
                                 s.length > 1 && /[0-9a-bA-Z]/.test(s[0].match.def))
                              )
                                 return a.placeholder.charAt(e % a.placeholder.length);
                     }
                     return t.def;
                  }
                  return a.placeholder.charAt(e % a.placeholder.length);
               }
               function l(e, t, i) {
                  return this.maskset.validPositions[e] || c.call(this, e, d.call(this, e, t ? t.slice() : t, i));
               }
               function c(e, t) {
                  var i = this.opts,
                     a = 0,
                     n = (function (e, t) {
                        var i = 0,
                           a = !1;
                        t.forEach(function (e) {
                           e.match.optionality &&
                              (0 !== i && i !== e.match.optionality && (a = !0),
                              (0 === i || i > e.match.optionality) && (i = e.match.optionality));
                        }),
                           i && (0 == e || 1 == t.length ? (i = 0) : a || (i = 0));
                        return i;
                     })(e, t);
                  e = e > 0 ? e - 1 : 0;
                  var o,
                     s,
                     l,
                     c = r(u.call(this, e));
                  i.greedy && t.length > 1 && "" === t[t.length - 1].match.def && (a = 1);
                  for (var f = 0; f < t.length - a; f++) {
                     var d = t[f];
                     o = r(d, c.length);
                     var p = Math.abs(o - c);
                     (void 0 === s ||
                        ("" !== o && p < s) ||
                        (l &&
                           !i.greedy &&
                           l.match.optionality &&
                           l.match.optionality - n > 0 &&
                           "master" === l.match.newBlockMarker &&
                           (!d.match.optionality || d.match.optionality - n < 1 || !d.match.newBlockMarker)) ||
                        (l && !i.greedy && l.match.optionalQuantifier && !d.match.optionalQuantifier)) &&
                        ((s = p), (l = d));
                  }
                  return l;
               }
               function u(e, t) {
                  var i = this.maskset;
                  return i.validPositions[e] ? i.validPositions[e] : (t || d.call(this, e))[0];
               }
               function f(e, t, i) {
                  function a(e) {
                     for (var t, i = [], a = -1, n = 0, r = e.length; n < r; n++)
                        if ("-" === e.charAt(n))
                           for (t = e.charCodeAt(n + 1); ++a < t; ) i.push(String.fromCharCode(a));
                        else (a = e.charCodeAt(n)), i.push(e.charAt(n));
                     return i.join("");
                  }
                  return (
                     e.match.def === t.match.nativeDef ||
                     (!(
                        !(i.regex || (e.match.fn instanceof RegExp && t.match.fn instanceof RegExp)) ||
                        !0 === e.match.static ||
                        !0 === t.match.static
                     ) &&
                        -1 !==
                           a(t.match.fn.toString().replace(/[[\]/]/g, "")).indexOf(
                              a(e.match.fn.toString().replace(/[[\]/]/g, ""))
                           ))
                  );
               }
               function d(e, t, i) {
                  var a,
                     r,
                     o = this,
                     s = this.dependencyLib,
                     l = this.maskset,
                     u = this.opts,
                     d = this.el,
                     p = l.maskToken,
                     h = t ? i : 0,
                     v = t ? t.slice() : [0],
                     m = [],
                     g = !1,
                     k = t ? t.join("") : "";
                  function y(t, i, r, o) {
                     function s(r, o, c) {
                        function p(e, t) {
                           var i = 0 === t.matches.indexOf(e);
                           return (
                              i ||
                                 t.matches.every(function (a, n) {
                                    return (
                                       !0 === a.isQuantifier
                                          ? (i = p(e, t.matches[n - 1]))
                                          : Object.prototype.hasOwnProperty.call(a, "matches") && (i = p(e, a)),
                                       !i
                                    );
                                 }),
                              i
                           );
                        }
                        function v(e, t, i) {
                           var a, n;
                           if (
                              ((l.tests[e] || l.validPositions[e]) &&
                                 (l.tests[e] || [l.validPositions[e]]).every(function (e, r) {
                                    if (e.mloc[t]) return (a = e), !1;
                                    var o = void 0 !== i ? i : e.alternation,
                                       s = void 0 !== e.locator[o] ? e.locator[o].toString().indexOf(t) : -1;
                                    return (void 0 === n || s < n) && -1 !== s && ((a = e), (n = s)), !0;
                                 }),
                              a)
                           ) {
                              var r = a.locator[a.alternation];
                              return (a.mloc[t] || a.mloc[r] || a.locator).slice(
                                 (void 0 !== i ? i : a.alternation) + 1
                              );
                           }
                           return void 0 !== i ? v(e, t) : void 0;
                        }
                        function x(e, t) {
                           var i = e.alternation,
                              a =
                                 void 0 === t ||
                                 (i === t.alternation && -1 === e.locator[i].toString().indexOf(t.locator[i]));
                           if (!a && i > t.alternation)
                              for (var n = t.alternation; n < i; n++)
                                 if (e.locator[n] !== t.locator[n]) {
                                    (i = n), (a = !0);
                                    break;
                                 }
                           if (a) {
                              e.mloc = e.mloc || {};
                              var r = e.locator[i];
                              if (void 0 !== r) {
                                 if (
                                    ("string" == typeof r && (r = r.split(",")[0]),
                                    void 0 === e.mloc[r] && (e.mloc[r] = e.locator.slice()),
                                    void 0 !== t)
                                 ) {
                                    for (var o in t.mloc)
                                       "string" == typeof o && (o = o.split(",")[0]),
                                          void 0 === e.mloc[o] && (e.mloc[o] = t.mloc[o]);
                                    e.locator[i] = Object.keys(e.mloc).join(",");
                                 }
                                 return !0;
                              }
                              e.alternation = void 0;
                           }
                           return !1;
                        }
                        function P(e, t) {
                           if (e.locator.length !== t.locator.length) return !1;
                           for (var i = e.alternation + 1; i < e.locator.length; i++)
                              if (e.locator[i] !== t.locator[i]) return !1;
                           return !0;
                        }
                        if (h > e + u._maxTestPos)
                           throw (
                              "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " +
                              l.mask
                           );
                        if (h === e && void 0 === r.matches) {
                           if (
                              (m.push({ match: r, locator: o.reverse(), cd: k, mloc: {} }),
                              !r.optionality ||
                                 void 0 !== c ||
                                 !(
                                    (u.definitions &&
                                       u.definitions[r.nativeDef] &&
                                       u.definitions[r.nativeDef].optional) ||
                                    (n.default.prototype.definitions[r.nativeDef] &&
                                       n.default.prototype.definitions[r.nativeDef].optional)
                                 ))
                           )
                              return !0;
                           (g = !0), (h = e);
                        } else if (void 0 !== r.matches) {
                           if (r.isGroup && c !== r) {
                              if ((r = s(t.matches[t.matches.indexOf(r) + 1], o, c))) return !0;
                           } else if (r.isOptional) {
                              var w = r,
                                 S = m.length;
                              if ((r = y(r, i, o, c))) {
                                 if (
                                    (m.forEach(function (e, t) {
                                       t >= S &&
                                          (e.match.optionality = e.match.optionality ? e.match.optionality + 1 : 1);
                                    }),
                                    (a = m[m.length - 1].match),
                                    void 0 !== c || !p(a, w))
                                 )
                                    return !0;
                                 (g = !0), (h = e);
                              }
                           } else if (r.isAlternator) {
                              var _,
                                 M = r,
                                 O = [],
                                 E = m.slice(),
                                 T = o.length,
                                 D = !1,
                                 j = i.length > 0 ? i.shift() : -1;
                              if (-1 === j || "string" == typeof j) {
                                 var A,
                                    B = h,
                                    C = i.slice(),
                                    R = [];
                                 if ("string" == typeof j) R = j.split(",");
                                 else for (A = 0; A < M.matches.length; A++) R.push(A.toString());
                                 if (void 0 !== l.excludes[e]) {
                                    for (var L = R.slice(), F = 0, I = l.excludes[e].length; F < I; F++) {
                                       var V = l.excludes[e][F].toString().split(":");
                                       o.length == V[1] && R.splice(R.indexOf(V[0]), 1);
                                    }
                                    0 === R.length && (delete l.excludes[e], (R = L));
                                 }
                                 (!0 === u.keepStatic || (isFinite(parseInt(u.keepStatic)) && B >= u.keepStatic)) &&
                                    (R = R.slice(0, 1));
                                 for (var N = 0; N < R.length; N++) {
                                    (A = parseInt(R[N])),
                                       (m = []),
                                       (i = ("string" == typeof j && v(h, A, T)) || C.slice());
                                    var G = M.matches[A];
                                    if (G && s(G, [A].concat(o), c)) r = !0;
                                    else if (
                                       (0 === N && (D = !0),
                                       G && G.matches && G.matches.length > M.matches[0].matches.length)
                                    )
                                       break;
                                    (_ = m.slice()), (h = B), (m = []);
                                    for (var H = 0; H < _.length; H++) {
                                       var U = _[H],
                                          K = !1;
                                       (U.match.jit = U.match.jit || D), (U.alternation = U.alternation || T), x(U);
                                       for (var $ = 0; $ < O.length; $++) {
                                          var q = O[$];
                                          if (
                                             "string" != typeof j ||
                                             (void 0 !== U.alternation &&
                                                R.includes(U.locator[U.alternation].toString()))
                                          ) {
                                             if (U.match.nativeDef === q.match.nativeDef) {
                                                (K = !0), x(q, U);
                                                break;
                                             }
                                             if (f(U, q, u)) {
                                                x(U, q) && ((K = !0), O.splice(O.indexOf(q), 0, U));
                                                break;
                                             }
                                             if (f(q, U, u)) {
                                                x(q, U);
                                                break;
                                             }
                                             if (
                                                ((J = q),
                                                !0 === (W = U).match.static &&
                                                   !0 !== J.match.static &&
                                                   J.match.fn.test(W.match.def, l, e, !1, u, !1))
                                             ) {
                                                P(U, q) || void 0 !== d.inputmask.userOptions.keepStatic
                                                   ? x(U, q) && ((K = !0), O.splice(O.indexOf(q), 0, U))
                                                   : (u.keepStatic = !0);
                                                break;
                                             }
                                          }
                                       }
                                       K || O.push(U);
                                    }
                                 }
                                 (m = E.concat(O)), (h = e), (g = m.length > 0), (r = O.length > 0), (i = C.slice());
                              } else r = s(M.matches[j] || t.matches[j], [j].concat(o), c);
                              if (r) return !0;
                           } else if (r.isQuantifier && c !== t.matches[t.matches.indexOf(r) - 1])
                              for (
                                 var z = r, Q = !1, Z = i.length > 0 ? i.shift() : 0;
                                 Z < (isNaN(z.quantifier.max) ? Z + 1 : z.quantifier.max) && h <= e;
                                 Z++
                              ) {
                                 var Y = t.matches[t.matches.indexOf(z) - 1];
                                 if ((r = s(Y, [Z].concat(o), Y))) {
                                    if (
                                       (m.forEach(function (t, i) {
                                          ((a = b(Y, t.match) ? t.match : m[m.length - 1].match).optionalQuantifier =
                                             Z >= z.quantifier.min),
                                             (a.jit = (Z + 1) * (Y.matches.indexOf(a) + 1) > z.quantifier.jit),
                                             a.optionalQuantifier &&
                                                p(a, Y) &&
                                                ((g = !0),
                                                (h = e),
                                                u.greedy &&
                                                   null == l.validPositions[e - 1] &&
                                                   Z > z.quantifier.min &&
                                                   -1 != ["*", "+"].indexOf(z.quantifier.max) &&
                                                   (m.pop(), (k = void 0)),
                                                (Q = !0)),
                                             !Q && a.jit && (l.jitOffset[e] = Y.matches.length - Y.matches.indexOf(a));
                                       }),
                                       Q)
                                    )
                                       break;
                                    return !0;
                                 }
                              }
                           else if ((r = y(r, i, o, c))) return !0;
                        } else h++;
                        var W, J;
                     }
                     for (var c = i.length > 0 ? i.shift() : 0; c < t.matches.length; c++)
                        if (!0 !== t.matches[c].isQuantifier) {
                           var p = s(t.matches[c], [c].concat(r), o);
                           if (p && h === e) return p;
                           if (h > e) break;
                        }
                  }
                  function b(e, t) {
                     var i = -1 != e.matches.indexOf(t);
                     return (
                        i ||
                           e.matches.forEach(function (e, a) {
                              void 0 === e.matches || i || (i = b(e, t));
                           }),
                        i
                     );
                  }
                  if (e > -1) {
                     if (void 0 === t) {
                        for (var x, P = e - 1; void 0 === (x = l.validPositions[P] || l.tests[P]) && P > -1; ) P--;
                        void 0 !== x &&
                           P > -1 &&
                           ((v = (function (e, t) {
                              var i,
                                 a = [];
                              return (
                                 Array.isArray(t) || (t = [t]),
                                 t.length > 0 &&
                                    (void 0 === t[0].alternation || !0 === u.keepStatic
                                       ? 0 === (a = c.call(o, e, t.slice()).locator.slice()).length &&
                                         (a = t[0].locator.slice())
                                       : t.forEach(function (e) {
                                            "" !== e.def &&
                                               (0 === a.length
                                                  ? ((i = e.alternation), (a = e.locator.slice()))
                                                  : e.locator[i] &&
                                                    -1 === a[i].toString().indexOf(e.locator[i]) &&
                                                    (a[i] += "," + e.locator[i]));
                                         })),
                                 a
                              );
                           })(P, x)),
                           (k = v.join("")),
                           (h = P));
                     }
                     if (l.tests[e] && l.tests[e][0].cd === k) return l.tests[e];
                     for (var w = v.shift(); w < p.length; w++) {
                        if ((y(p[w], v, [w]) && h === e) || h > e) break;
                     }
                  }
                  return (
                     (0 === m.length || g) &&
                        m.push({
                           match: { fn: null, static: !0, optionality: !1, casing: null, def: "", placeholder: "" },
                           locator: [],
                           mloc: {},
                           cd: k,
                        }),
                     void 0 !== t && l.tests[e]
                        ? (r = s.extend(!0, [], m))
                        : ((l.tests[e] = s.extend(!0, [], m)), (r = l.tests[e])),
                     m.forEach(function (e) {
                        e.match.optionality = e.match.defOptionality || !1;
                     }),
                     r
                  );
               }
            },
            7215: function (e, t, i) {
               Object.defineProperty(t, "__esModule", { value: !0 }),
                  (t.alternate = s),
                  (t.checkAlternationMatch = function (e, t, i) {
                     for (
                        var a,
                           n = this.opts.greedy ? t : t.slice(0, 1),
                           r = !1,
                           o = void 0 !== i ? i.split(",") : [],
                           s = 0;
                        s < o.length;
                        s++
                     )
                        -1 !== (a = e.indexOf(o[s])) && e.splice(a, 1);
                     for (var l = 0; l < e.length; l++)
                        if (n.includes(e[l])) {
                           r = !0;
                           break;
                        }
                     return r;
                  }),
                  (t.handleRemove = function (e, t, i, o, l) {
                     var c = this,
                        u = this.maskset,
                        f = this.opts;
                     if (
                        (f.numericInput || c.isRTL) &&
                        (t === n.keys.Backspace ? (t = n.keys.Delete) : t === n.keys.Delete && (t = n.keys.Backspace),
                        c.isRTL)
                     ) {
                        var d = i.end;
                        (i.end = i.begin), (i.begin = d);
                     }
                     var p,
                        h = r.getLastValidPosition.call(c, void 0, !0);
                     i.end >= r.getBuffer.call(c).length && h >= i.end && (i.end = h + 1);
                     t === n.keys.Backspace
                        ? i.end - i.begin < 1 && (i.begin = r.seekPrevious.call(c, i.begin))
                        : t === n.keys.Delete &&
                          i.begin === i.end &&
                          (i.end = r.isMask.call(c, i.end, !0, !0) ? i.end + 1 : r.seekNext.call(c, i.end) + 1);
                     if (!1 !== (p = v.call(c, i))) {
                        if (
                           (!0 !== o && !1 !== f.keepStatic) ||
                           (null !== f.regex && -1 !== a.getTest.call(c, i.begin).match.def.indexOf("|"))
                        ) {
                           var m = s.call(c, !0);
                           if (m) {
                              var g =
                                 void 0 !== m.caret
                                    ? m.caret
                                    : m.pos
                                    ? r.seekNext.call(c, m.pos.begin ? m.pos.begin : m.pos)
                                    : r.getLastValidPosition.call(c, -1, !0);
                              (t !== n.keys.Delete || i.begin > g) && i.begin;
                           }
                        }
                        !0 !== o &&
                           ((u.p = t === n.keys.Delete ? i.begin + p : i.begin),
                           (u.p = r.determineNewCaretPosition.call(
                              c,
                              { begin: u.p, end: u.p },
                              !1,
                              !1 === f.insertMode && t === n.keys.Backspace ? "none" : void 0
                           ).begin));
                     }
                  }),
                  (t.isComplete = c),
                  (t.isSelection = u),
                  (t.isValid = f),
                  (t.refreshFromBuffer = p),
                  (t.revalidateMask = v);
               var a = i(4713),
                  n = i(2839),
                  r = i(8711),
                  o = i(6030);
               function s(e, t, i, n, o, l) {
                  var c,
                     u,
                     d,
                     p,
                     h,
                     v,
                     m,
                     g,
                     k,
                     y,
                     b,
                     x = this,
                     P = this.dependencyLib,
                     w = this.opts,
                     S = x.maskset,
                     _ = P.extend(!0, [], S.validPositions),
                     M = P.extend(!0, {}, S.tests),
                     O = !1,
                     E = !1,
                     T = void 0 !== o ? o : r.getLastValidPosition.call(x);
                  if (
                     (l && ((y = l.begin), (b = l.end), l.begin > l.end && ((y = l.end), (b = l.begin))),
                     -1 === T && void 0 === o)
                  )
                     (c = 0), (u = (p = a.getTest.call(x, c)).alternation);
                  else
                     for (; T >= 0; T--)
                        if ((d = S.validPositions[T]) && void 0 !== d.alternation) {
                           if (p && p.locator[d.alternation] !== d.locator[d.alternation]) break;
                           (c = T), (u = S.validPositions[c].alternation), (p = d);
                        }
                  if (void 0 !== u) {
                     (m = parseInt(c)),
                        (S.excludes[m] = S.excludes[m] || []),
                        !0 !== e && S.excludes[m].push((0, a.getDecisionTaker)(p) + ":" + p.alternation);
                     var D = [],
                        j = -1;
                     for (h = m; h < r.getLastValidPosition.call(x, void 0, !0) + 1; h++)
                        -1 === j && e <= h && void 0 !== t && (D.push(t), (j = D.length - 1)),
                           (v = S.validPositions[h]) &&
                              !0 !== v.generatedInput &&
                              (void 0 === l || h < y || h >= b) &&
                              D.push(v.input),
                           delete S.validPositions[h];
                     for (
                        -1 === j && void 0 !== t && (D.push(t), (j = D.length - 1));
                        void 0 !== S.excludes[m] && S.excludes[m].length < 10;

                     ) {
                        for (
                           S.tests = {}, r.resetMaskSet.call(x, !0), O = !0, h = 0;
                           h < D.length &&
                           ((g = O.caret || r.getLastValidPosition.call(x, void 0, !0) + 1),
                           (k = D[h]),
                           (O = f.call(x, g, k, !1, n, !0)));
                           h++
                        )
                           h === j && (E = O), 1 == e && O && (E = { caretPos: h });
                        if (O) break;
                        if (
                           (r.resetMaskSet.call(x),
                           (p = a.getTest.call(x, m)),
                           (S.validPositions = P.extend(!0, [], _)),
                           (S.tests = P.extend(!0, {}, M)),
                           !S.excludes[m])
                        ) {
                           E = s.call(x, e, t, i, n, m - 1, l);
                           break;
                        }
                        var A = (0, a.getDecisionTaker)(p);
                        if (-1 !== S.excludes[m].indexOf(A + ":" + p.alternation)) {
                           E = s.call(x, e, t, i, n, m - 1, l);
                           break;
                        }
                        for (
                           S.excludes[m].push(A + ":" + p.alternation), h = m;
                           h < r.getLastValidPosition.call(x, void 0, !0) + 1;
                           h++
                        )
                           delete S.validPositions[h];
                     }
                  }
                  return (E && !1 === w.keepStatic) || delete S.excludes[m], E;
               }
               function l(e, t, i) {
                  var a = this.opts,
                     r = this.maskset;
                  switch (a.casing || t.casing) {
                     case "upper":
                        e = e.toUpperCase();
                        break;
                     case "lower":
                        e = e.toLowerCase();
                        break;
                     case "title":
                        var o = r.validPositions[i - 1];
                        e =
                           0 === i || (o && o.input === String.fromCharCode(n.keyCode.Space))
                              ? e.toUpperCase()
                              : e.toLowerCase();
                        break;
                     default:
                        if ("function" == typeof a.casing) {
                           var s = Array.prototype.slice.call(arguments);
                           s.push(r.validPositions), (e = a.casing.apply(this, s));
                        }
                  }
                  return e;
               }
               function c(e) {
                  var t = this,
                     i = this.opts,
                     n = this.maskset;
                  if ("function" == typeof i.isComplete) return i.isComplete(e, i);
                  if ("*" !== i.repeat) {
                     var o = !1,
                        s = r.determineLastRequiredPosition.call(t, !0),
                        l = r.seekPrevious.call(t, s.l);
                     if (void 0 === s.def || s.def.newBlockMarker || s.def.optionality || s.def.optionalQuantifier) {
                        o = !0;
                        for (var c = 0; c <= l; c++) {
                           var u = a.getTestTemplate.call(t, c).match;
                           if (
                              (!0 !== u.static &&
                                 void 0 === n.validPositions[c] &&
                                 !0 !== u.optionality &&
                                 !0 !== u.optionalQuantifier) ||
                              (!0 === u.static && e[c] !== a.getPlaceholder.call(t, c, u))
                           ) {
                              o = !1;
                              break;
                           }
                        }
                     }
                     return o;
                  }
               }
               function u(e) {
                  var t = this.opts.insertMode ? 0 : 1;
                  return this.isRTL ? e.begin - e.end > t : e.end - e.begin > t;
               }
               function f(e, t, i, n, o, d, m) {
                  var g = this,
                     k = this.dependencyLib,
                     y = this.opts,
                     b = g.maskset;
                  i = !0 === i;
                  var x = e;
                  function P(e) {
                     if (void 0 !== e) {
                        if (
                           (void 0 !== e.remove &&
                              (Array.isArray(e.remove) || (e.remove = [e.remove]),
                              e.remove
                                 .sort(function (e, t) {
                                    return g.isRTL ? e.pos - t.pos : t.pos - e.pos;
                                 })
                                 .forEach(function (e) {
                                    v.call(g, { begin: e, end: e + 1 });
                                 }),
                              (e.remove = void 0)),
                           void 0 !== e.insert &&
                              (Array.isArray(e.insert) || (e.insert = [e.insert]),
                              e.insert
                                 .sort(function (e, t) {
                                    return g.isRTL ? t.pos - e.pos : e.pos - t.pos;
                                 })
                                 .forEach(function (e) {
                                    "" !== e.c &&
                                       f.call(
                                          g,
                                          e.pos,
                                          e.c,
                                          void 0 === e.strict || e.strict,
                                          void 0 !== e.fromIsValid ? e.fromIsValid : n
                                       );
                                 }),
                              (e.insert = void 0)),
                           e.refreshFromBuffer && e.buffer)
                        ) {
                           var t = e.refreshFromBuffer;
                           p.call(g, !0 === t ? t : t.start, t.end, e.buffer), (e.refreshFromBuffer = void 0);
                        }
                        void 0 !== e.rewritePosition && ((x = e.rewritePosition), (e = !0));
                     }
                     return e;
                  }
                  function w(t, i, o) {
                     var s = !1;
                     return (
                        a.getTests.call(g, t).every(function (c, f) {
                           var d = c.match;
                           if (
                              (r.getBuffer.call(g, !0),
                              !1 !==
                                 (s =
                                    (!d.jit || void 0 !== b.validPositions[r.seekPrevious.call(g, t)]) &&
                                    (null != d.fn
                                       ? d.fn.test(i, b, t, o, y, u.call(g, e))
                                       : (i === d.def || i === y.skipOptionalPartCharacter) &&
                                         "" !== d.def && { c: a.getPlaceholder.call(g, t, d, !0) || d.def, pos: t })))
                           ) {
                              var p = void 0 !== s.c ? s.c : i,
                                 h = t;
                              return (
                                 (p =
                                    p === y.skipOptionalPartCharacter && !0 === d.static
                                       ? a.getPlaceholder.call(g, t, d, !0) || d.def
                                       : p),
                                 !0 !== (s = P(s)) && void 0 !== s.pos && s.pos !== t && (h = s.pos),
                                 !0 !== s && void 0 === s.pos && void 0 === s.c
                                    ? !1
                                    : (!1 === v.call(g, e, k.extend({}, c, { input: l.call(g, p, d, h) }), n, h) &&
                                         (s = !1),
                                      !1)
                              );
                           }
                           return !0;
                        }),
                        s
                     );
                  }
                  void 0 !== e.begin && (x = g.isRTL ? e.end : e.begin);
                  var S = !0,
                     _ = k.extend(!0, {}, b.validPositions);
                  if (!1 === y.keepStatic && void 0 !== b.excludes[x] && !0 !== o && !0 !== n)
                     for (var M = x; M < (g.isRTL ? e.begin : e.end); M++)
                        void 0 !== b.excludes[M] && ((b.excludes[M] = void 0), delete b.tests[M]);
                  if (
                     ("function" == typeof y.preValidation &&
                        !0 !== n &&
                        !0 !== d &&
                        (S = P(
                           (S = y.preValidation.call(g, r.getBuffer.call(g), x, t, u.call(g, e), y, b, e, i || o))
                        )),
                     !0 === S)
                  ) {
                     if (((S = w(x, t, i)), (!i || !0 === n) && !1 === S && !0 !== d)) {
                        var O = b.validPositions[x];
                        if (!O || !0 !== O.match.static || (O.match.def !== t && t !== y.skipOptionalPartCharacter)) {
                           if (y.insertMode || void 0 === b.validPositions[r.seekNext.call(g, x)] || e.end > x) {
                              var E = !1;
                              if (
                                 (b.jitOffset[x] &&
                                    void 0 === b.validPositions[r.seekNext.call(g, x)] &&
                                    !1 !== (S = f.call(g, x + b.jitOffset[x], t, !0, !0)) &&
                                    (!0 !== o && (S.caret = x), (E = !0)),
                                 e.end > x && (b.validPositions[x] = void 0),
                                 !E && !r.isMask.call(g, x, y.keepStatic && 0 === x))
                              )
                                 for (var T = x + 1, D = r.seekNext.call(g, x, !1, 0 !== x); T <= D; T++)
                                    if (!1 !== (S = w(T, t, i))) {
                                       (S = h.call(g, x, void 0 !== S.pos ? S.pos : T) || S), (x = T);
                                       break;
                                    }
                           }
                        } else S = { caret: r.seekNext.call(g, x) };
                     }
                     !1 !== S || !y.keepStatic || (!c.call(g, r.getBuffer.call(g)) && 0 !== x) || i || !0 === o
                        ? u.call(g, e) &&
                          b.tests[x] &&
                          b.tests[x].length > 1 &&
                          y.keepStatic &&
                          !i &&
                          !0 !== o &&
                          (S = s.call(g, !0))
                        : (S = s.call(g, x, t, i, n, void 0, e)),
                        !0 === S && (S = { pos: x });
                  }
                  if ("function" == typeof y.postValidation && !0 !== n && !0 !== d) {
                     var j = y.postValidation.call(
                        g,
                        r.getBuffer.call(g, !0),
                        void 0 !== e.begin ? (g.isRTL ? e.end : e.begin) : e,
                        t,
                        S,
                        y,
                        b,
                        i,
                        m
                     );
                     void 0 !== j && (S = !0 === j ? S : j);
                  }
                  S && void 0 === S.pos && (S.pos = x),
                     !1 === S || !0 === d
                        ? (r.resetMaskSet.call(g, !0), (b.validPositions = k.extend(!0, [], _)))
                        : h.call(g, void 0, x, !0);
                  var A = P(S);
                  void 0 !== g.maxLength &&
                     r.getBuffer.call(g).length > g.maxLength &&
                     !n &&
                     (r.resetMaskSet.call(g, !0), (b.validPositions = k.extend(!0, [], _)), (A = !1));
                  return A;
               }
               function d(e, t, i) {
                  for (var n = this.maskset, r = !1, o = a.getTests.call(this, e), s = 0; s < o.length; s++) {
                     if (
                        o[s].match &&
                        ((o[s].match.nativeDef === t.match[i.shiftPositions ? "def" : "nativeDef"] &&
                           (!i.shiftPositions || !t.match.static)) ||
                           o[s].match.nativeDef === t.match.nativeDef ||
                           (i.regex && !o[s].match.static && o[s].match.fn.test(t.input, n, e, !1, i)))
                     ) {
                        r = !0;
                        break;
                     }
                     if (o[s].match && o[s].match.def === t.match.nativeDef) {
                        r = void 0;
                        break;
                     }
                  }
                  return !1 === r && void 0 !== n.jitOffset[e] && (r = d.call(this, e + n.jitOffset[e], t, i)), r;
               }
               function p(e, t, i) {
                  var a,
                     n,
                     s = this,
                     l = this.maskset,
                     c = this.opts,
                     u = this.dependencyLib,
                     f = c.skipOptionalPartCharacter,
                     d = s.isRTL ? i.slice().reverse() : i;
                  if (((c.skipOptionalPartCharacter = ""), !0 === e))
                     r.resetMaskSet.call(s),
                        (l.tests = {}),
                        (e = 0),
                        (t = i.length),
                        (n = r.determineNewCaretPosition.call(s, { begin: 0, end: 0 }, !1).begin);
                  else {
                     for (a = e; a < t; a++) delete l.validPositions[a];
                     n = e;
                  }
                  var p = new u.Event("keypress");
                  for (a = e; a < t; a++) {
                     (p.key = d[a].toString()), (s.ignorable = !1);
                     var h = o.EventHandlers.keypressEvent.call(s, p, !0, !1, !1, n);
                     !1 !== h && void 0 !== h && (n = h.forwardPosition);
                  }
                  c.skipOptionalPartCharacter = f;
               }
               function h(e, t, i) {
                  var n = this,
                     o = this.maskset,
                     s = this.dependencyLib;
                  if (void 0 === e) for (e = t - 1; e > 0 && !o.validPositions[e]; e--);
                  for (var l = e; l < t; l++) {
                     if (void 0 === o.validPositions[l] && !r.isMask.call(n, l, !1))
                        if (0 == l ? a.getTest.call(n, l) : o.validPositions[l - 1]) {
                           var c = a.getTests.call(n, l).slice();
                           "" === c[c.length - 1].match.def && c.pop();
                           var u,
                              d = a.determineTestTemplate.call(n, l, c);
                           if (
                              d &&
                              (!0 !== d.match.jit ||
                                 ("master" === d.match.newBlockMarker &&
                                    (u = o.validPositions[l + 1]) &&
                                    !0 === u.match.optionalQuantifier)) &&
                              (((d = s.extend({}, d, {
                                 input: a.getPlaceholder.call(n, l, d.match, !0) || d.match.def,
                              })).generatedInput = !0),
                              v.call(n, l, d, !0),
                              !0 !== i)
                           ) {
                              var p = o.validPositions[t].input;
                              return (o.validPositions[t] = void 0), f.call(n, t, p, !0, !0);
                           }
                        }
                  }
               }
               function v(e, t, i, n) {
                  var o = this,
                     s = this.maskset,
                     l = this.opts,
                     c = this.dependencyLib;
                  function u(e, t, i) {
                     var a = t[e];
                     if (
                        void 0 !== a &&
                        !0 === a.match.static &&
                        !0 !== a.match.optionality &&
                        (void 0 === t[0] || void 0 === t[0].alternation)
                     ) {
                        var n = i.begin <= e - 1 ? t[e - 1] && !0 === t[e - 1].match.static && t[e - 1] : t[e - 1],
                           r = i.end > e + 1 ? t[e + 1] && !0 === t[e + 1].match.static && t[e + 1] : t[e + 1];
                        return n && r;
                     }
                     return !1;
                  }
                  var p = 0,
                     h = void 0 !== e.begin ? e.begin : e,
                     v = void 0 !== e.end ? e.end : e,
                     m = !0;
                  if (
                     (e.begin > e.end && ((h = e.end), (v = e.begin)),
                     (n = void 0 !== n ? n : h),
                     void 0 === i &&
                        (h !== v ||
                           (l.insertMode && void 0 !== s.validPositions[n]) ||
                           void 0 === t ||
                           t.match.optionalQuantifier ||
                           t.match.optionality))
                  ) {
                     var g,
                        k = c.extend(!0, {}, s.validPositions),
                        y = r.getLastValidPosition.call(o, void 0, !0);
                     for (s.p = h, g = y; g >= h; g--)
                        delete s.validPositions[g], void 0 === t && delete s.tests[g + 1];
                     var b,
                        x,
                        P = n,
                        w = P;
                     for (
                        t && ((s.validPositions[n] = c.extend(!0, {}, t)), w++, P++), g = t ? v : v - 1;
                        g <= y;
                        g++
                     ) {
                        if (
                           void 0 !== (b = k[g]) &&
                           !0 !== b.generatedInput &&
                           (g >= v || (g >= h && u(g, k, { begin: h, end: v })))
                        ) {
                           for (; "" !== a.getTest.call(o, w).match.def; ) {
                              if (!1 !== (x = d.call(o, w, b, l)) || "+" === b.match.def) {
                                 "+" === b.match.def && r.getBuffer.call(o, !0);
                                 var S = f.call(o, w, b.input, "+" !== b.match.def, !0);
                                 if (((m = !1 !== S), (P = (S.pos || w) + 1), !m && x)) break;
                              } else m = !1;
                              if (m) {
                                 void 0 === t && b.match.static && g === e.begin && p++;
                                 break;
                              }
                              if ((!m && r.getBuffer.call(o), w > s.maskLength)) break;
                              w++;
                           }
                           "" == a.getTest.call(o, w).match.def && (m = !1), (w = P);
                        }
                        if (!m) break;
                     }
                     if (!m) return (s.validPositions = c.extend(!0, [], k)), r.resetMaskSet.call(o, !0), !1;
                  } else
                     t && a.getTest.call(o, n).match.cd === t.match.cd && (s.validPositions[n] = c.extend(!0, {}, t));
                  return r.resetMaskSet.call(o, !0), p;
               }
            },
         },
         t = {};
      function i(a) {
         var n = t[a];
         if (void 0 !== n) return n.exports;
         var r = (t[a] = { exports: {} });
         return e[a](r, r.exports, i), r.exports;
      }
      var a = {};
      return (
         (function () {
            var e,
               t = a;
            Object.defineProperty(t, "__esModule", { value: !0 }),
               (t.default = void 0),
               i(3851),
               i(219),
               i(207),
               i(5296);
            var n = ((e = i(2394)) && e.__esModule ? e : { default: e }).default;
            t.default = n;
         })(),
         a
      );
   })();
});
