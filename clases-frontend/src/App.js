import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import DepartamentosPage from './pages/DepartamentosPage';
import DepartamentoCreatePage from './pages/DepartamentoCreatePage';
import DepartamentoEditPage from './pages/DepartamentoEditPage';
import TrabajadoresPage from './pages/TrabajadoresPage';
import TrabajadorCreatePage from './pages/TrabajadorCreatePage';
import TrabajadorEditPage from './pages/TrabajadorEditPage';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  const { loading } = useContext(AuthContext);

  if (loading) return <div>Cargando...</div>; // o un spinner

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/departamentos"
        element={
          <ProtectedRoute>
            <DepartamentosPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/departamentos/crear"
        element={
          <ProtectedRoute>
            <DepartamentoCreatePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/departamentos/editar/:id"
        element={
          <ProtectedRoute>
            <DepartamentoEditPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trabajadores"
        element={
          <ProtectedRoute>
            <TrabajadoresPage />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/trabajadores/crear"
        element={
          <ProtectedRoute>
            <TrabajadorCreatePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trabajadores/editar/:id"
        element={
          <ProtectedRoute>
            <TrabajadorEditPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          localStorage.getItem('token') ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
