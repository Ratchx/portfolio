"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** ระยะที่แถบเมนูด้านบนบัง เวลากระโดดไปหัวข้อจะได้ไม่โดนทับ */
const NAV_OFFSET = -88;

/**
 * ทำให้การเลื่อนหน้ามีแรงเฉื่อย นุ่มกว่า scroll ปกติของเบราว์เซอร์
 * ปิดให้อัตโนมัติถ้าผู้ใช้ตั้งค่า reduced motion ไว้
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      // ease-out แรง ๆ ให้หยุดนิ่มไม่กระตุก
      easing: (x: number) => 1 - Math.pow(1 - x, 4),
      smoothWheel: true,
      // มือถือปล่อยให้ใช้ momentum ของระบบ นุ่มกว่าและไม่กินแบต
      syncTouch: false,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = window.requestAnimationFrame(loop);
    };
    raf = window.requestAnimationFrame(loop);

    // ลิงก์ #section ต้องส่งให้ Lenis เอง ไม่งั้นเบราว์เซอร์จะกระโดดตัดจังหวะ
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest?.('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: NAV_OFFSET });
      history.pushState(null, "", href);
    };

    document.addEventListener("click", onClick);

    return () => {
      window.cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
