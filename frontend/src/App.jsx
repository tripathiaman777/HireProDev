import React, { Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { useAuthStore } from "./store/authStore";
import Dashboard from "./pages/Dashboard";
import LoadingSpinner from "./components/LoadingSpinner";
import Profile from "./pages/Profile";
import Billings from "./pages/Billings";
import Products from "./pages/Products";
import Purchase from "./pages/Purchase";
import PDFViewer from "./components/worker";
import { Toaster } from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/profile" replace />;
  } else {
    return children;
  }
};

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex justify-center relative overflow-hidden">
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated && user.isVerified ? <Navigate to="/profile" replace /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route
              path="profile"
              element={<Profile />}
            />
            <Route
              path="products"
              element={<Products />}
            />
            <Route
              path="billing"
              element={<Billings />}
            />
            <Route
              path="purchase"
              element={<Purchase />}
            />
            <Route
              path="receipt/:id"
              element={<PDFViewer />}
            />
          </Route>
          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <SignUp />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <Login />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/verify-email"
            element={
              <RedirectAuthenticatedUser>
                <EmailVerificationPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route path="*" element={<Navigate to="/profile" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
