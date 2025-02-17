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
    <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-2xl space-y-4">
      <h3 className="text-2xl font-bold text-white mb-4">Cross-Chain Bridge</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="number"
          className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Amount"
          value={bridgeAmount}
          onChange={(e) => setBridgeAmount(e.target.value)}
        />
        <select 
          className="px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={fromChain}
          onChange={(e) => setFromChain(e.target.value)}
        >
          <option>DOT</option>
          <option>ETH</option>
        </select>
        <select 
          className="px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={toChain}
          onChange={(e) => setToChain(e.target.value)}
        >
          <option>ETH</option>
          <option>DOT</option>
        </select>
      </div>
      <button 
        onClick={handleBridge}
        className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 rounded-lg font-semibold text-white transition-all duration-200"
      >
        Bridge Tokens
      </button>
    </div>
  );
}