'use client';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function SuccessPopup({ 
  amount,
  onClose
}: {
  amount: number;
  onClose: () => void;
}) {
  useEffect(() => {
    // Confetti animation
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 1000
    };

    const fire = (particleRatio: number, opts: any) => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    };

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    // Auto-close after 5 seconds
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[1000]">
      <div className="animate-fade-in-up bg-gradient-to-r from-purple-600 to-cyan-600 p-4 rounded-xl flex items-center gap-4 shadow-xl border-2 border-white/10 backdrop-blur-sm">
        <div className="relative">
          <div className="absolute inset-0 bg-white/10 rounded-full animate-ping" />
          <div className="text-2xl">🎉</div>
        </div>
        
        <div>
          <h3 className="font-bold">Successfully Staked!</h3>
          <p className="text-sm opacity-80">
            {amount} DOT → {amount / 10} vDOT
          </p>
        </div>
      </div>
    </div>
  );
}