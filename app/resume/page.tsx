import type { Metadata } from "next";
import ResumeDoc from "@/components/ResumeDoc";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume — Ratchanon (Ratchx), FiveM Developer & Full-Stack Developer. Lua, TypeScript, SQL, Svelte 5.",
};

export default function ResumePage() {
  return (
    <>
      <SmoothScroll />
      <ResumeDoc />
    </>
  );
}
