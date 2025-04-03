import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../store/theme';

export function SettingsPage() {
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';

  return (
    <div className={`min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className={`text-3xl font-bold ${textColor}`}>Settings</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${bgColor} rounded-lg shadow-lg p-6`}
        >
          <h2 className={`text-xl font-semibold ${textColor} mb-4 flex items-center`}>
            <Globe className="w-5 h-5 mr-2" />
            Appearance
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className={`font-medium ${textColor}`}>Dark Mode</label>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Toggle dark mode on or off
                </p>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}