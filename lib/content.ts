
export type Lang = "th" | "en";
export type L = { th: string; en: string };

export const SINCE = {
  coding: 2021,
  fivem: 2024,
} as const;

export function experienceYears(currentYear: number) {
  return {
    coding: Math.max(0, currentYear - SINCE.coding),
    fivem: Math.max(0, currentYear - SINCE.fivem),
  };
}

export const profile = {
  name: "Ratchanon",
  nameTh: "รัชชานนท์",
  alias: "Ratchx",
  devName: "rt script",
  email: "inbox.ratchanonnt@hotmail.com",
  github: "https://github.com/Ratchx",
  githubUser: "Ratchx",
  company: "BT GLOBAL INFINITY CO., LTD.",
  role: {
    th: "FiveM Developer / Full-Stack Developer",
    en: "FiveM Developer / Full-Stack Developer",
  } as L,
  typedRoles: [
    { th: "FiveM Developer", en: "FiveM Developer" },
    { th: "Lua / TypeScript Engineer", en: "Lua / TypeScript Engineer" },
    { th: "Server Performance & Optimization", en: "Server Performance & Optimization" },
    { th: "สร้างเมืองจากศูนย์", en: "Builds servers from zero" },
  ] as L[],
  tagline: {
    th: "เขียนได้ตั้งแต่ศูนย์ ไม่มี AI ก็ทำได้ ปัจจุบันใช้ AI เป็นเครื่องทุ่นแรง ไม่ใช่ขาหลัก",
    en: "I build from zero. AI is a force multiplier here, not a crutch.",
  } as L,
} as const;

export const stats: { value: string; label: L }[] = [
  { value: "{coding}", label: { th: "ปีที่เขียนโค้ด", en: "Years coding" } },
  { value: "{fivem}", label: { th: "ปีสาย FiveM", en: "Years on FiveM" } },
  { value: "3", label: { th: "เมืองที่ดูแล", en: "Servers shipped" } },
  { value: "5,200+", label: { th: "ผู้เล่นรวม", en: "Players served" } },
];

export const nav: { id: string; label: L }[] = [
  { id: "about", label: { th: "เกี่ยวกับ", en: "about" } },
  { id: "skills", label: { th: "ทักษะ", en: "skills" } },
  { id: "experience", label: { th: "ประสบการณ์", en: "experience" } },
  { id: "projects", label: { th: "ผลงาน", en: "projects" } },
  { id: "contact", label: { th: "ติดต่อ", en: "contact" } },
];

export const about: { body: L[]; facts: { k: L; v: L }[] } = {
  body: [
    {
      th: "ผมชื่อรัชชานนท์ ใช้ชื่อในวงการว่า rt script เขียนโค้ดมา {coding} ปี เริ่มจาก JavaScript เป็นภาษาแรก แล้วขยับมาสาย FiveM เต็มตัวเมื่อ {fivem} ปีที่แล้ว",
      en: "I am Ratchanon, shipping under the handle rt script. {coding} years writing code, starting with JavaScript, and the last {fivem} focused fully on FiveM.",
    },
    {
      th: "ก่อนหน้านั้นทำ Discord Bot เติมเกมที่ต่อ Payment Gateway จริง และเว็บ E-commerce ประสบการณ์ชุดนั้นทำให้ผมมองเมืองเป็นระบบ ไม่ใช่แค่กองสคริปต์ มีฐานข้อมูล มีเงินจริง และมีคนใช้งานพร้อมกันหลักพัน",
      en: "Before that I built a Discord top-up bot wired to a real payment gateway, plus an e-commerce site. That background taught me to treat a game server as a system rather than a pile of scripts: a database, real money, and thousands of concurrent users.",
    },
    {
      th: "งานที่ถนัดที่สุดคือลงมือทำตั้งแต่ศูนย์ วางโครงเมืองเอง เขียนคอร์เอง และเข้าไปแก้เมืองที่เปิดอยู่แล้วให้เฟรมเรตกลับมาโดยไม่พังของเดิม",
      en: "What I do best: start a server from an empty folder and take it live, or drop into a running one and win the frame time back without breaking what players already love.",
    },
  ],
  facts: [
    { k: { th: "ชื่อจริง", en: "Name" }, v: { th: "รัชชานนท์ (Ratchx)", en: "Ratchanon (Ratchx)" } },
    { k: { th: "ชื่อสายเดฟ", en: "Dev handle" }, v: { th: "rt script", en: "rt script" } },
    { k: { th: "ภาษาแรก", en: "First language" }, v: { th: "JavaScript", en: "JavaScript" } },
    { k: { th: "ปัจจุบัน", en: "Currently" }, v: { th: profile.company, en: profile.company } },
    { k: { th: "ที่อยู่", en: "Based in" }, v: { th: "ประเทศไทย", en: "Thailand" } },
  ],
};

export type SkillGroup = {
  title: L;
  hint: L;
  items: { name: string; level: number; note: L }[];
};

export const skills: SkillGroup[] = [
  {
    title: { th: "ภาษาหลัก", en: "Core languages" },
    hint: { th: "ใช้งานจริงในโปรดักชัน", en: "Used in production" },
    items: [
      {
        name: "Lua",
        level: 95,
        note: {
          th: "FiveM client/server, natives, ระบบเมืองทั้งก้อน",
          en: "FiveM client and server, natives, whole city systems",
        },
      },
      {
        name: "JavaScript",
        level: 90,
        note: { th: "ภาษาแรก ใช้มาตลอด {coding} ปี", en: "First language, {coding} years in" },
      },
      {
        name: "TypeScript",
        level: 85,
        note: { th: "ฝั่งเว็บและเครื่องมือภายใน", en: "Web and internal tooling" },
      },
      {
        name: "SQL",
        level: 85,
        note: { th: "ออกแบบสคีมา ทำ index แก้คิวรีช้า", en: "Schema design, indexing, slow-query surgery" },
      },
    ],
  },
  {
    title: { th: "FiveM", en: "FiveM" },
    hint: { th: "งานหลัก {fivem} ปีเต็ม", en: "{fivem} years, full time" },
    items: [
      {
        name: "Resource Architecture",
        level: 95,
        note: { th: "วางโครงสร้างเมืองตั้งแต่ศูนย์", en: "Server architecture from an empty folder" },
      },
      {
        name: "Performance Tuning",
        level: 95,
        note: { th: "ลด resmon ล้าง thread จูน tick", en: "resmon budgets, thread cleanup, tick tuning" },
      },
      {
        name: "NUI",
        level: 85,
        note: { th: "UI ในเกมด้วยเว็บสแตก", en: "In-game UI built with the web stack" },
      },
      {
        name: "ESX / Custom Core",
        level: 90,
        note: { th: "แก้คอร์เอง ไม่ใช่แค่ใช้ของสำเร็จ", en: "I modify the core, not just consume it" },
      },
    ],
  },
  {
    title: { th: "เว็บ", en: "Web" },
    hint: { th: "งานหน้าบ้านและหลังบ้าน", en: "Front and back of house" },
    items: [
      {
        name: "Svelte 5",
        level: 88,
        note: { th: "runes และ reactivity รุ่นใหม่", en: "Runes and the new reactivity model" },
      },
      {
        name: "Node.js",
        level: 85,
        note: { th: "บอท API และงานเบื้องหลัง", en: "Bots, APIs, background jobs" },
      },
      {
        name: "REST API",
        level: 85,
        note: { th: "ต่อ Payment Gateway จริง", en: "Real payment gateway integrations" },
      },
      {
        name: "HTML / CSS",
        level: 88,
        note: { th: "งาน UI ทั้งเว็บและ NUI", en: "UI for both web and NUI" },
      },
    ],
  },
  {
    title: { th: "เครื่องมือ", en: "Tooling" },
    hint: { th: "ของที่ใช้ทุกวัน", en: "Daily drivers" },
    items: [
      {
        name: "MySQL / MariaDB",
        level: 85,
        note: { th: "ฐานข้อมูลหลักของเมือง", en: "The database behind every server" },
      },
      {
        name: "Git / GitHub",
        level: 85,
        note: { th: "เวอร์ชันและงานเป็นทีม", en: "Versioning and teamwork" },
      },
      {
        name: "Discord.js",
        level: 80,
        note: { th: "บอทเติมเกมและระบบหลังบ้าน", en: "Top-up bots and back-office tooling" },
      },
      {
        name: "Vercel / Linux",
        level: 75,
        note: { th: "ดีพลอยและดูแลเซิร์ฟเวอร์", en: "Deploys and server upkeep" },
      },
    ],
  },
];

export type Job = {
  org: string;
  company?: string;
  role: L;
  period: L;
  players?: string;
  tag: L;
  current?: boolean;
  ended?: boolean;
  summary: L;
  points: L[];
  stack: string[];
};

export const experience: Job[] = [
  {
    org: "Wavevy City SS1 – 2",
    company: "BT GLOBAL INFINITY CO., LTD.",
    role: {
      th: "FiveM Developer — ดูแล Optimization",
      en: "FiveM Developer — Optimization Lead",
    },
    period: { th: "2025 – ปัจจุบัน", en: "2025 – Present" },
    players: "2,048",
    tag: { th: "เต็ม slot · คิว 300+", en: "Full slots · 300+ queued" },
    current: true,
    summary: {
      th: "รับผิดชอบหลักเรื่องประสิทธิภาพของ Wavevy City ตั้งแต่ SS1 ถึง SS2 ภายใต้ BT GLOBAL INFINITY CO., LTD. SS2 ผู้เล่นเต็ม 2,048 slot ซึ่งเป็นเพดานของ FiveM และยังมีคิวรอเข้าเมืองอีก 300+",
      en: "Own performance for Wavevy City from SS1 through SS2 under BT GLOBAL INFINITY CO., LTD. SS2 filled all 2,048 slots, the FiveM ceiling, with another 300+ players waiting in the queue.",
    },
    points: [
      {
        th: "SS1 เข้ามากลางคันตอนเมืองเปิดอยู่แล้วและมีผู้เล่น 1,200+ แล้วกลับมาดูแลต่อใน SS2",
        en: "Joined SS1 mid-project with the city already live at 1,200+ players, then came back for SS2.",
      },
      {
        th: "ไล่หา resource ที่กิน tick แล้วรื้อเขียนใหม่ ลดภาระทั้งฝั่ง client และ server",
        en: "Hunted down tick-hungry resources and rewrote them, cutting load on both client and server.",
      },
      {
        th: "แก้คิวรีและสคีมาที่กลายเป็นคอขวดตอนคนเต็มเมือง",
        en: "Fixed the queries and schema that became bottlenecks at peak population.",
      },
      {
        th: "อ่านโค้ดของทีมเดิมให้เข้าใจก่อนแก้ เพื่อไม่ให้กระทบ gameplay ที่ผู้เล่นคุ้นอยู่แล้ว",
        en: "Read the existing team code thoroughly before changing it, so live gameplay stayed familiar to players.",
      },
      {
        th: "วางแนวทางการเขียนสคริปต์ให้ทีมใช้ต่อ กันไม่ให้ปัญหาเดิมย้อนกลับมา",
        en: "Set scripting conventions for the team so the same problems would not creep back.",
      },
    ],
    stack: ["Lua", "SQL", "FiveM", "Profiling"],
  },
  {
    org: "Sea City",
    role: { th: "Lead Developer", en: "Lead Developer" },
    period: { th: "2024 – 2025", en: "2024 – 2025" },
    players: "2,000+",
    tag: { th: "ทำตั้งแต่ 0", en: "Built from zero" },
    ended: true,
    summary: {
      th: "เป็นเดฟหลักของเมือง ทำตั้งแต่โฟลเดอร์ว่างจนผู้เล่นแตะ 2,000+ เป็นเมืองที่ใหญ่ที่สุดที่เคยสร้างเองจากศูนย์",
      en: "Main developer from an empty folder to a 2,000+ player city, the largest server I have built from zero.",
    },
    points: [
      {
        th: "ออกแบบคอร์และโครงสร้าง resource ทั้งหมดเอง",
        en: "Designed the core framework and the full resource architecture.",
      },
      {
        th: "เขียนระบบเศรษฐกิจ อาชีพ และอินเวนทอรี ให้รองรับผู้เล่นหลักพันพร้อมกัน",
        en: "Built economy, job, and inventory systems that hold up with thousands online at once.",
      },
      {
        th: "ทำ NUI ของระบบหลักเอง ทั้งดีไซน์และการเชื่อมกับฝั่งเกม",
        en: "Built the NUI for core systems, both the interface and the bridge into the game.",
      },
      {
        th: "ดูแลฐานข้อมูล การอัปเดตขึ้นเมืองจริง และแก้ปัญหาหน้างานตอนคนเต็ม",
        en: "Owned the database, live deploys, and incident response at peak hours.",
      },
    ],
    stack: ["Lua", "JavaScript", "SQL", "NUI", "MySQL"],
  },
  {
    org: "Bubble Town",
    role: { th: "Lead Developer", en: "Lead Developer" },
    period: { th: "2024", en: "2024" },
    players: "1,200+",
    tag: { th: "เมืองแรก", en: "First server" },
    ended: true,
    summary: {
      th: "เมืองแรกในสาย FiveM รับเป็นเดฟหลักตั้งแต่วันแรก ทำจาก 0 จนเมืองเปิดจริงและมีผู้เล่น 1,200+",
      en: "My first FiveM server. Lead developer from day one, from zero to a live city with 1,200+ players.",
    },
    points: [
      {
        th: "เรียน FiveM จากศูนย์แล้วส่งเมืองขึ้นจริงภายในโปรเจกต์เดียว",
        en: "Learned FiveM from scratch and shipped a live city inside a single project.",
      },
      {
        th: "เขียนระบบหลักของเมืองเองทั้งหมด ตั้งแต่ผู้เล่น อาชีพ ไปจนถึงเศรษฐกิจ",
        en: "Wrote every core system myself: players, jobs, and the economy.",
      },
      {
        th: "วางรากฐานวิธีทำงานที่ใช้ต่อในเมืองถัดไป",
        en: "Established the working patterns I carried into the servers that followed.",
      },
    ],
    stack: ["Lua", "SQL", "FiveM"],
  },
];

export type Project = {
  name: L;
  kind: L;
  year: L;
  url?: string;
  summary: L;
  points: L[];
  stack: string[];
};

export const projects: Project[] = [
  {
    name: { th: "A-Pay Payment Gateway", en: "A-Pay Payment Gateway" },
    kind: { th: "ระบบชำระเงิน QR / PromptPay", en: "QR / PromptPay payments" },
    year: { th: "2026", en: "2026" },
    summary: {
      th: "Payment Gateway ที่ตรวจการสแกนจ่าย QR / PromptPay แล้วยืนยันยอดเงินให้ทันที แอป Android เก็บแจ้งเตือนเงินเข้าจากแอปธนาคารเป็นหลักฐาน ส่วน backend เป็นที่เดียวที่ตัดสินผล",
      en: "A payment gateway that checks a QR / PromptPay scan and confirms the amount instantly. An Android app collects the bank app's incoming-transfer notifications as evidence, and only the backend decides the result.",
    },
    points: [
      {
        th: "ออกแบบแบบ security-first และ fail-closed ยืนยันอัตโนมัติก็ต่อเมื่อผ่าน hard rule ครบ 19 ข้อ ไม่ผ่านข้อใดก็เข้าคิวให้คนตรวจ",
        en: "Security-first and fail-closed: a payment auto-confirms only after passing all 19 hard rules, otherwise it goes to a human review queue.",
      },
      {
        th: "สุ่มเศษสตางค์ให้ทุก order ยอดจึงไม่ชนกัน จับคู่เงินเข้ากับ order ได้แม้แจ้งเตือนไม่มีเลขอ้างอิง",
        en: "Adds random satang to every order so amounts never collide, matching payments to orders even when the notification has no reference number.",
      },
      {
        th: "ยืนยันตัวตนโทรศัพท์ด้วยคีย์ใน Android Keystore และ pin certificate ของแอปธนาคาร กันหลักฐานปลอม",
        en: "Device identity from Android Keystore keys plus pinned bank-app certificates, so forged evidence is rejected.",
      },
      {
        th: "Idempotency 4 ชั้น audit log แบบ hash chain และเทสต์ replay / race condition 100 เคส",
        en: "Four layers of idempotency, a hash-chained audit log, and 100 tests for replay and race conditions.",
      },
    ],
    stack: ["Kotlin", "TypeScript", "SQL", "MySQL / MariaDB"],
  },
  {
    name: { th: "bunk", en: "bunk" },
    kind: { th: "โปรแกรม Windows", en: "Windows desktop app" },
    year: { th: "2026", en: "2026" },
    url: "https://github.com/Ratchx/bunk-releases",
    summary: {
      th: "โปรแกรมเขียนด้วย Rust สำหรับรัน คุม และดูสถานะคำสั่งที่ต้องรันค้างไว้ตอน dev บน Windows เช่น npm run dev, redis-server หรือ ssh tunnel แนวคิดเดียวกับ Docker Compose แต่รันคำสั่งตรง ๆ ไม่ใช้ container",
      en: "A Rust app that runs, supervises, and shows the status of long-running dev commands on Windows, such as npm run dev, redis-server, or an ssh tunnel. Same idea as Docker Compose, but it runs the commands directly with no containers.",
    },
    points: [
      {
        th: "แยกเป็นหน้าต่าง GUI กับ CLI + daemon ตั้งค่า service ของแต่ละโปรเจกต์ด้วยไฟล์ bunk.toml",
        en: "Split into a GUI window and a CLI plus daemon, with each project's services defined in a bunk.toml file.",
      },
      {
        th: "อัปเดตในแอปเฉพาะไฟล์ที่ลายเซ็น ed25519 และ sha256 ตรงทุกไฟล์ ไม่ยอมย้อนเวอร์ชัน และคืนไฟล์เดิมให้เองถ้าพลาดกลางทาง",
        en: "In-app updates install only files whose ed25519 signature and sha256 hashes match, refuse downgrades, and roll back automatically if anything fails mid-way.",
      },
      {
        th: "ติดตั้งจาก .exe ไฟล์เดียวโดยไม่ต้องใช้สิทธิ์ admin ถอนได้จาก Settings ของ Windows และติดตั้งแบบไม่ถามบน Server ได้",
        en: "Installs from a single .exe without admin rights, uninstalls from Windows Settings, and supports silent installs on servers.",
      },
    ],
    stack: ["Rust", "WebView2", "CLI", "Windows"],
  },
  {
    name: { th: "Discord Bot เติมเกม", en: "Game Top-up Discord Bot" },
    kind: { th: "บอท + ระบบชำระเงิน", en: "Bot + payments" },
    year: { th: "ก่อนสาย FiveM", en: "Pre-FiveM" },
    summary: {
      th: "บอท Discord สำหรับเติมเงินเกม ต่อ Payment Gateway จริง จ่ายเสร็จเติมให้อัตโนมัติ",
      en: "A Discord bot for game top-ups, wired to a real payment gateway with automatic fulfilment.",
    },
    points: [
      {
        th: "เชื่อม Payment Gateway และจัดการ webhook การชำระเงินให้ตรงกับยอดในระบบ",
        en: "Integrated the payment gateway and reconciled payment webhooks against system balances.",
      },
      {
        th: "ออกแบบฐานข้อมูลธุรกรรมให้ตรวจย้อนหลังได้ และกันเติมซ้ำ",
        en: "Designed a transaction store that is auditable and safe against double-crediting.",
      },
      {
        th: "ทำ flow สั่งงานผ่าน Discord ให้คนทั่วไปใช้ได้โดยไม่ต้องสอน",
        en: "Shaped a Discord flow plain enough that users needed no instructions.",
      },
    ],
    stack: ["JavaScript", "Node.js", "Discord.js", "SQL", "Payment Gateway"],
  },
  {
    name: { th: "เว็บ E-commerce", en: "E-commerce Website" },
    kind: { th: "เว็บไซต์ขายของ", en: "Storefront" },
    year: { th: "ก่อนสาย FiveM", en: "Pre-FiveM" },
    summary: {
      th: "เว็บร้านค้าออนไลน์ ทำทั้งหน้าร้าน ระบบสินค้า และหลังบ้านสำหรับจัดการออเดอร์",
      en: "An online store: storefront, catalogue, and a back office for order management.",
    },
    points: [
      {
        th: "ทำหน้าร้านและตะกร้าสินค้าให้ใช้งานลื่นบนมือถือ",
        en: "Built a storefront and cart that hold up on mobile.",
      },
      {
        th: "ออกแบบสคีมาสินค้า ออเดอร์ และสถานะการจัดส่ง",
        en: "Modelled products, orders, and fulfilment states.",
      },
      {
        th: "ทำหลังบ้านให้เจ้าของร้านจัดการเองได้โดยไม่ต้องแตะโค้ด",
        en: "Gave the shop owner a back office that needs no code to run.",
      },
    ],
    stack: ["JavaScript", "Node.js", "SQL", "HTML/CSS"],
  },
  {
    name: { th: "ระบบภายในเมือง FiveM", en: "FiveM City Systems" },
    kind: { th: "งานสาย FiveM", en: "FiveM work" },
    year: { th: "2024 – ปัจจุบัน", en: "2024 – Present" },
    summary: {
      th: "รวมงานระบบที่เขียนให้เมืองต่าง ๆ ทั้งคอร์เฟรมเวิร์ก อาชีพ เศรษฐกิจ อินเวนทอรี และ NUI",
      en: "The systems behind the servers: core framework, jobs, economy, inventory, and NUI.",
    },
    points: [
      {
        th: "เขียนระบบให้รันไหวตอนผู้เล่นเต็มเมือง ไม่ใช่แค่ตอนเทสต์คนเดียว",
        en: "Written to survive a full server, not just a solo test session.",
      },
      {
        th: "จูนประสิทธิภาพเป็นงานประจำ วัดก่อนแก้ทุกครั้ง",
        en: "Performance tuning as routine work: measure first, then change.",
      },
      {
        th: "ทำ UI ในเกมด้วยเว็บสแตกให้เข้ากับธีมของแต่ละเมือง",
        en: "In-game UI built with the web stack and matched to each city identity.",
      },
    ],
    stack: ["Lua", "TypeScript", "NUI", "MySQL"],
  },
];

export const ui = {
  viewResume: { th: "ดู Resume", en: "View resume" },
  backHome: { th: "กลับหน้าแรก", en: "Back to site" },
  print: { th: "พิมพ์ / บันทึก PDF", en: "Print / Save PDF" },
  copy: { th: "คัดลอก", en: "copy" },
  copied: { th: "คัดลอกแล้ว", en: "copied" },
  emailMe: { th: "ส่งอีเมล", en: "Email me" },
  openGithub: { th: "เปิด GitHub", en: "Open GitHub" },
  currentlyAt: { th: "ปัจจุบันทำงานที่", en: "Currently at" },
  left: { th: "ออกแล้ว", en: "Left" },
  players: { th: "ผู้เล่น", en: "players" },
  scroll: { th: "เลื่อนลง", en: "scroll" },
  hint: { th: "พิมพ์ help แล้วกด Enter", en: "type help and press Enter" },
  terminalTitle: { th: "คอนโซล", en: "console" },
  contactBody: {
    th: "รับงานพัฒนา FiveM และงานเว็บ ทั้งงานสร้างใหม่และงานเข้าไปแก้ของเดิมให้ลื่นขึ้น ทักมาคุยได้เลย",
    en: "Open to FiveM and web work: new builds, or coming into an existing project to make it fast. Say hello.",
  },
  sectionTitles: {
    about: { th: "เกี่ยวกับผม", en: "About" },
    skills: { th: "ทักษะ", en: "Skills" },
    experience: { th: "ประสบการณ์", en: "Experience" },
    projects: { th: "ผลงาน", en: "Projects" },
    contact: { th: "ติดต่อ", en: "Contact" },
  },
} as const;
