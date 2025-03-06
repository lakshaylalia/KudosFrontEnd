"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface KudosContextType {kudos: number | null;}

{/* Kudos context which intially contains null value */}
const KudosContext = createContext<KudosContextType | null>(null);

{/* Kudos context povider */}
export const KudosProvider = ({ children }: { children: ReactNode }) => {
  const [kudos, setKudos] = useState<number>(100);

  useEffect(() => {
    const getKudos = async () => {
      try {
        const res = await fetch("kudos api");
        const data = await res.json();
        setKudos(data.kudos);
      } catch (error) {
        console.error("Failed to fetch kudos:", error);
      }
    };

    getKudos();
  }, []);

  return <KudosContext.Provider value={{ kudos }}>{children}</KudosContext.Provider>;
};


{/* Custom hook for context */}
export const useKudosContext = () => {
  const context = useContext(KudosContext);
  if (!context) {
    throw new Error("useKudosContext must be used within a KudosProvider");
  }
  return context;
};
