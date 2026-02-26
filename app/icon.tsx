import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090b",
          borderRadius: 8,
        }}
      >
        <div
          style={{
            width: 16,
            height: 16,
            background: "#3b82f6",
            transform: "rotate(45deg)",
            borderRadius: 3,
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
