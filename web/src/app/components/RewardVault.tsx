'use client';
import { motion } from 'framer-motion';

export default function RewardVault({ rewards }: { rewards: number }) {
  return (
    <motion.div 
      initial={{ scale: 0.8 }}
      animate={{ scale: rewards > 0 ? 1.2 : 1 }}
      transition={{ type: 'spring', stiffness: 120 }}
      className="w-full max-w-xs bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-6 rounded-2xl backdrop-blur-lg border border-gray-700/30"
    >
      <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
        Reward Vault
      </h2>
      <div className="text-4xl font-bold text-green-400 mb-2">
        {rewards.toFixed(2)}
      </div>
      <div className="text-sm text-gray-400 mb-6">
        Total Rewards Available
      </div>
      <button 
        className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-xl font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-green-500/20"
        onClick={() => console.log('Claim rewards')}
      >
        Claim Rewards
      </button>
    </motion.div>
  );
}