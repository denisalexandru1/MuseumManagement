import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0", "#FF6347", "#40E0D0"];

export default function ArtworksStatistics({ t }) {
    const navigate = useNavigate();
    const [typeStats, setTypeStats] = useState([]);
    const [artistStats, setArtistStats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userStr = localStorage.getItem("loggedInUser");
        if (!userStr) {
            navigate("/login");
            return;
        }
        const user = JSON.parse(userStr);
        if (user.role !== "MANAGER" && user.role !== "ADMIN") {
            alert(t.accessDenied || "Access denied");
            navigate("/");
            return;
        }

        // Fetch statistics
        const fetchStats = async () => {
            try {
                const [typeRes, artistRes] = await Promise.all([
                    fetch("http://localhost:8091/api/gallery/statistics/type-count"),
                    fetch("http://localhost:8091/api/gallery/statistics/artist-count")
                ]);
                const typeData = await typeRes.json();
                const artistData = await artistRes.json();

                // Map API data to recharts format if needed
                // API returns e.g. { type: "Painting", count: 12 }
                setTypeStats(typeData);
                setArtistStats(artistData);
            } catch (error) {
                console.error("Failed to fetch stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [navigate, t]);

    if (loading) return <p>{t.loading || "Loading statistics..."}</p>;

    return (
        <div style={{ maxWidth: 900, margin: "2rem auto", padding: "1rem" }}>
            <h2>{t.artworkStatistics || "Artwork Statistics"}</h2>

            <section style={{ marginBottom: "3rem" }}>
                <h3>{t.countByType || "Count of Artworks by Type"}</h3>
                {typeStats.length === 0 ? (
                    <p>{t.noData || "No data available"}</p>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={typeStats}>
                            <XAxis dataKey="type" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </section>

            <section>
                <h3>{t.countByArtist || "Count of Artworks by Artist"}</h3>
                {artistStats.length === 0 ? (
                    <p>{t.noData || "No data available"}</p>
                ) : (
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={artistStats}
                                dataKey="count"
                                nameKey="artistName"
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                fill="#82ca9d"
                                label
                            >
                                {artistStats.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </section>
        </div>
    );
}
