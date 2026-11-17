"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "01アイウエオカキクケコサシスセソタチツテトナニヌネノabcdefRT{}<>/\\[]$#";
const FONT_SIZE = 15;
const FRAME_MS = 55;

// Brighter at the edges, dim in the middle. This used to be a CSS mask on the
// canvas, which made the compositor re-mask the whole viewport on every frame.
function edgeWeight(x: number) {
  const d = Math.min(x, 1 - x);
  return d >= 0.26 ? 0.18 : 1 - (d / 0.26) * 0.82;
}

export default function MatrixRain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let drops: number[] = [];
    let weight: number[] = [];
    let raf = 0;
    let last = 0;
    let width = 0;
    let height = 0;

    // Decorative background at 40% opacity: render at 1x regardless of DPR.
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Mobile URL bars change innerHeight while scrolling; only reallocate
      // when the width changes or the canvas is too short.
      if (w === width && h <= height) return;

      width = w;
      height = Math.max(h, height);
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.font = `${FONT_SIZE}px ui-monospace, monospace`;

      const columns = Math.ceil(width / FONT_SIZE);
      drops = Array.from({ length: columns }, () =>
        Math.floor((Math.random() * -height) / FONT_SIZE),
      );
      weight = Array.from({ length: columns }, (_, i) =>
        edgeWeight((i * FONT_SIZE + FONT_SIZE / 2) / width),
      );
    };

    const draw = (now: number) => {
      raf = window.requestAnimationFrame(draw);
      if (now - last < FRAME_MS) return;
      last = now;

      ctx.globalAlpha = 1;
      ctx.fillStyle = "rgba(4, 7, 10, 0.09)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#00ff9c";

      for (let i = 0; i < drops.length; i++) {
        const y = drops[i] * FONT_SIZE;
        if (y > 0) {
          ctx.globalAlpha = (Math.random() > 0.985 ? 0.75 : 0.22) * weight[i];
          ctx.fillText(GLYPHS[(Math.random() * GLYPHS.length) | 0], i * FONT_SIZE, y);
        }

        if (y > height && Math.random() > 0.975) drops[i] = 0;
        else drops[i] += 1;
      }
    };

    const onVisibility = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        raf = window.requestAnimationFrame(draw);
      }
    };

    resize();
    raf = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 -z-10 opacity-40"
    />
  );
}
