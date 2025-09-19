import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

interface DarkModeContextValue {
  isActive: boolean;
  toggle: () => void;
}

const DarkModeContext = createContext<DarkModeContextValue | undefined>(undefined);

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isActive, setIsActive] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("dw_darkmode");
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("dw_darkmode", JSON.stringify(isActive));
    } catch {}
  }, [isActive]);

  const toggle = () => setIsActive(v => !v);

  const value = useMemo(() => ({ isActive, toggle }), [isActive]);

  return <DarkModeContext.Provider value={value}>{children}</DarkModeContext.Provider>;
};

export const useDarkMode = (): DarkModeContextValue => {
  const ctx = useContext(DarkModeContext);
  if (!ctx) throw new Error("useDarkMode must be used within DarkModeProvider");
  return ctx;
};
