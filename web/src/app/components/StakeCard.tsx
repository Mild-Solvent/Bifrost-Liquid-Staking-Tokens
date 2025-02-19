'use client';
import { useState } from 'react';
import { useStaking } from '../hooks/useStaking';
import SuccessPopup from './SuccessPopup';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function StakeCard({ onStakeSuccess }: { 
  onStakeSuccess?: (amount: number) => void 
}) {
  const { amount, setAmount, apy, handleStake } = useStaking();
  const [showSuccess, setShowSuccess] = useState(false);
  const [stakedAmount, setStakedAmount] = useState(0);
  const scrollRef = useScrollAnimation();

  const handleSubmit = async () => {
    try {
      const result = await handleStake();
      const staked = parseFloat(amount);
      setStakedAmount(staked);
      onStakeSuccess?.(staked);
      setShowSuccess(true);
      setAmount('');
    } catch (error) {
      console.error('Staking failed:', error);
    }
  };

  return (
    <div ref={scrollRef} className="card-gradient p-8 rounded-2xl space-y-6 neon-glow relative overflow-hidden fade-up">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Liquid Staking
        </h2>
        <p className="text-gray-400">Stake DOT/ETH and earn rewards</p>
      </div>

      <div className="relative">
        <input
          className="w-full text-2xl bg-gray-900/50 py-4 px-6 rounded-xl focus:ring-2 focus:ring-purple-500"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="absolute right-4 top-4 flex items-center gap-2">
          <span className="bg-gray-800 px-3 py-1 rounded-lg">DOT</span>
          <span className="text-purple-400">Max</span>
        </div>
      </div>

      <div className="flex justify-between text-gray-400">
        <span>APY</span>
        <span className="text-2xl font-bold text-green-400">{apy}%</span>
      </div>

      <button 
        className="w-full bg-purple-600 hover:bg-purple-700 py-4 rounded-xl font-bold transition-colors relative"
        onClick={handleSubmit}
      >
        <span className="relative z-10">Stake & Earn</span>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 animate-pulse" />
      </button>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-gray-900/50 rounded-xl">
          <p className="text-gray-400">Total Staked</p>
          <p className="text-xl">$12.5M</p>
        </div>
        <div className="p-4 bg-gray-900/50 rounded-xl">
          <p className="text-gray-400">Stakers</p>
          <p className="text-xl">2.4K</p>
        </div>
        <div className="p-4 bg-gray-900/50 rounded-xl">
          <p className="text-gray-400">TVL</p>
          <p className="text-xl">$18.7M</p>
        </div>
      </div>

      {showSuccess && (
        <SuccessPopup 
          amount={stakedAmount}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
}