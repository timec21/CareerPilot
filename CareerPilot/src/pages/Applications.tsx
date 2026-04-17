import { useState } from "react";
import type { Application } from "../context/ApplicationContext";
import { useApplications } from "../context/ApplicationContext";
import ApplicationCard from "../components/ApplicationCard";
import ApplicationModal from "../components/ApplicationModal";
import { useLocation, useNavigate } from "react-router-dom";

const statusOptions = ["Tümü", "Hazırlanıyor", "Başvuruldu", "Mülakat", "Olumlu", "Olumsuz"];

function Applications() {
  const { applications } = useApplications();
  const [showModal, setShowModal] = useState(false);
  const [editApp, setEditApp] = useState<Application | null>(null);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Tümü");
  const [sortOrder, setSortOrder] = useState("newest");

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const filterParam = queryParams.get("filter"); // "favorites" | "Mülakat" | null

  const isFavoriteFilter = filterParam === "favorites";
  const isStatusFilter = filterParam && filterParam !== "favorites";

  // Filtreleme
  const filtered = applications
    .filter((app) => {
      const matchSearch =
        app.company.toLowerCase().includes(search.toLowerCase()) ||
        app.position.toLowerCase().includes(search.toLowerCase());

      // URL'den gelen status filtresi varsa onu kullan, yoksa dropdown'ı kullan
      const matchStatus = isStatusFilter
        ? app.status === filterParam
        : selectedStatus === "Tümü" || app.status === selectedStatus;

      const matchFavorite = !isFavoriteFilter || app.favorite;

      return matchSearch && matchStatus && matchFavorite;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") return b.date.localeCompare(a.date);
      if (sortOrder === "oldest") return a.date.localeCompare(b.date);
      return 0;
    });

  const pageTitle = isFavoriteFilter
    ? "Favori Başvurularım"
    : isStatusFilter
    ? `${filterParam} Başvuruları`
    : "Başvurularım";

  return (
    <div className="container mt-4">
      {/* Başlık */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{pageTitle}</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Yeni Başvuru
        </button>
      </div>

      {/* Arama ve Filtreler */}
      <div className="row g-2 mb-4">
        <div className="col-12 col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Şirket veya pozisyon ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* URL'den filtre geldiyse dropdown'ı gizle */}
        {!isStatusFilter && (
          <div className="col-6 col-md-4">
            <select
              className="form-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statusOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        )}

        <div className={`col-6 ${!isStatusFilter ? "col-md-3" : "col-md-7"}`}>
          <select
            className="form-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">En Yeni</option>
            <option value="oldest">En Eski</option>
          </select>
        </div>
      </div>

      {/* Sonuç sayısı ve Temizleme */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="text-muted mb-0">{filtered.length} başvuru bulundu</p>
        {filterParam && (
          <button
            className="btn btn-sm btn-link text-decoration-none"
            onClick={() => navigate("/applications")}
          >
            Tüm Başvuruları Göster
          </button>
        )}
      </div>

      {/* Kartlar */}
      {filtered.length === 0 ? (
        <div className="text-center mt-5 text-muted">
          <h5>Sonuç bulunamadı</h5>
          <p>Farklı bir arama veya filtre dene</p>
        </div>
      ) : (
        <div className="row g-4">
          {filtered.map((app) => (
            <div className="col-12 col-md-6 col-lg-3 d-flex" key={app.id}>
              <ApplicationCard app={app} onEdit={(app) => setEditApp(app)} />
            </div>
          ))}
        </div>
      )}

      {(showModal || editApp) && (
        <ApplicationModal
          app={editApp ?? undefined}
          onClose={() => {
            setShowModal(false);
            setEditApp(null);
          }}
        />
      )}
    </div>
  );
}

export default Applications;