import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Table from "../components/Table";
import Card from "../components/Card";

export default function Users() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "technician", password: "" });
  const [saving, setSaving] = useState(false);
  const API = process.env.REACT_APP_API || "http://localhost:5000/api";

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetch(`${API}/auth/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to load users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error loading users:", err);
      } finally {
        setLoading(false);
      }
    };
    if (token) loadUsers();
  }, [token, API]);

  const handleAddClick = () => {
    setEditIndex(null);
    setFormData({ name: "", email: "", role: "technician", password: "" });
    setShowModal(true);
  };

  const handleEditClick = (index) => {
    const user = users[index];
    setEditIndex(index);
    setFormData({ name: user.name, email: user.email, role: user.role, password: "" });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.email) {
      alert("Nom et email sont requis");
      return;
    }

    setSaving(true);
    try {
      if (editIndex !== null) {
        // Update existing user
        const user = users[editIndex];
        const payload = { name: formData.name, email: formData.email, role: formData.role };
        if (formData.password) payload.password = formData.password;

        const res = await fetch(`${API}/auth/users/${user.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to update user");

        const updated = await res.json();
        setUsers((prev) =>
          prev.map((u, i) =>
            i === editIndex ? { ...u, name: updated.name, email: updated.email, role: updated.role } : u
          )
        );
      } else {
        // Create new user
        if (!formData.password) {
          alert("Mot de passe requis pour un nouvel utilisateur");
          setSaving(false);
          return;
        }

        const res = await fetch(`${API}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            role: formData.role,
            password: formData.password,
          }),
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || "Failed to create user");
        }

        const newUser = await res.json();
        setUsers((prev) => [
          { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role, created_at: new Date().toISOString() },
          ...prev,
        ]);
      }

      setShowModal(false);
      setFormData({ name: "", email: "", role: "technician", password: "" });
    } catch (err) {
      console.error("Error saving user:", err);
      alert(err.message || "Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (index) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur?")) {
      try {
        const user = users[index];
        const res = await fetch(`${API}/auth/users/${user.id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to delete user");
        setUsers((prev) => prev.filter((_, i) => i !== index));
      } catch (err) {
        console.error("Error deleting user:", err);
        alert("Erreur lors de la suppression");
      }
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold">Utilisateurs</h2>
        <p className="mt-4 text-sm text-slate-600">Chargement...</p>
      </div>
    );
  }

  const columns = users.length > 0 ? Object.keys(users[0]).filter((k) => k !== "password" && k !== "id") : [];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Utilisateurs</h2>
        <button
          onClick={handleAddClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Ajouter Utilisateur
        </button>
      </div>

      <Table
        columns={columns}
        data={users.map(({ password, id, ...u }) => u)}
        emptyMessage="Aucun utilisateur disponible"
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />

      {showModal && (
        <Card className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4" noPadding>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold">
                {editIndex !== null ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nom</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2"
                  placeholder="Nom complet"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2"
                  placeholder="email@exemple.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Rôle</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2"
                >
                  <option value="technician">Technicien</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Mot de passe {editIndex !== null && "(laisser vide pour ne pas changer)"}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2"
                  placeholder={editIndex !== null ? "Optionnel" : "Mot de passe"}
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 border border-slate-300 hover:bg-slate-50"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60"
              >
                {saving ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
