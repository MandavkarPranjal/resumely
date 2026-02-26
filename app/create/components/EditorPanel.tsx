"use client";

import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderOpen,
} from "lucide-react";
import { useResume } from "@/app/create/context";
import type { EditorSection } from "@/app/create/types";
import PersonalInfoSection from "./sections/PersonalInfoSection";
import ExperienceSection from "./sections/ExperienceSection";
import EducationSection from "./sections/EducationSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";

const sections: {
  key: EditorSection;
  label: string;
  icon: typeof User;
}[] = [
  { key: "personal", label: "Personal", icon: User },
  { key: "experience", label: "Experience", icon: Briefcase },
  { key: "education", label: "Education", icon: GraduationCap },
  { key: "skills", label: "Skills", icon: Wrench },
  { key: "projects", label: "Projects", icon: FolderOpen },
];

const sectionComponents: Record<EditorSection, React.ComponentType> = {
  personal: PersonalInfoSection,
  experience: ExperienceSection,
  education: EducationSection,
  skills: SkillsSection,
  projects: ProjectsSection,
};

export default function EditorPanel() {
  const { activeSection, setActiveSection, accentColor } = useResume();
  const ActiveComponent = sectionComponents[activeSection];

  return (
    <div className="no-print flex h-full w-[440px] shrink-0 flex-col border-r border-zinc-800 bg-[#0c0c0e]">
      {/* Section tabs */}
      <div className="flex shrink-0 border-b border-zinc-800">
        {sections.map(({ key, label, icon: Icon }) => {
          const isActive = activeSection === key;
          return (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className="relative flex flex-1 cursor-pointer flex-col items-center gap-1 py-3 transition-colors"
              style={{
                color: isActive ? "#fafafa" : "#71717a",
              }}
            >
              <Icon className="h-4 w-4" />
              <span className="text-[10px] font-medium uppercase tracking-wider">
                {label}
              </span>
              {isActive && (
                <span
                  className="absolute bottom-0 left-1/4 right-1/4 h-0.5 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Active section content */}
      <div className="flex-1 overflow-y-auto p-5">
        <ActiveComponent key={activeSection} />
      </div>
    </div>
  );
}
