"use client";

import { useState } from 'react';

interface NFT {
  id: number;
  name: string;
  tier: string;
  hp: number;
  melee: number;
  range: number;
  speed: number;
  cost: number;
}

const mockNFTs: NFT[] = [
  { id: 1, name: "Hamsterus Rex", tier: "S", hp: 100, melee: 50, range: 20, speed: 40, cost: 10 },
  { id: 2, name: "General Chewbacca", tier: "A", hp: 80, melee: 40, range: 15, speed: 35, cost: 6 },
  { id: 3, name: "Legionnaire Fuzzy", tier: "B", hp: 60, melee: 30, range: 10, speed: 30, cost: 5 },
  { id: 4, name: "Scout Fluff", tier: "C", hp: 40, melee: 20, range: 5, speed: 20, cost: 2 },
];

export default function ArmyBuilder() {
  const [selectedStack, setSelectedStack] = useState<NFT[]>([]);
  const [stackCapacity, setStackCapacity] = useState(20);

  const toggleNFT = (nft: NFT) => {
    const isSelected = selectedStack.some(item => item.id === nft.id);
    const newStack = isSelected
      ? selectedStack.filter(item => item.id !== nft.id)
      : [...selectedStack, nft];

    const totalCost = newStack.reduce((sum, nft) => sum + nft.cost, 0);
    if (totalCost <= stackCapacity) {
      setSelectedStack(newStack);
    } else {
      alert("Stack capacity exceeded!");
    }
  };

  const calculateStats = () => {
    return selectedStack.reduce((acc, nft) => ({
      hp: acc.hp + nft.hp,
      melee: acc.melee + nft.melee,
      range: acc.range + nft.range,
      speed: acc.speed + nft.speed,
      cost: acc.cost + nft.cost
    }), { hp: 0, melee: 0, range: 0, speed: 0, cost: 0 });
  };

  const stats = calculateStats();

  return (
    <div className="container mx-auto py-16 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Army Builder</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Your NFTs</h2>
          {mockNFTs.map(nft => (
            <div key={nft.id} className="flex justify-between items-center mb-2">
              <div>
                <strong>{nft.name}</strong> ({nft.tier}-Tier) | Cost: {nft.cost}
              </div>
              <button
                onClick={() => toggleNFT(nft)}
                className={`py-1 px-3 rounded ${selectedStack.some(item => item.id === nft.id) ? 'bg-red-500' : 'bg-green-500'}`}
              >
                {selectedStack.some(item => item.id === nft.id) ? 'Remove' : 'Add'}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Stack Details</h2>
          <p><strong>Capacity Used:</strong> {stats.cost}/{stackCapacity}</p>
          <p><strong>HP:</strong> {stats.hp}</p>
          <p><strong>Melee:</strong> {stats.melee}</p>
          <p><strong>Range:</strong> {stats.range}</p>
          <p><strong>Speed:</strong> {stats.speed}</p>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Selected NFTs:</h3>
            {selectedStack.length === 0 && <p>No NFTs selected.</p>}
            <ul>
              {selectedStack.map(nft => (
                <li key={nft.id}>✅ {nft.name} ({nft.tier}-Tier)</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
