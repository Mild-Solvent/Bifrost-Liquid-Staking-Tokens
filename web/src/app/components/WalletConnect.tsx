'use client';
import { useWallet } from '../context/WalletContext';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function WalletConnect() {
  const { isConnected, selectedAccount, connect, disconnect } = useWallet();

  return (
    <div className="card-gradient p-4 rounded-xl flex items-center gap-4">
      {isConnected ? (
        <>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="font-medium">
              {selectedAccount?.meta.name || 'Account'}
            </span>
            <span className="text-gray-400 text-sm">
              {selectedAccount?.address.slice(0, 6)}...{selectedAccount?.address.slice(-4)}
            </span>
          </div>
          <button
            onClick={disconnect}
            className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            Disconnect
          </button>
        </>
      ) : (
        <button
          onClick={connect}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition-colors"
        >
          <img 
            src="/talisman-logo.svg" 
            className="w-5 h-5" 
            alt="Talisman" 
          />
          Connect Wallet
        </button>
      )}
    </div>
  );
}