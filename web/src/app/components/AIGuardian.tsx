'use client';
import { useState } from 'react';
import { explainStaking } from '../utils/ai';
import { BoltIcon } from '@heroicons/react/24/outline';

export default function AIGuardian() {
  const [answer, setAnswer] = useState('');
  const [query, setQuery] = useState('');

  const handleAsk = async () => {
    const response = await explainStaking(query);
    setAnswer(response.choices[0].message.content ?? '');
  };

  return (
    <div className="card-gradient p-6 rounded-2xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-purple-500/10 rounded-full">
          <BoltIcon className="w-6 h-6 text-purple-400" />
        </div>
        <h3 className="text-lg font-semibold">AI Guardian</h3>
      </div>

      <div className="space-y-4">
        {answer && (
          <div className="p-4 bg-gray-900/50 rounded-lg animate-fade-in">
            <p className="text-gray-300">{answer}</p>
          </div>
        )}

        <div className="flex gap-2">
          <input
            className="flex-1 bg-gray-900/50 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Ask about staking..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            className="px-6 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            onClick={handleAsk}
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}