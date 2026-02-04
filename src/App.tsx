import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CONFIG, BREAKING_NEWS_ITEMS } from './config/constants';
import { BreakingTicker } from './components/layout/BreakingTicker';
import { Header } from './components/layout/Header';
import { MobileMenu } from './components/layout/MobileMenu';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/common/SearchModal';
import { FeedPage } from './pages/FeedPage';
import { EventPage } from './pages/EventPage';
import { GraphPage } from './pages/GraphPage';
import { useUIStore } from './store/useUIStore';
import { useNavigate } from 'react-router-dom';

function AppContent() {
  const navigate = useNavigate();
  const {
    isDarkMode,
    toggleDarkMode,
    searchModalOpen,
    setSearchModalOpen,
    menuOpen,
    setMenuOpen,
    activeCategory,
    setActiveCategory,
    setSearchQuery,
  } = useUIStore();

  return (
    <div className={`min-h-screen bg-white dark:bg-[#09090b] text-slate-900 dark:text-slate-100 selection:bg-blue-100 dark:selection:bg-blue-900/30 overflow-x-hidden transition-colors duration-300 ${CONFIG.theme.fontSans}`}>
      {/* Modals */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSearch={(q) => {
          setSearchQuery(q);
          setSearchModalOpen(false);
          navigate('/');
        }}
      />
      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onCategorySelect={(cat) => {
          setActiveCategory(cat);
          setMenuOpen(false);
          navigate('/');
        }}
        activeCategory={activeCategory}
      />

      {/* Global Ticker */}
      <BreakingTicker items={BREAKING_NEWS_ITEMS} />

      {/* Navigation Header */}
      <Header
        onMenuClick={() => setMenuOpen(true)}
        onSearchClick={() => setSearchModalOpen(true)}
        onCategorySelect={(cat) => {
          setActiveCategory(cat);
          navigate('/');
        }}
        onLogoClick={() => {
          setActiveCategory(null);
          setSearchQuery('');
          navigate('/');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onThemeToggle={toggleDarkMode}
        isDarkMode={isDarkMode}
        activeCategory={activeCategory}
        onViewGraph={() => navigate('/graph')}
      />

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/event/:eventId" element={<EventPage />} />
          <Route path="/graph" element={<GraphPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
