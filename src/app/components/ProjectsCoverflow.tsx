"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import SectionFX from "./SectionFX";
import ProjectModal, { type Project } from "./ProjectModal";

const PROJECTS: Project[] = [
  {
    title: "Ride-Share Concept",
    blurb: "Fair pricing, live matching, map UI.",
    stack: ["React", "TypeScript", "Map APIs"],
    duration: "~2 weeks",
    repo: "https://github.com/Sameer-Abdullah",
  },
  {
    title: "Car Rental DBMS",
    blurb: "MySQL schema, 3NF/BCNF, GUI, reports.",
    stack: ["Python", "Tkinter", "MySQL"],
    duration: "~3 weeks",
    repo: "https://github.com/Sameer-Abdullah",
  },
  {
    title: "Algo Playground",
    blurb: "Heaps, graphs, Dijkstra, Prim.",
    stack: ["C", "Data Structures", "CLI"],
    duration: "~1 week",
    repo: "https://github.com/Sameer-Abdullah",
  },
  {
    title: "Portfolio Engine",
    blurb: "Framer timelines, parallax, particles.",
    stack: ["Next.js", "Tailwind", "Framer Motion"],
    duration: "~1 week",
    repo: "https://github.com/Sameer-Abdullah",
  },
  {
    title: "3D Hero (R3F)",
    blurb: "Lightweight WebGL hero w/ DOF.",
    stack: ["Three.js", "React Three Fiber"],
    duration: "~4 days",
    repo: "https://github.com/Sameer-Abdullah",

  },
];

function CoverCard({
  p,
  i,
  onOpen,
}: {
  p: Project;
  i: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { amount: 0.6, margin: "0px 20% -20% 20%" });

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onOpen}
      initial={{ rotateY: -20, scale: 0.92, opacity: 0.7 }}
      animate={{
        rotateY: inView ? 0 : -20,
        scale: inView ? 1 : 0.92,
        opacity: inView ? 1 : 0.7,
      }}
      transition={{ type: "spring", stiffness: 120, damping: 18, delay: i * 0.03 }}
      className="group relative snap-center shrink-0 w-[78vw] md:w-[46vw] lg:w-[36vw] rounded-3xl overflow-hidden border border-white/10 bg-white/[0.035] backdrop-blur text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/30"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(220px 220px at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.13), transparent 60%)",
        }}
      />
      <div
        className="relative p-6"
        onMouseMove={(e) => {
          const el = (e.currentTarget as HTMLElement).parentElement as HTMLElement;
          const rect = el.getBoundingClientRect();
          el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
          el.style.setProperty("--my", `${e.clientY - rect.top}px`);
        }}
      >
        <div className="h-44 rounded-2xl bg-gradient-to-br from-white/10 to-transparent mb-4 overflow-hidden">
          {p.image && (
            <img src={p.image} alt="" className="h-full w-full object-cover opacity-80" />
          )}
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{p.title}</h3>
          <span className="text-xs uppercase tracking-wide text-slate-400">
            {p.stack[0]}
          </span>
        </div>
        <p className="text-slate-300 mt-1">{p.blurb}</p>
      </div>
    </motion.button>
  );
}

export default function ProjectsCoverflow() {
  const railRef = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState({ down: false, startX: 0, left: 0, moved: 0 });
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
  const el = railRef.current;
  if (!el) return;

  const onWheel = (e: WheelEvent) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    }
  };


  const handler: EventListener = (ev) => onWheel(ev as unknown as WheelEvent);

  el.addEventListener("wheel", handler, { passive: false });
  return () => el.removeEventListener("wheel", handler);
}, []);


  const THRESHOLD = 6;

  const onDown = (e: React.MouseEvent | React.TouchEvent) => {
    const el = railRef.current!;
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setDrag({ down: true, startX: clientX, left: el.scrollLeft, moved: 0 });
  };

  const onMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drag.down) return;
    const el = railRef.current!;
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const delta = clientX - drag.startX;
    el.scrollLeft = drag.left - delta;
    setDrag((d) => ({ ...d, moved: Math.abs(delta) }));
  };

  const onUp = (e?: React.MouseEvent | React.TouchEvent) => {
    if (!drag.down) return;
    if (drag.moved > THRESHOLD) {
      e?.preventDefault?.();
      e?.stopPropagation?.();
    }
    setDrag((d) => ({ ...d, down: false, moved: 0 }));
  };

  const handleOpen = (p: Project) => {
    if (drag.moved > THRESHOLD) return; 
    setActive(p);
    setOpen(true);
  };

  return (
    <section id="projects" className="relative py-14">
      <SectionFX opacity={0.12} speed={55} />

      <div className="relative mx-auto max-w-6xl px-6 z-10">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-3xl font-semibold">Projects</h2>
          <p className="text-slate-400 text-sm">Drag sideways • Click a card</p>
        </div>
      </div>

      <div className="relative px-6">
        <button
          onClick={() => railRef.current?.scrollBy({ left: -400, behavior: "smooth" })}
          className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/20 backdrop-blur hover:bg-white/20"
          aria-label="Prev"
        >
          ‹
        </button>
        <button
          onClick={() => railRef.current?.scrollBy({ left: 400, behavior: "smooth" })}
          className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/20 backdrop-blur hover:bg-white/20"
          aria-label="Next"
        >
          ›
        </button>

        <div
          ref={railRef}
          onMouseDown={onDown}
          onMouseMove={onMove}
          onMouseLeave={onUp}
          onMouseUp={onUp}
          onTouchStart={onDown}
          onTouchMove={onMove}
          onTouchEnd={onUp}
          className="no-scrollbar snap-x snap-mandatory overflow-x-auto active:cursor-grabbing cursor-grab relative z-10"
        >
          <div className="flex gap-6 py-2 pr-6 will-change-transform">
            {PROJECTS.map((p, i) => (
              <CoverCard key={i} p={p} i={i} onOpen={() => handleOpen(p)} />
            ))}
          </div>
        </div>
      </div>

      <ProjectModal open={open} onClose={() => setOpen(false)} project={active} />

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}






