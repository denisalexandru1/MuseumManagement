import { useEffect, useState } from "react";

export default function Artists({ t }) {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchName, setSearchName] = useState("");
    const [error, setError] = useState(null);

    // Funcție pentru a aduce artiștii, fie toți, fie căutați după nume
    const fetchArtists = (name = "") => {
        setLoading(true);
        setError(null);
        let url = "http://localhost:8091/api/gallery/artist";
        if (name.trim() !== "") {
            url = `http://localhost:8091/api/gallery/artist/search?name=${encodeURIComponent(name.trim())}`;
        }

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch artists");
                return res.json();
            })
            .then((data) => {
                setArtists(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    // La mount, aducem toți artiștii
    useEffect(() => {
        fetchArtists();
    }, []);

    const handleSearch = () => {
        fetchArtists(searchName);
    };

    if (loading) return <p>{t.loading}...</p>;
    if (error) return <p style={{ color: "red" }}>{t.error || "Error"}: {error}</p>;

    return (
        <div style={{ maxWidth: 800, margin: "auto" }}>
            <h1>{t.artistsTitle}</h1>

            <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
                <input
                    type="text"
                    placeholder={t.searchNamePlaceholder || "Search artist by name"}
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    style={{ flex: "1", padding: "0.5rem" }}
                />
                <button onClick={handleSearch} style={{ padding: "0.5rem 1rem" }}>
                    {t.searchButton || "Search"}
                </button>
            </div>

            {artists.length === 0 && <p>{t.noArtistsFound || "No artists found."}</p>}

            {artists.map((artist) => (
                <sl-card key={artist.id} style={{ marginBottom: "1.5rem" }} className="artist-card">
                    <div style={{ display: "flex", gap: "1rem" }}>
                        <img
                            src={artist.photoUrl}
                            alt={`${artist.name} photo`}
                            style={{ width: 200, height: 200, objectFit: "cover", borderRadius: "8px" }}
                        />
                        <div>
                            <h2>{artist.name}</h2>
                            <p>
                                <strong>{t.birthDate}:</strong>{" "}
                                {artist.birthDate ? new Date(artist.birthDate).toLocaleDateString() : "-"}
                            </p>
                            <p>
                                <strong>{t.birthPlace}:</strong> {artist.birthPlace || "-"}
                            </p>
                            <p>
                                <strong>{t.nationality}:</strong> {artist.nationality || "-"}
                            </p>
                        </div>
                    </div>

                    <h3 style={{ marginTop: "1rem" }}>{t.artworks}</h3>
                    <div style={{ display: "flex", gap: "1rem", overflowX: "auto" }}>
                        {artist.artworks && artist.artworks.length === 0 ? (
                            <p>{t.noArtworks}</p>
                        ) : (
                            artist.artworks?.map((artwork) => (
                                <sl-card key={artwork.id} style={{ minWidth: 200, maxWidth: 200, boxShadow: "4px 4px 4px 4px rgba(0, 0, 0, 0.1)" }} className="artwork-card">
                                    <img
                                        src={artwork.imageUrls?.[0] || ""}
                                        alt={artwork.title}
                                        style={{ width: "100%", height: 120, objectFit: "cover" }}
                                    />
                                    <div style={{ padding: "0.5rem" }}>
                                        <h4>{artwork.title}</h4>
                                        <p>{artwork.type}</p>
                                    </div>
                                </sl-card>
                            ))
                        )}
                    </div>
                </sl-card>
            ))}
        </div>
    );
}