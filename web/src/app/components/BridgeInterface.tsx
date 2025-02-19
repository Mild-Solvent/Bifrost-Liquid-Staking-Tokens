'use client';
import { useState, useRef } from 'react';
import SuccessPopup from './SuccessPopup';

export default function BridgeInterface({ onBridgeSuccess }: { onBridgeSuccess?: () => void }) {
  const [bridgeAmount, setBridgeAmount] = useState('');
  const [fromChain, setFromChain] = useState('DOT');
  const [toChain, setToChain] = useState('ETH');
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const modalAmountRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file if needed
    } else {
      setShowAmountModal(true);
    }
  };

  const confirmBridgeAmount = () => {
    if (modalAmountRef.current) {
      setBridgeAmount(modalAmountRef.current.value);
      setShowAmountModal(false);
      handleBridge(); // Trigger the bridge action
    }
  };

  const handleBridge = async () => {
    const response = await fetch('/api/bridge', {
      method: 'POST',
      body: JSON.stringify({ amount: bridgeAmount, fromChain, toChain }),
    });
    const data = await response.json();
    console.log('Bridge result:', data);
    setShowSuccess(true);
    onBridgeSuccess?.();
  };

  return (
    <div className="card-gradient p-8 rounded-2xl space-y-6 relative">
      <div 
        className={`absolute inset-0 rounded-2xl border-2 border-dashed pointer-events-none ${
          dragActive ? 'border-purple-500 bg-purple-500/10' : 'border-transparent'
        } transition-all z-10`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      />

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

      {showAmountModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="bg-gray-900 p-6 rounded-xl w-96 space-y-4">
            <h3 className="text-lg font-semibold">Bridge Amount</h3>
            <input
              ref={modalAmountRef}
              type="number"
              className="w-full bg-gray-800 p-3 rounded-lg"
              placeholder="Enter amount to bridge"
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button 
                className="px-4 py-2 bg-gray-700 rounded-lg"
                onClick={() => setShowAmountModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-purple-600 rounded-lg"
                onClick={confirmBridgeAmount}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <SuccessPopup 
          amount={parseFloat(bridgeAmount)}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
}