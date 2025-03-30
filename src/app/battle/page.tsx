"use client";

import { useState } from 'react';
import Link from 'next/link';

type BattleMode = 'Spar' | 'PvP' | 'Conquest' | null;

const modeDescriptions: Record<string, string> = {
  Spar: "Friendly match against a random opponent or NPC. No losses or rewards.",
  PvP: "Ranked battle against another player. NFTs lost are burned.",
  Conquest: "Attack worlds controlled by NPCs. Win worlds to earn daily rewards."
};

export default function Battle() {
  const [selectedMode, setSelectedMode] = useState<BattleMode>(null);

  return (
    <div className="container mx-auto py-16 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Warhamster 4K Battle Mode</h1>

      <div className="flex justify-center gap-4 mb-8">
        {(['Spar', 'PvP', 'Conquest'] as BattleMode[]).map(mode => (
          <button
            key={mode}
            onClick={() => setSelectedMode(mode)}
            className={`py-2 px-6 rounded ${
              selectedMode === mode ? 'bg-purple-700' : 'bg-gray-700 hover:bg-purple-500'
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {selectedMode ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-3xl font-bold mb-4">{selectedMode} Mode Selected</h2>
          <p className="mb-4">{modeDescriptions[selectedMode]}</p>
          <Link href="/battle/gameplay">
            <button className="bg-green-600 hover:bg-green-700 py-2 px-6 rounded">
              Launch Gameplay Demo
            </button>
          </Link>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg">Select a battle mode to view details and begin!</p>
        </div>
      )}
    </div>
  );
}

