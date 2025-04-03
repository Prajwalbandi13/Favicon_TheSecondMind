import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home,
  Search,
  BookMarked,
  BarChart,
  Brain,
  Settings,
  Moon,
  Sun,
  Lightbulb
} from 'lucide-react';
import { useThemeStore } from '../store/theme';

export function Navigation() {
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/dashboard', icon: Search, label: 'Research' },
    { path: '/bookmarks', icon: BookMarked, label: 'Bookmarks' },
    { path: '/graphs', icon: BarChart, label: 'Graphs' },
    { path: '/insights', icon: Brain, label: 'AI Insights' },
    { path: '/innovation-lab', icon: Lightbulb, label: 'Innovation Lab' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Research AI
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                      ${isActive 
                        ? (isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900')
                        : (isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900')
                      }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                        layoutId="navbar-indicator"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-md ${
              isDarkMode 
                ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
}