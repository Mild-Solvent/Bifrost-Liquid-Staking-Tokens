import Image from "next/image";
import StakeCard from "./components/StakeCard";
import BridgeInterface from "./components/BridgeInterface";
import RewardVault from "./components/RewardVault";
import AIGuardian from "./components/AIGuardian";

export default function Home() {
  return (
    <>
      <header className="bg-gradient-to-r from-purple-900/80 to-cyan-900/80 backdrop-blur-lg border-b border-purple-500/20">
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
          </div>
        </div>
      </header>

      <main className="min-h-screen bg-gray-950 text-gray-100 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <StakeCard />
            <RewardVault rewards={125.5} />
          </div>
          
          <BridgeInterface />
          
          <div className="grid lg:grid-cols-2 gap-8">
            <AIGuardian />
            {/* Add other components */}
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
