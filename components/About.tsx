"use client";

import { about, profile, ui } from "@/lib/content";
import { useLang } from "@/lib/lang";
import Reveal from "./Reveal";
import Section from "./Section";

const ASCII = String.raw`
  ____  _____
 |  _ \|_   _|
 | |_) | | |     rt script
 |  _ <  | |     fivem / web
 |_| \_\ |_|     lua · ts · sql
`;

export default function About() {
  const { t } = useLang();

  return (
    <Section
      id="about"
      index="01"
      title={ui.sectionTitles.about}
      command="cat ./profile.md"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Reveal className="order-2 lg:order-1">
          <div className="space-y-5">
            {about.body.map((para, i) => (
              <p key={i} className="text-sm leading-relaxed text-dim sm:text-[15px]">
                {t(para)}
              </p>
            ))}
          </div>

          <blockquote className="mt-8 border-l-2 border-acid-dim bg-panel/60 px-5 py-4">
            <p className="text-sm text-txt italic">{t(profile.tagline)}</p>
          </blockquote>
        </Reveal>

        <Reveal delay={80} className="order-1 lg:order-2">
          <div className="overflow-hidden rounded-sm border border-line bg-panel">
            <div className="flex items-center gap-2 border-b border-line bg-panel-2 px-3 py-2">
              <span className="size-2 rounded-full bg-magenta/60" aria-hidden="true" />
              <span className="size-2 rounded-full bg-amber/60" aria-hidden="true" />
              <span className="size-2 rounded-full bg-acid/60" aria-hidden="true" />
              <span className="ml-2 text-[10px] text-faint">neofetch</span>
            </div>

            <pre className="overflow-x-auto px-4 pt-4 text-[10px] leading-tight text-acid sm:text-[11px]">
              {ASCII}
            </pre>

            <dl className="space-y-2 px-4 py-4 text-xs">
              {about.facts.map((f) => (
                <div key={f.k.en} className="flex gap-3">
                  <dt className="w-24 shrink-0 text-acid-dim">{t(f.k)}</dt>
                  <dd className="text-dim">
                    <span className="text-faint">: </span>
                    {t(f.v)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
