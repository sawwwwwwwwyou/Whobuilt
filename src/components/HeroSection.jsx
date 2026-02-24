export function HeroSection() {
    return (
        <aside>
            <div className="widget-card">
                <div className="widget-header" style={{ background: 'var(--c-accent)', color: 'var(--c-ink)' }}>
                    KEEP UP WITH TECH IN 5 MINUTES
                </div>
                <div className="widget-body">
                    <div style={{ fontSize: '0.85rem', marginBottom: '16px', lineHeight: 1.5, fontFamily: 'var(--f-mono)' }}>
                        Get the free daily email with summaries of the most interesting stories in startups 🚀, tech 📱, and programming 💻!
                    </div>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="EMAIL_ADDRESS" className="newsletter-input" required />
                        <button type="submit" className="btn-primary">JOIN 1.6M READERS</button>
                    </form>
                </div>
                <div className="nav-header" style={{ borderTop: 'var(--b-width) solid var(--c-border)', textAlign: 'center' }}>
                    ONE DAILY EMAIL. NO SPAM.
                </div>
            </div>
        </aside>
    );
}
