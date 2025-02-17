import Image from "next/image";
import StakeCard from "./components/StakeCard";
import BridgeInterface from "./components/BridgeInterface";
import RewardVault from "./components/RewardVault";
import AIGuardian from "./components/AIGuardian";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <main className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Web3 Staking Platform
          </h1>
          <p className="text-gray-400">Secure cross-chain staking powered by AI</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <StakeCard />
          <RewardVault rewards={1250.75} />
        </div>

        <BridgeInterface />
        <AIGuardian />
      </main>

      <footer className="mt-16 py-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Web3 Staking Platform
              </h3>
              <p className="text-gray-400 text-sm">Secure • Decentralized • AI-Powered</p>
            </div>
            
            <div className="flex gap-6">
              <a
                href="https://docs.example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <Image src="/file.svg" alt="Docs" width={16} height={16} />
                <span>Docs</span>
              </a>
              
              <a
                href="https://github.com/example/staking"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <Image src="/globe.svg" alt="GitHub" width={16} height={16} />
                <span>GitHub</span>
              </a>
              
              <a
                href="https://discord.gg/example"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <Image src="/window.svg" alt="Discord" width={16} height={16} />
                <span>Discord</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
