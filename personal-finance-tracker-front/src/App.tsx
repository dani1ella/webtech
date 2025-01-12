import React, { JSX, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SignUpPage } from './pages/SignUpPage';
import { LoginPage } from './pages/LoginPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardPage } from './pages/DashboardPage';
import { ExpensesPage } from './pages/ExpensesPage';
import { IncomePage } from './pages/IncomePage';
import { BudgetPage } from './pages/BudgetPage';
import { ReportsPage } from './pages/ReportsPage';

// Import Settings Layout and Sections
import { SettingsLayout } from './components/settings/SettingsLayout';

function App() {
  // State to manage authentication status
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // A function to handle login
  const handleLogin = () => {
    setIsAuthenticated(true); // On successful login, set user as authenticated
  };

  // A function to handle logout
  const handleLogout = () => {
    setIsAuthenticated(false); // Log out and reset authentication state
  };

  // Private Route wrapper to protect routes that need authentication
  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected Dashboard Routes */}
        <Route path="/" element={<DashboardLayout onLogout={handleLogout} />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="expenses"
            element={
              <PrivateRoute>
                <ExpensesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="income"
            element={
              <PrivateRoute>
                <IncomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="budget"
            element={
              <PrivateRoute>
                <BudgetPage />
              </PrivateRoute>
            }
          />
          <Route
            path="reports"
            element={
              <PrivateRoute>
                <ReportsPage />
              </PrivateRoute>
            }
          />
          
          {/* Add the settings route */}
          <Route
            path="settings"
            element={
              <PrivateRoute>
                <SettingsLayout />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
