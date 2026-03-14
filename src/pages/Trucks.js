import React, { useState } from "react";
import { useData } from "../context/DataContext";
import Table from "../components/Table";
import FormModal from "../components/FormModal";

export default function Trucks() {
  const { trucks, addTruck, updateTruck, deleteTruck, loading } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold">Camions</h2>
        <p className="mt-4 text-sm text-slate-600">Chargement...</p>
      </div>
    );
  }

  const columns = trucks.length > 0 ? Object.keys(trucks[0]).filter(k => k !== "_id") : [];

  const handleEdit = (index) => {
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Êtes-vous sûr?")) {
      deleteTruck(index);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Camions</h2>
        <button
          onClick={() => {
            setEditIndex(null);
            setShowModal(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Ajouter Camion
        </button>
      </div>

      <Table
        columns={columns}
        data={trucks}
        emptyMessage="Aucun camion disponible"
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showModal && (
        <FormModal
          title={editIndex !== null ? "Modifier Camion" : "Ajouter Camion"}
          fields={columns}
          initialData={editIndex !== null ? trucks[editIndex] : {}}
          onSave={async (data) => {
            if (editIndex !== null) {
              await updateTruck(editIndex, data);
            } else {
              await addTruck(data);
            }
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
