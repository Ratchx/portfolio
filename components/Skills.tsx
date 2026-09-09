"use client";

import { useEffect, useRef, useState } from "react";
import { skills, ui } from "@/lib/content";
import { useLang } from "@/lib/lang";
import Reveal from "./Reveal";
import Section from "./Section";

function Bar({ level }: { level: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-2 h-1 w-full overflow-hidden bg-line-soft">
      <div
        className="h-full bg-gradient-to-r from-acid-dim to-acid transition-[width] duration-1000 ease-out"
        style={{ width: inView ? `${level}%` : "0%" }}
      />
    </div>
  );
}

export default function Skills() {
  const { t } = useLang();

  return (
    <Section
      id="skills"
      index="02"
      title={ui.sectionTitles.skills}
      command="ls -la ./stack"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {skills.map((group, gi) => (
          <Reveal key={group.title.en} delay={gi * 70}>
            <article className="h-full rounded-sm border border-line bg-panel/90 p-5 transition-colors hover:border-acid-dim/50">
              <header className="mb-5 flex items-baseline justify-between gap-3">
                <h3 className="text-sm font-bold text-white">
                  <span className="text-acid-dim">/ </span>
                  {t(group.title)}
                </h3>
                <span className="text-[10px] text-faint">{t(group.hint)}</span>
              </header>

              <ul className="space-y-4">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[13px] text-txt">{item.name}</span>
                      <span className="text-[10px] text-acid-dim tabular-nums">
                        {item.level}%
                      </span>
                    </div>
                    <Bar level={item.level} />
                    <p className="mt-1.5 text-[11px] text-faint">{t(item.note)}</p>
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
