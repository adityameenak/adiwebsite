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
    company: "Samsung Semiconductor",
    period: "Austin, TX • May 2026 – Aug 2026",
    description: [
      "Architected a Python-based overlay-correction tool converting 500+ wafer- and shot-level measurements per lot into scanner correction sets, resolving multi-layer misalignment to the source layer and saving 250 engineering hours annually",
      "Deployed a PyTorch CNN defect classifier trained on FFT-derived heatmaps from spinner-tool imagery, replacing manual review with automated, real-time defect classification",
      "Recovered 300–400 wafers/day by using I-MR control charts to isolate and resolve a downstream track bottleneck caused by a degraded buffer unit transfer mechanism",
      "Automated the restoration of lot-level overlay metrology skip factors (1/k) to process-type defaults using Python and SQL, replacing a manual revert step and saving 50 department-hours/week"
    ],
    tags: ["Photolithography", "Metrology", "Process Control"]
  },
  {
    id: 2,
    role: "Samsung Semiconductor Research Fellow",
    company: "Samsung Semiconductor",
    period: "College Station, TX • Jan 2026 – Present",
    description: [
      "Fabricated 1–2 mm indium/titanium nanowire composites capable of autonomous thermal switching, suppressing heat propagation during lithium-ion battery thermal runaway without active control",
      "Mapped thermal-conductivity responses against porosity and indium content across 50 wt% and 75 wt% formulations, identifying the material-loading range associated with thermal switching",
      "Analyzed conductive-pathway formation and mechanical integrity via SEM cross-sections across 4+ prototype iterations, using microstructural data to guide material reformulation"
    ],
    tags: ["Battery Safety", "Nanomaterials", "Thermal Management"]
  },
  {
    id: 3,
    role: "Silicon Carbide (SiC) Researcher",
    company: "Green Group, Texas A&M University",
    period: "College Station, TX • Aug 2025 – Present",
    description: [
      "Optimized pyrolysis ramp rates and atmosphere parameters (800–1200°C) across 10+ controlled runs, establishing a reproducible polycarbosilane-to-SiC conversion window for high-power device integration",
      "Correlated thermal processing conditions with SiC morphology, ceramic yield, and electrical conductivity via SEM, TGA, and four-point probe analysis, isolating the cracking mechanisms limiting polymer-to-ceramic conversion",
      "Demonstrated RF-driven volumetric heating as a faster, energy-efficient alternative to conventional furnace pyrolysis, mitigating cross-sectional heating non-uniformity during ceramic conversion"
    ],
    tags: ["Silicon Carbide", "Polymer-Derived Ceramics", "Materials Science"]
  }
];

// Hardcoded placeholder projects
export const projects = [
  {
    id: 3,
    title: "STEM Research Finder",
    description: "Co-created and lead development of a research-discovery platform indexing 5,000+ STEM faculty across universities nationwide, grown to 3,000+ active student users with no paid acquisition. Python scraping and normalization pipelines pull research interests, lab affiliations, and departmental data from 50+ structurally inconsistent university sites, deduplicating records and auto-refreshing the index bimonthly. Multi-attribute search across institution, discipline, and research area replaces hours of manual department-page browsing with a single query.",
    shortDescription: "Research-discovery platform indexing 5,000+ STEM faculty nationwide, used by 3,000+ students with no paid acquisition.",
    tags: ["Python", "Web Scraping", "Next.js", "React"],
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
    shortDescription: "20+ long-form articles on semiconductor manufacturing, materials, and energy storage — 400+ monthly readers on Substack.",
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
  description: "I've published 20+ long-form articles on semiconductor manufacturing, materials, and energy storage, analyzing process physics, materials tradeoffs, and supply-chain limits across EUV lithography and advanced packaging for 400+ monthly readers.",
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
    category: "Materials & Processes",
    skills: ["Semiconductor Manufacturing", "Photolithography", "Nanowire Fabrication", "Thin Film Processing"],
  },
  {
    category: "Characterization",
    skills: ["SEM", "XRD", "FTIR", "TGA", "Optical Microscopy"],
  },
  {
    category: "Programming & Data",
    skills: ["Python", "NumPy", "Pandas", "scikit-learn", "PyTorch", "SQL", "MATLAB"],
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
