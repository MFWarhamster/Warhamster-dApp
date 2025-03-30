'use client';
import { useState } from 'react';

export default function ArmyBuilder() {
  const [armyName, setArmyName] = useState('My Warhamster Army');
  const [stacks, setStacks] = useState(6);
  const [stackCapacity, setStackCapacity] = useState(20);

  const handleArmyPurchase = () => {
    const cost = 25 * Math.pow(1.25, stacks - 6);
    if (confirm(`Purchase additional army for $${cost.toFixed(2)}?`)) {
      setStacks((prev) => prev + 1);
    }
  };

  return (
    <main className="container mx-auto py-10 text-center">
      <h1 className="text-4xl font-bold mb-8 text-white">Army Builder</h1>
      <section className="bg-gray-800 p-6 rounded shadow-lg inline-block">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">{armyName}</h2>
          <input
            className="px-4 py-2 rounded border border-gray-700 bg-gray-900 text-white w-full"
            type="text"
            value={armyName}
            onChange={(e) => setArmyName(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-purple-400 mb-2">Army Composition</h3>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(16)].map((_, idx) => (
              <div
                key={idx}
                className={`h-20 w-20 rounded flex items-center justify-center font-bold text-lg
                ${idx < stacks ? 'bg-green-500 text-gray-900' : 'bg-gray-700 text-gray-500'}`}
              >
                {idx < stacks ? stackCapacity : 'Locked'}
              </div>
            ))}
          </div>
          <button
            className="mt-4 bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded text-white"
            onClick={handleArmyPurchase}
          >
            Purchase Additional Army
          </button>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-purple-400 mb-2">Army Stats</h3>
          <div className="text-white">
            <p>Total Stacks: {stacks}</p>
            <p>Total Capacity: {stacks * stackCapacity}</p>
          </div>
        </div>
      </section>
    </main>
  );
}