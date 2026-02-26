"use client";

import { useRef } from "react";
import { User, Upload, Trash2, ImageIcon } from "lucide-react";
import { useResume } from "@/app/create/context";

const inputClass =
  "w-full bg-zinc-900 border border-zinc-700/50 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors";
const labelClass =
  "block text-xs font-medium text-zinc-400 mb-1.5 uppercase tracking-wider";

export default function PersonalInfoSection() {
  const {
    data,
    updatePersonalInfo,
    setProfileImage,
    toggleProfileImage,
    accentColor,
  } = useResume();
  const info = data.personalInfo;
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        // Resize to max 200px to keep localStorage small
        const max = 200;
        const scale = Math.min(max / img.width, max / img.height, 1);
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setProfileImage(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="section-enter space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-zinc-800">
          <User className="w-4 h-4 text-zinc-300" />
        </div>
        <h2 className="text-sm font-semibold text-zinc-100 uppercase tracking-wider">
          Personal Information
        </h2>
      </div>

      {/* Profile Image */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-zinc-400" />
            <span className="text-xs font-medium text-zinc-300 uppercase tracking-wider">
              Profile Photo
            </span>
          </div>
          <button
            type="button"
            onClick={toggleProfileImage}
            className="relative h-5 w-9 rounded-full transition-colors cursor-pointer"
            style={{
              backgroundColor: data.showProfileImage
                ? accentColor
                : "#3f3f46",
            }}
            aria-label="Toggle profile photo"
          >
            <span
              className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform"
              style={{
                transform: data.showProfileImage
                  ? "translateX(16px)"
                  : "translateX(0)",
              }}
            />
          </button>
        </div>

        {data.showProfileImage && (
          <div className="flex items-center gap-4 pt-1">
            {data.profileImage ? (
              <div
                className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2"
                style={{ borderColor: accentColor }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.profileImage}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-zinc-700 bg-zinc-800/50">
                <User className="h-6 w-6 text-zinc-600" />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-1.5 rounded-lg bg-zinc-800 border border-zinc-700/50 px-3 py-1.5 text-xs text-zinc-300 hover:text-zinc-100 hover:border-zinc-600 transition-colors cursor-pointer"
              >
                <Upload className="w-3 h-3" />
                {data.profileImage ? "Change Photo" : "Upload Photo"}
              </button>
              {data.profileImage && (
                <button
                  type="button"
                  onClick={() => setProfileImage("")}
                  className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  Remove
                </button>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        )}

        {data.showProfileImage && !data.profileImage && (
          <p className="text-[10px] text-zinc-500">
            Shows on Modern &amp; Bold templates. Upload a square photo for best
            results.
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Full Name</label>
          <input
            type="text"
            className={inputClass}
            placeholder="John Doe"
            value={info.fullName}
            onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass}>Title</label>
          <input
            type="text"
            className={inputClass}
            placeholder="Software Engineer"
            value={info.title}
            onChange={(e) => updatePersonalInfo({ title: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            className={inputClass}
            placeholder="john@example.com"
            value={info.email}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input
            type="tel"
            className={inputClass}
            placeholder="+1 (555) 000-0000"
            value={info.phone}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass}>Location</label>
          <input
            type="text"
            className={inputClass}
            placeholder="San Francisco, CA"
            value={info.location}
            onChange={(e) => updatePersonalInfo({ location: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass}>Website</label>
          <input
            type="url"
            className={inputClass}
            placeholder="https://johndoe.com"
            value={info.website}
            onChange={(e) => updatePersonalInfo({ website: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Professional Summary</label>
        <textarea
          className={`${inputClass} min-h-[100px] resize-y`}
          placeholder="A brief summary of your professional background and goals..."
          value={info.summary}
          onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
          rows={4}
        />
      </div>
    </div>
  );
}
