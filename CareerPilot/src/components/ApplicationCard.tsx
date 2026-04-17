import type { Application } from "../context/ApplicationContext";
import { useApplications } from "../context/ApplicationContext";
import { FaStar, FaRegStar, FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const statusColors: Record<Application["status"], string> = {
  Hazırlanıyor: "secondary",
  Başvuruldu: "primary",
  Mülakat: "warning",
  Olumlu: "success",
  Olumsuz: "danger",
};

interface Props {
  app: Application;
  onEdit: (app: Application) => void; // ekle
}

function ApplicationCard({ app, onEdit }: Props) {
  const { deleteApplication, toggleFavorite } = useApplications();

  // Favori işlemini sarmalayan fonksiyon
  const handleFavorite = () => {
    toggleFavorite(app.id);
    // app.favorite o anki durumu olduğu için tersini kontrol ediyoruz
    if (!app.favorite) {
      toast.success(`${app.company} favorilere eklendi!`);
    } else {
      toast.info(`${app.company} favorilerden çıkarıldı.`);
    }
  };

  // Silme işlemini sarmalayan fonksiyon
  const handleDelete = () => {
    if (
      window.confirm(`${app.company} başvurusunu silmek istediğine emin misin?`)
    ) {
      deleteApplication(app.id);
      toast.error("Başvuru silindi.");
    }
  };

  return (
    <div className="card h-100 w-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0">{app.company}</h5>
          <span
            onClick={handleFavorite} 
            style={{ cursor: "pointer" }}
            className="text-warning"
          >
            {app.favorite ? <FaStar size={18} /> : <FaRegStar size={18} />}
          </span>
        </div>

        {/* Pozisyon */}
        <h6 className="card-subtitle text-muted mb-3">{app.position}</h6>

        {/* Durum rozeti */}
        <span className={`badge bg-${statusColors[app.status]}`}>
          {app.status}
        </span>

        {/* Tarih */}
        <p className="mt-2 mb-0 text-muted" style={{ fontSize: "0.85rem" }}>
          📅 {app.date}
        </p>

        {/* Notlar */}
        {app.notes && (
          <p className="mt-2 mb-0 text-muted" style={{ fontSize: "0.85rem" }}>
            📝 {app.notes}
          </p>
        )}
      </div>

      {/* Butonlar */}
      <div className="card-footer bg-transparent d-flex justify-content-end gap-2">
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => onEdit(app)}
        >
          <FaEdit /> Düzenle
        </button>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={handleDelete} 
        >
          <FaTrash /> Sil
        </button>
      </div>
    </div>
  );
}

export default ApplicationCard;
