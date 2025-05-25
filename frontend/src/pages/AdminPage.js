import React, { useEffect, useState } from "react";
import "@shoelace-style/shoelace/dist/components/card/card.js";
import "@shoelace-style/shoelace/dist/components/spinner/spinner.js";
import "@shoelace-style/shoelace/dist/components/divider/divider.js";

function AdminPage({ t }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingUserId, setEditingUserId] = useState(null);
    const [filterRole, setFilterRole] = useState("");

    const roles = ["ADMIN", "MANAGER", "EMPLOYEE", "VISITOR"];
    const initialForm = {
        username: "",
        password: "",
        email: "",
        phoneNumber: "",
        firstName: "",
        lastName: "",
        role: "VISITOR"
    };
    const [formData, setFormData] = useState(initialForm);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        setLoading(true);
        fetch("http://localhost:8090/api/users")
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const method = editingUserId ? "PUT" : "POST";
        const url = editingUserId
            ? `http://localhost:8090/api/users/${editingUserId}`
            : "http://localhost:8090/api/users";

        fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to save user");
                return res.json();
            })
            .then(() => {
                fetchUsers();
                setFormData(initialForm);
                setEditingUserId(null);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    };

    const handleEdit = (user) => {
        setFormData(user);
        setEditingUserId(user.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCancelEdit = () => {
        setFormData(initialForm);
        setEditingUserId(null);
    };

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        fetch(`http://localhost:8090/api/users/${id}`, { method: "DELETE" })
            .then(() => fetchUsers())
            .catch(err => setError(err.message));
    };

    const filteredUsers = filterRole
        ? users.filter(u => u.role === filterRole)
        : users;

    const handleExportCSV = () => {
        fetch("http://localhost:8093/api/export", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                exportType: "csv",
                entityType: "user",
            }),
        })
            .then(async (res) => {
                if (!res.ok) throw new Error("Export failed");
                const csvText = await res.text();
                // Creăm un blob și descărcăm fișierul CSV
                const blob = new Blob([csvText], { type: "text/csv" });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "users_export.csv";
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch((err) => {
                alert(err.message || "Failed to export CSV");
            });
    };

    return (
        <div style={{maxWidth: "1200px", margin: "0 auto", padding: "1rem"}}>
            <h1>{t?.userManagementTitle || "User Management"}</h1>

            <button
                onClick={handleExportCSV}
                style={{marginBottom: "1rem", padding: "0.5rem 1rem"}}
            >
                Export CSV
            </button>

            <form onSubmit={handleSubmit} style={{
                marginBottom: "2rem",
                display: "grid",
                gap: "1rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))"
            }}>
                {["username", "password", "email", "phoneNumber", "firstName", "lastName"].map((field) => (
                    <input
                        key={field}
                        type={field === "password" ? "password" : "text"}
                        name={field}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={formData[field]}
                        onChange={handleInputChange}
                        required={field !== "phoneNumber"}
                    />
                ))}
                <select name="role" value={formData.role} onChange={handleInputChange}>
                    {roles.map(role => (
                        <option key={role} value={role}>{role}</option>
                    ))}
                </select>
                <div style={{gridColumn: "span 2", display: "flex", gap: "1rem"}}>
                    <button type="submit">{editingUserId ? "Update User" : "Create User"}</button>
                    {editingUserId && (
                        <button type="button" onClick={handleCancelEdit} style={{background: "#ccc"}}>
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>

            <div style={{marginBottom: "1.5rem"}}>
                <label style={{marginRight: "0.5rem"}}>Filter by role:</label>
                <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
                    <option value="">All Roles</option>
                    {roles.map(role => (
                        <option key={role} value={role}>{role}</option>
                    ))}
                </select>
            </div>

            {loading && <sl-spinner style={{fontSize: "2rem"}}/>}
            {error && <p style={{color: "red"}}>{t?.error || "Error"}: {error}</p>}
            {filteredUsers.length === 0 && !loading && <p>No users found.</p>}

            <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem"}}>
                {filteredUsers.map(user => (
                    <sl-card key={user.id} style={{boxShadow: "0 4px 10px rgba(0,0,0,0.1)"}}>
                        <h3 slot="header" style={{marginLeft: "0.5rem"}}>{user.username}</h3>
                        <p style={{marginLeft: "0.5rem"}}><strong>Email:</strong> {user.email}</p>
                        <p style={{marginLeft: "0.5rem"}}><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                        <p style={{marginLeft: "0.5rem"}}><strong>Phone:</strong> {user.phoneNumber || "-"}</p>
                        <p style={{marginLeft: "0.5rem"}}><strong>Role:</strong> {user.role}</p>
                        <div style={{display: "flex", justifyContent: "space-between", padding: "1rem"}}>
                            <button onClick={() => handleEdit(user)}>Edit</button>
                            <button onClick={() => handleDelete(user.id)} style={{color: "red"}}>Delete</button>
                        </div>
                    </sl-card>
                ))}
            </div>
        </div>
    );
}

export default AdminPage;
