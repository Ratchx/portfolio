import Link from "next/link";

export default function NotFound() {
  return (
    <main className="scanlines flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <p className="text-[11px] tracking-[0.3em] text-magenta uppercase">segfault</p>
      <h1 className="mt-4 text-[clamp(3rem,14vw,7rem)] leading-none font-extrabold tracking-tighter text-white">
        404
      </h1>
      <p className="mt-4 max-w-md text-sm text-dim">
        <span className="text-acid-dim">$</span> cd ./this-page
        <br />
        <span className="text-magenta">bash: no such file or directory</span>
      </p>
      <Link
        href="/"
        className="mt-8 rounded-sm bg-acid px-5 py-2.5 text-sm font-bold text-bg transition-opacity hover:opacity-85"
      >
        cd ~
      </Link>
    </main>
  );
}
