"use client";

import { useState } from "react";
import { profile, ui } from "@/lib/content";
import { useLang } from "@/lib/lang";
import Reveal from "./Reveal";
import Section from "./Section";
import TerminalWidget from "./TerminalWidget";

function CopyButton({ value }: { value: string }) {
  const { t } = useLang();
  const [done, setDone] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      window.setTimeout(() => setDone(false), 1600);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="shrink-0 rounded-sm border border-line px-2.5 py-1 text-[10px] text-dim transition-colors hover:border-acid-dim hover:text-acid"
    >
      {done ? t(ui.copied) : t(ui.copy)}
    </button>
  );
}

export default function Contact() {
  const { t } = useLang();

  return (
    <Section
      id="contact"
      index="05"
      title={ui.sectionTitles.contact}
      command="./say-hello.sh"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <p className="max-w-lg text-sm leading-relaxed text-dim sm:text-[15px]">
            {t(ui.contactBody)}
          </p>

          <div className="mt-7 space-y-3">
            <div className="flex items-center gap-3 rounded-sm border border-line bg-panel/90 px-4 py-3">
              <span className="w-16 shrink-0 text-[11px] text-acid-dim">email</span>
              <a
                href={`mailto:${profile.email}`}
                className="flex-1 truncate text-[13px] text-txt hover:text-acid"
              >
                {profile.email}
              </a>
              <CopyButton value={profile.email} />
            </div>

            <div className="flex items-center gap-3 rounded-sm border border-line bg-panel/90 px-4 py-3">
              <span className="w-16 shrink-0 text-[11px] text-acid-dim">github</span>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="flex-1 truncate text-[13px] text-txt hover:text-acid"
              >
                github.com/{profile.githubUser}
              </a>
              <CopyButton value={profile.github} />
            </div>

            <div className="flex items-center gap-3 rounded-sm border border-line bg-panel/90 px-4 py-3">
              <span className="w-16 shrink-0 text-[11px] text-acid-dim">work</span>
              <span className="flex-1 truncate text-[13px] text-dim">{profile.company}</span>
            </div>
          </div>

          <a
            href={`mailto:${profile.email}`}
            className="mt-7 inline-block rounded-sm bg-acid px-5 py-2.5 text-sm font-bold text-bg transition-opacity hover:opacity-85"
          >
            {t(ui.emailMe)}
          </a>
        </Reveal>

        <Reveal delay={90}>
          <TerminalWidget />
        </Reveal>
      </div>
    </Section>
  );
}
