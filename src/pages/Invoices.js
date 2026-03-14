import React, { useState } from "react";
import { useData } from "../context/DataContext";
import Table from "../components/Table";
import FormModal from "../components/FormModal";

export default function Invoices() {
  const { invoices, addInvoice, updateInvoice, deleteInvoice, loading } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold">Factures</h2>
        <p className="mt-4 text-sm text-slate-600">Chargement...</p>
      </div>
    );
  }

  const columns = invoices.length > 0 ? Object.keys(invoices[0]).filter(k => k !== "_id") : [];

  const handleEdit = (index) => {
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Êtes-vous sûr?")) {
      deleteInvoice(index);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Factures</h2>
        <button
          onClick={() => {
            setEditIndex(null);
            setShowModal(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Ajouter Facture
        </button>
      </div>

      <Table
        columns={columns}
        data={invoices}
        emptyMessage="Aucune facture disponible"
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showModal && (
        <FormModal
          title={editIndex !== null ? "Modifier Facture" : "Ajouter Facture"}
          fields={columns}
          initialData={editIndex !== null ? invoices[editIndex] : {}}
          onSave={async (data) => {
            if (editIndex !== null) {
              await updateInvoice(editIndex, data);
            } else {
              await addInvoice(data);
            }
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
