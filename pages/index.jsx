import Head from 'next/head';
import { useState, useMemo } from 'react';
import { DailyPick } from '../components/DailyPick';
import { ArticleList } from '../components/ArticleList';
import { HeroSection } from '../components/HeroSection';
import articles from '../data/articles.json';

const SORT_OPTIONS = [
    { key: 'POPULAR', label: 'POPULAR' },
    { key: 'NEWEST', label: 'NEWEST' },
    { key: 'RISING', label: 'DISCUSSED' },
];

export default function Home() {
    const [tagFilter, setTagFilter] = useState(null);
    const [sortFilter, setSortFilter] = useState('POPULAR');

    const allTags = useMemo(() => {
        return [...new Set(articles.map(a => a.tag))].sort();
    }, []);

    return (
        <>
            <Head>
                <title>WHOBUILT — Tech news in 5 minutes</title>
                <meta name="description" content="The free daily email with summaries of the most interesting stories in startups, tech, and programming." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content="WHOBUILT — Tech news in 5 minutes" />
                <meta property="og:description" content="The free daily email with summaries of the most interesting stories in startups, tech, and programming." />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://whobuilt.xyz/" />
                <meta property="og:url" content="https://whobuilt.xyz/" />
            </Head>

            {/* Full-screen hero with random article */}
            <DailyPick />

            {/* All Articles feed */}
            <div className="feed-section" id="all-articles">
                {/* Filter bar */}
                <div className="feed-filters">
                    <div className="filter-row">
                        <button
                            className={`filter-pill ${!tagFilter ? 'filter-pill--active' : ''}`}
                            onClick={() => setTagFilter(null)}
                            aria-pressed={!tagFilter}
                        >
                            ALL
                        </button>
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                className={`filter-pill ${tagFilter === tag ? 'filter-pill--active' : ''}`}
                                onClick={() => setTagFilter(tag)}
                                aria-pressed={tagFilter === tag}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                    <div className="sort-row">
                        {SORT_OPTIONS.map(opt => (
                            <button
                                key={opt.key}
                                className={`sort-pill ${sortFilter === opt.key ? 'sort-pill--active' : ''}`}
                                onClick={() => setSortFilter(opt.key)}
                                aria-pressed={sortFilter === opt.key}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Article list */}
                <main id="main-content">
                    <ArticleList tagFilter={tagFilter} sortFilter={sortFilter} />
                </main>

                {/* Newsletter CTA inline */}
                <div className="feed-newsletter">
                    <HeroSection />
                </div>
            </div>
        </>
    );
}
