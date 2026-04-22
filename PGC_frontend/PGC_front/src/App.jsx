import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Importación de Componentes de Auth y Home
import Home from "./components/home/Home";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import RequestReset from "./components/auth/reset/RequestReset"
import ConfirmReset from "./components/auth/reset/ConfirmReset"

// Dashboard Usuario (Rol 2)
import UserDashboard from "./components/dashboard/user/UserDashboard";
import ProjectDetail from "./components/dashboard/global/ProjectDetail";

// Dashboard Admin (Rol 1)
import AdminDashboard from "./components/dashboard/admin/AdminDashboard";
import AdminProjects from "./components/dashboard/admin/AdminProjects";
import Training from "./components/dashboard/admin/Training";
import UserTable from "./components/dashboard/admin/UserTable";
import RegisterAdmin from "./components/dashboard/admin/RegisterAdminForm";
import UserProjects from "./components/dashboard/admin/UserProjects";
import UserProjectDetail from "./components/dashboard/admin/UserProjectDetail";
// Rutas Protegidas y Públicas
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import NotFound from "./components/Routes/NotFound";
import AccessDenied from "./components/Routes/AccessDenied"; // Importar el nuevo componente

function App() {
  return (
    <div className="min-h-screen bg-[#020617] transition-colors duration-500">
      <BrowserRouter>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/forgot-password" element={<PublicRoute><RequestReset /></PublicRoute>} />
          <Route path="/reset-password" element={<PublicRoute><ConfirmReset /></PublicRoute>} />
          {/* ... otras rutas públicas ... */}

          {/* RUTA DE ACCESO DENEGADO */}
          <Route path="/access-denied" element={<AccessDenied />} />

          {/* Dashboard Usuario (Rol 2) */}
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRole={2}>
              <UserDashboard />
            </ProtectedRoute>
          } />

          <Route path="/admin-dashboard" element={
            <ProtectedRoute allowedRole={1}>
              <AdminDashboard />
            </ProtectedRoute>}>
            <Route path="my-projects" element={<AdminProjects />} />
            <Route path="train-metrics" element={<Training />} />
            <Route path="list-users" element={<UserTable />} />
            <Route path="register" element={<RegisterAdmin />} />
            <Route path="user-projects/:userId" element={<UserProjects />} />
            <Route path="project-details/:id" element={<UserProjectDetail />} />
            {/* Redirección por defecto al entrar solo a /admin */}
            <Route index element={<Navigate to="my-projects" replace />} />
          </Route>

          <Route path="/proyecto/:id" element={
            <ProtectedRoute allowedRoles={[1, 2]}>
              <ProjectDetail />
            </ProtectedRoute>
          } />




          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;