"use client";

import { useEffect, useState } from 'react';
import { initializeGame, executeRound, checkVictory, NFTStack, GameState } from '@/lib/gameEngine';

export default function GameplayDemo() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  const attackerStacks: NFTStack[] = [
    { id: 1, name: "Attacker Alpha", hp: 120, melee: 25, ranged: 10, speed: 15, cost: 5, gridPosition: 1, movementCommand: 'Attack Melee', targetCommand: 'Lowest HP', isAttacker: true },
    { id: 2, name: "Attacker Beta", hp: 80, melee: 15, ranged: 20, speed: 12, cost: 5, gridPosition: 1, movementCommand: 'Attack Ranged', targetCommand: 'Highest HP', isAttacker: true },
  ];

  const defenderStacks: NFTStack[] = [
    { id: 101, name: "Defender Omega", hp: 150, melee: 20, ranged: 10, speed: 10, cost: 5, gridPosition: 8, movementCommand: 'Hold Ground', targetCommand: 'Highest HP', isAttacker: false },
    { id: 102, name: "Defender Sigma", hp: 100, melee: 15, ranged: 15, speed: 8, cost: 5, gridPosition: 8, movementCommand: 'Hold Ground', targetCommand: 'Lowest HP', isAttacker: false },
  ];

  useEffect(() => {
    const state = initializeGame(attackerStacks, defenderStacks);
    setGameState(state);
  }, []);

  useEffect(() => {
    if (!gameState || winner) return;

    const interval = setInterval(() => {
      setGameState((prevState) => {
        if (!prevState) return null;
        const updatedState = executeRound(prevState);
        const result = checkVictory(updatedState);
        if (result !== 'ongoing') {
          setWinner(result);
          clearInterval(interval);
        }
        return { ...updatedState };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, winner]);

  return (
    <div className="container mx-auto text-white py-10">
      <h1 className="text-4xl font-bold text-center mb-6">Warhamster 4K Battle Simulation</h1>

      <div className="flex justify-center items-start space-x-1">
        {gameState?.grid.map((cell, idx) => (
          <div key={idx} className="w-32 h-48 bg-gray-800 rounded-md border border-gray-600 p-2 overflow-y-auto">
            <div className="font-semibold text-center mb-2 text-sm">Grid {idx + 1}</div>
            {cell.stacks.map((stack) => (
              <div key={stack.id} className={`mb-1 text-xs p-1 rounded-sm ${stack.isAttacker ? 'bg-green-600' : 'bg-red-600'}`}>
                <div className="font-bold truncate">{stack.name}</div>
                <div>HP: {stack.hp}</div>
                <div className="text-[10px]">{stack.movementCommand}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <h2 className="text-lg font-semibold">Round {gameState?.round || 1} / 16</h2>
        {winner && (
          <h3 className="text-2xl font-bold mt-2">
            {winner === 'attacker' ? '🎉 Attacker Wins!' : '🛡️ Defender Survived!'}
          </h3>
        )}
      </div>
    </div>
  );
}

