"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useInView } from "framer-motion";
import SectionFX from "./SectionFX";

type Item = { title: string; role: string; period: string; points: string[] };
const ITEMS: Item[] = [
  { title: "VEI — System Technician", role: "Assistant Field Technician", period: "Summer 2025", points: ["Field ops support", "Data logging & reporting", "Process improvements"] },
  { title: "Kentucky Fried Chicken", role: "Shift Manager", period: "2025 - Present", points: ["Lead a team of 15+", "Trained Staff", "Improve Store Sale"] },
  { title: "PDHS", role: "Computer Technician", period: "2021–2023", points: ["Installed and configured hardware components", "Troubleshooting systems", "Testing & profiling"] },
];

function ExpCard({ it, i }: { it: Item; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.55 }); 

  return (
    <motion.article
      ref={ref}
      animate={inView ? "show" : "hide"}
      initial="hide"
      variants={{
        hide: { opacity: 0, y: 24, scale: 0.98, x: i % 2 ? 20 : -20 },
        show: { opacity: 1, y: 0,  scale: 1,    x: 0, transition: { duration: 0.5, ease: "easeOut" } },
      }}
      className={`relative mx-auto md:mx-0 md:w-[46%] ${i % 2 ? "md:ml-[54%]" : "md:mr-[54%]"} rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur`}
    >

      <motion.span
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 18 }}
        className={`hidden md:block absolute top-8 ${i % 2 ? "left-[-10px]" : "right-[-10px]"} h-4 w-4 rounded-full bg-white`}
      />
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold">{it.title}</h3>
        <span className="text-sm text-slate-400">{it.period}</span>
      </div>
      <p className="text-slate-300">{it.role}</p>
      <ul className="mt-3 list-disc pl-5 text-slate-300 space-y-1">
        {it.points.map((p, j) => <li key={j}>{p}</li>)}
      </ul>
    </motion.article>
  );
}

export default function ExperiencePath() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });
  const dash = useTransform(p, v => `${(1 - v) * 800}`);

  return (
    <section ref={ref} className="relative mx-auto max-w-6xl p-8">
      <SectionFX opacity={0.07} speed={80} />

      <h2 className="text-3xl font-semibold text-center mb-10">Experience</h2>

      <svg className="pointer-events-none absolute left-0 right-0 mx-auto top-0 h-full w-[2px] -z-10" viewBox="0 0 2 1000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.2" />
            <stop offset="100%" stopColor="white" stopOpacity="0.6" />
          </linearGradient>
          <filter id="blur"><feGaussianBlur stdDeviation="2" /></filter>
        </defs>
        <line x1="1" y1="0" x2="1" y2="1000" stroke="white" strokeOpacity="0.08" strokeWidth="2" />
        <motion.line x1="1" y1="0" x2="1" y2="1000" stroke="url(#glow)" strokeWidth="3" strokeDasharray="800" strokeDashoffset={dash as any} filter="url(#blur)" />
      </svg>

      <div className="relative space-y-16">
        {ITEMS.map((it, i) => <ExpCard key={i} it={it} i={i} />)}
        <div className="h-16" />
      </div>
    </section>
  );
}


