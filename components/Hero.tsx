"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { profile, stats, ui } from "@/lib/content";
import { useLang } from "@/lib/lang";

function useTyped(phrases: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setIndex(0);
    setText("");
    setDeleting(false);
  }, [phrases]);

  useEffect(() => {
    const full = phrases[index % phrases.length] ?? "";

    if (!deleting && text === full) {
      const hold = window.setTimeout(() => setDeleting(true), 1900);
      return () => window.clearTimeout(hold);
    }

    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }

    const step = window.setTimeout(
      () => {
        setText((prev) =>
          deleting ? full.slice(0, prev.length - 1) : full.slice(0, prev.length + 1),
        );
      },
      deleting ? 38 : 72,
    );

    return () => window.clearTimeout(step);
  }, [text, deleting, index, phrases]);

  return text;
}

export default function Hero() {
  const { lang, t, fmt } = useLang();
  const phrases = useMemo(() => profile.typedRoles.map((r) => r[lang]), [lang]);
  const typed = useTyped(phrases);

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center pt-24 pb-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-fade" aria-hidden="true" />

      <p className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-acid-dim/40 bg-acid/5 px-3 py-1.5 text-[11px] text-acid">
        <span className="size-1.5 rounded-full bg-acid pulse-dot" aria-hidden="true" />
        {lang === "th" ? "เปิดรับงาน / ว่างรับโปรเจกต์" : "Available for work"}
      </p>

      <p className="mb-3 text-sm text-dim">
        <span className="text-acid-dim">$</span> whoami
      </p>

      <h1 className="text-[clamp(2.6rem,10vw,6.5rem)] leading-[0.95] font-extrabold tracking-tighter text-white">
        <span className="glitch glow-acid" data-text={profile.name}>
          {profile.name}
        </span>
      </h1>

      <p className="mt-3 text-lg text-dim sm:text-xl">
        <span className="text-faint">aka </span>
        <span className="text-acid">{profile.devName}</span>
        <span className="text-faint"> / {profile.alias}</span>
      </p>

      <p className="mt-6 min-h-[1.75rem] text-base text-cyber sm:text-xl">
        <span className="text-faint">&gt; </span>
        <span className="caret">{typed}</span>
      </p>

      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-dim text-balance sm:text-base">
        {t(profile.tagline)}
      </p>

      <div className="mt-9 flex flex-wrap gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="rounded-sm bg-acid px-5 py-2.5 text-sm font-bold text-bg transition-opacity hover:opacity-85"
        >
          {t(ui.emailMe)}
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer noopener"
          className="rounded-sm border border-line bg-bg/85 px-5 py-2.5 text-sm text-txt backdrop-blur-sm transition-colors hover:border-acid-dim hover:text-acid"
        >
          {t(ui.openGithub)}
        </a>
        <Link
          href="/resume"
          className="rounded-sm border border-line bg-bg/85 px-5 py-2.5 text-sm text-txt backdrop-blur-sm transition-colors hover:border-acid-dim hover:text-acid"
        >
          {t(ui.viewResume)}
        </Link>
      </div>

      <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.value + s.label.en} className="bg-panel px-4 py-5">
            <dt className="text-2xl font-bold text-acid tabular-nums sm:text-3xl">
              {fmt(s.value)}
            </dt>
            <dd className="mt-1 text-[11px] text-dim sm:text-xs">{t(s.label)}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-10 text-[11px] text-faint">
        {t(ui.currentlyAt)}{" "}
        <span className="text-dim">{profile.company}</span>
      </p>
    </section>
  );
}
