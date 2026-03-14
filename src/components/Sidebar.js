import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  HomeIcon,
  UsersIcon,
  TruckIcon,
  ClipboardIcon,
  InvoiceIcon,
  ChartIcon,
  CertificateIcon,
  SettingsIcon,
  TachographLogo,
  XIcon,
  LogOutIcon,
  ShieldIcon,
} from "./Icons";

const navLinks = [
  { label: "Tableau de bord", path: "/", Icon: HomeIcon },
  { label: "Clients", path: "/clients", Icon: UsersIcon },
  { label: "Camions", path: "/trucks", Icon: TruckIcon },
  { label: "Ordres de travail", path: "/work-orders", Icon: ClipboardIcon },
  { label: "Factures", path: "/invoices", Icon: InvoiceIcon },
  { label: "Rapports", path: "/reports", Icon: ChartIcon },
  { label: "Certificats", path: "/calibration-certificates", Icon: CertificateIcon },
];

function Sidebar({ onClose }) {
  const { user, isAdmin, logout } = useAuth();
  return (
    <div className="w-[260px] bg-white dark:bg-slate-800 border-r border-slate-200/80 dark:border-slate-700/80 min-h-screen flex flex-col select-none">
      {/* ─── Brand ─── */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-brand-700 flex items-center justify-center shadow-md shadow-brand-600/20">
            <TachographLogo className="w-5 h-5 text-white" />
          </div>
          <span className="text-[15px] font-bold text-slate-900 dark:text-white tracking-tight">
            Tachograph
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* ─── Navigation ─── */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          Menu
        </p>
        {navLinks.map(({ label, path, Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150
              ${
                isActive
                  ? "bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-700 dark:hover:text-slate-200"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={`w-[18px] h-[18px] flex-shrink-0 transition-colors ${
                    isActive ? "text-brand-600" : "text-slate-400 group-hover:text-slate-500"
                  }`}
                />
                <span>{label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-600" />
                )}
              </>
            )}
          </NavLink>
        ))}

        {/* Admin-only: Utilisateurs */}
        {isAdmin && (
          <>
            <p className="px-3 mt-4 mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Administration
            </p>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150
                ${
                  isActive
                    ? "bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-700 dark:hover:text-slate-200"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <ShieldIcon
                    className={`w-[18px] h-[18px] flex-shrink-0 transition-colors ${
                      isActive ? "text-brand-600" : "text-slate-400 group-hover:text-slate-500"
                    }`}
                  />
                  <span>Utilisateurs</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-600" />
                  )}
                </>
              )}
            </NavLink>
          </>
        )}
      </nav>

      {/* ─── Bottom section ─── */}
      <div className="px-3 pb-3 space-y-1 border-t border-slate-100 dark:border-slate-700 pt-3">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150
            ${isActive ? "bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-700 dark:hover:text-slate-200"}`
          }
        >
          <SettingsIcon className="w-[18px] h-[18px]" />
          <span>Paramètres</span>
        </NavLink>

        {/* User card */}
        <div className="mt-2 mx-0.5 flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 px-3 py-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-xs font-bold text-white shadow-sm">
            {user?.name ? user.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) : "?"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 truncate">{user?.name || "Utilisateur"}</p>
            <p className="text-[11px] text-slate-400 truncate">{isAdmin ? "Administrateur" : "Technicien"}</p>
          </div>
          <button
            onClick={() => {
              logout();
              window.location.href = "/login";
            }}
            className="p-1.5 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors"
            title="Déconnexion"
          >
            <LogOutIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

