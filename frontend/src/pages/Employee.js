import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';

export default function Employee({ t }) {
    const navigate = useNavigate();

    // Verificăm dacă userul e logat și are rolul employee, altfel redirect la login
    useEffect(() => {
        const userStr = localStorage.getItem("loggedInUser");
        if (!userStr) {
            navigate("/login");
            return;
        }
        const user = JSON.parse(userStr);
        if (user.role !== "EMPLOYEE") {
            alert(t.accessDenied || "Access denied");
            navigate("/");
        }
    }, [navigate, t]);

    const handleExportLists = () => {
        alert(t.exportLists || "Export lists functionality coming soon!");
    };

    return (
        <div style={{
            maxWidth: 600,
            margin: "2rem auto",
            padding: "1rem",
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            textAlign: "center",
        }}>
            <h1>{t.employeeOperations}</h1>
            <p>{t.employeeWelcome}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "2rem" }}>
                <sl-button variant="primary" size="large" pill onClick={() => navigate("/employee/artists")}>
                    {t.manageArtists}
                </sl-button>

                <sl-button variant="success" size="large" pill onClick={() => navigate("/employee/artworks")}>
                    {t.manageArtworks}
                </sl-button>

                <sl-button variant="warning" size="large" pill onClick={handleExportLists}>
                    {t.exportLists}
                </sl-button>
            </div>
        </div>
    );
}
