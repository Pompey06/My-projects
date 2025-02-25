<template>
  <div class="gallery">
    <div class="gallery__container _container">
      <div class="gallery__title">
        AVATAR <span>3D Gallery</span>
        <div class="home__eleps">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" preserveAspectRatio="xMinYMin meet" viewBox="0 0 600 400">
            <path id="traceB-gallery"
              d="M98 51c18-2 48 5 72 10a474 474 0 0 1 121 47l41 23c34 20 69 39 99 63 32 26 64 52 87 86 9 12 18 25 18 40 1 8-2 16-7 22-6 6-16 9-24 10-19 3-39 0-58-4-13-3-26-6-39-11a884 884 0 0 1-287-168c-17-15-32-32-45-52-4-6-9-17-10-25-6-27 7-37 32-41Z"
              fill="none" stroke="#ECEFEE" stroke-width="1" />
            <g id="star-gallery-1" fill="#FFFFFF" transform="translate(0,-23) scale(0.03, 0.05)">
              <path d="M435 760 c-24 -112 -44 -185 -54 -194 -9 -7 -95 -31 -191 -51 -96 -21 -176 -38 -178 -40 -1 -1 79 -19 178 -40 112 -24 185 -44 194 -54 7 -9 31 -95 51 -191 21 -96 38 -176 40 -178 1 -1 19 79 40 178 24 112 44 185 54 194 9 7 95 31 191 51 96 21 176 38 178 40 1 1 -79 19 -178 40 -112 24 -185 44 -194 54 -7 9 -31 95 -51 191 -21 96 -38 176 -40 178 -1 1 -19 -79 -40 -178z" />
              <animatemotion begin="0s" dur="10s" rotate="auto" repeatCount="indefinite" additive="sum">
                <mpath xlink:href="#traceB-gallery" />
              </animatemotion>
            </g>
            <g id="star-gallery-2" fill="#61EDC0" transform="translate(0,-23) scale(0.03, 0.05)">
              <path d="M435 760 c-24 -112 -44 -185 -54 -194 -9 -7 -95 -31 -191 -51 -96 -21 -176 -38 -178 -40 -1 -1 79 -19 178 -40 112 -24 185 -44 194 -54 7 -9 31 -95 51 -191 21 -96 38 -176 40 -178 1 -1 19 79 40 178 24 112 44 185 54 194 9 7 95 31 191 51 96 21 176 38 178 40 1 1 -79 19 -178 40 -112 24 -185 44 -194 54 -7 9 -31 95 -51 191 -21 96 -38 176 -40 178 -1 1 -19 -79 -40 -178z" />
              <animatemotion begin="5s" dur="10s" rotate="auto" repeatCount="indefinite" additive="sum">
                <mpath xlink:href="#traceB-gallery" />
              </animatemotion>
            </g>
          </svg>
        </div>
      </div>
      <div class="gallery__block">
        <div class="str">
          <div class="str__row-marque">
            <div v-for="i in 5" :key="'g1'+i" class="str__item">
              <img src="../assets/img/gg.png" alt>
            </div>
          </div>
          <div class="str__row-marque">
            <div v-for="i in 5" :key="'g2'+i" class="str__item">
              <img src="../assets/img/gg.png" alt>
            </div>
          </div>
        </div>
        <div class="str _rew">
          <div class="str__row-marque">
            <div v-for="i in 5" :key="'g3'+i" class="str__item">
              <img src="../assets/img/gg.png" alt>
            </div>
          </div>
          <div class="str__row-marque">
            <div v-for="i in 5" :key="'g4'+i" class="str__item">
              <img src="../assets/img/gg.png" alt>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GallerySection'
}
</script> 