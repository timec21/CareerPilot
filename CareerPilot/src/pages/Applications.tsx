import { useApplications } from "../context/ApplicationContext";
import { useNavigate } from "react-router-dom";

function Applications() {
  const { applications } = useApplications();
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Başvurularım</h2>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary" onClick={() => navigate("/")}>
            ← Dashboard
          </button>
          <button className="btn btn-primary">
            + Yeni Başvuru
          </button>
        </div>
      </div>

      {/* Kartlar */}
      {applications.length === 0 ? (
        <div className="text-center mt-5 text-muted">
          <h5>Henüz başvuru eklenmedi</h5>
          <p>Yeni başvuru eklemek için butona tıkla</p>
        </div>
      ) : (
        <div className="row g-3">
          {applications.map((app) => (
            <div className="col-12 col-md-6 col-lg-4" key={app.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{app.company}</h5>
                  <h6 className="card-subtitle text-muted mb-2">{app.position}</h6>
                  <span className="badge bg-primary">{app.status}</span>
                  <p className="mt-2 mb-0 text-muted" style={{ fontSize: "0.85rem" }}>
                    {app.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Applications;