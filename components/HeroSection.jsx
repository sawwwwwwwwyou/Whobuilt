export function HeroSection() {
    return (
        <div className="widget-card">
            <div className="widget-header" style={{ background: 'var(--c-accent)', color: '#fff' }}>
                KEEP UP WITH TECH IN 5 MINUTES
            </div>
            <div className="widget-body">
                <p className="widget-text">
                    Get the free daily email with summaries of the most interesting stories in startups, tech, and programming.
                </p>
                <a
                    href="mailto:subscribe@whobuilt.app?subject=Subscribe%20to%20WHOBUILT"
                    className="btn-primary"
                    style={{ display: 'block', textAlign: 'center' }}
                >
                    SUBSCRIBE VIA EMAIL
                </a>
            </div>
            <div className="widget-footer">
                ONE DAILY EMAIL. NO SPAM.
            </div>
        </div>
    );
}
