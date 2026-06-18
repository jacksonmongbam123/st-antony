/* ═══════════════════════════════════════════════════════════
   components.jsx
   All custom hooks and UI components for the St. Antony's
   website. Imports data & tokens from ./data.js.
═══════════════════════════════════════════════════════════ */

import { useState, useEffect, useRef, useCallback } from "react";
import {
  T,
  NAV_LINKS,
  HERO_SLIDES,
  ADMISSION_DATA,
  CLASS_DATA,
  ACHIEVEMENT_DATA,
  FACULTY_DATA,
} from "./data";

import myLogo from './assets/logo2.png';
import cImg from './assets/school.jpeg';

// ══════════════════════════════════════════════════════════
// HOOKS
// ══════════════════════════════════════════════════════════

/**
 * useInView — fires once when the ref'd element enters the viewport.
 * Used to trigger scroll-reveal animations section by section.
 */
export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

/**
 * useScrollSpy — tracks which section id is currently in view
 * and returns it, driving the active state in the Navbar.
 */
export function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const handler = () => {
      const sections = ids.map((id) => document.getElementById(id));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.getBoundingClientRect().top <= 80) {
          setActive(ids[i]);
          return;
        }
      }
      setActive(ids[0]);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [ids]);

  return active;
}

// ══════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ══════════════════════════════════════════════════════════

/**
 * FacultyAvatar — colour-coded initials circle with degree badge.
 * Rendered both on the grid card and inside the modal.
 */
export function FacultyAvatar({ faculty, size = 84, fontSize = "1.5rem" }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${faculty.avatarColor}, ${faculty.avatarColor}cc)`,
        display: "grid",
        placeItems: "center",
        border: `4px solid ${T.gold}`,
        flexShrink: 0,
        fontSize,
        color: T.white,
        fontWeight: 700,
        fontFamily: "'Playfair Display', serif",
        boxShadow: `0 4px 16px ${faculty.avatarColor}55`,
        position: "relative",
      }}
    >
      {faculty.avatarInitials}
      <div
        style={{
          position: "absolute",
          bottom: -4,
          right: -4,
          background: T.gold,
          border: `2px solid ${T.white}`,
          borderRadius: 12,
          padding: "2px 7px",
          fontSize: ".6rem",
          color: T.navy,
          fontWeight: 700,
        }}
      >
        {faculty.degree}
      </div>
    </div>
  );
}

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
          fontSize: "clamp(1.7rem,3.5vw,2.5rem)",
          color: dark ? T.white : T.navy,
          marginBottom: sub ? 16 : 0,
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : "translateY(16px)",
          transition: "all .55s .2s",
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
            margin: center ? "12px auto 0" : "12px 0 0",
            opacity: inView ? 1 : 0,
            transform: inView ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: center ? "center" : "left",
            transition: "all .5s .35s",
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
          height: 72,
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
            gap: 10,
            cursor: "pointer",
            minWidth: 0,
            flex: 1,
          }}
          onClick={() => scrollTo("hero")}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: `2.5px solid ${T.gold}`,
              overflow: "hidden",
              display: "grid",
              placeItems: "center",
              background: T.white,
              flexShrink: 0,
              boxShadow: `0 0 0 3px ${T.gold}22`,
              animation: "pulse 3s infinite",
            }}
          >
            <img src={myLogo} alt="St. Antony's Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div className="desktop-only">
            <div style={{ color: T.navy, fontSize: ".82rem", fontWeight: 700, lineHeight: 1.2 }}>
              St. Antony's
            </div>
            <div style={{ color: T.gray, fontSize: ".7rem", fontWeight: 400, marginLeft: 4 }}>
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
                  fontSize: ".84rem",
                  fontWeight: active === l.href ? 700 : 500,
                  letterSpacing: ".04em",
                  padding: "6px 2px",
                  position: "relative",
                  transition: "color .25s",
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
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 6,
              padding: "8px 12px",
              zIndex: 1001,
              marginRight: "-8px"
            }}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 28,
                  height: 3,
                  background: T.navy,
                  borderRadius: 2,
                  transition: "all .3s",
                  transform: mobileOpen
                    ? i === 0
                      ? "rotate(45deg) translate(6px,6px)"
                      : i === 1
                      ? "scaleX(0)"
                      : "rotate(-45deg) translate(6px,-6px)"
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
            top: 72,
            left: 0,
            right: 0,
            background: T.white,
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            maxHeight: "calc(100vh - 72px)",
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
        marginTop: 72,
        position: "relative",
        height: "calc(100vh - 72px)",
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
              color: T.gold,
              fontSize: ".78rem",
              fontWeight: 600,
              letterSpacing: ".16em",
              textTransform: "uppercase",
              marginBottom: 16,
              animation: "fadeInUp .5s .1s both",
            }}
          >
            {slide.eyebrow}
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem,5vw,3.4rem)",
              color: T.white,
              lineHeight: 1.15,
              marginBottom: 20,
              animation: "fadeInUp .55s .2s both",
            }}
          >
            {slide.title[0]}
            <br />
            <em style={{ color: T.goldLt, fontStyle: "normal" }}>{slide.title[1]}</em>
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,.78)",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              marginBottom: 36,
              maxWidth: 520,
              animation: "fadeInUp .55s .32s both",
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
              padding: "14px 32px",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: ".95rem",
              cursor: "pointer",
              animation: "fadeInUp .55s .44s both",
              transition: "all .2s",
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
              width: 4,
              height: i === cur ? 36 : 18,
              borderRadius: 4,
              border: "none",
              background: i === cur ? T.gold : "rgba(255,255,255,.35)",
              cursor: "pointer",
              transition: "all .4s ease",
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
            width: "clamp(44px, 6vw, 56px)",
            height: "clamp(44px, 6vw, 56px)",
            borderRadius: "50%",
            border: "2px solid rgba(255,255,255,.35)",
            background: "rgba(255,255,255,.08)",
            backdropFilter: "blur(4px)",
            color: T.white,
            fontSize: "clamp(1rem, 1.5vw, 1.4rem)",
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
    <section id="vision" style={{ background: T.white, padding: "80px 7%" }}>
      <SectionHeader eyebrow="Who We Are" title="Vision & Mission" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: 32,
        }}
      >
        {CARDS.map((c, i) => {
          const [ref, inView] = useInView();
          return (
            <div
              key={i}
              ref={ref}
              style={{
                background: T.cream,
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(15,32,68,.10)",
                transition: "transform .3s, box-shadow .3s",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(24px)",
                transitionDelay: `${i * 0.15}s`,
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
              <div style={{ height: 180, background: c.bg, display: "grid", placeItems: "center" }}>
                <span style={{ fontSize: "3.5rem" }}>{c.icon}</span>
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
                  {c.tag}
                </span>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.3rem",
                    marginBottom: 10,
                  }}
                >
                  {c.title}
                </h3>
                <p style={{ color: T.gray, fontSize: ".93rem", lineHeight: 1.75 }}>{c.body}</p>
              </div>
            </div>
          );
        })}
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
                    padding: "22px 22px 14px",
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 12,
                      background: d.bg,
                      display: "grid",
                      placeItems: "center",
                      fontSize: "1.5rem",
                      flexShrink: 0,
                    }}
                  >
                    {d.icon}
                  </div>
                  <div>
                    <h4
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.05rem",
                        color: T.navy,
                        marginBottom: 4,
                      }}
                    >
                      {d.title}
                    </h4>
                    <p style={{ color: T.gray, fontSize: ".8rem" }}>{d.subtitle}</p>
                  </div>
                </div>
                <div style={{ height: 1, background: T.light, margin: "0 22px" }} />
                <div style={{ padding: "16px 22px 22px" }}>
                  {d.rows.map((r, j) => (
                    <div
                      key={j}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        padding: "9px 0",
                        borderBottom: j < d.rows.length - 1 ? "1px dashed #e5e7eb" : "none",
                        gap: 12,
                      }}
                    >
                      <span style={{ color: T.gray, fontSize: ".8rem", fontWeight: 500 }}>
                        {r.label}
                      </span>
                      <span
                        style={{
                          color: r.hi ? T.gold : T.navy,
                          fontSize: r.hi ? ".94rem" : ".84rem",
                          fontWeight: 600,
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
          style={{
            background: T.white,
            borderRadius: 12,
            boxShadow: "0 4px 24px rgba(15,32,68,.10)",
            overflow: "hidden",
            animation: "fadeIn .35s ease",
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
              padding: "40px 36px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h4
              style={{
                color: T.white,
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.4rem",
                marginBottom: 16,
                lineHeight: 1.3,
                animation: "fadeInUp .5s .25s both",
              }}
            >
              {slide.title}
            </h4>
            <p
              style={{
                color: "rgba(255,255,255,.7)",
                fontSize: ".93rem",
                lineHeight: 1.75,
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
  const [deptFilter, setDeptFilter] = useState("All");
  const [modal, setModal] = useState(null);
  const [hovered, setHovered] = useState(null);

  const depts = ["All", ...new Set(FACULTY_DATA.map((f) => f.dept))];
  const visible =
    deptFilter === "All" ? FACULTY_DATA : FACULTY_DATA.filter((f) => f.dept === deptFilter);

  return (
    <section id="faculty" style={{ background: T.cream, padding: "80px 7%" }}>
      <SectionHeader
        eyebrow="Our Educators"
        title="Faculty Information"
        sub="Meet the passionate educators who shape every student's journey at St. Antony's."
      />

      {/* Department filter pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
        {depts.map((d) => (
          <button
            key={d}
            onClick={() => setDeptFilter(d)}
            style={{
              padding: "8px 18px",
              borderRadius: 30,
              border: `1.5px solid ${deptFilter === d ? T.navy : "#cbd5e1"}`,
              background: deptFilter === d ? T.navy : T.white,
              color: deptFilter === d ? T.white : T.navy,
              fontSize: ".82rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all .25s",
            }}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Faculty card grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
          gap: 28,
        }}
      >
        {visible.map((f, i) => (
          <div
            key={f.id}
            onClick={() => setModal(f)}
            onMouseEnter={() => setHovered(f.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: T.white,
              borderRadius: 12,
              padding: "28px 20px",
              textAlign: "center",
              cursor: "pointer",
              transition: "transform .3s, box-shadow .3s",
              transform: hovered === f.id ? "translateY(-10px)" : "none",
              boxShadow:
                hovered === f.id
                  ? "0 20px 50px rgba(15,32,68,.18)"
                  : "0 4px 24px rgba(15,32,68,.10)",
              animation: `fadeInUp .5s ${i * 0.07}s both`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <FacultyAvatar faculty={f} />
            </div>
            <h4
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.05rem",
                marginBottom: 4,
              }}
            >
              {f.name}
            </h4>
            <div
              style={{
                color: T.gold,
                fontSize: ".74rem",
                fontWeight: 600,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              {f.role}
            </div>
            <div
              style={{
                display: "inline-block",
                background: "#e0f2fe",
                color: "#0369a1",
                padding: "3px 10px",
                borderRadius: 20,
                fontSize: ".72rem",
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              {f.deptTag}
            </div>
            <p style={{ color: T.gray, fontSize: ".83rem", lineHeight: 1.65, marginBottom: 14 }}>
              {f.bio.slice(0, 90)}…
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 5,
                marginBottom: 16,
              }}
            >
              {f.subjects.map((s) => (
                <span
                  key={s}
                  style={{
                    background: "#f1f5f9",
                    color: T.navy,
                    fontSize: ".7rem",
                    fontWeight: 500,
                    padding: "3px 8px",
                    borderRadius: 4,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setModal(f);
              }}
              style={{
                width: "100%",
                padding: "9px",
                borderRadius: 8,
                border: `1.5px solid ${hovered === f.id ? T.navy : "#cbd5e1"}`,
                background: hovered === f.id ? T.navy : "transparent",
                color: hovered === f.id ? T.white : T.navy,
                fontSize: ".82rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all .25s",
              }}
            >
              View Full Profile
            </button>
          </div>
        ))}
      </div>

      {/* Faculty detail modal */}
      {modal && (
        <div
          onClick={() => setModal(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,32,68,.72)",
            zIndex: 2000,
            display: "grid",
            placeItems: "center",
            backdropFilter: "blur(6px)",
            animation: "fadeIn .3s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: T.white,
              borderRadius: 16,
              width: "min(700px,92vw)",
              maxHeight: "88vh",
              overflowY: "auto",
              padding: "40px",
              position: "relative",
              boxShadow: "0 24px 64px rgba(15,32,68,.3)",
              animation: "scaleIn .35s ease",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setModal(null)}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                width: 34,
                height: 34,
                borderRadius: "50%",
                border: "1.5px solid #cbd5e1",
                background: T.white,
                cursor: "pointer",
                fontSize: ".9rem",
                color: T.gray,
                display: "grid",
                placeItems: "center",
                transition: "all .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = T.navy;
                e.currentTarget.style.color = T.white;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = T.white;
                e.currentTarget.style.color = T.gray;
              }}
            >
              ✕
            </button>

            {/* Header */}
            <div
              style={{ display: "flex", gap: 24, marginBottom: 28, flexWrap: "wrap" }}
            >
              <FacultyAvatar faculty={modal} size={96} fontSize="2rem" />
              <div>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.5rem",
                    marginBottom: 4,
                  }}
                >
                  {modal.name}
                </h2>
                <div
                  style={{
                    color: T.gold,
                    fontSize: ".8rem",
                    fontWeight: 700,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  {modal.role}
                </div>
                <span
                  style={{
                    display: "inline-block",
                    background: "#e0f2fe",
                    color: "#0369a1",
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: ".76rem",
                    fontWeight: 600,
                  }}
                >
                  {modal.deptTag}
                </span>
              </div>
            </div>

            {/* Stats row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 14,
                marginBottom: 24,
              }}
            >
              {[
                ["Years Teaching", modal.stats.years + "+"],
                ["Publications", modal.stats.papers],
                ["Students Taught", modal.stats.students.toLocaleString() + "+"],
              ].map(([lbl, val]) => (
                <div
                  key={lbl}
                  style={{
                    background: T.light,
                    borderRadius: 10,
                    padding: 14,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.5rem",
                      color: T.navy,
                      fontWeight: 700,
                    }}
                  >
                    {val}
                  </div>
                  <div style={{ color: T.gray, fontSize: ".72rem", marginTop: 2 }}>{lbl}</div>
                </div>
              ))}
            </div>

            {/* Detail sections */}
            {[
              {
                title: "About",
                content: (
                  <p style={{ color: T.gray, fontSize: ".9rem", lineHeight: 1.7 }}>{modal.bio}</p>
                ),
              },
              {
                title: "Classes Handled",
                content: (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {modal.classes.map((c) => (
                      <span
                        key={c}
                        style={{
                          background: T.navy,
                          color: T.white,
                          padding: "6px 14px",
                          borderRadius: 8,
                          fontSize: ".8rem",
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                ),
              },
              {
                title: "Subjects Taught",
                content: (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {modal.subjects.map((s) => (
                      <span
                        key={s}
                        style={{
                          background: "#f1f5f9",
                          color: T.navy,
                          padding: "5px 12px",
                          borderRadius: 6,
                          fontSize: ".8rem",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                ),
              },
              {
                title: "Notable Achievements",
                content: (
                  <p style={{ color: T.gray, fontSize: ".9rem", lineHeight: 1.7 }}>
                    {modal.achievements}
                  </p>
                ),
              },
              {
                title: "Contact & Office",
                content: (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      ["✉️", modal.email, `mailto:${modal.email}`],
                      ["📞", modal.phone, `tel:${modal.phone}`],
                      ["📍", modal.office, null],
                    ].map(([icon, val, href]) => (
                      <a
                        key={val}
                        href={href || undefined}
                        style={{
                          display: "flex",
                          gap: 10,
                          color: T.navy,
                          fontSize: ".87rem",
                          textDecoration: "none",
                          transition: "color .2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = T.gold)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = T.navy)}
                      >
                        <span>{icon}</span>
                        <span>{val}</span>
                      </a>
                    ))}
                  </div>
                ),
              },
            ].map(({ title, content }) => (
              <div key={title} style={{ marginBottom: 24 }}>
                <h5
                  style={{
                    fontSize: ".72rem",
                    fontWeight: 700,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: T.gray,
                    marginBottom: 12,
                    paddingBottom: 6,
                    borderBottom: `1px solid ${T.light}`,
                  }}
                >
                  {title}
                </h5>
                {content}
              </div>
            ))}
          </div>
        </div>
      )}
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
    padding: "11px 14px",
    borderRadius: 8,
    border: `1.5px solid ${err ? T.red : "#d1d5db"}`,
    fontSize: ".9rem",
    fontFamily: "'Inter', sans-serif",
    color: T.navy,
    background: "#fff",
    outline: "none",
    transition: "border-color .2s",
    boxSizing: "border-box",
  });

  const labelStyle = {
    display: "block",
    fontSize: ".78rem",
    fontWeight: 600,
    color: T.navy,
    marginBottom: 6,
    letterSpacing: ".04em",
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
            <div key={label} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: `${T.gold}22`, display: "grid", placeItems: "center",
                  fontSize: "1rem", flexShrink: 0, marginTop: 2,
                }}
              >
                {icon}
              </div>
              <div>
                <div style={{ color: T.gold, fontSize: ".7rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 3 }}>{label}</div>
                <p style={{ color: "rgba(255,255,255,.8)", fontSize: ".84rem", lineHeight: 1.6, whiteSpace: "pre-line" }}>{val}</p>
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
                onFocus={(e) => (e.target.style.borderColor = T.gold)}
                onBlur={(e)  => (e.target.style.borderColor = errors.name ? T.red : "#d1d5db")}
              />
              {errors.name && <p style={errStyle}>{errors.name}</p>}
            </div>
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input
                type="tel" placeholder="+91 00000 00000" value={form.phone}
                onChange={set("phone")} style={inputStyle(false)}
                onFocus={(e) => (e.target.style.borderColor = T.gold)}
                onBlur={(e)  => (e.target.style.borderColor = "#d1d5db")}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label style={labelStyle}>Email Address <span style={{ color: T.red }}>*</span></label>
            <input
              type="email" placeholder="you@example.com" value={form.email}
              onChange={set("email")} style={inputStyle(errors.email)}
              onFocus={(e) => (e.target.style.borderColor = T.gold)}
              onBlur={(e)  => (e.target.style.borderColor = errors.email ? T.red : "#d1d5db")}
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
              style={{ ...inputStyle(errors.message), resize: "vertical", minHeight: 110 }}
              onFocus={(e) => (e.target.style.borderColor = T.gold)}
              onBlur={(e)  => (e.target.style.borderColor = errors.message ? T.red : "#d1d5db")}
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
  return (
    <footer
      id="footer"
      style={{ background: "#08152e", color: "rgba(255,255,255,.7)", padding: "60px 7% 28px" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: 48,
          marginBottom: 48,
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                border: `2px solid ${T.gold}`,
                overflow: "hidden",
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
                background: T.white,
              }}
            >
              <img src={myLogo} alt="St. Antony's Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <span
                style={{
                  color: T.white,
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.05rem",
                  display: "block",
                  lineHeight: 1.25,
                }}
              >
                St. Antony's
              </span>
              <span
                style={{
                  color: T.gold,
                  fontSize: ".78rem",
                  fontWeight: 600,
                  letterSpacing: ".04em",
                }}
              >
                High School / College
              </span>
            </div>
          </div>
          <p style={{ fontSize: ".88rem", lineHeight: 1.75, maxWidth: 300 }}>
            A premier institution committed to academic excellence, holistic growth, and producing
            leaders who make a difference — To Know, To Love, To Serve.
          </p>
          <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
            {["📘", "📷", "🐦", "▶️"].map((icon, i) => (
              <div
                key={i}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,.08)",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                  fontSize: "1rem",
                  transition: "background .2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = `${T.gold}33`)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,.08)")}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4
            style={{
              color: T.white,
              fontSize: ".82rem",
              fontWeight: 700,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              marginBottom: 18,
              paddingBottom: 10,
              borderBottom: "1px solid rgba(255,255,255,.1)",
            }}
          >
            About
          </h4>
          <ul style={{ listStyle: "none" }}>
            {["Our History", "Vision & Mission", "Leadership Team", "Accreditations", "Campus Life"].map(
              (item) => (
                <li key={item} style={{ marginBottom: 9 }}>
                  <a
                    href="#"
                    style={{
                      color: "rgba(255,255,255,.6)",
                      textDecoration: "none",
                      fontSize: ".87rem",
                      transition: "color .2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = T.gold)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,.6)")}
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4
            style={{
              color: T.white,
              fontSize: ".82rem",
              fontWeight: 700,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              marginBottom: 18,
              paddingBottom: 10,
              borderBottom: "1px solid rgba(255,255,255,.1)",
            }}
          >
            Contact
          </h4>
          {[
            ["📍", "St. Antony's Catholic Church Mugatageri, Ponnampet — 571216, Karnataka"],
            ["📞", "+91 9448315531"],
            ["✉️", "info@stantonys.edu.in"],
            ["🕐", "Mon–Sat: 8:00 AM – 5:00 PM"],
          ].map(([icon, text]) => (
            <p key={text} style={{ fontSize: ".87rem", lineHeight: 1.8, marginBottom: 4 }}>
              {icon} {text}
            </p>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,.08)",
          paddingTop: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <p style={{ fontSize: ".82rem" }}>
          © {new Date().getFullYear()}{" "}
          <span style={{ color: T.gold }}>St. Antony's High School / College, Ponnampet</span>. All rights
          reserved.
        </p>
        <p style={{ fontSize: ".78rem" }}>Designed by Mack, Jack &amp; Anil</p>
      </div>
    </footer>
  );
}
