import React from "react";
import { CheckCircleIcon, ClockIcon, AlertCircleIcon } from "./Icons";

const statusConfig = {
  // English statuses
  Completed: { label: "Terminé", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", Icon: CheckCircleIcon },
  "In Progress": { label: "En cours", bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500", Icon: ClockIcon },
  Pending: { label: "En attente", bg: "bg-rose-50", text: "text-rose-700", dot: "bg-rose-500", Icon: AlertCircleIcon },
  Valid: { label: "Valide", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", Icon: CheckCircleIcon },
  Expired: { label: "Expiré", bg: "bg-rose-50", text: "text-rose-700", dot: "bg-rose-500", Icon: AlertCircleIcon },
  Active: { label: "Actif", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", Icon: CheckCircleIcon },
  "In Repair": { label: "En réparation", bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500", Icon: ClockIcon },
  Paid: { label: "Payé", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", Icon: CheckCircleIcon },
  // French statuses (passthrough)
  "Terminé": { label: "Terminé", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", Icon: CheckCircleIcon },
  "En cours": { label: "En cours", bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500", Icon: ClockIcon },
  "En attente": { label: "En attente", bg: "bg-rose-50", text: "text-rose-700", dot: "bg-rose-500", Icon: AlertCircleIcon },
  "Valide": { label: "Valide", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", Icon: CheckCircleIcon },
  "Expiré": { label: "Expiré", bg: "bg-rose-50", text: "text-rose-700", dot: "bg-rose-500", Icon: AlertCircleIcon },
  "Payé": { label: "Payé", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", Icon: CheckCircleIcon },
};

function StatusBadge({ status }) {
  const config = statusConfig[status] || {
    label: status,
    bg: "bg-slate-100",
    text: "text-slate-600",
    dot: "bg-slate-400",
    Icon: null,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${config.bg} ${config.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

export default StatusBadge;
