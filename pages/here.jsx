import Head from 'next/head';
import { useState } from 'react';

const PROMPT_JSON = `{
  "aspect_ratio": "1:1",
  "creative_direction": {
    "style": "High-end commercial photography, cinematic, hyper-realistic, luxurious.",
    "mood": "Intense refreshment, premium, energetic but controlled, dramatic.",
    "key_focus": "The irresistible coldness and explosive taste of the product."
  },
  "subject": {
    "hero": "A single glass bottle of Coca-Cola, center-stage.",
    "details": "Extreme condensation, real water droplets running down the glass, looks incredibly cold and frosty. The liquid inside glows with a rich caramel amber light."
  },
  "action_and_fx": {
    "splash": "A dynamic, sculptural arch of liquid and ice cubes erupting *around* and *behind* the bottle, framing it rather than obscuring it. The splash is elegant, not chaotic.",
    "ice": "Crystal clear, sharp ice cubes caught in motion within the liquid arch, catching the light like diamonds.",
    "particles": "Fine mist and effervescent bubbles suspended in the air to enhance atmosphere."
  },
  "lighting": {
    "type": "Dramatic, high-contrast cinematic lighting (Rembrandt lighting on bottle).",
    "colors": "Warm golden backlighting combined with cool, crisp key lighting on the front of the bottle and ice to emphasize temperature contrast."
  },
  "environment": {
    "background": "Deep, dark, atmospheric mahogany and amber gradient. Subtle, luxurious bokeh effects, no harsh rays or distracting elements. Infinite depth.",
    "surface": "The bottle rests on a dark, wet, reflective surface."
  },
  "branding & composition": {
    "hierarchy": "Product first, Brand second, Message third.",
    "logo_placement": "Elegant, white Coca-Cola script logo placed at the top center, smaller than before, refined and premium.",
    "slogan_placement": "Subtle 'TASTE THE FEELING' text in white, centered below the bottle, smaller font size.",
    "framing": "A tight, powerful central composition optimized for square format, drawing the eye directly to the bottle."
  }
}`;

const SURVEY_URL = 'https://forms.gle/U5hjPKTpqvi2wThX6';

export default function HerePage() {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(PROMPT_JSON);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            const ta = document.createElement('textarea');
            ta.value = PROMPT_JSON;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <>
            <Head>
                <title>Resources — WHOBUILT</title>
                <meta name="robots" content="noindex" />
            </Head>

            <main style={{
                maxWidth: 720,
                margin: '0 auto',
                padding: '40px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: 32,
            }}>
                {/* Prompt section */}
                <section>
                    <h2 style={{ marginBottom: 16 }}>Image Prompt</h2>
                    <div style={{
                        position: 'relative',
                        border: 'var(--b-width) solid var(--c-border)',
                        borderRadius: 'var(--r-outer)',
                        background: 'var(--c-bg-card)',
                        overflow: 'hidden',
                    }}>
                        <button
                            onClick={handleCopy}
                            style={{
                                position: 'absolute',
                                top: 12,
                                right: 12,
                                padding: '6px 14px',
                                fontFamily: 'var(--f-mono)',
                                fontSize: 13,
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.04em',
                                background: copied ? '#2B2B2B' : 'var(--c-accent)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 'var(--r-inner)',
                                cursor: 'pointer',
                                transition: 'background 0.2s',
                                zIndex: 1,
                            }}
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                        <pre style={{
                            padding: 20,
                            margin: 0,
                            fontFamily: 'var(--f-mono)',
                            fontSize: 13,
                            lineHeight: 1.6,
                            overflowX: 'auto',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            color: 'var(--c-ink)',
                        }}>
                            {PROMPT_JSON}
                        </pre>
                    </div>
                </section>

                {/* Survey link */}
                <section>
                    <h2 style={{ marginBottom: 16 }}>Survey</h2>
                    <a
                        href={SURVEY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-block',
                            padding: '14px 28px',
                            fontFamily: 'var(--f-mono)',
                            fontSize: 15,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            background: 'var(--c-accent)',
                            color: '#fff',
                            border: 'var(--b-width) solid var(--c-border)',
                            borderRadius: 'var(--r-outer)',
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                            textDecoration: 'none',
                        }}
                    >
                        Take the Survey →
                    </a>
                </section>
            </main>
        </>
    );
}
