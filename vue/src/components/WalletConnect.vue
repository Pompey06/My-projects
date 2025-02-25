<template>
  <div class="wallet-connect">
    <wallet-multi-button></wallet-multi-button>
  </div>
</template>

<script setup>
import { WalletMultiButton } from 'solana-wallets-vue'
import { useWallet } from 'solana-wallets-vue'
import { ref, computed, onMounted, watch } from 'vue'

const { publicKey, connected, wallet } = useWallet()
const isWalletReady = ref(false)

const isConnected = computed(() => {
  return connected.value && wallet.value && publicKey.value && isWalletReady.value
})

const walletAddress = computed(() => {
  if (!publicKey.value) return 'Not connected'
  const address = publicKey.value.toBase58()
  return `${address.slice(0, 4)}...${address.slice(-4)}`
})

const validateWalletState = () => {
  const state = {
    connected: connected.value,
    hasWallet: !!wallet.value,
    hasAdapter: !!wallet.value?.adapter,
    readyState: wallet.value?.readyState,
    hasPublicKey: !!publicKey.value,
    publicKey: publicKey.value?.toBase58()
  }
  
  console.log('Validating wallet state:', state)
  
  isWalletReady.value = state.connected && 
                        state.hasWallet && 
                        state.hasAdapter && 
                        state.readyState === 'Installed' && 
                        state.hasPublicKey
                        
  return isWalletReady.value
}

// Watch for wallet connection changes
watch([connected, wallet, publicKey], () => {
  console.log('Wallet state changed:', {
    connected: connected.value,
    wallet: wallet.value ? {
      adapter: !!wallet.value.adapter,
      readyState: wallet.value.readyState
    } : null,
    publicKey: publicKey.value?.toBase58()
  })
  validateWalletState()
})

onMounted(() => {
  validateWalletState()
})

defineExpose({
  isConnected,
  isWalletReady,
  walletAddress,
  wallet,
  connected,
  publicKey
})
</script>

<style scoped>
.wallet-connect {
  display: flex;
  justify-content: flex-end;
  position: relative;
  z-index: 100;
  height: 100%;
}

:deep(.wallet-adapter-button) {
  background-color: #512da8;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  height: 100%;
  min-height: 48px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

:deep(.wallet-adapter-button:hover) {
  background-color: #673ab7;
}

:deep(.wallet-adapter-button:not([disabled]):hover) {
  background-color: #673ab7;
}

:deep(.wallet-adapter-button[disabled]) {
  background-color: #9575cd;
  cursor: not-allowed;
  opacity: 0.7;
}

:deep(.wallet-adapter-button-trigger) {
  background-color: #512da8;
}

:deep(.wallet-adapter-dropdown) {
  position: relative;
}

:deep(.wallet-adapter-dropdown-list) {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 10px;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 0.5rem;
  z-index: 101;
  min-width: 200px;
}

:deep(.wallet-adapter-dropdown-list-item) {
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 4px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  text-align: left;
}

:deep(.wallet-adapter-dropdown-list-item:hover) {
  background-color: #f5f5f5;
}
</style> 