"use client";

import { useEffect, useState } from 'react';

type GridUnit = {
  id: number;
  team: 'attacker' | 'defender';
  hp: number;
  position: { x: number; y: number };
};

const initialUnits: GridUnit[] = [
  { id: 1, team: 'attacker', hp: 100, position: { x: 0, y: 3 } },
  { id: 2, team: 'defender', hp: 100, position: { x: 7, y: 3 } },
];

export default function Gameplay() {
  const [units, setUnits] = useState<GridUnit[]>(initialUnits);
  const [turn, setTurn] = useState<'attacker' | 'defender'>('attacker');
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setUnits((prevUnits) => {
        const newUnits = [...prevUnits];
        const attacker = newUnits.find(u => u.team === 'attacker');
        const defender = newUnits.find(u => u.team === 'defender');

        if (attacker && defender) {
          const damage = Math.floor(Math.random() * 20) + 5;
          if (turn === 'attacker') {
            defender.hp -= damage;
            setLog(prev => [`Attacker dealt ${damage} damage`, ...prev]);
            setTurn('defender');
          } else {
            attacker.hp -= damage;
            setLog(prev => [`Defender dealt ${damage} damage`, ...prev]);
            setTurn('attacker');
          }

          if (attacker.hp <= 0 || defender.hp <= 0) {
            clearInterval(timer);
            setLog(prev => [
              `${attacker.hp <= 0 ? 'Defender' : 'Attacker'} wins! 🎉`,
              ...prev
            ]);
          }
        }
        return newUnits;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [turn]);

  const renderGrid = () => {
    const grid = Array.from({ length: 8 }, (_, y) =>
      Array.from({ length: 8 }, (_, x) => {
        const unit = units.find(u => u.position.x === x && u.position.y === y);
        return (
          <div key={`${x}-${y}`} className="w-12 h-12 border flex items-center justify-center bg-gray-700">
            {unit ? (
              <span className={`text-sm font-bold ${unit.team === 'attacker' ? 'text-green-400' : 'text-red-400'}`}>
                {unit.hp}
              </span>
            ) : null}
          </div>
        );
      })
    );

    return grid.map((row, idx) => (
      <div key={idx} className="flex">
        {row}
      </div>
    ));
  };

  return (
    <div className="container mx-auto text-white py-10">
      <h1 className="text-4xl font-bold text-center mb-4">Mock Battle Gameplay</h1>
      <div className="flex justify-center mb-6">
        <div className="grid grid-cols-8 gap-1 bg-gray-800 p-2 rounded-lg">
          {renderGrid()}
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg max-w-lg mx-auto">
        <h2 className="text-xl font-semibold">Battle Log</h2>
        <ul className="h-32 overflow-y-auto mt-2">
          {log.map((entry, idx) => (
            <li key={idx}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
