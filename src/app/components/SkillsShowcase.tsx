"use client";
import { motion } from "framer-motion";
import SectionFX from "./SectionFX";
import type { ReactNode } from "react";

const chip = (label: string, badge?: string) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.06 }}
    className="flex items-center gap-3 pr-4 pl-2 py-2 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur"
  >
    <div className="h-14 w-14 rounded-2xl bg-white/[0.06] border border-white/15 grid place-items-center shadow-[0_0_30px_rgba(255,255,255,.06)]">
      <span className="font-bold">{badge ?? label.slice(0,3)}</span>
    </div>
    <span className="text-sm text-slate-200">{label}</span>
  </motion.div>
);

type Item = { name: string; badge?: string };
const LANGUAGES: Item[] = [
  { name: "C" }, { name: "C#" }, { name: "Java" }, { name: "Python", badge: "Py" },
  { name: "VBA" }, { name: "HTML" }, { name: "CSS" }, { name: "JavaScript", badge: "JS" },
  { name: "TypeScript", badge: "TS" },
];
const FRAMEWORKS_TOOLS: Item[] = [
  { name: "Node.js", badge: "Node" }, { name: "React", badge: "⚛︎" },
  { name: "Tkinter" }, { name: "JavaFX" }, { name: "Bootstrap", badge: "BS" },
  { name: "Git" }, { name: "GitHub" }, { name: "MySQL", badge: "SQL" },
  { name: "Visual Studio", badge: "VS" }, { name: "Eclipse" },
  { name: "Tailwind", badge: "TW" }, { name: "Framer Motion", badge: "FM" },
];

function Marquee({ items, delay = 0 }: { items: Item[]; delay?: number }) {
  const list = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className="flex gap-5 whitespace-nowrap"
        style={{ animation: "marquee 18s linear infinite", animationDelay: `${delay}s` }}
      >
        {list.map((it, i) => (
          <div key={i}>{chip(it.name, it.badge)}</div>
        ))}
      </div>
    </div>
  );
}

export default function SkillsShowcase() {
  return (
    <section id="skills" className="relative py-16">
      <SectionFX opacity={0.1} speed={65} />
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-semibold text-center mb-6">
          <span className="text-glow">Languages & Tools</span>
        </h2>
        <p className="text-center text-slate-400 mb-8">
          Frontend + Backend + Tooling — what I actually build with.
        </p>

        <div className="mb-5 text-sm uppercase tracking-wide text-slate-400">Programming Languages</div>
        <div className="space-y-4 mb-10">
          <Marquee items={LANGUAGES.slice(0, Math.ceil(LANGUAGES.length/2))} delay={0} />
          <Marquee items={LANGUAGES.slice(Math.ceil(LANGUAGES.length/2))} delay={-6} />
        </div>

        <div className="mb-5 text-sm uppercase tracking-wide text-slate-400">Frameworks & Tools</div>
        <div className="space-y-4">
          <Marquee items={FRAMEWORKS_TOOLS.slice(0, Math.ceil(FRAMEWORKS_TOOLS.length/2))} delay={0} />
          <Marquee items={FRAMEWORKS_TOOLS.slice(Math.ceil(FRAMEWORKS_TOOLS.length/2))} delay={-6} />
        </div>
      </div>
    </section>
  );
}

