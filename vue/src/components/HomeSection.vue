<template>
  <div class="home ton">
    <div class="home__container _container">
      <div class="home__title">
        Avatar<span>AI</span>
        <div class="home__eleps">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" preserveAspectRatio="xMinYMin meet" id="svg1" viewBox="0 0 600 400">
            <!-- Синяя трасса движения -->
            <path id="traceB"
              d="M98 51c18-2 48 5 72 10a474 474 0 0 1 121 47l41 23c34 20 69 39 99 63 32 26 64 52 87 86 9 12 18 25 18 40 1 8-2 16-7 22-6 6-16 9-24 10-19 3-39 0-58-4-13-3-26-6-39-11a884 884 0 0 1-287-168c-17-15-32-32-45-52-4-6-9-17-10-25-6-27 7-37 32-41Z"
              fill="none" stroke="#ECEFEE" stroke-width="1" />

            <!-- Звездочка -->
            <g id="star1" fill="#FFFFFF" transform="translate(0,-23) scale(0.03, 0.05)">
              <path d="M435 760 c-24 -112 -44 -185 -54 -194 -9 -7 -95 -31 -191 -51 -96
-21 -176 -38 -178 -40 -1 -1 79 -19 178 -40 112 -24 185 -44 194 -54 7 -9 31
-95 51 -191 21 -96 38 -176 40 -178 1 -1 19 79 40 178 24 112 44 185 54 194 9
7 95 31 191 51 96 21 176 38 178 40 1 1 -79 19 -178 40 -112 24 -185 44 -194
54 -7 9 -31 95 -51 191 -21 96 -38 176 -40 178 -1 1 -19 -79 -40 -178z" />
              <animateMotion begin="0s" dur="10s" rotate="auto" repeatCount="indefinite">
                <mpath xlink:href="#traceB" />
              </animateMotion>
            </g>

            <!-- Вторая звездочка -->
            <g id="star2" fill="#61EDC0" transform="translate(0,-23) scale(0.03, 0.05)">
              <path d="M435 760 c-24 -112 -44 -185 -54 -194 -9 -7 -95 -31 -191 -51 -96
-21 -176 -38 -178 -40 -1 -1 79 -19 178 -40 112 -24 185 -44 194 -54 7 -9 31
-95 51 -191 21 -96 38 -176 40 -178 1 -1 19 79 40 178 24 112 44 185 54 194 9
7 95 31 191 51 96 21 176 38 178 40 1 1 -79 19 -178 40 -112 24 -185 44 -194
54 -7 9 -31 95 -51 191 -21 96 -38 176 -40 178 -1 1 -19 -79 -40 -178z" />
              <animateMotion begin="5s" dur="10s" rotate="auto" repeatCount="indefinite">
                <mpath xlink:href="#traceB" />
              </animateMotion>
            </g>
          </svg>
        </div>
      </div>
      <div class="home__info ton__img-wrapper _br footer-screen__bg _rev">
        <img src="../assets/img/z11.png" alt>
        <img src="../assets/img/z22.png" alt>
        <span>Your Trusted AI for Creating 3D Models and Minting NFT</span>
      </div>
      <div class="home__block">
        <div class="home__item">
          <div class="home__icon"><img src="../assets/img/i11.png" alt></div>
          <div class="home__head">Bring Your Ideas to Life with AI-Powered 3D Creation</div>
          <div class="home__text">Unlock the power of artificial intelligence to bring your ideas to life. Transform text descriptions into unique 3D models and mint NFTs with just one click. Avatar AI is the tool that makes advanced technology accessible to everyone.</div>
          <div class="home__bg"><img src="../assets/img/i4.png" alt></div>
        </div>
        <div class="home__item">
          <div class="home__icon"><img src="../assets/img/i22.png" alt></div>
          <div class="home__head">Instant NFT: Fast, Simple, and Secure</div>
          <div class="home__text">With Avatar AI, you can instantly turn your created models into NFTs ready for sale, collection, or display. No complex processes – just your ideas and results, made easy.</div>
          <div class="home__bg"><img src="../assets/img/i5.png" alt></div>
        </div>
        <div class="home__item">
          <div class="home__icon"><img src="../assets/img/i33.png" alt></div>
          <div class="home__head">Transform Your Ideas into 3D with Ease</div>
          <div class="home__text">Avatar AI leverages cutting-edge generation algorithms to create unique 3D models based on your descriptions. Enter your text – get a masterpiece. Our AI handles everything, from simple shapes to complex concepts, saving you time and unleashing your creativity.</div>
          <div class="home__bg"><img src="../assets/img/i6.png" alt></div>
        </div>
      </div>
      <div class="home__anim">
        <img class="ton__img-wrapper _br footer-screen__bg" src="../assets/img/anim.png" alt>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeSection',
  mounted() {
    const isMobile = {
      Android: function() {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
      },
      any: function() {
        return (
          isMobile.Android() ||
          isMobile.BlackBerry() ||
          isMobile.iOS() ||
          isMobile.Opera() ||
          isMobile.Windows()
        );
      }
    };

    if (isMobile.any()) {
      document.querySelectorAll('.footer-screen__bg').forEach(item => {
        item.classList.add('_mobile');
      });

      window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        document.querySelectorAll('.footer-screen__bg').forEach(item => {
          const translateY = scrollY * 0.1; // Уменьшаем скорость движения
          const rotate = scrollY * 0.05; // Уменьшаем скорость вращения
          item.style.transform = `translate(0, -${translateY}px) rotate(${rotate}deg)`;
        });
      });
    } else {
      const ton = document.querySelector('.ton');
      ton.classList.add('_animates');

      let mouseX = 0;
      let mouseY = 0;
      let currentX = 0;
      let currentY = 0;
      const ease = 0.1; // Коэффициент плавности движения

      document.querySelectorAll('.footer-screen__bg').forEach(item => {
        item.classList.add('human');
      });

      document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        mouseX = (clientX - innerWidth / 2) * 0.1;
        mouseY = (clientY - innerHeight / 2) * 0.1;
      });

      function animate() {
        // Плавное движение к целевой позиции
        currentX += (mouseX - currentX) * ease;
        currentY += (mouseY - currentY) * ease;

        document.querySelectorAll('.footer-screen__bg').forEach(item => {
          if (item.classList.contains('_rev')) {
            item.style.transform = `translate(${-currentX}px, ${-currentY}px) rotate(${-currentX * 0.05}deg)`;
          } else {
            item.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${currentX * 0.05}deg)`;
          }
        });

        requestAnimationFrame(animate);
      }

      animate();
    }
  }
}
</script>

<style scoped>
.home__container {
  margin-top: 90px;
  padding: 0px 5vw;
  padding-bottom: 10vw;
}

.home__eleps {
  position: absolute;
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

@media (max-width: 998px) {
  .home__eleps {
    width: 110vw;
  }
}

.home__eleps svg {
  transform: rotate(-1deg) scale(1, 0.3);
  overflow: visible;
  width: 100%;
  height: auto;
}

.home__title {
  position: relative;
  font-size: 18vw;
  padding-top: 0;
  margin-top: 0;
  font-family: "Big Shoulders Display";
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 2vw;
  text-align: center;
}

@media (max-width: 998px) {
  .home__title {
    font-size: 22vw;
    margin-bottom: 10vw;
    margin-top: 0;
  }
  .home__eleps svg {
    transform: rotate(-1deg) scale(1.4, 0.3);
  }
}

#traceB {
  opacity: 1;
}
</style> 