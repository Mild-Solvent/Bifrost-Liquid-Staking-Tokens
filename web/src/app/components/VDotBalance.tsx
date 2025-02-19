'use client';
import { useEffect, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function VDotBalance({ balance }: { balance: number }) {
  const gemRef = useRef<HTMLDivElement>(null);
  const scrollRef = useScrollAnimation();

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
    <div ref={scrollRef} className="card-gradient p-8 rounded-2xl space-y-6 neon-glow relative overflow-hidden fade-up h-full">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          vDOT Balance
        </h2>
        <p className="text-gray-400">Liquid Staking Tokens</p>
      </div>

      <div ref={gemRef} className="relative w-full aspect-square max-w-[12rem] mx-auto my-8">
        <div className="absolute inset-0 bg-cyan-500/10 rounded-full animate-pulse" />
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 blur-lg rounded-full" />
              <img 
                src="/gem-logo.png" 
                alt="vDOT Gem" 
                className="w-16 h-16 relative z-10 filter drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]"
              />
            </div>
            <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {balance.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center mt-auto">
        <div className="p-4 bg-gray-900/50 rounded-xl">
          <p className="text-gray-400">APR</p>
          <p className="text-xl">12.5%</p>
        </div>
        <div className="p-4 bg-gray-900/50 rounded-xl">
          <p className="text-gray-400">Value</p>
          <p className="text-xl">${(balance * 15.7).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
} 