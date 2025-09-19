"use client";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SectionFX({
  opacity = 0.12,
  speed = 50,
}: { opacity?: number; speed?: number }) {
  const { scrollY } = useScroll();
  const yBlobs = useTransform(scrollY, v => -(v / speed));
  const yGrid  = useTransform(scrollY, v => -((v + 400) / (speed * 0.8)));
  const bgPos  = useTransform(scrollY, v => `${-(v/6)}px ${-(v/10)}px`);

  return (
    <div className="pointer-events-none absolute inset-0 z-[-1] overflow-hidden">
      <motion.div style={{ y: yBlobs, opacity }} className="absolute -inset-32">
        <div className="absolute -top-24 -left-24 w-[70vw] h-[70vw] rounded-full blur-3xl"
             style={{ background: "radial-gradient(closest-side, rgba(255,255,255,.18), transparent 70%)" }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full blur-3xl"
             style={{ background: "radial-gradient(closest-side, rgba(255,255,255,.12), transparent 70%)" }} />
      </motion.div>

      <motion.div style={{ y: yGrid, opacity: opacity * 0.9 }} className="absolute -inset-32">
        <motion.div style={{ backgroundPosition: bgPos }} className="absolute inset-0" />
        <div
          className="absolute inset-0 mix-blend-screen"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,.06) 0 1px, transparent 1px 100px), repeating-linear-gradient(90deg, rgba(255,255,255,.05) 0 1px, transparent 1px 120px)",
          }}
        />
      </motion.div>
    </div>
  );
}


