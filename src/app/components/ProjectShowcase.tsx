"use client";
import { useRef } from "react";
import { motion } from "framer-motion";

type Card = { title: string; blurb: string; tag: string };

const CARDS: Card[] = [
  { title: "Ride-Share Concept", blurb: "Pricing fairness, real-time matching, map UI.", tag: "React + Maps" },
  { title: "Car Rental DBMS", blurb: "MySQL schema, 3NF/BCNF, GUI, reporting.", tag: "Python + MySQL" },
  { title: "Algo Playground", blurb: "C: heaps, graphs, Dijkstra, Prim.", tag: "C / DS&A" },
  { title: "Portfolio Engine", blurb: "GSAP/Framer timelines, parallax, particles.", tag: "Next.js" },
];

function TiltLayer({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current!;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${py * -8}deg`);
    el.style.setProperty("--ry", `${px * 8}deg`);
    el.style.setProperty("--tx", `${px * 8}px`);
    el.style.setProperty("--ty", `${py * 8}px`);
  };

  const onLeave = () => {
    const el = ref.current!;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--tx", "0px");
    el.style.setProperty("--ty", "0px");
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="[transform:perspective(900px)_rotateX(var(--rx))_rotateY(var(--ry))_translateX(var(--tx))_translateY(var(--ty))] transition-transform duration-200"
    >
      {children}
    </div>
  );
}

export default function ProjectShowcase() {
  return (
    <section className="mx-auto max-w-6xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold">Projects</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 [perspective:1200px]">
        {CARDS.map((c, i) => (
          <motion.a
            key={i}
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.06 }}
            className="group relative block rounded-3xl border border-white/10 bg-white/[0.035] overflow-hidden"
          >
            <TiltLayer>
              <div className="relative p-6">
                {/* layered shine */}
                <div className="absolute -inset-1 bg-[conic-gradient(from_210deg_at_50%_50%,rgba(255,255,255,.04),transparent_20%,transparent_80%,rgba(255,255,255,.06))] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="h-40 rounded-2xl bg-gradient-to-br from-white/10 to-transparent mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(600px_120px_at_-10%_-20%,rgba(255,255,255,.10),transparent),radial-gradient(600px_120px_at_120%_120%,rgba(255,255,255,.08),transparent)]" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{c.title}</h3>
                  <span className="text-xs uppercase tracking-wide text-slate-400">{c.tag}</span>
                </div>
                <p className="text-slate-300 mt-1">{c.blurb}</p>
              </div>
            </TiltLayer>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
