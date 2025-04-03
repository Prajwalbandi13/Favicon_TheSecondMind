import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain,
  TrendingUp,
  Network,
  FileText,
  Users,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useThemeStore } from '../store/theme';

interface ResearchTrend {
  topic: string;
  growth: number;
  papers: number;
  description: string;
}

interface ResearchCluster {
  name: string;
  topics: string[];
  papers: number;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export function AIInsightsPage() {
  const { isDarkMode } = useThemeStore();
  const [trends, setTrends] = useState<ResearchTrend[]>([]);
  const [clusters, setClusters] = useState<ResearchCluster[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching AI insights
    setTimeout(() => {
      setTrends([
        {
          topic: 'Large Language Models',
          growth: 285,
          papers: 1243,
          description: 'Rapid advancement in transformer architectures and training methodologies'
        },
        {
          topic: 'Quantum Machine Learning',
          growth: 165,
          papers: 892,
          description: 'Integration of quantum computing principles with neural networks'
        },
        {
          topic: 'Federated Learning',
          growth: 142,
          papers: 567,
          description: 'Privacy-preserving distributed machine learning approaches'
        }
      ]);

      setClusters([
        {
          name: 'AI Ethics and Governance',
          topics: ['Bias Detection', 'Fairness Metrics', 'Regulatory Compliance'],
          papers: 456,
          sentiment: 'positive'
        },
        {
          name: 'Neural Architecture Search',
          topics: ['AutoML', 'Hyperparameter Optimization', 'Model Compression'],
          papers: 789,
          sentiment: 'neutral'
        },
        {
          name: 'Sustainable AI',
          topics: ['Green Computing', 'Energy Efficiency', 'Carbon Footprint'],
          papers: 234,
          sentiment: 'positive'
        }
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const cardHoverClass = isDarkMode 
    ? 'hover:bg-gray-700 hover:shadow-lg' 
    : 'hover:bg-gray-50 hover:shadow-lg';

  return (
    <div className={`min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Brain className={`w-8 h-8 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-3`} />
          <h1 className={`text-3xl font-bold ${textColor}`}>AI Research Insights</h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
          </div>
        ) : (
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${bgColor} rounded-lg shadow-lg p-6`}
            >
              <div className="flex items-center mb-6">
                <TrendingUp className="w-6 h-6 text-indigo-600 mr-2" />
                <h2 className={`text-xl font-semibold ${textColor}`}>Emerging Research Trends</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {trends.map((trend, index) => (
                  <motion.div
                    key={trend.topic}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} ${cardHoverClass}`}
                  >
                    <h3 className={`font-medium ${textColor} mb-2`}>{trend.topic}</h3>
                    <div className="flex items-center text-green-500 mb-2">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {trend.growth}% growth
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{trend.papers} papers published</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {trend.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`${bgColor} rounded-lg shadow-lg p-6`}
            >
              <div className="flex items-center mb-6">
                <Network className="w-6 h-6 text-indigo-600 mr-2" />
                <h2 className={`text-xl font-semibold ${textColor}`}>Research Clusters</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {clusters.map((cluster, index) => (
                  <motion.div
                    key={cluster.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} ${cardHoverClass}`}
                  >
                    <h3 className={`font-medium ${textColor} mb-2`}>{cluster.name}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {cluster.topics.map(topic => (
                        <span
                          key={topic}
                          className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {cluster.papers} papers
                      
                      </span>
                      <div className={`w-3 h-3 rounded-full ${
                        cluster.sentiment === 'positive' ? 'bg-green-500' :
                        cluster.sentiment === 'negative' ? 'bg-red-500' :
                        'bg-yellow-500'
                      }`} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`${bgColor} rounded-lg shadow-lg p-6`}
              >
                <div className="flex items-center mb-6">
                  <FileText className="w-6 h-6 text-indigo-600 mr-2" />
                  <h2 className={`text-xl font-semibold ${textColor}`}>Citation Analysis</h2>
                </div>
                <div className={`space-y-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <p>• Most cited papers focus on transformer architectures</p>
                  <p>• Average citation count: 45.3 per paper</p>
                  <p>• H-index trend showing 23% increase</p>
                  <button className="flex items-center text-indigo-600 hover:text-indigo-700 mt-4">
                    View detailed analysis
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`${bgColor} rounded-lg shadow-lg p-6`}
              >
                <div className="flex items-center mb-6">
                  <Users className="w-6 h-6 text-indigo-600 mr-2" />
                  <h2 className={`text-xl font-semibold ${textColor}`}>Collaboration Patterns</h2>
                </div>
                <div className={`space-y-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <p>• 67% increase in international collaborations</p>
                  <p>• Average team size: 4.8 researchers</p>
                  <p>• Cross-domain research up by 42%</p>
                  <button className="flex items-center text-indigo-600 hover:text-indigo-700 mt-4">
                    Explore networks
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className={`${bgColor} rounded-lg shadow-lg p-6`}
            >
              <div className="flex items-center mb-6">
                <Zap className="w-6 h-6 text-indigo-600 mr-2" />
                <h2 className={`text-xl font-semibold ${textColor}`}>Research Impact Metrics</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Total Papers', value: '2,847' },
                  { label: 'Average Impact Factor', value: '4.23' },
                  { label: 'Research Groups', value: '156' },
                  { label: 'Active Projects', value: '342' }
                ].map((metric, index) => (
                  <div
                    key={metric.label}
                    className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                  >
                    <h3 className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {metric.label}
                    </h3>
                    <p className={`text-2xl font-bold ${textColor}`}>{metric.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
