"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Gear from "./Gear";
import Particles from "./Particles";

export default function ParallaxHero() {
  const { scrollYProgress } = useScroll();
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0.25]);

  return (
    <section className="relative h-[120vh] overflow-hidden flex items-center justify-center">

      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-[#05060a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(40,50,70,.18),transparent_60%)]" />
      </div>

      <Particles />

      <div className="absolute -z-10 left-[-20vw] bottom-[-20vh] opacity-[0.08]">
        <Gear large scrub />
      </div>

      <motion.h1
        style={{ y: titleY, opacity: titleOpacity }}
        className="text-center text-5xl md:text-7xl font-extrabold tracking-tight leading-tight"
      >
        Sameer Abdullah
      </motion.h1>

      <motion.p
        className="absolute bottom-10 text-slate-300/80"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Scroll to explore ↓
      </motion.p>
    </section>
  );
}

