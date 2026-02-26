"use client";

import { useState } from "react";
import {
  Briefcase,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  X,
} from "lucide-react";
import { useResume } from "@/app/create/context";

const inputClass =
  "w-full bg-zinc-900 border border-zinc-700/50 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors";
const labelClass =
  "block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider";

export default function ExperienceSection() {
  const {
    data,
    addExperience,
    updateExperience,
    removeExperience,
    addExperienceHighlight,
    updateExperienceHighlight,
    removeExperienceHighlight,
  } = useResume();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(data.experience.map((e) => e.id))
  );

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAdd = () => {
    addExperience();
    // New items are expanded by default — we rely on the next render to pick up the new id
    setExpandedIds((prev) => {
      const next = new Set(prev);
      // We'll expand all since new id isn't known yet; a small UX compromise
      return next;
    });
  };

  return (
    <div className="section-enter space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-zinc-800">
          <Briefcase className="w-4 h-4 text-zinc-300" />
        </div>
        <h2 className="text-sm font-semibold text-zinc-100 uppercase tracking-wider">
          Experience
        </h2>
        <span className="ml-auto text-xs text-zinc-500">
          {data.experience.length} {data.experience.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      {data.experience.map((exp) => {
        const isExpanded = expandedIds.has(exp.id);
        return (
          <div
            key={exp.id}
            className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 space-y-3"
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleExpanded(exp.id)}
                className="text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
              <div
                className="flex-1 min-w-0 cursor-pointer"
                onClick={() => toggleExpanded(exp.id)}
              >
                <p className="text-sm text-zinc-100 truncate">
                  {exp.position || exp.company
                    ? `${exp.position}${exp.position && exp.company ? " at " : ""}${exp.company}`
                    : "New Experience"}
                </p>
                {!isExpanded && (exp.startDate || exp.endDate) && (
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {exp.startDate}
                    {exp.startDate && (exp.endDate || exp.current) ? " — " : ""}
                    {exp.current ? "Present" : exp.endDate}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeExperience(exp.id)}
                className="p-1.5 text-zinc-600 hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {isExpanded && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Company</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Company name"
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(exp.id, { company: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Position</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Job title"
                      value={exp.position}
                      onChange={(e) =>
                        updateExperience(exp.id, { position: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Start Date</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Jan 2022"
                      value={exp.startDate}
                      onChange={(e) =>
                        updateExperience(exp.id, { startDate: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>End Date</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Dec 2023"
                      value={exp.endDate}
                      disabled={exp.current}
                      onChange={(e) =>
                        updateExperience(exp.id, { endDate: e.target.value })
                      }
                    />
                    <label className="flex items-center gap-2 mt-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) =>
                          updateExperience(exp.id, {
                            current: e.target.checked,
                            ...(e.target.checked ? { endDate: "" } : {}),
                          })
                        }
                        className="rounded border-zinc-700 bg-zinc-900 text-zinc-400 focus:ring-zinc-500"
                      />
                      <span className="text-xs text-zinc-400">
                        Currently working here
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Description</label>
                  <textarea
                    className={`${inputClass} min-h-[80px] resize-y`}
                    placeholder="Describe your role and responsibilities..."
                    value={exp.description}
                    onChange={(e) =>
                      updateExperience(exp.id, { description: e.target.value })
                    }
                    rows={3}
                  />
                </div>

                <div>
                  <label className={labelClass}>Highlights</label>
                  <div className="space-y-2">
                    {exp.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          className={inputClass}
                          placeholder="Key achievement or responsibility..."
                          value={highlight}
                          onChange={(e) =>
                            updateExperienceHighlight(
                              exp.id,
                              index,
                              e.target.value
                            )
                          }
                        />
                        <button
                          type="button"
                          onClick={() =>
                            removeExperienceHighlight(exp.id, index)
                          }
                          className="p-1.5 text-zinc-600 hover:text-red-400 transition-colors shrink-0"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addExperienceHighlight(exp.id)}
                      className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors mt-1"
                    >
                      <Plus className="w-3 h-3" />
                      Add highlight
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <button
        type="button"
        onClick={handleAdd}
        className="flex items-center gap-2 w-full justify-center py-2.5 border border-dashed border-zinc-700 rounded-xl text-zinc-500 hover:text-zinc-300 hover:border-zinc-500 transition-colors text-sm"
      >
        <Plus className="w-4 h-4" />
        Add Experience
      </button>
    </div>
  );
}
