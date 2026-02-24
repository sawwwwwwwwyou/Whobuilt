import { useState } from 'react';
import { Link } from 'react-router-dom';
import articles from '../data/articles.json';

const sideArticles = articles.filter(a => !a.featured);

const FILTERS = ['POPULAR', 'NEWEST', 'RISING'];

export function ArticleList({ tagFilter, sortFilter, setSortFilter }) {
    const [votedArticles, setVotedArticles] = useState({});

    const handleVote = (e, articleId) => {
        e.preventDefault();
        e.stopPropagation();
        setVotedArticles(prev => ({ ...prev, [articleId]: true }));
    };

    const filtered = articles.filter(a => {
        if (tagFilter && a.tag !== tagFilter) return false;
        return !a.featured;
    });

    const sorted = [...filtered].sort((a, b) => {
        if (sortFilter === 'POPULAR') return b.votes - a.votes;
        if (sortFilter === 'NEWEST') return b.id - a.id;
        if (sortFilter === 'RISING') return b.comments - a.comments;
        return 0;
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="feed-header">
                <div className="date-display">
                    {tagFilter ? `${tagFilter} TOPICS` : "TODAY'S TOP"}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {FILTERS.map(f => (
                        <div
                            key={f}
                            onClick={() => setSortFilter(f)}
                            className="product-domain"
                            style={{
                                cursor: 'pointer',
                                padding: '4px 10px',
                                background: sortFilter === f ? 'var(--c-ink)' : 'transparent',
                                color: sortFilter === f ? 'var(--c-bg-canvas)' : 'var(--c-ink)',
                                border: '1.5px solid var(--c-ink)',
                                borderRadius: '4px',
                            }}
                        >
                            {f}
                        </div>
                    ))}
                </div>
            </div>

            {sorted.map((article, index) => (
                <Link key={article.id} to={`/article/${article.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                    <article className="product-card">
                        <div className="rank-col">
                            {String(index + 1).padStart(2, '0')}
                        </div>
                        <div className="content-col">
                            <div className="content-top">
                                <div className="product-title">{article.title}</div>
                                <div className="product-domain">{article.domain}</div>
                            </div>
                            <div className="content-body">
                                <div>{article.excerpt}</div>
                                <div className="product-meta">
                                    <span>{article.date}</span>
                                    <span className="meta-divider"></span>
                                    <span>{article.tag}</span>
                                    <span className="meta-divider"></span>
                                    <span>{article.readTime} MIN READ</span>
                                </div>
                            </div>
                        </div>
                        <div className="vote-col">
                            <button
                                className="vote-btn"
                                onClick={(e) => handleVote(e, article.id)}
                                style={{ color: votedArticles[article.id] ? 'var(--c-accent)' : 'inherit' }}
                            >
                                <span className="vote-icon">▲</span>
                                <span className="vote-count">{article.votes + (votedArticles[article.id] ? 1 : 0)}</span>
                            </button>
                            <div className="comment-link">{article.comments} CMT</div>
                        </div>
                    </article>
                </Link>
            ))}
        </div>
    );
}
