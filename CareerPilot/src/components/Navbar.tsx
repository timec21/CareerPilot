import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <div className="container-fluid">
        {/* Profil */}
        <a className="navbar-brand d-flex align-items-center" href="/profile">
          <img 
            src="logo.png" 
            alt="Profil" 
            width="70" 
            height="70" 
            className="rounded-circle me-2" 
          />
          <span>Profil</span>
        </a>

        {/* Mobil Menü Butonu */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar İçeriği */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* 2. Anasayfa */}
            <li className="nav-item">
              <a className="nav-link active" href="/">Anasayfa</a>
            </li>
          </ul>

          {/* Arama Çubuğu */}
          <form className="d-flex mx-auto w-50" role="search">
            <input 
              className="form-control me-2" 
              type="search" 
              placeholder="Ara..." 
              aria-label="Search" 
            />
            <button className="btn btn-outline-dark opacity-75" type="submit">Ara</button>
          </form>

          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <button className="btn btn-link nav-link px-3" type="button">
                <i className="bi bi-moon-stars-fill" style={{ fontSize: "1.2rem" }}></i>
              </button>
            </li>

            {/* En Sağda: Menü */}
            <li className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle" 
                href="#" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                Menü
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="/settings">Ayarlar</a></li>
                <li><a className="dropdown-item" href="/messages">Mesajlar</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/logout">Çıkış Yap</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;