import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Thai, JetBrains_Mono } from "next/font/google";
import { LangProvider } from "@/lib/lang";
import { profile } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

const thai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-thai",
});

const title = `${profile.alias} — ${profile.devName}`;
const description =
  "FiveM Developer & Full-Stack Developer. Lua, TypeScript, SQL, Svelte 5. สร้างเมือง FiveM ตั้งแต่ศูนย์ และจูนประสิทธิภาพเซิร์ฟเวอร์ผู้เล่นหลักพัน";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: title,
    template: `%s — ${profile.devName}`,
  },
  description,
  applicationName: profile.devName,
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  keywords: [
    "FiveM Developer",
    "FiveM Dev รับงาน",
    "Lua Developer",
    "TypeScript",
    "Svelte 5",
    "rt script",
    "Ratchx",
    "Ratchanon",
  ],
  openGraph: {
    type: "website",
    title,
    description,
    siteName: title,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#04070a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" className={`${jetbrains.variable} ${thai.variable}`}>
      <body className="antialiased">
        <LangProvider year={new Date().getFullYear()}>{children}</LangProvider>
      </body>
    </html>
  );
}
