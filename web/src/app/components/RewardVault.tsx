'use client';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function RewardVault({ rewards }: { rewards: number }) {
  const scrollRef = useScrollAnimation();

  return (
    <div ref={scrollRef} className="card-gradient p-8 rounded-2xl space-y-6 neon-glow relative overflow-hidden fade-up h-full">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Reward Vault
        </h2>
        <p className="text-gray-400">Total Rewards Earned</p>
      </div>

      <div className="relative w-full aspect-square max-w-[12rem] mx-auto my-8">
        <div className="absolute inset-0 bg-purple-500/10 rounded-full animate-pulse" />
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-cyan-400/30 blur-lg rounded-full" />
              <div className="w-16 h-16 relative z-10 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
            </div>
            <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {rewards.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center mt-auto">
        <div className="p-4 bg-gray-900/50 rounded-xl">
          <p className="text-gray-400">Last Claim</p>
          <p className="text-xl">2.5 Days</p>
        </div>
        <div className="p-4 bg-gray-900/50 rounded-xl">
          <p className="text-gray-400">Value</p>
          <p className="text-xl">${(rewards * 15.7).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}