<template>
  <div class="faq" id="faq">
    <div class="faq__container _container">
      <div class="faq__title">
        <div>
          <img src="../assets/img/q11.png" alt>
          <img src="../assets/img/q2.png" alt>
          faq
        </div>
      </div>
      <div class="faq__block _anim-quest">
        <div class="faq__item">
          <div class="faq__quest _quest">What is Avatar AI?</div>
          <div class="faq__resp _resp">
            <p>Avatar AI is an advanced AI-powered platform that allows you to create 3D models <br> from text descriptions and instantly mint them as NFTs. It simplifies 3D creation and NFT generation for everyone.</p>
          </div>
        </div>
        <div class="faq__item">
          <div class="faq__quest _quest">How does Avatar AI work?</div>
          <div class="faq__resp _resp">
            <p>Simply enter a text description of your idea, and Avatar AI uses cutting-edge algorithms <br> to generate a unique 3D model. You can then customize or directly mint it as an NFT.</p>
          </div>
        </div>
        <div class="faq__item">
          <div class="faq__quest _quest">Do I need any prior experience in 3D modeling or NFTs?</div>
          <div class="faq__resp _resp">
            <p>No, Avatar AI is designed to be user-friendly. Whether you're a beginner <br> or an expert, the platform streamlines the process for everyone.</p>
          </div>
        </div>
        <div class="faq__item">
          <div class="faq__quest _quest">What file formats are supported for 3D models?</div>
          <div class="faq__resp _resp">
            <p>Currently, Avatar AI supports exporting models in standard formats such as GLB, GIF, and MP4, <br> making them compatible with most 3D software and platforms.</p>
          </div>
        </div>
        <div class="faq__item">
          <div class="faq__quest _quest">How can I mint an NFT using Avatar AI?</div>
          <div class="faq__resp _resp">
            <p>After creating a 3D model, you can use the built-in NFT minting feature to securely and quickly turn it <br> into a digital asset. It's a one-click process with no technical complexity.</p>
          </div>
        </div>
        <div class="faq__item">
          <div class="faq__quest _quest">Is Avatar AI free to use?</div>
          <div class="faq__resp _resp">
            <p>At the moment the platform is completely free, but over time <br> there will be premium plans for unlimited creation of 3D models.</p>
          </div>
        </div>
        <div class="faq__item">
          <div class="faq__quest _quest">Can I sell the NFTs I create on Avatar AI?</div>
          <div class="faq__resp _resp">
            <p>Yes, once you mint your NFT, you can list it for sale on popular marketplaces supported by the platform.</p>
          </div>
        </div>
        <div class="faq__item">
          <div class="faq__quest _quest">What are the key use cases for Avatar AI?</div>
          <div class="faq__resp _resp">
            <p>Avatar AI can be used for:
              <ul>
                <li>Game design (characters, assets, environments)</li>
                <li>NFT art creation</li>
                <li>Educational projects</li>
                <li>Branding and digital collectibles</li>
                <li>AR/VR experiences</li>
              </ul>
            </p>
          </div>
        </div>
        <div class="faq__item">
          <div class="faq__quest _quest">Is my data secure on Avatar AI?</div>
          <div class="faq__resp _resp">
            <p>Absolutely. Avatar AI prioritizes user security and ensures all data and models are securely stored with encryption.</p>
          </div>
        </div>
        <div class="faq__item">
          <div class="faq__quest _quest">What makes Avatar AI unique compared to other 3D or NFT tools?</div>
          <div class="faq__resp _resp">
            <p>Avatar AI combines simplicity, AI-driven creativity, and seamless NFT minting into a single platform, <br> making it accessible and efficient for anyone, regardless of skill level.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FaqSection',
  mounted() {
    const animQuest = document.querySelectorAll('._anim-quest');
    
    for (let index = 0; index < animQuest.length; index++) {
      const element = animQuest[index];
      let quest = element.querySelectorAll('._quest');
      let resp = element.querySelectorAll('._resp');
      let hh = [];

      for (let index = 0; index < quest.length; index++) {
        const element = quest[index];
        hh.push(resp[index].clientHeight);
        resp[index].style.height = '0px';

        element.addEventListener('click', function() {
          element.classList.toggle('_active');
          
          if (element.classList.contains('_active')) {
            resp[index].classList.add('_active');
            resp[index].style.height = `${hh[index]}px`;
            setTimeout(() => {
              resp[index].style.height = 'auto';
            }, 300);
          } else {
            resp[index].style.height = `${hh[index]}px`;
            resp[index].classList.remove('_active');
            setTimeout(() => {
              resp[index].style.height = '0px';
            }, 100);
          }

          // Закрываем другие открытые вопросы
          for (let i = 0; i < quest.length; i++) {
            const elementt = quest[i];
            if (element !== elementt && elementt.classList.contains('_active')) {
              elementt.classList.remove('_active');
              resp[i].style.height = `${hh[i]}px`;
              resp[i].classList.remove('_active');
              setTimeout(() => {
                resp[i].style.height = '0px';
              }, 100);
            }
          }
        });
      }

      // Открываем первый вопрос по умолчанию
      quest[0].classList.add('_active');
      resp[0].classList.add('_active');
      resp[0].style.height = `${hh[0]}px`;
      setTimeout(() => {
        resp[0].style.height = 'auto';
      }, 300);
    }
  }
}
</script> 