/* eslint-disable react-refresh/only-export-components */
/* global process */
import path from 'path';
import fs from 'fs';
import articles from '../../data/articles.json';

// Strip YAML frontmatter
function stripFrontmatter(md) {
    return md.replace(/^---[\s\S]*?---\s*/, '');
}

// Map of slug → { lang → filename }
const CONTENT_MAP = {
    'fallas-valencia-2026-survival-guide': {
        en: 'fallas-survival-guide-2026-en.md',
        es: 'fallas-guia-supervivencia-2026-es.md',
    },
    'best-apps-for-las-fallas-2026': {
        en: 'fallas-top-apps-2026-en.md',
        es: 'fallas-mejores-apps-2026-es.md',
    },
};

export async function getStaticPaths() {
    const paths = articles.map((a) => ({ params: { slug: a.slug } }));
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const article = articles.find((a) => a.slug === params.slug);
    const articlesDir = path.join(process.cwd(), 'articles');

    let content = null;
    if (CONTENT_MAP[params.slug]) {
        content = {};
        for (const [lang, filename] of Object.entries(CONTENT_MAP[params.slug])) {
            const raw = fs.readFileSync(path.join(articlesDir, filename), 'utf-8');
            content[lang] = stripFrontmatter(raw);
        }
    }

    return {
        props: {
            article,
            content: content || null,
        },
    };
}

// ---- Client Component ----
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ArticlePage({ article, content }) {
    const [activeLang, setActiveLang] = useState('en');

    if (!article) {
        return (
            <div className="article-page-wrapper" style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', textAlign: 'center' }}>
                <div>
                    <h1 style={{ marginBottom: '16px' }}>ARTICLE NOT FOUND</h1>
                    <Link href="/" className="btn-primary" style={{ display: 'inline-block', width: 'auto' }}>← RETURN HOME</Link>
                </div>
            </div>
        );
    }

    const hasMultiLang = content && Object.keys(content).length > 1;
    const markdownBody = content ? content[activeLang] : null;

    return (
        <>
            <Head>
                <title>{article.title} — WHOBUILT</title>
                <meta name="description" content={article.excerpt} />
                <link rel="canonical" href={`https://whobuilt.xyz/article/${article.slug}`} />
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={article.excerpt} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://whobuilt.xyz/article/${article.slug}`} />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Article',
                            headline: article.title,
                            description: article.excerpt,
                            url: `https://whobuilt.xyz/article/${article.slug}`,
                            publisher: {
                                '@type': 'Organization',
                                name: 'WHOBUILT',
                                url: 'https://www.whobuilt.xyz',
                            },
                        }),
                    }}
                />
            </Head>

            <div className="article-page-wrapper" id="main-content">
                {/* Breadcrumb */}
                <nav className="article-breadcrumb" aria-label="Breadcrumb">
                    <Link href="/">← WHOBUILT</Link>
                    <span className="breadcrumb-sep">/</span>
                    <span className="breadcrumb-current">{article.tag}</span>
                </nav>

                <article className="article-detail">
                    {/* Language switcher */}
                    {hasMultiLang && (
                        <div className="lang-switcher">
                            {Object.keys(content).map(lang => (
                                <button
                                    key={lang}
                                    onClick={() => setActiveLang(lang)}
                                    className={`lang-btn ${activeLang === lang ? 'lang-btn--active' : ''}`}
                                    aria-pressed={activeLang === lang}
                                >
                                    {lang === 'en' ? 'ENGLISH' : 'ESPAÑOL'}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Article header */}
                    <header className="article-detail-header">
                        <h1 className="article-detail-title">{article.title}</h1>
                        <div className="product-meta">
                            <span>{article.date}</span>
                            <span className="meta-divider"></span>
                            <span className="tag-badge">{article.tag}</span>
                            <span className="meta-divider"></span>
                            <span>{article.readTime} MIN READ</span>
                            <span className="meta-divider"></span>
                            <span>▲ {article.votes}</span>
                            <span className="meta-divider"></span>
                            <span>{article.comments} COMMENTS</span>
                        </div>
                    </header>

                    {/* Article body */}
                    <div className="article-detail-body markdown-body">
                        {markdownBody ? (
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownBody}</ReactMarkdown>
                        ) : article.body ? (
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.body}</ReactMarkdown>
                        ) : (
                            <p>{article.excerpt}</p>
                        )}
                    </div>

                    {/* Article footer meta */}
                    <footer className="article-detail-footer">
                        <div className="product-meta">
                            <span>PUBLISHED: {article.date}</span>
                            <span className="meta-divider"></span>
                            <span>TOPIC: {article.tag}</span>
                            <span className="meta-divider"></span>
                            <span>{article.readTime} MIN READ</span>
                        </div>
                        <Link href="/" className="back-link">← Back to all articles</Link>
                    </footer>
                </article>
            </div>
        </>
    );
}
