import { Connection, clusterApiUrl } from "@solana/web3.js";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { generateSigner } from '@metaplex-foundation/umi';
import { createNft, mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';

// Use Devnet connection
const endpoint = clusterApiUrl('devnet');
const connection = new Connection(endpoint);
const umi = createUmi(endpoint).use(mplTokenMetadata());

export const createMetadata = async (genId, nftName, nftDescription, modelData) => {
  try {
    console.log('Starting metadata creation for genId:', genId);
    
    if (!modelData || !modelData.mp4 || !modelData.models || !modelData.models.glb) {
      throw new Error('Invalid model data provided');
    }

    console.log('Using existing model data:', modelData);

    const metadata = {
      name: nftName || "Avatar NFT",
      description: nftDescription || "A unique 3D avatar NFT with animated preview",
      image: modelData.mp4,
      animation_url: modelData.mp4,
      external_url: window.location.origin,
      properties: {
        files: [
          {
            uri: modelData.mp4,
            type: "video/mp4"
          },
          {
            uri: modelData.models.glb,
            type: "model/gltf-binary"
          }
        ],
        category: "video"
      }
    };

    console.log('Created metadata:', metadata);

    console.log('Uploading metadata to server...');
    const uploadResponse = await fetch('/api/upload_metadata.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        genId: genId,
        metadata: metadata
      })
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error('Upload response error:', errorText);
      throw new Error(`Failed to upload metadata: ${uploadResponse.status} ${uploadResponse.statusText}`);
    }

    const uploadResult = await uploadResponse.json();
    console.log('Upload result:', uploadResult);

    if (!uploadResult.success) {
      throw new Error(uploadResult.error || 'Failed to upload metadata');
    }

    console.log('Metadata successfully uploaded, URL:', uploadResult.url);
    return { metadata, metadataUrl: uploadResult.url };
  } catch (error) {
    console.error('Error creating metadata:', error);
    throw error;
  }
};

export const mintNFT = async (wallet, genId, nftName, nftDescription, modelData) => {
  try {
    console.log('Starting mintNFT with wallet:', {
      hasWallet: !!wallet,
      hasAdapter: !!wallet?.adapter,
      hasPublicKey: !!wallet?.publicKey,
      publicKeyStr: wallet?.publicKey?.toBase58(),
      readyState: wallet?.readyState,
      connected: wallet?.adapter?.connected,
      hasSignTransaction: typeof wallet?.signTransaction === 'function',
      hasSignAllTransactions: typeof wallet?.signAllTransactions === 'function',
      hasSignMessage: typeof wallet?.signMessage === 'function'
    })
    
    // Validate wallet object
    if (!wallet || !wallet.adapter || !wallet.publicKey || 
        !wallet.signTransaction || !wallet.signAllTransactions) {
      console.error('Invalid wallet object:', {
        hasWallet: !!wallet,
        hasAdapter: !!wallet?.adapter,
        hasPublicKey: !!wallet?.publicKey,
        hasSignTransaction: typeof wallet?.signTransaction === 'function',
        hasSignAllTransactions: typeof wallet?.signAllTransactions === 'function',
        readyState: wallet?.readyState
      })
      throw new Error('Invalid wallet configuration')
    }

    // Ensure wallet is connected
    if (!wallet.adapter.connected || wallet.readyState !== 'Installed') {
      console.error('Wallet not properly connected:', {
        connected: wallet.adapter.connected,
        readyState: wallet.readyState
      })
      throw new Error('Wallet is not properly connected')
    }

    const { metadata, metadataUrl } = await createMetadata(genId, nftName, nftDescription, modelData)
    console.log('Created metadata:', metadata)
    console.log('Metadata URL:', metadataUrl)

    // Configure UMI with wallet
    umi.use(walletAdapterIdentity({
      publicKey: wallet.publicKey,
      signTransaction: async (tx) => {
        return await wallet.signTransaction(tx);
      },
      signAllTransactions: async (txs) => {
        return await wallet.signAllTransactions(txs);
      },
      signMessage: async (msg) => {
        return await wallet.signMessage(msg);
      }
    }))

    const mint = generateSigner(umi)
    console.log('Generated mint signer')

    console.log('Creating NFT with parameters:', {
      mint: mint.publicKey,
      name: metadata.name,
      uri: metadataUrl,
      wallet: wallet.publicKey.toBase58()
    })

    await createNft(umi, {
      mint,
      name: metadata.name,
      uri: metadataUrl,
      sellerFeeBasisPoints: 500,
    }).sendAndConfirm(umi)

    console.log('NFT Created with address:', mint.publicKey)
    return mint.publicKey
    } catch (error) {
      console.error('Error minting NFT:', error)
      throw error
  }
} 