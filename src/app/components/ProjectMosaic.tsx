"use client";
import { motion } from "framer-motion";

const projects = [
  { title: "Ride-Share Concept", blurb: "Auth, maps, pricing engine, real-time", span: "md:col-span-2" },
  { title: "Car Rental DBMS", blurb: "MySQL + Python/Tkinter + 3NF", span: "" },
  { title: "Algo Visualizer", blurb: "Graphs, Dijkstra, MST, heaps", span: "" },
  { title: "Portfolio Engine", blurb: "Next.js + R3F + GSAP", span: "md:row-span-2" },
  { title: "VBA Toolkit", blurb: "Excel automation suite", span: "" },
  { title: "Arduino Pump Monitor", blurb: "Sensors + logging + alerts", span: "" },
];

export default function ProjectMosaic() {
  return (
    <section className="mx-auto max-w-6xl p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Projects</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[180px] md:auto-rows-[220px]">
        {projects.map((p, i) => (
          <motion.a
            key={i}
            href="#"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.04 }}
            className={`group relative overflow-hidden rounded-2xl ${p.span} border border-white/10 bg-[linear-gradient(140deg,rgba(255,255,255,.06),rgba(255,255,255,.02))] backdrop-blur-sm`}
            style={{ perspective: 800 }}
            onMouseMove={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              const r = el.getBoundingClientRect();
              const x = e.clientX - r.left;
              const y = e.clientY - r.top;
              const rx = ((y - r.height / 2) / r.height) * -8;
              const ry = ((x - r.width / 2) / r.width) * 8;
              el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = `rotateX(0deg) rotateY(0deg)`;
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(200px_200px_at_var(--x,50%)_var(--y,50%),rgba(255,255,255,.18),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-5">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="text-slate-300 text-sm">{p.blurb}</p>
            </div>
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
