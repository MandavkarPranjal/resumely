"use client";

import { useState } from "react";
import {
  FolderOpen,
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

export default function ProjectsSection() {
  const {
    data,
    addProject,
    updateProject,
    removeProject,
    addProjectHighlight,
    updateProjectHighlight,
    removeProjectHighlight,
  } = useResume();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(data.projects.map((p) => p.id))
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
          <FolderOpen className="w-4 h-4 text-zinc-300" />
        </div>
        <h2 className="text-sm font-semibold text-zinc-100 uppercase tracking-wider">
          Projects
        </h2>
        <span className="ml-auto text-xs text-zinc-500">
          {data.projects.length} {data.projects.length === 1 ? "project" : "projects"}
        </span>
      </div>

      {data.projects.map((proj) => {
        const isExpanded = expandedIds.has(proj.id);
        return (
          <div
            key={proj.id}
            className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 space-y-3"
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleExpanded(proj.id)}
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
                onClick={() => toggleExpanded(proj.id)}
              >
                <p className="text-sm text-zinc-100 truncate">
                  {proj.name || "New Project"}
                </p>
                {!isExpanded && proj.url && (
                  <p className="text-xs text-zinc-500 mt-0.5 truncate">
                    {proj.url}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeProject(proj.id)}
                className="p-1.5 text-zinc-600 hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {isExpanded && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Project Name</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Project name"
                      value={proj.name}
                      onChange={(e) =>
                        updateProject(proj.id, { name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>URL</label>
                    <input
                      type="url"
                      className={inputClass}
                      placeholder="https://github.com/..."
                      value={proj.url}
                      onChange={(e) =>
                        updateProject(proj.id, { url: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Description</label>
                  <textarea
                    className={`${inputClass} min-h-[80px] resize-y`}
                    placeholder="What does this project do?"
                    value={proj.description}
                    onChange={(e) =>
                      updateProject(proj.id, { description: e.target.value })
                    }
                    rows={3}
                  />
                </div>

                <div>
                  <label className={labelClass}>Highlights</label>
                  <div className="space-y-2">
                    {proj.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          className={inputClass}
                          placeholder="Key feature or technology used..."
                          value={highlight}
                          onChange={(e) =>
                            updateProjectHighlight(
                              proj.id,
                              index,
                              e.target.value
                            )
                          }
                        />
                        <button
                          type="button"
                          onClick={() => removeProjectHighlight(proj.id, index)}
                          className="p-1.5 text-zinc-600 hover:text-red-400 transition-colors shrink-0"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addProjectHighlight(proj.id)}
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
        onClick={addProject}
        className="flex items-center gap-2 w-full justify-center py-2.5 border border-dashed border-zinc-700 rounded-xl text-zinc-500 hover:text-zinc-300 hover:border-zinc-500 transition-colors text-sm"
      >
        <Plus className="w-4 h-4" />
        Add Project
      </button>
    </div>
  );
}
