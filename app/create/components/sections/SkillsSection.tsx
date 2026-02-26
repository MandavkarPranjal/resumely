"use client";

import { useState, type KeyboardEvent } from "react";
import { Wrench, Plus, Trash2, X } from "lucide-react";
import { useResume } from "@/app/create/context";

const inputClass =
  "w-full bg-zinc-900 border border-zinc-700/50 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors";
const labelClass =
  "block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider";

export default function SkillsSection() {
  const { data, addSkillGroup, updateSkillGroup, removeSkillGroup } =
    useResume();
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  const handleAddItem = (groupId: string) => {
    const value = (inputValues[groupId] || "").trim();
    if (!value) return;

    const group = data.skills.find((g) => g.id === groupId);
    if (!group) return;

    updateSkillGroup(groupId, { items: [...group.items, value] });
    setInputValues((prev) => ({ ...prev, [groupId]: "" }));
  };

  const handleRemoveItem = (groupId: string, index: number) => {
    const group = data.skills.find((g) => g.id === groupId);
    if (!group) return;

    updateSkillGroup(groupId, {
      items: group.items.filter((_, i) => i !== index),
    });
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    groupId: string
  ) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddItem(groupId);
    }
  };

  return (
    <div className="section-enter space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-zinc-800">
          <Wrench className="w-4 h-4 text-zinc-300" />
        </div>
        <h2 className="text-sm font-semibold text-zinc-100 uppercase tracking-wider">
          Skills
        </h2>
        <span className="ml-auto text-xs text-zinc-500">
          {data.skills.length} {data.skills.length === 1 ? "group" : "groups"}
        </span>
      </div>

      {data.skills.map((group) => (
        <div
          key={group.id}
          className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 space-y-3"
        >
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className={labelClass}>Category</label>
              <input
                type="text"
                className={inputClass}
                placeholder="e.g. Programming Languages"
                value={group.category}
                onChange={(e) =>
                  updateSkillGroup(group.id, { category: e.target.value })
                }
              />
            </div>
            <button
              type="button"
              onClick={() => removeSkillGroup(group.id)}
              className="p-1.5 text-zinc-600 hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10 mt-5"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <label className={labelClass}>Skills</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {group.items.map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800 border border-zinc-700/50 text-xs text-zinc-300"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(group.id, index)}
                    className="text-zinc-500 hover:text-red-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                className={inputClass}
                placeholder="Type a skill and press Enter or comma..."
                value={inputValues[group.id] || ""}
                onChange={(e) =>
                  setInputValues((prev) => ({
                    ...prev,
                    [group.id]: e.target.value,
                  }))
                }
                onKeyDown={(e) => handleKeyDown(e, group.id)}
              />
              <button
                type="button"
                onClick={() => handleAddItem(group.id)}
                className="px-3 py-2 bg-zinc-800 border border-zinc-700/50 rounded-lg text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addSkillGroup}
        className="flex items-center gap-2 w-full justify-center py-2.5 border border-dashed border-zinc-700 rounded-xl text-zinc-500 hover:text-zinc-300 hover:border-zinc-500 transition-colors text-sm"
      >
        <Plus className="w-4 h-4" />
        Add Skill Group
      </button>
    </div>
  );
}
