/* ═══════════════════════════════════════════════════════════
   data.js
   Central store for all design tokens, static content,
   and seed data used across the St. Antony's website.
═══════════════════════════════════════════════════════════ */
// ── DESIGN TOKENS ──────────────────────────────────────────
export const T = {
  navy:   "#0f2044",
  navy2:  "#1e3a6e",
  gold:   "#c9963a",
  goldLt: "#f0c96e",
  cream:  "#f8f5ef",
  white:  "#ffffff",
  gray:   "#6b7280",
  light:  "#f1f3f7",
  red:    "#c0392b",
  shadow: "rgba(15, 32, 68, 0.08)",
  shadowMd: "rgba(15, 32, 68, 0.12)",
  radius: 12,
  radiusLg: 20,
};

// ── GLOBAL CSS (injected once in App) ──────────────────────
export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; overflow-x: hidden; max-width: 100%; }
  body { font-family: 'Inter', sans-serif; background: #f8f5ef; color: #0f2044; overflow-x: hidden; max-width: 100vw; position: relative; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
  #root { overflow-x: hidden; max-width: 100vw; }

  h1, h2, h3, h4, h5, h6 { font-family: 'Playfair Display', serif; }
  p { line-height: 1.6; }

  @keyframes shimmer {
    0%   { background-position: -700px 0; }
    100% { background-position:  700px 0; }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.92); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(201,150,58,0.4); }
    50%       { box-shadow: 0 0 0 10px rgba(201,150,58,0); }
  }

  .skeleton {
    background: linear-gradient(90deg, #e2e8f0 25%, #f0f4f8 50%, #e2e8f0 75%);
    background-size: 700px 100%;
    animation: shimmer 1.4s infinite linear;
    border-radius: 6px;
  }
  .animate-fadeInUp { animation: fadeInUp .55s ease both; }
  .animate-scaleIn  { animation: scaleIn .4s ease both; }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #f1f3f7; }
  ::-webkit-scrollbar-thumb { background: #c9963a; border-radius: 3px; }

  .nav-active::after {
    content: ''; position: absolute; bottom: 0; left: 0;
    width: 100%; height: 3px; background: #c9963a; border-radius: 3px;
    box-shadow: 0 1px 4px rgba(201, 150, 58, 0.4);
  }

  button:active { transform: scale(0.98); }
  input:focus, select:focus, textarea:focus { background: #fff !important; }

  /* Responsive Utilities */
  .desktop-only { display: flex !important; }
  .mobile-only { display: none !important; }

  @media (max-width: 768px) {
    .desktop-only { display: none !important; }
    .mobile-only { display: flex !important; }
    body { overflow-x: hidden; }
    
    .mobile-stack { 
      grid-template-columns: 1fr !important;
      gap: 32px !important;
    }
    
    .mobile-padding-x {
      padding-left: 16px !important;
      padding-right: 16px !important;
    }

    .mobile-nav-height {
      height: 56px !important;
    }
    
    nav {
      height: 56px !important;
      padding: 0 16px !important;
    }
    
    #hero {
      margin-top: 56px !important;
      height: calc(100vh - 56px) !important;
    }

    .mobile-nav-overlay {
      top: 56px !important;
      max-height: calc(100vh - 56px) !important;
    }

    /* Allow wide tables to scroll horizontally instead of overflowing the page */
    .table-scroll {
      overflow-x: auto !important;
      -webkit-overflow-scrolling: touch;
    }
    .table-scroll table { min-width: 520px; }
  }

  /* Default table wrapper behaviour (desktop + mobile) */
  .table-scroll { overflow-x: auto; }
`;

// ── NAVIGATION ─────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home",         href: "hero" },
  { label: "About",        href: "vision" },
  { label: "Performance",  href: "academic-performance" },
  { label: "Admissions",   href: "admissions" },
  { label: "Achievements", href: "achievements" },
  { label: "Faculty",      href: "faculty" },
  { label: "Contact",      href: "contact" },
];

// ── HERO SLIDES ────────────────────────────────────────────
export const HERO_SLIDES = [
  {
    image:    "./school.jpeg",
    overlay:  "linear-gradient(135deg,rgba(70, 71, 71, 0.78) 0%,rgba(218, 221, 227, 0.55) 100%)",
    eyebrow:  "Est. 1986 · High School & PUC",
    title:    ["Shaping Minds,", "Building Futures"],
    desc:     "St. Antony's Institution nurtures curiosity and excellence across High School (8th-10th) and Pre-University (PUC) levels.",
    cta:      { label: "Apply Now", href: "admissions" },
    accent:   "#4e7fd4",
  },
  {
    image:    "./Lab3.jpeg",
    overlay:  "linear-gradient(135deg,rgba(13,74,60,0.80) 0%,rgba(220, 225, 224, 0.55) 100%)",
    eyebrow:  "Excellence in Education",
    title:    ["Holistic Growth,", "Academic Rigor"],
    desc:     "From foundational high school years to specialized PUC streams, we provide a complete educational journey.",
    cta:      { label: "Meet Our Faculty", href: "faculty" },
    accent:   "#2fa0d8",
  },
];

// ── ADMISSIONS ─────────────────────────────────────────────
export const ADMISSION_DATA = [
  {
    icon: "🏫", bg: "#eff6ff",
    title: "High School Admission",
    subtitle: "Classes 8th, 9th, and 10th Standard",
    rows: [
      { label: "Application Starts", value: "March 1st, 2026" },
      { label: "Eligibility",        value: "Previous class pass" },
      { label: "Entrance Test",      value: "Aptitude Based" },
      { label: "Medium",             value: "English / Kannada" },
    ],
  },
  {
    icon: "🏛️", bg: "#f0fdf4",
    title: "PUC Admission",
    subtitle: "1st PUC & 2nd PUC (Class 11 & 12)",
    rows: [
      { label: "Science Streams",    value: "PCMB, PCMC" },
      { label: "Commerce Streams",   value: "EBAC, HEBA" },
      { label: "Arts Streams",       value: "HEPS" },
      { label: "SSLC Cut-off",       value: "Min 60% aggregate" },
    ],
  },
  {
    icon: "💰", bg: "#fffbeb",
    title: "Fee Structure",
    subtitle: "Competitive and transparent pricing",
    rows: [
      { label: "High School",        value: "₹22,000 / yr" },
      { label: "PUC Science",        value: "₹48,000 / yr" },
      { label: "PUC Commerce/Arts",  value: "₹35,000 / yr" },
      { label: "Scholarships",       value: "Merit-based available" },
    ],
  },
  {
    icon: "🎓", bg: "#faf5ff",
    title: "Programmes",
    subtitle: "Diverse educational paths",
    rows: [
      { label: "Academic",           value: "KSEEB & PUE Board" },
      { label: "Co-Curricular",      value: "Sports, Arts, Music" },
      { label: "Infrastructure",     value: "Modern Labs & Library" },
      { label: "Hostel",             value: "Available for Boys/Girls" },
    ],
  },
];

// ── CLASS & SUBJECTS ───────────────────────────────────────
export const CLASS_DATA = [
  {
    label: "High School (8th-10th)",
    rows: [
      { subject: "Mathematics",   code: "HS-MTH", periods: 6, teacher: "Mr. Ramesh K.",      emoji: "📐" },
      { subject: "Science",       code: "HS-SCI", periods: 6, teacher: "Ms. Savitha M.",     emoji: "🧪" },
      { subject: "Social Science", code: "HS-SOC", periods: 5, teacher: "Mr. Prakash G.",     emoji: "🌍" },
      { subject: "English",       code: "HS-ENG", periods: 5, teacher: "Ms. Mary D.",        emoji: "📖" },
      { subject: "Kannada/Hindi", code: "HS-LAN", periods: 4, teacher: "Mr. Shivu L.",       emoji: "🗣️" },
    ],
  },
  {
    label: "PUC Science",
    rows: [
      { subject: "Physics",       code: "PU-PHY", periods: 5, teacher: "Dr. Rajan Mehta",      emoji: "👨‍🏫" },
      { subject: "Chemistry",     code: "PU-CHE", periods: 5, teacher: "Ms. Priya Nair",        emoji: "👩‍🔬" },
      { subject: "Mathematics",   code: "PU-MAT", periods: 6, teacher: "Mr. Aarav Singh",       emoji: "👨‍💻" },
      { subject: "Biology/CS",    code: "PU-BIO", periods: 4, teacher: "Dr. Sunita Rao",        emoji: "👩‍🏫" },
    ],
  },
];

// ── ACHIEVEMENTS ───────────────────────────────────────────
export const ACHIEVEMENT_DATA = [
  {
    id: "academic", label: "🎓 Academic",
    slides: [
      { medal: "🥇", year: "2024", title: "100% Result in SSLC", color: "#1a4a7a",
        desc: "Our 10th Standard students achieved a perfect 100% pass rate for the 5th consecutive year." },
      { medal: "🥈", year: "2024", title: "Top PUC Ranks", color: "#1a3a6a",
        desc: "St. Antony's secured 12 distinctions in the 2nd PUC State Board Examinations." },
    ],
  },
  {
    id: "sports", label: "🏆 Sports",
    slides: [
      { medal: "🥇", year: "2024", title: "District Level Kabaddi", color: "#0d4a3c",
        desc: "High School boys' team won the gold at the District Level Kabaddi Championship." },
    ],
  },
];

// ── FACULTY ────────────────────────────────────────────────
const generateFaculty = (name, subject, role, qualification, experience, yearsOfService) => ({
  name,
  subject,
  role,
  qualification,
  experience: `${experience} Years`,
  yearsOfService: `${yearsOfService} Years at St. Antony's`,
  bio: `Expert in ${subject} with a passion for student-centric learning and academic excellence.`,
  photo: `https://i.pravatar.cc/150?u=${name.replace(/\s+/g, '')}`
});

export const FACULTY_DATA = {
  highSchool: {
    "8th Standard": [
      generateFaculty("Mr. Ramesh K.", "Mathematics", "Senior Teacher", "MSc, BEd", 15, 10),
      generateFaculty("Ms. Savitha M.", "Science", "HOD High School", "MSc, BEd", 12, 8),
      generateFaculty("Mr. Prakash G.", "Social Science", "Senior Teacher", "MA, BEd", 18, 12),
      generateFaculty("Ms. Mary D.", "English", "Language Head", "MA, BEd", 14, 9),
      generateFaculty("Mr. Shivu L.", "Kannada", "Senior Teacher", "MA, BEd", 20, 15),
      generateFaculty("Mr. Vinay P.", "Hindi", "Teacher", "MA, BEd", 8, 5),
      generateFaculty("Mr. Raju S.", "Physical Education", "PET", "BPEd", 10, 6),
    ],
    "9th Standard": [
      generateFaculty("Mr. Ramesh K.", "Mathematics", "Senior Teacher", "MSc, BEd", 15, 10),
      generateFaculty("Ms. Savitha M.", "Science", "HOD High School", "MSc, BEd", 12, 8),
      generateFaculty("Mr. Prakash G.", "Social Science", "Senior Teacher", "MA, BEd", 18, 12),
      generateFaculty("Ms. Mary D.", "English", "Language Head", "MA, BEd", 14, 9),
      generateFaculty("Mr. Shivu L.", "Kannada", "Senior Teacher", "MA, BEd", 20, 15),
      generateFaculty("Mr. Vinay P.", "Hindi", "Teacher", "MA, BEd", 8, 5),
      generateFaculty("Mr. Raju S.", "Physical Education", "PET", "BPEd", 10, 6),
    ],
    "10th Standard": [
      generateFaculty("Mr. Ramesh K.", "Mathematics", "Senior Teacher", "MSc, BEd", 15, 10),
      generateFaculty("Ms. Savitha M.", "Science", "HOD High School", "MSc, BEd", 12, 8),
      generateFaculty("Mr. Prakash G.", "Social Science", "Senior Teacher", "MA, BEd", 18, 12),
      generateFaculty("Ms. Mary D.", "English", "Language Head", "MA, BEd", 14, 9),
      generateFaculty("Mr. Shivu L.", "Kannada", "Senior Teacher", "MA, BEd", 20, 15),
      generateFaculty("Mr. Vinay P.", "Hindi", "Teacher", "MA, BEd", 8, 5),
      generateFaculty("Mr. Raju S.", "Physical Education", "PET", "BPEd", 10, 6),
    ],
  },
  puc: {
    "1st PUC": {
      "Science Stream": [
        generateFaculty("Dr. Rajan Mehta", "Physics", "HOD Science", "PhD", 22, 15),
        generateFaculty("Ms. Priya Nair", "Chemistry", "Senior Lecturer", "MSc", 12, 7),
        generateFaculty("Mr. Aarav Singh", "Mathematics", "Senior Lecturer", "MTech", 10, 5),
        generateFaculty("Dr. Sunita Rao", "Biology", "Senior Lecturer", "PhD", 16, 10),
        generateFaculty("Prof. Ananya K.", "Computer Science", "HOD CS", "MTech", 14, 8),
        generateFaculty("Ms. Clara F.", "English", "Senior Lecturer", "MA", 11, 6),
        generateFaculty("Mr. Somu G.", "Physical Education", "PET", "MPEd", 15, 10),
      ],
      "Commerce Stream": [
        generateFaculty("Mr. Vikram Joshi", "Accountancy", "HOD Commerce", "MBA, CA", 18, 12),
        generateFaculty("Ms. Rekha Pillai", "Business Studies", "Senior Lecturer", "MBA", 12, 8),
        generateFaculty("Dr. Kiran Bose", "Economics", "Senior Lecturer", "PhD", 15, 9),
        generateFaculty("Mr. Aarav Singh", "Statistics", "Senior Lecturer", "MTech", 10, 5),
        generateFaculty("Prof. Ananya K.", "Computer Science", "HOD CS", "MTech", 14, 8),
        generateFaculty("Ms. Clara F.", "English", "Senior Lecturer", "MA", 11, 6),
        generateFaculty("Mr. Somu G.", "Physical Education", "PET", "MPEd", 15, 10),
      ],
    },
    "2nd PUC": {
      "Science Stream": [
        generateFaculty("Dr. Rajan Mehta", "Physics", "HOD Science", "PhD", 22, 15),
        generateFaculty("Ms. Priya Nair", "Chemistry", "Senior Lecturer", "MSc", 12, 7),
        generateFaculty("Mr. Aarav Singh", "Mathematics", "Senior Lecturer", "MTech", 10, 5),
        generateFaculty("Dr. Sunita Rao", "Biology", "Senior Lecturer", "PhD", 16, 10),
        generateFaculty("Prof. Ananya K.", "Computer Science", "HOD CS", "MTech", 14, 8),
        generateFaculty("Ms. Clara F.", "English", "Senior Lecturer", "MA", 11, 6),
        generateFaculty("Mr. Somu G.", "Physical Education", "PET", "MPEd", 15, 10),
      ],
      "Commerce Stream": [
        generateFaculty("Mr. Vikram Joshi", "Accountancy", "HOD Commerce", "MBA, CA", 18, 12),
        generateFaculty("Ms. Rekha Pillai", "Business Studies", "Senior Lecturer", "MBA", 12, 8),
        generateFaculty("Dr. Kiran Bose", "Economics", "Senior Lecturer", "PhD", 15, 9),
        generateFaculty("Mr. Aarav Singh", "Statistics", "Senior Lecturer", "MTech", 10, 5),
        generateFaculty("Prof. Ananya K.", "Computer Science", "HOD CS", "MTech", 14, 8),
        generateFaculty("Ms. Clara F.", "English", "Senior Lecturer", "MA", 11, 6),
        generateFaculty("Mr. Somu G.", "Physical Education", "PET", "MPEd", 15, 10),
      ],
    },
  },
};

// ── ACADEMIC PERFORMANCE ──────────────────────────────────
export const ACADEMIC_PERFORMANCE_DATA = {
  highSchool: [
    {
      year: "2024-2025",
      passPercentage: 100,
      totalAppeared: 120,
      totalPassed: 120,
      distinction: 45,
      firstClass: 60,
      secondClass: 15,
      failure: 0,
      topScorer: {
        name: "Kiran Kumar",
        marks: "618/625",
        percentage: "98.8%",
        rank: "District Rank 2",
        class: "10th Standard",
        photo: "https://i.pravatar.cc/150?u=kiran"
      }
    },
    {
      year: "2023-2024",
      passPercentage: 99.1,
      totalAppeared: 115,
      totalPassed: 114,
      distinction: 40,
      firstClass: 58,
      secondClass: 16,
      failure: 1,
      topScorer: {
        name: "Deepa R.",
        marks: "612/625",
        percentage: "97.9%",
        rank: "School Topper",
        class: "10th Standard",
        photo: "https://i.pravatar.cc/150?u=deepa"
      }
    }
  ],
  puc: [
    {
      year: "2024-2025",
      passPercentage: 99.2,
      totalAppeared: 450,
      totalPassed: 446,
      distinction: 185,
      firstClass: 210,
      secondClass: 45,
      failure: 4,
      topScorer: {
        name: "Aditi Sharma",
        marks: "594/600",
        percentage: "99.0%",
        rank: "State Rank 1",
        class: "2nd PUC (Science)",
        photo: "https://i.pravatar.cc/150?u=aditi"
      }
    },
    {
      year: "2023-2024",
      passPercentage: 98.5,
      totalAppeared: 420,
      totalPassed: 414,
      distinction: 160,
      firstClass: 200,
      secondClass: 48,
      failure: 6,
      topScorer: {
        name: "Rahul Verma",
        marks: "588/600",
        percentage: "98.0%",
        rank: "State Rank 3",
        class: "2nd PUC (Commerce)",
        photo: "https://i.pravatar.cc/150?u=rahul"
      }
    }
  ]
};
// Fill in simulated data for 20 years for both categories
const years = Array.from({ length: 18 }, (_, i) => {
  const startYear = 2022 - i;
  const endYear = 2023 - i;
  return `${startYear}-${endYear}`;
});

years.forEach(year => {
  ACADEMIC_PERFORMANCE_DATA.highSchool.push({
    year,
    passPercentage: 95 + Math.random() * 5,
    totalAppeared: 100,
    totalPassed: 95 + Math.floor(Math.random() * 5),
    distinction: 20,
    firstClass: 50,
    secondClass: 25,
    failure: 5,
    topScorer: {
      name: `Alumnus ${year}`,
      marks: "600/625",
      percentage: "96%",
      rank: "Topper",
      class: "10th Standard",
      photo: `https://i.pravatar.cc/150?u=alumnus${year}`
    }
  });
  ACADEMIC_PERFORMANCE_DATA.puc.push({
    year,
    passPercentage: 94 + Math.random() * 6,
    totalAppeared: 350,
    totalPassed: 330 + Math.floor(Math.random() * 20),
    distinction: 100,
    firstClass: 180,
    secondClass: 50,
    failure: 20,
    topScorer: {
      name: `Alumnus ${year}`,
      marks: "570/600",
      percentage: "95%",
      rank: "Topper",
      class: "2nd PUC",
      photo: `https://i.pravatar.cc/150?u=alumnus_puc${year}`
    }
  });
});
