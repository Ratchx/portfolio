"use client";

import { projects, ui } from "@/lib/content";
import { useLang } from "@/lib/lang";
import Bullet from "./Bullet";
import Reveal from "./Reveal";
import Section from "./Section";

export default function Projects() {
  const { t } = useLang();

  return (
    <Section
      id="projects"
      index="04"
      title={ui.sectionTitles.projects}
      command="ls ./projects"
    >
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal
            key={project.name.en}
            delay={i * 70}
            className={
              projects.length % 2 === 1 && i === projects.length - 1 ? "md:col-span-2" : ""
            }
          >
            <article className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-line bg-panel/90 p-5 transition-colors hover:border-acid-dim/50">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[15px] font-bold text-white group-hover:text-acid">
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="underline decoration-line underline-offset-4 hover:decoration-acid"
                    >
                      {t(project.name)} <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    t(project.name)
                  )}
                </h3>
                <span className="shrink-0 text-[10px] text-faint">{t(project.year)}</span>
              </div>

              <p className="mt-1 text-[11px] text-cyber">{t(project.kind)}</p>

              <p className="mt-4 text-[13px] leading-relaxed text-dim">{t(project.summary)}</p>

              <ul className="mt-4 flex-1 space-y-2">
                {project.points.map((p, pi) => (
                  <li key={pi} className="flex gap-2.5 text-[12px] leading-relaxed text-dim">
                    <Bullet />
                    <span>{t(p)}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s} className="rounded-sm bg-line-soft px-2 py-1 text-[10px] text-dim">
                    {s}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
