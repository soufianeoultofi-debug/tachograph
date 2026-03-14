import React from "react";

function Card({ title, subtitle, icon, children, className = "", noPadding = false }) {
  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-card hover:shadow-card-hover transition-shadow duration-300 ${
        noPadding ? "" : "p-6"
      } ${className}`}
    >
      {(title || icon) && (
        <div className="flex items-center gap-3 mb-4">
          {icon && (
            <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-brand-600">
              {icon}
            </div>
          )}
          <div>
            {title && (
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h2>
            )}
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

export default Card;
