"use client";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

type Item = { title: string; role: string; period: string; points: string[] };

const ITEMS: Item[] = [
  { title: "VEI — Dewatering Division", role: "Assistant Field Technician", period: "Summer 2025", points: ["Field ops support", "Data logging & reporting", "Process improvements"] },
  { title: "Car Rental DBMS", role: "Student Project", period: "2025", points: ["MySQL + Python/Tkinter", "3NF/BCNF", "Advanced reports"] },
  { title: "Algorithms & DS", role: "Coursework", period: "2024–2025", points: ["C implementations", "Heaps / Graphs / SSSP", "Testing & profiling"] },
];

export default function ExperienceLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 40%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });
  const lineScale = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative mx-auto max-w-6xl px-6 py-24">
      <h2 className="text-3xl font-semibold mb-10">Experience</h2>

      <div className="relative grid grid-cols-[40px,1fr] gap-6">
        <div className="relative">
          <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-white/10" />
          <motion.div
            className="absolute left-1/2 top-0 w-[3px] -translate-x-1/2 bg-white"
            style={{ height: lineScale }}
          />
        </div>

        <div className="space-y-10">
          {ITEMS.map((it, i) => (
            <motion.div
              key={i}
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative pl-6"
            >
              <div className="absolute left-[-34px] top-2 h-4 w-4 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,.35)]" />

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm hover:bg-white/[0.06] transition">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{it.title}</h3>
                  <span className="text-sm text-slate-400">{it.period}</span>
                </div>
                <p className="text-slate-300">{it.role}</p>
                <ul className="mt-3 list-disc pl-5 text-slate-300 space-y-1">
                  {it.points.map((p, j) => <li key={j}>{p}</li>)}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
