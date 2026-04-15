import { useState } from "react";
import { useGoals } from "../context/GoalContext";
import { FaTrash, FaPlus } from "react-icons/fa";
import { useProfile } from "../context/ProfileContext";
import { useLocation } from "react-router-dom"; // 1. Bunu ekle

function Goals() {
  const { goals, addGoal, deleteGoal, toggleGoal } = useGoals();
  const { addSkill, removeSkill } = useProfile();
  
  // 2. Filtreleme için gerekli tanımlamalar
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get("filter");

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    completed: false,
  });

  // 3. Ekranda gösterilecek listeyi filtrele
  const displayGoals = filter === "completed" 
    ? goals.filter(g => g.completed) 
    : goals;

  const completed = goals.filter((g) => g.completed).length;
  const total = goals.length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addGoal(formData);
    setFormData({ title: "", description: "", category: "", completed: false });
    setShowForm(false);
  };

  const handleToggleGoal = (goal: any) => {
    toggleGoal(goal.id);
    if (goal.completed) {
      removeSkill(goal.title);
    } else {
      addSkill(goal.title);
    }
  };

  return (
    <div className="container mt-4">
      {/* Başlık ve Filtre Bilgisi */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{filter === "completed" ? "Tamamlanan Hedefler" : "Öğrenme Planı"}</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          <FaPlus /> Hedef Ekle
        </button>
      </div>

      {/* İlerleme çubuğu */}
      <div className="card p-3 mb-4">
        <div className="d-flex justify-content-between mb-1">
          <span>Genel İlerleme</span>
          <span>
            {completed} / {total} tamamlandı
          </span>
        </div>
        <div className="progress">
          <div
            className="progress-bar bg-success"
            style={{ width: `${percent}%` }}
          >
            {percent}%
          </div>
        </div>
      </div>

      {/* Form kısmı aynı kalıyor... */}
      {showForm && (
        <div className="card p-3 mb-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-2">
              <div className="col-12 col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Hedef başlığı"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="col-12 col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Açıklama"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="col-12 col-md-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Kategori"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
              <div className="col-12 col-md-2">
                <button type="submit" className="btn btn-success w-100">
                  Kaydet
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* 4. Burayı displayGoals.map olarak değiştirdik */}
      <div className="row g-3">
        {displayGoals.map((goal) => (
          <div className="col-12 col-md-6 col-lg-4" key={goal.id}>
            <div className={`card h-100 ${goal.completed ? "border-success" : ""}`}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className={`card-title ${goal.completed ? "text-decoration-line-through text-muted" : ""}`}>
                      {goal.title}
                    </h5>
                    <p className="text-muted mb-1" style={{ fontSize: "0.85rem" }}>
                      {goal.description}
                    </p>
                    <span className="badge bg-secondary">{goal.category}</span>
                  </div>
                </div>
              </div>
              <div className="card-footer bg-transparent d-flex justify-content-between">
                <button
                  className={`btn btn-sm ${goal.completed ? "btn-outline-secondary" : "btn-outline-success"}`}
                  onClick={() => handleToggleGoal(goal)}
                >
                  {goal.completed ? "Geri Al" : "Tamamlandı"}
                </button>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => deleteGoal(goal.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Filtre aktifse tüm listeye dönmek için bir buton (opsiyonel) */}
      {filter && (
        <div className="text-center mt-4">
          <button className="btn btn-link" onClick={() => window.location.href='/goals'}>
            Tüm Listeyi Göster
          </button>
        </div>
      )}
    </div>
  );
}

export default Goals;