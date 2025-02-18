'use client';
import { useEffect, useRef } from 'react';

export default function VDotBalance({ balance }: { balance: number }) {
  const gemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gemRef.current) {
      gemRef.current.classList.add('animate-gem-pulse');
      const timeout = setTimeout(() => {
        gemRef.current?.classList.remove('animate-gem-pulse');
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [balance]);

  return (
    <div className="card-gradient p-8 rounded-2xl text-center hover:scale-[1.02] transition-transform">
      <div ref={gemRef} className="relative w-48 h-48 mx-auto transition-transform duration-300">
        <div className="absolute inset-0 bg-cyan-500/10 rounded-full animate-pulse" />
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <div className="flex items-center gap-4">
            {/* Gem icon with gradient border */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 blur-lg rounded-full" />
              <img 
                src="/gem-logo.png" 
                alt="vDOT Gem" 
                className="w-16 h-16 relative z-10 filter drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]"
              />
            </div>
            {/* Balance value */}
            <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {balance.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
      <h4 className="text-xl mt-4">vDOT Balance</h4>
      <p className="text-gray-400 mt-2">Liquid Staking Tokens</p>
    </div>
  );
} 