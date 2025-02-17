'use client';
import { useState } from 'react';

export default function BridgeInterface() {
  const [bridgeAmount, setBridgeAmount] = useState('');
  const [fromChain, setFromChain] = useState('DOT');
  const [toChain, setToChain] = useState('ETH');

  const handleBridge = async () => {
    const response = await fetch('/api/bridge', {
      method: 'POST',
      body: JSON.stringify({ amount: bridgeAmount, fromChain, toChain }),
    });
    const data = await response.json();
    console.log('Bridge result:', data);
  };

  return (
    <div className="card-gradient p-8 rounded-2xl space-y-6">
      <h3 className="text-xl font-semibold">Cross-Chain Bridge</h3>
      
      <div className="flex items-center gap-4">
        <div className="flex-1 bg-gray-900/50 p-4 rounded-xl">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">From</span>
            <span className="text-purple-400">Balance: 10.2 DOT</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              className="text-2xl bg-transparent flex-1"
              value={bridgeAmount}
              onChange={(e) => setBridgeAmount(e.target.value)}
            />
            <select 
              className="chain-selector"
              value={fromChain}
              onChange={(e) => setFromChain(e.target.value)}
            >
              <option>DOT</option>
              <option>ETH</option>
            </select>
          </div>
        </div>

        <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
          ↔
        </button>

        <div className="flex-1 bg-gray-900/50 p-4 rounded-xl">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">To</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              readOnly
              className="text-2xl bg-transparent flex-1 text-gray-400"
              value={bridgeAmount}
            />
            <select
              className="chain-selector"
              value={toChain}
              onChange={(e) => setToChain(e.target.value)}
            >
              <option>ETH</option>
              <option>DOT</option>
            </select>
          </div>
        </div>
      </div>

      <button 
        onClick={handleBridge}
        className="w-full bg-cyan-600 hover:bg-cyan-700 py-4 rounded-xl font-bold"
      >
        Bridge Now
      </button>
    </div>
  );
}