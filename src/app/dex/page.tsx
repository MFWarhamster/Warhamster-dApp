"use client";

import { useState, useEffect } from 'react';

interface Balances {
  SOL: number;
  WAR4K: number;
}

export default function DEX() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [balances, setBalances] = useState<Balances | null>(null);
  const [solAmount, setSolAmount] = useState(0);
  const [war4kAmount, setWar4kAmount] = useState(0);
  const [solPrice, setSolPrice] = useState(120); // Simulated price in USD
  const [war4kPrice, setWar4kPrice] = useState(0.05); // Simulated price in USD
  const [swapDirection, setSwapDirection] = useState<'SOLtoWAR4K' | 'WAR4KtoSOL'>('SOLtoWAR4K');

  const mockConnectWallet = () => {
    setWalletConnected(true);
    setBalances({ SOL: 10.5, WAR4K: 5000 });
  };

  useEffect(() => {
    // Simulate fetching updated prices every 5 seconds
    const interval = setInterval(() => {
      setSolPrice(prev => +(prev + (Math.random() - 0.5)).toFixed(2));
      setWar4kPrice(prev => +(prev + (Math.random() * 0.01 - 0.005)).toFixed(4));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSwap = () => {
    if (!balances) return;

    if (swapDirection === 'SOLtoWAR4K' && solAmount <= balances.SOL) {
      const war4kReceived = (solAmount * solPrice) / war4kPrice;
      setBalances({
        SOL: +(balances.SOL - solAmount).toFixed(4),
        WAR4K: +(balances.WAR4K + war4kReceived).toFixed(2),
      });
    } else if (swapDirection === 'WAR4KtoSOL' && war4kAmount <= balances.WAR4K) {
      const solReceived = (war4kAmount * war4kPrice) / solPrice;
      setBalances({
        SOL: +(balances.SOL + solReceived).toFixed(4),
        WAR4K: +(balances.WAR4K - war4kAmount).toFixed(2),
      });
    }

    // Reset amounts after swap
    setSolAmount(0);
    setWar4kAmount(0);
  };

  return (
    <div className="container mx-auto text-white py-16">
      <h1 className="text-4xl font-bold text-center mb-4">Warhamster 4K DEX</h1>
      <p className="text-lg text-center mb-8">Trade WAR4K tokens and Solana seamlessly.</p>

      <div className="flex flex-col items-center gap-4">
        {!walletConnected ? (
          <button
            onClick={mockConnectWallet}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded"
          >
            Connect Phantom Wallet (Mock)
          </button>
        ) : (
          <>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm">
              <h2 className="text-2xl font-semibold mb-4">Wallet Connected ✅</h2>
              <p><strong>SOL Balance:</strong> {balances?.SOL}</p>
              <p><strong>WAR4K Balance:</strong> {balances?.WAR4K}</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm">
              <h3 className="text-xl font-semibold mb-4">Current Prices (Mocked)</h3>
              <p>1 SOL = ${solPrice.toFixed(2)} USD</p>
              <p>1 WAR4K = ${war4kPrice.toFixed(4)} USD</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm">
              <h3 className="text-xl font-semibold mb-4">Swap Tokens</h3>
              <div className="mb-4">
                <select
                  value={swapDirection}
                  onChange={(e) => setSwapDirection(e.target.value as 'SOLtoWAR4K' | 'WAR4KtoSOL')}
                  className="bg-gray-700 text-white py-2 px-4 rounded w-full"
                >
                  <option value="SOLtoWAR4K">SOL ➡️ WAR4K</option>
                  <option value="WAR4KtoSOL">WAR4K ➡️ SOL</option>
                </select>
              </div>

              {swapDirection === 'SOLtoWAR4K' ? (
                <input
                  type="number"
                  placeholder="Amount of SOL"
                  value={solAmount}
                  onChange={(e) => setSolAmount(+e.target.value)}
                  className="bg-gray-700 text-white py-2 px-4 rounded w-full mb-4"
                />
              ) : (
                <input
                  type="number"
                  placeholder="Amount of WAR4K"
                  value={war4kAmount}
                  onChange={(e) => setWar4kAmount(+e.target.value)}
                  className="bg-gray-700 text-white py-2 px-4 rounded w-full mb-4"
                />
              )}

              <button
                onClick={handleSwap}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded w-full"
              >
                Swap (Mock)
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}




