import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import articles from '../data/articles.json';
import articleContent from '../data/articleContent';

export function ArticleDetail() {
    const { slug } = useParams();
    const article = articles.find(a => a.slug === slug);
    const [activeSnippetIdx, setActiveSnippetIdx] = useState(0);
    const [activeLang, setActiveLang] = useState('en');
    const [hasVoted, setHasVoted] = useState(false);

    if (!article) {
        return (
            <div className="layout-grid" style={{ minHeight: '60vh', placeItems: 'center', textAlign: 'center' }}>
                <div>
                    <h1 style={{ marginBottom: '16px' }}>ARTICLE NOT FOUND</h1>
                    <Link to="/" className="btn-primary" style={{ display: 'inline-block', width: 'auto' }}>&lt;- RETURN HOME</Link>
                </div>
            </div>
        );
    }

    const content = articleContent[slug];
    const hasMultiLang = content && Object.keys(content).length > 1;
    const markdownBody = content ? content[activeLang] : null;

    return (
        <div className="layout-grid" style={{ gridTemplateColumns: '320px minmax(0, 1fr)' }}>
            <aside className="sidebar-nav">
                <div className="nav-card" style={{ marginBottom: '24px' }}>
                    <div className="nav-header">NAVIGATION</div>
                    <div className="nav-list">
                        <Link to="/" style={{ display: 'block', padding: '12px 16px', fontSize: '0.9rem', fontWeight: 700 }}>
                            &lt;- BACK TO DIRECTORY
                        </Link>
                    </div>
                </div>
            </aside>

            <article className="product-card" style={{ gridTemplateColumns: '1fr', display: 'flex', flexDirection: 'column', cursor: 'default' }}>
                <div className="content-col" style={{ flex: 1 }}>
                    {/* Language switcher bar */}
                    {hasMultiLang && (
                        <div style={{
                            display: 'flex',
                            borderBottom: 'var(--b-width) solid var(--c-border)',
                            background: 'var(--c-bg-canvas)',
                        }}>
                            {Object.keys(content).map(lang => (
                                <button
                                    key={lang}
                                    onClick={() => setActiveLang(lang)}
                                    style={{
                                        padding: '12px 24px',
                                        background: activeLang === lang ? 'var(--c-ink)' : 'transparent',
                                        color: activeLang === lang ? '#fff' : 'var(--c-ink)',
                                        border: 'none',
                                        borderRight: '1px solid var(--c-border)',
                                        cursor: 'pointer',
                                        fontFamily: 'var(--f-mono)',
                                        fontSize: '0.8rem',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                    }}
                                >
                                    {lang === 'en' ? '🇬🇧 ENGLISH' : '🇪🇸 ESPAÑOL'}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="content-top" style={{ borderBottomColor: 'var(--c-ink)', padding: '24px' }}>
                        <div className="product-title" style={{ fontSize: '2rem', lineHeight: 1.2 }}>{article.title}</div>
                        <div className="product-domain" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>{article.domain}</div>
                    </div>

                    <div className="content-body" style={{ padding: '32px', fontSize: '1.15rem', lineHeight: 1.8 }}>
                        {markdownBody ? (
                            <div className="markdown-body">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownBody}</ReactMarkdown>
                            </div>
                        ) : (
                            <>
                                <p style={{ marginBottom: '24px' }}>{article.excerpt}</p>
                                <p style={{ marginBottom: '24px' }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                                <p style={{ marginBottom: '24px' }}>
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>

                                {article.snippets && article.snippets.length > 0 && (
                                    <div style={{ background: 'var(--c-ink)', color: 'var(--c-bg-card)', borderRadius: '4px', marginBottom: '24px', overflow: 'hidden' }}>
                                        {article.snippets.length > 1 && (
                                            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                                {article.snippets.map((s, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setActiveSnippetIdx(idx)}
                                                        style={{
                                                            padding: '8px 16px',
                                                            background: activeSnippetIdx === idx ? 'rgba(255,255,255,0.1)' : 'transparent',
                                                            color: activeSnippetIdx === idx ? 'var(--c-accent)' : '#fff',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            fontFamily: 'var(--f-mono)',
                                                            fontSize: '0.75rem',
                                                            fontWeight: 700,
                                                            textTransform: 'uppercase'
                                                        }}
                                                    >
                                                        {s.lang}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                        <div style={{ padding: '24px', fontFamily: 'var(--f-mono)', fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>
                                            <div style={{ color: 'var(--c-accent)', marginBottom: '8px', fontSize: '0.75rem' }}>// {article.snippets[activeSnippetIdx].lang.toUpperCase()}</div>
                                            {article.snippets[activeSnippetIdx].code}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        <div className="product-meta" style={{ marginTop: '32px', paddingTop: '24px', borderTop: 'var(--b-width) dashed var(--c-border)' }}>
                            <span>PUBLISHED: {article.date}</span>
                            <span className="meta-divider"></span>
                            <span>TOPIC: {article.tag}</span>
                            <span className="meta-divider"></span>
                            <span>EST TIME: {article.readTime} MINS</span>
                        </div>
                    </div>
                </div>
                <div className="vote-col" style={{ flexDirection: 'row', borderLeft: 'none', borderTop: 'var(--b-width) solid var(--c-border)' }}>
                    <button
                        className="vote-btn"
                        onClick={() => setHasVoted(true)}
                        style={{ flexDirection: 'row', gap: '12px', padding: '16px', flex: 1, color: hasVoted ? 'var(--c-accent)' : 'inherit' }}
                    >
                        <span className="vote-icon" style={{ marginBottom: 0 }}>▲</span>
                        <span className="vote-count">{article.votes + (hasVoted ? 1 : 0)} {hasVoted ? 'VOTED' : 'UPVOTES'}</span>
                    </button>
                    <button
                        className="comment-link"
                        onClick={() => alert(`Comments section for "${article.title}" is currently read-only. We are moving to a new discussion platform soon!`)}
                        style={{ background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0 24px', borderLeft: 'var(--b-width) solid var(--c-border)', borderTop: 'none', borderRight: 'none', borderBottom: 'none', whiteSpace: 'nowrap', color: 'inherit', fontFamily: 'inherit' }}
                    >
                        {article.comments} COMMENTS
                    </button>
                </div>
            </article>
        </div>
    );
}
