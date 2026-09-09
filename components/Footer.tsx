"use client";

import { profile } from "@/lib/content";
import { useLang } from "@/lib/lang";

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="border-t border-line py-8">
      <div className="flex flex-col gap-2 text-[11px] text-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="text-acid-dim">$</span> built by {profile.devName} — Next.js
          {" · "}
          {lang === "th" ? "ดีพลอยบน Vercel" : "deployed on Vercel"}
        </p>
        <p>
          &copy; {new Date().getFullYear()} {profile.name} ({profile.alias})
        </p>
      </div>
    </footer>
  );
}
