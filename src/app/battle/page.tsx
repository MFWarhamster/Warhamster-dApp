// src/app/battle/page.tsx
"use client";
import { useState, useEffect } from 'react';

interface Stack {
  id: number;
  name: string;
  speed: number;
  hp: number;
  melee: number;
  ranged: number;
  position: number;
  movementCommand: 'Attack Melee' | 'Attack Ranged' | 'Hold Ground';
  targetCommand:
    | 'Highest HP'
    | 'Highest Melee'
    | 'Highest Ranged'
    | 'Highest Speed'
    | 'Lowest HP'
    | 'Lowest Melee'
    | 'Lowest Ranged'
    | 'Lowest Speed';
  owner: 'Attacker' | 'Defender';
}

export default function BattlePage() {
  const [round, setRound] = useState(1);
  const [log, setLog] = useState<string[]>([]);
  const [stacks, setStacks] = useState<Stack[]>([]);

  useEffect(() => {
    const attackerStacks: Stack[] = [
      { id: 1, name: "Attacker Alpha", speed: 9, hp: 100, melee: 30, ranged: 20, position: 1, movementCommand: 'Attack Melee', targetCommand: 'Lowest HP', owner: 'Attacker' },
    ];

    const defenderStacks: Stack[] = [
      { id: 101, name: "Defender Omega", speed: 8, hp: 100, melee: 25, ranged: 30, position: 8, movementCommand: 'Hold Ground', targetCommand: 'Highest Melee', owner: 'Defender' },
    ];

    setStacks([...attackerStacks, ...defenderStacks]);
    setLog([`Battle Started. Round ${round}`]);
  }, []);

  const performRound = () => {
    if (round > 16) return;

    const sortedStacks = [...stacks].sort((a, b) => b.speed - a.speed);

    sortedStacks.forEach(stack => {
      const enemyStacks = stacks.filter(enemy => enemy.owner !== stack.owner);
      if (!enemyStacks.length) return;

      if (stack.movementCommand !== 'Hold Ground') {
        if (stack.movementCommand === 'Attack Melee' && stack.position < 8 && stack.owner === 'Attacker') stack.position++;
        if (stack.movementCommand === 'Attack Melee' && stack.position > 1 && stack.owner === 'Defender') stack.position--;
        if (stack.movementCommand === 'Attack Ranged' && stack.owner === 'Attacker' && stack.position < 7) stack.position++;
        if (stack.movementCommand === 'Attack Ranged' && stack.owner === 'Defender' && stack.position > 2) stack.position--;
      }

      const adjacentPosition = stack.owner === 'Attacker' ? stack.position + 1 : stack.position - 1;
      const rangedPosition = stack.owner === 'Attacker' ? stack.position + 2 : stack.position - 2;

      const targets = enemyStacks.filter(enemy => enemy.position === adjacentPosition || enemy.position === rangedPosition);
      if (!targets.length) return;

      let target: Stack;
      switch (stack.targetCommand) {
        case 'Lowest HP':
          target = targets.reduce((prev, curr) => (curr.hp < prev.hp ? curr : prev));
          break;
        case 'Highest HP':
          target = targets.reduce((prev, curr) => (curr.hp > prev.hp ? curr : prev));
          break;
        default:
          target = targets[0];
      }

      const damage = stack.position === adjacentPosition ? stack.melee : stack.ranged;
      target.hp -= damage;

      setLog(prev => [...prev, `${stack.name} attacked ${target.name} for ${damage} damage.`]);

      if (target.hp <= 0) {
        setStacks(prev => prev.filter(s => s.id !== target.id));
        setLog(prev => [...prev, `${target.name} was destroyed!`]);
      }
    });

    setRound(prev => prev + 1);
    setLog(prev => [...prev, `Round ${round} completed.`]);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">Battle Demo (Round {round}/16)</h1>
      <button onClick={performRound} className="bg-purple-600 text-white px-4 py-2 rounded">Next Round</button>
      <div className="mt-4">
        {log.map((entry, index) => (
          <p key={index}>{entry}</p>
        ))}
      </div>
    </div>
  );
}

