export const personalInfo = {
  name: "Adi",
  title: "Honors Chemical Engineering student at Texas A&M focused on semiconductors, advanced materials, and sustainable energy systems.",
  tagline: "College Station, TX • Class of 2028",
  email: "adityameenakshisundaram@gmail.com",
  linkedin: "https://www.linkedin.com/in/adityameenakshi/",
  location: "College Station, TX"
};

export const about = {
  paragraph: "I'm an Honors Chemical Engineering student at Texas A&M University with a deep interest in semiconductor manufacturing, materials science, battery safety, and AI-driven process optimization. My work spans from advanced semiconductor fabrication to sustainable energy systems, and I'm passionate about applying engineering principles to solve real-world challenges. Through research, industry fellowships, and hands-on projects, I focus on bridging theory with practical application in cutting-edge technology."
};

export const experience = [
  {
    id: 1,
    role: "Photolithography & Metrology Intern",
    company: "Samsung Austin Semiconductor",
    period: "Austin, TX • May 2026 – Present",
    description: [
      "Engineered a Streamlit-deployed overlay-correction algorithm converting 500+ wafer- and shot-level measurements into lot-level scanner corrections, exposing abnormal multi-layer misalignment at source and saving 250 engineering hours",
      "Deployed a CNN defect-classification system trained on FFT-generated heatmaps of live TEL lithography-tool image streams, replacing manual image review with real-time technician alerts",
      "Recovered 300–400 wafers per day (5% of tool capacity) by tracing a wafer-routing anomaly to a slow buffer robot arm stalling lots at downstream track stations, using SPC (I-MR) control charts on tool-level throughput",
      "Built a predictive modeling application forecasting photoresist film thickness from spin-coater dispense parameters, calculating spin-speed setpoints to hold lots within a 10-Å SPC window and cutting wafer qualification time by 15%"
    ],
    tags: ["Photolithography", "Metrology", "Process Control"]
  },
  {
    id: 2,
    role: "Semiconductor Fellow",
    company: "Samsung Austin Semiconductor",
    period: "College Station, TX • Jan 2026 – Present",
    description: [
      "Fabricated 1–2 mm indium/titanium nanowire composites transitioning from thermally conductive to insulating states at critical temperatures, suppressing heat propagation during lithium-ion battery thermal runaway without active control",
      "Mapped composition-to-threshold behavior across 50 wt% and 75 wt% formulations by resolving thermal-conductivity response against porosity, composition, and indium content, isolating the loading window triggering switching",
      "Linked switching thresholds and mechanical integrity to microstructure and conductive-pathway formation through SEM cross-sectioning across 4+ iterations, guiding each reformulation"
    ],
    tags: ["Battery Safety", "Nanomaterials", "Thermal Management"]
  },
  {
    id: 3,
    role: "Silicon Carbide (SiC) Researcher",
    company: "Green Group, Texas A&M University",
    period: "College Station, TX • Aug 2025 – Present",
    description: [
      "Established a reproducible polycarbosilane-to-SiC conversion window viable for high-power semiconductor integration, narrowing pyrolysis ramp rate and atmosphere parameters across 10+ controlled runs spanning 800–1200°C",
      "Pinpointed the cracking mechanisms limiting polymer-to-ceramic conversion quality by correlating thermal processing conditions against SiC morphology, ceramic yield, and electrical conductivity via SEM, TGA, and four-point probe analysis",
      "Cut heating non-uniformity across SiC fiber cross-sections by demonstrating RF-driven volumetric heating as a faster, energy-efficient alternative to conventional furnace pyrolysis for ceramic conversion"
    ],
    tags: ["Silicon Carbide", "Polymer-Derived Ceramics", "Materials Science"]
  }
];

// Hardcoded placeholder projects
export const projects = [
  {
    id: 3,
    title: "STEM Research Finder",
    description: "Built a platform that helps students across the country discover STEM research opportunities more easily by exploring labs, research areas, and faculty interests at universities nationwide. Designed to make research more accessible and help students find opportunities aligned with their goals, no matter where they're located.",
    shortDescription: "Platform helping students nationwide discover STEM research opportunities by exploring labs, faculty interests, and research areas across universities.",
    tags: ["Next.js", "React", "Tailwind CSS"],
    category: "web",
    featured: true,
    status: "Live",
    demoUrl: "https://stemresearchfinder.vercel.app/",
    githubUrl: null,
  },
  {
    id: 1,
    title: "Sustainapath",
    description: "Built an AI-driven platform that analyzes chemical and industrial workflows, identifies inefficiencies, and suggests optimized process improvements with sustainability, cost, and time considerations.",
    shortDescription: "AI-powered process optimization platform for chemical workflows, with recommendations focused on sustainability, efficiency, and cost.",
    tags: ["React", "AI", "Vercel", "Process Optimization"],
    type: "AI · Chemical Engineering",
    category: "sustainability",
    featured: true,
    status: "Live",
    demoUrl: "https://sustainapath.vercel.app/",
    githubUrl: null,
  },
  {
    id: 2,
    title: "SolarIQ",
    description: "Solar energy analytics platform for tracking, forecasting, and optimizing energy production from solar installations. Built with Python and Streamlit, enabling users to monitor real-time output and identify efficiency opportunities.",
    shortDescription: "Solar analytics platform for tracking and optimizing solar energy production — live on Streamlit.",
    tags: ["Python", "Streamlit", "Analytics"],
    category: "sustainability",
    featured: true,
    status: "Live",
    demoUrl: "https://iqsolar.streamlit.app/",
    githubUrl: null,
  },
  {
    id: 4,
    title: "Substack",
    description: "Long-form writing on semiconductors, sustainable energy, and emerging technologies — covering topics like advanced packaging, quantum computing, and digital twins.",
    shortDescription: "Writing on semiconductors, sustainable energy, and emerging tech — 400+ monthly readers on Substack.",
    tags: ["Writing", "Semiconductors", "Sustainability"],
    category: "writing",
    featured: true,
    status: "Live",
    demoUrl: "https://adimeenak.substack.com/",
    githubUrl: null,
  },
];

// Project filter categories
export const projectCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web' },
  { id: 'sustainability', label: 'Sustainability' },
  { id: 'writing', label: 'Writing' },
];

export const writing = {
  description: "I write long-form articles on semiconductors, sustainable energy, and emerging technologies, reaching 400+ monthly readers from academic and professional audiences.",
  platform: "Substack",
  readers: "400+",
  substackUrl: "https://adimeenak.substack.com/",
  articles: [
    {
      id: 1,
      title: "Stacked, Bonded, Fused: The Era Of Advanced Packaging",
      excerpt: "How chiplet architectures and 3D integration are reshaping semiconductor manufacturing and enabling the next generation of high-performance computing.",
      date: "Jan 2026",
      tag: "Semiconductors",
      url: "https://adimeenak.substack.com/"
    },
    {
      id: 2,
      title: "Quantum Computing - The Next Frontier",
      excerpt: "Breaking down quantum computing fundamentals, current hardware approaches, and the engineering challenges standing between us and practical quantum advantage.",
      date: "Dec 2025",
      tag: "Emerging Tech",
      url: "https://adimeenak.substack.com/"
    },
    {
      id: 3,
      title: "Digital Twins And The Future Of Renewable Energy",
      excerpt: "Exploring how digital twin technology is optimizing wind farms, solar installations, and grid infrastructure for maximum efficiency and reliability.",
      date: "Nov 2025",
      tag: "Sustainability",
      url: "https://adimeenak.substack.com/"
    }
  ]
};

export const leadership = [];

export const education = {
  school: "Texas A&M University",
  degree: "Bachelor of Science",
  major: "Honors Chemical Engineering",
  gpa: "3.86/4.00",
  graduationDate: "May 2028",
  location: "College Station, TX"
};

export const technicalSkills = [
  {
    category: "Programming & Data Analysis",
    skills: ["Python", "NumPy", "Pandas", "Matplotlib", "scikit-learn", "MATLAB", "SQL", "HTML"],
  },
  {
    category: "Characterization & Instrumentation",
    skills: ["SEM", "XRD", "FTIR", "TGA", "Optical Microscopy", "Thermal Conductivity Measurement"],
  },
  {
    category: "Materials & Processes",
    skills: ["Pyrolysis", "Nanowire Fabrication", "RF Heating", "Thermodynamics"],
  },
];

export const advancedCoursework = [
  { code: "CHEN 2100", name: "Process Principles" },
  { code: "CHEN 3210", name: "Chemical Engineering Thermodynamics I" },
  { code: "CHEN 3220", name: "Chemical Engineering Thermodynamics II" },
  { code: "CHEN 3320", name: "Heat Transfer Operations" },
  { code: "CHEN 3330", name: "Mass Transfer Operations" },
  { code: "CHEN 4300", name: "Chemical Reaction Engineering" },
  { code: "CHEN 4350", name: "Process Dynamics & Control" },
  { code: "MSEN 3100", name: "Introduction to Materials Science" },
  { code: "MATH 2415", name: "Calculus III" },
  { code: "MATH 3351", name: "Engineering Mathematics" },
  { code: "PHYS 2325", name: "University Physics I" },
  { code: "PHYS 2326", name: "University Physics II" },
];

export const awards = [
  { id: 1, name: "Samsung Semiconductor Fellowship" },
  { id: 2, name: "TEX-E Fellowship" },
  { id: 3, name: "Humba Ventures Deep Tech Fellowship" },
  { id: 4, name: "Craig & Galen Brown Engineering Honors", org: "Texas A&M" }
];

export const navigation = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Writing", href: "#writing" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" }
];
