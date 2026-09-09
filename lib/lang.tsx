"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { experienceYears, type L, type Lang } from "./content";

type LangCtx = {
  lang: Lang;
  toggle: () => void;
  t: (value: L) => string;
  fmt: (value: string) => string;
  years: { coding: number; fivem: number };
};

const Ctx = createContext<LangCtx | null>(null);
const STORAGE_KEY = "rt.lang";

export function LangProvider({
  children,
  year: serverYear,
}: {
  children: ReactNode;
  year: number;
}) {
  const [lang, setLang] = useState<Lang>("th");
  const [year, setYear] = useState(serverYear);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "th" || saved === "en") setLang(saved);
    } catch {}
  }, []);

  useEffect(() => {
    const actual = new Date().getFullYear();
    if (actual !== serverYear) setYear(actual);
  }, [serverYear]);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  }, [lang]);

  const years = useMemo(() => experienceYears(year), [year]);

  const fmt = useCallback(
    (value: string) =>
      value
        .replaceAll("{coding}", String(years.coding))
        .replaceAll("{fivem}", String(years.fivem)),
    [years],
  );

  const toggle = useCallback(() => setLang((l) => (l === "th" ? "en" : "th")), []);
  const t = useCallback((value: L) => fmt(value[lang]), [fmt, lang]);

  const value = useMemo(
    () => ({ lang, toggle, t, fmt, years }),
    [lang, toggle, t, fmt, years],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
