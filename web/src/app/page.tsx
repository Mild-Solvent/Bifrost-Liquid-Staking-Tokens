import Image from "next/image";
import StakeCard from "./components/StakeCard";
import BridgeInterface from "./components/BridgeInterface";
import RewardVault from "./components/RewardVault";
import AIGuardian from "./components/AIGuardian";

export default function Home() {
  return (
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
  );
}
