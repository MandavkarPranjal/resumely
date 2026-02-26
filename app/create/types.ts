export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  highlights: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface SkillGroup {
  id: string;
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  highlights: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: SkillGroup[];
  projects: Project[];
  profileImage: string;
  showProfileImage: boolean;
}

export type TemplateName = "executive" | "modern" | "minimal" | "bold";

export type EditorSection =
  | "personal"
  | "experience"
  | "education"
  | "skills"
  | "projects";

export interface TemplateProps {
  data: ResumeData;
  accentColor: string;
}
