import { TemplateProps } from "@/app/create/types";
import { formatDate } from "./utils";

export default function MinimalTemplate({ data, accentColor }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects } = data;

  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.website,
  ].filter(Boolean);

  const bulletStyle: React.CSSProperties = {
    width: 5,
    height: 5,
    background: accentColor,
    display: "inline-block",
    marginRight: 8,
    flexShrink: 0,
    marginTop: 6,
  };

  return (
    <div
      style={{
        width: 816,
        minHeight: 1056,
        background: "#ffffff",
        color: "#1a1a1a",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 12,
        lineHeight: 1.55,
        padding: "56px 56px",
        boxSizing: "border-box",
      }}
    >
      {/* Name */}
      <div
        style={{
          fontSize: 26,
          fontWeight: 500,
          color: "#1a1a1a",
          letterSpacing: -0.5,
        }}
      >
        {personalInfo.fullName}
      </div>

      {/* Title */}
      {personalInfo.title && (
        <div
          style={{
            fontSize: 12,
            color: "#4a4a4a",
            marginTop: 2,
            fontWeight: 400,
          }}
        >
          {personalInfo.title}
        </div>
      )}

      {/* Contact */}
      {contactItems.length > 0 && (
        <div
          style={{
            fontSize: 10,
            color: "#888",
            marginTop: 8,
          }}
        >
          {contactItems.join("  ·  ")}
        </div>
      )}

      {/* Summary */}
      {personalInfo.summary && (
        <div
          style={{
            fontSize: 11,
            color: "#4a4a4a",
            lineHeight: 1.65,
            marginTop: 28,
          }}
        >
          {personalInfo.summary}
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section style={{ marginTop: 32 }}>
          <SectionTitle label="Experience" accentColor={accentColor} />
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 18 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 13 }}>
                  {exp.position}
                </div>
                <div style={{ fontSize: 10, color: "#888" }}>
                  {formatDate(exp.startDate)} –{" "}
                  {exp.current ? "Present" : formatDate(exp.endDate)}
                </div>
              </div>
              <div style={{ fontSize: 11, color: "#4a4a4a", marginBottom: 4 }}>
                {exp.company}
              </div>
              {exp.description && (
                <div style={{ fontSize: 11, color: "#4a4a4a", marginBottom: 4 }}>
                  {exp.description}
                </div>
              )}
              {exp.highlights.length > 0 && (
                <div style={{ marginTop: 4 }}>
                  {exp.highlights.map((h, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        marginBottom: 3,
                        fontSize: 11,
                        color: "#4a4a4a",
                      }}
                    >
                      <span style={bulletStyle} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section style={{ marginTop: 32 }}>
          <SectionTitle label="Education" accentColor={accentColor} />
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: 12 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 13 }}>
                  {edu.institution}
                </div>
                <div style={{ fontSize: 10, color: "#888" }}>
                  {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                </div>
              </div>
              <div style={{ fontSize: 11, color: "#4a4a4a" }}>
                {edu.degree}
                {edu.field && ` in ${edu.field}`}
                {edu.gpa && ` · GPA: ${edu.gpa}`}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section style={{ marginTop: 32 }}>
          <SectionTitle label="Skills" accentColor={accentColor} />
          {skills.map((group) => (
            <div key={group.id} style={{ marginBottom: 6 }}>
              <span style={{ fontWeight: 600, fontSize: 11 }}>
                {group.category}:{" "}
              </span>
              <span style={{ fontSize: 11, color: "#4a4a4a" }}>
                {group.items.join(", ")}
              </span>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section style={{ marginTop: 32 }}>
          <SectionTitle label="Projects" accentColor={accentColor} />
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: 14 }}>
              <div style={{ fontWeight: 600, fontSize: 12 }}>
                {proj.name}
                {proj.url && (
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: 10,
                      color: "#888",
                      marginLeft: 8,
                    }}
                  >
                    {proj.url}
                  </span>
                )}
              </div>
              {proj.description && (
                <div
                  style={{ fontSize: 11, color: "#4a4a4a", marginTop: 2 }}
                >
                  {proj.description}
                </div>
              )}
              {proj.highlights.length > 0 && (
                <div style={{ marginTop: 4 }}>
                  {proj.highlights.map((h, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        marginBottom: 3,
                        fontSize: 11,
                        color: "#4a4a4a",
                      }}
                    >
                      <span style={bulletStyle} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

function SectionTitle({
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
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: 3,
        color: accentColor,
        marginBottom: 14,
      }}
    >
      {label}
    </div>
  );
}
