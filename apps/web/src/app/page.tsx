'use client';

export default function LoginPage() {
    return (
        <main style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Decorative Elements */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                left: '-10%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
                filter: 'blur(40px)',
                zIndex: -1
            }} />

            <div className="glass-card" style={{
                width: '100%',
                maxWidth: '420px',
                padding: '3rem 2.5rem',
                margin: '1rem',
                textAlign: 'center'
            }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 className="logo-text">MOZUK</h1>
                    <p className="precision-text">THE PRECISION PROTOCOL</p>
                </div>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Access Identity"
                            className="input-field"
                            autoComplete="email"
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Security Key"
                            className="input-field"
                            autoComplete="current-password"
                        />
                    </div>

                    <button type="submit" className="btn-primary">
                        Initialize
                    </button>
                </form>

                <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <p>This is a secure environment.</p>
                    <p style={{ marginTop: '0.25rem' }}>Unauthorized access is monitored.</p>
                </div>
            </div>
        </main>
    );
}
