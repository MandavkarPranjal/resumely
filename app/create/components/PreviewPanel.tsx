"use client";

import { useResume } from "@/app/create/context";
import ExecutiveTemplate from "./templates/ExecutiveTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import BoldTemplate from "./templates/BoldTemplate";
import type { TemplateName } from "@/app/create/types";
import type { ComponentType } from "react";
import type { TemplateProps } from "@/app/create/types";

const templateComponents: Record<TemplateName, ComponentType<TemplateProps>> = {
  executive: ExecutiveTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  bold: BoldTemplate,
};

export default function PreviewPanel() {
  const { data, template, accentColor, zoom } = useResume();

  const ActiveTemplate = templateComponents[template];

  return (
    <div
      className="relative z-10 flex-1 overflow-auto"
      style={{
        backgroundColor: "#0f0f11",
        backgroundImage:
          "radial-gradient(circle, #27272a 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="flex min-h-full justify-center py-10">
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
          }}
        >
          <div
            id="resume-print-area"
            className="resume-page print-only template-fade"
            key={template}
          >
            <ActiveTemplate data={data} accentColor={accentColor} />
          </div>
        </div>
      </div>
    </div>
  );
}
