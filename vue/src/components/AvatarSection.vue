<template>
  <div class="avatar" id="avatar">
    <div class="app">
      <div class="app__container _container">
        <div class="app__create">Create</div>
        <div class="app__title">
          <img src="../assets/img/Subtract3.png" alt />
          <img src="../assets/img/Subtract4.png" alt /> your AVATAR Now
        </div>
        <div class="app__wp">
          <div class="app__left left-app">
            <div class="left-app__tp">
              <img src="../assets/img/avatar.svg" alt />
              <img src="../assets/img/Subtract.png" alt />
            </div>
            <div class="left-app__wp">
              <div class="left-app__start-img">
                <img src="../assets/img/Group36.png" alt />
              </div>
              <div class="left-app__generating _display-none">
                <p>
                  3D model generation may take <br />
                  up to 5 minutes
                </p>
                <div>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div class="left-app__confirm _display-none">
                <div v-for="i in 4" :key="i">
                  <input
                    type="checkbox"
                    :name="'confirm' + i"
                    :id="'confirm' + i"
                    v-model="selectedImages[i - 1]"
                    @change="handleImageSelection(i - 1)"
                  />
                  <label :for="'confirm' + i">
                    <div class="left-app__pluss">
                      <img src="../assets/img/plus.png" alt />
                    </div>
                    <img
                      :src="previewImages[i - 1] || '../assets/img/Group36.png'"
                      :alt="'Preview ' + i"
                      :data-gen-id="generationId"
                      :data-task-id="i - 1"
                    />
                    <div class="left-app__check"></div>
                  </label>
                </div>
              </div>
              <div class="left-app__ready _display-none">
                <video
                  v-if="finalVideoUrl"
                  :src="finalVideoUrl"
                  autoplay
                  loop
                  muted
                  style="width: 100%"
                ></video>
                <div v-if="nftMinted">
                  <span>nft <b>minted!</b></span>
                  <img src="../assets/img/Subtract2.png" alt />
                </div>
              </div>
            </div>
          </div>
          <div class="app__right right-app">
            <div class="right-app__top">
              <span>Menu</span>
            </div>
            <form class="right-app__start" @submit.prevent="startGeneration">
              <label>Describe the 3D model you want to create</label>
              <input
                id="prompt-input"
                v-model="promptInput"
                type="text"
                placeholder="Sample text"
              />
              <button type="submit" :disabled="isGenerating">Create</button>
            </form>
            <div class="right-app__confirm _display-none">
              <div class="right-app__head"><span>Confirm</span> your chosen model?</div>
              <button class="_black" @click="goBack">
                <img src="../assets/img/b1.png" alt /> No, I want to change my choice
              </button>
              <button @click="generateTexture">
                <img src="../assets/img/b2.png" alt /> Generate Texture
              </button>
            </div>
            <div class="right-app__description _display-none">
              <label>NFT Title</label>
              <input type="text" v-model="nftTitle" placeholder="Enter NFT title" />
              <label>Description</label>
              <input type="text" v-model="nftDescription" placeholder="Enter NFT description" />
            </div>
            <div class="right-app__btns right-app__btns_1" v-if="currentStep === 3 && !downloading">
              <WalletConnect />
              <!-- :disabled="!canMint" -->
              <button v-if="!nftMinted" @click="handleMintNFT">
                {{ isMinting ? "Minting..." : "Mint" }}
              </button>
              <button v-else @click="checkNFT" class="check-nft-btn">Check NFT</button>
              <button class="_download-btn" @click="downloading = true">
                <img src="../assets/img/b3.png" alt /> Download
              </button>
            </div>
            <div class="right-app__btns right-app__btns_2" v-if="currentStep === 3 && downloading">
              <button @click="downloadGLB">GLB</button>
              <button @click="downloadOBJ">OBJ</button>
              <button @click="downloadMP4">MP4</button>
              <button class="_black _back-btn" @click="downloading = false">
                <img src="../assets/img/b1.png" alt /> Go back
              </button>
            </div>
          </div>
          <div class="app__ready ready-app _display-none">
            <div class="ready-app__title">{{ nftTitle }}</div>
            <div class="ready-app__description">{{ nftDescription }}</div>
            <button class="ready-app__check" @click="checkNFT">Check NFT</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import { NFTService } from "../services/nft.service.js";
import { inject } from "vue";
import { ref, computed, watch, onMounted } from "vue";
import { useWallet } from "solana-wallets-vue";
import { mintNFT } from "../services/nft.service";
import WalletConnect from "./WalletConnect.vue";

export default {
  name: "AvatarSection",
  components: {
    WalletConnect,
  },
  setup() {
    const { connected, wallet: solanaWallet, publicKey, connect } = useWallet();
    const isMinting = ref(false);
    const currentStep = ref(1);
    const downloading = ref(false);
    const nftMinted = ref(false);
    const generationId = ref(null);
    const nftTitle = ref("");
    const nftDescription = ref("");
    const promptInput = ref("");
    const isGenerating = ref(false);
    const selectedImages = ref([false, false, false, false]);
    const previewImages = ref(["", "", "", ""]);
    const selectedVersion = ref(null);
    const finalVideoUrl = ref("");
    const finalModelUrl = ref("");
    const modelUrls = ref({});
    const host = window.location.hostname === "localhost" ? "http://localhost:8000/api" : "/api";
    const isWalletReady = ref(false);
    const nftAddress = ref(null);

    const validateWalletState = () => {
      const state = {
        connected: connected.value,
        hasWallet: !!solanaWallet.value,
        hasAdapter: !!solanaWallet.value?.adapter,
        readyState: solanaWallet.value?.readyState,
        hasPublicKey: !!publicKey.value,
        publicKey: publicKey.value?.toBase58(),
      };

      console.log("Validating wallet state:", state);

      isWalletReady.value =
        state.connected &&
        state.hasWallet &&
        state.hasAdapter &&
        state.readyState === "Installed" &&
        state.hasPublicKey;

      return isWalletReady.value;
    };

    const canMint = computed(() => {
      return (
        isWalletReady.value && currentStep.value === 3 && !downloading.value && !nftMinted.value
      );
    });

    const handleMintNFT = async () => {
      console.log("handleMintNFT");
      document.querySelector(".left-app__tp").classList.add("_display-none");
      nftMinted.value = true;

      if (!canMint.value) {
        console.log("Cannot mint. State:", {
          walletReady: isWalletReady.value,
          connected: connected.value,
          wallet: solanaWallet.value
            ? {
                adapter: !!solanaWallet.value.adapter,
                readyState: solanaWallet.value.readyState,
                publicKey: publicKey.value?.toBase58(),
              }
            : null,
          publicKey: publicKey.value?.toBase58(),
          currentStep: currentStep.value,
          downloading: downloading.value,
          nftMinted: nftMinted.value,
        });
        return;
      }

      isMinting.value = true;
      try {
        // Ensure we have valid model data
        if (!finalVideoUrl.value || !modelUrls.value || !modelUrls.value.glb) {
          throw new Error("Model data is not ready. Please ensure the model is fully generated.");
        }

        // Create model data object from current state
        const currentModelData = {
          mp4: finalVideoUrl.value,
          models: modelUrls.value,
        };

        console.log("Using model data for NFT:", currentModelData);

        // Ensure wallet is in valid state
        if (!validateWalletState()) {
          console.log("Attempting to reconnect wallet...");
          try {
            await connect();

            // Wait for wallet state to stabilize
            await new Promise((resolve) => setTimeout(resolve, 1000));

            if (!validateWalletState()) {
              throw new Error("Wallet connection failed - invalid state");
            }

            console.log("Wallet reconnected successfully");
          } catch (error) {
            console.error("Failed to reconnect wallet:", error);
            alert("Please connect your wallet first");
            return;
          }
        }

        // Create a proper wallet object for minting
        const adapter = solanaWallet.value.adapter;
        const mintWallet = {
          adapter,
          publicKey: publicKey.value,
          signTransaction: async (tx) => {
            return await adapter.signTransaction(tx);
          },
          signAllTransactions: async (txs) => {
            return await adapter.signAllTransactions(txs);
          },
          signMessage: async (msg) => {
            return await adapter.signMessage(msg);
          },
          readyState: adapter.readyState,
        };

        console.log("Proceeding with NFT minting. Wallet status:", {
          walletReady: isWalletReady.value,
          connected: connected.value,
          wallet: {
            adapter: !!mintWallet.adapter,
            readyState: mintWallet.readyState,
            publicKey: mintWallet.publicKey?.toBase58(),
          },
          publicKey: publicKey.value?.toBase58(),
        });

        const mintedAddress = await mintNFT(
          mintWallet,
          generationId.value,
          nftTitle.value || "Avatar NFT",
          nftDescription.value || "A unique 3D avatar NFT",
          currentModelData
        );

        console.log("NFT minted successfully:", mintedAddress);
        nftAddress.value = mintedAddress;
        nftMinted.value = true;
        document.querySelector(".app__ready").classList.remove("_display-none");
        alert("NFT successfully minted!");
      } catch (error) {
        console.error("Error minting NFT:", error);
        alert(`Failed to mint NFT: ${error.message}`);
      } finally {
        isMinting.value = false;
      }
    };

    // Watch for wallet connection changes
    watch([connected, solanaWallet, publicKey], () => {
      console.log("Wallet state changed:", {
        connected: connected.value,
        wallet: solanaWallet.value
          ? {
              adapter: !!solanaWallet.value.adapter,
              readyState: solanaWallet.value.readyState,
            }
          : null,
        publicKey: publicKey.value?.toBase58(),
      });
      validateWalletState();
    });

    onMounted(() => {
      validateWalletState();
    });

    const checkNFT = () => {
      if (nftAddress.value) {
        // Открываем страницу NFT в Solscan (devnet)
        window.open(`https://solscan.io/token/${nftAddress.value}?cluster=devnet`, "_blank");
      } else if (publicKey.value) {
        // Если NFT адрес не найден, открываем страницу кошелька
        window.open(`https://solscan.io/account/${publicKey.value}?cluster=devnet`, "_blank");
      }
    };

    return {
      connected,
      solanaWallet,
      publicKey,
      isWalletReady,
      isMinting,
      currentStep,
      downloading,
      nftMinted,
      generationId,
      nftTitle,
      nftDescription,
      promptInput,
      isGenerating,
      selectedImages,
      previewImages,
      selectedVersion,
      finalVideoUrl,
      finalModelUrl,
      modelUrls,
      host,
      canMint,
      handleMintNFT,
      nftAddress,
      checkNFT,
    };
  },
  data() {
    return {
      // ... existing data properties ...
    };
  },
  computed: {
    // ... existing computed properties ...
  },
  methods: {
    showConfirm() {
      document.querySelector(".left-app__generating").classList.add("_display-none");
      document.querySelector(".left-app__confirm").classList.remove("_display-none");
      document.querySelector(".right-app__confirm").classList.remove("_display-none");
    },
    showTexture() {
      document.querySelector(".left-app__generating").classList.add("_display-none");
      document.querySelector(".left-app__ready").classList.remove("_display-none");
      document.querySelector(".right-app__confirm").classList.add("_display-none");
      document.querySelector(".right-app__description").classList.remove("_display-none");
    },
    async startGeneration() {
      if (!this.promptInput.trim()) return;

      this.isGenerating = true;
      document.querySelector(".left-app__start-img").classList.add("_display-none");
      document.querySelector(".left-app__generating").classList.remove("_display-none");
      document.querySelector(".right-app__start").classList.add("_display-none");

      //try {
      //  const response = await fetch(
      //    `${this.host}/preview_generate/${encodeURIComponent(this.promptInput)}`
      //  );
      //  const data = await response.json();
      //  this.generationId = data.gen_id;

      //  const finalStatus = await this.pollStatus(this.generationId);

      //  if (finalStatus === "error") {
      //    alert("Generation failed. Please try again.");
      //    return;
      //  }

      //  const results = await this.getPreviewResults(this.generationId);
      //  if (results && Object.keys(results).length > 0) {
      //    Object.values(results).forEach((result, index) => {
      //      if (index < this.previewImages.length) {
      //        this.previewImages[index] = result.thumbnail_url;
      //      }
      //    });

      //    this.showConfirm();

      //    this.currentStep = 2;
      //  }
      //} catch (error) {
      //  console.error("Error during generation:", error);
      //  alert("An error occurred. Please try again.");
      //} finally {
      //  this.isGenerating = false;
      //}
      this.currentStep = 2;
      this.showConfirm();
    },
    async pollStatus(genId) {
      while (true) {
        const status = await this.checkStatus(genId);
        if (status !== "generate") {
          return status;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    },
    async checkStatus(genId) {
      try {
        const response = await fetch(`${this.host}/status/${genId}`);
        const data = await response.json();
        return data.status;
      } catch (error) {
        console.error("Error checking status:", error);
        return "error";
      }
    },
    async getPreviewResults(genId) {
      try {
        const response = await fetch(`${this.host}/commonPreview/${genId}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error getting preview results:", error);
        return null;
      }
    },
    handleImageSelection(index) {
      this.selectedImages = this.selectedImages.map((_, i) => i === index);
      this.selectedVersion = index;
    },
    async generateTexture() {
      if (this.selectedVersion === null) {
        alert("Please select one of the preview images first");
        return;
      }

      this.isGenerating = true;
      document.querySelector(".left-app__confirm").classList.add("_display-none");
      document.querySelector(".left-app__generating").classList.remove("_display-none");

      this.showTexture();
      this.currentStep = 3;

      //try {
      //  const response = await fetch(
      //    `${this.host}/refine_generate/${this.generationId}/${this.selectedVersion}`
      //  );
      //  const data = await response.json();

      //  const finalStatus = await this.pollStatus(this.generationId);

      //  if (finalStatus === "error") {
      //    alert("Generation failed. Please try again.");
      //    return;
      //  }

      //  const refineResponse = await fetch(`${this.host}/commonRefine/${this.generationId}`);
      //  const refineData = await refineResponse.json();
      //  this.modelUrls = refineData.models;

      //  if (refineData.models && refineData.mp4) {
      //    this.finalModelUrl = refineData.url;
      //    this.finalVideoUrl = refineData.mp4;
      //    this.showTexture();
      //    this.currentStep = 3;
      //  }
      //} catch (error) {
      //  console.error("Error during texture generation:", error);
      //  alert("An error occurred during texture generation. Please try again.");
      //} finally {
      //  this.isGenerating = false;
      //}
    },
    goBack() {
      this.currentStep = 1;
      this.selectedVersion = null;
      this.selectedImages = [false, false, false, false];
      document.querySelector(".left-app__confirm").classList.add("_display-none");
      document.querySelector(".left-app__start-img").classList.remove("_display-none");
      document.querySelector(".right-app__confirm").classList.add("_display-none");
      document.querySelector(".right-app__start").classList.remove("_display-none");
    },
    downloadGLB() {
      if (this.modelUrls.glb) {
        window.open(this.modelUrls.glb, "_blank");
      }
    },
    downloadOBJ() {
      if (this.modelUrls.obj) {
        window.open(this.modelUrls.obj, "_blank");
      }
    },
    downloadMP4() {
      if (this.finalVideoUrl) {
        window.open(this.finalVideoUrl, "_blank");
      }
    },
  },
};
</script>
