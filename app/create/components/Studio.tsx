"use client";

import Toolbar from "./Toolbar";
import EditorPanel from "./EditorPanel";
import PreviewPanel from "./PreviewPanel";

export default function Studio() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        <EditorPanel />
        <PreviewPanel />
      </div>
    </div>
  );
}
