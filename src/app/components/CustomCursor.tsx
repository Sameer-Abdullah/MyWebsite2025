"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const d = dot.current!, r = ring.current!;
    let x = 0, y = 0, rx = 0, ry = 0, rafId = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      d.style.transform = `translate(${x}px, ${y}px)`;
    };

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      r.style.transform = `translate(${rx}px, ${ry}px)`;
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const common =
    "pointer-events-none fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2";

  return (
    <>
      <div
        ref={ring}
        className={`${common} z-[2147483647] w-10 h-10 rounded-full border-2 border-white/70 shadow-[0_0_20px_rgba(255,255,255,.5)]`}
        aria-hidden
      />
      <div
        ref={dot}
        className={`${common} z-[2147483647] w-2 h-2 rounded-full bg-white`}
        aria-hidden
      />
    </>
  );
}


