import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Artworks from "./pages/Artworks";
import Artists from "./pages/Artists";
import { useState } from "react";
import translations from "./translations/translations";

function App() {
    const [lang, setLang] = useState("en");
    const t = translations[lang];

    return (
        <div className="p-4">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home t={t}/>}/>
                    <Route path="/artworks" element={<Artworks t={t}/>}/>
                    <Route path="/artists" element={<Artists t={t} />} />
                </Routes>
            </BrowserRouter>
            <div style={{marginBottom: "1rem", textAlign: "center"}}>
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
                        onMouseEnter={e => {
                            if (lang !== l) e.target.style.backgroundColor = "#e6f0ff";
                        }}
                        onMouseLeave={e => {
                            if (lang !== l) e.target.style.backgroundColor = "#fff";
                        }}
                    >
                        {l.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default App;
