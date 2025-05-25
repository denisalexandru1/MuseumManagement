import React, { useEffect, useState } from "react";
import "@shoelace-style/shoelace/dist/components/card/card.js";
import "@shoelace-style/shoelace/dist/components/spinner/spinner.js";
import "@shoelace-style/shoelace/dist/components/divider/divider.js";

function Artworks({ t }) {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [searchTitle, setSearchTitle] = useState("");
    const [filterArtist, setFilterArtist] = useState("");
    const [filterType, setFilterType] = useState("");

    // Opțional: lista de artiști pentru filtrare (populată la mount)
    const [allArtists, setAllArtists] = useState([]);

    // La mount, aducem toate operele și lista artiștilor
    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:8091/api/gallery/artwork")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch artworks");
                return res.json();
            })
            .then((data) => {
                setArtworks(data);
                setLoading(false);

                // extragem artiștii din date
                const artists = Array.from(
                    new Set(data.map((art) => art.artistName || "Unknown Artist"))
                ).sort();
                setAllArtists(artists);
            })
            .catch((err) => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleSearch = () => {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (searchTitle.trim() !== "") params.append("title", searchTitle.trim());
        if (filterArtist.trim() !== "") params.append("artist", filterArtist.trim());
        if (filterType.trim() !== "") params.append("type", filterType.trim());

        const url = "http://localhost:8091/api/gallery/artwork/search?" + params.toString();

        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch artworks");
                return res.json();
            })
            .then(data => {
                setArtworks(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    };

    if (loading) return <sl-spinner style={{ fontSize: "2rem" }} />;
    if (error) return <p style={{ color: "red" }}>{t.error || "Error"}: {error}</p>;

    const artworksByArtist = artworks.reduce((acc, artwork) => {
        const artistName = artwork.artistName || "Unknown Artist";
        if (!acc[artistName]) acc[artistName] = [];
        acc[artistName].push(artwork);
        return acc;
    }, {});

    const sortedArtists = Object.keys(artworksByArtist).sort();

    return (
        <div style={{ maxWidth: "1500px", margin: "0 auto", padding: "1rem" }}>
            <h1 style={{ marginBottom: "2rem" }}>{t.artworksTitle || "Artworks"}</h1>

            <div
                style={{
                    display: "flex",
                    gap: "1rem",
                    marginBottom: "2rem",
                    flexWrap: "wrap",
                    alignItems: "center",
                }}
            >
                <input
                    type="text"
                    placeholder={t.searchTitlePlaceholder || "Search by title"}
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    style={{ padding: "0.5rem", flex: "1 1 200px" }}
                />

                <select
                    value={filterArtist}
                    onChange={(e) => setFilterArtist(e.target.value)}
                    style={{ padding: "0.5rem", flex: "1 1 150px" }}
                >
                    <option value="">{t.allArtists || "All Artists"}</option>
                    {allArtists.map((artist) => (
                        <option key={artist} value={artist}>
                            {artist}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder={t.filterTypePlaceholder || "Filter by type"}
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    style={{ padding: "0.5rem", flex: "1 1 150px" }}
                />

                <button onClick={handleSearch} style={{ padding: "0.5rem 1rem" }}>
                    {t.searchButton || "Search"}
                </button>
            </div>

            {sortedArtists.length === 0 && <p>{t.noResults || "No artworks found."}</p>}

            {sortedArtists.map((artistName, i) => (
                <div key={artistName} style={{ marginBottom: "2rem" }}>
                    {i > 0 && <sl-divider style={{ margin: "1rem 0" }}></sl-divider>}
                    <h2>{artistName}</h2>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "1.5rem",
                        }}
                    >
                        {artworksByArtist[artistName].map((art) => (
                            <sl-card
                                key={art.id}
                                className="art-card"
                                style={{ boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}
                            >
                                <h3
                                    slot="header"
                                    style={{
                                        fontSize: "1.25rem",
                                        marginBottom: "0.0rem",
                                        marginLeft: "0.5rem",
                                    }}
                                >
                                    {art.title}
                                </h3>
                                <p
                                    style={{
                                        fontSize: "0.95rem",
                                        marginLeft: "0.5rem",
                                        color: "#555",
                                    }}
                                >
                                    {art.description}
                                </p>
                                <div
                                    style={{
                                        display: "flex",
                                        gap: "0.5rem",
                                        overflowX: "auto",
                                        paddingBottom: "1rem",
                                        paddingLeft: "0.5rem",
                                    }}
                                >
                                    {(art.imageUrls || []).slice(0, 3).map((url, idx) => (
                                        <sl-tooltip content={`${art.title} ${idx + 1}`} key={idx}>
                                            <img
                                                src={url}
                                                alt={`${art.title} ${idx + 1}`}
                                                style={{
                                                    width: "100px",
                                                    height: "100px",
                                                    objectFit: "cover",
                                                    borderRadius: "6px",
                                                    flexShrink: 0,
                                                    border: "1px solid #ccc",
                                                }}
                                            />
                                        </sl-tooltip>
                                    ))}
                                </div>
                            </sl-card>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Artworks;
