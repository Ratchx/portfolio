"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { L, Lang } from "./content";

type LangCtx = {
  lang: Lang;
  toggle: () => void;
  /** หยิบข้อความตามภาษาที่เลือกอยู่ */
  t: (value: L) => string;
};

const Ctx = createContext<LangCtx | null>(null);
const STORAGE_KEY = "rt.lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("th");

  // อ่านค่าที่เคยเลือกไว้หลัง hydrate เพื่อไม่ให้ server/client ต่างกัน
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "th" || saved === "en") setLang(saved);
    } catch {
      /* โหมดส่วนตัวของบราวเซอร์อาจบล็อก storage */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ไม่เป็นไร ใช้ค่า default ต่อได้ */
    }
  }, [lang]);

  const toggle = useCallback(() => setLang((l) => (l === "th" ? "en" : "th")), []);
  const t = useCallback((value: L) => value[lang], [lang]);

  return <Ctx.Provider value={{ lang, toggle, t }}>{children}</Ctx.Provider>;
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
