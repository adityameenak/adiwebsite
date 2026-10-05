export const personalInfo = {
  name: "Adi",
  title: "Honors Chemical Engineering student at Texas A&M focused on semiconductors, advanced materials, and sustainable energy systems.",
  tagline: "College Station, TX • Class of 2028",
  email: "adityameenakshisundaram@gmail.com",
  linkedin: "https://www.linkedin.com/in/adityameenakshi/",
  github: "https://github.com/adityameenak",
  location: "College Station, TX"
};

export const about = {
  headline: "Better materials, and the tools to study them.",
  paragraphs: [
    "I'm a Chemical Engineering honors student at Texas A&M, fascinated by how materials are made, why they behave the way they do, and how far we can push them. My work moves between the lab and the computer, spanning materials research, semiconductor manufacturing, battery safety, and scientific computing.",
    "Here you'll find tools I've built for research discovery, chemical process optimization, and energy analytics, along with my research and writing on semiconductors and energy.",
  ],
  currently: [
    "Building heat-switching battery materials as a Samsung Semiconductor Research Fellow",
    "Turning polymers into conductive silicon carbide at Texas A&M",
    "Writing about semiconductors and energy on Substack",
  ],
};

export const experience = [
  {
    id: 1,
    role: "Photolithography & Metrology Intern",
    company: "Samsung Semiconductor",
    period: "Austin, TX • May 2026 – Aug 2026",
    description: [
      "Engineered a Python-based overlay-correction tool that converted 500+ wafer- and shot-level measurements per lot into scanner corrections, resolving multi-layer misalignments and saving 250 engineering hours annually",
      "Deployed a PyTorch CNN trained on FFT-derived heatmaps to classify spinner-tool defects, automating real-time review of 1,000+ images daily",
      "Restored throughput by 300–400 wafers/day using I-MR control charts to isolate a downstream track bottleneck and resolve a degraded buffer-unit transfer mechanism",
      "Automated resets of lot-level overlay metrology skip factors to process-type defaults using Python and SQL, eliminating manual reverts and saving 50 department-hours per week"
    ],
    tags: ["Photolithography", "Metrology", "Process Control"]
  },
  {
    id: 2,
    role: "Samsung Semiconductor Research Fellow",
    company: "Samsung Semiconductor & Artie McFerrin Department of Chemical Engineering",
    period: "College Station, TX • Jan 2026 – Present",
    description: [
      "Project: lithium-ion battery thermal-runaway mitigation using a sprayable, passive thermal-switching composite, designed to switch from heat conduction to insulation via indium melt-out, with CaCO₃ releasing CO₂ for fire mitigation and a retained titanium framework for structural support",
      "Executed synthesis end to end: mixed CaCO₃, indium, and titanium nanowires, compacted pellets, and heat-treated at 900 °C for 1 hour; examined structure and conductive pathways using SEM cross-sections across 4+ prototype iterations",
      "Compared heat-transfer response across 50–70 wt% indium pellets using hot-plate heating and top-surface temperature measurements; identified 65 wt% as the best-performing formulation tested, with improved structural integrity"
    ],
    tags: ["Battery Safety", "Nanomaterials", "Thermal Management"]
  },
  {
    id: 3,
    role: "Silicon Carbide (SiC) Researcher",
    company: "Artie McFerrin Department of Chemical Engineering, Texas A&M University",
    period: "College Station, TX • Aug 2025 – Present",
    description: [
      "Project: conversion of liquid polycarbosilane (PCS) into electrically conductive silicon carbide for RF susceptor applications, targeting the lowest pyrolysis temperature needed to obtain conductivity",
      "Executed synthesis end to end, from liquid PCS through degassing, curing, resting, and pyrolysis; completed 10+ controlled runs at 800–1200 °C, varying temperature, ramp rate, and atmosphere",
      "Narrowed the onset of measurable electrical conductivity to pyrolysis temperatures between 900 and 1000 °C using four-point probe measurements, guiding subsequent trials within that range",
      "Characterized ceramic yield and microstructure using TGA and SEM; evaluated RF heating response to assess how conversion temperature affected electromagnetic coupling and heat generation"
    ],
    tags: ["Silicon Carbide", "Polymer-Derived Ceramics", "Materials Science"]
  }
];

// Hardcoded placeholder projects
export const projects = [
  {
    id: 5,
    title: "Switchable Thermal Barriers Against Battery Runaway",
    description: "When one battery cell overheats, it can set off its neighbors like dominoes. The barrier between cells has two opposite jobs: let heat escape on a normal day, and block it when a cell fails. I built a simulation of a battery pack to test a barrier that works like a fuse for heat, conducting while it is cool and insulating once it gets hot.",
    shortDescription: "When one battery cell overheats it can set off its neighbors like dominoes. I simulated a battery pack to test a barrier that acts like a fuse for heat: it lets heat escape while cells are cool, then blocks it once a cell fails. It kept the pack as cool as a normal heat-spreading barrier day to day, yet stopped the chain reaction, and showed that what matters most is how well the barrier insulates once it's hot.",
    tags: ["Python", "Simulation", "Battery Safety", "Heat Transfer"],
    type: "Research · Technical report",
    category: "research",
    featured: true,
    lead: true,
    status: "Report",
    links: [
      { label: "Read the paper", href: "/papers/switchable-barrier-runaway.pdf", primary: true },
      { label: "Code on GitHub", href: "https://github.com/adityameenak/switchable-barrier-runaway" },
    ],
    demoUrl: null,
    githubUrl: "https://github.com/adityameenak/switchable-barrier-runaway",
  },
  {
    id: 3,
    title: "STEM Research Finder",
    description: "Co-created and launched a multi-tenant research-discovery platform supporting university-specific deployments, indexing 5,000+ STEM faculty nationwide and attracting 3,000+ student users without paid acquisition. Python data pipelines across 50+ university web sources extract and standardize faculty research profiles, deduplicate records, and automate index updates. Resume-based faculty matching and personalized outreach drafting connect student experience with relevant research labs.",
    shortDescription: "A search engine for undergrad research. It pulls faculty profiles from university websites across the country into one place, so students can search by school, field or research topic, get matched to labs from their resume, and draft a personal outreach email, instead of trawling department pages. 5,000+ faculty indexed and 3,000+ students using it, with no paid marketing.",
    lead: true,
    links: [
      { label: "Visit the site", href: "https://stemresearchfinder.tech/", primary: true },
    ],
    tags: ["Python", "Data Pipelines", "Next.js", "React"],
    type: "Web platform · Co-creator & lead developer",
    category: "web",
    featured: true,
    status: "Live",
    demoUrl: "https://stemresearchfinder.tech/",
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
    shortDescription: "30+ long-form articles on semiconductor manufacturing, materials, and energy storage — 400+ monthly readers on Substack.",
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
  { id: 'research', label: 'Research' },
  { id: 'web', label: 'Web' },
  { id: 'sustainability', label: 'Sustainability' },
  { id: 'writing', label: 'Writing' },
];

export const writing = {
  description: "I've published 30+ long-form articles on semiconductor manufacturing, materials, and energy storage, analyzing process physics, materials tradeoffs, and supply-chain limits across EUV lithography and advanced packaging for 400+ monthly readers.",
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
  gpa: "3.91/4.00",
  graduationDate: "May 2028",
  location: "College Station, TX"
};

export const technicalSkills = [
  {
    category: "Processing & Testing",
    skills: ["Photolithography", "Overlay Metrology", "Pyrolysis", "Thermal Testing", "Statistical Process Control"],
  },
  {
    category: "Characterization",
    skills: ["SEM", "XRD", "TGA", "Optical Microscopy"],
  },
  {
    category: "Programming & Data",
    skills: ["Python", "NumPy", "Pandas", "SciPy", "PyTorch", "TensorFlow", "SQL", "MATLAB", "Git", "Docker", "Linux"],
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
  { id: 1, name: "Samsung Semiconductor Research Fellowship", org: "$10,000" },
  { id: 2, name: "Samsung Semiconductor Intern Scholarship", org: "$10,000" },
  { id: 3, name: "Humba Deep Tech Fellowship", org: "$6,000" },
  { id: 4, name: "TEX-E Fellowship" },
  { id: 5, name: "Omega Chi Epsilon" },
  { id: 6, name: "Craig & Galen Brown Engineering Honors", org: "Texas A&M" },
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
