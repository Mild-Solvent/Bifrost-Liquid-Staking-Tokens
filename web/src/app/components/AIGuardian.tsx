'use client';
import { useState } from 'react';
import { explainStaking } from '../utils/ai';

export default function AIGuardian() {
  const [answer, setAnswer] = useState('');
  const [query, setQuery] = useState('');

  const handleAsk = async () => {
    const response = await explainStaking(query);
    setAnswer(response.choices[0].message.content ?? '');
  };

  return (
    <div className="w-full max-w-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-xl">
      <div className="flex gap-2 mb-4">
        <input
          className="w-full px-4 py-3 bg-gray-700 rounded-lg placeholder-gray-400 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Ask about staking, bridging, or security..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button 
          onClick={handleAsk}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg font-semibold transition-all duration-200"
        >
          Ask AI
        </button>
      </div>
      {answer && (
        <div className="p-4 bg-gray-700/50 rounded-lg text-gray-100 whitespace-pre-wrap">
          {answer}
        </div>
      )}
    </div>
  );
}