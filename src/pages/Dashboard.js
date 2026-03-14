import React from "react";
import { useData } from "../context/DataContext";
import StatCard from "../components/StatCard";
import Table from "../components/Table";
import { TruckIcon, UsersIcon, ClipboardIcon, CertificateIcon } from "../components/Icons";

export default function Dashboard() {
  const { clients, trucks, workOrders, certificates, loading } = useData();

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold">Tableau de bord</h2>
        <p className="mt-4 text-sm text-slate-600">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Tableau de bord</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Clients"
          value={clients.length}
          icon={<UsersIcon className="w-6 h-6 text-white" />}
          gradient="from-blue-600 to-blue-500"
        />
        <StatCard
          title="Camions"
          value={trucks.length}
          icon={<TruckIcon className="w-6 h-6 text-white" />}
          gradient="from-green-600 to-green-500"
        />
        <StatCard
          title="Bons de Travail"
          value={workOrders.length}
          icon={<ClipboardIcon className="w-6 h-6 text-white" />}
          gradient="from-purple-600 to-purple-500"
        />
        <StatCard
          title="Certificats"
          value={certificates.length}
          icon={<CertificateIcon className="w-6 h-6 text-white" />}
          gradient="from-orange-600 to-orange-500"
        />
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Clients Récents</h3>
          <Table
            columns={clients.length > 0 ? Object.keys(clients[0]) : []}
            data={clients.slice(0, 5)}
            emptyMessage="Aucun client"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Camions Récents</h3>
          <Table
            columns={trucks.length > 0 ? Object.keys(trucks[0]) : []}
            data={trucks.slice(0, 5)}
            emptyMessage="Aucun camion"
          />
        </div>
      </div>
    </div>
  );
}
