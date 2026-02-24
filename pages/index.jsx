import Head from 'next/head';
import { useState } from 'react';
import { FeaturedArticle } from '../components/FeaturedArticle';
import { ArticleList } from '../components/ArticleList';
import { HeroSection } from '../components/HeroSection';

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
    fontFamily: 'inherit',
});

export default function Home() {
    const [tagFilter, setTagFilter] = useState(null);
    const [sortFilter, setSortFilter] = useState('POPULAR');

    return (
        <>
            <Head>
                <title>WHOBUILT — Tech news in 5 minutes</title>
                <meta name="description" content="The free daily email with summaries of the most interesting stories in startups, tech, and programming." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content="WHOBUILT — Tech news in 5 minutes" />
                <meta property="og:description" content="750+ burning monuments. 2M visitors. The guide covers the practical things that will make or break your experience." />
                <meta property="og:type" content="website" />
            </Head>

            <div className="layout-grid">
                {/* Left Sidebar */}
                <aside className="sidebar-nav">
                    <div className="nav-card">
                        <div className="nav-header">WHOBUILT &gt;&gt; DIRECTORY V2.0</div>
                        <div className="nav-list" style={{ display: 'flex', flexDirection: 'column' }}>
                            <button onClick={() => { setTagFilter(null); setSortFilter('POPULAR'); }} style={getSidebarLinkStyle(!tagFilter && sortFilter === 'POPULAR')}>HOME / TOP</button>
                            <button onClick={() => { setTagFilter(null); setSortFilter('NEWEST'); }} style={getSidebarLinkStyle(!tagFilter && sortFilter === 'NEWEST')}>NEWEST ARRIVALS</button>
                            <button onClick={() => { setTagFilter(null); setSortFilter('RISING'); }} style={getSidebarLinkStyle(!tagFilter && sortFilter === 'RISING')}>DISCUSSIONS</button>
                        </div>
                        <div className="nav-header" style={{ borderTop: '1.5px solid #000' }}>TOPICS</div>
                        <div className="nav-list" style={{ display: 'flex', flexDirection: 'column' }}>
                            <button onClick={() => setTagFilter('AI')} style={getSidebarLinkStyle(tagFilter === 'AI')}>ARTIFICIAL INTEL</button>
                            <button onClick={() => setTagFilter('DEV')} style={getSidebarLinkStyle(tagFilter === 'DEV')}>DEVELOPER TOOLS</button>
                            <button onClick={() => setTagFilter('DESIGN')} style={getSidebarLinkStyle(tagFilter === 'DESIGN')}>DESIGN ASSETS</button>
                        </div>
                    </div>
                </aside>

                {/* Main Feed */}
                <main>
                    <FeaturedArticle tagFilter={tagFilter} />
                    <ArticleList tagFilter={tagFilter} sortFilter={sortFilter} setSortFilter={setSortFilter} />
                </main>

                {/* Right Sidebar */}
                <HeroSection />
            </div>
        </>
    );
}
