import { useState } from "react";
import { useMessages } from "../context/MessageContext";
import type { Message } from "../context/MessageContext";
import { FaTrash, FaEnvelope, FaEnvelopeOpen, FaBuilding, FaUser } from "react-icons/fa";

function Messages() {
  const { messages, markAsRead, deleteMessage } = useMessages();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState("Tümü");

  const filtered = messages.filter((m) => {
    if (filter === "Okunmamış") return !m.read;
    if (filter === "Şirket") return m.type === "company";
    if (filter === "Kullanıcı") return m.type === "user";
    return true;
  });

  const handleSelect = (message: Message) => {
    setSelectedMessage(message);
    if (!message.read) markAsRead(message.id);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Mesajlar</h2>

      {/* Filtreler */}
      <div className="d-flex gap-2 mb-3">
        {["Tümü", "Okunmamış", "Şirket", "Kullanıcı"].map((f) => (
          <button
            key={f}
            className={`btn btn-sm ${filter === f ? "btn-primary" : "btn-outline-secondary"}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="row g-3">
        {/* Sol: Mesaj listesi */}
        <div className="col-12 col-md-5">
          {filtered.length === 0 ? (
            <div className="text-center text-muted mt-4">
              <p>Mesaj bulunamadı</p>
            </div>
          ) : (
            filtered.map((message) => (
              <div
                key={message.id}
                className={`card mb-2 ${selectedMessage?.id === message.id ? "border-primary" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() => handleSelect(message)}
              >
                <div className="card-body py-2">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="d-flex align-items-center gap-2">
                      {/* Avatar */}
                      <div
                        className={`rounded-circle d-flex align-items-center justify-content-center text-white fw-bold`}
                        style={{
                          width: 36,
                          height: 36,
                          fontSize: 14,
                          backgroundColor: message.type === "company" ? "#0d6efd" : "#6f42c1",
                          flexShrink: 0,
                        }}
                      >
                        {message.avatar}
                      </div>
                      <div>
                        <p className={`mb-0 ${!message.read ? "fw-bold" : ""}`} style={{ fontSize: "0.9rem" }}>
                          {message.from}
                        </p>
                        <p className="mb-0 text-muted" style={{ fontSize: "0.8rem" }}>
                          {message.subject}
                        </p>
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-end gap-1">
                      <small className="text-muted">{message.date}</small>
                      {!message.read && (
                        <span className="badge bg-primary" style={{ fontSize: "0.65rem" }}>Yeni</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Sağ: Mesaj detayı */}
        <div className="col-12 col-md-7">
          {selectedMessage ? (
            <div className="card h-100">
              <div className="card-header d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  {selectedMessage.type === "company" ? (
                    <FaBuilding className="text-primary" />
                  ) : (
                    <FaUser className="text-purple" style={{ color: "#6f42c1" }} />
                  )}
                  <strong>{selectedMessage.from}</strong>
                </div>
                <div className="d-flex gap-2">
                  {selectedMessage.read ? (
                    <FaEnvelopeOpen className="text-muted" />
                  ) : (
                    <FaEnvelope className="text-primary" />
                  )}
                  <FaTrash
                    className="text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      deleteMessage(selectedMessage.id);
                      setSelectedMessage(null);
                    }}
                  />
                </div>
              </div>
              <div className="card-body">
                <h5>{selectedMessage.subject}</h5>
                <small className="text-muted">{selectedMessage.date}</small>
                <hr />
                <p>{selectedMessage.content}</p>
              </div>
            </div>
          ) : (
            <div className="card d-flex align-items-center justify-content-center text-muted" style={{ minHeight: "200px" }}>
              <p>Okumak için bir mesaj seç</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messages;