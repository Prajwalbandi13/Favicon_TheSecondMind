import { useEffect, useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { motion } from 'framer-motion';
import { useThemeStore } from '../store/theme';
import { useResearchStore } from '../store/research';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function GraphsPage() {
  const { isDarkMode } = useThemeStore();
  const [researchData, setResearchData] = useState({
    topics: [],
    scores: [],
    sources: { arxiv: 0, ieee: 0, scholar: 0 },
    timeline: {
      labels: [],
      data: []
    }
  });

  useEffect(() => {
    // Simulate fetching research data
    const mockData = {
      topics: ['Machine Learning', 'Quantum Computing', 'Neural Networks', 'Blockchain', 'AI Ethics'],
      scores: [8.5, 7.2, 9.1, 6.8, 8.9],
      sources: { arxiv: 45, ieee: 30, scholar: 25 },
      timeline: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        data: [12, 19, 15, 25, 22]
      }
    };
    setResearchData(mockData);
  }, []);

  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';

  const lineChartData = {
    labels: researchData.timeline.labels,
    datasets: [
      {
        label: 'Research Activity',
        data: researchData.timeline.data,
        fill: true,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4
      }
    ]
  };

  const barChartData = {
    labels: researchData.topics,
    datasets: [
      {
        label: 'Research Quality Score',
        data: researchData.scores,
        backgroundColor: '#6366f1',
        borderRadius: 6
      }
    ]
  };

  const doughnutData = {
    labels: ['arXiv', 'IEEE', 'Scholar'],
    datasets: [
      {
        data: Object.values(researchData.sources),
        backgroundColor: ['#6366f1', '#8b5cf6', '#a855f7'],
        borderWidth: 0
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? '#fff' : '#111'
        }
      }
    },
    scales: {
      y: {
        ticks: {
          color: isDarkMode ? '#fff' : '#111'
        },
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        ticks: {
          color: isDarkMode ? '#fff' : '#111'
        },
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
  };

  return (
    <div className={`min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-3xl font-bold ${textColor} mb-8`}>Research Analytics</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${bgColor} rounded-lg shadow-lg p-6`}
          >
            <h2 className={`text-xl font-semibold ${textColor} mb-4`}>Research Activity Timeline</h2>
            <div className="h-80">
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`${bgColor} rounded-lg shadow-lg p-6`}
          >
            <h2 className={`text-xl font-semibold ${textColor} mb-4`}>Topic Quality Scores</h2>
            <div className="h-80">
              <Bar data={barChartData} options={chartOptions} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`${bgColor} rounded-lg shadow-lg p-6`}
          >
            <h2 className={`text-xl font-semibold ${textColor} mb-4`}>Source Distribution</h2>
            <div className="h-80">
              <Doughnut data={doughnutData} options={chartOptions} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`${bgColor} rounded-lg shadow-lg p-6`}
          >
            <h2 className={`text-xl font-semibold ${textColor} mb-4`}>Research Insights</h2>
            <div className="space-y-4">
              <div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                <h3 className={`font-medium ${textColor}`}>Top Performing Topics</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Neural Networks and AI Ethics show the highest research quality scores
                </p>
              </div>
              <div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                <h3 className={`font-medium ${textColor}`}>Source Analysis</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  arXiv is the primary source for research papers, followed by IEEE
                </p>
              </div>
              <div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                <h3 className={`font-medium ${textColor}`}>Trend Analysis</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Research activity shows an upward trend with peak in April
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}