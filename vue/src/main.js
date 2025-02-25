import './assets/css/style.min.css'
import './assets/css/fonts.css'
import { createApp } from 'vue'
import App from './App.vue'
import SolanaWallets from 'solana-wallets-vue'
import 'solana-wallets-vue/styles.css'

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter
} from '@solana/wallet-adapter-wallets'

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const app = createApp(App)

// Configure wallet options
const walletOptions = {
  wallets: [
    new PhantomWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
    new SolflareWalletAdapter({ network: WalletAdapterNetwork.Devnet })
  ],
  autoConnect: false,
  onError: (error) => {
    console.error('Wallet error:', error)
  }
}

// Initialize wallet store
app.use(SolanaWallets, walletOptions)

app.component('swiper', Swiper)
app.component('swiper-slide', SwiperSlide)

app.mount('#app') 