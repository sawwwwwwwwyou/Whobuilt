import { useState } from 'react';
import { Modal } from './Modal';

export function Header() {
    const [modal, setModal] = useState(null); // { title, message }

    const scrollToNewsletter = () => {
        const input = document.getElementById('email-input');
        if (input) {
            input.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => input.focus(), 500);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <>
            {modal && (
                <Modal
                    title={modal.title}
                    message={modal.message}
                    onClose={() => setModal(null)}
                />
            )}
            <header className="site-header">
                <div className="brand" style={{ cursor: 'pointer' }} onClick={() => window.scrollTo(0, 0)}>WHOBUILT ™</div>
                <nav className="header-nav">
                    <a href="#" onClick={(e) => { e.preventDefault(); scrollToNewsletter(); }}>NEWSLETTERS</a>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        setModal({
                            title: 'ADVERTISE WITH US',
                            message: 'Advertising inquiries are currently closed. We are onboarding new partners next month. Check back soon or email us at ads@whobuilt.app',
                        });
                    }}>ADVERTISE</a>
                </nav>
                <div className="user-block" style={{ cursor: 'pointer' }} onClick={scrollToNewsletter}>
                    SUBSCRIBE -&gt;
                </div>
            </header>
        </>
    );
}

