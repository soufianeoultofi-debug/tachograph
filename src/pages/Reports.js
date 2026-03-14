import React, { useMemo } from "react";
import { useData } from "../context/DataContext";
import StatCard from "../components/StatCard";
import LineChart from "../components/LineChart";

export default function Reports() {
  const { dashboardStats, clients, trucks, workOrders, invoices, certificates, loading } = useData();

  const revenueDH = useMemo(() => {
    const value = Number(dashboardStats?.revenue || 0);
    return `${value.toLocaleString("fr-MA")} DH`;
  }, [dashboardStats]);

  const chartData = useMemo(() => ({
    labels: ["Clients", "Camions", "Ordres", "Factures", "Certificats"],
    datasets: [
      {
        label: "Éléments",
        data: [clients.length, trucks.length, workOrders.length, invoices.length, certificates.length],
        borderColor: "rgb(37, 99, 235)",
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        tension: 0.25,
      },
    ],
  }), [clients, trucks, workOrders, invoices, certificates]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
  }), []);

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold">Rapports</h2>
        <p className="mt-4 text-sm text-slate-600">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Rapports et Statistiques</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Camions"
          value={trucks.length}
          gradient="from-blue-600 to-blue-500"
        />
        <StatCard
          title="Total Clients"
          value={clients.length}
          gradient="from-green-600 to-green-500"
        />
        <StatCard
          title="Ordres Actifs"
          value={dashboardStats.activeRepairs || 0}
          gradient="from-purple-600 to-purple-500"
        />
        <StatCard
          title="Chiffre d'affaires (DH)"
          value={revenueDH}
          gradient="from-orange-600 to-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">Vue globale des données</h3>
          <LineChart data={chartData} options={chartOptions} />
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">Résumé</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
              <span className="text-slate-600 dark:text-slate-400">Camions Totaux</span>
              <span className="font-semibold">{trucks.length}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
              <span className="text-slate-600 dark:text-slate-400">Clients Totaux</span>
              <span className="font-semibold">{clients.length}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
              <span className="text-slate-600 dark:text-slate-400">Réparations Actives</span>
              <span className="font-semibold text-orange-600">{dashboardStats.activeRepairs || 0}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-slate-600 dark:text-slate-400">Revenu Total</span>
              <span className="font-semibold text-green-600">{revenueDH}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
