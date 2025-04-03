import { useState } from 'react';
import { Search, Brain, RefreshCw } from 'lucide-react';
import { useResearchStore } from '../store/research';
import { motion } from 'framer-motion';

export function ResearchPanel() {
  const { topic, setTopic, isLoading } = useResearchStore();
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSearch = async () => {
    if (!topic.trim()) return;
    
    try {
      const response = await fetch('http://localhost:5000/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      
      if (!response.ok) throw new Error('Research failed');
      
      const data = await response.json();
      // Handle the research results
    } catch (error) {
      console.error('Research failed:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-4 mb-6">
        <Brain className="w-8 h-8 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-900">Research Assistant</h2>
      </div>

      <div className="relative">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter your research topic..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <Search className="absolute right-3 top-3 text-gray-400" />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSearch}
        disabled={isLoading}
        className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <RefreshCw className="w-5 h-5 animate-spin" />
            Researching...
          </>
        ) : (
          <>
            <Brain className="w-5 h-5" />
            Start Research
          </>
        )}
      </motion.button>

      {suggestions.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Suggested Topics</h3>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setTopic(suggestion)}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}