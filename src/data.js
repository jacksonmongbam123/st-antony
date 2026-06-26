export const T = {
  navy: "#0f2044",
  navy2: "#1e3a6e",
  gold: "#c9963a",
  goldLt: "#f0c96e",
  cream: "#f8f5ef",
  white: "#ffffff",
  gray: "#6b7280",
  light: "#f1f3f7",
  red: "#c0392b",
  shadow: "rgba(15, 32, 68, 0.08)",
  shadowMd: "rgba(15, 32, 68, 0.12)",
  radius: 20,
  // Neumorphism uses larger, softer border radius
  radiusLg: 24,
  // Neumorphic Soft UI styled variables
  clayLight: "10px 10px 20px #cfd8e3, -10px -10px 20px #ffffff",
  clayCream: "10px 10px 20px #ded7c9, -10px -10px 20px #ffffff",
  clayNavy: "10px 10px 20px #060e1f, -10px -10px 20px #1a3465",
  clayGold: "10px 10px 20px #a1711e, -10px -10px 20px #ebd19b",
  clayBtnLight: "6px 6px 12px #cfd8e3, -6px -6px 12px #ffffff",
  clayBtnGold: "6px 6px 12px #a1711e, -6px -6px 12px #ebd19b",
  clayBtnNavy: "6px 6px 12px #060e1f, -6px -6px 12px #1a3465",
  // True Neumorphic soft shadows
  neuLight: "10px 10px 20px #cfd8e3, -10px -10px 20px #ffffff",
  neuCream: "10px 10px 20px #ded7c9, -10px -10px 20px #ffffff",
  neuNavy: "10px 10px 20px #060e1f, -10px -10px 20px #1a3465",
  neuGold: "10px 10px 20px #a1711e, -10px -10px 20px #ebd19b",
  neuBtnLight: "6px 6px 12px #cfd8e3, -6px -6px 12px #ffffff",
  neuBtnGold: "6px 6px 12px #a1711e, -6px -6px 12px #ebd19b",
  neuBtnNavy: "6px 6px 12px #060e1f, -6px -6px 12px #1a3465"
};
export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; overflow-x: hidden; max-width: 100%; }
  body { font-family: 'Inter', sans-serif; background: #eef2f7; color: #0f2044; overflow-x: hidden; max-width: 100vw; position: relative; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
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

  /* Neumorphic CSS Classes (Soft UI) */
  .clay-card-light, .neu-card-light {
    background: #eef2f7;
    border-radius: 20px;
    box-shadow: 10px 10px 20px #cfd8e3, -10px -10px 20px #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.7);
    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .clay-card-light:hover, .neu-card-light:hover {
    transform: translateY(-2px);
    box-shadow: 14px 14px 28px #cfd8e3, -14px -14px 28px #ffffff;
  }

  .clay-card-cream, .neu-card-cream {
    background: #f3efe6;
    border-radius: 20px;
    box-shadow: 10px 10px 20px #ded7c9, -10px -10px 20px #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.7);
    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .clay-card-cream:hover, .neu-card-cream:hover {
    transform: translateY(-2px);
    box-shadow: 14px 14px 28px #ded7c9, -14px -14px 28px #ffffff;
  }

  .clay-card-navy, .neu-card-navy {
    background: #0f2044;
    color: #ffffff;
    border-radius: 20px;
    box-shadow: 10px 10px 20px #060e1f, -10px -10px 20px #1a3465;
    border: 1px solid rgba(26, 52, 101, 0.4);
    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .clay-card-navy:hover, .neu-card-navy:hover {
    transform: translateY(-2px);
    box-shadow: 14px 14px 28px #060e1f, -14px -14px 28px #1a3465;
  }

  .clay-card-gold, .neu-card-gold {
    background: #c9963a;
    border-radius: 20px;
    box-shadow: 10px 10px 20px #a1711e, -10px -10px 20px #ebd19b;
    border: 1px solid rgba(235, 209, 155, 0.4);
    transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .clay-card-gold:hover, .neu-card-gold:hover {
    transform: translateY(-2px);
    box-shadow: 14px 14px 28px #a1711e, -14px -14px 28px #ebd19b;
  }

  .clay-btn, .neu-btn {
    background: #eef2f7;
    color: #0f2044;
    border-radius: 14px;
    box-shadow: 6px 6px 12px #cfd8e3, -6px -6px 12px #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.8);
    transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
    font-weight: 700;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    outline: none;
  }
  .clay-btn:hover, .neu-btn:hover {
    transform: translateY(-2px);
    box-shadow: 8px 8px 16px #cfd8e3, -8px -8px 16px #ffffff;
    color: #c9963a;
  }
  .clay-btn:active, .neu-btn:active {
    transform: translateY(1px);
    box-shadow: inset 4px 4px 8px #cfd8e3, inset -4px -4px 8px #ffffff;
  }

  /* Inset Neumorphic style for form inputs, search bars, timeline tracks */
  .clay-input, .neu-input {
    background: #eef2f7 !important;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.5) !important;
    box-shadow: inset 4px 4px 8px #cfd8e3, inset -4px -4px 8px #ffffff !important;
    transition: all 0.25s ease;
    outline: none;
    color: #0f2044 !important;
  }
  .clay-input:focus, .neu-input:focus {
    border-color: #c9963a !important;
    box-shadow: inset 5px 5px 10px #cfd8e3, inset -5px -5px 10px #ffffff !important;
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
  .tablet-only { display: none !important; }

  /* Section Padding Defaults */
  section { padding: 80px 7% !important; }

  @media (max-width: 1024px) {
    section { padding: 60px 5% !important; }
    .tablet-stack { grid-template-columns: 1fr !important; gap: 32px !important; }
  }

  @media (max-width: 768px) {
    section { padding: 48px 20px !important; }
    .desktop-only { display: none !important; }
    .mobile-only { display: flex !important; }
    .tablet-only { display: flex !important; }
    body { overflow-x: hidden; }
    
    .mobile-stack { 
      grid-template-columns: 1fr !important;
      gap: 24px !important;
      display: grid !important;
    }

    .mobile-flex-stack {
      flex-direction: column !important;
      gap: 24px !important;
    }
    
    .mobile-padding-x {
      padding-left: 20px !important;
      padding-right: 20px !important;
    }

    .mobile-nav-height { height: 60px !important; }
    nav { height: 60px !important; padding: 0 16px !important; }
    #hero { margin-top: 60px !important; height: calc(100vh - 60px) !important; min-height: 560px !important; }
    .mobile-nav-overlay { top: 60px !important; max-height: calc(100vh - 60px) !important; }

    /* Academic Performance Custom Classes */
    .scorer-card {
      padding: 48px 32px;
      transition: all 0.3s ease;
    }
    .table-card {
      padding: 36px;
      transition: all 0.3s ease;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 20px;
    }

    /* Typography scaling */
    h1 { font-size: clamp(2.2rem, 8vw, 3rem) !important; }
    h2 { font-size: clamp(1.8rem, 6vw, 2.2rem) !important; }
    
    /* Table responsiveness */
    .table-scroll { overflow-x: auto !important; -webkit-overflow-scrolling: touch; margin: 0 -20px; padding: 0 20px; width: calc(100% + 40px); }
    .table-scroll table { min-width: 600px; }
  }

  @media (max-width: 480px) {
    section { padding: 40px 16px !important; }
    .mobile-padding-x { padding-left: 16px !important; padding-right: 16px !important; }
    .table-scroll { margin: 0 -16px; padding: 0 16px; width: calc(100% + 32px); }
    .scorer-card {
      padding: 24px 16px !important;
    }
    .table-card {
      padding: 24px 16px !important;
    }
    .stats-grid {
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)) !important;
      gap: 12px !important;
    }
  }

  /* Grid helper for equal height cards */
  .equal-grid { display: grid; align-items: stretch; }
  .table-scroll { overflow-x: auto; }
`;
export const NAV_LINKS = [
  { label: "Home", href: "hero" },
  { label: "About", href: "vision" },
  { label: "Performance", href: "academic-performance" },
  { label: "Admissions", href: "admissions" },
  { label: "Achievements", href: "achievements" },
  { label: "Faculty", href: "faculty" },
  { label: "Contact", href: "contact" }
];
export const HERO_SLIDES = [
  {
    image: "./school.jpeg",
    overlay: "linear-gradient(135deg,rgba(70, 71, 71, 0.78) 0%,rgba(218, 221, 227, 0.55) 100%)",
    eyebrow: "Est. 1986 \xB7 High School & PUC",
    title: ["Shaping Minds,", "Building Futures"],
    desc: "St. Antony's Institution nurtures curiosity and excellence across High School (8th-10th) and Pre-University (PUC) levels.",
    cta: { label: "Apply Now", href: "admissions" },
    accent: "#4e7fd4"
  },
  {
    image: "./Lab3.jpeg",
    overlay: "linear-gradient(135deg,rgba(13,74,60,0.80) 0%,rgba(220, 225, 224, 0.55) 100%)",
    eyebrow: "Excellence in Education",
    title: ["Holistic Growth,", "Academic Rigor"],
    desc: "From foundational high school years to specialized PUC streams, we provide a complete educational journey.",
    cta: { label: "Meet Our Faculty", href: "faculty" },
    accent: "#2fa0d8"
  }
];
export const ADMISSION_DATA = [
  {
    icon: "\u{1F3EB}",
    bg: "#eff6ff",
    title: "High School Admission",
    subtitle: "Classes 8th, 9th, and 10th Standard",
    rows: [
      { label: "Application Starts", value: "March 1st, 2026" },
      { label: "Eligibility", value: "Previous class pass" },
      { label: "Entrance Test", value: "Aptitude Based" },
      { label: "Medium", value: "English / Kannada" }
    ]
  },
  {
    icon: "\u{1F3DB}\uFE0F",
    bg: "#f0fdf4",
    title: "PUC Admission",
    subtitle: "1st PUC & 2nd PUC (Class 11 & 12)",
    rows: [
      { label: "Science Streams", value: "PCMB, PCMC" },
      { label: "Commerce Streams", value: "EBAC, HEBA" },
      { label: "Arts Streams", value: "HEPS" },
      { label: "SSLC Cut-off", value: "Min 60% aggregate" }
    ]
  },
  {
    icon: "\u{1F4B0}",
    bg: "#fffbeb",
    title: "Fee Structure",
    subtitle: "Competitive and transparent pricing",
    rows: [
      { label: "High School", value: "\u20B922,000 / yr" },
      { label: "PUC Science", value: "\u20B948,000 / yr" },
      { label: "PUC Commerce/Arts", value: "\u20B935,000 / yr" },
      { label: "Scholarships", value: "Merit-based available" }
    ]
  },
  {
    icon: "\u{1F393}",
    bg: "#faf5ff",
    title: "Programmes",
    subtitle: "Diverse educational paths",
    rows: [
      { label: "Academic", value: "KSEEB & PUE Board" },
      { label: "Co-Curricular", value: "Sports, Arts, Music" },
      { label: "Infrastructure", value: "Modern Labs & Library" },
      { label: "Hostel", value: "Available for Boys/Girls" }
    ]
  }
];
export const CLASS_DATA = [
  {
    label: "High School (8th-10th)",
    rows: [
      { subject: "Mathematics", code: "HS-MTH", periods: 6, teacher: "Mr. Ramesh K.", emoji: "\u{1F4D0}" },
      { subject: "Science", code: "HS-SCI", periods: 6, teacher: "Ms. Savitha M.", emoji: "\u{1F9EA}" },
      { subject: "Social Science", code: "HS-SOC", periods: 5, teacher: "Mr. Prakash G.", emoji: "\u{1F30D}" },
      { subject: "English", code: "HS-ENG", periods: 5, teacher: "Ms. Mary D.", emoji: "\u{1F4D6}" },
      { subject: "Kannada/Hindi", code: "HS-LAN", periods: 4, teacher: "Mr. Shivu L.", emoji: "\u{1F5E3}\uFE0F" }
    ]
  },
  {
    label: "PUC Science",
    rows: [
      { subject: "Physics", code: "PU-PHY", periods: 5, teacher: "Dr. Rajan Mehta", emoji: "\u{1F468}\u200D\u{1F3EB}" },
      { subject: "Chemistry", code: "PU-CHE", periods: 5, teacher: "Ms. Priya Nair", emoji: "\u{1F469}\u200D\u{1F52C}" },
      { subject: "Mathematics", code: "PU-MAT", periods: 6, teacher: "Mr. Aarav Singh", emoji: "\u{1F468}\u200D\u{1F4BB}" },
      { subject: "Biology/CS", code: "PU-BIO", periods: 4, teacher: "Dr. Sunita Rao", emoji: "\u{1F469}\u200D\u{1F3EB}" }
    ]
  }
];
export const ACHIEVEMENT_DATA = [
  {
    id: "sports",
    label: "\u{1F3C6} Sports",
    slides: [
      {
        medal: "\u{1F3C6}",
        year: "2024",
        tag: "KABADDI",
        title: "District Level Kabaddi Gold",
        desc: "High School boys' team won the gold at the District Level Kabaddi Championship, showcasing brilliant teamwork.",
        color: "#16223f",
        images: [
          "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=600&q=80"
        ]
      },
      {
        medal: "\u{1F3C3}",
        year: "2024",
        tag: "ATHLETICS",
        title: "State Athletics Championship",
        desc: "St. Antony's students secured 3 gold medals in track and field events at the State Athletics Meet.",
        color: "#132247",
        images: [
          "https://images.unsplash.com/photo-1502224562085-639556652f33?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=600&q=80"
        ]
      }
    ]
  },
  {
    id: "education",
    label: "\u{1F4DA} Education",
    slides: [
      {
        medal: "\u{1F393}",
        year: "2024",
        tag: "ACADEMICS",
        title: "100% Pass in SSLC Board",
        desc: "Our 10th Standard students achieved a perfect 100% pass rate for the 5th consecutive year.",
        color: "#16223f",
        images: [
          "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80"
        ]
      },
      {
        medal: "\u{1F4DC}",
        year: "2024",
        tag: "DISTINCTIONS",
        title: "Top PUC Board Ranks",
        desc: "St. Antony's secured 12 distinctions in the 2nd PUC State Board Examinations.",
        color: "#132247",
        images: [
          "https://images.unsplash.com/photo-1518655061766-48f23af0a636?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80"
        ]
      },
      {
        medal: "\u{1F3EB}",
        year: "2024",
        tag: "RANKING",
        title: "#3 in State Rankings",
        desc: "India Today ranked us among the top 3 colleges in the state for academic outcomes and placement records.",
        color: "#0f2044",
        images: [
          "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80"
        ]
      },
      {
        medal: "\u{1F4A1}",
        year: "2023",
        tag: "SCHOLARSHIP",
        title: "National Merit Scholarship",
        desc: "Three of our science stream students were awarded the prestigious National Merit Scholarship.",
        color: "#16223f",
        images: [
          "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80"
        ]
      },
      {
        medal: "\u{1F52C}",
        year: "2024",
        tag: "SCIENCE",
        title: "State Science Fair Winner",
        desc: "Our high school physics project won first prize at the Karnataka State Science Congress.",
        color: "#132247",
        images: [
          "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=600&q=80"
        ]
      }
    ]
  },
  {
    id: "cultural",
    label: "\u{1F3AD} Cultural",
    slides: [
      {
        medal: "\u{1F3AD}",
        year: "2024",
        tag: "DRAMA",
        title: "State Level Drama Gold",
        desc: "St. Antony's theatre group won the prestigious 'Best Play' award at the State Level Youth Festival.",
        color: "#16223f",
        images: [
          "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=600&q=80"
        ]
      },
      {
        medal: "\u{1F3A4}",
        year: "2024",
        tag: "MUSIC",
        title: "Classical Vocal Championship",
        desc: "Anjali Sharma of 2nd PUC won the gold medal in classical vocal solo competition.",
        color: "#132247",
        images: [
          "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?auto=format&fit=crop&w=600&q=80"
        ]
      }
    ]
  },
  {
    id: "events",
    label: "\u{1F4C5} Events",
    slides: [
      {
        medal: "\u{1F389}",
        year: "2024",
        tag: "ANNUAL DAY",
        title: "40th Annual Day Celebration",
        desc: "A grand celebration of our four-decade milestone with spectacular cultural showcases by over 500 students.",
        color: "#16223f",
        images: [
          "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80"
        ]
      },
      {
        medal: "\u{1F3E2}",
        year: "2024",
        tag: "LABORATORIES",
        title: "New Science Block",
        desc: "Inaugurated our state-of-the-art laboratory wing featuring advanced equipment for physics, chemistry, and biology.",
        color: "#132247",
        images: [
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&w=600&q=80"
        ]
      }
    ]
  }
];
const generateFaculty = (name, subject, role, qualification, experience, yearsOfService) => ({
  name,
  subject,
  role,
  qualification,
  experience: `${experience} Years`,
  yearsOfService: `${yearsOfService} Years at St. Antony's`,
  bio: `Expert in ${subject} with a passion for student-centric learning and academic excellence.`,
  photo: `https://i.pravatar.cc/150?u=${name.replace(/\s+/g, "")}`
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
      generateFaculty("Mr. Raju S.", "Physical Education", "PET", "BPEd", 10, 6)
    ],
    "9th Standard": [
      generateFaculty("Mr. Ramesh K.", "Mathematics", "Senior Teacher", "MSc, BEd", 15, 10),
      generateFaculty("Ms. Savitha M.", "Science", "HOD High School", "MSc, BEd", 12, 8),
      generateFaculty("Mr. Prakash G.", "Social Science", "Senior Teacher", "MA, BEd", 18, 12),
      generateFaculty("Ms. Mary D.", "English", "Language Head", "MA, BEd", 14, 9),
      generateFaculty("Mr. Shivu L.", "Kannada", "Senior Teacher", "MA, BEd", 20, 15),
      generateFaculty("Mr. Vinay P.", "Hindi", "Teacher", "MA, BEd", 8, 5),
      generateFaculty("Mr. Raju S.", "Physical Education", "PET", "BPEd", 10, 6)
    ],
    "10th Standard": [
      generateFaculty("Mr. Ramesh K.", "Mathematics", "Senior Teacher", "MSc, BEd", 15, 10),
      generateFaculty("Ms. Savitha M.", "Science", "HOD High School", "MSc, BEd", 12, 8),
      generateFaculty("Mr. Prakash G.", "Social Science", "Senior Teacher", "MA, BEd", 18, 12),
      generateFaculty("Ms. Mary D.", "English", "Language Head", "MA, BEd", 14, 9),
      generateFaculty("Mr. Shivu L.", "Kannada", "Senior Teacher", "MA, BEd", 20, 15),
      generateFaculty("Mr. Vinay P.", "Hindi", "Teacher", "MA, BEd", 8, 5),
      generateFaculty("Mr. Raju S.", "Physical Education", "PET", "BPEd", 10, 6)
    ]
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
        generateFaculty("Mr. Somu G.", "Physical Education", "PET", "MPEd", 15, 10)
      ],
      "Commerce Stream": [
        generateFaculty("Mr. Vikram Joshi", "Accountancy", "HOD Commerce", "MBA, CA", 18, 12),
        generateFaculty("Ms. Rekha Pillai", "Business Studies", "Senior Lecturer", "MBA", 12, 8),
        generateFaculty("Dr. Kiran Bose", "Economics", "Senior Lecturer", "PhD", 15, 9),
        generateFaculty("Mr. Aarav Singh", "Statistics", "Senior Lecturer", "MTech", 10, 5),
        generateFaculty("Prof. Ananya K.", "Computer Science", "HOD CS", "MTech", 14, 8),
        generateFaculty("Ms. Clara F.", "English", "Senior Lecturer", "MA", 11, 6),
        generateFaculty("Mr. Somu G.", "Physical Education", "PET", "MPEd", 15, 10)
      ]
    },
    "2nd PUC": {
      "Science Stream": [
        generateFaculty("Dr. Rajan Mehta", "Physics", "HOD Science", "PhD", 22, 15),
        generateFaculty("Ms. Priya Nair", "Chemistry", "Senior Lecturer", "MSc", 12, 7),
        generateFaculty("Mr. Aarav Singh", "Mathematics", "Senior Lecturer", "MTech", 10, 5),
        generateFaculty("Dr. Sunita Rao", "Biology", "Senior Lecturer", "PhD", 16, 10),
        generateFaculty("Prof. Ananya K.", "Computer Science", "HOD CS", "MTech", 14, 8),
        generateFaculty("Ms. Clara F.", "English", "Senior Lecturer", "MA", 11, 6),
        generateFaculty("Mr. Somu G.", "Physical Education", "PET", "MPEd", 15, 10)
      ],
      "Commerce Stream": [
        generateFaculty("Mr. Vikram Joshi", "Accountancy", "HOD Commerce", "MBA, CA", 18, 12),
        generateFaculty("Ms. Rekha Pillai", "Business Studies", "Senior Lecturer", "MBA", 12, 8),
        generateFaculty("Dr. Kiran Bose", "Economics", "Senior Lecturer", "PhD", 15, 9),
        generateFaculty("Mr. Aarav Singh", "Statistics", "Senior Lecturer", "MTech", 10, 5),
        generateFaculty("Prof. Ananya K.", "Computer Science", "HOD CS", "MTech", 14, 8),
        generateFaculty("Ms. Clara F.", "English", "Senior Lecturer", "MA", 11, 6),
        generateFaculty("Mr. Somu G.", "Physical Education", "PET", "MPEd", 15, 10)
      ]
    }
  }
};
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
const years = Array.from({ length: 18 }, (_, i) => {
  const startYear = 2022 - i;
  const endYear = 2023 - i;
  return `${startYear}-${endYear}`;
});
years.forEach((year) => {
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
