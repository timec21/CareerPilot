import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { initialMessages } from "../data/messages";

export interface Message {
  id: number;
  from: string;
  avatar: string;
  subject: string;
  content: string;
  date: string;
  read: boolean;
  type: "company" | "user";
}

interface MessageContextType {
  messages: Message[];
  markAsRead: (id: number) => void;
  deleteMessage: (id: number) => void;
  addMessage: (newMessage: Omit<Message, "id" | "read" | "date">) => void; 
  unreadCount: number;
}

const MessageContext = createContext<MessageContextType | null>(null);

export function MessageProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem("messages");
    return saved ? JSON.parse(saved) : initialMessages;
  });

  const addMessage = (newMessage: Omit<Message, "id" | "read" | "date">) => {
    const messageWithDetails: Message = {
      ...newMessage,
      id: Date.now(),
      read: false,
      date: new Date().toLocaleDateString("tr-TR"), // Otomatik tarih
    };
    const updated = [messageWithDetails, ...messages]; // Yeni mesajı en üste ekle
    setMessages(updated);
    saveToStorage(updated);
  };

  const saveToStorage = (msgs: Message[]) => {
    localStorage.setItem("messages", JSON.stringify(msgs));
  };

  const markAsRead = (id: number) => {
    const updated = messages.map((m) =>
      m.id === id ? { ...m, read: true } : m
    );
    setMessages(updated);
    saveToStorage(updated);
  };

  const deleteMessage = (id: number) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    saveToStorage(updated);
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <MessageContext.Provider value={{ messages, markAsRead, deleteMessage, addMessage, unreadCount }}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessageContext);
  if (!context) throw new Error("useMessages, MessageProvider içinde kullanılmalı");
  return context;
}