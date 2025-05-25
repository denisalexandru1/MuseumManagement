import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@shoelace-style/shoelace/dist/components/button/button.js";

export default function LoginPage({ t }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // pentru redirect

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8090/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const user = await response.json();
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                window.location.href = "/";
            } else if (response.status === 401) {
                setError(t.invalidCredentials || "Invalid username or password");
            } else {
                setError(t.serverError || "Server error. Please try again.");
            }
        } catch (err) {
            console.error(err);
            setError(t.networkError || "Network error. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "linear-gradient(to bottom, #f4f7fa, #ffffff)"}}>
            <form onSubmit={handleSubmit} style={{ background: "white", padding: "2rem", borderRadius: "12px", width: "100%", maxWidth: "400px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}>
                <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>{t.login || "Login"}</h2>

                <label>{t.username || "Username"}</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: "100%", marginBottom: "1rem" }} />

                <label>{t.password || "Password"}</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: "100%", marginBottom: "1rem" }} />

                {error && <p style={{ color: "red" }}>{error}</p>}

                <sl-button variant="primary" type="submit" style={{ width: "100%", padding: "0.75rem" }} disabled={loading}>
                    {loading ? t.loading || "Loading..." : t.login || "Login"}
                </sl-button>
            </form>
        </div>
    );
}
