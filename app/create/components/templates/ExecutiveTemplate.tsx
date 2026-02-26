import { TemplateProps } from "@/app/create/types";
import { formatDate } from "./utils";

export default function ExecutiveTemplate({ data, accentColor }: TemplateProps) {
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
        padding: "60px 56px",
        boxSizing: "border-box",
      }}
    >
      {/* Name */}
      <div
        style={{
          textAlign: "center",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 32,
          fontWeight: 600,
          letterSpacing: 1,
          color: "#1a1a1a",
        }}
      >
        {personalInfo.fullName}
      </div>

      {/* Title */}
      {personalInfo.title && (
        <div
          style={{
            textAlign: "center",
            fontSize: 13,
            color: "#4a4a4a",
            marginTop: 4,
            letterSpacing: 0.5,
          }}
        >
          {personalInfo.title}
        </div>
      )}

      {/* Horizontal rule */}
      <div
        style={{
          height: 1,
          background: accentColor,
          margin: "16px 0",
          opacity: 0.6,
        }}
      />

      {/* Contact info */}
      {contactItems.length > 0 && (
        <div
          style={{
            textAlign: "center",
            fontSize: 10,
            color: "#4a4a4a",
            marginBottom: 24,
          }}
        >
          {contactItems.map((item, i) => (
            <span key={i}>
              {i > 0 && (
                <span style={{ margin: "0 10px", color: "#ccc" }}>|</span>
              )}
              {item}
            </span>
          ))}
        </div>
      )}

      {/* Summary */}
      {personalInfo.summary && (
        <div
          style={{
            fontSize: 11,
            color: "#4a4a4a",
            fontStyle: "italic",
            lineHeight: 1.65,
            marginBottom: 28,
            textAlign: "center",
            maxWidth: 600,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {personalInfo.summary}
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section style={{ marginBottom: 24 }}>
          <SectionHeader label="Experience" accentColor={accentColor} />
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 16 }}>
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
                <div style={{ fontSize: 10, color: "#4a4a4a" }}>
                  {formatDate(exp.startDate)} –{" "}
                  {exp.current ? "Present" : formatDate(exp.endDate)}
                </div>
              </div>
              <div
                style={{ fontSize: 11, color: "#4a4a4a", marginBottom: 4 }}
              >
                {exp.company}
              </div>
              {exp.description && (
                <div style={{ fontSize: 11, color: "#4a4a4a", marginBottom: 4 }}>
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

      {/* Education */}
      {education.length > 0 && (
        <section style={{ marginBottom: 24 }}>
          <SectionHeader label="Education" accentColor={accentColor} />
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
                <div style={{ fontSize: 10, color: "#4a4a4a" }}>
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
        <section style={{ marginBottom: 24 }}>
          <SectionHeader label="Skills" accentColor={accentColor} />
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
        <section style={{ marginBottom: 24 }}>
          <SectionHeader label="Projects" accentColor={accentColor} />
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 600, fontSize: 13 }}>
                {proj.name}
                {proj.url && (
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: 10,
                      color: accentColor,
                      marginLeft: 8,
                    }}
                  >
                    {proj.url}
                  </span>
                )}
              </div>
              {proj.description && (
                <div style={{ fontSize: 11, color: "#4a4a4a", marginBottom: 4 }}>
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
        </section>
      )}
    </div>
  );
}

function SectionHeader({
  label,
  accentColor,
}: {
  label: string;
  accentColor: string;
}) {
  return (
    <div
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 15,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: 2,
        color: "#1a1a1a",
        borderBottom: `1px solid ${accentColor}`,
        paddingBottom: 4,
        marginBottom: 14,
      }}
    >
      {label}
    </div>
  );
}
