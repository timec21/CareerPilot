import { useState } from "react";
import { useProfile } from "../context/ProfileContext";

const ProfilePage: React.FC = () => {
  const { profile, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [newSkill, setNewSkill] = useState("");

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter((s) => s !== skill) });
  };

  return (
    <div className="container py-5">
      <div className="row">

        {/* Sol Kolon */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body text-center">
              <div
                className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ width: "120px", height: "120px" }}
              >
                <span className="display-4 fw-bold text-primary">
                  {profile.name[0]?.toUpperCase() || "?"}
                </span>
              </div>
              {isEditing ? (
                <>
                  <input
                    className="form-control mb-2"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ad Soyad"
                  />
                  <input
                    className="form-control mb-2"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ünvan"
                  />
                  <input
                    className="form-control mb-2"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Konum"
                  />
                </>
              ) : (
                <>
                  <h4 className="fw-bold">{profile.name}</h4>
                  <p className="text-muted mb-1">{profile.title}</p>
                  <p className="text-muted small mb-4">{profile.location}</p>
                </>
              )}
            </div>
          </div>

          {/* İletişim Kartı */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <h6 className="fw-bold mb-3">İletişim Bilgileri</h6>
              {isEditing ? (
                <>
                  <input
                    className="form-control mb-2"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="E-posta"
                  />
                  <input
                    className="form-control mb-2"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    placeholder="LinkedIn kullanıcı adı"
                  />
                  <input
                    className="form-control mb-2"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    placeholder="GitHub kullanıcı adı"
                  />
                </>
              ) : (
                <ul className="list-unstyled mb-0">
                  <li className="mb-2 d-flex align-items-center">
                    <i className="bi bi-envelope me-2 text-primary"></i>
                    <span className="text-muted">{profile.email}</span>
                  </li>
                  <li className="mb-2 d-flex align-items-center">
                    <i className="bi bi-linkedin me-2 text-primary"></i>
                    <span className="text-muted">linkedin.com/in/{profile.linkedin || "—"}</span>
                  </li>
                  <li className="d-flex align-items-center">
                    <i className="bi bi-github me-2 text-primary"></i>
                    <span className="text-muted">github.com/{profile.github || "—"}</span>
                  </li>
                </ul>
              )}
            </div>
            <div className="card-footer bg-transparent border-0">
              {isEditing ? (
                <div className="d-flex gap-2">
                  <button className="btn btn-success w-100" onClick={handleSave}>
                    Kaydet
                  </button>
                  <button className="btn btn-outline-secondary w-100" onClick={() => { setIsEditing(false); setFormData(profile); }}>
                    İptal
                  </button>
                </div>
              ) : (
                <button className="btn btn-dark w-100" onClick={() => setIsEditing(true)}>
                  <i className="bi bi-pencil-square me-2"></i>Bilgileri Düzenle
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sağ Kolon */}
        <div className="col-lg-8">
          {/* Hakkında */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Hakkında</h5>
              {isEditing ? (
                <textarea
                  className="form-control"
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              ) : (
                <p className="text-secondary lh-lg">{profile.bio}</p>
              )}
            </div>
          </div>

          {/* Yetenekler */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Teknik Yetenekler</h5>
              <div className="d-flex flex-wrap gap-2 mt-3">
                {(isEditing ? formData.skills : profile.skills).map((skill) => (
                  <span key={skill} className="badge bg-light text-primary border border-primary px-3 py-2 fw-normal">
                    {skill}
                    {isEditing && (
                      <span
                        className="ms-2 text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => removeSkill(skill)}
                      >
                        ×
                      </span>
                    )}
                  </span>
                ))}
              </div>
              {isEditing && (
                <div className="input-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Yeni yetenek ekle"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addSkill()}
                  />
                  <button className="btn btn-outline-primary" onClick={addSkill}>
                    Ekle
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;