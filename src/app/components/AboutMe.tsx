"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import SectionFX from "./SectionFX";
import ContactModal from "./ContactModal";

export default function AboutMe() {
  const [open, setOpen] = useState(false);

  return (
    <section id="about" className="relative py-16">
      <SectionFX opacity={0.08} speed={75} />

      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-10 items-center">
        <div className="relative group">
          <div className="absolute -inset-6 rounded-[36px] blur-3xl opacity-40 group-hover:opacity-70 transition"
               style={{ background: "radial-gradient(closest-side, rgba(255,255,255,.18), transparent 65%)" }} />
          <div className="glow-ring absolute inset-0 rounded-[28px] opacity-40 group-hover:opacity-70 transition" />
          <motion.div
            whileHover={{ rotateX: 2, rotateY: -2, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className="relative rounded-[24px] overflow-hidden border border-white/15 bg-white/[0.03] backdrop-blur"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Image src="/me.jpg" alt="Sameer" width={900} height={1200} priority className="h-[360px] md:h-[520px] w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.10),transparent_35%)]" />
          </motion.div>
        </div>

        <div>
          <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.5 }} className="text-3xl font-semibold mb-3">
            <span className="text-glow">About Me</span>
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.6 }} transition={{ duration: 0.5, delay: 0.05 }} className="text-slate-300 leading-relaxed">
  I&rsquo;m Sameer — a software-engineering-bound builder who loves motion,
  3D, and performant UI. I ship clean, testable code and turn ideas
  into experiences that feel alive.          </motion.p>

          <div className="mt-6 flex flex-wrap gap-3">
            {["TypeScript", "React / Next.js", "Tailwind", "Framer Motion", "GSAP", "Three.js"].map((t, i) => (
              <motion.span key={i} initial={{ y: 8, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: false, amount: 0.6 }} transition={{ duration: 0.4, delay: 0.05 * i }} className="rounded-2xl border border-white/15 bg-white/[0.05] px-3 py-1 text-sm text-slate-200 backdrop-blur">
                {t}
              </motion.span>
            ))}
          </div>

          <div className="mt-7 flex gap-4">
            <a href="#projects" className="rounded-2xl border border-white/20 bg-white/[0.08] px-5 py-3 shadow-lg shadow-black/30 backdrop-blur hover:bg-white/[0.14] transition">
              View Projects
            </a>
            <button onClick={() => setOpen(true)} className="rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-3 hover:bg-white/[0.10] transition">
              Let's Connect
            </button>
          </div>
        </div>
      </div>

      <ContactModal
        open={open}
        onClose={() => setOpen(false)}                           
        github="https://github.com/Sameer-Abdullah"         
        linkedin="https://www.linkedin.com/in/sameer-abdullah-97789a29b/"
      />
    </section>
  );
}


