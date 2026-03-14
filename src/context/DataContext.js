import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useAuth } from "./AuthContext";

const DataContext = createContext();
const API = process.env.REACT_APP_API || "https://tachograph.onrender.com/api";

export function useData() {
  return useContext(DataContext);
}

const clientToDisplay = (r) => ({ _id: r.id, Nom: r.nom, Téléphone: r.telephone, Entreprise: r.entreprise, Email: r.email });
const clientToDB = (d) => ({ nom: d.Nom, telephone: d["Téléphone"], entreprise: d.Entreprise, email: d.Email });

const truckToDisplay = (r) => ({ _id: r.id, "N° Camion": r.numero, VIN: r.vin, Client: r.client, Appareil: r.appareil, Statut: r.statut });
const truckToDB = (d) => ({ numero: d["N° Camion"], vin: d.VIN, client: d.Client, appareil: d.Appareil, statut: d.Statut });

const woToDisplay = (r) => ({ _id: r.id, Camion: r.camion, Client: r.client, Service: r.service, Technicien: r.technicien, Statut: r.statut });
const woToDB = (d) => ({ camion: d.Camion, client: d.Client, service: d.Service, technicien: d.Technicien, statut: d.Statut });

const invToDisplay = (r) => ({ _id: r.id, "N° Facture": r.numero, Client: r.client, Camion: r.camion, Montant: r.montant, Statut: r.statut });
const invToDB = (d) => ({ numero: d["N° Facture"], client: d.Client, camion: d.Camion, montant: d.Montant, statut: d.Statut });

const certToDisplay = (r) => ({ _id: r.id, id: r.cert_id, client: r.client, truck: r.truck, date: r.date_issued, expiration: r.expiration });
const certToDB = (d) => ({ cert_id: d.id, client: d.client, truck: d.truck, date_issued: d.date, expiration: d.expiration });

const notifToDisplay = (r) => ({ id: r.id, text: r.text_content, time: r.time_label, read: !!r.is_read, type: r.type });

export function DataProvider({ children }) {
  const { token } = useAuth();

  const api = useCallback(async (url, method = "GET", body) => {
    const opts = { 
      method, 
      headers: { "Content-Type": "application/json" } 
    };
    if (token) {
      opts.headers.Authorization = `Bearer ${token}`;
    }
    if (body) opts.body = JSON.stringify(body);
    console.log(`API Call: ${method} ${url}`);
    const res = await fetch(url, opts);
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`API Error (${res.status}):`, errorText);
      throw new Error(errorText || `API error: ${res.status}`);
    }
    const data = await res.json();
    console.log(`API Success: ${url}`, data);
    return data;
  }, [token]);
  const [clients, setClients] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [workOrders, setWorkOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [cl, tr, wo, inv, cert, notif] = await Promise.all([
          api(`${API}/clients`),
          api(`${API}/trucks`),
          api(`${API}/workorders`),
          api(`${API}/invoices`),
          api(`${API}/certificates`),
          api(`${API}/notifications`),
        ]);
        setClients(cl.map(clientToDisplay));
        setTrucks(tr.map(truckToDisplay));
        setWorkOrders(wo.map(woToDisplay));
        setInvoices(inv.map(invToDisplay));
        setCertificates(cert.map(certToDisplay));
        setNotifications(notif.map(notifToDisplay));
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [api]);

  const addClient = useCallback(async (item) => {
    const row = await api(`${API}/clients`, "POST", clientToDB(item));
    setClients((prev) => [clientToDisplay(row), ...prev]);
  }, [api]);
  const updateClient = useCallback(async (index, updated) => {
    const id = clients[index]?._id;
    if (!id) return;
    const row = await api(`${API}/clients/${id}`, "PUT", clientToDB(updated));
    setClients((prev) => prev.map((c, i) => (i === index ? clientToDisplay(row) : c)));
  }, [api, clients]);
  const deleteClient = useCallback(async (index) => {
    const id = clients[index]?._id;
    if (!id) return;
    await api(`${API}/clients/${id}`, "DELETE");
    setClients((prev) => prev.filter((_, i) => i !== index));
  }, [api, clients]);

  const addTruck = useCallback(async (item) => {
    const row = await api(`${API}/trucks`, "POST", truckToDB(item));
    setTrucks((prev) => [truckToDisplay(row), ...prev]);
  }, [api]);
  const updateTruck = useCallback(async (index, updated) => {
    const id = trucks[index]?._id;
    if (!id) return;
    const row = await api(`${API}/trucks/${id}`, "PUT", truckToDB(updated));
    setTrucks((prev) => prev.map((t, i) => (i === index ? truckToDisplay(row) : t)));
  }, [api, trucks]);
  const deleteTruck = useCallback(async (index) => {
    const id = trucks[index]?._id;
    if (!id) return;
    await api(`${API}/trucks/${id}`, "DELETE");
    setTrucks((prev) => prev.filter((_, i) => i !== index));
  }, [api, trucks]);

  const addWorkOrder = useCallback(async (item) => {
    const row = await api(`${API}/workorders`, "POST", woToDB(item));
    setWorkOrders((prev) => [woToDisplay(row), ...prev]);
  }, [api]);
  const updateWorkOrder = useCallback(async (index, updated) => {
    const id = workOrders[index]?._id;
    if (!id) return;
    const row = await api(`${API}/workorders/${id}`, "PUT", woToDB(updated));
    setWorkOrders((prev) => prev.map((w, i) => (i === index ? woToDisplay(row) : w)));
  }, [api, workOrders]);
  const deleteWorkOrder = useCallback(async (index) => {
    const id = workOrders[index]?._id;
    if (!id) return;
    await api(`${API}/workorders/${id}`, "DELETE");
    setWorkOrders((prev) => prev.filter((_, i) => i !== index));
  }, [api, workOrders]);

  const addInvoice = useCallback(async (item) => {
    const row = await api(`${API}/invoices`, "POST", invToDB(item));
    setInvoices((prev) => [invToDisplay(row), ...prev]);
  }, [api]);
  const updateInvoice = useCallback(async (index, updated) => {
    const id = invoices[index]?._id;
    if (!id) return;
    const row = await api(`${API}/invoices/${id}`, "PUT", invToDB(updated));
    setInvoices((prev) => prev.map((inv, i) => (i === index ? invToDisplay(row) : inv)));
  }, [api, invoices]);
  const deleteInvoice = useCallback(async (index) => {
    const id = invoices[index]?._id;
    if (!id) return;
    await api(`${API}/invoices/${id}`, "DELETE");
    setInvoices((prev) => prev.filter((_, i) => i !== index));
  }, [api, invoices]);

  const addCertificate = useCallback(async (item) => {
    const row = await api(`${API}/certificates`, "POST", certToDB(item));
    setCertificates((prev) => [certToDisplay(row), ...prev]);
  }, [api]);
  const updateCertificate = useCallback(async (index, updated) => {
    const id = certificates[index]?._id;
    if (!id) return;
    const row = await api(`${API}/certificates/${id}`, "PUT", certToDB(updated));
    setCertificates((prev) => prev.map((c, i) => (i === index ? certToDisplay(row) : c)));
  }, [api, certificates]);
  const deleteCertificate = useCallback(async (index) => {
    const id = certificates[index]?._id;
    if (!id) return;
    await api(`${API}/certificates/${id}`, "DELETE");
    setCertificates((prev) => prev.filter((_, i) => i !== index));
  }, [api, certificates]);

  const markNotificationRead = useCallback(async (id) => {
    await api(`${API}/notifications/${id}/read`, "PUT");
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, [api]);
  const markAllNotificationsRead = useCallback(async () => {
    await api(`${API}/notifications/read-all`, "PUT");
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, [api]);
  const addNotification = useCallback(async (text, type = "info") => {
    try {
      const row = await api(`${API}/notifications`, "POST", { text_content: text, type });
      setNotifications((prev) => [notifToDisplay(row), ...prev]);
    } catch {
      setNotifications((prev) => [{ id: Date.now(), text, time: "À l'instant", read: false, type }, ...prev]);
    }
  }, [api]);

  const dashboardStats = {
    totalTrucks: trucks.length,
    totalClients: clients.length,
    activeRepairs: workOrders.filter((o) => o.Statut === "In Progress").length,
    revenue: invoices.reduce((sum, inv) => {
      const num = parseInt(String(inv.Montant).replace(/[^\d]/g, ""), 10) || 0;
      return sum + num;
    }, 0),
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const value = {
    clients,
    trucks,
    workOrders,
    invoices,
    certificates,
    notifications,
    unreadCount,
    dashboardStats,
    loading,
    addClient,
    updateClient,
    deleteClient,
    addTruck,
    updateTruck,
    deleteTruck,
    addWorkOrder,
    updateWorkOrder,
    deleteWorkOrder,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    addCertificate,
    updateCertificate,
    deleteCertificate,
    markNotificationRead,
    markAllNotificationsRead,
    addNotification,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
