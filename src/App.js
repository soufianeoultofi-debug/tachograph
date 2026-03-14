import { Routes, Route, Navigate } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import { SettingsProvider } from "./context/SettingsContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import MainLayout from "./layouts/Mainlayout";

import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Trucks from "./pages/Trucks";
import WorkOrders from "./pages/WorkOrders";
import Invoices from "./pages/Invoices";
import Reports from "./pages/Reports";
import CalibrationCertificates from "./pages/CalibrationCertificates";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Users from "./pages/Users";

function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" replace />;
}

function RequireAdmin({ children }) {
  const { isAdmin, loading } = useAuth();
  if (loading) return null;
  return isAdmin ? children : <Navigate to="/" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <MainLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="clients" element={<Clients />} />
        <Route path="trucks" element={<Trucks />} />
        <Route path="work-orders" element={<WorkOrders />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="reports" element={<Reports />} />
        <Route path="calibration-certificates" element={<CalibrationCertificates />} />
        <Route path="settings" element={<Settings />} />
        <Route
          path="users"
          element={
            <RequireAdmin>
              <Users />
            </RequireAdmin>
          }
        />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <DataProvider>
          <AppRoutes />
        </DataProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}
