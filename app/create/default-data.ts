import type { ResumeData } from "./types";

export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "Jordan Mitchell",
    title: "Senior Software Engineer",
    email: "jordan@mitchell.dev",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    website: "mitchell.dev",
    summary:
      "Experienced software engineer with 8+ years building scalable web applications and distributed systems. Passionate about developer experience, performance optimization, and mentoring engineering teams.",
  },
  experience: [
    {
      id: "exp-1",
      company: "Vercel",
      position: "Senior Software Engineer",
      startDate: "2022-03",
      endDate: "",
      current: true,
      description:
        "Leading frontend infrastructure initiatives and contributing to the Next.js framework.",
      highlights: [
        "Architected a new incremental build system reducing deploy times by 60%",
        "Led migration of internal tools to Next.js App Router, improving DX across 12 teams",
        "Mentored 4 junior engineers through structured growth programs",
      ],
    },
    {
      id: "exp-2",
      company: "Stripe",
      position: "Software Engineer",
      startDate: "2019-06",
      endDate: "2022-02",
      current: false,
      description:
        "Built and maintained payment processing infrastructure serving millions of transactions.",
      highlights: [
        "Designed real-time fraud detection pipeline processing 10K+ events/second",
        "Reduced API latency by 35% through strategic caching and query optimization",
        "Shipped Stripe Terminal SDK used by 50K+ merchants globally",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      institution: "Stanford University",
      degree: "M.S.",
      field: "Computer Science",
      startDate: "2017",
      endDate: "2019",
      gpa: "3.9",
    },
    {
      id: "edu-2",
      institution: "UC Berkeley",
      degree: "B.S.",
      field: "Electrical Engineering & Computer Science",
      startDate: "2013",
      endDate: "2017",
      gpa: "3.7",
    },
  ],
  skills: [
    {
      id: "sk-1",
      category: "Languages",
      items: ["TypeScript", "Python", "Rust", "Go", "SQL"],
    },
    {
      id: "sk-2",
      category: "Frameworks",
      items: ["React", "Next.js", "Node.js", "FastAPI", "TailwindCSS"],
    },
    {
      id: "sk-3",
      category: "Infrastructure",
      items: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "DevMetrics",
      description:
        "Open-source developer productivity dashboard with GitHub and Linear integrations.",
      url: "github.com/jmitchell/devmetrics",
      highlights: [
        "2.5K+ GitHub stars, featured in JavaScript Weekly",
        "Built with Next.js, tRPC, and Drizzle ORM",
      ],
    },
  ],
  profileImage: "",
  showProfileImage: false,
};

export function createId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
