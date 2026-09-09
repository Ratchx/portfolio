"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, profile, ui } from "@/lib/content";
import { useLang } from "@/lib/lang";

export default function Nav() {
  const { lang, toggle, t } = useLang();
  const [active, setActive] = useState<string>("about");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // ไฮไลต์เมนูตามหัวข้อที่อยู่ในจอ
  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.1, 0.5] },
    );

    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-bg/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2 text-sm font-bold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-magenta/70" />
            <span className="size-2.5 rounded-full bg-amber/70" />
            <span className="size-2.5 rounded-full bg-acid pulse-dot" />
          </span>
          <span className="text-white group-hover:text-acid">{profile.devName}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`rounded-sm px-3 py-2 text-xs transition-colors ${
                  active === item.id ? "text-acid" : "text-dim hover:text-txt"
                }`}
              >
                <span className="text-faint">{String(i + 1).padStart(2, "0")}.</span>{" "}
                {t(item.label)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={lang === "th" ? "Switch to English" : "เปลี่ยนเป็นภาษาไทย"}
            className="rounded-sm border border-line px-2.5 py-1.5 text-[11px] font-semibold text-dim transition-colors hover:border-acid-dim hover:text-acid"
          >
            <span className={lang === "th" ? "text-acid" : ""}>TH</span>
            <span className="text-faint"> / </span>
            <span className={lang === "en" ? "text-acid" : ""}>EN</span>
          </button>

          <Link
            href="/resume"
            className="hidden rounded-sm border border-acid-dim px-3 py-1.5 text-[11px] font-semibold text-acid transition-colors hover:bg-acid hover:text-bg sm:block"
          >
            {t(ui.viewResume)}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="menu"
            className="rounded-sm border border-line px-2.5 py-1.5 text-[11px] text-dim md:hidden"
          >
            {open ? "[ x ]" : "[ = ]"}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t border-line bg-bg/95 px-5 py-3 backdrop-blur-md md:hidden">
          {nav.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={`block py-2.5 text-sm ${
                  active === item.id ? "text-acid" : "text-dim"
                }`}
              >
                <span className="text-faint">{String(i + 1).padStart(2, "0")}.</span>{" "}
                {t(item.label)}
              </a>
            </li>
          ))}
          <li>
            <Link
              href="/resume"
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm text-acid"
            >
              {t(ui.viewResume)}
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
