<template>
  <header class="header">
    <div class="header__container _container">
      <div class="header__block">
        <div class="header__close"><img src="../assets/img/close.png" alt="Close"></div>
        <a href="https://t.me/avatarai_eth" target="_blank"><img src="../assets/img/tg2.png" alt="Telegram"></a>
        <a href="https://www.dextools.io/app/en/ether/pair-explorer/" target="_blank"><img src="../assets/img/dextools3.png" alt="Dextools"></a>
        <a href="#gallery" class="_goto">Gallery</a>
        <a href="#avatar" class="_goto">App</a>
        <a href="#roadmap" class="_goto">Roadmap</a>
        <a href="#faq" class="_goto">FAQ</a>
        <a href="https://twitter.com/avatarai_eth" target="_blank"><img src="../assets/img/x2.png" alt="Twitter"></a>
        <a href="https://dexscreener.com/" target="_blank"><img src="../assets/img/dexscreener2.png" alt="Dexscreener"></a>
        <a class="_copy">Copy CA <span>0x1234567890abcdef1234567890abcdef12345678</span></a>
        <a href="#avatar" class="_btn _goto">Create your avatar</a>
      </div>
      <div class="header__burger">
        <img src="../assets/img/bur.png" alt="Menu">
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  mounted() {
    // Добавляем обработчик для копирования CA
    const copyButton = document.querySelector('._copy');
    if (copyButton) {
      copyButton.addEventListener('click', () => {
        const caText = copyButton.querySelector('span').textContent;
        navigator.clipboard.writeText(caText).then(() => {
          document.querySelector('.ca-ready').classList.add('_active');
          setTimeout(() => {
            document.querySelector('.ca-ready').classList.remove('_active');
          }, 3000);
        });
      });
    }

    // Добавляем обработчик для мобильного меню
    const burger = document.querySelector('.header__burger');
    const headerBlock = document.querySelector('.header__block');
    const closeBtn = document.querySelector('.header__close');
    
    if (burger && headerBlock && closeBtn) {
      burger.addEventListener('click', () => {
        headerBlock.classList.add('_active');
      });
      
      closeBtn.addEventListener('click', () => {
        headerBlock.classList.remove('_active');
      });
    }

    // Добавляем обработчик для плавной прокрутки
    const gotoLinks = document.querySelectorAll('._goto');
    gotoLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href && href.charAt(0) === '#') {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            headerBlock.classList.remove('_active');
          }
        }
      });
    });
  }
}
</script> 