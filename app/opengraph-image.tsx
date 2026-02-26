import { ImageResponse } from "next/og";

export const alt = "Resumely — Resume Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#09090b",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background gradient accent */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -60,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            padding: "60px 80px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left side — branding */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flex: 1,
              gap: 20,
            }}
          >
            {/* Logo */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  background: "#3b82f6",
                  transform: "rotate(45deg)",
                  borderRadius: 3,
                  display: "flex",
                }}
              />
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                  color: "#a1a1aa",
                  letterSpacing: 2,
                  textTransform: "uppercase" as const,
                  display: "flex",
                }}
              >
                Resumely
              </div>
            </div>

            {/* Headline */}
            <div
              style={{
                fontSize: 64,
                fontWeight: 700,
                color: "#fafafa",
                lineHeight: 1.1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span>Resume</span>
              <span>
                Studio
                <span style={{ color: "#3b82f6" }}>.</span>
              </span>
            </div>

            {/* Tagline */}
            <div
              style={{
                fontSize: 22,
                color: "#71717a",
                lineHeight: 1.5,
                maxWidth: 420,
                display: "flex",
              }}
            >
              Create stunning resumes with multiple templates. Export to PDF
              instantly.
            </div>

            {/* Feature pills */}
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              {["4 Templates", "Live Preview", "PDF Export"].map((label) => (
                <div
                  key={label}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 999,
                    border: "1px solid #27272a",
                    color: "#a1a1aa",
                    fontSize: 14,
                    display: "flex",
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right side — resume mockup */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 360,
              height: 480,
              position: "relative",
            }}
          >
            {/* Shadow card behind */}
            <div
              style={{
                position: "absolute",
                top: 20,
                left: 30,
                width: 300,
                height: 420,
                background: "#18181b",
                borderRadius: 12,
                border: "1px solid #27272a",
                display: "flex",
              }}
            />
            {/* Main resume card */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 10,
                width: 300,
                height: 420,
                background: "#ffffff",
                borderRadius: 12,
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}
            >
              {/* Name placeholder */}
              <div
                style={{
                  width: 140,
                  height: 16,
                  background: "#1a1a1a",
                  borderRadius: 4,
                  display: "flex",
                }}
              />
              {/* Title placeholder */}
              <div
                style={{
                  width: 100,
                  height: 10,
                  background: "#3b82f6",
                  borderRadius: 3,
                  display: "flex",
                }}
              />
              {/* Divider */}
              <div
                style={{
                  width: "100%",
                  height: 1,
                  background: "#e4e4e7",
                  display: "flex",
                }}
              />
              {/* Section */}
              <div
                style={{
                  width: 80,
                  height: 8,
                  background: "#a1a1aa",
                  borderRadius: 2,
                  display: "flex",
                }}
              />
              {/* Text lines */}
              {[200, 220, 180, 210].map((w, i) => (
                <div
                  key={i}
                  style={{
                    width: w,
                    height: 6,
                    background: "#d4d4d8",
                    borderRadius: 2,
                    display: "flex",
                  }}
                />
              ))}
              {/* Section 2 */}
              <div
                style={{
                  width: 60,
                  height: 8,
                  background: "#a1a1aa",
                  borderRadius: 2,
                  marginTop: 6,
                  display: "flex",
                }}
              />
              {[190, 160, 200].map((w, i) => (
                <div
                  key={i}
                  style={{
                    width: w,
                    height: 6,
                    background: "#d4d4d8",
                    borderRadius: 2,
                    display: "flex",
                  }}
                />
              ))}
              {/* Skill pills */}
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  marginTop: 8,
                  flexWrap: "wrap",
                }}
              >
                {[50, 65, 45, 55, 40].map((w, i) => (
                  <div
                    key={i}
                    style={{
                      width: w,
                      height: 16,
                      background: "rgba(59,130,246,0.12)",
                      borderRadius: 999,
                      display: "flex",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom border accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #3b82f6, #2563eb, #1d4ed8)",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
