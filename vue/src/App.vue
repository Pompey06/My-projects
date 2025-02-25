<script>
import HeaderComponent from './components/HeaderComponent.vue'
import HomeSection from './components/HomeSection.vue'
import GallerySection from './components/GallerySection.vue'
import AvatarSection from './components/AvatarSection.vue'
import RoadmapSection from './components/RoadmapSection.vue'
import FaqSection from './components/FaqSection.vue'
import FooterComponent from './components/FooterComponent.vue'
import PopupComponent from './components/PopupComponent.vue'
import { ref, provide } from 'vue'
import { WalletModalProvider } from 'solana-wallets-vue'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    HomeSection,
    GallerySection,
    AvatarSection,
    RoadmapSection,
    FaqSection,
    FooterComponent,
    PopupComponent,
    WalletModalProvider
  },
  setup() {
    const wallet = ref(null)
    provide('wallet', wallet)

    return {
      wallet
    }
  },
  methods: {
    showPopup(type) {
      switch (type) {
        case 'general':
          this.$refs.popups.showGeneralPopup()
          break
        case 'message':
          this.$refs.popups.showMessagePopup()
          break
        case 'video':
          this.$refs.popups.showVideoPopup()
          break
      }
    }
  }
}
</script>

<template>
  <wallet-modal-provider>
    <div class="wrapper index">
      <HeaderComponent />
      <main class="page">
        <div class="ca-ready">Ca copy to clipboard</div>
        <HomeSection />
        <GallerySection />
        <AvatarSection />
        <RoadmapSection />
        <FaqSection />
      </main>
      <FooterComponent />
      <PopupComponent ref="popups">
        <template #general>
          <!-- Содержимое общего попапа -->
        </template>
        <template #message>
          <!-- Содержимое попапа сообщений -->
        </template>
        <template #video>
          <!-- Содержимое видео попапа -->
        </template>
      </PopupComponent>
    </div>
  </wallet-modal-provider>
</template>

<style>
@import './assets/css/style.css';

.wrapper.index {
  position: relative;
  min-height: 100vh;
}

.page {
  flex: 1;
  position: relative;
}
</style>
