"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

function GlassCard({
  children,
  className = "",
  hoverGlow,
}: {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: string;
}) {
  return (
    <div
      className={`group/card relative rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl overflow-hidden transition-all duration-500 hover:bg-white/[0.07] hover:border-white/[0.15] ${className}`}
    >
      {hoverGlow && (
        <div
          className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${hoverGlow}, transparent 60%)`,
          }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

function AnimatedText() {
  const words = ["Executive", "Modern", "Minimal", "Bold"];
  const colors = ["#6366f1", "#06b6d4", "#22c55e", "#f59e0b"];
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((c) => (c + 1) % words.length),
      2500
    );
    return () => clearInterval(interval);
  }, []);
  return (
    <span
      className="inline-block transition-all duration-500"
      style={{ color: colors[current] }}
    >
      {words[current]}
    </span>
  );
}

function ColorPalette() {
  const [active, setActive] = useState(0);
  const colors = [
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#ef4444",
    "#f59e0b",
    "#22c55e",
    "#06b6d4",
    "#6366f1",
  ];
  return (
    <div className="flex flex-wrap gap-2.5">
      {colors.map((c, i) => (
        <button
          key={c}
          onClick={() => setActive(i)}
          className={`w-7 h-7 rounded-full transition-all duration-300 ${active === i
            ? "ring-2 ring-white ring-offset-2 ring-offset-zinc-950 scale-110"
            : "hover:scale-110"
            }`}
          style={{ background: c }}
        />
      ))}
    </div>
  );
}

function MiniResume() {
  return (
    <div className="w-44 aspect-[8.5/11] bg-white rounded-lg shadow-2xl shadow-indigo-500/10 p-3.5 mx-auto">
      <div className="flex items-center gap-2 mb-2.5">
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-300 to-purple-300" />
        <div>
          <div className="h-1.5 w-12 bg-zinc-800 rounded" />
          <div className="h-1 w-8 bg-zinc-400 rounded mt-0.5" />
        </div>
      </div>
      <div className="space-y-0.5 mb-2">
        <div className="h-[1px] w-full bg-zinc-200" />
        <div className="h-[1px] w-full bg-zinc-200" />
        <div className="h-[1px] w-3/4 bg-zinc-200" />
      </div>
      <div className="h-px w-full bg-indigo-100 my-1.5" />
      <div className="space-y-0.5 mb-2">
        <div className="h-1 w-8 bg-indigo-500 rounded" />
        <div className="h-[1px] w-full bg-zinc-200" />
        <div className="h-[1px] w-full bg-zinc-200" />
      </div>
      <div className="h-px w-full bg-indigo-100 my-1.5" />
      <div className="space-y-0.5">
        <div className="h-1 w-6 bg-indigo-500 rounded" />
        <div className="flex gap-0.5 flex-wrap">
          {[12, 16, 10, 14].map((w, i) => (
            <div
              key={i}
              className="h-2 rounded-full bg-indigo-50 border border-indigo-100"
              style={{ width: w }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document
        .querySelectorAll<HTMLElement>(".group\\/card")
        .forEach((card) => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
          card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
        });
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-3 md:p-5">
      {/* Nav */}
      <nav className="flex items-center justify-between mb-5 px-1">
        <div className="flex items-center gap-2.5">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0"
          >
            <rect width="32" height="32" rx="8" fill="#09090b" />
            <rect
              x="16"
              y="8.686"
              width="10.3336"
              height="10.3336"
              rx="3"
              transform="rotate(45 16 8.686)"
              fill="#3b82f6"
            />
          </svg>
          <span className="text-base font-bold">Resumely</span>
        </div>
        <Link
          href="/create"
          className="px-4 py-2 rounded-lg bg-white text-black text-sm font-bold hover:bg-zinc-100 transition-colors"
        >
          Open Studio
        </Link>
      </nav>

      {/*
        Bento layout using two columns on desktop:
        Left column (8/12): Hero, Features row (Features + Colors side-by-side), bottom strip (PDF + Privacy + No-signup)
        Right column (4/12): Resume preview, Templates, How it works
        Then full-width CTA
        Each column stacks naturally so cards match their content height.
      */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* ===== LEFT COLUMN ===== */}
        <div className="md:col-span-8 flex flex-col gap-3">
          {/* Hero */}
          <GlassCard
            className="p-8 lg:p-10 flex flex-col justify-center"
            hoverGlow="rgba(99,102,241,0.06)"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-5 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Resume Studio
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-3">
              Build resumes that
              <br className="hidden md:block" /> look <AnimatedText />
            </h1>
            <p className="text-zinc-400 text-sm md:text-base max-w-md mb-6 leading-relaxed">
              A power-user studio with live preview, four stunning templates,
              and instant PDF export. No sign-up needed.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/create"
                className="px-6 py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-zinc-100 transition-colors"
              >
                Start Building
              </Link>
              <span className="text-xs text-zinc-500">Free forever</span>
            </div>
          </GlassCard>

          {/* Features + Accent Colors — side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {/* Features — 3/5 */}
            <GlassCard
              className="sm:col-span-3 p-5"
              hoverGlow="rgba(245,158,11,0.06)"
            >
              <div className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider mb-4">
                Features
              </div>
              <div className="space-y-3.5">
                {[
                  { title: "Live Preview", desc: "See changes as you type", color: "#3b82f6" },
                  { title: "PDF Export", desc: "One-click pixel-perfect output", color: "#ef4444" },
                  { title: "Auto-Save", desc: "Never lose your progress", color: "#22c55e" },
                  { title: "Privacy First", desc: "Everything stays in-browser", color: "#8b5cf6" },
                  { title: "Custom Colors", desc: "Match your personal brand", color: "#ec4899" },
                  { title: "Zoom Controls", desc: "Inspect at any scale", color: "#f59e0b" },
                ].map((f) => (
                  <div key={f.title} className="flex items-center gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: f.color }}
                    />
                    <span className="text-sm text-zinc-300 leading-none">{f.title}</span>
                    <span className="text-[11px] text-zinc-600 leading-none hidden sm:inline">{f.desc}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Accent Colors — 2/5 */}
            <GlassCard
              className="sm:col-span-2 p-5"
              hoverGlow="rgba(236,72,153,0.06)"
            >
              <div className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider mb-4">
                Accent Colors
              </div>
              <ColorPalette />
              <p className="text-[11px] text-zinc-600 mt-4 leading-relaxed">
                Personalize every template with your brand color. Pick a preset or use any custom hex value.
              </p>
            </GlassCard>
          </div>

          {/* Bottom strip: PDF + Privacy + No sign-up */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <GlassCard className="p-5 sm:p-6 flex items-start gap-4 sm:gap-5 min-h-[100px]" hoverGlow="rgba(239,68,68,0.06)">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 mb-1.5">
                <svg className="w-[18px] h-[18px] text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <div className="min-w-0 pt-0.5">
                <div className="text-white text-sm font-semibold leading-tight">PDF Export</div>
                <div className="text-zinc-500 text-xs mt-1 leading-relaxed">Pixel-perfect output</div>
              </div>
            </GlassCard>

            <GlassCard className="p-5 sm:p-6 flex items-start gap-4 sm:gap-5 min-h-[100px]" hoverGlow="rgba(99,102,241,0.06)">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 mb-1.5">
                <svg className="w-[18px] h-[18px] text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div className="min-w-0 pt-0.5">
                <div className="text-white text-sm font-semibold leading-tight">100% Private</div>
                <div className="text-zinc-500 text-xs mt-1 leading-relaxed">No servers, no tracking</div>
              </div>
            </GlassCard>

            <GlassCard className="p-5 sm:p-6 flex items-start gap-4 sm:gap-5 min-h-[100px]" hoverGlow="rgba(34,197,94,0.06)">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0 mb-1.5">
                <svg className="w-[18px] h-[18px] text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <div className="min-w-0 pt-0.5">
                <div className="text-white text-sm font-semibold leading-tight">No Sign-up</div>
                <div className="text-zinc-500 text-xs mt-1 leading-relaxed">Start building instantly</div>
              </div>
            </GlassCard>
          </div>

          {/* CTA */}
          <GlassCard
            className="p-6 md:p-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
            hoverGlow="rgba(99,102,241,0.04)"
          >
            <div className="max-w-[30rem]">
              <h2 className="text-lg md:text-xl font-black leading-tight">
                Ready to create your resume?
              </h2>
              <p className="text-zinc-500 text-sm mt-1.5 leading-relaxed mb-2">
                Open the studio and start building in seconds.
              </p>
            </div>
            <Link
              href="/create"
              className="inline-flex px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold hover:opacity-90 transition-opacity items-center gap-2 whitespace-nowrap self-start sm:self-auto"
            >
              Launch Studio
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </GlassCard>
        </div>

        {/* ===== RIGHT COLUMN ===== */}
        <div className="md:col-span-4 flex flex-col gap-3">
          {/* Resume Preview */}
          <GlassCard
            className="p-6 flex items-center justify-center"
            hoverGlow="rgba(139,92,246,0.06)"
          >
            <div className="transform hover:scale-105 transition-transform duration-500 hover:-rotate-1">
              <MiniResume />
            </div>
          </GlassCard>

          {/* Templates */}
          <GlassCard className="p-4" hoverGlow="rgba(6,182,212,0.06)">
            <div className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider mb-3">
              Templates
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: "Executive", color: "#6366f1" },
                { name: "Modern", color: "#06b6d4" },
                { name: "Minimal", color: "#22c55e" },
                { name: "Bold", color: "#f59e0b" },
              ].map((t) => (
                <div
                  key={t.name}
                  className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-2 hover:bg-white/[0.06] transition-all duration-300 cursor-pointer"
                >
                  <div className="w-full aspect-[4/3] rounded bg-zinc-900 border border-white/[0.05] mb-1.5 relative overflow-hidden">
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5"
                      style={{ background: t.color }}
                    />
                    <div className="p-1.5 space-y-0.5">
                      <div
                        className="h-0.5 w-6 rounded"
                        style={{ background: `${t.color}50` }}
                      />
                      <div className="h-[1px] w-full bg-white/10" />
                      <div className="h-[1px] w-full bg-white/10" />
                      <div className="h-[1px] w-3/4 bg-white/10" />
                    </div>
                  </div>
                  <span className="text-[10px] text-zinc-500">{t.name}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* How It Works */}
          <GlassCard className="p-5 flex-1" hoverGlow="rgba(34,197,94,0.06)">
            <div className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider mb-3">
              How It Works
            </div>
            <div className="space-y-3">
              {[
                { n: "1", label: "Pick a template", desc: "Choose from four professional designs" },
                { n: "2", label: "Add your details", desc: "Fill in experience, skills, and projects" },
                { n: "3", label: "Export to PDF", desc: "Download your resume in one click" },
              ].map((s) => (
                <div key={s.n} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-md bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-indigo-400">
                    {s.n}
                  </div>
                  <div>
                    <div className="text-sm text-zinc-300 font-medium leading-tight">{s.label}</div>
                    <div className="text-[11px] text-zinc-600 leading-tight">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto mt-5 px-1 py-4 flex items-center justify-between text-xs text-zinc-600">
        <div className="flex items-center gap-2">
          <svg
            width="18"
            height="18"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="32" height="32" rx="8" fill="#09090b" />
            <rect
              x="16"
              y="8.686"
              width="10.3336"
              height="10.3336"
              rx="3"
              transform="rotate(45 16 8.686)"
              fill="#3b82f6"
            />
          </svg>
          <span>Resumely</span>
        </div>
        <span>Designed for perfectionists.</span>
      </footer>
    </div>
  );
}
