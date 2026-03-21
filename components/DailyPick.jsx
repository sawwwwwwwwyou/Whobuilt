import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import articles from '../data/articles.json';

function getRandomArticle(excludeId) {
    const pool = excludeId != null
        ? articles.filter(a => a.id !== excludeId)
        : articles;
    // If only one article exists, just return it
    if (pool.length === 0) return articles[0];
    return pool[Math.floor(Math.random() * pool.length)];
}

export function DailyPick() {
    const [article, setArticle] = useState(null);
    const [animState, setAnimState] = useState('visible'); // visible | fading | entering

    // Pick random article on mount (client-side only to avoid hydration mismatch)
    useEffect(() => {
        setArticle(getRandomArticle(null));
    }, []);

    const handleShuffle = useCallback(() => {
        if (animState !== 'visible') return;

        setAnimState('fading');

        setTimeout(() => {
            setArticle(prev => getRandomArticle(prev?.id));
            setAnimState('entering');

            setTimeout(() => {
                setAnimState('visible');
            }, 300);
        }, 300);
    }, [animState]);

    const scrollToFeed = () => {
        const feed = document.getElementById('all-articles');
        if (feed) {
            feed.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // SSR placeholder — prevents hydration mismatch
    if (!article) {
        return (
            <section className="daily-pick">
                <div className="daily-pick-inner">
                    <div className="daily-pick-label">YOUR PICK FOR TODAY</div>
                    <h1 className="daily-pick-title">LOADING...</h1>
                </div>
            </section>
        );
    }

    const animClass =
        animState === 'fading' ? 'daily-pick-content--fading' :
        animState === 'entering' ? 'daily-pick-content--entering' :
        '';

    return (
        <section className="daily-pick">
            <div className="daily-pick-inner">
                <div className={`daily-pick-content ${animClass}`}>
                    <div className="daily-pick-label">YOUR PICK FOR TODAY</div>

                    <h1 className="daily-pick-title">{article.title}</h1>

                    <p className="daily-pick-excerpt">{article.excerpt}</p>

                    <div className="daily-pick-meta">
                        <span className="daily-pick-tag">{article.tag}</span>
                        <span className="meta-divider"></span>
                        <span>{article.readTime} MIN READ</span>
                        <span className="meta-divider"></span>
                        <span>{article.date}</span>
                    </div>

                    <div className="daily-pick-actions">
                        <Link href={`/article/${article.slug}`} className="daily-pick-btn daily-pick-btn--primary">
                            READ ARTICLE →
                        </Link>
                        <button
                            onClick={handleShuffle}
                            className="daily-pick-btn daily-pick-btn--secondary"
                            aria-label="Show another random article"
                        >
                            SHUFFLE ↻
                        </button>
                    </div>
                </div>
            </div>

            <button
                className="daily-pick-scroll-hint"
                onClick={scrollToFeed}
                aria-label="Scroll to all articles"
            >
                <span className="scroll-hint-text">ALL ARTICLES</span>
                <span className="scroll-hint-arrow">↓</span>
            </button>
        </section>
    );
}
