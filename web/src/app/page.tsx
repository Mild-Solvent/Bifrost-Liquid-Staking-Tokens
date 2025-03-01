'use client';
import Image from "next/image";
import StakeCard from "./components/StakeCard";
import BridgeInterface from "./components/BridgeInterface";
import RewardVault from "./components/RewardVault";
import AIGuardian from "./components/AIGuardian";
import WalletConnect from "./components/WalletConnect";
import VDotBalance from "./components/VDotBalance";
import { useState, useEffect } from "react";
import { CheckCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline';

// Add these new interfaces above the Home component
interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  animationDelay: number;
  animationDuration: number;
  targetX?: number;
  targetY?: number;
}

export default function Home() {
  const [vDotBalance, setVDotBalance] = useState(42.5); // Initial vDOT balance
  const [hasConnectedWallet, setHasConnectedWallet] = useState(false);
  const [hasStaked, setHasStaked] = useState(false);
  const [hasBridged, setHasBridged] = useState(false);
  const [showNewQuest, setShowNewQuest] = useState(false);
  const [hasExploredRewards, setHasExploredRewards] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>(Array(20).fill(null).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    baseX: Math.random() * 100,
    baseY: Math.random() * 100,
    size: Math.random() * 50 + 30,
    animationDelay: Math.random() * 10,
    animationDuration: Math.random() * 10 + 20,
    targetX: Math.random() * 100,
    targetY: Math.random() * 100,
  })));

  // Add mount detection
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Add new effect for random movement
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prevParticles => prevParticles.map(particle => ({
        ...particle,
        targetX: particle.baseX + (Math.random() - 0.5) * 10, // Random movement within ±5% of base position
        targetY: particle.baseY + (Math.random() - 0.5) * 10,
      })));
    }, 3000); // New target every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Update the mouse move effect to include smooth transition to target
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });

      setParticles(prevParticles => prevParticles.map(particle => {
        const dx = x - particle.baseX;
        const dy = y - particle.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const repulsionRadius = 20;
        const repulsionStrength = 15;

        if (distance < repulsionRadius) {
          const force = (1 - distance / repulsionRadius) * repulsionStrength;
          return {
            ...particle,
            x: particle.baseX - (dx / distance) * force,
            y: particle.baseY - (dy / distance) * force,
          };
        }

        // When not affected by cursor, move towards target
        return {
          ...particle,
          x: particle.x + (particle.targetX! - particle.x) * 0.05,
          y: particle.y + (particle.targetY! - particle.y) * 0.05,
        };
      }));
    };

    const animationFrame = setInterval(() => {
      setParticles(prevParticles => prevParticles.map(particle => ({
        ...particle,
        x: particle.x + (particle.targetX! - particle.x) * 0.05,
        y: particle.y + (particle.targetY! - particle.y) * 0.05,
      })));
    }, 50); // Update positions every 50ms

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(animationFrame);
    };
  }, []);

  // Remove scroll effect
  const gradientStyle = {
    backgroundImage: `linear-gradient(to bottom right, 
      rgb(3, 7, 18) 20%, 
      rgba(88, 28, 135, 0.6) 80%, 
      rgba(8, 145, 178, 0.5) 110%,
      rgba(139, 92, 246, 0.3) 140%
    )`,
    backgroundSize: '400% 400%',
    transition: 'background-image 0.5s ease-out'
  };

  // Calculate progress percentage
  const completedSteps = [hasConnectedWallet, hasStaked, hasBridged].filter(Boolean).length;
  const progress = (completedSteps / 3) * 100;

  // Handle completion of all initial quests
  useEffect(() => {
    if (completedSteps === 3 && !showNewQuest) {
      setTimeout(() => {
        const questBar = document.getElementById('quest-bar');
        if (questBar) {
          questBar.classList.add('animate-collapse');
          
          setTimeout(() => {
            setShowNewQuest(true);
            questBar.classList.remove('animate-collapse');
            questBar.classList.add('animate-expand');
          }, 1000);
        }
      }, 500);
    }
  }, [completedSteps, showNewQuest]);

  // Update the generateRandomStyle function
  const generateRandomStyle = (index: number) => {
    if (!hasMounted) return {};
    const particle = particles[index];
    return {
      left: `${particle.x}%`,
      top: `${particle.y}%`,
      width: `${particle.size}px`,
      height: `${particle.size}px`,
      animationDelay: `${particle.animationDelay}s`,
      animationDuration: `${particle.animationDuration}s`,
      opacity: '0.15',
      transition: 'all 0.3s ease-out', // Add smooth transition
    };
  };

  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={gradientStyle}></div>
        {hasMounted && particles.map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg animate-spin-slow pointer-events-none"
            style={generateRandomStyle(i)}
          />
        ))}
      </div>

      <header className="bg-gradient-to-r from-purple-900/80 to-cyan-900/80 backdrop-blur-lg border-b border-purple-500/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto py-6 px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image 
                src="/logo.png" 
                alt="Bifrost Logo" 
                width={40} 
                height={40}
                className="rounded-lg"
              />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Bifrost Bridge
              </h1>
            </div>
            <nav className="flex gap-6">
              <a href="#" className="text-gray-300 hover:text-white">Bridge</a>
              <a href="#" className="text-gray-300 hover:text-white">Stake</a>
              <a href="#" className="text-gray-300 hover:text-white">Rewards</a>
            </nav>
            <WalletConnect onConnect={() => setHasConnectedWallet(true)} />
          </div>
        </div>
      </header>

      <main className="min-h-screen text-gray-100 p-8">
        <div className="max-w-6xl mx-auto space-y-16">
          <div id="quest-bar" className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 transition-all duration-500 fade-in">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">
                {showNewQuest ? "New Quest Available!" : "Onboarding Quest"}
              </h3>
              <span className="text-sm text-purple-400">
                {showNewQuest ? 
                  `${hasExploredRewards ? '1' : '0'}/1 completed` : 
                  `${completedSteps}/3 completed`}
              </span>
            </div>
            
            {!showNewQuest ? (
              <>
                <div className="relative h-2 bg-gray-800 rounded-full mb-4">
                  <div 
                    className="absolute h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transition-all duration-500" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between">
                  <QuestItem 
                    completed={hasConnectedWallet}
                    label="Connect Wallet"
                    icon={<CheckCircleIcon className="w-5 h-5" />}
                  />
                  <QuestItem 
                    completed={hasStaked}
                    label="Add Currency"
                    icon={<CheckCircleIcon className="w-5 h-5" />}
                  />
                  <QuestItem 
                    completed={hasBridged}
                    label="Bridge Assets"
                    icon={<CheckCircleIcon className="w-5 h-5" />}
                  />
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="relative h-2 bg-gray-800 rounded-full mb-4">
                  <div 
                    className="absolute h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transition-all duration-500" 
                    style={{ width: hasExploredRewards ? '100%' : '0%' }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <QuestItem 
                    completed={hasExploredRewards}
                    label="Explore Rewards"
                    icon={<CheckCircleIcon className="w-5 h-5" />}
                  />
                  <button
                    onClick={() => setHasExploredRewards(true)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                  >
                    Explore Now
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="fade-up" style={{ transitionDelay: '0.1s' }}>
              <StakeCard 
                onStakeSuccess={(amount) => {
                  setVDotBalance(prev => prev + (amount / 10));
                  setHasStaked(true);
                }}
              />
            </div>
            <div className="fade-up" style={{ transitionDelay: '0.2s' }}>
              <VDotBalance balance={vDotBalance} />
            </div>
            <div className="fade-up" style={{ transitionDelay: '0.3s' }}>
              <RewardVault rewards={125.5} />
            </div>
          </div>
          
          <div className="fade-up" style={{ transitionDelay: '0.4s' }}>
            <BridgeInterface onBridgeSuccess={() => setHasBridged(true)} />
          </div>
          
          <div className="flex justify-center w-full fade-up" style={{ transitionDelay: '0.5s' }}>
            <div className="w-full max-w-2xl">
              <AIGuardian />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gradient-to-r from-purple-900/80 to-cyan-900/80 backdrop-blur-lg border-t border-purple-500/20">
        <div className="max-w-6xl mx-auto py-8 px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">About Bifrost</h3>
              <p className="text-gray-300">
                Cross-chain liquidity protocol enabling staking liquidity and derivatives.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Whitepaper</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-300 hover:text-white">Twitter</a>
                <a href="#" className="text-gray-300 hover:text-white">Discord</a>
                <a href="#" className="text-gray-300 hover:text-white">Telegram</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

function QuestItem({ completed, label, icon }: { completed: boolean; label: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`p-1 rounded-full ${completed ? 'bg-green-500/20 text-green-400' : 'bg-gray-800 text-gray-500'}`}>
        {completed ? icon : <LockClosedIcon className="w-5 h-5" />}
      </div>
      <span className={`text-sm ${completed ? 'text-gray-300' : 'text-gray-500'}`}>{label}</span>
    </div>
  );
}
