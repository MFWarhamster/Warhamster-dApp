"use client";

import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';

export default function Profile() {
  const { publicKey, connected, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [twitter, setTwitter] = useState("");
  const [telegram, setTelegram] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      if (!publicKey) return;

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('wallet_address', publicKey.toBase58())
        .single();

      if (data) {
        setUsername(data.username);
        setBio(data.bio);
        setTwitter(data.twitter);
        setTelegram(data.telegram);
      }
    }

    fetchProfile();
  }, [publicKey]);

  async function saveProfile() {
    if (!publicKey) return;
    setLoading(true);

    await supabase.from('profiles').upsert({
      wallet_address: publicKey.toBase58(),
      username,
      bio,
      twitter,
      telegram,
    });

    setLoading(false);
    alert("Profile saved successfully!");
  }

  return (
    <div className="container mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Player Profile</h1>
      <div className="bg-gray-800 shadow-md rounded-xl p-6 flex flex-col gap-4">
        <div>
          <span className="text-gray-400">Username:</span>
          <input className="ml-2 bg-gray-700 rounded px-2 py-1 text-white" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div>
          <span className="text-gray-400">Wallet:</span>
          {connected ? (
            <>
              <span className="ml-2 font-mono">{publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}</span>
              <button className="ml-4 text-purple-400 hover:text-red-400" onClick={() => disconnect()}>Disconnect</button>
            </>
          ) : (
            <button className="ml-2 text-purple-400 hover:text-purple-600" onClick={() => setVisible(true)}>Connect Wallet</button>
          )}
        </div>

        <div>
          <span className="text-gray-400">Bio:</span>
          <textarea className="ml-2 bg-gray-700 rounded px-2 py-1 w-full text-white" value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>

        <div className="flex gap-4">
          <div>
            <span className="text-gray-400">Twitter:</span>
            <input className="ml-2 bg-gray-700 rounded px-2 py-1 text-white" placeholder="Twitter handle" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
          </div>
          <div>
            <span className="text-gray-400">Telegram:</span>
            <input className="ml-2 bg-gray-700 rounded px-2 py-1 text-white" placeholder="Telegram username" value={telegram} onChange={(e) => setTelegram(e.target.value)} />
          </div>
        </div>

        <button
          className="self-end bg-purple-600 hover:bg-purple-700 text-white rounded px-4 py-2"
          onClick={saveProfile}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
}


