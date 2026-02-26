"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import type {
  ResumeData,
  TemplateName,
  EditorSection,
  Experience,
  Education,
  SkillGroup,
  Project,
  PersonalInfo,
} from "./types";
import { defaultResumeData, createId } from "./default-data";

const STORAGE_KEY = "resumely-data";
const SETTINGS_KEY = "resumely-settings";
const IMAGE_KEY = "resumely-profile-image";

interface Settings {
  template: TemplateName;
  accentColor: string;
}

function loadFromStorage(): { data: ResumeData; settings: Settings } {
  if (typeof window === "undefined")
    return {
      data: defaultResumeData,
      settings: { template: "executive", accentColor: "#2563eb" },
    };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const settingsRaw = localStorage.getItem(SETTINGS_KEY);
    const image = localStorage.getItem(IMAGE_KEY) || "";

    const data = raw
      ? {
          ...defaultResumeData,
          ...JSON.parse(raw),
          profileImage: image,
        }
      : { ...defaultResumeData, profileImage: image };

    // Ensure new fields exist on old saved data
    if (data.showProfileImage === undefined) data.showProfileImage = false;
    if (data.profileImage === undefined) data.profileImage = "";

    const settings = settingsRaw
      ? JSON.parse(settingsRaw)
      : { template: "executive", accentColor: "#2563eb" };

    return { data, settings };
  } catch {
    return {
      data: defaultResumeData,
      settings: { template: "executive", accentColor: "#2563eb" },
    };
  }
}

interface ResumeContextType {
  data: ResumeData;
  template: TemplateName;
  accentColor: string;
  activeSection: EditorSection;
  zoom: number;
  setTemplate: (t: TemplateName) => void;
  setAccentColor: (c: string) => void;
  setActiveSection: (s: EditorSection) => void;
  setZoom: (z: number) => void;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  setProfileImage: (dataUrl: string) => void;
  toggleProfileImage: () => void;
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addExperienceHighlight: (expId: string) => void;
  updateExperienceHighlight: (
    expId: string,
    index: number,
    value: string
  ) => void;
  removeExperienceHighlight: (expId: string, index: number) => void;
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkillGroup: () => void;
  updateSkillGroup: (id: string, data: Partial<SkillGroup>) => void;
  removeSkillGroup: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  removeProject: (id: string) => void;
  addProjectHighlight: (projId: string) => void;
  updateProjectHighlight: (
    projId: string,
    index: number,
    value: string
  ) => void;
  removeProjectHighlight: (projId: string, index: number) => void;
}

const ResumeContext = createContext<ResumeContextType | null>(null);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [data, setData] = useState<ResumeData>(defaultResumeData);
  const [template, setTemplateState] = useState<TemplateName>("executive");
  const [accentColor, setAccentColorState] = useState("#2563eb");
  const [activeSection, setActiveSection] = useState<EditorSection>("personal");
  const [zoom, setZoom] = useState(100);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const { data: saved, settings } = loadFromStorage();
    setData(saved);
    setTemplateState(settings.template);
    setAccentColorState(settings.accentColor);
    setHydrated(true);
  }, []);

  // Persist data to localStorage (debounced)
  const saveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => {
    if (!hydrated) return;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      // Save data without profileImage (image goes in its own key)
      const { profileImage, ...rest } = data;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
      // Save image separately to avoid JSON size issues
      if (profileImage) {
        localStorage.setItem(IMAGE_KEY, profileImage);
      } else {
        localStorage.removeItem(IMAGE_KEY);
      }
    }, 400);
    return () => clearTimeout(saveTimer.current);
  }, [data, hydrated]);

  // Persist settings
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify({ template, accentColor })
    );
  }, [template, accentColor, hydrated]);

  const setTemplate = useCallback((t: TemplateName) => setTemplateState(t), []);
  const setAccentColor = useCallback(
    (c: string) => setAccentColorState(c),
    []
  );

  const updatePersonalInfo = useCallback((info: Partial<PersonalInfo>) => {
    setData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  }, []);

  const setProfileImage = useCallback((dataUrl: string) => {
    setData((prev) => ({ ...prev, profileImage: dataUrl }));
  }, []);

  const toggleProfileImage = useCallback(() => {
    setData((prev) => ({
      ...prev,
      showProfileImage: !prev.showProfileImage,
    }));
  }, []);

  const addExperience = useCallback(() => {
    setData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: createId("exp"),
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
          highlights: [],
        },
      ],
    }));
  }, []);

  const updateExperience = useCallback(
    (id: string, update: Partial<Experience>) => {
      setData((prev) => ({
        ...prev,
        experience: prev.experience.map((e) =>
          e.id === id ? { ...e, ...update } : e
        ),
      }));
    },
    []
  );

  const removeExperience = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }));
  }, []);

  const addExperienceHighlight = useCallback((expId: string) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) =>
        e.id === expId ? { ...e, highlights: [...e.highlights, ""] } : e
      ),
    }));
  }, []);

  const updateExperienceHighlight = useCallback(
    (expId: string, index: number, value: string) => {
      setData((prev) => ({
        ...prev,
        experience: prev.experience.map((e) =>
          e.id === expId
            ? {
                ...e,
                highlights: e.highlights.map((h, i) =>
                  i === index ? value : h
                ),
              }
            : e
        ),
      }));
    },
    []
  );

  const removeExperienceHighlight = useCallback(
    (expId: string, index: number) => {
      setData((prev) => ({
        ...prev,
        experience: prev.experience.map((e) =>
          e.id === expId
            ? { ...e, highlights: e.highlights.filter((_, i) => i !== index) }
            : e
        ),
      }));
    },
    []
  );

  const addEducation = useCallback(() => {
    setData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: createId("edu"),
          institution: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
          gpa: "",
        },
      ],
    }));
  }, []);

  const updateEducation = useCallback(
    (id: string, update: Partial<Education>) => {
      setData((prev) => ({
        ...prev,
        education: prev.education.map((e) =>
          e.id === id ? { ...e, ...update } : e
        ),
      }));
    },
    []
  );

  const removeEducation = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  }, []);

  const addSkillGroup = useCallback(() => {
    setData((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          id: createId("sk"),
          category: "",
          items: [],
        },
      ],
    }));
  }, []);

  const updateSkillGroup = useCallback(
    (id: string, update: Partial<SkillGroup>) => {
      setData((prev) => ({
        ...prev,
        skills: prev.skills.map((s) =>
          s.id === id ? { ...s, ...update } : s
        ),
      }));
    },
    []
  );

  const removeSkillGroup = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  }, []);

  const addProject = useCallback(() => {
    setData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: createId("proj"),
          name: "",
          description: "",
          url: "",
          highlights: [],
        },
      ],
    }));
  }, []);

  const updateProject = useCallback(
    (id: string, update: Partial<Project>) => {
      setData((prev) => ({
        ...prev,
        projects: prev.projects.map((p) =>
          p.id === id ? { ...p, ...update } : p
        ),
      }));
    },
    []
  );

  const removeProject = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  }, []);

  const addProjectHighlight = useCallback((projId: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === projId ? { ...p, highlights: [...p.highlights, ""] } : p
      ),
    }));
  }, []);

  const updateProjectHighlight = useCallback(
    (projId: string, index: number, value: string) => {
      setData((prev) => ({
        ...prev,
        projects: prev.projects.map((p) =>
          p.id === projId
            ? {
                ...p,
                highlights: p.highlights.map((h, i) =>
                  i === index ? value : h
                ),
              }
            : p
        ),
      }));
    },
    []
  );

  const removeProjectHighlight = useCallback(
    (projId: string, index: number) => {
      setData((prev) => ({
        ...prev,
        projects: prev.projects.map((p) =>
          p.id === projId
            ? { ...p, highlights: p.highlights.filter((_, i) => i !== index) }
            : p
        ),
      }));
    },
    []
  );

  return (
    <ResumeContext.Provider
      value={{
        data,
        template,
        accentColor,
        activeSection,
        zoom,
        setTemplate,
        setAccentColor,
        setActiveSection,
        setZoom,
        updatePersonalInfo,
        setProfileImage,
        toggleProfileImage,
        addExperience,
        updateExperience,
        removeExperience,
        addExperienceHighlight,
        updateExperienceHighlight,
        removeExperienceHighlight,
        addEducation,
        updateEducation,
        removeEducation,
        addSkillGroup,
        updateSkillGroup,
        removeSkillGroup,
        addProject,
        updateProject,
        removeProject,
        addProjectHighlight,
        updateProjectHighlight,
        removeProjectHighlight,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used within ResumeProvider");
  return ctx;
}
