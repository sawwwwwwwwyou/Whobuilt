import Link from 'next/link';
import articles from '../data/articles.json';

export function ArticleList({ tagFilter, sortFilter }) {
    const filtered = articles.filter(a => {
        if (tagFilter && a.tag !== tagFilter) return false;
        return true;
    });

    const sorted = [...filtered].sort((a, b) => {
        if (sortFilter === 'POPULAR') return b.votes - a.votes;
        if (sortFilter === 'NEWEST') return b.id - a.id;
        if (sortFilter === 'RISING') return b.comments - a.comments;
        return 0;
    });

    if (sorted.length === 0) {
        return (
            <div className="empty-state">
                No articles found for this filter.
            </div>
        );
    }

    return (
        <div className="article-list">
            {sorted.map((article, index) => (
                <Link key={article.id} href={`/article/${article.slug}`} className="article-card-link">
                    <article className="product-card">
                        <div className="rank-col">
                            {String(index + 1).padStart(2, '0')}
                        </div>
                        <div className="content-col">
                            <div className="content-top">
                                <div className="product-title">{article.title}</div>
                                <span className="product-domain">{article.domain}</span>
                            </div>
                            <div className="content-body">
                                <div>{article.excerpt}</div>
                                <div className="product-meta">
                                    <span>{article.date}</span>
                                    <span className="meta-divider"></span>
                                    <span className="tag-badge">{article.tag}</span>
                                    <span className="meta-divider"></span>
                                    <span>{article.readTime} MIN READ</span>
                                </div>
                            </div>
                        </div>
                        <div className="stats-col">
                            <div className="stat-item">
                                <span className="stat-icon">▲</span>
                                <span className="stat-value">{article.votes}</span>
                            </div>
                            <div className="stat-item stat-item--comments">
                                <span className="stat-value">{article.comments}</span>
                                <span className="stat-label">CMT</span>
                            </div>
                        </div>
                    </article>
                </Link>
            ))}
        </div>
    );
}
