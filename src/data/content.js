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
    id: 6,
    role: "Fabrication Engineering Intern",
    company: "Samsung Austin Semiconductor",
    period: "May 2026 - Present",
    description: [
      "Engineered cloud-based data analytics and process-control pipelines (Python, SQL, Streamlit) to automate lithography workflows, parsing and validating 5,000+ metrology data points to optimize performance across multiple toolsets",
      "Developed a mathematical overlay correction algorithm that transforms 500+ wafer-level WK/RK measurements into lot-level scanner offsets, identifying abnormal multi-layer alignment behavior to protect downstream device yield",
      "Architected a predictive Photoresist (PR) modeling application to dynamically optimize spin-coater dispense parameters and fluid dynamics, targeting a strict 10-angstrom film thickness range; automated equipment adjustments reduced test-wafer qualification time by 15%",
    ],
    tags: ["Photolithography", "Metrology", "Semiconductor Fabrication"]
  },
  {
    id: 5,
    role: "TEX-E Fellow",
    company: "Texas Energy & Entrepreneurship (TEX-E)",
    period: "Jan 2026 - Present",
    description: [
      "Selected as a Fellow exploring commercialization of emerging energy technologies at the intersection of chemical engineering and entrepreneurship",
      "Building cross-sector partnerships between academia, industry, and investors to accelerate commercialization pathways for emerging energy technologies including advanced materials and process innovations"
    ],
    tags: ["Energy", "Climate", "Entrepreneurship", "Fellowship"]
  },
  {
    id: 1,
    role: "Samsung Semiconductor Undergraduate Fellow",
    company: "Samsung Austin Semiconductor",
    period: "Jan 2026 - Present",
    description: [
      "Engineered 1–2 mm thick indium/titanium nanowire composite formulations to create a passive thermal-switching material, reducing heat propagation during lithium-ion battery thermal runaway",
      "Characterized thermal transport behavior across 50 wt% and 75 wt% nanowire-loaded formulations, varying porosity, composition, and indium content using thermal conductivity measurements and controlled heating experiments",
      "Analyzed SEM morphology across multiple formulation iterations to correlate composite structure, conductive pathway formation, and processing conditions with mechanical integrity and thermal-switching performance",
      "Awarded $10,000 merit-based fellowship for battery safety and advanced materials research"
    ],
    tags: ["Battery Safety", "Nanomaterials", "Thermal Management", "Materials Science"]
  },
  {
    id: 2,
    role: "Silicon Carbide (SiC) Researcher",
    company: "Green Group, Texas A&M",
    period: "Aug 2025 - Present",
    description: [
      "Processing polycarbosilane precursor films and converting them to silicon carbide via controlled pyrolysis",
      "Characterizing how temperature and atmosphere conditions affect SiC film morphology and conductivity",
      "Contributing to polymer-derived ceramics research for high-temperature applications"
    ],
    tags: ["Silicon Carbide", "Polymer-Derived Ceramics", "Thermal Processing"]
  },
  {
    id: 3,
    role: "Sustainable Energy Researcher",
    company: "Holtzapple Group, Texas A&M",
    period: "Jan 2025 - Jul 2025",
    description: [
      "Conducted fermentation experiments to optimize succinic acid yield from biomass feedstocks",
      "Analyzed samples using gas chromatography and UV-Vis spectroscopy",
      "Developed MATLAB models to compare experimental results against process predictions"
    ],
    tags: ["Sustainable Energy", "Bioprocessing", "Data Analysis"]
  },
  {
    id: 4,
    role: "External Deputy, Sophomore Retreat",
    company: "AIChE Texas A&M Chapter",
    period: "Sep 2025 - Present",
    description: [
      "Leading sponsorship outreach to regional companies, coordinating logistics for recruiter attendance and event funding",
      "Managing communication with industry contacts and internal committee members to align timelines and deliverables",
      "Supporting Professional Development Committee initiatives focused on resume workshops and networking events"
    ],
    tags: ["Leadership", "Event Coordination", "Industry Outreach"]
  }
];

// Hardcoded placeholder projects
export const projects = [
  {
    id: 3,
    title: "Aggie Research Finder",
    description: "Built a platform that helps Texas A&M students discover undergraduate research opportunities more easily by exploring labs, research areas, and faculty interests in one place. Designed to make research more accessible and help students find opportunities aligned with their goals.",
    shortDescription: "Platform helping Texas A&M students discover undergraduate research opportunities by exploring labs, faculty interests, and research areas in one place.",
    tags: ["Next.js", "React", "Tailwind CSS"],
    category: "web",
    featured: true,
    status: "Live",
    demoUrl: "https://aggie-research-finder.vercel.app/",
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

export const awards = [];

export const navigation = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Writing", href: "#writing" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" }
];
