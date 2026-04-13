import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { initialGoals } from "../data/goals";

export interface Goal {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  category: string;
}

interface GoalContextType {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, "id">) => void;
  deleteGoal: (id: number) => void;
  toggleGoal: (id: number) => void;
}

const GoalContext = createContext<GoalContextType | null>(null);

export function GoalProvider({ children }: { children: ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem("goals");
    return saved ? JSON.parse(saved) : initialGoals;
  });

  const saveToStorage = (g: Goal[]) => {
    localStorage.setItem("goals", JSON.stringify(g));
  };

  const addGoal = (goal: Omit<Goal, "id">) => {
    const newGoal = { ...goal, id: Date.now() };
    const updated = [...goals, newGoal];
    setGoals(updated);
    saveToStorage(updated);
  };

  const deleteGoal = (id: number) => {
    const updated = goals.filter((g) => g.id !== id);
    setGoals(updated);
    saveToStorage(updated);
  };

  const toggleGoal = (id: number) => {
    const updated = goals.map((g) =>
      g.id === id ? { ...g, completed: !g.completed } : g
    );
    setGoals(updated);
    saveToStorage(updated);
  };

  return (
    <GoalContext.Provider value={{ goals, addGoal, deleteGoal, toggleGoal }}>
      {children}
    </GoalContext.Provider>
  );
}

export function useGoals() {
  const context = useContext(GoalContext);
  if (!context) throw new Error("useGoals, GoalProvider içinde kullanılmalı");
  return context;
}