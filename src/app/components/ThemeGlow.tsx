"use client";

export default function ThemeGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div
        className="absolute -top-32 -right-24 h-[60vh] w-[60vh] rounded-full blur-[100px]"
        style={{ background: "radial-gradient(closest-side, rgba(255,255,255,.14), transparent 70%)" }}
      />
      <div
        className="absolute bottom-[-10%] left-[-10%] h-[55vh] w-[55vh] rounded-full blur-[100px]"
        style={{ background: "radial-gradient(closest-side, rgba(255,255,255,.10), transparent 70%)" }}
      />
    </div>
  );
}


