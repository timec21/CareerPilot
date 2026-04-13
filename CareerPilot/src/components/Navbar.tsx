import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // TypeScript hatasını önlemek için 'path' tipini 'string' olarak belirledik
  const goTo = (path: string): void => {
    navigate(path);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-3">
      <div className="container-fluid">
        {/* 1. Sol Kısım: Logo ve Profil (Geri Geldi) */}
        <div
          className="navbar-brand d-flex align-items-center"
          style={{ cursor: "pointer" }}
          onClick={() => goTo("/profile")}
        >
          <img
            src="logo.png"
            alt="Logo"
            width="50"
            height="50"
            className="rounded-circle me-2"
          />
          <span className="fw-bold">Profil</span>
        </div>

        {/* Mobil Menü Butonu */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 2. Orta ve Sağ İçerik */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button
                className="nav-link btn btn-link border-0 text-decoration-none"
                onClick={() => goTo("/")}
              >
                Anasayfa
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link border-0 text-decoration-none"
                onClick={() => goTo("/applications")}
              >
                Başvurularım
              </button>
            </li>
            {/* Öğrenme Planı (Geri Geldi) */}
            <li className="nav-item">
              <button
                className="nav-link btn btn-link border-0 text-decoration-none"
                onClick={() => goTo("/ogrenme-plani")}
              >
                Öğrenme Planı
              </button>
            </li>
          </ul>

          {/* 3. Arama Çubuğu */}
          <form
            className="d-flex mx-auto w-50 w-lg-25 my-2 my-lg-0"
            onSubmit={(e: React.FormEvent) => e.preventDefault()}
          >
            <div className="input-group">
              <input
                className="form-control"
                type="search"
                placeholder="Ara..."
              />
              <button className="btn btn-outline-secondary" type="button">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>

          {/* 4. Sağ Taraf: Tema ve Dropdown */}
          <ul className="navbar-nav ms-auto align-items-center">
            {/* Tema (Gece Modu) Butonu (Geri Geldi) */}
            <li className="nav-item me-2">
              <button className="btn btn-link nav-link" type="button">
                <i className="bi bi-moon-fill"></i>
              </button>
            </li>

            {/* Dropdown Menü */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link border-0 text-dark text-decoration-none"
                id="navbarDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Menü
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end shadow border-0"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => goTo("/settings")}
                  >
                    <i className="bi bi-gear me-2"></i>Ayarlar
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => goTo("/messages")}
                  >
                    <i className="bi bi-envelope me-2"></i>Mesajlar
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>Çıkış Yap
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
