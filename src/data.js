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
};

// ── GLOBAL CSS (injected once in App) ──────────────────────
export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Inter', sans-serif; background: #f8f5ef; color: #0f2044; overflow-x: hidden; }

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
    content: ''; position: absolute; bottom: -2px; left: 0;
    width: 100%; height: 2px; background: #c9963a; border-radius: 2px;
  }

  /* Responsive Utilities */
  .desktop-only { display: flex !important; }
  .mobile-only { display: none !important; }

  @media (max-width: 768px) {
    .desktop-only { display: none !important; }
    .mobile-only { display: flex !important; }
    body { overflow-x: hidden; }
    
    .mobile-stack { 
      grid-template-columns: 1fr !important; 
    }
    
    .mobile-padding-x {
      padding-left: 16px !important;
      padding-right: 16px !important;
    }

    .mobile-nav-height {
      height: 64px !important;
    }
    
    nav {
      height: 64px !important;
      padding: 0 16px !important;
    }
    
    #hero {
      margin-top: 64px !important;
      height: calc(100vh - 64px) !important;
    }

    .mobile-nav-overlay {
      top: 64px !important;
      max-height: calc(100vh - 64px) !important;
    }
  }
`;

// ── NAVIGATION ─────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home",         href: "hero" },
  { label: "About",        href: "vision" },
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
    eyebrow:  "Est. 1986 · Ranked #1 in the Region",
    title:    ["Shaping Minds,", "Building Futures"],
    desc:     "St. Antony's Institution nurtures curiosity, fosters excellence, and prepares graduates to lead in a rapidly evolving world.",
    cta:      { label: "Apply Now", href: "admissions" },
    accent:   "#4e7fd4",
  },
  {
    image:    "./Lab3.jpeg",
    overlay:  "linear-gradient(135deg,rgba(13,74,60,0.80) 0%,rgba(220, 225, 224, 0.55) 100%)",
    eyebrow:  "State-of-the-Art Science Labs",
    title:    ["Hands-On Learning,", "Real-World Science"],
    desc:     "Our fully equipped laboratories let students explore biology, chemistry, and physics through practical experimentation.",
    cta:      { label: "Meet Our Faculty", href: "faculty" },
    accent:   "#2fa0d8",
  },
  {
    image:    "./lab2.jpeg",
    overlay:  "linear-gradient(135deg,rgba(18,35,100,0.80) 0%,rgba(212, 215, 221, 0.55) 100%)",
    eyebrow:  "Technology & Innovation",
    title:    ["Digital Skills for", "Tomorrow's Leaders"],
    desc:     "From computer labs to AI basics, we prepare every student with the digital literacy needed to succeed in a modern world.",
    cta:      { label: "See Achievements", href: "achievements" },
    accent:   "#2aad7a",
  },
  {
    image:    "./Lab.jpeg",
    overlay:  "linear-gradient(135deg,rgba(58,26,106,0.80) 0%,rgba(218, 216, 219, 0.5) 100%)",
    eyebrow:  "Sports · Culture · Innovation",
    title:    ["Champions On", "Every Field"],
    desc:     "Our students don't just excel in classrooms — they shine in sports arenas, cultural stages, and innovation labs.",
    cta:      { label: "Apply Now", href: "admissions" },
    accent:   "#a855f7",
  },
];

// ── ADMISSIONS ─────────────────────────────────────────────
export const ADMISSION_DATA = [
  {
    icon: "🏛️", bg: "#eff6ff",
    title: "Admission Process",
    subtitle: "Step-by-step guide to join St. Antony's",
    rows: [
      { label: "Application Window", value: "Mar 1 – Jun 30, 2026" },
      { label: "Entrance Exam",      value: "CET 2026 · Jul 15" },
      { label: "Merit Counselling",  value: "Aug 1 – Aug 20, 2026" },
      { label: "Classes Begin",      value: "Sep 1, 2026" },
      { label: "Mode",               value: "Online + Offline" },
    ],
  },
  {
    icon: "💰", bg: "#f0fdf4",
    title: "Fee Structure",
    subtitle: "Transparent annual fee breakup per stream",
    rows: [
      { label: "Science (PCM/PCB)",  value: "₹48,000 / yr", hi: true },
      { label: "Commerce (w/ Math)", value: "₹38,000 / yr", hi: true },
      { label: "Arts / Humanities",  value: "₹28,000 / yr", hi: true },
      { label: "Lab & Activity Fee", value: "₹4,500 / yr" },
      { label: "Scholarship Waiver", value: "Up to 100%" },
    ],
  },
  {
    icon: "✅", bg: "#fffbeb",
    title: "Eligibility Criteria",
    subtitle: "Minimum requirements for admission",
    rows: [
      { label: "Class 10 Marks",  value: "≥ 60% aggregate" },
      { label: "Science Stream",  value: "PCM/PCB — Min 65%" },
      { label: "Commerce Stream", value: "Math score ≥ 55%" },
      { label: "Arts Stream",     value: "Any background" },
      { label: "Age Limit",       value: "15 – 18 years" },
    ],
  },
  {
    icon: "🎓", bg: "#faf5ff",
    title: "Programmes Offered",
    subtitle: "Streams and specialisations available",
    rows: [
      { label: "Streams",       value: "Science · Commerce · Arts" },
      { label: "Vocational",    value: "IT · Fashion · Tourism" },
      { label: "Sports Quota",  value: "5% seats reserved" },
      { label: "NRI Quota",     value: "Available (FCRA)" },
      { label: "Accreditation", value: "NAAC A++ · ISO 9001" },
    ],
  },
];

// ── CLASS & SUBJECTS ───────────────────────────────────────
export const CLASS_DATA = [
  {
    label: "Class XI – Science",
    rows: [
      { subject: "Physics",       code: "SCI-301", periods: 5, teacher: "Dr. Rajan Mehta",      emoji: "👨‍🏫" },
      { subject: "Chemistry",     code: "SCI-302", periods: 5, teacher: "Ms. Priya Nair",        emoji: "👩‍🔬" },
      { subject: "Mathematics",   code: "SCI-303", periods: 6, teacher: "Mr. Aarav Singh",       emoji: "👨‍💻" },
      { subject: "Biology",       code: "SCI-304", periods: 4, teacher: "Dr. Sunita Rao",        emoji: "👩‍🏫" },
      { subject: "English",       code: "LNG-101", periods: 4, teacher: "Ms. Clara Fernandes",   emoji: "👩‍🎓" },
      { subject: "Computer Sci.", code: "IT-201",  periods: 3, teacher: "Prof. Ananya Krishnan", emoji: "👩‍💻" },
    ],
  },
  {
    label: "Class XII – Science",
    rows: [
      { subject: "Physics",       code: "SCI-401", periods: 5, teacher: "Dr. Rajan Mehta",      emoji: "👨‍🏫" },
      { subject: "Chemistry",     code: "SCI-402", periods: 5, teacher: "Ms. Priya Nair",        emoji: "👩‍🔬" },
      { subject: "Mathematics",   code: "SCI-403", periods: 6, teacher: "Mr. Aarav Singh",       emoji: "👨‍💻" },
      { subject: "Biology",       code: "SCI-404", periods: 4, teacher: "Dr. Sunita Rao",        emoji: "👩‍🏫" },
      { subject: "English",       code: "LNG-102", periods: 4, teacher: "Ms. Clara Fernandes",   emoji: "👩‍🎓" },
      { subject: "Comp. Science", code: "IT-202",  periods: 3, teacher: "Prof. Ananya Krishnan", emoji: "👩‍💻" },
    ],
  },
  {
    label: "Class XI – Commerce",
    rows: [
      { subject: "Accountancy",  code: "COM-301", periods: 5, teacher: "Mr. Vikram Joshi",     emoji: "👨‍💼" },
      { subject: "Business St.", code: "COM-302", periods: 5, teacher: "Ms. Rekha Pillai",     emoji: "👩‍💼" },
      { subject: "Economics",    code: "COM-303", periods: 4, teacher: "Dr. Kiran Bose",       emoji: "👨‍🏫" },
      { subject: "Mathematics",  code: "COM-304", periods: 4, teacher: "Mr. Aarav Singh",      emoji: "👨‍💻" },
      { subject: "English",      code: "LNG-101", periods: 4, teacher: "Ms. Clara Fernandes",  emoji: "👩‍🎓" },
      { subject: "Informatics",  code: "IT-203",  periods: 2, teacher: "Prof. Ananya Krishnan",emoji: "👩‍💻" },
    ],
  },
  {
    label: "Class XII – Commerce",
    rows: [
      { subject: "Accountancy",  code: "COM-401", periods: 5, teacher: "Mr. Vikram Joshi",     emoji: "👨‍💼" },
      { subject: "Business St.", code: "COM-402", periods: 5, teacher: "Ms. Rekha Pillai",     emoji: "👩‍💼" },
      { subject: "Economics",    code: "COM-403", periods: 4, teacher: "Dr. Kiran Bose",       emoji: "👨‍🏫" },
      { subject: "Mathematics",  code: "COM-404", periods: 4, teacher: "Mr. Aarav Singh",      emoji: "👨‍💻" },
      { subject: "English",      code: "LNG-102", periods: 4, teacher: "Ms. Clara Fernandes",  emoji: "👩‍🎓" },
      { subject: "Informatics",  code: "IT-204",  periods: 2, teacher: "Prof. Ananya Krishnan",emoji: "👩‍💻" },
    ],
  },
  {
    label: "Class XI – Arts",
    rows: [
      { subject: "History",        code: "ART-301", periods: 4, teacher: "Mr. Samuel D'Souza",  emoji: "👨‍🎨" },
      { subject: "Political Sci.", code: "ART-302", periods: 4, teacher: "Ms. Meena Thomas",    emoji: "👩‍🏫" },
      { subject: "Geography",      code: "ART-303", periods: 4, teacher: "Dr. Harish Kumar",    emoji: "👨‍🏫" },
      { subject: "Sociology",      code: "ART-304", periods: 4, teacher: "Ms. Lakshmi Rao",     emoji: "👩‍🎓" },
      { subject: "English",        code: "LNG-101", periods: 4, teacher: "Ms. Clara Fernandes", emoji: "👩‍🎓" },
      { subject: "Fine Arts",      code: "ART-305", periods: 3, teacher: "Mr. Samuel D'Souza",  emoji: "👨‍🎨" },
    ],
  },
  {
    label: "Class XII – Arts",
    rows: [
      { subject: "History",        code: "ART-401", periods: 4, teacher: "Mr. Samuel D'Souza",  emoji: "👨‍🎨" },
      { subject: "Political Sci.", code: "ART-402", periods: 4, teacher: "Ms. Meena Thomas",    emoji: "👩‍🏫" },
      { subject: "Geography",      code: "ART-403", periods: 4, teacher: "Dr. Harish Kumar",    emoji: "👨‍🏫" },
      { subject: "Sociology",      code: "ART-404", periods: 4, teacher: "Ms. Lakshmi Rao",     emoji: "👩‍🎓" },
      { subject: "English",        code: "LNG-102", periods: 4, teacher: "Ms. Clara Fernandes", emoji: "👩‍🎓" },
      { subject: "Fine Arts",      code: "ART-405", periods: 3, teacher: "Mr. Samuel D'Souza",  emoji: "👨‍🎨" },
    ],
  },
];

// ── ACHIEVEMENTS ───────────────────────────────────────────
export const ACHIEVEMENT_DATA = [
  {
    id: "sports", label: "🏆 Sports",
    slides: [
      { medal: "🥇", year: "2025 · National", title: "Inter-University Cricket Champions", color: "#1a4a7a",
        desc: "Our cricket team clinched the national title for the third consecutive year with an unbeaten run of 12 matches." },
      { medal: "🥈", year: "2024 · State",    title: "Basketball State Runners-up",        color: "#1a3a6a",
        desc: "Women's basketball team reached the state finals, defeating 18 colleges en route." },
      { medal: "🏅", year: "2024 · National", title: "Athletics Gold Medalist",            color: "#0d4a3c",
        desc: "Priya Sharma won gold in the 400m sprint at the National Inter-University Games, clocking 52.3 seconds." },
      { medal: "🥇", year: "2023 · State",    title: "Football State Champions",           color: "#3a1a6a",
        desc: "Men's football team swept through the state tournament with a perfect unbeaten record across 10 games." },
    ],
  },
  {
    id: "education", label: "📚 Education",
    slides: [
      { medal: "🎓", year: "2025 · NAAC",    title: "A++ Accreditation",         color: "#1a4a7a",
        desc: "St. Antony's received the highest NAAC grade for the second successive cycle with a score of 3.72/4." },
      { medal: "🔬", year: "2024 · DST",     title: "₹5 Cr Research Grant",      color: "#0d4a3c",
        desc: "DST awarded a multi-year grant for our AI & Sustainable Energy research cluster, covering 8 PhD scholars." },
      { medal: "🏫", year: "2024 · Ranking", title: "#3 in State Rankings",      color: "#3a1a6a",
        desc: "India Today ranked us among the top 3 colleges in the state for academic outcomes and placement records." },
      { medal: "📖", year: "2023 · Olympiad", title: "National Science Olympiad", color: "#1a3a6a",
        desc: "Students swept 4 gold medals at the National Science Olympiad finals held in New Delhi." },
    ],
  },
  {
    id: "cultural", label: "🎭 Cultural",
    slides: [
      { medal: "🎭", year: "2025 · National", title: "Best Drama Troupe",         color: "#1a4a7a",
        desc: "Our theatre group won Best Production at the National Inter-College Drama Festival in Mumbai." },
      { medal: "🎵", year: "2024 · Regional", title: "Music Ensemble Gold",       color: "#3a1a6a",
        desc: "Apex Symphonia took home gold at the Regional Classical Music Competition — fourth year running." },
      { medal: "🎨", year: "2024 · National", title: "Fine Arts Exhibition",      color: "#0d4a3c",
        desc: "Student artworks displayed at the National Gallery of Modern Art, Delhi — a first for the institution." },
      { medal: "💃", year: "2023 · State",    title: "Classical Dance Champions", color: "#1a3a6a",
        desc: "State-level Bharatanatyam competition champions for the 5th consecutive year." },
    ],
  },
  {
    id: "events", label: "📅 Events",
    slides: [
      { medal: "🌍", year: "Aug 2026 · Upcoming", title: "TechFest 2026",         color: "#1a4a7a",
        desc: "Annual technology festival hosting 5,000+ participants across 40+ events, hackathons, and exhibitions." },
      { medal: "🎪", year: "Oct 2026 · Upcoming", title: "Cultural Fest 'Utsav'", color: "#0d4a3c",
        desc: "Three-day pan-India cultural festival featuring performances, competitions, and art exhibitions." },
      { medal: "🤝", year: "Jan 2026 · Past",     title: "Industry Conclave",     color: "#3a1a6a",
        desc: "200+ industry leaders and 1,500 students connected at our flagship placement and networking conclave." },
      { medal: "🎓", year: "May 2026 · Past",     title: "Convocation 2026",      color: "#1a3a6a",
        desc: "2,400 graduates received degrees. Chief Guest: Padma Bhushan Dr. S. Nair, Chairman of ISRO." },
    ],
  },
];

// ── FACULTY ────────────────────────────────────────────────
export const FACULTY_DATA = [
  {
    id: 1, name: "Dr. Rajan Mehta", degree: "PhD", role: "Head of Sciences",
    dept: "Science", deptTag: "Science Dept.", avatarInitials: "RM", avatarColor: "#2563eb",
    subjects: ["Physics", "Applied Physics"],
    classes: ["Class XI Sci", "Class XII Sci"],
    bio: "20+ years shaping future scientists. Specialist in Applied Physics and Quantum Computing research with 40+ peer-reviewed publications in international journals.",
    stats: { years: 22, papers: 42, students: 1800 },
    email: "r.mehta@stantonys.edu.in", phone: "+91 98450 11001",
    office: "Science Block, Room 304",
    achievements: "DRDO Research Fellowship (2019), Best Educator Award — Karnataka (2022), IIT Collaboration Grant Recipient",
  },
  {
    id: 2, name: "Prof. Ananya Krishnan", degree: "PhD", role: "Head of Computer Science",
    dept: "Computer Science", deptTag: "CS Dept.", avatarInitials: "AK", avatarColor: "#7c3aed",
    subjects: ["Computer Science", "Informatics", "AI Basics", "Python"],
    classes: ["Class XI Sci", "Class XII Sci", "Class XI Com", "Class XII Com"],
    bio: "AI & Machine Learning researcher. Guided 200+ students to leading tech roles at Google, Microsoft, and top-tier startups globally.",
    stats: { years: 14, papers: 28, students: 2100 },
    email: "a.krishnan@stantonys.edu.in", phone: "+91 98450 11002",
    office: "CS Block, Room 101",
    achievements: "Google Faculty Research Award (2023), Best Paper — IEEE ICSE 2021, Women in Tech Leadership Award 2022",
  },
  {
    id: 3, name: "Mr. Samuel D'Souza", degree: "MA", role: "Head of Arts & Humanities",
    dept: "Arts", deptTag: "Arts Dept.", avatarInitials: "SD", avatarColor: "#dc2626",
    subjects: ["Fine Arts", "History", "Cultural Studies"],
    classes: ["Class XI Arts", "Class XII Arts"],
    bio: "Award-winning educator and practising artist. Leads our cultural programmes, theatre group, and fine arts curriculum with over 18 years of experience.",
    stats: { years: 18, papers: 9, students: 1400 },
    email: "s.dsouza@stantonys.edu.in", phone: "+91 98450 11003",
    office: "Arts Block, Room 205",
    achievements: "Karnataka Rajyotsava Award (2021), Best Theatre Director — National Drama Fest 2024, Lalit Kala Akademi Fellow",
  },
  {
    id: 4, name: "Mr. Vikram Joshi", degree: "MBA", role: "Senior Lecturer — Commerce",
    dept: "Commerce", deptTag: "Commerce Dept.", avatarInitials: "VJ", avatarColor: "#059669",
    subjects: ["Accountancy", "Cost Accounting"],
    classes: ["Class XI Com", "Class XII Com"],
    bio: "Former CFO turned educator with deep expertise in financial accounting, taxation, and business strategy. Mentored 15 CA rank holders.",
    stats: { years: 12, papers: 6, students: 1100 },
    email: "v.joshi@stantonys.edu.in", phone: "+91 98450 11004",
    office: "Commerce Block, Room 112",
    achievements: "ICAI Best Educator Recognition (2023), 15 CA Rank Holders Mentored, Published CA Study Material (2022)",
  },
  {
    id: 5, name: "Ms. Priya Nair", degree: "MSc", role: "Lecturer — Chemistry",
    dept: "Science", deptTag: "Science Dept.", avatarInitials: "PN", avatarColor: "#0891b2",
    subjects: ["Chemistry", "Organic Chemistry", "Lab Work"],
    classes: ["Class XI Sci", "Class XII Sci"],
    bio: "Passionate chemistry educator specialising in making complex organic reactions intuitive through hands-on lab methodologies and visual learning.",
    stats: { years: 9, papers: 11, students: 870 },
    email: "p.nair@stantonys.edu.in", phone: "+91 98450 11005",
    office: "Science Block, Chem Lab 2",
    achievements: "Best Lab Educator Award 2023, CSIR Project Collaborator, National Chemistry Olympiad Trainer",
  },
  {
    id: 6, name: "Mr. Aarav Singh", degree: "MTech", role: "Lecturer — Mathematics",
    dept: "Science", deptTag: "Science & Commerce", avatarInitials: "AS", avatarColor: "#ea580c",
    subjects: ["Mathematics", "Statistics", "Calculus"],
    classes: ["Class XI Sci", "Class XII Sci", "Class XI Com", "Class XII Com"],
    bio: "Ex-ISRO scientist turned mathematics educator. Makes calculus and statistics accessible through real-world engineering and data problems.",
    stats: { years: 7, papers: 8, students: 980 },
    email: "a.singh@stantonys.edu.in", phone: "+91 98450 11006",
    office: "Science Block, Room 201",
    achievements: "ISRO Young Scientist Award (2017), JEE Advanced Rank Holder Training — 100% success rate, TEDx Speaker 2024",
  },
  {
    id: 7, name: "Dr. Sunita Rao", degree: "PhD", role: "Lecturer — Biology",
    dept: "Science", deptTag: "Science Dept.", avatarInitials: "SR", avatarColor: "#16a34a",
    subjects: ["Biology", "Botany", "Zoology", "Genetics"],
    classes: ["Class XI Sci", "Class XII Sci"],
    bio: "Researcher-turned-teacher with specialisation in molecular biology and genetics. Has co-authored a widely used Class XII Biology textbook.",
    stats: { years: 16, papers: 31, students: 1250 },
    email: "s.rao@stantonys.edu.in", phone: "+91 98450 11007",
    office: "Science Block, Bio Lab 1",
    achievements: "NCERT Textbook Author (2020), NEET Top Scorer Mentor, DBT Research Fellowship Recipient",
  },
  {
    id: 8, name: "Ms. Clara Fernandes", degree: "MA", role: "Lecturer — English",
    dept: "Arts", deptTag: "Languages Dept.", avatarInitials: "CF", avatarColor: "#be185d",
    subjects: ["English Literature", "English Language", "Creative Writing"],
    classes: ["Class XI Sci", "Class XII Sci", "Class XI Com", "Class XII Com", "Class XI Arts", "Class XII Arts"],
    bio: "Published author and linguist who believes language shapes thought. Runs the college's award-winning literary magazine and debate club.",
    stats: { years: 11, papers: 5, students: 2600 },
    email: "c.fernandes@stantonys.edu.in", phone: "+91 98450 11008",
    office: "Arts Block, Room 108",
    achievements: "Sahitya Akademi Young Writer Grant (2021), Best English Faculty — State Award 2023, Published novel 'The Paper Boats'",
  },
  {
    id: 9, name: "Ms. Rekha Pillai", degree: "MBA", role: "Lecturer — Business Studies",
    dept: "Commerce", deptTag: "Commerce Dept.", avatarInitials: "RP", avatarColor: "#d97706",
    subjects: ["Business Studies", "Entrepreneurship", "Marketing"],
    classes: ["Class XI Com", "Class XII Com"],
    bio: "Former marketing director at a Fortune 500 firm. Brings real corporate experience into the classroom through case studies and live projects.",
    stats: { years: 6, papers: 4, students: 640 },
    email: "r.pillai@stantonys.edu.in", phone: "+91 98450 11009",
    office: "Commerce Block, Room 204",
    achievements: "Best Startup Mentor — NASSCOM 2024, Guest Lecturer at IIM Bangalore, 3 student startups funded under mentorship",
  },
];
