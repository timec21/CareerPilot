import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// ÖNEMLİ: Dropdown'ın çalışması için JS dosyasını import etmelisiniz
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-3">
      <div className="container-fluid">
        {/* 1. Sol Kısım: Profil ve Logo */}
        <a className="navbar-brand d-flex align-items-center" href="/profile">
          <img 
            src="logo.png" // logo.png yerine örnek görsel
            alt="Profil" 
            width="70" 
            height="70" 
            className="rounded-circle me-2 " 
          />
          <span className="fw-bold">Profil</span>
        </a>

        {/* Mobil Menü Butonu (Hamburger) */}
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
          
          {/* Anasayfa Linki */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="/">Anasayfa</a>
            </li>
          </ul>

          {/* 3. Arama Çubuğu (Merkezde) */}
          <form className="d-flex mx-auto w-75 w-lg-25 my-2 my-lg-0" role="search">
            <div className="input-group">
              <input 
                className="form-control" 
                type="search" 
                placeholder="Ara..." 
                aria-label="Search" 
              />
              <button className="btn btn-outline-secondary" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>

          {/* 4. Sağ Taraf: Gece Modu ve Dropdown Menü */}
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item me-2">
              <button className="btn btn-link nav-link" type="button">
                <i className="bi bi-moon-fill"></i>
              </button>
            </li>

            {/* Dropdown Menü Başlangıcı */}
            <li className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle btn btn-outline-ligth px-3" 
                href="#" 
                id="navbarDropdown"
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                Menü
              </a>
              <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="/settings"><i className="bi bi-gear me-2"></i>Ayarlar</a></li>
                <li><a className="dropdown-item" href="/messages"><i className="bi bi-envelope me-2"></i>Mesajlar</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item text-danger" href="/logout"><i className="bi bi-box-arrow-right me-2"></i>Çıkış Yap</a></li>
              </ul>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;