"use client";
import { useEffect, useRef } from "react";

export default function Particles({ count = 60 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current!;
    const ctx = c.getContext("2d")!;
    let w = (c.width = window.innerWidth);
    let h = (c.height = window.innerHeight);
    const onResize = () => { w = c.width = window.innerWidth; h = c.height = window.innerHeight; };
    window.addEventListener("resize", onResize);

    const dots = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      for (const p of dots) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      requestAnimationFrame(draw);
    };
    draw();
    return () => window.removeEventListener("resize", onResize);
  }, [count]);

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10 opacity-10" />;
}
