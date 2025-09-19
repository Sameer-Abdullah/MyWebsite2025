"use client";
import { motion } from "framer-motion";

type Item = { title: string; role: string; period: string; points: string[] };

const ITEMS: Item[] = [
  { title: "VEI — Dewatering Division", role: "Assistant Field Technician", period: "Summer 2025", points: ["Field ops support", "Data logging & reporting", "Process improvements"] },
  { title: "Car Rental DBMS", role: "Student Project", period: "2025", points: ["MySQL + Python/Tkinter GUI", "3NF/BCNF, dummy data", "Advanced reporting"] },
  { title: "Algorithms & DS", role: "Coursework", period: "2024–2025", points: ["C implementations", "Heaps / Graphs / MST / SSSP", "Testing & profiling"] },
];

export default function StickyTimeline() {
  return (
    <section className="relative mx-auto max-w-5xl p-8">
      <div className="grid md:grid-cols-[1fr,2fr] gap-8">
        <div className="md:sticky md:top-24 h-fit">
          <h2 className="text-3xl font-semibold">Experience</h2>
          <p className="text-slate-300">Pinned summary stays while details scroll.</p>
        </div>

        <div className="space-y-10">
          {ITEMS.map((it, i) => (
            <motion.article
              key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{it.title}</h3>
                <span className="text-sm text-slate-400">{it.period}</span>
              </div>
              <p className="text-slate-300">{it.role}</p>
              <ul className="mt-3 list-disc pl-5 text-slate-300 space-y-1">
                {it.points.map((p, j) => <li key={j}>{p}</li>)}
              </ul>
            </motion.article>
          ))}
          <div className="h-24" />
        </div>
      </div>
    </section>
  );
}
