import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const SettingsContext = createContext();
const API = process.env.REACT_APP_API || "http://localhost:5000/api";

export function useSettings() {
  return useContext(SettingsContext);
}

/* ── Translation dictionaries ────────────────────────────── */
const translations = {
  fr: {
    dashboard: "Tableau de bord",
    clients: "Clients",
    trucks: "Camions",
    workOrders: "Ordres de travail",
    invoices: "Factures",
    reports: "Rapports",
    certificates: "Certificats d'étalonnage",
    settings: "Paramètres",
    search: "Rechercher...",
    add: "Ajouter",
    save: "Enregistrer les modifications",
    saved: "✓ Modifications enregistrées",
    totalTrucks: "Total camions",
    totalClients: "Clients",
    activeRepairs: "Réparations actives",
    revenue: "Revenus",
    recentActivity: "Activité récente",
    notifications: "Notifications",
    markAllRead: "Tout marquer comme lu",
    noNotifications: "Aucune notification",
    profile: "Profil",
    profileDesc: "Vos informations personnelles",
    firstName: "Prénom",
    lastName: "Nom",
    email: "Email",
    phone: "Téléphone",
    company: "Entreprise",
    role: "Rôle",
    notificationsTitle: "Notifications",
    notificationsDesc: "Choisissez comment recevoir les alertes",
    emailNotif: "Notifications par email",
    emailNotifDesc: "Recevez les alertes par email",
    pushNotif: "Notifications push",
    pushNotifDesc: "Alertes dans le navigateur",
    certExpiry: "Expiration des certificats",
    certExpiryDesc: "Alerte 30 jours avant expiration",
    newOrders: "Nouveaux ordres de travail",
    newOrdersDesc: "Alerté à chaque nouvel ordre",
    security: "Sécurité",
    securityDesc: "Mot de passe et authentification",
    currentPassword: "Mot de passe actuel",
    newPassword: "Nouveau mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    preferences: "Préférences",
    preferencesDesc: "Apparence et langue",
    darkMode: "Mode sombre",
    darkModeDesc: "Interface en thème sombre",
    language: "Langue",
    languageDesc: "Langue de l'interface",
    autoBackup: "Sauvegarde automatique",
    autoBackupDesc: "Sauvegarde quotidienne des données",
    settingsPageTitle: "Paramètres",
    settingsPageDesc: "Gérez votre profil et les préférences de l'application",
    deleteConfirm: "Êtes-vous sûr de vouloir supprimer",
    cancel: "Annuler",
    confirm: "Confirmer",
    // Table / pages
    clientFound: "client(s) trouvé(s)",
    truckRegistered: "camion(s) enregistré(s)",
    orderCount: "ordre(s) de travail",
    invoiceCount: "facture(s)",
    certCount: "certificat(s)",
    loading: "Chargement...",
  },
  en: {
    dashboard: "Dashboard",
    clients: "Clients",
    trucks: "Trucks",
    workOrders: "Work Orders",
    invoices: "Invoices",
    reports: "Reports",
    certificates: "Calibration Certificates",
    settings: "Settings",
    search: "Search...",
    add: "Add",
    save: "Save changes",
    saved: "✓ Changes saved",
    totalTrucks: "Total trucks",
    totalClients: "Clients",
    activeRepairs: "Active repairs",
    revenue: "Revenue",
    recentActivity: "Recent activity",
    notifications: "Notifications",
    markAllRead: "Mark all as read",
    noNotifications: "No notifications",
    profile: "Profile",
    profileDesc: "Your personal information",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone",
    company: "Company",
    role: "Role",
    notificationsTitle: "Notifications",
    notificationsDesc: "Choose how to receive alerts",
    emailNotif: "Email notifications",
    emailNotifDesc: "Receive alerts by email",
    pushNotif: "Push notifications",
    pushNotifDesc: "Browser alerts",
    certExpiry: "Certificate expiry",
    certExpiryDesc: "Alert 30 days before expiry",
    newOrders: "New work orders",
    newOrdersDesc: "Notified for each new order",
    security: "Security",
    securityDesc: "Password and authentication",
    currentPassword: "Current password",
    newPassword: "New password",
    confirmPassword: "Confirm password",
    preferences: "Preferences",
    preferencesDesc: "Appearance and language",
    darkMode: "Dark mode",
    darkModeDesc: "Dark theme interface",
    language: "Language",
    languageDesc: "Interface language",
    autoBackup: "Auto backup",
    autoBackupDesc: "Daily data backup",
    settingsPageTitle: "Settings",
    settingsPageDesc: "Manage your profile and application preferences",
    deleteConfirm: "Are you sure you want to delete",
    cancel: "Cancel",
    confirm: "Confirm",
    clientFound: "client(s) found",
    truckRegistered: "truck(s) registered",
    orderCount: "work order(s)",
    invoiceCount: "invoice(s)",
    certCount: "certificate(s)",
    loading: "Loading...",
  },
  ar: {
    dashboard: "لوحة التحكم",
    clients: "العملاء",
    trucks: "الشاحنات",
    workOrders: "أوامر العمل",
    invoices: "الفواتير",
    reports: "التقارير",
    certificates: "شهادات المعايرة",
    settings: "الإعدادات",
    search: "...بحث",
    add: "إضافة",
    save: "حفظ التعديلات",
    saved: "✓ تم حفظ التعديلات",
    totalTrucks: "مجموع الشاحنات",
    totalClients: "العملاء",
    activeRepairs: "الإصلاحات النشطة",
    revenue: "الإيرادات",
    recentActivity: "النشاط الأخير",
    notifications: "الإشعارات",
    markAllRead: "تعليم الكل كمقروء",
    noNotifications: "لا توجد إشعارات",
    profile: "الملف الشخصي",
    profileDesc: "معلوماتك الشخصية",
    firstName: "الاسم الأول",
    lastName: "الاسم الأخير",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    company: "الشركة",
    role: "الدور",
    notificationsTitle: "الإشعارات",
    notificationsDesc: "اختر كيفية تلقي التنبيهات",
    emailNotif: "إشعارات البريد الإلكتروني",
    emailNotifDesc: "تلقي التنبيهات عبر البريد",
    pushNotif: "إشعارات الدفع",
    pushNotifDesc: "تنبيهات المتصفح",
    certExpiry: "انتهاء الشهادات",
    certExpiryDesc: "تنبيه قبل 30 يوم من الانتهاء",
    newOrders: "أوامر عمل جديدة",
    newOrdersDesc: "تنبيه عند كل أمر جديد",
    security: "الأمان",
    securityDesc: "كلمة المرور والمصادقة",
    currentPassword: "كلمة المرور الحالية",
    newPassword: "كلمة المرور الجديدة",
    confirmPassword: "تأكيد كلمة المرور",
    preferences: "التفضيلات",
    preferencesDesc: "المظهر واللغة",
    darkMode: "الوضع الداكن",
    darkModeDesc: "واجهة بسمة داكنة",
    language: "اللغة",
    languageDesc: "لغة الواجهة",
    autoBackup: "نسخ احتياطي تلقائي",
    autoBackupDesc: "نسخ احتياطي يومي للبيانات",
    settingsPageTitle: "الإعدادات",
    settingsPageDesc: "إدارة ملفك الشخصي وتفضيلات التطبيق",
    deleteConfirm: "هل أنت متأكد من الحذف",
    cancel: "إلغاء",
    confirm: "تأكيد",
    clientFound: "عميل (عملاء) تم العثور عليهم",
    truckRegistered: "شاحنة (شاحنات) مسجلة",
    orderCount: "أمر (أوامر) عمل",
    invoiceCount: "فاتورة (فواتير)",
    certCount: "شهادة (شهادات)",
    loading: "...جاري التحميل",
  },
};

export function SettingsProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("fr");
  const [loaded, setLoaded] = useState(false);

  /* Load settings from backend on mount */
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}/settings`);
        if (res.ok) {
          const data = await res.json();
          if (data.darkMode !== undefined) setDarkMode(data.darkMode === "true");
          if (data.language) setLanguage(data.language);
        }
      } catch { /* use defaults */ }
      setLoaded(true);
    };
    load();
  }, []);

  /* Apply dark mode class to <html> */
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  /* Apply RTL for Arabic */
  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  /* Persist settings to backend */
  const saveSettings = useCallback(async (overrides = {}) => {
    const settings = { darkMode: String(overrides.darkMode ?? darkMode), language: overrides.language ?? language };
    try {
      await fetch(`${API}/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
    } catch { /* silent */ }
  }, [darkMode, language]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => {
      const next = !prev;
      saveSettings({ darkMode: next });
      return next;
    });
  }, [saveSettings]);

  const changeLanguage = useCallback((lang) => {
    setLanguage(lang);
    saveSettings({ language: lang });
  }, [saveSettings]);

  const t = useCallback((key) => {
    return (translations[language] && translations[language][key]) || translations.fr[key] || key;
  }, [language]);

  const value = { darkMode, toggleDarkMode, language, changeLanguage, t, loaded };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
