"use client";

import Link from "next/link";
import { about, experience, profile, projects, skills, ui } from "@/lib/content";
import { useLang } from "@/lib/lang";

function Heading({ children }: { children: string }) {
  return (
    <h2 className="print-rule mb-3 border-b border-line pb-1.5 text-[11px] font-bold tracking-[0.2em] text-acid uppercase">
      {children}
    </h2>
  );
}

export default function ResumeDoc() {
  const { lang, toggle, t } = useLang();
  const th = lang === "th";

  return (
    <div className="print-plain mx-auto max-w-3xl px-5 py-10 sm:px-8">
      {/* แถบเครื่องมือ ไม่ติดไปตอนพิมพ์ */}
      <div className="no-print mb-8 flex flex-wrap items-center gap-3">
        <Link
          href="/"
          className="rounded-sm border border-line px-3 py-1.5 text-[11px] text-dim transition-colors hover:border-acid-dim hover:text-acid"
        >
          ← {t(ui.backHome)}
        </Link>
        <button
          type="button"
          onClick={toggle}
          className="rounded-sm border border-line px-3 py-1.5 text-[11px] text-dim transition-colors hover:border-acid-dim hover:text-acid"
        >
          <span className={th ? "text-acid" : ""}>TH</span>
          <span className="text-faint"> / </span>
          <span className={!th ? "text-acid" : ""}>EN</span>
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-sm bg-acid px-3 py-1.5 text-[11px] font-bold text-bg transition-opacity hover:opacity-85"
        >
          {t(ui.print)}
        </button>
      </div>

      {/* ── หัวกระดาษ ── */}
      <header className="print-rule border-b border-line pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          {th ? profile.nameTh : profile.name}{" "}
          <span className="text-acid">({profile.alias})</span>
        </h1>
        <p className="mt-1 text-sm text-cyber">
          {t(profile.role)} — {profile.devName}
        </p>
        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-dim">
          <span>{profile.email}</span>
          <span>github.com/{profile.githubUser}</span>
          <span>{th ? "ประเทศไทย" : "Thailand"}</span>
        </p>
      </header>

      {/* ── สรุปย่อ ── */}
      <section className="print-break mt-7">
        <Heading>{th ? "สรุปโดยย่อ" : "Summary"}</Heading>
        <div className="space-y-2.5">
          {about.body.map((p, i) => (
            <p key={i} className="text-[12.5px] leading-relaxed text-dim">
              {t(p)}
            </p>
          ))}
        </div>
      </section>

      {/* ── ทักษะ ── */}
      <section className="print-break mt-7">
        <Heading>{th ? "ทักษะ" : "Skills"}</Heading>
        <dl className="space-y-2">
          {skills.map((group) => (
            <div key={group.title.en} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
              <dt className="w-40 shrink-0 text-[12px] font-semibold text-txt">
                {t(group.title)}
              </dt>
              <dd className="text-[12.5px] text-dim">
                {group.items.map((i) => i.name).join(" · ")}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── ประสบการณ์ ── */}
      <section className="mt-7">
        <Heading>{th ? "ประสบการณ์ทำงาน" : "Experience"}</Heading>
        <div className="space-y-5">
          {experience.map((job) => (
            <article key={job.org} className="print-break">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="text-[13.5px] font-bold text-white">
                  {job.org}
                  {job.players && (
                    <span className="ml-2 text-[11px] font-normal text-acid">
                      {job.players} {t(ui.players)}
                    </span>
                  )}
                </h3>
                <span className="text-[11px] text-faint">{t(job.period)}</span>
              </div>
              <p className="text-[12px] text-cyber">{t(job.role)}</p>
              <ul className="mt-1.5 space-y-1">
                {job.points.map((p, i) => (
                  <li key={i} className="flex gap-2 text-[12.5px] leading-relaxed text-dim">
                    <span aria-hidden="true" className="text-acid-dim">
                      •
                    </span>
                    <span>{t(p)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-1.5 text-[11px] text-faint">{job.stack.join(", ")}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── ผลงาน ── */}
      <section className="mt-7">
        <Heading>{th ? "ผลงานที่ผ่านมา" : "Selected Projects"}</Heading>
        <div className="space-y-4">
          {projects.map((project) => (
            <article key={project.name.en} className="print-break">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="text-[13.5px] font-bold text-white">{t(project.name)}</h3>
                <span className="text-[11px] text-faint">{t(project.year)}</span>
              </div>
              <p className="mt-0.5 text-[12.5px] leading-relaxed text-dim">
                {t(project.summary)}
              </p>
              <p className="mt-1 text-[11px] text-faint">{project.stack.join(", ")}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="print-rule mt-8 border-t border-line pt-4 text-[11px] text-faint">
        {th ? "ปัจจุบันทำงานที่" : "Currently at"} {profile.company}
      </footer>
    </div>
  );
}
