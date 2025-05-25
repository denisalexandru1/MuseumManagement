import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Artworks from "./pages/Artworks";
import Artists from "./pages/Artists";
import LoginPage from "./pages/LoginPage";
import Employee from "./pages/Employee";
import { useState, useEffect } from "react";
import translations from "./translations/translations";
import ManageArtists from "./pages/ManageArtists";
import ManageArtworks from "./pages/ManageArtworks";
import ArtworksStatistics from "./pages/ArtworksStatistics";
import AdminPage from "./pages/AdminPage";

function App() {
    const [lang, setLang] = useState("en");
    const [user, setUser] = useState(null);
    const t = translations[lang];

    useEffect(() => {
        const savedUser = localStorage.getItem("loggedInUser");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        setUser(null);
        window.location.href = "/"; // Redirect to home after logout
    };

    return (
        <div className="p-4">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home t={t} />} />
                    <Route path="/artworks" element={<Artworks t={t} />} />
                    <Route path="/artists" element={<Artists t={t} />} />
                    <Route path="/login" element={<LoginPage t={t} />} />

                    <Route path="/employee" element={<Employee t={t} />} />
                    <Route path="/employee/artists" element={<ManageArtists t={t} />} />
                    <Route path="/employee/artworks" element={<ManageArtworks t={t} />} />

                    <Route path="/stats" element={<ArtworksStatistics t={t} />} />
                    <Route path="/admin" element={<AdminPage t={t} />} />
                </Routes>
            </BrowserRouter>

            <div style={{ marginBottom: "1rem", textAlign: "center" }}>
                {["en", "fr", "de"].map((l) => (
                    <button
                        key={l}
                        onClick={() => setLang(l)}
                        style={{
                            padding: "0.4rem 1rem",
                            marginRight: "0.5rem",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            backgroundColor: lang === l ? "#cce4ff" : "#fff",
                            cursor: "pointer",
                            fontWeight: lang === l ? "600" : "400",
                            transition: "background-color 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            if (lang !== l) e.target.style.backgroundColor = "#e6f0ff";
                        }}
                        onMouseLeave={(e) => {
                            if (lang !== l) e.target.style.backgroundColor = "#fff";
                        }}
                    >
                        {l.toUpperCase()}
                    </button>
                ))}

                {user && (
                    <button
                        onClick={handleLogout}
                        style={{
                            padding: "0.4rem 1rem",
                            border: "1px solid #dc3545",
                            backgroundColor: "#f8d7da",
                            color: "#721c24",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        {t.logout || "Logout"}
                    </button>
                )}
            </div>
        </div>
    );
}

export default App;
