import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useThemeStore } from './store/theme';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { ResearchDashboard } from './pages/ResearchDashboard';
import { GraphsPage } from './pages/GraphsPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { AIInsightsPage } from './pages/AIInsightsPage';
import InnovationLabPage from './pages/InnovationLabPage'; // Remove curly braces
import { SettingsPage } from './pages/SettingsPage';

const queryClient = new QueryClient();

function App() {
  const { isDarkMode } = useThemeStore();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={isDarkMode ? 'dark' : ''}>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<ResearchDashboard />} />
            <Route path="/graphs" element={<GraphsPage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/insights" element={<AIInsightsPage />} />
            <Route path="/innovation-lab" element={<InnovationLabPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;