import React from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { ChartIcon } from "./Icons";

function MonthlyStatistics({ data }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 p-3 text-sm">
          <p className="font-semibold text-slate-900 mb-1">{label}</p>
          {payload.map((entry, idx) => (
            <p key={idx} className="text-slate-600" style={{ color: entry.color }}>
              {entry.name}: <span className="font-medium">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center">
          <ChartIcon className="w-[18px] h-[18px] text-brand-600" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Statistiques mensuelles
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Étalonnages et revenus par mois
          </p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorCalibrations" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            dx={-8}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '13px', paddingTop: '12px' }}
          />
          <Area
            type="monotone"
            dataKey="calibrations"
            name="Étalonnages"
            stroke="#6366f1"
            strokeWidth={2.5}
            fill="url(#colorCalibrations)"
            dot={{ fill: '#6366f1', strokeWidth: 0, r: 3 }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            name="Revenus"
            stroke="#10b981"
            strokeWidth={2.5}
            fill="url(#colorRevenue)"
            dot={{ fill: '#10b981', strokeWidth: 0, r: 3 }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyStatistics;
