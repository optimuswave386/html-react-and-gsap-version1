import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../assets/css/main.css' // Import main CSS file

export default function NotFound() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '64px 24px',
            fontFamily: 'var(--font-sans)'
        }}>
            <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.08em',
                color: 'var(--muted)',
                marginBottom: 16
            }}>404 // PAGE NOT FOUND</p>
            <h1 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(48px, 10vw, 120px)',
                lineHeight: 1,
                margin: '0 0 24px'
            }}>Lost the plot.</h1>
            <p style={{ fontSize: 16, color: 'var(--muted)', maxWidth: 480, marginBottom: 32 }}>
                The page you're looking for doesn't exist, or has moved. Let's get you back on track.
            </p>
            <Link to="/" style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '0.03em',
                color: 'var(--ink)',
                textDecoration: 'underline',
                textUnderlineOffset: 3
            }}>← BACK TO HOME</Link>
        </div>
    )
}