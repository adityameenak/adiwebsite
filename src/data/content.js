export const personalInfo = {
  name: "Adi",
  fullName: "Aditya Meenakshisundaram",
  title: "Honors Chemical Engineering student at Texas A&M focused on semiconductors, advanced materials, and sustainable energy systems.",
  tagline: "Houston, TX • Class of 2028",
  email: "adityameenakshisundaram@gmail.com",
  linkedin: "https://www.linkedin.com/in/adityameenakshi/",
  location: "Houston, Texas"
};

export const about = {
  paragraph: "I'm an Honors Chemical Engineering student at Texas A&M University with a deep interest in semiconductor manufacturing, materials science, battery safety, and AI-driven process optimization. My work spans from advanced semiconductor fabrication to sustainable energy systems, and I'm passionate about applying engineering principles to solve real-world challenges. Through research, industry fellowships, and hands-on projects, I focus on bridging theory with practical application in cutting-edge technology."
};

export const experience = [
  {
    id: 1,
    role: "Samsung Semiconductor Undergraduate Fellow",
    company: "Samsung Austin Semiconductor",
    period: "Jan 2026 - Present",
    description: [
      "Researching indium nanowire weave architectures to contain thermal runaway and protect adjacent cells in lithium-ion batteries",
      "Fabricating nanowire samples and characterizing thermal barrier performance under controlled heating conditions",
      "Iterating on processing parameters with mentors to evaluate safety outcomes across design cycles",
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

// Extended projects with categories for filtering
export const projects = [
  {
    id: 1,
    title: "Sustainapath",
    description: "AI-powered platform that analyzes chemical processes across sustainability, cost, and time. Generates quantitative performance scores and targeted optimization recommendations.",
    shortDescription: "AI sustainability scoring for chemical processes",
    tags: ["AI", "Python", "Process Engineering"],
    category: "sustainability",
    impact: "3 processes optimized",
    featured: true,
    demoUrl: null,
    githubUrl: "https://github.com/adimeenakshi/sustainapath",
    image: null, // Add image path if available
  },
  {
    id: 2,
    title: "SolarIQ",
    description: "Data-driven solar energy analysis tool modeling panel performance under real-world conditions. Integrates environmental data with thermodynamic models to estimate energy output.",
    shortDescription: "Solar panel performance prediction tool",
    tags: ["Python", "Data Analytics", "Thermodynamics"],
    category: "sustainability",
    impact: "15% accuracy improvement",
    featured: true,
    demoUrl: null,
    githubUrl: "https://github.com/adimeenakshi/solariq",
    image: null,
  },
  {
    id: 3,
    title: "Thermal Barrier Simulator",
    description: "COMSOL-based simulation tool for modeling thermal runaway containment in battery cells. Validates nanowire weave designs before physical fabrication.",
    shortDescription: "Battery thermal runaway simulation",
    tags: ["COMSOL", "MATLAB", "Simulation"],
    category: "semiconductors",
    impact: "Reduced prototyping by 40%",
    featured: true,
    demoUrl: null,
    githubUrl: null,
    image: null,
  },
  {
    id: 4,
    title: "Process Yield Predictor",
    description: "Machine learning model predicting semiconductor fabrication yield based on process parameters. Trained on historical fab data to identify optimal operating windows.",
    shortDescription: "ML-powered fab yield optimization",
    tags: ["Python", "ML", "Semiconductors"],
    category: "semiconductors",
    impact: "2% yield increase",
    featured: true,
    demoUrl: null,
    githubUrl: "https://github.com/adimeenakshi/yield-predictor",
    image: null,
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "Personal portfolio built with React and Tailwind CSS. Features smooth scroll animations, editorial typography, and accessible design patterns.",
    shortDescription: "React + Tailwind editorial portfolio",
    tags: ["React", "Tailwind", "Framer Motion"],
    category: "web",
    impact: "This site!",
    featured: false,
    demoUrl: "https://adimeenakshi.com",
    githubUrl: "https://github.com/adimeenakshi/portfolio",
    image: null,
  },
  {
    id: 6,
    title: "ChemCalc Toolkit",
    description: "Suite of chemical engineering calculation tools for mass balance, heat transfer, and reactor design. Used by 50+ students in unit operations courses.",
    shortDescription: "Engineering calculation toolkit",
    tags: ["Python", "Streamlit", "ChemE"],
    category: "tools",
    impact: "50+ active users",
    featured: false,
    demoUrl: null,
    githubUrl: "https://github.com/adimeenakshi/chemcalc",
    image: null,
  },
];

// Project filter categories
export const projectCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'semiconductors', label: 'Semiconductors' },
  { id: 'sustainability', label: 'Sustainability' },
  { id: 'web', label: 'Web' },
  { id: 'tools', label: 'Tools' },
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

export const awards = [
  {
    id: 1,
    title: "Samsung Semiconductor Fellow Scholarship",
    date: "Jan 2026",
    description: "$10,000 competitive fellowship"
  },
  {
    id: 2,
    title: "Dean's List",
    date: "Spring 2025",
    description: "College of Engineering, 4.0 GPA"
  }
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
