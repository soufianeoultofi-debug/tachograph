import React, { useState } from "react";
import { useData } from "../context/DataContext";
import Table from "../components/Table";
import FormModal from "../components/FormModal";

export default function CalibrationCertificates() {
  const { certificates, addCertificate, updateCertificate, deleteCertificate, loading } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold">Certificats d'étalonnage</h2>
        <p className="mt-4 text-sm text-slate-600">Chargement...</p>
      </div>
    );
  }

  const columns = certificates.length > 0 ? Object.keys(certificates[0]).filter(k => k !== "_id") : [];

  const handleEdit = (index) => {
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Êtes-vous sûr?")) {
      deleteCertificate(index);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Certificats d'étalonnage</h2>
        <button
          onClick={() => {
            setEditIndex(null);
            setShowModal(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Ajouter Certificat
        </button>
      </div>

      <Table
        columns={columns}
        data={certificates}
        emptyMessage="Aucun certificat disponible"
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showModal && (
        <FormModal
          title={editIndex !== null ? "Modifier Certificat" : "Ajouter Certificat"}
          fields={columns}
          initialData={editIndex !== null ? certificates[editIndex] : {}}
          onSave={async (data) => {
            if (editIndex !== null) {
              await updateCertificate(editIndex, data);
            } else {
              await addCertificate(data);
            }
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
