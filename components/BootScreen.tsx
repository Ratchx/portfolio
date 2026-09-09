"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  "[ BOOT ] rt_script.core  ...  v2.0.0",
  "[  OK  ] mounting /dev/portfolio",
  "[  OK  ] loading profile: ratchanon (ratchx)",
  "[  OK  ] runtime: lua / javascript / typescript / sql",
  "[  OK  ] linking fivem servers ... 3 found",
  "[  OK  ] players served ... 4,400+",
  "[ DONE ] handshake complete. welcome.",
];

const LINE_MS = 130;

/** อินโทรสไตล์บูตเครื่อง เล่นครั้งเดียวต่อแท็บ กดที่ไหนก็ข้ามได้ */
export default function BootScreen() {
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState(0);
  const [closing, setClosing] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = window.sessionStorage.getItem("rt.booted") === "1";
    } catch {
      seen = false;
    }
    if (reduced || seen) return;

    setVisible(true);
    document.body.style.overflow = "hidden";

    LINES.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setShown(i + 1), i * LINE_MS));
    });
    timers.current.push(
      window.setTimeout(() => setClosing(true), LINES.length * LINE_MS + 320),
    );

    return () => {
      timers.current.forEach(window.clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  // ปลดล็อกการเลื่อนหน้าเมื่อม่านปิดสนิท
  useEffect(() => {
    if (!closing) return;
    const t = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
      try {
        window.sessionStorage.setItem("rt.booted", "1");
      } catch {
        /* ไม่ซีเรียส แค่จะเล่นซ้ำในแท็บนี้ */
      }
    }, 520);
    return () => window.clearTimeout(t);
  }, [closing]);

  if (!visible) return null;

  return (
    <div
      role="presentation"
      onClick={() => setClosing(true)}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-bg px-6 transition-opacity duration-500 ${
        closing ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-xl">
        <pre className="text-[11px] leading-relaxed text-acid sm:text-xs">
          {LINES.slice(0, shown).map((line) => (
            <div key={line}>{line}</div>
          ))}
        </pre>

        <div className="mt-5 h-px w-full overflow-hidden bg-line">
          <div
            className="h-full bg-acid transition-[width] duration-150 ease-out"
            style={{ width: `${(shown / LINES.length) * 100}%` }}
          />
        </div>

        <p className="mt-3 text-[10px] tracking-widest text-faint uppercase">
          click to skip
        </p>
      </div>
    </div>
  );
}
