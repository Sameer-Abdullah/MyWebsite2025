"use client";
import { useRef } from "react";

export default function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current!;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };
  const onLeave = () => {
    const el = ref.current!;
    el.style.transform = `translate(0px,0px)`;
  };

  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="rounded-2xl border border-white/20 bg-white/[0.06] px-5 py-3 font-medium shadow-lg shadow-black/30 backdrop-blur transition-transform"
    >
      {children}
    </button>
  );
}
