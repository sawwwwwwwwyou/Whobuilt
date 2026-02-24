import Link from 'next/link';
import articles from '../data/articles.json';



const featured = articles.find(a => a.featured);

export function FeaturedArticle({ tagFilter }) {
    if (!featured || tagFilter) return null;
    return (
        <Link href={`/article/${featured.slug}`} style={{ textDecoration: 'none', display: 'block' }}>

            <article className="product-card" style={{ gridTemplateColumns: '1fr', display: 'flex', flexDirection: 'column' }}>
                <div className="content-col" style={{ flex: 1 }}>
                    <div className="content-top" style={{ borderBottomColor: 'var(--c-ink)' }}>
                        <div className="product-title" style={{ fontSize: '1.5rem' }}>{featured.title}</div>
                        <div className="product-domain">{featured.domain}</div>
                    </div>
                    <div className="content-body" style={{ flex: 1, padding: '24px' }}>
                        <div style={{ fontSize: '1.05rem', marginBottom: '16px', lineHeight: 1.6 }}>
                            {featured.excerpt}
                        </div>
                        <div className="product-meta" style={{ marginTop: 'auto' }}>
                            <span>{featured.date}</span>
                            <span className="meta-divider"></span>
                            <span>{featured.tag}</span>
                            <span className="meta-divider"></span>
                            <span>{featured.readTime} MIN READ</span>
                        </div>
                    </div>
                </div>
                <div className="vote-col" style={{ flexDirection: 'row', borderLeft: 'none', borderTop: 'var(--b-width) solid var(--c-border)' }}>
                    <button className="vote-btn" style={{ flexDirection: 'row', gap: '12px', padding: '16px', flex: 1 }}>
                        <span className="vote-icon" style={{ marginBottom: 0 }}>▲</span>
                        <span className="vote-count">{featured.votes}</span>
                    </button>
                    <div className="comment-link" style={{ display: 'flex', alignItems: 'center', padding: '0 20px', borderLeft: 'var(--b-width) solid var(--c-border)', borderTop: 'none', whiteSpace: 'nowrap' }}>
                        {featured.comments} CMT
                    </div>
                </div>
            </article>
        </Link>
    );
}
