"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type Project = {
  title: string;
  blurb: string;
  stack: string[];
  duration: string;
  image?: string;   // optional: /public path
  repo?: string;
  demo?: string;
};

export default function ProjectModal({
  open,
  onClose,
  project,
}: {
  open: boolean;
  onClose: () => void;
  project: Project | null;
}) {
  // esc to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && project && (
        <>
          <motion.div
            className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-[2001] grid place-items-center p-4"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-2xl rounded-3xl border border-white/15 bg-white/[0.07] backdrop-blur overflow-hidden">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm hover:bg-white/20"
                aria-label="Close"
              >✕</button>

              {/* header image / glow */}
              <div className="relative h-48 md:h-60 bg-gradient-to-br from-white/10 to-transparent">
                {project.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={project.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
                )}
                <div className="absolute inset-0 bg-[radial-gradient(600px_200px_at_20%_0,rgba(255,255,255,.18),transparent)]" />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold">{project.title}</h3>
                <p className="mt-2 text-slate-300">{project.blurb}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((s, i) => (
                    <span key={i} className="rounded-xl border border-white/15 bg-white/[0.06] px-3 py-1 text-xs text-slate-200 backdrop-blur">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-4 text-sm text-slate-400">
                  Build time: <span className="text-slate-200">{project.duration}</span>
                </div>

                <div className="mt-5 flex gap-3">
                  {project.demo && (
                    <a href={project.demo} target="_blank"
                      className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 hover:bg-white/20 transition">Live Demo</a>
                  )}
                  {project.repo && (
                    <a href={project.repo} target="_blank"
                      className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 hover:bg-white/20 transition">GitHub</a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
