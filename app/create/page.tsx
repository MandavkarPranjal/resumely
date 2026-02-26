import { ResumeProvider } from "./context";
import Studio from "./components/Studio";

export default function CreatePage() {
  return (
    <ResumeProvider>
      <Studio />
    </ResumeProvider>
  );
}
