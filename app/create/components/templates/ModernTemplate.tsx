import { TemplateProps } from "@/app/create/types";
import { formatDate } from "./utils";

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function ModernTemplate({ data, accentColor }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects } = data;

  const contactItems = [
    { icon: "✉", value: personalInfo.email },
    { icon: "☎", value: personalInfo.phone },
    { icon: "◎", value: personalInfo.location },
    { icon: "◆", value: personalInfo.website },
  ].filter((c) => c.value);

  return (
    <div
      style={{
        width: 816,
        minHeight: 1056,
        background: "#ffffff",
        color: "#1a1a1a",
        fontFamily: "'Outfit', sans-serif",
        fontSize: 12,
        lineHeight: 1.5,
        display: "flex",
        boxSizing: "border-box",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "30%",
          background: hexToRgba(accentColor, 0.07),
          padding: "48px 24px",
          boxSizing: "border-box",
        }}
      >
        {/* Profile Image */}
        {data.showProfileImage && data.profileImage && (
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              overflow: "hidden",
              marginBottom: 16,
              border: `3px solid ${accentColor}`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.profileImage}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}

        {/* Name */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            lineHeight: 1.2,
            color: "#1a1a1a",
            marginBottom: 4,
          }}
        >
          {personalInfo.fullName}
        </div>

        {/* Title */}
        {personalInfo.title && (
          <div
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: accentColor,
              marginBottom: 24,
            }}
          >
            {personalInfo.title}
          </div>
        )}

        {/* Contact */}
        {contactItems.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <SidebarHeader label="Contact" accentColor={accentColor} />
            {contactItems.map((c, i) => (
              <div
                key={i}
                style={{
                  fontSize: 10,
                  color: "#4a4a4a",
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ color: accentColor, fontSize: 11 }}>
                  {c.icon}
                </span>
                <span style={{ wordBreak: "break-all" }}>{c.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <SidebarHeader label="Skills" accentColor={accentColor} />
            {skills.map((group) => (
              <div key={group.id} style={{ marginBottom: 12 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    marginBottom: 6,
                    color: "#1a1a1a",
                  }}
                >
                  {group.category}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {group.items.map((item, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: 9,
                        padding: "3px 8px",
                        borderRadius: 999,
                        background: hexToRgba(accentColor, 0.12),
                        color: "#1a1a1a",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <SidebarHeader label="Education" accentColor={accentColor} />
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#1a1a1a" }}>
                  {edu.degree}
                  {edu.field && ` in ${edu.field}`}
                </div>
                <div style={{ fontSize: 10, color: "#4a4a4a" }}>
                  {edu.institution}
                </div>
                <div style={{ fontSize: 9, color: "#888" }}>
                  {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                  {edu.gpa && ` · GPA: ${edu.gpa}`}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main content */}
      <div
        style={{
          width: "70%",
          padding: "48px 36px",
          boxSizing: "border-box",
        }}
      >
        {/* Summary */}
        {personalInfo.summary && (
          <div style={{ marginBottom: 28 }}>
            <MainHeader label="About" accentColor={accentColor} />
            <div style={{ fontSize: 11, color: "#4a4a4a", lineHeight: 1.65 }}>
              {personalInfo.summary}
            </div>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <MainHeader label="Experience" accentColor={accentColor} />
            {experience.map((exp) => (
              <div
                key={exp.id}
                style={{
                  marginBottom: 18,
                  padding: "12px 14px",
                  borderRadius: 6,
                  background: "#fafafa",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: 13, color: "#1a1a1a" }}>
                    {exp.position}
                  </div>
                  <div style={{ fontSize: 10, color: "#888" }}>
                    {formatDate(exp.startDate)} –{" "}
                    {exp.current ? "Present" : formatDate(exp.endDate)}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: accentColor,
                    fontWeight: 500,
                    marginBottom: 6,
                  }}
                >
                  {exp.company}
                </div>
                {exp.description && (
                  <div
                    style={{ fontSize: 11, color: "#4a4a4a", marginBottom: 4 }}
                  >
                    {exp.description}
                  </div>
                )}
                {exp.highlights.length > 0 && (
                  <ul
                    style={{
                      margin: "4px 0 0 0",
                      paddingLeft: 16,
                      fontSize: 11,
                      color: "#4a4a4a",
                    }}
                  >
                    {exp.highlights.map((h, i) => (
                      <li key={i} style={{ marginBottom: 2 }}>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <MainHeader label="Projects" accentColor={accentColor} />
            {projects.map((proj) => (
              <div
                key={proj.id}
                style={{
                  marginBottom: 14,
                  padding: "12px 14px",
                  borderRadius: 6,
                  background: "#fafafa",
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 12, color: "#1a1a1a" }}>
                  {proj.name}
                  {proj.url && (
                    <span
                      style={{
                        fontWeight: 400,
                        fontSize: 9,
                        color: accentColor,
                        marginLeft: 8,
                      }}
                    >
                      {proj.url}
                    </span>
                  )}
                </div>
                {proj.description && (
                  <div
                    style={{ fontSize: 11, color: "#4a4a4a", marginTop: 4 }}
                  >
                    {proj.description}
                  </div>
                )}
                {proj.highlights.length > 0 && (
                  <ul
                    style={{
                      margin: "4px 0 0 0",
                      paddingLeft: 16,
                      fontSize: 11,
                      color: "#4a4a4a",
                    }}
                  >
                    {proj.highlights.map((h, i) => (
                      <li key={i} style={{ marginBottom: 2 }}>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SidebarHeader({
  label,
  accentColor,
}: {
  label: string;
  accentColor: string;
}) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: 1.5,
        color: accentColor,
        marginBottom: 10,
      }}
    >
      {label}
    </div>
  );
}

function MainHeader({
  label,
  accentColor,
}: {
  label: string;
  accentColor: string;
}) {
  return (
    <div
      style={{
        fontSize: 15,
        fontWeight: 700,
        color: accentColor,
        marginBottom: 12,
      }}
    >
      {label}
    </div>
  );
}
