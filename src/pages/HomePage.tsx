import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, BarChart as ChartBar, Search } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-8">
              AI Research Assistant
            </h1>
            <p className="text-xl text-indigo-100 mb-12">
              Discover, analyze, and understand research papers with AI-powered insights
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-8 shadow-lg"
            >
              <Link to="/dashboard" className="block text-center">
                <Search className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Research Dashboard</h2>
                <p className="text-gray-600">
                  Start your research journey with our intelligent research assistant
                </p>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-8 shadow-lg"
            >
              <Link to="/graphs" className="block text-center">
                <ChartBar className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Research Graphs</h2>
                <p className="text-gray-600">
                  Visualize research trends and connections
                </p>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-8 shadow-lg"
            >
              <div className="text-center">
                <Brain className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">AI Analysis</h2>
                <p className="text-gray-600">
                  Get intelligent insights and recommendations
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}