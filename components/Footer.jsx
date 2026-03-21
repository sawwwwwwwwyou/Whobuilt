import Link from 'next/link';

export function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-inner">
                <div className="footer-brand">
                    <Link href="/" className="footer-logo">WHOBUILT ™</Link>
                    <p className="footer-tagline">Tech news in 5 minutes.</p>
                </div>
                <div className="footer-links">
                    <div className="footer-col">
                        <div className="footer-col-title">SITE</div>
                        <Link href="/">All Articles</Link>
                        <a href="mailto:ads@whobuilt.app?subject=Advertising%20Inquiry">Advertise</a>
                    </div>
                    <div className="footer-col">
                        <div className="footer-col-title">CONNECT</div>
                        <a href="mailto:subscribe@whobuilt.app?subject=Subscribe%20to%20WHOBUILT">Subscribe</a>
                        <a href="mailto:hello@whobuilt.app">Contact</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <span>© {new Date().getFullYear()} WHOBUILT. All rights reserved.</span>
            </div>
        </footer>
    );
}
