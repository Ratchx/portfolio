/**
 * หัวข้อย่อยรูปสามเหลี่ยม
 *
 * ใช้ SVG แทนอักขระ ▸ เพราะ JetBrains Mono กับ IBM Plex Sans Thai ไม่มีกลิฟตัวนี้
 * เบราว์เซอร์เลยไปหยิบฟอนต์สำรองที่ metrics ไม่ตรงกัน ทำให้ลูกศรลอยสูงต่ำไม่เท่ากัน
 *
 * กล่องสูงเท่ากับ line-height ของบรรทัด (leading-relaxed = 1.625em) แล้วจัดกึ่งกลาง
 * ลูกศรจึงอยู่กลางบรรทัดแรกพอดีเสมอ ไม่ว่าตัวหนังสือจะขนาดเท่าไหร่
 */
export default function Bullet() {
  return (
    <span
      aria-hidden="true"
      className="flex h-[1.625em] shrink-0 items-center text-acid-dim"
    >
      <svg viewBox="0 0 6 8" className="h-[0.55em] w-auto" fill="currentColor">
        <path d="M0 0 L6 4 L0 8 Z" />
      </svg>
    </span>
  );
}
