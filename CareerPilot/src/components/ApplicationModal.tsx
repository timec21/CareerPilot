import { useState } from "react";
import type { Application } from "../context/ApplicationContext";
import { useApplications } from "../context/ApplicationContext";
import { toast } from 'react-toastify';

interface Props {
  onClose: () => void;
  app?: Application; 
}

const emptyForm = {
  company: "",
  position: "",
  status: "Hazırlanıyor" as Application["status"],
  date: "",
  notes: "",
  favorite: false,
};

function ApplicationModal({ onClose, app }: Props) {
  const { addApplication, updateApplication } = useApplications();
  const [formData, setFormData] = useState(app ?? emptyForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (app) {
      updateApplication(app.id, formData);
      toast.success("Başvuru başarıyla güncellendi!");
    } else {
      addApplication(formData);
      toast.success("Yeni başvuru kaydedildi!");
    }
    onClose();
  };

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {app ? "Başvuruyu Düzenle" : "Yeni Başvuru Ekle"}
            </h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Şirket Adı</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Pozisyon</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Durum</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option>Hazırlanıyor</option>
                  <option>Başvuruldu</option>
                  <option>Mülakat</option>
                  <option>Olumlu</option>
                  <option>Olumsuz</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Tarih</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Notlar</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="form-control"
                  rows={3}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
              >
                İptal
              </button>
              <button type="submit" className="btn btn-primary">
                {app ? "Güncelle" : "Kaydet"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ApplicationModal;