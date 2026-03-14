function StatCard({ title, value, icon, trend, trendLabel, gradient = "from-brand-600 to-brand-500" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-6 shadow-lg transition-transform duration-300 hover:scale-[1.02]`}
    >
      {/* Decorative circle */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
      <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-white/[0.07] rounded-full" />

      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-white/80">{title}</p>
          <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
          {trend !== undefined && (
            <p className="text-xs font-medium text-white/70">
              <span className={trend >= 0 ? "text-emerald-200" : "text-rose-200"}>
                {trend >= 0 ? "+" : ""}{trend}%
              </span>
              {trendLabel && <span className="ml-1">{trendLabel}</span>}
            </p>
          )}
        </div>
        {icon && (
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;
