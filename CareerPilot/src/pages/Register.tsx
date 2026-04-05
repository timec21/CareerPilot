import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Şifreler eşleşmiyor");
      return;
    }

    console.log("Kayıt verileri", formData);


    // Mevcut kullanıcıları çek
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Aynı email ile kayıt var mı kontrol et
    const existingUser = users.find((u: any) => u.email === formData.email);
    if (existingUser) {
        setMessage("Bu e-posta zaten kayıtlı!");
        return;
    }

    // Yeni kullanıcıyı ekle
    const newUser = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setMessage("Kayıt başarıyla oluşturuldu!");

    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card p-4" style={{ width: "400px" }}>
        <h2 className="mb-4">Kayıt Ol</h2>
        {message && <p className="alert alert-info">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Kullanıcı Adı</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">E-posta</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Şifre</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Şifre Tekrar</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Kayıt Ol
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
