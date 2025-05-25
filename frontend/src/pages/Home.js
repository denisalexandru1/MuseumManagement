import { Link } from "react-router-dom";
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';

function Home({ t }) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '90vh',
            background: 'linear-gradient(to bottom, #f4f7fa, #ffffff)',
            padding: '2rem'
        }}>
            <sl-card style={{
                maxWidth: '480px',
                width: '100%',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                borderRadius: '16px',
                padding: '2rem'
            }}>
                <div slot="header">
                    <h1 style={{
                        fontSize: '1.8rem',
                        margin: 0,
                        textAlign: 'center',
                        color: '#333'
                    }}>{t.welcomeTitle}</h1>
                </div>

                <p style={{
                    fontSize: '1rem',
                    color: '#666',
                    textAlign: 'center',
                    marginBottom: '2rem'
                }}>{t.welcomeDescription}</p>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                }}>
                    <Link to="/artworks">
                        <sl-button variant="primary" size="large" pill style={{ width: '100%' }}>
                            🎨 {t.browseArtworks}
                        </sl-button>
                    </Link>

                    <Link to="/artists">
                        <sl-button variant="success" size="large" pill style={{ width: '100%' }}>
                            🧑‍🎨 {t.browseArtists}
                        </sl-button>
                    </Link>

                    <Link to="/login">
                        <sl-button variant="default" size="large" pill style={{ width: '100%' }}>
                            🔐 {t.login}
                        </sl-button>
                    </Link>
                </div>
            </sl-card>
        </div>
    );
}

export default Home;
