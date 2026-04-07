import { useAuth } from "../context/AuthContext";
import { FaBriefcase, FaClock, FaCheckCircle, FaStar } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

const statusData = [
  { ay: "Ocak", başvuru: 2, mülakat: 1, olumlu: 0 },
  { ay: "Şubat", başvuru: 4, mülakat: 2, olumlu: 1 },
  { ay: "Mart", başvuru: 3, mülakat: 3, olumlu: 1 },
  { ay: "Nisan", başvuru: 5, mülakat: 2, olumlu: 2 },
];

function StatusChart() {
  return (
    <div className="card mt-4 p-3">
      <h5 className="mb-3">Aylık Başvuru Takibi</h5>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={statusData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ay" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="başvuru" stroke="#0d6efd" strokeWidth={2} />
          <Line type="monotone" dataKey="mülakat" stroke="#ffc107" strokeWidth={2} />
          <Line type="monotone" dataKey="olumlu" stroke="#198754" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      title: "Toplam Başvuru",
      value: 12,
      icon: <FaBriefcase size={28} />,
      color: "primary",
      path: "/applications",
    },
    {
      title: "Bekleyen Görüşme",
      value: 3,
      icon: <FaClock size={28} />,
      color: "warning",
      path: "/applications",
    },
    {
      title: "Tamamlanan Görev",
      value: 8,
      icon: <FaCheckCircle size={28} />,
      color: "success",
      path: "/goals",
    },
    {
      title: "Favoriler",
      value: 5,
      icon: <FaStar size={28} />,
      color: "danger",
      path: "/applications",
    },
  ];

  return (
    <div className="container mt-4">
      {/* Navbar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Hoş geldin, {user?.username} </h2>
      </div>

      {/* İstatistik Kartları */}
      <div className="row g-3">
        {stats.map((stat, index) => (
          <div className="col-12 col-sm-6 col-lg-3" key={index}>
            <div className={`card border-${stat.color} h-100`}>
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1">{stat.title}</p>
                  <h3 className="mb-0 fw-bold">{stat.value}</h3>
                </div>
                <div className={`text-${stat.color}`}>{stat.icon}</div>
              </div>
              <div className="card-footer bg-transparent border-0">
                <button
                  className={`btn btn-sm btn-outline-${stat.color} w-100`}
                  onClick={() => navigate(stat.path)}
                >
                  Görüntüle
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Grafik */}
      <StatusChart />
    </div>
  );
}

export default Dashboard;