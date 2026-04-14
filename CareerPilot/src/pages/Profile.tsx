import React from 'react';

// Tip tanımı ile veriyi güvenceye alalım
interface UserProfile {
  name: string;
  title: string;
  email: string;
  location: string;
  bio: string;
  skills: string[];
}

const ProfilePage: React.FC = () => {
  const userData: UserProfile = {
    name: "qwe",
    title: "Full Stack Developer",
    email: "user@careerpilot.com",
    location: "İstanbul, Türkiye",
    bio: "React ve .NET teknolojileriyle modern web uygulamaları geliştiriyorum. Kariyer yolculuğumda DevOps süreçlerine ve temiz kod prensiplerine odaklanıyorum.",
    skills: ["React", "TypeScript", ".NET Core", "DevOps", "SQL Server", "Bootstrap"]
  };

  return (
    <div className="container py-5">
      <div className="row">
        
        {/* Sol Kolon: Profil Özeti */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body text-center">
              <div 
                className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-3" 
                style={{ width: '120px', height: '120px' }}
              >
                <span className="display-4 fw-bold text-primary">
                  {userData.name[0].toUpperCase()}
                </span>
              </div>
              <h4 className="fw-bold">{userData.name}</h4>
              <p className="text-muted mb-1">{userData.title}</p>
              <p className="text-muted small mb-4">{userData.location}</p>
            </div>
          </div>

          {/* İletişim Kartı */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <h6 className="fw-bold mb-3">İletişim Bilgileri</h6>
              <ul className="list-unstyled mb-0">
                <li className="mb-2 d-flex align-items-center">
                  <i className="bi bi-envelope me-2 text-primary"></i>
                  <span className="text-muted">{userData.email}</span>
                </li>
                <li className="mb-2 d-flex align-items-center">
                  <i className="bi bi-linkedin me-2 text-primary"></i>
                  <span className="text-muted">linkedin.com/in/{userData.name}</span>
                </li>
                <li className="d-flex align-items-center">
                  <i className="bi bi-github me-2 text-primary"></i>
                  <span className="text-muted">github.com/{userData.name}</span>
                </li>
              </ul>
            </div>
            <button className="btn btn-dark">
              <i className="bi bi-pencil-square me-2"></i> Bilgileri Düzenle
            </button>
          </div>
        </div>

        {/* Sağ Kolon: Detaylar */}
        <div className="col-lg-8">
          {/* Hakkında Kartı */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Hakkında</h5>
              <p className="text-secondary lh-lg">
                {userData.bio}
              </p>
            </div>
          </div>

          {/* Yetenekler Kartı */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Teknik Yetenekler</h5>
              <div className="d-flex flex-wrap gap-2 mt-3">
                {userData.skills.map((skill) => (
                  <span key={skill} className="badge bg-light text-primary border border-primary px-3 py-2 fw-normal">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Aksiyon Butonları */}
          <div className="d-flex justify-content-end">
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;