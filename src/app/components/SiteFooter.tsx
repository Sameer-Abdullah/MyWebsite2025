"use client";
import SectionFX from "./SectionFX";

function Icon({ name }: { name: "github" | "linkedin" | "mail" }) {
  if (name === "github") return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.83 1.23 1.83 1.23 1.07 1.84 2.8 1.31 3.48 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.98 0-1.32.47-2.39 1.24-3.24-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.31 1.24a11.5 11.5 0 0 1 6.02 0c2.3-1.56 3.3-1.24 3.3-1.24.67 1.65.25 2.87.13 3.17.77.85 1.23 1.92 1.23 3.24 0 4.65-2.81 5.68-5.49 5.98.43.37.81 1.1.81 2.22v3.29c0 .33.22.7.83.58A12 12 0 0 0 12 .5Z"/>
    </svg>
  );
  if (name === "linkedin") return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.49 2.49 0 1 0 0 4.98 2.49 2.49 0 0 0 0-4.98ZM3 9h4v12H3zM9 9h3.8v1.65h.06c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.65 4.78 6.09V21h-4v-5.34c0-1.27-.02-2.9-1.77-2.9-1.78 0-2.05 1.38-2.05 2.81V21H9z"/>
    </svg>
  );
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5z"/>
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer id="contact" className="relative py-16 text-center text-slate-400">
      <SectionFX opacity={0.06} speed={85} />

      <div className="mx-auto max-w-6xl px-6 mb-8">
        <div className="relative">
          <svg className="mx-auto h-12 w-full" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="white" stopOpacity="0.0" />
                <stop offset="50%" stopColor="white" stopOpacity="0.5" />
                <stop offset="100%" stopColor="white" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M0,30 C200,10 400,50 600,30 C800,10 1000,50 1200,30"
              stroke="url(#grad)" strokeWidth="2" fill="none"
            />
          </svg>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-2 text-slate-300 text-lg">
          Built by <span className="font-semibold">Sameer Abdullah</span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <a href="https://github.com/Sameer-Abdullah" target="_blank" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-2 hover:bg-white/[0.12] transition">
            <Icon name="github" /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/sameer-abdullah-97789a29b/" target="_blank" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-2 hover:bg-white/[0.12] transition">
            <Icon name="linkedin" /> LinkedIn
          </a>
          <a href="sa.sameer.abdullah@gmail.com" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-2 hover:bg-white/[0.12] transition">
            <Icon name="mail" /> Email
          </a>
        </div>

        <div className="mt-6 text-xs text-slate-500">
          © {new Date().getFullYear()} Sameer — All animations handcrafted with Next.js + Framer Motion
        </div>
      </div>
    </footer>
  );
}

