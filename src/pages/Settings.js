import React, { useEffect, useMemo, useState } from "react";
import Card from "../components/Card";
import { useSettings } from "../context/SettingsContext";

export default function Settings() {
  const { darkMode, toggleDarkMode, language, changeLanguage, t, loaded } = useSettings();
  const API = process.env.REACT_APP_API || "http://localhost:5000/api";
  const [preferences, setPreferences] = useState({
    emailNotif: true,
    pushNotif: true,
    certExpiry: true,
    newOrders: true,
    autoBackup: false,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const parseBool = (value, fallback = false) => {
    if (value === undefined || value === null) return fallback;
    return value === true || value === "true";
  };

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const res = await fetch(`${API}/settings`);
        if (!res.ok) return;
        const data = await res.json();
        setPreferences({
          emailNotif: parseBool(data.emailNotif, true),
          pushNotif: parseBool(data.pushNotif, true),
          certExpiry: parseBool(data.certExpiry, true),
          newOrders: parseBool(data.newOrders, true),
          autoBackup: parseBool(data.autoBackup, false),
        });
      } catch {
      }
    };

    if (loaded) {
      loadPreferences();
    }
  }, [API, loaded]);

  const settingRows = useMemo(() => ([
    { key: "emailNotif", title: t("emailNotif"), desc: t("emailNotifDesc") },
    { key: "pushNotif", title: t("pushNotif"), desc: t("pushNotifDesc") },
    { key: "certExpiry", title: t("certExpiry"), desc: t("certExpiryDesc") },
    { key: "newOrders", title: t("newOrders"), desc: t("newOrdersDesc") },
    { key: "autoBackup", title: t("autoBackup"), desc: t("autoBackupDesc") },
  ]), [t]);

  const onTogglePreference = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
  };

  const saveAllSettings = async () => {
    try {
      setSaving(true);
      const payload = {
        darkMode: String(darkMode),
        language,
        ...Object.fromEntries(
          Object.entries(preferences).map(([key, value]) => [key, String(value)])
        ),
      };

      await fetch(`${API}/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 1800);
    } finally {
      setSaving(false);
    }
  };

  if (!loaded) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold">{t("settingsPageTitle")}</h2>
        <p className="mt-4 text-sm text-slate-600">{t("loading")}</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{t("settingsPageTitle")}</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{t("settingsPageDesc")}</p>
        </div>
        <button
          onClick={saveAllSettings}
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
        >
          {saving ? t("loading") : t("save")}
        </button>
      </div>

      {saved && (
        <div className="text-sm text-emerald-600 font-medium">{t("saved")}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title={t("preferences")} subtitle={t("preferencesDesc")}>
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-100">{t("darkMode")}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t("darkModeDesc")}</p>
              </div>
              <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} className="h-5 w-5" />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-800 dark:text-slate-100">{t("language")}</label>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t("languageDesc")}</p>
              <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </select>
            </div>
          </div>
        </Card>

        <Card title={t("notificationsTitle")} subtitle={t("notificationsDesc")}>
          <div className="space-y-5">
            {settingRows.map((row) => (
              <div className="flex items-center justify-between" key={row.key}>
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-100">{row.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{row.desc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences[row.key]}
                  onChange={() => onTogglePreference(row.key)}
                  className="h-5 w-5"
                />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
