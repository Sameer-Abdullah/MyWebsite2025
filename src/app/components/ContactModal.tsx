"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
  github?: string;   
  linkedin?: string; 
};

export default function ContactModal({ open, onClose, github, linkedin }: Props) {
  const [mode, setMode] = useState<"menu" | "email">("menu"); 
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (open) {
      setMode("menu"); 
      setOk(null);
      setErr(null);
      setSending(false);
    }
  }, [open]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setSending(true); setOk(null); setErr(null);

  const form = e.currentTarget;                         
  const data = new FormData(form);
  const subject = String(data.get("subject") || "Hello!");
  const message = String(data.get("message") || "");
  const from    = String(data.get("from") || "");

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, message, from }),
    });
    const json = await res.json();
    if (!res.ok || !json.ok) throw new Error(json.error || "Failed to send");
    setOk(true);
    form.reset();                                       
    setTimeout(onClose, 900);
  } catch (error: unknown) {                        
    setOk(false);
    setErr(error instanceof Error ? error.message : "Could not send");
  } finally {
    setSending(false);
  }
}


  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-[1001] grid place-items-center p-4"
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-lg rounded-3xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm hover:bg-white/20"
                aria-label="Close"
              >✕</button>

              <h3 className="text-2xl font-semibold mb-2">Let’s connect</h3>
              <p className="text-slate-300 mb-5">
                Pick a quick action, or email me directly.
              </p>

              {mode === "menu" && (
                <div className="flex flex-wrap gap-3 mb-6">
                  <button
                    onClick={() => setMode("email")}
                    className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 hover:bg-white/20 transition"
                  >
                    Email
                  </button>
                  {linkedin && (
                    <a
                      href={linkedin}
                      target="_blank"
                      className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 hover:bg-white/20 transition"
                    >
                      LinkedIn
                    </a>
                  )}
                  {github && (
                    <a
                      href={github}
                      target="_blank"
                      className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 hover:bg-white/20 transition"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              )}

              {mode === "email" && (
                <form onSubmit={onSubmit} className="space-y-3 mb-1">
                  <input
                    name="from"
                    type="email"
                    placeholder="Your email (so I can reply)"
                    required
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 outline-none placeholder:text-slate-400"
                  />
                  <input
                    name="subject"
                    placeholder="Subject"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 outline-none placeholder:text-slate-400"
                  />
                  <textarea
                    name="message"
                    placeholder="Write a short message…"
                    rows={4}
                    required
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 outline-none placeholder:text-slate-400"
                  />
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setMode("menu")}
                      className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 hover:bg-white/20 transition"
                    >
                      ← Back
                    </button>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm ${ok === true ? "text-emerald-400" : ok === false ? "text-rose-400" : "text-slate-400"}`}>
                        {ok === true ? "Sent!" : ok === false ? `Error: ${err}` : sending ? "Sending…" : ""}
                      </span>
                      <button
                        type="submit"
                        disabled={sending}
                        className="rounded-2xl border border-white/20 bg-white/10 px-5 py-2 hover:bg-white/20 transition disabled:opacity-50"
                      >
                        {sending ? "Sending…" : "Send"}
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* hint */}
              <div className="mt-3 text-xs text-slate-400">
                Messages are delivered securely to my inbox.
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


