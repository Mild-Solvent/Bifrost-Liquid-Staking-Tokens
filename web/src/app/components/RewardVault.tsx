'use client';

export default function RewardVault({ rewards }: { rewards: number }) {
  return (
    <div className="card-gradient p-8 rounded-2xl text-center">
      <div className="relative w-48 h-48 mx-auto">
        <div className="absolute inset-0 bg-purple-500/10 rounded-full animate-pulse" />
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {rewards}
          </div>
        </div>
      </div>
      
      <h4 className="text-xl mt-4">Total Rewards Earned</h4>
      <p className="text-gray-400 mt-2">vDOT tokens</p>
    </div>
  );
}