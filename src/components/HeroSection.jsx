import { useState } from 'react';

export function HeroSection() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, success

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus('success');
        setEmail('');

        // Reset status after a few seconds
        setTimeout(() => {
            setStatus('idle');
        }, 3000);
    };

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
                    <form onSubmit={handleSubscribe}>
                        <input
                            type="email"
                            placeholder="EMAIL_ADDRESS"
                            className="newsletter-input"
                            required
                            id="email-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === 'success'}
                        />
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={status === 'success'}
                            style={{
                                background: status === 'success' ? 'var(--c-ink)' : 'var(--c-accent)',
                                color: status === 'success' ? '#fff' : 'var(--c-ink)',
                            }}
                        >
                            {status === 'success' ? 'YOU ARE ON THE LIST.' : 'JOIN 1.6M READERS'}
                        </button>
                    </form>
                </div>
                <div className="nav-header" style={{ borderTop: 'var(--b-width) solid var(--c-border)', textAlign: 'center' }}>
                    ONE DAILY EMAIL. NO SPAM.
                </div>
            </div>
        </aside>
    );
}
