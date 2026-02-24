import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeaturedArticle } from './components/FeaturedArticle';
import { ArticleList } from './components/ArticleList';
import { ArticleDetail } from './components/ArticleDetail';

function App() {
  const [tagFilter, setTagFilter] = useState(null);
  const [sortFilter, setSortFilter] = useState('POPULAR');

  const getSidebarLinkStyle = (isActive) => ({
    display: 'block',
    padding: '12px 16px',
    borderBottom: '1.5px solid #000',
    fontSize: '0.9rem',
    background: isActive ? 'var(--c-ink)' : 'transparent',
    color: isActive ? '#fff' : 'inherit',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',
    fontFamily: 'inherit'
  });

  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={
          <div className="layout-grid">
            {/* Left Sidebar Layout Mapping */}
            <aside className="sidebar-nav">
              <div className="nav-card">
                <div className="nav-header">
                  WHOBUILT &gt;&gt; DIRECTORY V2.0
                </div>
                <div className="nav-list" style={{ display: 'flex', flexDirection: 'column' }}>
                  <button
                    onClick={() => { setTagFilter(null); setSortFilter('POPULAR'); }}
                    style={getSidebarLinkStyle(!tagFilter && sortFilter === 'POPULAR')}
                  >
                    HOME / TOP
                  </button>
                  <button
                    onClick={() => { setTagFilter(null); setSortFilter('NEWEST'); }}
                    style={getSidebarLinkStyle(!tagFilter && sortFilter === 'NEWEST')}
                  >
                    NEWEST ARRIVALS
                  </button>
                  <button
                    onClick={() => { setTagFilter(null); setSortFilter('RISING'); }}
                    style={getSidebarLinkStyle(!tagFilter && sortFilter === 'RISING')}
                  >
                    DISCUSSIONS
                  </button>
                </div>
                <div className="nav-header" style={{ borderTop: '1.5px solid #000' }}>
                  TOPICS
                </div>
                <div className="nav-list" style={{ display: 'flex', flexDirection: 'column' }}>
                  <button
                    onClick={() => setTagFilter('AI')}
                    style={getSidebarLinkStyle(tagFilter === 'AI')}
                  >
                    ARTIFICIAL INTEL
                  </button>
                  <button
                    onClick={() => setTagFilter('DEV')}
                    style={getSidebarLinkStyle(tagFilter === 'DEV')}
                  >
                    DEVELOPER TOOLS
                  </button>
                  <button
                    onClick={() => setTagFilter('DESIGN')}
                    style={getSidebarLinkStyle(tagFilter === 'DESIGN')}
                  >
                    DESIGN ASSETS
                  </button>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main>
              <FeaturedArticle tagFilter={tagFilter} />
              <ArticleList tagFilter={tagFilter} sortFilter={sortFilter} setSortFilter={setSortFilter} />
            </main>

            {/* Right Sidebar Widget Area */}
            <HeroSection />
          </div>
        } />

        <Route path="/article/:slug" element={<ArticleDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
