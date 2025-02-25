<template>
  <div class="roadmap" id="roadmap">
    <div class="roadmap__container _container">
      <div class="roadmap__title"><span>road</span>map</div>
      <div class="roadmap__arrow _scr-item">
        <img src="../assets/img/arb.png" alt>
      </div>
      <div class="roadmap__anim">
        <img src="../assets/img/animleft.png" alt>
      </div>
      <div class="roadmap__wp">
        <div class="roadmap__block _scr-item">
          <div class="roadmap__item">
            <div class="roadmap__phase">Phase 1:</div>
            <ul>
              <li>White Paper creation</li>
              <li>Website launch</li>
              <li>MVP development</li>
              <li>Social media verification</li>
              <li>Pre-launch marketing</li>
              <li>Community building</li>
            </ul>
          </div>
          <div class="roadmap__item">
            <div class="roadmap__phase">Phase 2:</div>
            <ul>
              <li>WPumpFun token launch</li>
              <li>Post-launch marketing</li>
              <li>Listings on CMC/CG</li>
              <li>AI 3D optimization</li>
            </ul>
          </div>
          <div class="roadmap__item">
            <div class="roadmap__phase">Phase 3:</div>
            <ul>
              <li>Global marketing</li>
              <li>3D avatar platform</li>
              <li>Advanced Text-to-3D</li>
              <li>Real-time rendering</li>
              <li>Multi-chain NFT support</li>
              <li>Animation for 3D</li>
              <li>NFT collection support</li>
            </ul>
          </div>
          <div class="roadmap__item">
            <div class="roadmap__phase">Phase 4:</div>
            <ul>
              <li>Marketing expansion</li>
              <li>3D customization tools</li>
              <li>GPU-rendering upgrades</li>
              <li>High-polygon models</li>
              <li>NFT collection growth</li>
            </ul>
          </div>
          <div class="roadmap__item">
            <div class="roadmap__phase">Phase 5:</div>
            <ul>
              <li>Texture improvements</li>
              <li>AR/VR avatar support</li>
              <li>NFT marketplace launch</li>
              <li>Decentralized 3D storage</li>
              <li>3D collaboration tools</li>
            </ul>
          </div>
          <div class="roadmap__item">
            <div class="roadmap__phase">Phase 6:</div>
            <ul>
              <li>Ecosystem marketing</li>
              <li>ML 3D marketplace</li>
              <li>Interactive AI avatars</li>
              <li>Metaverse hub launch</li>
              <li>Autonomous 3D agents</li>
            </ul>
          </div>
          <div class="roadmap__img">
            <img src="../assets/img/rbg.png" alt>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoadmapSection',
  mounted() {
    // Добавляем анимацию при скролле
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('_active')
        }
      })
    }, {
      threshold: 0.1
    })

    document.querySelectorAll('._scr-item').forEach(item => {
      observer.observe(item)
    })
  }
}
</script> 