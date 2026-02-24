import { useEffect } from 'react';

export function Modal({ title, message, onClose }) {
    // Close on Escape key
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(43, 43, 43, 0.65)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                padding: '24px',
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: 'var(--c-bg-card)',
                    border: '2px solid var(--c-border)',
                    borderRadius: 'var(--r-outer)',
                    boxShadow: '6px 6px 0px var(--c-ink)',
                    maxWidth: '480px',
                    width: '100%',
                    fontFamily: 'var(--f-mono)',
                    overflow: 'hidden',
                }}
            >
                {/* Modal header bar */}
                <div style={{
                    background: 'var(--c-accent)',
                    color: '#fff',
                    padding: '12px 20px',
                    fontFamily: 'var(--f-display)',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    borderBottom: '2px solid var(--c-border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <span>{title || 'WHOBUILT.APP'}</span>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#fff',
                            cursor: 'pointer',
                            fontFamily: 'var(--f-display)',
                            fontWeight: 800,
                            fontSize: '1rem',
                            lineHeight: 1,
                            padding: '0 4px',
                        }}
                    >✕</button>
                </div>

                {/* Modal body */}
                <div style={{
                    padding: '24px',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    color: 'var(--c-ink)',
                }}>
                    {message}
                </div>

                {/* Modal footer */}
                <div style={{
                    borderTop: '1.5px solid var(--c-border)',
                    padding: '12px 24px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'var(--c-ink)',
                            color: '#fff',
                            border: '1.5px solid var(--c-border)',
                            padding: '8px 20px',
                            fontFamily: 'var(--f-mono)',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            letterSpacing: '0.05em',
                        }}
                    >
                        GOT IT →
                    </button>
                </div>
            </div>
        </div>
    );
}
