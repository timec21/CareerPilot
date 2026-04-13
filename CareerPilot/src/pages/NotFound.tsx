import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <h2 className="mb-3">Sayfa Bulunamadı</h2>
      <p className="text-muted mb-4">Aradığın sayfa mevcut değil veya taşınmış olabilir.</p>
      <button className="btn btn-primary" onClick={() => navigate("/dashboard")}>
        Ana Sayfaya Dön
      </button>
    </div>
  );
}

export default NotFound;