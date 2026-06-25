/* ═══════════════════════════════════════════════════════════
   components.jsx
   All custom hooks and UI components for the St. Antony's
   website. Imports data & tokens from ./data.js.
═══════════════════════════════════════════════════════════ */

import { useState, useEffect, useRef, useCallback } from "react";
import { useInView, useScrollSpy } from "./hooks";
import {
  T,
  NAV_LINKS,
  HERO_SLIDES,
  ADMISSION_DATA,
  CLASS_DATA,
  ACHIEVEMENT_DATA,
  FACULTY_DATA,
  ACADEMIC_PERFORMANCE_DATA,
} from "./data";

import myLogo from './assets/logo2.png';
import cImg from './assets/school.jpeg';

// ══════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ══════════════════════════════════════════════════════════

/**
 * FacultyAvatar — colour-coded initials circle with degree badge.
 * Rendered both on the grid card and inside the modal.
 */


/**
 * SectionHeader — animated eyebrow + title + gold rule + subtitle.
 * Accepts `dark` for white-on-navy variant, `center` for centred layout.
 */
export function SectionHeader({ eyebrow, title, sub, dark, center }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ marginBottom: 40, textAlign: center ? "center" : "left" }}>
      <div
        style={{
          color: dark ? T.goldLt : T.gold,
          fontSize: ".74rem",
          fontWeight: 700,
          letterSpacing: ".18em",
          textTransform: "uppercase",
          marginBottom: 10,
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : "translateY(12px)",
          transition: "all .5s .1s",
        }}
      >
        {eyebrow}
      </div>

      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2rem, 4vw, 2.8rem)",
          color: dark ? T.white : T.navy,
          marginBottom: sub ? 16 : 0,
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : "translateY(16px)",
          transition: "all .55s .2s",
          lineHeight: 1.2,
          fontWeight: 700,
        }}
      >
        {title}
      </h2>

      {!dark && (
        <div
          style={{
            width: 48,
            height: 3,
            background: T.gold,
            borderRadius: 2,
            margin: center ? "16px auto 0" : "16px 0 0",
            opacity: inView ? 1 : 0,
            transform: inView ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: center ? "center" : "left",
            transition: "all .6s .4s cubic-bezier(0.165, 0.84, 0.44, 1)",
            boxShadow: `0 1px 4px ${T.gold}44`,
          }}
        />
      )}

      {sub && (
        <p
          style={{
            color: dark ? "rgba(255,255,255,.62)" : T.gray,
            fontSize: ".97rem",
            lineHeight: 1.75,
            maxWidth: 580,
            marginTop: 18,
            margin: center ? "18px auto 0" : "18px 0 0",
            opacity: inView ? 1 : 0,
            transition: "opacity .5s .4s",
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// SECTION COMPONENTS
// ══════════════════════════════════════════════════════════

/**
 * Navbar — sticky, white, scroll-spy aware.
 * Transitions to frosted-glass on scroll. Includes a mobile
 * full-screen overlay menu triggered by the hamburger button.
 * Fully responsive across all screen sizes.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionIds = NAV_LINKS.map((l) => l.href);
  const active = useScrollSpy(sectionIds);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Handle window resize to close mobile menu
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [mobileOpen]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      {/* ── Navbar ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,1)",
          borderBottom: `2px solid ${scrolled ? T.gold + "33" : T.gold + "22"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 5%",
          height: 68,
          boxShadow: scrolled
            ? "0 4px 20px rgba(15,32,68,.12)"
            : "0 2px 8px rgba(15,32,68,.06)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "all .35s ease",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            cursor: "pointer",
            minWidth: 0,
            flex: 1,
          }}
          onClick={() => scrollTo("hero")}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: `2px solid ${T.gold}`,
              overflow: "hidden",
              display: "grid",
              placeItems: "center",
              background: T.white,
              flexShrink: 0,
              boxShadow: scrolled ? `0 2px 10px ${T.shadow}` : `0 0 0 4px ${T.gold}15`,
              animation: "pulse 3s infinite",
              transition: "all 0.3s ease",
            }}
          >
            <img src={myLogo} alt="St. Antony's Logo" style={{ width: "85%", height: "85%", objectFit: "contain" }} />
          </div>
          <div className="desktop-only" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ color: T.navy, fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.01em", fontFamily: "'Playfair Display', serif" }}>
              St. Antony's
            </div>
            <div style={{ color: T.gold, fontSize: ".75rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginTop: 2 }}>
              High School / College
            </div>
          </div>
        </div>

        {/* Desktop nav links — hidden on mobile via CSS class */}
        <ul className="desktop-only" style={{ alignItems: "center", gap: 24, listStyle: "none", flex: 1, justifyContent: "center" }}>
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => scrollTo(l.href)}
                className={active === l.href ? "nav-active" : ""}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: active === l.href ? T.navy : T.gray,
                    fontSize: ".9rem",
                    fontWeight: active === l.href ? 700 : 500,
                    letterSpacing: ".02em",
                    padding: "8px 4px",
                    position: "relative",
                    transition: "all .3s ease",
                  }}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right — login + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            className="desktop-only"
            onClick={() =>
              alert("🔐 Login portal launching soon!\nContact: admissions@stantonys.edu.in")
            }
            style={{
              background: T.gold,
              color: T.navy,
              border: "none",
              padding: "8px 16px",
              borderRadius: 6,
              fontSize: ".84rem",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all .2s",
              boxShadow: `0 2px 8px ${T.gold}44`,
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = T.goldLt;
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = T.gold;
              e.currentTarget.style.transform = "none";
            }}
          >
            Login
          </button>

          {/* Hamburger — visible on mobile only via CSS class */}
          <button
            className="mobile-only"
            onClick={() => setMobileOpen((o) => !o)}
            style={{
              background: scrolled ? T.gold + "15" : "rgba(15,32,68,0.05)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
              width: 42,
              height: 42,
              borderRadius: 10,
              zIndex: 1001,
              marginRight: "-4px",
              transition: "all 0.3s ease",
            }}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 24,
                  height: 2.5,
                  background: T.navy,
                  borderRadius: 2,
                  transition: "all .3s",
                  transform: mobileOpen
                    ? i === 0
                      ? "rotate(45deg) translate(5px,5px)"
                      : i === 1
                      ? "scaleX(0)"
                      : "rotate(-45deg) translate(5px,-5px)"
                    : "none",
                  opacity: mobileOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* ── Mobile full-screen overlay menu ── */}
      <div className="mobile-only">
        {/* Backdrop overlay */}
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: mobileOpen ? "rgba(15,32,68,0.5)" : "transparent",
            zIndex: 998,
            opacity: mobileOpen ? 1 : 0,
            pointerEvents: mobileOpen ? "all" : "none",
            transition: "all .3s ease",
          }}
        />
        {/* Menu content */}
        <div
          className="mobile-nav-overlay"
          style={{
            position: "fixed",
            top: 68,
            left: 0,
            right: 0,
            background: T.white,
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            maxHeight: "calc(100vh - 68px)",
            overflowY: "auto",
            opacity: mobileOpen ? 1 : 0,
            transform: mobileOpen ? "translateY(0)" : "translateY(-100%)",
            pointerEvents: mobileOpen ? "all" : "none",
            transition: "all .3s ease",
            boxShadow: mobileOpen ? "0 8px 32px rgba(15,32,68,.15)" : "none",
          }}
        >
          {/* Navigation links */}
          <div style={{ display: "flex", flexDirection: "column", padding: "16px 0" }}>
            {NAV_LINKS.map((l, idx) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: active === l.href ? T.gold : T.navy,
                  fontSize: "1rem",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: active === l.href ? 600 : 500,
                  padding: "14px 20px",
                  textAlign: "left",
                  transition: "all .2s",
                  borderBottom: idx < NAV_LINKS.length - 1 ? `1px solid ${T.light}` : "none",
                  backgroundColor: active === l.href ? T.light : "transparent",
                }}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: T.light, margin: "8px 0" }} />

          {/* Login button */}
          <div style={{ padding: "16px 20px" }}>
            <button
              onClick={() => {
                alert("🔐 Login portal launching soon!\nContact: admissions@stantonys.edu.in");
                setMobileOpen(false);
              }}
              style={{
                background: T.gold,
                color: T.navy,
                border: "none",
                padding: "12px 24px",
                borderRadius: 6,
                fontSize: ".95rem",
                fontWeight: 700,
                cursor: "pointer",
                width: "100%",
                transition: "all .2s",
                boxShadow: `0 2px 8px ${T.gold}44`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = T.goldLt;
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = T.gold;
                e.currentTarget.style.transform = "none";
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Hero — full-viewport slider with cross-fade backgrounds,
 * animated content text, vertical dot indicators, and arrow controls.
 * Auto-advances every 5 seconds.
 */
export function Hero() {
  const [cur, setCur] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const timerRef = useRef(null);

  const goTo = useCallback(
    (n) => {
      setCur((n + HERO_SLIDES.length) % HERO_SLIDES.length);
      setAnimKey((k) => k + 1);
    },
    []
  );

  useEffect(() => {
    timerRef.current = setInterval(() => goTo(cur + 1), 5000);
    return () => clearInterval(timerRef.current);
  }, [cur, goTo]);

  const slide = HERO_SLIDES[cur];

  return (
    <section
      id="hero"
      style={{
        marginTop: 68,
        position: "relative",
        height: "calc(100vh - 68px)",
        minHeight: 480,
        overflow: "hidden",
      }}
    >
      {/* Photo backgrounds — cross-fade between slides */}
      {HERO_SLIDES.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === cur ? 1 : 0,
            transition: "opacity 1.1s ease",
          }}
        >
          {/* Actual photo */}
          <img
            src={cImg}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          {/* Colour-graded overlay so text stays readable */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: s.overlay,
            }}
          />
          {/* Subtle glow blobs */}
          <div
            style={{
              position: "absolute",
              top: "-10%",
              right: "-5%",
              width: 420,
              height: 420,
              borderRadius: "50%",
              background: `${s.accent}22`,
              filter: "blur(60px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "5%",
              left: "-5%",
              width: 280,
              height: 280,
              borderRadius: "50%",
              background: `${s.accent}18`,
              filter: "blur(40px)",
            }}
          />
        </div>
      ))}

      {/* Slide content — re-mounts on each slide change to re-trigger CSS animations */}
      <div
        key={animKey}
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 8%",
          maxWidth: 680,
        }}
      >
        <div>
          <div
            style={{
              color: T.goldLt,
              fontSize: "clamp(.85rem, 1.5vw, 1.05rem)",
              fontWeight: 700,
              letterSpacing: ".25em",
              textTransform: "uppercase",
              marginBottom: 20,
              animation: "fadeInUp .6s .1s both",
            }}
          >
            {slide.eyebrow}
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.8rem, 7vw, 5.2rem)",
              color: T.white,
              lineHeight: 1.05,
              marginBottom: 28,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              animation: "fadeInUp .7s .2s both",
            }}
          >
            {slide.title[0]}
            <br />
            <em style={{ color: T.goldLt, fontStyle: "normal" }}>{slide.title[1]}</em>
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,0.92)",
              fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)",
              lineHeight: 1.6,
              maxWidth: 700,
              marginBottom: 48,
              animation: "fadeInUp .7s .35s both",
            }}
          >
            {slide.desc}
          </p>

          <button
            onClick={() =>
              document.getElementById(slide.cta.href)?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              background: T.gold,
              color: T.navy,
              border: "none",
              padding: "16px 40px",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
              animation: "fadeInUp .7s .5s both",
              transition: "all .3s ease",
              boxShadow: `0 6px 20px ${T.gold}44`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = T.goldLt;
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = `0 10px 25px ${T.gold}66`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = T.gold;
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = `0 6px 20px ${T.gold}44`;
            }}
          >
            {slide.cta.label} →
          </button>
        </div>
      </div>

      {/* Vertical dot indicators */}
      <div
        style={{
          position: "absolute",
          right: "5%",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              clearInterval(timerRef.current);
              goTo(i);
            }}
            style={{
              width: 6,
              height: i === cur ? 48 : 12,
              borderRadius: 6,
              border: "none",
              background: i === cur ? T.gold : "rgba(255,255,255,.3)",
              cursor: "pointer",
              transition: "all .5s cubic-bezier(0.165, 0.84, 0.44, 1)",
              boxShadow: i === cur ? `0 0 15px ${T.gold}88` : "none",
            }}
          />
        ))}
      </div>

      {/* Prev / Next arrows */}
      {["←", "→"].map((arrow, di) => (
        <button
          key={di}
          onClick={() => {
            clearInterval(timerRef.current);
            goTo(cur + (di === 0 ? -1 : 1));
          }}
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            [di === 0 ? "left" : "right"]: "2%",
            zIndex: 10,
            width: 46,
            height: 46,
            borderRadius: "50%",
            border: "2px solid rgba(255,255,255,.35)",
            background: "rgba(255,255,255,.08)",
            backdropFilter: "blur(4px)",
            color: T.white,
            fontSize: "1.2rem",
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
            transition: "all .2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = T.gold;
            e.currentTarget.style.background = `${T.gold}33`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,.35)";
            e.currentTarget.style.background = "rgba(255,255,255,.08)";
          }}
        >
          {arrow}
        </button>
      ))}

      {/* Scroll hint */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          color: "rgba(255,255,255,.5)",
          fontSize: ".7rem",
          letterSpacing: ".1em",
        }}
      >
        <span style={{ animation: "fadeInUp 1s 1.5s both" }}>SCROLL</span>
        <div
          style={{
            width: 1,
            height: 40,
            background: "linear-gradient(to bottom, rgba(255,255,255,.5), transparent)",
            animation: "fadeIn 1s 1.5s both",
          }}
        />
      </div>
    </section>
  );
}

/**
 * VisionMission — two cards with scroll-reveal + lift-on-hover.
 */
function VisionCard({ card, index }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        background: T.cream,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(15,32,68,.10)",
        transition: "transform .3s, box-shadow .3s",
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(24px)",
        transitionDelay: `${index * 0.15}s`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 16px 48px rgba(15,32,68,.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(15,32,68,.10)";
      }}
    >
      <div style={{ height: 180, background: card.bg, display: "grid", placeItems: "center" }}>
        <span style={{ fontSize: "3.5rem" }}>{card.icon}</span>
      </div>
      <div style={{ padding: "24px 28px" }}>
        <span
          style={{
            display: "inline-block",
            background: T.gold,
            color: T.navy,
            fontSize: ".7rem",
            fontWeight: 700,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            padding: "4px 10px",
            borderRadius: 4,
            marginBottom: 12,
          }}
        >
          {card.tag}
        </span>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.6rem",
            marginBottom: 12,
            fontWeight: 700,
            color: T.navy,
          }}
        >
          {card.title}
        </h3>
        <p style={{ color: T.gray, fontSize: "1rem", lineHeight: 1.7 }}>{card.body}</p>
      </div>
    </div>
  );
}

export function VisionMission() {
  const CARDS = [
    {
      tag: "Vision",
      bg: "linear-gradient(135deg,#0f2044,#2d5a9e)",
      icon: "🔭",
      title: "A Beacon of Learning",
      body: "To be a globally recognised institution that empowers every student to realise their highest potential — academically, personally, and professionally — contributing meaningfully to society.",
    },
    {
      tag: "Mission",
      bg: "linear-gradient(135deg,#7c2d12,#c2410c)",
      icon: "🎯",
      title: "Education With Purpose",
      body: "We are committed to delivering transformative education through innovative pedagogy, inclusive communities, and deep industry partnerships — creating graduates who lead with knowledge, integrity, and compassion.",
    },
  ];

  return (
    <section id="vision" style={{ background: T.white, padding: "80px 7% 40px" }}>
      <SectionHeader eyebrow="Who We Are" title="Vision & Mission" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: 32,
        }}
      >
        {CARDS.map((c, i) => (
          <VisionCard key={i} card={c} index={i} />
        ))}
      </div>
    </section>
  );
}

/**
 * AcademicPerformance — showcasing 20 years of excellence.
 */
export function AcademicPerformance() {
  const [category, setCategory] = useState("puc"); // "highSchool" or "puc"
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  
  const currentDataList = ACADEMIC_PERFORMANCE_DATA[category];
  const data = currentDataList[selectedYearIndex];
  const [ref, inView] = useInView();

  const statCardStyle = {
    background: T.white,
    padding: "24px",
    borderRadius: 16,
    boxShadow: `0 4px 20px ${T.shadow}`,
    textAlign: "center",
    transition: "all 0.3s ease",
    border: "1px solid rgba(15,32,68,0.05)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  };

  return (
    <section id="academic-performance" style={{ background: T.cream, padding: "80px 7%" }}>
      <SectionHeader
        eyebrow="Academic Excellence"
        title="Performance History"
        sub="Celebrating two decades of outstanding academic results and student achievements."
      />

      {/* Category Toggle */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
        <div style={{ 
          background: "rgba(15,32,68,0.05)", 
          padding: 6, 
          borderRadius: 40, 
          display: "flex",
          gap: 4
        }}>
          {[
            { id: "highSchool", label: "High School" },
            { id: "puc", label: "PUC / Pre-University" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategory(cat.id);
                setSelectedYearIndex(0);
              }}
              style={{
                padding: "10px 24px",
                borderRadius: 30,
                border: "none",
                background: category === cat.id ? T.white : "transparent",
                color: category === cat.id ? T.navy : T.gray,
                fontWeight: 700,
                fontSize: "0.95rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: category === cat.id ? `0 4px 12px rgba(0,0,0,0.1)` : "none",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Year Selector Timeline */}
      <div 
        className="table-scroll"
        style={{ 
          display: "flex", 
          gap: 12, 
          marginBottom: 48, 
          paddingBottom: 16,
          justifyContent: "flex-start",
        }}
      >
        {currentDataList.map((item, i) => (
          <button
            key={item.year}
            onClick={() => setSelectedYearIndex(i)}
            style={{
              padding: "10px 20px",
              borderRadius: 30,
              border: `2px solid ${selectedYearIndex === i ? T.gold : "transparent"}`,
              background: selectedYearIndex === i ? T.white : "rgba(15,32,68,0.05)",
              color: selectedYearIndex === i ? T.navy : T.gray,
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.3s ease",
              boxShadow: selectedYearIndex === i ? `0 4px 12px ${T.gold}33` : "none",
            }}
          >
            {item.year}
          </button>
        ))}
      </div>

      <div ref={ref} className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 32, alignItems: "stretch" }}>
        {/* Left: Top Scorer Card */}
        <div 
          style={{ 
            opacity: inView ? 1 : 0, 
            transform: inView ? "none" : "translateY(20px)", 
            transition: "all 0.6s ease",
            height: "100%"
          }}
        >
          <div
            style={{
              background: T.white,
              borderRadius: 24,
              padding: "48px 32px",
              textAlign: "center",
              boxShadow: `0 20px 50px ${T.shadowMd}`,
              border: `1px solid ${T.gold}22`,
              position: "relative",
              overflow: "hidden",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 8, background: T.gold }}></div>
            <div style={{ marginBottom: 24, position: "relative", display: "inline-block" }}>
              <img 
                src={data.topScorer.photo} 
                alt={data.topScorer.name} 
                style={{ 
                  width: 140, 
                  height: 140, 
                  borderRadius: "50%", 
                  objectFit: "cover",
                  border: `4px solid ${T.gold}`,
                  padding: 4,
                  background: T.white
                }} 
              />
              <div style={{ 
                position: "absolute", 
                bottom: 5, 
                right: 5, 
                background: T.gold, 
                color: T.white, 
                width: 40, 
                height: 40, 
                borderRadius: "50%", 
                display: "grid", 
                placeItems: "center",
                fontSize: "1.2rem",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
              }}>🏆</div>
            </div>
            <h3 style={{ fontSize: "1.8rem", color: T.navy, marginBottom: 8 }}>{data.topScorer.name}</h3>
            <div style={{ color: T.gold, fontWeight: 700, fontSize: "1.1rem", marginBottom: 16, letterSpacing: "0.05em" }}>
              {data.topScorer.rank}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 24 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: T.navy }}>{data.topScorer.marks}</div>
                <div style={{ fontSize: "0.8rem", color: T.gray, textTransform: "uppercase" }}>Marks Obtained</div>
              </div>
              <div style={{ width: 1, background: "rgba(0,0,0,0.1)" }}></div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: T.navy }}>{data.topScorer.percentage}</div>
                <div style={{ fontSize: "0.8rem", color: T.gray, textTransform: "uppercase" }}>Percentage</div>
              </div>
            </div>
            <div style={{ 
              background: "rgba(15,32,68,0.05)", 
              padding: "14px 20px", 
              borderRadius: 12, 
              fontSize: "0.95rem", 
              color: T.navy,
              fontWeight: 600
            }}>
              {data.topScorer.class}
            </div>
          </div>
        </div>

        {/* Right: Statistics Grid & Table */}
        <div 
          style={{ 
            opacity: inView ? 1 : 0, 
            transform: inView ? "none" : "translateY(20px)", 
            transition: "all 0.6s 0.2s ease",
            display: "flex",
            flexDirection: "column",
            gap: 24
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20 }}>
            <div style={{ ...statCardStyle, background: `linear-gradient(135deg, ${T.navy} 0%, ${T.navy}dd 100%)`, color: T.white }}>
              <div style={{ fontSize: "2.4rem", fontWeight: 800, marginBottom: 4 }}>{data.passPercentage}%</div>
              <div style={{ fontSize: "0.85rem", opacity: 0.8, textTransform: "uppercase", letterSpacing: "0.1em" }}>Overall Pass</div>
            </div>
            <div style={statCardStyle}>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: T.navy, marginBottom: 4 }}>{data.totalAppeared}</div>
              <div style={{ fontSize: "0.85rem", color: T.gray, textTransform: "uppercase" }}>Students Appeared</div>
            </div>
            <div style={statCardStyle}>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: T.gold, marginBottom: 4 }}>{data.distinction}</div>
              <div style={{ fontSize: "0.85rem", color: T.gray, textTransform: "uppercase" }}>Distinctions</div>
            </div>
          </div>

          {/* Detailed Results Table */}
          <div 
            style={{ 
              background: T.white, 
              borderRadius: 24, 
              padding: "36px", 
              boxShadow: `0 10px 30px ${T.shadow}`,
              flex: 1
            }}
          >
            <h4 style={{ marginBottom: 24, color: T.navy, fontSize: "1.3rem", fontWeight: 700 }}>Result Breakdown — {data.year}</h4>
            <div className="table-scroll">
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid rgba(15,32,68,0.05)" }}>
                    <th style={{ padding: "14px 8px", color: T.gray, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Category</th>
                    <th style={{ padding: "14px 8px", color: T.gray, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "right" }}>Count</th>
                    <th style={{ padding: "14px 8px", color: T.gray, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "right" }}>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Distinction", count: data.distinction, color: T.gold },
                    { label: "First Class", count: data.firstClass, color: T.navy },
                    { label: "Second Class", count: data.secondClass, color: T.gray },
                    { label: "Failures", count: data.failure, color: "#ef4444" },
                  ].map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid rgba(15,32,68,0.03)" }}>
                      <td style={{ padding: "16px 8px", fontWeight: 600, color: T.navy }}>
                        <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: row.color, marginRight: 12 }}></span>
                        {row.label}
                      </td>
                      <td style={{ padding: "16px 8px", textAlign: "right", fontWeight: 700, color: T.navy }}>{row.count}</td>
                      <td style={{ padding: "16px 8px", textAlign: "right", color: T.gray, fontWeight: 500 }}>
                        {((row.count / data.totalAppeared) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Admissions — skeleton-loader cards that swap to real content after
 * 1.6 s, plus a tabbed curriculum table.
 */
export function Admissions() {
  const [loaded, setLoaded] = useState(false);
  const [activeClass, setActiveClass] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="admissions" style={{ background: T.light, padding: "80px 7%" }}>
      <SectionHeader
        eyebrow="Join Us"
        title="Admissions 2026"
        sub="Everything you need to know about joining St. Antony's — fees, eligibility, classes, and subjects covered."
      />

      {/* Info cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: 28,
          marginBottom: 20,
        }}
      >
        {ADMISSION_DATA.map((d, i) => (
          <div
            key={i}
            style={{
              background: T.white,
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 4px 24px rgba(15,32,68,.10)",
              transition: "transform .3s, box-shadow .3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(15,32,68,.16)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 4px 24px rgba(15,32,68,.10)";
            }}
          >
            {/* Skeleton */}
            {!loaded ? (
              <div style={{ padding: 22 }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                  <div
                    className="skeleton"
                    style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0 }}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      className="skeleton"
                      style={{ height: 12, width: "78%", marginBottom: 6 }}
                    />
                    <div className="skeleton" style={{ height: 10, width: "55%" }} />
                  </div>
                </div>
                {[1, 2, 3, 4, 5].map((j) => (
                  <div
                    key={j}
                    className="skeleton"
                    style={{ height: 12, width: j % 2 === 0 ? "78%" : "100%", marginBottom: 10 }}
                  />
                ))}
              </div>
            ) : (
              /* Real content */
              <div style={{ animation: "fadeIn .5s ease" }}>
                <div
                  style={{
                    padding: "32px 28px 20px",
                    display: "flex",
                    gap: 18,
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      background: d.bg,
                      display: "grid",
                      placeItems: "center",
                      fontSize: "1.8rem",
                      flexShrink: 0,
                      boxShadow: `0 4px 12px ${d.bg}aa`,
                    }}
                  >
                    {d.icon}
                  </div>
                  <div>
                    <h4
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.25rem",
                        color: T.navy,
                        marginBottom: 4,
                        fontWeight: 700,
                      }}
                    >
                      {d.title}
                    </h4>
                    <p style={{ color: T.gray, fontSize: ".85rem", fontWeight: 500 }}>{d.subtitle}</p>
                  </div>
                </div>
                <div style={{ height: 1, background: T.light, margin: "0 28px" }} />
                <div style={{ padding: "20px 28px 32px" }}>
                  {d.rows.map((r, j) => (
                    <div
                      key={j}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px 0",
                        borderBottom: j < d.rows.length - 1 ? `1px solid ${T.light}` : "none",
                        gap: 12,
                      }}
                    >
                      <span style={{ color: T.gray, fontSize: ".88rem", fontWeight: 500 }}>
                        {r.label}
                      </span>
                      <span
                        style={{
                          color: r.hi ? T.gold : T.navy,
                          fontSize: r.hi ? ".95rem" : ".9rem",
                          fontWeight: 700,
                          textAlign: "right",
                        }}
                      >
                        {r.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Curriculum table */}
      <div style={{ marginTop: 64 }}>
        <div
          style={{
            color: T.gold,
            fontSize: ".74rem",
            fontWeight: 700,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          Curriculum Overview
        </div>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.4rem",
            color: T.navy,
            marginBottom: 24,
          }}
        >
          Classes &amp; Subjects Handled
        </h3>

        {/* Class tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
          {CLASS_DATA.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveClass(i)}
              style={{
                padding: "9px 18px",
                borderRadius: 30,
                border: `1.5px solid ${activeClass === i ? T.navy : "#cbd5e1"}`,
                background: activeClass === i ? T.navy : T.white,
                color: activeClass === i ? T.white : T.navy,
                fontSize: ".83rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all .25s",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Subject table */}
        <div
          className="table-scroll"
          style={{
            background: T.white,
            borderRadius: 12,
            boxShadow: "0 4px 24px rgba(15,32,68,.10)",
            overflowX: "auto",
            overflowY: "hidden",
            animation: "fadeIn .35s ease",
            maxWidth: "100%",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: T.navy }}>
              <tr>
                {["Subject", "Code", "Periods/Week", "Teacher In-Charge"].map((h) => (
                  <th
                    key={h}
                    style={{
                      color: T.white,
                      fontSize: ".8rem",
                      fontWeight: 600,
                      letterSpacing: ".06em",
                      textTransform: "uppercase",
                      padding: "14px 18px",
                      textAlign: "left",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CLASS_DATA[activeClass].rows.map((r, i) => (
                <tr
                  key={i}
                  style={{
                    background: i % 2 === 0 ? T.white : "#f8fafc",
                    transition: "background .2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#eff6ff")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = i % 2 === 0 ? T.white : "#f8fafc")
                  }
                >
                  <td style={{ padding: "13px 18px", fontWeight: 600, color: T.gold }}>
                    {r.subject}
                  </td>
                  <td style={{ padding: "13px 18px", fontSize: ".88rem", color: T.navy }}>
                    {r.code}
                  </td>
                  <td
                    style={{
                      padding: "13px 18px",
                      fontSize: ".88rem",
                      color: T.navy,
                      textAlign: "center",
                    }}
                  >
                    {r.periods}
                  </td>
                  <td style={{ padding: "13px 18px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: ".84rem",
                        color: T.navy,
                      }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: `linear-gradient(135deg,${T.navy},#3b5fa0)`,
                          display: "grid",
                          placeItems: "center",
                          fontSize: ".8rem",
                          flexShrink: 0,
                        }}
                      >
                        {r.emoji}
                      </div>
                      {r.teacher}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/**
 * Achievements — dark-navy section with category tabs and an animated
 * single-slide carousel. scaleIn animation on every slide transition.
 * Auto-advances every 6 seconds.
 */
export function Achievements() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const timerRef = useRef(null);

  const cat = ACHIEVEMENT_DATA[activeTab];

  const goSlide = useCallback(
    (n) => {
      const next = (n + cat.slides.length) % cat.slides.length;
      setActiveSlide(next);
      setAnimKey((k) => k + 1);
    },
    [cat.slides.length]
  );

  // Reset slide index when category changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveSlide(0);
    setAnimKey((k) => k + 1);
  }, [activeTab]);

  // Auto-advance timer
  useEffect(() => {
    timerRef.current = setInterval(() => goSlide(activeSlide + 1), 6000);
    return () => clearInterval(timerRef.current);
  }, [activeSlide, goSlide]);

  const slide = cat.slides[activeSlide];

  return (
    <section id="achievements" style={{ background: T.navy, padding: "80px 7%" }}>
      <SectionHeader
        dark
        eyebrow="Our Pride"
        title="Achievements"
        sub="Four decades of excellence across sports, education, culture, and beyond."
      />

      {/* Category tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 40, flexWrap: "wrap" }}>
        {ACHIEVEMENT_DATA.map((c, i) => (
          <button
            key={i}
            onClick={() => {
              setActiveTab(i);
              clearInterval(timerRef.current);
            }}
            style={{
              padding: "10px 22px",
              borderRadius: 30,
              border: `1.5px solid ${i === activeTab ? T.gold : "rgba(255,255,255,.2)"}`,
              background: i === activeTab ? T.gold : "transparent",
              color: i === activeTab ? T.navy : "rgba(255,255,255,.7)",
              fontSize: ".85rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all .25s",
            }}
            onMouseEnter={(e) => {
              if (i !== activeTab) {
                e.currentTarget.style.borderColor = "rgba(255,255,255,.5)";
                e.currentTarget.style.color = T.white;
              }
            }}
            onMouseLeave={(e) => {
              if (i !== activeTab) {
                e.currentTarget.style.borderColor = "rgba(255,255,255,.2)";
                e.currentTarget.style.color = "rgba(255,255,255,.7)";
              }
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Carousel row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "48px 1fr 48px",
          gap: 16,
          alignItems: "center",
        }}
      >
        {/* Prev */}
        <button
          onClick={() => {
            clearInterval(timerRef.current);
            goSlide(activeSlide - 1);
          }}
          style={{
            width: 46,
            height: 46,
            borderRadius: "50%",
            border: "1.5px solid rgba(255,255,255,.25)",
            background: "rgba(15,32,68,.6)",
            color: T.white,
            cursor: "pointer",
            fontSize: "1.1rem",
            display: "grid",
            placeItems: "center",
            transition: "all .2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = T.gold;
            e.currentTarget.style.color = T.gold;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,.25)";
            e.currentTarget.style.color = T.white;
          }}
        >
          ←
        </button>

        {/* Slide card — key forces remount & re-triggers animation */}
        <div
          key={`${activeTab}-${animKey}`}
          style={{
            background: `linear-gradient(135deg, ${slide.color}, ${slide.color}dd)`,
            borderRadius: 16,
            overflow: "hidden",
            minHeight: 320,
            border: "1px solid rgba(255,255,255,.08)",
            animation: "scaleIn .45s ease both",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            boxShadow: "0 20px 60px rgba(0,0,0,.3)",
          }}
        >
          {/* Left — medal + progress */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(0,0,0,.2), rgba(0,0,0,.05))",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px 28px",
              gap: 16,
            }}
          >
            <div
              style={{
                fontSize: "4rem",
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,.3))",
                animation: "fadeInUp .5s .1s both",
              }}
            >
              {slide.medal}
            </div>
            <div
              style={{
                color: T.goldLt,
                fontSize: ".72rem",
                fontWeight: 700,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                animation: "fadeInUp .5s .2s both",
              }}
            >
              {slide.year}
            </div>
            {/* Gold progress bar */}
            <div
              style={{
                width: "60%",
                height: 3,
                background: "rgba(255,255,255,.15)",
                borderRadius: 2,
                overflow: "hidden",
                marginTop: 8,
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: T.gold,
                  borderRadius: 2,
                  width: `${((activeSlide + 1) / cat.slides.length) * 100}%`,
                  transition: "width .5s ease",
                }}
              />
            </div>
            <div
              style={{
                color: "rgba(255,255,255,.45)",
                fontSize: ".72rem",
                letterSpacing: ".14em",
              }}
            >
              {activeSlide + 1} / {cat.slides.length}
            </div>
          </div>

          {/* Right — title + description */}
          <div
            style={{
              padding: "48px 44px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h4
              style={{
                color: T.white,
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.8rem",
                marginBottom: 18,
                lineHeight: 1.2,
                fontWeight: 700,
                animation: "fadeInUp .5s .25s both",
              }}
            >
              {slide.title}
            </h4>
            <p
              style={{
                color: "rgba(255,255,255,.85)",
                fontSize: "1rem",
                lineHeight: 1.7,
                animation: "fadeInUp .5s .35s both",
              }}
            >
              {slide.desc}
            </p>
          </div>
        </div>

        {/* Next */}
        <button
          onClick={() => {
            clearInterval(timerRef.current);
            goSlide(activeSlide + 1);
          }}
          style={{
            width: 46,
            height: 46,
            borderRadius: "50%",
            border: "1.5px solid rgba(255,255,255,.25)",
            background: "rgba(15,32,68,.6)",
            color: T.white,
            cursor: "pointer",
            fontSize: "1.1rem",
            display: "grid",
            placeItems: "center",
            transition: "all .2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = T.gold;
            e.currentTarget.style.color = T.gold;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,.25)";
            e.currentTarget.style.color = T.white;
          }}
        >
          →
        </button>
      </div>

      {/* Slide dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
        {cat.slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              clearInterval(timerRef.current);
              goSlide(i);
            }}
            style={{
              width: i === activeSlide ? 28 : 9,
              height: 9,
              padding: 0,
              borderRadius: 5,
              border: "none",
              background: i === activeSlide ? T.gold : "rgba(255,255,255,.25)",
              cursor: "pointer",
              transition: "all .35s ease",
            }}
          />
        ))}
      </div>
    </section>
  );
}

/**
 * Faculty — filterable grid of dynamically rendered faculty cards
 * (avatar generated from initials + colour), with a full-detail modal.
 */
export function Faculty() {
  const [mainCat, setMainCat] = useState("highSchool"); // "highSchool" or "puc"
  const [subCat, setSubCat] = useState("8th Standard");
  const [stream, setStream] = useState("Science Stream");
  const [hovered, setHovered] = useState(null);

  const handleMainCatChange = (catId) => {
    setMainCat(catId);
    if (catId === "highSchool") {
      setSubCat("8th Standard");
    } else {
      setSubCat("1st PUC");
      setStream("Science Stream");
    }
  };

  const getFacultyList = () => {
    if (mainCat === "highSchool") {
      return FACULTY_DATA.highSchool[subCat] || [];
    } else {
      return FACULTY_DATA.puc[subCat]?.[stream] || [];
    }
  };

  const facultyList = getFacultyList();

  return (
    <section id="faculty" style={{ background: T.cream, padding: "80px 7%" }}>
      <SectionHeader
        eyebrow="Our Educators"
        title="Faculty Information"
        sub="Meet our subject-specialist educators assigned to each class and stream."
      />

      {/* Main Category Selector */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
        <div style={{ background: "rgba(15,32,68,0.05)", padding: 6, borderRadius: 40, display: "flex", gap: 4 }}>
          {[
            { id: "highSchool", label: "High School" },
            { id: "puc", label: "PUC / College" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleMainCatChange(cat.id)}
              style={{
                padding: "10px 24px",
                borderRadius: 30,
                border: "none",
                background: mainCat === cat.id ? T.navy : "transparent",
                color: mainCat === cat.id ? T.white : T.gray,
                fontWeight: 700,
                fontSize: "0.95rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-Category Selector */}
      <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
        {mainCat === "highSchool" ? (
          ["8th Standard", "9th Standard", "10th Standard"].map((std) => (
            <button
              key={std}
              onClick={() => setSubCat(std)}
              style={{
                padding: "8px 20px",
                borderRadius: 30,
                border: `1.5px solid ${subCat === std ? T.gold : "#cbd5e1"}`,
                background: subCat === std ? T.white : "transparent",
                color: subCat === std ? T.navy : T.gray,
                fontWeight: 600,
                fontSize: "0.85rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {std}
            </button>
          ))
        ) : (
          <>
            <div style={{ display: "flex", gap: 8 }}>
              {["1st PUC", "2nd PUC"].map((puc) => (
                <button
                  key={puc}
                  onClick={() => setSubCat(puc)}
                  style={{
                    padding: "8px 20px",
                    borderRadius: 30,
                    border: `1.5px solid ${subCat === puc ? T.gold : "#cbd5e1"}`,
                    background: subCat === puc ? T.white : "transparent",
                    color: subCat === puc ? T.navy : T.gray,
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  {puc}
                </button>
              ))}
            </div>
            <div style={{ width: 1, background: "#cbd5e1", margin: "0 10px" }} />
            <div style={{ display: "flex", gap: 8 }}>
              {["Science Stream", "Commerce Stream"].map((str) => (
                <button
                  key={str}
                  onClick={() => setStream(str)}
                  style={{
                    padding: "8px 20px",
                    borderRadius: 30,
                    border: `1.5px solid ${stream === str ? T.navy2 : "transparent"}`,
                    background: stream === str ? T.navy2 : "rgba(15,32,68,0.05)",
                    color: stream === str ? T.white : T.gray,
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  {str}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Faculty Card Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 32,
          alignItems: "stretch"
        }}
      >
        {facultyList.map((f, i) => (
          <div
            key={`${f.name}-${f.subject}`}
            onMouseEnter={() => setHovered(`${f.name}-${f.subject}`)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: T.white,
              borderRadius: 24,
              padding: "40px 28px",
              textAlign: "center",
              transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
              transform: hovered === `${f.name}-${f.subject}` ? "translateY(-10px)" : "none",
              boxShadow: hovered === `${f.name}-${f.subject}` ? `0 20px 40px ${T.shadowMd}` : `0 10px 30px ${T.shadow}`,
              border: `1px solid ${hovered === `${f.name}-${f.subject}` ? T.gold + "44" : "rgba(15,32,68,0.05)"}`,
              display: "flex",
              flexDirection: "column",
              animation: `fadeInUp .5s ${i * 0.05}s both`
            }}
          >
            <div style={{ marginBottom: 20, position: "relative", display: "inline-block", margin: "0 auto 24px" }}>
              <img 
                src={f.photo} 
                alt={f.name} 
                style={{ 
                  width: 120, 
                  height: 120, 
                  borderRadius: "50%", 
                  objectFit: "cover",
                  border: `3px solid ${T.gold}33`,
                  padding: 4
                }} 
              />
              <div style={{ 
                position: "absolute", 
                bottom: 5, 
                right: 5, 
                background: T.navy, 
                color: T.white, 
                width: 32, 
                height: 32, 
                borderRadius: "50%", 
                display: "grid", 
                placeItems: "center",
                fontSize: "1rem",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
              }}>🎓</div>
            </div>

            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: T.navy, marginBottom: 4, fontWeight: 700 }}>
              {f.name}
            </h4>
            <div style={{ color: T.gold, fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
              {f.role}
            </div>

            <div style={{ 
              background: "rgba(15,32,68,0.04)", 
              padding: "8px 16px", 
              borderRadius: 30, 
              display: "inline-block", 
              margin: "0 auto 20px",
              fontSize: "0.9rem",
              fontWeight: 700,
              color: T.navy2
            }}>
              Subject: {f.subject}
            </div>

            <div style={{ textAlign: "left", marginBottom: 20, flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: "0.85rem" }}>
                <span style={{ color: T.gray }}>Qualification:</span>
                <span style={{ fontWeight: 600, color: T.navy }}>{f.qualification}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: "0.85rem" }}>
                <span style={{ color: T.gray }}>Experience:</span>
                <span style={{ fontWeight: 600, color: T.navy }}>{f.experience}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: "0.85rem" }}>
                <span style={{ color: T.gray }}>Service:</span>
                <span style={{ fontWeight: 600, color: T.navy }}>{f.yearsOfService.split(' ')[0]} Yrs</span>
              </div>
            </div>

            <p style={{ color: T.gray, fontSize: "0.85rem", lineHeight: 1.6, fontStyle: "italic" }}>
              "{f.bio}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * ContactUs — enquiry card with name, email, phone, subject, message fields
 * and a gold Submit button. Sits between Faculty and Footer.
 */
export function ContactUs() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: "", enquiryType: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors]       = useState({});

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Please write your message";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", subject: "", enquiryType: "", message: "" });
  };

  const inputStyle = (err) => ({
    width: "100%",
    padding: "12px 16px",
    borderRadius: 8,
    border: `1.5px solid ${err ? T.red : "#e5e7eb"}`,
    fontSize: ".95rem",
    fontFamily: "'Inter', sans-serif",
    color: T.navy,
    background: "#f9fafb",
    outline: "none",
    transition: "all .2s ease",
    boxSizing: "border-box",
    textAlign: "left",
  });

  const labelStyle = {
    display: "block",
    fontSize: ".85rem",
    fontWeight: 600,
    color: T.navy,
    marginBottom: 8,
    letterSpacing: ".02em",
    textAlign: "left",
  };

  const errStyle = { color: T.red, fontSize: ".74rem", marginTop: 4 };

  return (
    <section
      id="contact"
      ref={ref}
      className="mobile-padding-x"
      style={{
        background: T.cream,
        padding: "88px 7%",
        opacity:   inView ? 1 : 0,
        transform: inView ? "none" : "translateY(32px)",
        transition: "all .7s ease",
      }}
    >
      <SectionHeader
        eyebrow="Get in Touch"
        title="Contact & Enquiries"
        sub="Have a question about admissions, academics, or anything else? Fill in the form below and we'll get back to you within one working day."
        center
      />

      <div
        className="mobile-stack"
        style={{
          maxWidth: 820,
          margin: "0 auto",
          background: T.white,
          borderRadius: 18,
          boxShadow: "0 8px 48px rgba(15,32,68,.10)",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "1fr 1.6fr",
        }}
      >
        {/* ── Left info panel ── */}
        <div
          style={{
            background: `linear-gradient(160deg, ${T.navy} 0%, ${T.navy2} 100%)`,
            padding: "44px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div>
            <div style={{ color: T.gold, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 10 }}>
              Reach Us
            </div>
            <p style={{ color: T.white, fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", lineHeight: 1.3 }}>
              St. Antony's<br />High School / College
            </p>
          </div>

          {[
            { icon: "📍", label: "Address",  val: "St. Antony's Catholic Church Mugatageri,\nPonnampet — 571216, Karnataka" },
            { icon: "📞", label: "Phone",    val: "+91 9448315531" },
            { icon: "✉️", label: "Email",    val: "info@stantonys.edu.in" },
            { icon: "🕐", label: "Office Hours", val: "Mon – Sat: 8:00 AM – 5:00 PM" },
          ].map(({ icon, label, val }) => (
            <div key={label} style={{ display: "flex", gap: 16, alignItems: "center", minHeight: 60 }}>
              <div
                style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: `rgba(201, 150, 58, 0.15)`, display: "grid", placeItems: "center",
                  fontSize: "1.2rem", flexShrink: 0,
                  border: `1px solid rgba(201, 150, 58, 0.2)`,
                }}
              >
                {icon}
              </div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ color: T.gold, fontSize: ".75rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 2, textAlign: "left" }}>{label}</div>
                <p style={{ color: "rgba(255,255,255,.9)", fontSize: ".9rem", lineHeight: 1.4, whiteSpace: "pre-line", textAlign: "left" }}>{val}</p>
              </div>
            </div>
          ))}

          {/* Social icons */}
          <div style={{ display: "flex", gap: 10, marginTop: "auto" }}>
            {["📘", "📷", "▶️"].map((ic, i) => (
              <div
                key={i}
                style={{
                  width: 34, height: 34, borderRadius: "50%",
                  background: "rgba(255,255,255,.1)", display: "grid",
                  placeItems: "center", cursor: "pointer", fontSize: ".9rem",
                  transition: "background .2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = `${T.gold}44`)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,.1)")}
              >
                {ic}
              </div>
            ))}
          </div>
        </div>

        {/* ── Right form panel ── */}
        <form onSubmit={handleSubmit} noValidate style={{ padding: "44px 36px", display: "flex", flexDirection: "column", gap: 18 }}>
          {submitted && (
            <div
              style={{
                background: "#f0fdf4", border: "1.5px solid #86efac",
                borderRadius: 10, padding: "14px 18px",
                color: "#166534", fontSize: ".88rem", fontWeight: 500,
                display: "flex", alignItems: "center", gap: 10,
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>✅</span>
              Thank you! We've received your message and will reply within one working day.
            </div>
          )}

          {/* Name + Phone — 2 col */}
          <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={labelStyle}>Full Name <span style={{ color: T.red }}>*</span></label>
              <input
                type="text" placeholder="Your full name" value={form.name}
                onChange={set("name")} style={inputStyle(errors.name)}
                onFocus={(e) => {
                  e.target.style.borderColor = T.gold;
                  e.target.style.background = "#fff";
                  e.target.style.boxShadow = `0 0 0 4px ${T.gold}15`;
                }}
                onBlur={(e)  => {
                  e.target.style.borderColor = errors.name ? T.red : "#e5e7eb";
                  e.target.style.background = "#f9fafb";
                  e.target.style.boxShadow = "none";
                }}
              />
              {errors.name && <p style={errStyle}>{errors.name}</p>}
            </div>
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input
                type="tel" placeholder="+91 00000 00000" value={form.phone}
                onChange={set("phone")} style={inputStyle(false)}
                onFocus={(e) => {
                  e.target.style.borderColor = T.gold;
                  e.target.style.background = "#fff";
                  e.target.style.boxShadow = `0 0 0 4px ${T.gold}15`;
                }}
                onBlur={(e)  => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.background = "#f9fafb";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label style={labelStyle}>Email Address <span style={{ color: T.red }}>*</span></label>
            <input
              type="email" placeholder="you@example.com" value={form.email}
              onChange={set("email")} style={inputStyle(errors.email)}
              onFocus={(e) => {
                e.target.style.borderColor = T.gold;
                e.target.style.background = "#fff";
                e.target.style.boxShadow = `0 0 0 4px ${T.gold}15`;
              }}
              onBlur={(e)  => {
                e.target.style.borderColor = errors.email ? T.red : "#e5e7eb";
                e.target.style.background = "#f9fafb";
                e.target.style.boxShadow = "none";
              }}
            />
            {errors.email && <p style={errStyle}>{errors.email}</p>}
          </div>

          {/* Enquiry type + Subject — 2 col */}
          <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={labelStyle}>Enquiry Type</label>
              <select
                value={form.enquiryType} onChange={set("enquiryType")}
                style={{ ...inputStyle(false), cursor: "pointer", background: "#fff" }}
                onFocus={(e) => (e.target.style.borderColor = T.gold)}
                onBlur={(e)  => (e.target.style.borderColor = "#d1d5db")}
              >
                <option value="">Select…</option>
                {["Admissions", "Fee Structure", "Scholarships", "Faculty", "Facilities", "General"].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Subject</label>
              <input
                type="text" placeholder="Brief subject" value={form.subject}
                onChange={set("subject")} style={inputStyle(false)}
                onFocus={(e) => (e.target.style.borderColor = T.gold)}
                onBlur={(e)  => (e.target.style.borderColor = "#d1d5db")}
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label style={labelStyle}>Message <span style={{ color: T.red }}>*</span></label>
            <textarea
              rows={5} placeholder="Write your message or question here…"
              value={form.message} onChange={set("message")}
              style={{ ...inputStyle(errors.message), resize: "vertical", minHeight: 140, textAlign: "left", verticalAlign: "top" }}
              onFocus={(e) => {
                e.target.style.borderColor = T.gold;
                e.target.style.background = "#fff";
                e.target.style.boxShadow = `0 0 0 4px ${T.gold}15`;
              }}
              onBlur={(e)  => {
                e.target.style.borderColor = errors.message ? T.red : "#e5e7eb";
                e.target.style.background = "#f9fafb";
                e.target.style.boxShadow = "none";
              }}
            />
            {errors.message && <p style={errStyle}>{errors.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            style={{
              background: T.gold,
              color: T.navy,
              border: "none",
              padding: "13px 32px",
              borderRadius: 9,
              fontSize: ".95rem",
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: ".03em",
              transition: "all .2s",
              marginTop: 4,
              alignSelf: "flex-start",
              boxShadow: `0 4px 14px ${T.gold}55`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = T.goldLt;
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = T.gold;
              e.currentTarget.style.transform = "none";
            }}
          >
            Send Message →
          </button>
        </form>
      </div>
    </section>
  );
}

/**
 * Footer — dark footer with brand, quick links, and contact info.
 */
export function Footer() {
  const footerHeadingStyle = {
    color: T.white,
    fontSize: "1rem",
    fontWeight: 700,
    letterSpacing: ".05em",
    textTransform: "uppercase",
    marginBottom: 24,
    position: "relative",
    display: "inline-block",
    paddingBottom: 8,
  };

  const footerLinkStyle = {
    color: "rgba(255,255,255,.65)",
    textDecoration: "none",
    fontSize: ".9rem",
    transition: "all .3s ease",
    display: "inline-block",
    marginBottom: 12,
  };

  const footerContactItemStyle = {
    display: "flex",
    gap: 12,
    alignItems: "flex-start",
    marginBottom: 16,
    color: "rgba(255,255,255,.7)",
    fontSize: ".9rem",
    lineHeight: 1.5,
  };

  return (
    <footer
      id="footer"
      style={{
        background: "#08152e",
        color: "rgba(255,255,255,.7)",
        padding: "80px 7% 40px",
        borderTop: `1px solid rgba(255,255,255,0.05)`,
      }}
    >
      <div
        className="mobile-stack"
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr 0.8fr 1.2fr",
          gap: 40,
          marginBottom: 60,
        }}
      >
        {/* 1. School Logo & About */}
        <div style={{ textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                border: `2px solid ${T.gold}`,
                overflow: "hidden",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
                background: T.white,
                boxShadow: `0 4px 12px rgba(0,0,0,0.3)`,
              }}
            >
              <img src={myLogo} alt="St. Antony's Logo" style={{ width: "85%", height: "85%", objectFit: "contain" }} />
            </div>
            <div>
              <span
                style={{
                  color: T.white,
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.4rem",
                  display: "block",
                  lineHeight: 1.1,
                  fontWeight: 700,
                }}
              >
                St. Antony's
              </span>
              <span
                style={{
                  color: T.gold,
                  fontSize: ".85rem",
                  fontWeight: 600,
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                  marginTop: 4,
                  display: "block",
                }}
              >
                High School / College
              </span>
            </div>
          </div>
          <p style={{ fontSize: ".95rem", lineHeight: 1.7, color: "rgba(255,255,255,0.7)", marginBottom: 28 }}>
            A premier institution committed to academic excellence, holistic growth, and producing
            leaders who make a difference — To Know, To Love, To Serve.
          </p>
          {/* Social Links */}
          <div style={{ display: "flex", gap: 12 }}>
            {[
              { icon: "📘", label: "Facebook" },
              { icon: "📷", label: "Instagram" },
              { icon: "🐦", label: "Twitter" },
              { icon: "▶️", label: "YouTube" }
            ].map((social, i) => (
              <a
                key={i}
                href="#"
                aria-label={social.label}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "10px",
                  background: "rgba(255,255,255,.05)",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  transition: "all .3s cubic-bezier(0.165, 0.84, 0.44, 1)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = T.gold;
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = `0 6px 15px ${T.gold}44`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,.05)";
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* 2. Quick Links */}
        <div style={{ textAlign: "left" }}>
          <h4 style={footerHeadingStyle}>
            Quick Links
            <div style={{ position: "absolute", bottom: 0, left: 0, width: 30, height: 2, background: T.gold }}></div>
          </h4>
          <ul style={{ listStyle: "none" }}>
            {["Home", "About Us", "Admissions", "Achievements", "Contact Us"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(" ", "")}`}
                  style={footerLinkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = T.gold;
                    e.currentTarget.style.transform = "translateX(5px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,.65)";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Academic Links */}
        <div style={{ textAlign: "left" }}>
          <h4 style={footerHeadingStyle}>
            Academics
            <div style={{ position: "absolute", bottom: 0, left: 0, width: 30, height: 2, background: T.gold }}></div>
          </h4>
          <ul style={{ listStyle: "none" }}>
            {["Science Stream", "Commerce Stream", "Arts Stream", "Curriculum", "Faculty"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  style={footerLinkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = T.gold;
                    e.currentTarget.style.transform = "translateX(5px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,.65)";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. Contact Information */}
        <div style={{ textAlign: "left" }}>
          <h4 style={footerHeadingStyle}>
            Contact Info
            <div style={{ position: "absolute", bottom: 0, left: 0, width: 30, height: 2, background: T.gold }}></div>
          </h4>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              { icon: "📍", text: "St. Antony's Catholic Church Mugatageri, Ponnampet — 571216, Karnataka" },
              { icon: "📞", text: "+91 9448315531" },
              { icon: "✉️", text: "info@stantonys.edu.in" },
              { icon: "🕐", text: "Mon – Sat: 8:00 AM – 5:00 PM" }
            ].map((item, i) => (
              <div key={i} style={footerContactItemStyle}>
                <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,.08)",
          paddingTop: 32,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <p style={{ fontSize: ".9rem", color: "rgba(255,255,255,0.5)" }}>
          © {new Date().getFullYear()}{" "}
          <span style={{ color: T.gold, fontWeight: 600 }}>St. Antony's Institution, Ponnampet</span>. All rights
          reserved.
        </p>
        <div style={{ display: "flex", gap: 24 }}>
          <a href="#" style={{ fontSize: ".85rem", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Privacy Policy</a>
          <a href="#" style={{ fontSize: ".85rem", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Terms of Service</a>
          <p style={{ fontSize: ".85rem", color: "rgba(255,255,255,0.4)" }}>Designed with ❤️ for Excellence</p>
        </div>
      </div>
    </footer>
  );
}
