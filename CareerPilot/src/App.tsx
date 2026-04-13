import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/MainLayout";
import Profile from "./pages/Profile";
import Applications from "./pages/Applications"
import Goals from "./pages/Goals";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      {/* NAVBARSIZ SAYFALAR */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* NAVBARLI SAYFALAR (MainLayout içine sarmalanmış) */}
      <Route element={<MainLayout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* Buraya ekleyeceğin her Route'ta Navbar görünecektir */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route
        path="/applications"
        element={
          <ProtectedRoute>
            <Applications />
          </ProtectedRoute>
        }
      />
      <Route path="/goals" element={<ProtectedRoute><Goals /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;
