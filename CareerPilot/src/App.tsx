import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/MainLayout";
import Profile from "./pages/Profile";

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
    </Routes>
  );
}

export default App;
