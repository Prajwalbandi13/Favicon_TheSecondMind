// ResearchDashboard.tsx
import { useState } from 'react';
import { Brain, Search, RefreshCw, Bookmark, BookmarkCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useResearchStore } from '../store/research';
import { useBookmarkStore, type Bookmark as BookmarkType } from '../store/bookmarks';
import { useThemeStore } from '../store/theme';

export function ResearchDashboard() {
  const { topic, setTopic, isLoading, setLoading } = useResearchStore();
  const { isDarkMode } = useThemeStore();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore();
  const [results, setResults] = useState(null);
  const [progress, setProgress] = useState(0);
  const [activeAgent, setActiveAgent] = useState<string | null>(null);

  const agents = [
    { id: 'generationAgent', name: 'Generation Agent', icon: '🧠' },
    { id: 'reflectionAgent', name: 'Reflection Agent', icon: '🔍' },
    { id: 'rankingAgent', name: 'Ranking Agent', icon: '📊' },
    { id: 'evolutionAgent', name: 'Evolution Agent', icon: '🔄' },
    { id: 'proximityAgent', name: 'Proximity Agent', icon: '🔗' },
    { id: 'metaReviewAgent', name: 'Meta-Review Agent', icon: '📝' }
  ];

  const handleSearch = async () => {
    if (!topic.trim()) {
      alert('Please enter a research topic');
      return;
    }
  
    setLoading(true);
    setResults(null);
    setProgress(0);
  
    try {
      const totalAgents = agents.length;
      const progressPerAgent = 100 / totalAgents;
  
      for (const agent of agents) {
        setActiveAgent(agent.id);
        // Round the progress to the nearest integer
        setProgress((prev) => Math.min(Math.round(prev + progressPerAgent), 100));
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
  
      const response = await fetch('http://localhost:5000/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
  
      if (!response.ok) throw new Error('Research failed');
      
      const data = await response.json();
      setResults(data);
      setProgress(100);
    } catch (error) {
      console.error('Research failed:', error);
    } finally {
      setLoading(false);
      setActiveAgent(null);
    }
  };

  const toggleBookmark = () => {
    if (!results) return;

    if (isBookmarked(topic)) {
      removeBookmark(topic);
    } else {
      const bookmark: BookmarkType = {
        id: Date.now().toString(),
        topic,
        date: new Date().toISOString(),
        score: results.score,
        topPaper: results.top_paper,
      };
      addBookmark(bookmark);
    }
  };

  const renderPaperCard = (paper: ResearchPaper, isMain = false) => (
    <div 
      key={paper.title}
      className={`p-4 rounded-lg ${
        isMain 
          ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500'
          : 'bg-white dark:bg-gray-700/50'
      } hover:shadow-lg transition-all duration-200 cursor-pointer`}
      onClick={() => setSelectedPaper(paper)}
    >
      <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        {paper.title}
      </h4>
      
      <div className="flex flex-wrap gap-2 mb-2">
        {paper.score && (
          <span className="px-2 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200">
            Score: {paper.score}/10
          </span>
        )}
        <span className={`px-2 py-1 rounded-full text-sm ${
          paper.source === 'arXiv' 
            ? 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200'
            : paper.source === 'IEEE'
            ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200'
            : 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200'
        }`}>
          {paper.source}
        </span>
      </div>

      {paper.authors && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {paper.authors.join(', ')}
        </p>
      )}

      {paper.abstract && (
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 line-clamp-3">
          {paper.abstract}
        </p>
      )}

      <div className="flex gap-2">
        {paper.link && (
          <a
            href={paper.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            onClick={e => e.stopPropagation()}
          >
            View Paper →
          </a>
        )}
        {paper.pdf_link && (
          <a
            href={paper.pdf_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            onClick={e => e.stopPropagation()}
          >
            PDF →
          </a>
        )}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen pt-16 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <Brain className={`w-8 h-8 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <h2 className="text-2xl font-bold">Research Assistant</h2>
              </div>
              {results && (
                <button
                  onClick={toggleBookmark}
                  className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  {isBookmarked(topic) ? (
                    <BookmarkCheck className="w-6 h-6 text-indigo-600" />
                  ) : (
                    <Bookmark className="w-6 h-6 text-gray-400 hover:text-indigo-600" />
                  )}
                </button>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Machine Unlearning, Quantum Computing"
                className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
              />
              <Search className="absolute right-3 top-3 text-gray-400" />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSearch}
              disabled={isLoading}
              className={`w-full mt-4 ${isDarkMode ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'} text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50`}
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

            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>{isLoading ? 'Processing...' : 'Ready'}</span>
                <span>{progress}%</span>
              </div>
              <div className={`h-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                <motion.div
                  className="h-full bg-indigo-600"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Agent Activity</h3>
              <div className="space-y-3">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    className={`flex items-center p-3 rounded-lg ${activeAgent === agent.id ? (isDarkMode ? 'bg-gray-700 text-indigo-400' : 'bg-indigo-50 text-indigo-600') : (isDarkMode ? 'bg-gray-700' : 'bg-gray-50')}`}
                  >
                    <span className="text-2xl mr-3">{agent.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium">{agent.name}</div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {activeAgent === agent.id ? 'Processing...' : 'Ready'}
                      </div>
                    </div>
                    <div
                      className={`w-3 h-3 rounded-full ${activeAgent === agent.id ? 'bg-indigo-600 animate-pulse' : (isDarkMode ? 'bg-gray-600' : 'bg-gray-300')}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
            <h2 className="text-2xl font-bold mb-6">Research Results</h2>
            {!results && !isLoading && (
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Enter a research topic to begin the discovery process.
              </p>
            )}
            {isLoading && (
              <div className="flex justify-center items-center h-64">
                <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin" />
              </div>
            )}
            {results && (
              <div className="space-y-6">
                <div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-indigo-50'} rounded-lg`}>
                  <div className="text-lg font-semibold mb-2">Research Quality Score</div>
                  <div className="text-3xl font-bold text-indigo-600">
                    {results.score}/10
                  </div>
                </div>

                {results.top_paper && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Top Result
                    </h3>
                    {renderPaperCard(results.top_paper, true)}
                  </div>
                )}

                {results.insights.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Research Insights
                    </h3>
                    <div className="space-y-2">
                      {results.insights.map((insight, index) => (
                        <div 
                          key={index}
                          className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-gray-700 dark:text-gray-300 text-sm"
                        >
                          {insight}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {results.related_papers?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Related Papers
                    </h3>
                    <div className="space-y-3">
                      {results.related_papers.map(paper => renderPaperCard(paper))}
                    </div>
                  </div>
                )}

                {results.feedback?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Process Feedback
                    </h3>
                    <div className="space-y-2">
                      {results.feedback.map((feedback, index) => (
                        <div 
                          key={index}
                          className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-yellow-800 dark:text-yellow-200 text-sm"
                        >
                          {feedback}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResearchDashboard;