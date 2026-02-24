export function Header() {
    const scrollToNewsletter = () => {
        const input = document.getElementById('email-input');
        if (input) {
            input.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => input.focus(), 500);
        } else {
            // If on a page without the sidebar (though currently it's on all pages)
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <header className="site-header">
            <div className="brand" style={{ cursor: 'pointer' }} onClick={() => window.scrollTo(0, 0)}>WHOBUILT ™</div>
            <nav className="header-nav">
                <a href="#" onClick={(e) => { e.preventDefault(); scrollToNewsletter(); }}>NEWSLETTERS</a>
                <a href="#" onClick={(e) => { e.preventDefault(); alert('Advertising inquiries are currently closed. Check back next month!'); }}>ADVERTISE</a>
            </nav>
            <div className="user-block" style={{ cursor: 'pointer' }} onClick={scrollToNewsletter}>
                SUBSCRIBE -&gt;
            </div>
        </header>
    );
}
