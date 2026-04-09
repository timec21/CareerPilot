import { useApplications } from "../context/ApplicationContext";
import { useNavigate } from "react-router-dom";
import ApplicationCard from "../components/ApplicationCard";

function Applications() {
  const { applications } = useApplications();
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Başvurularım</h2>
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/")}
          >
            ← Dashboard
          </button>
          <button className="btn btn-primary">+ Yeni Başvuru</button>
        </div>
      </div>

      {/* Kartlar */}
      {applications.length === 0 ? (
        <div className="text-center mt-5 text-muted">
          <h5>Henüz başvuru eklenmedi</h5>
          <p>Yeni başvuru eklemek için butona tıkla</p>
        </div>
      ) : (
        <div className="row g-4">
          {applications.map((app) => (
            <div className="col-12 col-md-6 col-lg-3 d-flex" key={app.id}>
              <ApplicationCard app={app} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Applications;
