<template>
  <footer class="footer">
    <div class="footer__container _container">
      <div class="footer__block">
        <div class="footer__left">
          <div class="footer__logo">
            <img src="../assets/img/fl.png" alt="Footer Logo">
          </div>
          <div class="footer__text">AVATAR AI Inc. © All Rights Reserved</div>
        </div>
        <div class="footer__right">
          <div class="footer__col">
            <span>Site Map</span>
            <a href="#faq" class="_goto">FAQ</a>
            <a href="#gallery" class="_goto">Gallery</a>
            <a href="#avatar" class="_goto">App</a>
            <a href="#roadmap" class="_goto">Roadmap</a>
          </div>
          <div class="footer__col">
            <span>Resources</span>
            <a href="#">About</a>
            <a href="#">Documents</a>
            <a href="#">Check $AVATAR</a>
          </div>
          <div class="footer__col">
            <span>Social</span>
            <a href="https://twitter.com/avatarai_eth" target="_blank">X</a>
            <a href="https://t.me/avatarai_eth" target="_blank">Telegram</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  mounted() {
    // Добавляем обработчик для плавной прокрутки
    const gotoLinks = document.querySelectorAll('.footer ._goto')
    gotoLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const href = link.getAttribute('href')
        if (href && href.charAt(0) === '#') {
          const targetElement = document.querySelector(href)
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' })
          }
        }
      })
    })
  }
}
</script> 