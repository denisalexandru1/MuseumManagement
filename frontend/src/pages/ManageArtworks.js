import { useEffect, useState } from "react";
import '@shoelace-style/shoelace/dist/components/button/button.js';

export default function ManageArtworks({ t }) {
    const [artworks, setArtworks] = useState([]);
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        title: "",
        type: "",
        description: "",
        imageUrls: [""],
        artistId: ""
    });
    const [editingId, setEditingId] = useState(null);

    const loadData = async () => {
        try {
            const [artworkRes, artistRes] = await Promise.all([
                fetch("http://localhost:8091/api/gallery/artwork"),
                fetch("http://localhost:8091/api/gallery/artist"),
            ]);
            const [artworkData, artistData] = await Promise.all([
                artworkRes.json(),
                artistRes.json(),
            ]);
            console.log("Fetched artists:", artistData); // <== Check what you actually get
            setArtworks(artworkData);
            setArtists(artistData);
        } catch (err) {
            console.error("Error loading data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "imageUrls") {
            setForm({ ...form, imageUrls: value.split(",").map((s) => s.trim()) });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const artist = artists.find(a => a.id === form.artistId);
        if (!artist) {
            alert(t.selectArtist);
            return;
        }

        const artworkData = {
            title: form.title,
            type: form.type,
            description: form.description,
            imageUrls: form.imageUrls,
            artistId: form.artistId
        };

        const method = editingId ? "PUT" : "POST";
        const url = editingId
            ? `http://localhost:8091/api/gallery/artwork/${editingId}`
            : "http://localhost:8091/api/gallery/artwork";

        try {
            await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(artworkData),
            });

            setForm({ title: "", type: "", description: "", imageUrls: [""], artistId: "" });
            setEditingId(null);
            loadData();
        } catch (err) {
            console.error("Save failed:", err);
        }
    };

    const handleEdit = (artwork) => {
        const artist = artists.find(a => a.name === artwork.artistName);
        setForm({
            title: artwork.title,
            type: artwork.type,
            description: artwork.description || "",
            imageUrls: artwork.imageUrls || [""],
            artistId: artist?.id || ""
        });
        setEditingId(artwork.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };


    const handleDelete = async (id) => {
        if (!window.confirm(t.confirmDelete)) return;
        try {
            await fetch(`http://localhost:8091/api/gallery/artwork/${id}`, { method: "DELETE" });
            loadData();
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const exportArtworks = async (format) => {
        try {
            const response = await fetch("http://localhost:8093/api/export", {  // adjust port/url to your export service
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    exportType: format,
                    entityType: "artwork"
                }),
            });

            if (!response.ok) throw new Error("Export failed");

            const text = await response.text();

            // Prepare file download
            const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `artworks_export.${format}`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Export error:", err);
            alert("Export failed: " + err.message);
        }
    };


    return (
        <div style={{maxWidth: 800, margin: "2rem auto", padding: "1rem"}}>
            <h2>{editingId ? t.editArtwork : t.addArtwork}</h2>
            <form onSubmit={handleSubmit} style={{marginBottom: "2rem"}}>
                <div style={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                    <input name="title" placeholder={t.title} value={form.title} onChange={handleChange} required/>
                    <input name="type" placeholder={t.type} value={form.type} onChange={handleChange} required/>
                    <input name="description" placeholder={t.description} value={form.description}
                           onChange={handleChange} required/>
                    <input name="imageUrls" placeholder={t.imageUrls} value={form.imageUrls.join(", ")}
                           onChange={handleChange}/>
                    <select name="artistId" value={form.artistId} onChange={handleChange} required>
                        <option value="">{t.selectArtist}</option>
                        {artists.map((artist) => (
                            <option key={artist.id} value={artist.id}>{artist.name}</option>
                        ))}
                    </select>
                    <sl-button type="submit" variant="primary">{editingId ? t.update : t.create}</sl-button>
                    {editingId && (
                        <sl-button type="button" variant="default" onClick={() => {
                            setEditingId(null);
                            setForm({title: "", type: "", imageUrls: [""], artistId: ""});
                        }}>
                            {t.cancel}
                        </sl-button>
                    )}
                </div>
            </form>

            <div style={{marginTop: "2rem", borderTop: "1px solid #ccc", paddingTop: "1rem"}}>
                <h3>{t.exportArtworks}</h3>
                <div style={{display: "flex", gap: "1rem", flexWrap: "wrap"}}>
                    {["csv", "json", "xml", "doc"].map((format) => (
                        <sl-button
                            key={format}
                            variant="primary"
                            onClick={() => exportArtworks(format)}
                        >
                            {t.export + " " + format.toUpperCase()}
                        </sl-button>
                    ))}
                </div>
            </div>
            <h2>{t.existingArtworks}</h2>
            {loading ? (
                <p>{t.loading}...</p>
            ) : artworks.length === 0 ? (
                <p>{t.noArtworks}</p>
            ) : (
                artworks.map((artwork) => (
                    <div key={artwork.id}
                         style={{border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", marginBottom: "1rem"}}>
                        <div style={{display: "flex", gap: "1rem", alignItems: "center"}}>
                            <img
                                src={artwork.imageUrls?.[0] || ""}
                                alt={artwork.title}
                                style={{width: 100, height: 100, objectFit: "cover", borderRadius: "8px"}}
                            />
                            <div style={{flexGrow: 1}}>
                                <h3>{artwork.title}</h3>
                                <p>{artwork.type}</p>
                                <p><strong>{t.artist}:</strong> {artwork.artistName}</p>
                            </div>
                            <div style={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                                <sl-button variant="primary" size="small"
                                           onClick={() => handleEdit(artwork)}>{t.edit}</sl-button>
                                <sl-button variant="danger" size="small"
                                           onClick={() => handleDelete(artwork.id)}>{t.delete}</sl-button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
