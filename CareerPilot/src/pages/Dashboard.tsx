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
import { useApplications } from "../context/ApplicationContext";
import type { Application } from "../context/ApplicationContext";
import { useGoals } from "../context/GoalContext";

interface ChartProps {
  applications: Application[];
}

function StatusChart({ applications }: ChartProps) {
  const statusColors: Record<Application["status"], string> = {
    Hazırlanıyor: "#6c757d",
    Başvuruldu: "#0d6efd",
    Mülakat: "#ffc107",
    Olumlu: "#198754",
    Olumsuz: "#dc3545",
  };

  // Tarihe göre sırala
  const sorted = [...applications].sort((a, b) => a.date.localeCompare(b.date));

  // Recharts için veri hazırla
  const data = sorted.map((app, index) => ({
    index: index + 1,
    company: app.company,
    position: app.position,
    status: app.status,
    date: app.date,
    color: statusColors[app.status],
  }));

  // Custom nokta
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={7}
        fill={statusColors[payload.status as Application["status"]]}
        stroke="white"
        strokeWidth={2}
      />
    );
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="card p-2 shadow" style={{ fontSize: "0.85rem" }}>
          <strong>{d.company}</strong>
          <p className="mb-0 text-muted">{d.position}</p>
          <p className="mb-0">{d.date}</p>
          <span
            className="badge"
            style={{
              backgroundColor: statusColors[d.status as Application["status"]],
            }}
          >
            {d.status}
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card mt-4 p-3">
      <h5 className="mb-1">Başvuru Zaman Çizelgesi</h5>
      <p className="text-muted mb-3" style={{ fontSize: "0.85rem" }}>
        Noktanın üzerine gel, detayları gör
      </p>

      {/* Renk açıklaması */}
      <div className="d-flex flex-wrap gap-3 mb-3">
        {Object.entries(statusColors).map(([status, color]) => (
          <div key={status} className="d-flex align-items-center gap-1">
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: color,
              }}
            />
            <small>{status}</small>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="index"
            stroke="#dee2e6"
            strokeWidth={2}
            dot={<CustomDot />}
            activeDot={{ r: 9 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { applications } = useApplications();
  const { goals } = useGoals();
  const completedGoalsCount = goals.filter((goal) => goal.completed).length;

  const stats = [
    {
      title: "Toplam Başvuru",
      value: applications.length,
      icon: <FaBriefcase size={28} />,
      color: "primary",
      path: "/applications",
    },
    {
      title: "Bekleyen Görüşme",
      value: applications.filter((app) => app.status === "Mülakat").length,
      icon: <FaClock size={28} />,
      color: "warning",
      path: "/applications?filter=Mülakat", // ✅
    },
    {
      title: "Tamamlanan Görev",
      value: completedGoalsCount,
      icon: <FaCheckCircle size={28} />,
      color: "success",
      path: "/goals?filter=completed", // Filtre parametresi ekledik
    },
    {
      title: "Favoriler",
      value: applications.filter((app) => app.favorite).length,
      icon: <FaStar size={28} />,
      color: "danger",
      path: "/applications?filter=favorites", // Filtre parametresi ekledik
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
      <StatusChart applications={applications} />
    </div>
  );
}

export default Dashboard;
