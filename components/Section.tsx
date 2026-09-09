"use client";

import type { ReactNode } from "react";
import { useLang } from "@/lib/lang";
import type { L } from "@/lib/content";
import Reveal from "./Reveal";

type Props = {
  id: string;
  index: string;
  title: L;
  command: string;
  children: ReactNode;
};

export default function Section({ id, index, title, command, children }: Props) {
  const { t } = useLang();

  return (
    <section id={id} className="scroll-mt-24 py-20 sm:py-28">
      <Reveal>
        <header className="mb-10 sm:mb-14">
          <div className="flex items-baseline gap-3">
            <span className="text-xs text-acid-dim tabular-nums">{index}</span>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {t(title)}
            </h2>
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-gradient-to-r from-line via-line-soft to-transparent"
            />
          </div>
          <p className="mt-3 text-xs text-dim sm:text-sm">
            <span className="text-acid-dim">ratchx@rt</span>
            <span className="text-faint">:</span>
            <span className="text-cyber">~</span>
            <span className="text-faint">$ </span>
            <span className="text-dim">{command}</span>
          </p>
        </header>
      </Reveal>
      {children}
    </section>
  );
}
