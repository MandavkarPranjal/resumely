"use client";

import { useState } from "react";
import {
  GraduationCap,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useResume } from "@/app/create/context";

const inputClass =
  "w-full bg-zinc-900 border border-zinc-700/50 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors";
const labelClass =
  "block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider";

export default function EducationSection() {
  const { data, addEducation, updateEducation, removeEducation } = useResume();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(data.education.map((e) => e.id))
  );

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="section-enter space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-zinc-800">
          <GraduationCap className="w-4 h-4 text-zinc-300" />
        </div>
        <h2 className="text-sm font-semibold text-zinc-100 uppercase tracking-wider">
          Education
        </h2>
        <span className="ml-auto text-xs text-zinc-500">
          {data.education.length} {data.education.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      {data.education.map((edu) => {
        const isExpanded = expandedIds.has(edu.id);
        return (
          <div
            key={edu.id}
            className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 space-y-3"
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleExpanded(edu.id)}
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
                onClick={() => toggleExpanded(edu.id)}
              >
                <p className="text-sm text-zinc-100 truncate">
                  {edu.degree || edu.institution
                    ? `${edu.degree}${edu.degree && edu.institution ? " — " : ""}${edu.institution}`
                    : "New Education"}
                </p>
                {!isExpanded && edu.field && (
                  <p className="text-xs text-zinc-500 mt-0.5">{edu.field}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeEducation(edu.id)}
                className="p-1.5 text-zinc-600 hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {isExpanded && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Institution</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="University name"
                      value={edu.institution}
                      onChange={(e) =>
                        updateEducation(edu.id, {
                          institution: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Degree</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Bachelor of Science"
                      value={edu.degree}
                      onChange={(e) =>
                        updateEducation(edu.id, { degree: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Field of Study</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Computer Science"
                      value={edu.field}
                      onChange={(e) =>
                        updateEducation(edu.id, { field: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>GPA</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="3.8 / 4.0"
                      value={edu.gpa}
                      onChange={(e) =>
                        updateEducation(edu.id, { gpa: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Start Date</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Sep 2018"
                      value={edu.startDate}
                      onChange={(e) =>
                        updateEducation(edu.id, { startDate: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>End Date</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Jun 2022"
                      value={edu.endDate}
                      onChange={(e) =>
                        updateEducation(edu.id, { endDate: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <button
        type="button"
        onClick={addEducation}
        className="flex items-center gap-2 w-full justify-center py-2.5 border border-dashed border-zinc-700 rounded-xl text-zinc-500 hover:text-zinc-300 hover:border-zinc-500 transition-colors text-sm"
      >
        <Plus className="w-4 h-4" />
        Add Education
      </button>
    </div>
  );
}
