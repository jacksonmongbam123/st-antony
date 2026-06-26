/* ═══════════════════════════════════════════════════════════
   App.jsx  (src/App.jsx)
   Root component — injects global CSS once, then composes
   all page sections in order.

   File structure
   ──────────────
   src/
   ├── App.jsx          ← you are here (entry point)
   ├── data.js          ← design tokens + all static data
   └── components.jsx   ← custom hooks + all UI components
═══════════════════════════════════════════════════════════ */

import { useEffect } from "react";
import { GLOBAL_CSS } from "./data";
import {
  Navbar,
  Hero,
  VisionMission,
  AcademicPerformance,
  Admissions,
  Achievements,
  Faculty,
  ContactUs,
  GitHubSync,
  Footer,
} from "./components";

export default function App() {
  // Inject global keyframe animations and base styles once on mount
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <VisionMission />
      <AcademicPerformance />
      <Admissions />
      <Achievements />
      <Faculty />
      <ContactUs />
      <GitHubSync />
      <Footer />
    </div>
  );
}

