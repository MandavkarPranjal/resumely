import { TemplateProps } from "@/app/create/types";
import { formatDate } from "./utils";

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function BoldTemplate({ data, accentColor }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects } = data;

  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.website,
  ].filter(Boolean);

  return (
    <div
      style={{
        width: 816,
        minHeight: 1056,
        background: "#ffffff",
        color: "#1a1a1a",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 12,
        lineHeight: 1.5,
        boxSizing: "border-box",
      }}
    >
      {/* Top bar */}
      <div style={{ height: 8, background: accentColor }} />

      {/* Header */}
      <div style={{ padding: "36px 48px 0", display: "flex", gap: 24, alignItems: "flex-start" }}>
        {/* Profile Image */}
        {data.showProfileImage && data.profileImage && (
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 8,
              overflow: "hidden",
              flexShrink: 0,
              border: `2px solid ${accentColor}`,
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
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 32,
              fontWeight: 700,
              color: "#1a1a1a",
              lineHeight: 1.1,
            }}
          >
            {personalInfo.fullName}
          </div>
          {personalInfo.title && (
            <div
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: accentColor,
                marginTop: 4,
              }}
            >
              {personalInfo.title}
            </div>
          )}
          {contactItems.length > 0 && (
            <div style={{ fontSize: 10, color: "#888", marginTop: 8 }}>
              {contactItems.join("  ·  ")}
            </div>
          )}
          {personalInfo.summary && (
            <div
              style={{
                fontSize: 11,
                color: "#4a4a4a",
                lineHeight: 1.65,
                marginTop: 16,
                maxWidth: 620,
              }}
            >
              {personalInfo.summary}
            </div>
          )}
        </div>
      </div>

      {/* Two-column body */}
      <div
        style={{
          display: "flex",
          padding: "28px 48px 48px",
          gap: 36,
          boxSizing: "border-box",
        }}
      >
        {/* Left column - Experience */}
        <div style={{ flex: "1 1 60%" }}>
          {experience.length > 0 && (
            <section>
              <BoldSectionHeader label="Experience" accentColor={accentColor} />
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 4,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 700,
                        fontSize: 14,
                        color: "#1a1a1a",
                      }}
                    >
                      {exp.position}
                    </div>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 600,
                        color: "#fff",
                        background: accentColor,
                        padding: "2px 8px",
                        borderRadius: 3,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatDate(exp.startDate)} –{" "}
                      {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#4a4a4a",
                      marginBottom: 4,
                    }}
                  >
                    {exp.company}
                  </div>
                  {exp.description && (
                    <div
                      style={{
                        fontSize: 11,
                        color: "#4a4a4a",
                        marginBottom: 4,
                      }}
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
            </section>
          )}
        </div>

        {/* Right column - Skills, Education, Projects */}
        <div style={{ flex: "1 1 40%", minWidth: 0 }}>
          {/* Skills */}
          {skills.length > 0 && (
            <section style={{ marginBottom: 24 }}>
              <BoldSectionHeader label="Skills" accentColor={accentColor} />
              {skills.map((group) => (
                <div key={group.id} style={{ marginBottom: 10 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#1a1a1a",
                      marginBottom: 4,
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
                          padding: "2px 8px",
                          borderRadius: 3,
                          background: hexToRgba(accentColor, 0.1),
                          color: "#1a1a1a",
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section style={{ marginBottom: 24 }}>
              <BoldSectionHeader label="Education" accentColor={accentColor} />
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: 12 }}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 700,
                      fontSize: 12,
                      color: "#1a1a1a",
                    }}
                  >
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
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section style={{ marginBottom: 24 }}>
              <BoldSectionHeader label="Projects" accentColor={accentColor} />
              {projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: 14 }}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 700,
                      fontSize: 12,
                      color: "#1a1a1a",
                    }}
                  >
                    {proj.name}
                  </div>
                  {proj.url && (
                    <div
                      style={{
                        fontSize: 9,
                        color: accentColor,
                        marginBottom: 2,
                      }}
                    >
                      {proj.url}
                    </div>
                  )}
                  {proj.description && (
                    <div
                      style={{
                        fontSize: 11,
                        color: "#4a4a4a",
                        marginTop: 2,
                      }}
                    >
                      {proj.description}
                    </div>
                  )}
                  {proj.highlights.length > 0 && (
                    <ul
                      style={{
                        margin: "4px 0 0 0",
                        paddingLeft: 14,
                        fontSize: 10,
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
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function BoldSectionHeader({
  label,
  accentColor,
}: {
  label: string;
  accentColor: string;
}) {
  return (
    <div
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 15,
        fontWeight: 700,
        color: "#1a1a1a",
        paddingLeft: 12,
        borderLeft: `3px solid ${accentColor}`,
        marginBottom: 14,
      }}
    >
      {label}
    </div>
  );
}
