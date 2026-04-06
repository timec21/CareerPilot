import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // component içinde
  const { login } = useAuth();

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

    const success = login(formData.email, formData.password);

    if (success) {
      navigate("/dashboard");
    } else {
      setMessage("E-posta veya şifre hatalı!");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card p-4" style={{ width: "400px" }}>
        <h2 className="mb-4">Giriş Yap</h2>
        {message && <p className="alert alert-info">{message}</p>}
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-primary w-100">
            Giriş Yap
          </button>
        </form>

        <p className="text-center mt-3">
          Hesabın yok mu?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ cursor: "pointer", color: "blue" }}
          >
            Kayıt ol
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
