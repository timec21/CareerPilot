import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profileForm, setProfileForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    applicationUpdates: true,
    messages: false,
  });

  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // Profil güncelle
  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u: any) =>
      u.email === user?.email ? { ...u, ...profileForm } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify({ ...user, ...profileForm }));

    setProfileMessage("Profil bilgileri güncellendi!");
    setTimeout(() => setProfileMessage(""), 3000);
  };

  // Şifre değiştir
  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage("Yeni şifreler eşleşmiyor!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const currentUser = users.find((u: any) => u.email === user?.email);

    if (currentUser?.password !== passwordForm.currentPassword) {
      setPasswordMessage("Mevcut şifre hatalı!");
      return;
    }

    const updatedUsers = users.map((u: any) =>
      u.email === user?.email ? { ...u, password: passwordForm.newPassword } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setPasswordMessage("Şifre başarıyla güncellendi!");
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => setPasswordMessage(""), 3000);
  };

  // Hesabı sil
  const handleDeleteAccount = () => {
    if (window.confirm("Hesabınızı silmek istediğinize emin misiniz? Bu işlem geri alınamaz!")) {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.filter((u: any) => u.email !== user?.email);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.removeItem("currentUser");
      localStorage.removeItem("applications");
      localStorage.removeItem("goals");
      logout();
      navigate("/login");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "700px" }}>
      <h2 className="mb-4">Ayarlar</h2>

      {/* Profil Bilgileri */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Profil Bilgileri</h5>
        </div>
        <div className="card-body">
          {profileMessage && <div className="alert alert-success">{profileMessage}</div>}
          <form onSubmit={handleProfileSubmit}>
            <div className="mb-3">
              <label className="form-label">Kullanıcı Adı</label>
              <input
                type="text"
                className="form-control"
                value={profileForm.username}
                onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">E-posta</label>
              <input
                type="email"
                className="form-control"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Güncelle
            </button>
          </form>
        </div>
      </div>

      {/* Şifre Değiştir */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Şifre Değiştir</h5>
        </div>
        <div className="card-body">
          {passwordMessage && (
            <div className={`alert ${passwordMessage.includes("başarıyla") ? "alert-success" : "alert-danger"}`}>
              {passwordMessage}
            </div>
          )}
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-3">
              <label className="form-label">Mevcut Şifre</label>
              <input
                type="password"
                className="form-control"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Yeni Şifre</label>
              <input
                type="password"
                className="form-control"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Yeni Şifre Tekrar</label>
              <input
                type="password"
                className="form-control"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Şifreyi Güncelle
            </button>
          </form>
        </div>
      </div>

      {/* Bildirim Tercihleri */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Bildirim Tercihleri</h5>
        </div>
        <div className="card-body">
          <div className="form-check form-switch mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="emailNotifications"
              checked={notifications.emailNotifications}
              onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
            />
            <label className="form-check-label" htmlFor="emailNotifications">
              E-posta bildirimleri
            </label>
          </div>
          <div className="form-check form-switch mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="applicationUpdates"
              checked={notifications.applicationUpdates}
              onChange={(e) => setNotifications({ ...notifications, applicationUpdates: e.target.checked })}
            />
            <label className="form-check-label" htmlFor="applicationUpdates">
              Başvuru güncellemeleri
            </label>
          </div>
          <div className="form-check form-switch mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="messages"
              checked={notifications.messages}
              onChange={(e) => setNotifications({ ...notifications, messages: e.target.checked })}
            />
            <label className="form-check-label" htmlFor="messages">
              Mesaj bildirimleri
            </label>
          </div>
        </div>
      </div>

      {/* Hesabı Sil */}
      <div className="card mb-4 border-danger">
        <div className="card-header bg-danger text-white">
          <h5 className="mb-0">Tehlikeli Bölge</h5>
        </div>
        <div className="card-body">
          <p className="text-muted">
            Hesabınızı sildiğinizde tüm verileriniz kalıcı olarak silinir. Bu işlem geri alınamaz.
          </p>
          <button className="btn btn-danger" onClick={handleDeleteAccount}>
            Hesabı Sil
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;