"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { experience, profile, projects, skills, ui } from "@/lib/content";
import { useLang } from "@/lib/lang";
import type { Lang } from "@/lib/content";

type Line = { kind: "in" | "out" | "err" | "ok"; text: string };

const HELP: Record<Lang, string[]> = {
  th: [
    "คำสั่งที่ใช้ได้:",
    "  help        รายการคำสั่ง",
    "  whoami      ข้อมูลตัวตน",
    "  skills      ทักษะทั้งหมด",
    "  exp         ประสบการณ์ทำงาน",
    "  projects    ผลงานที่ผ่านมา",
    "  contact     ช่องทางติดต่อ",
    "  neofetch    สรุปโปรไฟล์",
    "  clear       ล้างหน้าจอ",
  ],
  en: [
    "available commands:",
    "  help        list commands",
    "  whoami      identity",
    "  skills      full stack list",
    "  exp         work history",
    "  projects    past work",
    "  contact     how to reach me",
    "  neofetch    profile summary",
    "  clear       wipe the screen",
  ],
};

const GREETING: Record<Lang, Line[]> = {
  th: [
    { kind: "ok", text: `rt_script shell — เชื่อมต่อแล้ว` },
    { kind: "out", text: "พิมพ์ help เพื่อดูคำสั่งทั้งหมด" },
  ],
  en: [
    { kind: "ok", text: `rt_script shell — connected` },
    { kind: "out", text: "type help to see every command" },
  ],
};

function run(raw: string, lang: Lang): Line[] {
  const cmd = raw.trim().toLowerCase();
  const th = lang === "th";

  switch (cmd) {
    case "":
      return [];

    case "help":
    case "?":
      return HELP[lang].map((text) => ({ kind: "out", text }));

    case "whoami":
      return [
        { kind: "ok", text: `${profile.name} (${profile.alias}) — ${profile.devName}` },
        { kind: "out", text: profile.role[lang] },
        {
          kind: "out",
          text: th
            ? "เขียนโค้ด 5 ปี / FiveM 2 ปี / ภาษาแรกคือ JavaScript"
            : "5 years coding / 2 years FiveM / started on JavaScript",
        },
        { kind: "out", text: `${th ? "ปัจจุบัน" : "currently"}: ${profile.company}` },
      ];

    case "skills":
      return skills.flatMap<Line>((group) => [
        { kind: "ok", text: `[${group.title[lang]}]` },
        { kind: "out", text: `  ${group.items.map((i) => i.name).join(", ")}` },
      ]);

    case "exp":
    case "experience":
      return experience.flatMap<Line>((job) => [
        {
          kind: "ok",
          text: `${job.org}${job.players ? `  (${job.players} ${ui.players[lang]})` : ""}`,
        },
        { kind: "out", text: `  ${job.role[lang]} — ${job.period[lang]}` },
      ]);

    case "projects":
      return projects.flatMap<Line>((p) => [
        { kind: "ok", text: p.name[lang] },
        { kind: "out", text: `  ${p.stack.join(" · ")}` },
      ]);

    case "contact":
      return [
        { kind: "out", text: `email  : ${profile.email}` },
        { kind: "out", text: `github : ${profile.github}` },
      ];

    case "neofetch":
      return [
        { kind: "ok", text: `${profile.alias}@rt-script` },
        { kind: "out", text: "-----------------" },
        { kind: "out", text: `role     : ${profile.role[lang]}` },
        { kind: "out", text: `langs    : Lua, JavaScript, TypeScript, SQL` },
        { kind: "out", text: `web      : Svelte 5, Node.js` },
        { kind: "out", text: `servers  : Bubble Town, Sea City, Wavevy City` },
        { kind: "out", text: `players  : 4,400+` },
        { kind: "out", text: `uptime   : ${th ? "5 ปี" : "5 years"}` },
      ];

    case "sudo":
    case "sudo su":
      return [
        {
          kind: "err",
          text: th ? "ไม่ต้องหรอก เจ้าของเครื่องอยู่ตรงนี้แล้ว" : "nice try. the owner is already here.",
        },
      ];

    case "rm -rf /":
      return [
        {
          kind: "err",
          text: th
            ? "เคยเห็นคนทำบนเซิร์ฟจริงมาแล้ว ไม่ตลกนะ"
            : "seen that happen on a live server once. not funny.",
        },
      ];

    case "ls":
      return [{ kind: "out", text: "about  skills  experience  projects  contact  resume" }];

    case "date":
      return [{ kind: "out", text: new Date().toString() }];

    case "exit":
      return [{ kind: "out", text: th ? "ปิดไม่ได้ นี่คือเว็บ :)" : "cannot exit. this is a website :)" }];

    default:
      return [
        {
          kind: "err",
          text: `${cmd}: ${th ? "ไม่รู้จักคำสั่งนี้ ลองพิมพ์ help" : "command not found. try help"}`,
        },
      ];
  }
}

const COLORS: Record<Line["kind"], string> = {
  in: "text-txt",
  out: "text-dim",
  err: "text-magenta",
  ok: "text-acid",
};

export default function TerminalWidget() {
  const { lang, t } = useLang();
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ทักทายใหม่เมื่อสลับภาษา
  useEffect(() => {
    setLines(GREETING[lang]);
  }, [lang]);

  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [lines]);

  const execute = () => {
    const entered = value;
    setValue("");
    setCursor(-1);

    if (entered.trim().toLowerCase() === "clear") {
      setLines([]);
      return;
    }

    if (entered.trim()) setHistory((h) => [entered, ...h].slice(0, 40));
    setLines((prev) => [
      ...prev,
      { kind: "in", text: entered },
      ...run(entered, lang),
    ]);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    execute();
  };

  return (
    <div
      className="overflow-hidden rounded-sm border border-line bg-panel"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-line bg-panel-2 px-3 py-2">
        <span className="size-2 rounded-full bg-magenta/60" aria-hidden="true" />
        <span className="size-2 rounded-full bg-amber/60" aria-hidden="true" />
        <span className="size-2 rounded-full bg-acid/60" aria-hidden="true" />
        <span className="ml-2 text-[10px] text-faint">
          {t(ui.terminalTitle)} — {t(ui.hint)}
        </span>
      </div>

      <div
        ref={bodyRef}
        className="h-64 overflow-y-auto px-4 py-3 text-[12px] leading-relaxed sm:h-72"
      >
        {lines.map((line, i) => (
          <p key={i} className={`break-words whitespace-pre-wrap ${COLORS[line.kind]}`}>
            {line.kind === "in" && <span className="text-acid-dim">$ </span>}
            {line.text}
          </p>
        ))}

        <form onSubmit={submit} className="mt-1 flex items-center gap-2">
          <label htmlFor="rt-console" className="shrink-0 text-acid-dim">
            $
          </label>
          <input
            id="rt-console"
            ref={inputRef}
            value={value}
            spellCheck={false}
            autoComplete="off"
            aria-label="console input"
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              // จัดการ Enter เองแทนการพึ่ง implicit submit ของฟอร์ม
              if (e.key === "Enter") {
                e.preventDefault();
                execute();
                return;
              }
              // ลูกศรขึ้น-ลงย้อนคำสั่งเดิม เหมือนเชลล์จริง
              if (e.key === "ArrowUp") {
                e.preventDefault();
                const next = Math.min(cursor + 1, history.length - 1);
                if (next >= 0) {
                  setCursor(next);
                  setValue(history[next]);
                }
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                const next = cursor - 1;
                setCursor(next);
                setValue(next >= 0 ? history[next] : "");
              }
            }}
            className="w-full bg-transparent text-txt caret-acid outline-none"
          />
        </form>
      </div>
    </div>
  );
}
