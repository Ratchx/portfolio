"use client";

import { experience, ui } from "@/lib/content";
import { useLang } from "@/lib/lang";
import Bullet from "./Bullet";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Experience() {
  const { t } = useLang();

  return (
    <Section
      id="experience"
      index="03"
      title={ui.sectionTitles.experience}
      command="git log --oneline --graph"
    >
      <ol className="relative space-y-6 border-l border-line pl-6 sm:pl-9">
        {experience.map((job, i) => (
          <li key={job.org} className="relative">
            <span
              aria-hidden="true"
              className={`absolute top-6 -left-[1.9rem] size-2.5 rounded-full border-2 border-bg sm:-left-[2.65rem] ${
                job.current ? "bg-acid pulse-dot" : "bg-faint"
              }`}
            />

            <Reveal delay={i * 60}>
              <article className="rounded-sm border border-line bg-panel/90 p-5 transition-colors hover:border-acid-dim/50 sm:p-6">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-base font-bold text-white sm:text-lg">{job.org}</h3>
                  <span className="rounded-sm border border-line px-2 py-0.5 text-[10px] text-dim">
                    {t(job.tag)}
                  </span>
                  {job.players && (
                    <span className="rounded-sm border border-acid-dim/40 bg-acid/5 px-2 py-0.5 text-[10px] text-acid">
                      {job.players} {t(ui.players)}
                    </span>
                  )}
                </div>

                <p className="mt-1.5 text-[13px] text-cyber">{t(job.role)}</p>
                <p className="mt-0.5 text-[11px] text-faint">{t(job.period)}</p>

                <p className="mt-4 text-[13px] leading-relaxed text-dim">{t(job.summary)}</p>

                <ul className="mt-4 space-y-2">
                  {job.points.map((p, pi) => (
                    <li key={pi} className="flex gap-2.5 text-[13px] leading-relaxed text-dim">
                      <Bullet />
                      <span>{t(p)}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {job.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-sm bg-line-soft px-2 py-1 text-[10px] text-dim"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
