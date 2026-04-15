import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { initialProfile } from "../data/profile";
import { useAuth } from "./AuthContext";

export interface Profile {
  name: string;
  title: string;
  email: string;
  location: string;
  bio: string;
  skills: string[];
  linkedin: string;
  github: string;
}

interface ProfileContextType {
  profile: Profile;
  updateProfile: (updated: Profile) => void;
  addSkill: (skillName: string) => void;
  removeSkill: (skillName: string) => void;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  const [profile, setProfile] = useState<Profile>(() => {
    const saved = localStorage.getItem("profile");
    if (saved) return JSON.parse(saved);
    return {
      ...initialProfile,
      name: user?.username || "",
      email: user?.email || "",
    };
  });

  const updateProfile = (updated: Profile) => {
    setProfile(updated);
    localStorage.setItem("profile", JSON.stringify(updated));
  };

  const addSkill = (skillName: string) => {
    setProfile((prev) => {
      // Eğer yetenek zaten varsa ekleme (duplicate kontrolü)
      if (prev.skills.includes(skillName)) return prev;

      const updated = { ...prev, skills: [...prev.skills, skillName] };
      localStorage.setItem("profile", JSON.stringify(updated)); // LocalStorage kaydı
      return updated;
    });
  };

  const removeSkill = (skillName: string) => {
    setProfile((prev) => {
      const updated = {
        ...prev,
        skills: prev.skills.filter((s) => s !== skillName),
      };
      localStorage.setItem("profile", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, addSkill, removeSkill }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context)
    throw new Error("useProfile, ProfileProvider içinde kullanılmalı");
  return context;
}
