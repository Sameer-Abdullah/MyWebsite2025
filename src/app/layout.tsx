import type { Metadata } from "next";
import "./globals.css";
import ThemeGlow from "./components/ThemeGlow";
import CustomCursor from "./components/CustomCursor";

export const metadata: Metadata = {
  title: "Sameer | Software Engineering Portfolio",
  description: "Techy, animated portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[var(--bg)] text-[var(--ink)] antialiased selection:bg-white/10">
        <ThemeGlow />
        <div className="relative z-10">{children}</div>
        <CustomCursor />
      </body>
    </html>
  );
}

