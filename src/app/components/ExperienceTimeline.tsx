"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

type Item = { side: "left" | "right"; title: string; role: string; period: string; points: string[] };

const ITEMS: Item[] = [
  { side: "left",  title: "VEI — Dewatering Division", role: "Assistant Field Technician", period: "Summer 2025", points: ["Field ops support", "Data logging & reporting", "Process improvements"] },
  { side: "right", title: "Car Rental DBMS",           role: "Student Project",           period: "2025",        points: ["MySQL + Python/Tkinter GUI", "3NF/BCNF", "Advanced reporting"] },
  { side: "left",  title: "Algorithms & DS",           role: "Coursework",                period: "2024–2025",   points: ["Heaps / Graphs / MST / SSSP", "C implementations", "Testing & profiling"] },
];

export default function ExperienceTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 70%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });

  return (
    <section ref={ref} className="relative mx-auto max-w-6xl p-8">
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-full w-px bg-white/10" />
      <motion.div
        style={{ scaleY: progress }}
        className="pointer-events-none origin-top absolute left-1/2 top-0 -translate-x-1/2 w-[3px] bg-white/40"
      />

      <h2 className="text-3xl font-semibold text-center mb-10">Experience</h2>

      <div className="relative space-y-16">
        {ITEMS.map((it, i) => {
          const sideClass =
            it.side === "left"
              ? "md:pr-16 md:text-right md:mr-[52%]"
              : "md:pl-16 md:text-left md:ml-[52%]";

          return (
            <motion.article
              key={i}
              initial={{ y: 30, opacity: 0, scale: 0.98 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur ${sideClass}`}
            >
              <span className={`hidden md:block absolute top-8 ${it.side === "left" ? "right-[-8px]" : "left-[-8px]"} h-4 w-4 rounded-full bg-white`} />
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-semibold">{it.title}</h3>
                <span className="text-sm text-slate-400">{it.period}</span>
              </div>
              <p className="text-slate-300">{it.role}</p>
              <ul className="mt-3 list-disc pl-5 md:pl-0 md:[&>li]:list-inside text-slate-300 space-y-1">
                {it.points.map((p, j) => <li key={j}>{p}</li>)}
              </ul>
            </motion.article>
          );
        })}
        <div className="h-16" />
      </div>
    </section>
  );
}
