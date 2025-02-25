<template>
  <div>
    <!-- Общий попап -->
    <div class="popup popup_popup" :class="{ '_active': isGeneralPopupActive }">
      <div class="popup__content">
        <div class="popup__body">
          <div class="popup__close" @click="closeGeneralPopup"></div>
          <slot name="general"></slot>
        </div>
      </div>
    </div>

    <!-- Попап для сообщений -->
    <div class="popup popup_massagename-message" :class="{ '_active': isMessagePopupActive }">
      <div class="popup__content">
        <div class="popup__body">
          <div class="popup__close" @click="closeMessagePopup"></div>
          <slot name="message"></slot>
        </div>
      </div>
    </div>

    <!-- Видео попап -->
    <div class="popup popup_video" :class="{ '_active': isVideoPopupActive }">
      <div class="popup__content">
        <div class="popup__body">
          <div class="popup__close popup__close_video" @click="closeVideoPopup"></div>
          <div class="popup__video _video">
            <slot name="video"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupComponent',
  data() {
    return {
      isGeneralPopupActive: false,
      isMessagePopupActive: false,
      isVideoPopupActive: false
    }
  },
  methods: {
    showGeneralPopup() {
      this.isGeneralPopupActive = true
      document.body.classList.add('_lock')
    },
    closeGeneralPopup() {
      this.isGeneralPopupActive = false
      document.body.classList.remove('_lock')
    },
    showMessagePopup() {
      this.isMessagePopupActive = true
      document.body.classList.add('_lock')
    },
    closeMessagePopup() {
      this.isMessagePopupActive = false
      document.body.classList.remove('_lock')
    },
    showVideoPopup() {
      this.isVideoPopupActive = true
      document.body.classList.add('_lock')
    },
    closeVideoPopup() {
      this.isVideoPopupActive = false
      document.body.classList.remove('_lock')
    }
  },
  mounted() {
    // Закрытие попапов по клику вне контента
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('popup_popup') && this.isGeneralPopupActive) {
        this.closeGeneralPopup()
      }
      if (e.target.classList.contains('popup_massagename-message') && this.isMessagePopupActive) {
        this.closeMessagePopup()
      }
      if (e.target.classList.contains('popup_video') && this.isVideoPopupActive) {
        this.closeVideoPopup()
      }
    })

    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.isGeneralPopupActive) this.closeGeneralPopup()
        if (this.isMessagePopupActive) this.closeMessagePopup()
        if (this.isVideoPopupActive) this.closeVideoPopup()
      }
    })
  }
}
</script> 