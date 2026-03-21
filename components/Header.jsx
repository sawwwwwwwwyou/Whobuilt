import Link from 'next/link';

export function Header() {
    return (
        <>
            <a href="#main-content" className="skip-link">
                Skip to content
            </a>
            <header className="site-header">
                <Link href="/" className="brand">WHOBUILT ™</Link>
                <nav className="header-nav" aria-label="Main navigation">
                    <Link href="/">ARTICLES</Link>
                    <a href="mailto:ads@whobuilt.app?subject=Advertising%20Inquiry">ADVERTISE</a>
                </nav>
                <a
                    href="mailto:subscribe@whobuilt.app?subject=Subscribe%20to%20WHOBUILT"
                    className="user-block"
                >
                    SUBSCRIBE →
                </a>
            </header>
        </>
    );
}
