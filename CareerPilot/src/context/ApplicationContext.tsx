import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { initialApplications } from "../data/applications";

// Başvuru tipi
export interface Application {
  id: number;
  company: string;
  position: string;
  status: "Hazırlanıyor" | "Başvuruldu" | "Mülakat" | "Olumlu" | "Olumsuz";
  date: string;
  notes: string;
  favorite: boolean;
}

// Context tipi
interface ApplicationContextType {
  applications: Application[];
  addApplication: (app: Omit<Application, "id">) => void;
  deleteApplication: (id: number) => void;
  updateApplication: (id: number, updated: Omit<Application, "id">) => void;
  toggleFavorite: (id: number) => void;
}

const ApplicationContext = createContext<ApplicationContextType | null>(null);

export function ApplicationProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem("applications");
    return saved ? JSON.parse(saved) : initialApplications;
  });

  // localStorage'a kaydet
  const saveToStorage = (apps: Application[]) => {
    localStorage.setItem("applications", JSON.stringify(apps));
  };

  // Ekle
  const addApplication = (app: Omit<Application, "id">) => {
    const newApp = {
      ...app,
      id: Date.now(),
    };
    const updated = [...applications, newApp];
    setApplications(updated);
    saveToStorage(updated);
  };

  // Sil
  const deleteApplication = (id: number) => {
    const updated = applications.filter((app) => app.id !== id);
    setApplications(updated);
    saveToStorage(updated);
  };

  // Güncelle
  const updateApplication = (id: number, updated: Omit<Application, "id">) => {
    const updatedList = applications.map((app) =>
      app.id === id ? { ...updated, id } : app
    );
    setApplications(updatedList);
    saveToStorage(updatedList);
  };

  // Favori toggle
  const toggleFavorite = (id: number) => {
    const updated = applications.map((app) =>
      app.id === id ? { ...app, favorite: !app.favorite } : app
    );
    setApplications(updated);
    saveToStorage(updated);
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        addApplication,
        deleteApplication,
        updateApplication,
        toggleFavorite,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplications() {
  const context = useContext(ApplicationContext);
  if (!context)
    throw new Error("useApplications, ApplicationProvider içinde kullanılmalı");
  return context;
}