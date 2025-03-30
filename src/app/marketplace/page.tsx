"use client";

import { useState } from 'react';

interface NFT {
  id: number;
  name: string;
  tier: string;
  image: string;
  price: number;
}

const mockNFTs: NFT[] = [
  { id: 1, name: "Hamsterus Rex", tier: "S-Tier", image: "/nft1.webp", price: 150 },
  { id: 2, name: "General Chewbacca", tier: "A-Tier", image: "/nft2.webp", price: 75 },
  { id: 3, name: "Legionnaire Fuzzy", tier: "B-Tier", image: "/nft3.webp", price: 30 },
  { id: 4, name: "Scout Fluff", tier: "C-Tier", image: "/nft4.webp", price: 10 },
];

export default function Marketplace() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [purchasedNFTs, setPurchasedNFTs] = useState<NFT[]>([]);

  const mockConnectWallet = () => setWalletConnected(true);

  const purchaseNFT = (nft: NFT) => {
    setPurchasedNFTs([...purchasedNFTs, nft]);
  };

  return (
    <div className="container mx-auto text-white py-16">
      <h1 className="text-4xl font-bold text-center mb-4">Warhamster 4K NFT Marketplace</h1>
      <p className="text-lg text-center mb-8">Browse and purchase exclusive Warhamster NFTs.</p>

      {!walletConnected ? (
        <div className="flex justify-center">
          <button
            onClick={mockConnectWallet}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded"
          >
            Connect Phantom Wallet (Mock)
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockNFTs.map((nft) => (
              <div key={nft.id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <img src={nft.image} alt={nft.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{nft.name}</h3>
                  <p className="text-sm text-purple-400 mb-2">{nft.tier}</p>
                  <p className="text-lg font-bold mb-4">{nft.price} SOL</p>
                  <button
                    onClick={() => purchaseNFT(nft)}
                    className="bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded"
                  >
                    Buy (Mock)
                  </button>
                </div>
              </div>
            ))}
          </div>

          {purchasedNFTs.length > 0 && (
            <div className="mt-8 bg-gray-800 p-4 rounded shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Purchased NFTs (Mock)</h2>
              <ul>
                {purchasedNFTs.map((nft, index) => (
                  <li key={index} className="text-green-300">
                    ✅ {nft.name} ({nft.tier})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
