'use client';
import { stakeTokens } from '../utils/staking';
import { useStaking } from '../hoooks/useStaking';

export default function StakeCard() {
  const { amount, setAmount, apy, handleStake } = useStaking();

  return (
    <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-2xl space-y-4">
      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
        Stake & Earn Rewards
      </h3>
      <div className="flex gap-4">
        <input
          type="number"
          className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button 
          onClick={handleStake}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-lg font-semibold text-white transition-all duration-200 flex items-center gap-2"
        >
          <span>Stake Now</span>
          <span className="text-sm bg-white/10 px-2 py-1 rounded-md">
            {apy}% APY
          </span>
        </button>
      </div>
    </div>
  );
}