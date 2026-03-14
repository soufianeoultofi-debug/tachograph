import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import {
  MenuIcon,
  SearchIcon,
  BellIcon,
  LogOutIcon,
  LogInIcon,
  UserIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  ClockIcon,
} from "./Icons";

const pageTitles = {
  "/": "Tableau de bord",
  "/clients": "Clients",
  "/trucks": "Camions",
  "/work-orders": "Ordres de travail",
  "/invoices": "Factures",
  "/reports": "Rapports",
  "/calibration-certificates": "Certificats d'étalonnage",
  "/settings": "Paramètres",
  "/users": "Utilisateurs",
};

const typeIcon = {
  success: <CheckCircleIcon className="w-4 h-4 text-emerald-500 flex-shrink-0" />,
  warning: <AlertCircleIcon className="w-4 h-4 text-amber-500 flex-shrink-0" />,
  info: <ClockIcon className="w-4 h-4 text-brand-500 flex-shrink-0" />,
};

function Navbar({ onToggleSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showNotif, setShowNotif] = useState(false);
  const notifRef = useRef(null);

  const {
    notifications,
    unreadCount,
    markNotificationRead,
    markAllNotificationsRead,
  } = useData();

  /* close dropdown on outside click */
  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const title =
    pageTitles[location.pathname] ||
    Object.entries(pageTitles).find(([key]) =>
      key !== "/" && location.pathname.startsWith(key)
    )?.[1] ||
    "Tableau de bord";

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-700/80">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Left: hamburger + title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 -ml-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-white transition-colors"
            aria-label="Ouvrir le menu"
          >
            <MenuIcon className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              {title}
            </h1>
          </div>
        </div>

        {/* Right: search, notifications, user */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search bar (desktop) */}
          <div className="hidden md:flex items-center bg-slate-100 rounded-xl px-3 py-2 gap-2 w-64 focus-within:ring-2 focus-within:ring-brand-500 focus-within:bg-white transition-all">
            <SearchIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none flex-1"
            />
          </div>

          {/* Notification bell + dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotif(!showNotif)}
              className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            >
              <BellIcon className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] flex items-center justify-center px-1 text-[10px] font-bold text-white bg-rose-500 rounded-full ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Dropdown */}
            {showNotif && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-700/80 z-50 animate-slide-up overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Notifications
                    {unreadCount > 0 && (
                      <span className="ml-2 text-xs font-medium text-brand-600">
                        {unreadCount} nouvelle(s)
                      </span>
                    )}
                  </h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-xs font-medium text-brand-600 hover:text-brand-700 transition-colors"
                    >
                      Tout marquer lu
                    </button>
                  )}
                </div>

                {/* List */}
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
                  {notifications.length === 0 ? (
                    <p className="px-4 py-6 text-center text-sm text-slate-400">
                      Aucune notification
                    </p>
                  ) : (
                    notifications.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`w-full text-left flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors ${
                          !n.read ? "bg-brand-50/40" : ""
                        }`}
                      >
                        <div className="mt-0.5">
                          {typeIcon[n.type] || typeIcon.info}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-[13px] leading-snug ${
                              n.read
                                ? "text-slate-500"
                                : "text-slate-800 font-medium"
                            }`}
                          >
                            {n.text}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            {n.time}
                          </p>
                        </div>
                        {!n.read && (
                          <span className="mt-1.5 w-2 h-2 rounded-full bg-brand-500 flex-shrink-0" />
                        )}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8 bg-slate-200" />

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-brand-600" />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <LogOutIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 shadow-sm shadow-brand-600/25 transition-colors"
            >
              <LogInIcon className="w-4 h-4" />
              <span>Connexion</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;

