"use client";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Gear({ large = false, scrub = false }: { large?: boolean; scrub?: boolean }) {
  const { scrollYProgress } = useScroll();
  const rotate = scrub ? useTransform(scrollYProgress, [0, 1], [0, 360]) : undefined;

  const size = large ? "w-[70vw] h-[70vw] max-w-[900px] max-h-[900px]" : "w-[320px] h-[320px] md:w-[480px] md:h-[480px]";

  return (
    <motion.svg
      style={{ rotate }}
      className={`${size} pointer-events-none`}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
    >
      <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="6" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 12;
        const x1 = 50 + Math.cos(a) * 35;
        const y1 = 50 + Math.sin(a) * 35;
        const x2 = 50 + Math.cos(a) * 45;
        const y2 = 50 + Math.sin(a) * 45;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
          />
        );
      })}
    </motion.svg>
  );
}


