import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMessages } from "../context/MessageContext";
import { useProfile } from "../context/ProfileContext";
import { useTheme } from "../context/ThemeContext";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { unreadCount } = useMessages();
  const { profile } = useProfile();
  const { isDark, toggleTheme } = useTheme();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg shadow-sm px-4 py-2 sticky-top">
      <div className="container-fluid">
        {/* Logo */}
        <div
          className="navbar-brand d-flex align-items-center fw-bold"
          onClick={() => navigate("/dashboard")}
          style={{ cursor: "pointer" }}
        >
          <img
            src="logo.png"
            alt="Logo"
            width="42"
            height="42"
            className="me-2"
          />
          <span className="text-primary">Career</span>
          <span>Pilot</span>
        </div>

        {/* Mobil Menü Butonu */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Orta Linkler */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-2">
            {[
              { name: "Anasayfa", path: "/dashboard" },
              { name: "Başvurularım", path: "/applications" },
              { name: "Öğrenme Planı", path: "/goals" },
            ].map((link) => (
              <li className="nav-item" key={link.path}>
                <button
                  className={`nav-link btn btn-link border-0 px-3 fw-medium ${
                    isActive(link.path)
                      ? "text-primary bg-primary bg-opacity-10 rounded-3"
                      : "text-secondary"
                  }`}
                  onClick={() => navigate(link.path)}
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>

          {/* Sağ Taraf */}
          <div className="d-flex align-items-center gap-3">

            {/* Dark/Light Tema Butonu */}
            <button
              className="btn btn-link nav-link p-0 border-0"
              onClick={toggleTheme}
              title={isDark ? "Aydınlık Mod" : "Karanlık Mod"}
            >
              {isDark ? (
                <i className="bi bi-sun-fill text-warning" style={{ fontSize: "1.2rem" }}></i>
              ) : (
                <i className="bi bi-moon-fill text-secondary" style={{ fontSize: "1.2rem" }}></i>
              )}
            </button>

            {/* Mesaj Butonu */}
            <button
              className="btn btn-light position-relative rounded-pill px-3 py-2 border-0 d-flex align-items-center gap-2"
              onClick={() => navigate("/messages")}
              style={{ fontSize: "0.9rem" }}
            >
              <i className="bi bi-envelope-arrow-down-fill text-primary" style={{ fontSize: "1.2rem" }}></i>
              {unreadCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-white border-2"
                  style={{ fontSize: "0.65rem", padding: "0.4em 0.6em" }}
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Profil Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-link p-0 border-0 d-flex align-items-center gap-2 text-decoration-none dropdown-toggle shadow-none"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                  style={{ width: "38px", height: "38px" }}
                >
                  {profile.name[0]?.toUpperCase() || "?"}
                </div>
                <span className="fw-medium d-none d-sm-inline">
                  {profile.name}
                </span>
              </button>

              <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2 p-2 rounded-3">
                <li>
                  <button
                    className="dropdown-item rounded-2 py-2"
                    onClick={() => navigate("/profile")}
                  >
                    <i className="bi bi-person me-2 text-secondary"></i> Profil
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-2 py-2"
                    onClick={() => navigate("/settings")}
                  >
                    <i className="bi bi-gear me-2 text-secondary"></i> Ayarlar
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-2 py-2"
                    onClick={() => navigate("/messages")}
                  >
                    <i className="bi bi-envelope me-2 text-secondary"></i> Mesajlar
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider opacity-50" />
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-2 py-2 text-danger"
                    onClick={() => { logout(); navigate("/login"); }}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i> Çıkış Yap
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;