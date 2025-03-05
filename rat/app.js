// CHOOSE ITEMS CLASS
class ChooseItems {
  constructor(selector) {
    this.wrapItems = document.querySelectorAll(selector);
    this.initChooseItems();

    this.addEventListeners('[data-reset-btn]', this.useDefaultImages.bind(this));
    this.addEventListeners('[data-generate-random-btn]', this.generateRandom.bind(this));
    this.addEventListeners('[data-download-photo]', this.downloadPhoto.bind(this));
  }

  addEventListeners(selector, handler) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      if (element) {
        element.addEventListener('click', handler);
      }
    });
  }

  initChooseItems() {
    this.wrapItems.forEach((wrap) => {
      const label = wrap.getAttribute('data-choose-items');
      const previewEl = document.querySelector(`[data-choose-preview="${label}"]`);
      const items = wrap.querySelectorAll('[data-item]');

      items.forEach((item) => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          const chosenValue = item.getAttribute('data-item');
          items.forEach((el) => el.classList.remove('_active'));
          item.classList.add('_active');

          if (previewEl) {
            if (!chosenValue) previewEl.classList.add('none'); else previewEl.classList.remove('none');
            previewEl.src = chosenValue;
            deleteImageDef();
          }
        });
      });
    });
  }

  useDefaultImages() {
    this.wrapItems.forEach((wrap) => {
      const defItem = wrap.querySelector('[data-def-item]');
      if (defItem) defItem.click();
    });
    deleteImageDef();
  }

  generateRandom() {
    this.wrapItems.forEach((wrap) => {
      const items = wrap.querySelectorAll('[data-item]');
      if (items.length > 0) {
        const randomIndex = Math.floor(Math.random() * items.length);
        const randomItem = items[randomIndex];
        randomItem.click();
      }
    });
    deleteImageDef();
  }

  downloadPhoto() {
    const photo = document.querySelector('[data-generator-photo]');
    html2canvas(photo).then(canvas => {
      const link = document.createElement('a');
      link.download = 'Penguin.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }
}

const itemSelector = new ChooseItems('[data-choose-items]');
itemSelector.useDefaultImages();

const swiperWraps = document.querySelectorAll('[data-swiper-wrap]');
swiperWraps.forEach((wrap) => {
  const swiperEl = wrap.querySelector('.swiper');
  const btnPrev = wrap.querySelector('.swiper__items-prev');
  const btnNext = wrap.querySelector('.swiper__items-next');

  new Swiper(swiperEl, {
    navigation: {
      nextEl: btnNext,
      prevEl: btnPrev,
    },
    slidesPerView: 'auto',
    spaceBetween: 20
  })
});


document.addEventListener('DOMContentLoaded', function () {
  deleteImageDef();
});

function deleteImageDef() {
  const images = document.querySelectorAll('[data-generator-photo] img');
  images.forEach((img) => {
    const getRemoveCat = img.getAttribute('data-remove-cat');
    if (getRemoveCat === null) {
      img.addEventListener('contextmenu', function (event) {
        event.preventDefault();
      });
      img.addEventListener('touchstart', function (event) {
        event.preventDefault();
      });
      img.addEventListener('touchend', function (event) {
        event.preventDefault();
      });
    }
  });
}