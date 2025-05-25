import { useEffect, useState } from "react";
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';

export default function ManageArtists({ t }) {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ name: "", birthDate: "", birthPlace: "", nationality: "", photoUrl: "" });
    const [editingId, setEditingId] = useState(null);

    const loadArtists = async () => {
        try {
            const res = await fetch("http://localhost:8091/api/gallery/artist");
            const data = await res.json();
            setArtists(data);
        } catch (err) {
            console.error("Error loading artists:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadArtists();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editingId ? "PUT" : "POST";
        const url = editingId
            ? `http://localhost:8091/api/gallery/artist/${editingId}`
            : "http://localhost:8091/api/gallery/artist";

        try {
            await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            setForm({ name: "", birthDate: "", birthPlace: "", nationality: "", photoUrl: "" });
            setEditingId(null);
            loadArtists();
        } catch (err) {
            console.error("Save failed:", err);
        }
    };

    const handleEdit = (artist) => {
        setForm({ ...artist });
        setEditingId(artist.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id) => {
        if (!window.confirm(t.confirmDelete || "Are you sure you want to delete this artist?")) return;
        try {
            await fetch(`http://localhost:8091/api/gallery/artist/${id}`, { method: "DELETE" });
            loadArtists();
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    return (
        <div style={{ maxWidth: 800, margin: "2rem auto", padding: "1rem" }}>
            <h2>{editingId ? t.editArtist : t.addArtist}</h2>
            <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <input name="name" placeholder={t.name} value={form.name} onChange={handleChange} required />
                    <input name="birthDate" type="date" value={form.birthDate} onChange={handleChange} required />
                    <input name="birthPlace" placeholder={t.birthPlace} value={form.birthPlace} onChange={handleChange} required />
                    <input name="nationality" placeholder={t.nationality} value={form.nationality} onChange={handleChange} required />
                    <input name="photoUrl" placeholder={t.photoUrl} value={form.photoUrl} onChange={handleChange} />
                    <sl-button type="submit" variant="primary">{editingId ? t.update : t.create}</sl-button>
                    {editingId && (
                        <sl-button type="button" variant="default" onClick={() => {
                            setEditingId(null);
                            setForm({ name: "", birthDate: "", birthPlace: "", nationality: "", photoUrl: "" });
                        }}>
                            {t.cancel}
                        </sl-button>
                    )}
                </div>
            </form>

            <h2>{t.existingArtists}</h2>
            {loading ? (
                <p>{t.loading}...</p>
            ) : (
                artists.length === 0 ? (
                    <p>{t.noArtists}</p>
                ) : (
                    artists.map((artist) => (
                        <div key={artist.id} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", marginBottom: "1rem" }}>
                            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                                <img src={artist.photoUrl} alt={artist.name} style={{ width: 100, height: 100, objectFit: "cover", borderRadius: "8px" }} />
                                <div style={{ flexGrow: 1 }}>
                                    <h3>{artist.name}</h3>
                                    <p>{new Date(artist.birthDate).toLocaleDateString()}</p>
                                    <p>{artist.birthPlace}, {artist.nationality}</p>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                    <sl-button variant="primary" size="small" onClick={() => handleEdit(artist)}>{t.edit}</sl-button>
                                    <sl-button variant="danger" size="small" onClick={() => handleDelete(artist.id)}>{t.delete}</sl-button>
                                </div>
                            </div>
                        </div>
                    ))
                )
            )}
        </div>
    );
}
