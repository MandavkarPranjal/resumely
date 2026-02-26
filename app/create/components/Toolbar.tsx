"use client";

import { useState, useEffect, useRef } from "react";
import { Download, ZoomIn, ZoomOut, Check, Loader2 } from "lucide-react";
import { useResume } from "@/app/create/context";
import type { TemplateName } from "@/app/create/types";

const templates: { label: string; value: TemplateName }[] = [
  { label: "Executive", value: "executive" },
  { label: "Modern", value: "modern" },
  { label: "Minimal", value: "minimal" },
  { label: "Bold", value: "bold" },
];

const presetColors = [
  "#2563eb",
  "#dc2626",
  "#059669",
  "#7c3aed",
  "#d97706",
  "#0891b2",
  "#be185d",
  "#4b5563",
];

export default function Toolbar() {
  const {
    template,
    setTemplate,
    accentColor,
    setAccentColor,
    zoom,
    setZoom,
  } = useResume();

  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(e.target as Node)
      ) {
        setColorPickerOpen(false);
      }
    }
    if (colorPickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [colorPickerOpen]);

  const handleExport = () => {
    const el = document.getElementById("resume-print-area");
    if (!el || exporting) return;

    setExporting(true);

    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.left = "-99999px";
    iframe.style.top = "0";
    iframe.style.width = "816px";
    iframe.style.height = "1056px";
    document.body.appendChild(iframe);

    const doc = iframe.contentDocument;
    if (!doc) {
      cleanup();
      return;
    }

    // Collect all stylesheet links and the Google Fonts import
    const stylesheets = Array.from(document.styleSheets);
    let cssText = "";
    for (const sheet of stylesheets) {
      try {
        for (const rule of sheet.cssRules) {
          cssText += rule.cssText + "\n";
        }
      } catch {
        // External sheet – include as a link instead
        if (sheet.href) {
          cssText += `@import url("${sheet.href}");\n`;
        }
      }
    }

    // Letter size in px at 96dpi
    const pageW = 816;
    const pageH = 1056;

    doc.open();
    doc.write(`<!DOCTYPE html>
<html>
<head>
<style>
${cssText}
@page { size: letter; margin: 0; }
body { margin: 0; padding: 0; background: white; overflow: hidden; }
#resume-wrapper {
  width: ${pageW}px;
  transform-origin: top left;
}
</style>
</head>
<body><div id="resume-wrapper">${el.outerHTML}</div></body>
</html>`);
    doc.close();

    function cleanup() {
      iframe.remove();
      setExporting(false);
    }

    // Wait for fonts to load, measure content, scale to fit page, then print
    iframe.onload = () => {
      const iframeDoc = iframe.contentDocument;
      if (!iframeDoc) { cleanup(); return; }

      (iframeDoc as Document & { fonts: FontFaceSet }).fonts.ready.then(() => {
        setTimeout(() => {
          const wrapper = iframeDoc.getElementById("resume-wrapper");
          if (wrapper) {
            const contentH = wrapper.scrollHeight;
            if (contentH > pageH) {
              const scale = pageH / contentH;
              wrapper.style.transform = `scale(${scale})`;
              wrapper.style.width = `${pageW / scale}px`;
              wrapper.style.height = `${pageH}px`;
              wrapper.style.overflow = "hidden";
            }
          }
          iframe.contentWindow?.print();
          cleanup();
        }, 300);
      });
    };
  };

  return (
    <div
      className="flex h-14 shrink-0 items-center justify-between border-b px-4"
      style={{
        backgroundColor: "#18181b",
        borderColor: "#3f3f46",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-1.5">
        <span className="text-zinc-400 text-sm">◆</span>
        <span className="font-[family-name:var(--font-geist-sans)] text-sm font-semibold tracking-tight text-zinc-100">
          Resumely
        </span>
      </div>

      {/* Template tabs */}
      <div className="flex items-center gap-1">
        {templates.map((t) => (
          <button
            key={t.value}
            onClick={() => setTemplate(t.value)}
            className="relative cursor-pointer px-3 py-1.5 text-xs font-medium transition-colors"
            style={{
              color: template === t.value ? "#f4f4f5" : "#a1a1aa",
            }}
          >
            {t.label}
            {template === t.value && (
              <span
                className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Color picker */}
        <div className="relative" ref={colorPickerRef}>
          <button
            onClick={() => setColorPickerOpen(!colorPickerOpen)}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-zinc-800"
            aria-label="Change accent color"
          >
            <span
              className="block h-4 w-4 rounded-full border border-zinc-600"
              style={{ backgroundColor: accentColor }}
            />
          </button>

          {colorPickerOpen && (
            <div
              className="absolute right-0 top-full z-50 mt-2 rounded-lg border border-zinc-700 p-3 shadow-xl"
              style={{ backgroundColor: "#27272a" }}
            >
              <div className="grid grid-cols-4 gap-2">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setAccentColor(color);
                      setColorPickerOpen(false);
                    }}
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-transform hover:scale-110"
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  >
                    {accentColor === color && (
                      <Check className="h-3.5 w-3.5 text-white" />
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2 border-t border-zinc-600 pt-3">
                <label
                  htmlFor="custom-color"
                  className="text-[10px] font-medium uppercase tracking-wider text-zinc-400"
                >
                  Custom
                </label>
                <input
                  id="custom-color"
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="h-6 w-6 cursor-pointer rounded border-0 bg-transparent p-0"
                />
                <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-zinc-400">
                  {accentColor}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-1 rounded-md border border-zinc-700 bg-zinc-800/50 px-1">
          <button
            onClick={() => setZoom(Math.max(50, zoom - 10))}
            disabled={zoom <= 50}
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded text-zinc-400 transition-colors hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Zoom out"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <span className="min-w-[3ch] text-center font-[family-name:var(--font-geist-mono)] text-xs text-zinc-300">
            {zoom}%
          </span>
          <button
            onClick={() => setZoom(Math.min(150, zoom + 10))}
            disabled={zoom >= 150}
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded text-zinc-400 transition-colors hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Zoom in"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Export button */}
        <button
          onClick={handleExport}
          disabled={exporting}
          className="flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-70"
          style={{ backgroundColor: accentColor }}
        >
          {exporting ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Download className="h-3.5 w-3.5" />
          )}
          {exporting ? "Exporting…" : "Export PDF"}
        </button>
      </div>
    </div>
  );
}
