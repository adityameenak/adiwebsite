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
    description: "AI-assisted process optimization platform for sustainable chemical processes, helping engineers analyze and reduce environmental impact across production workflows.",
    shortDescription: "AI-assisted sustainable process optimization platform for chemical engineering workflows.",
    tags: ["Sustainability", "Optimization", "AI"],
    category: "sustainability",
    featured: true,
    status: "In Progress",
    demoUrl: null,
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
    status: "Completed",
    demoUrl: "https://iqsolar.streamlit.app/",
    githubUrl: null,
  },
];

// Project filter categories
export const projectCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web' },
  { id: 'sustainability', label: 'Sustainability' },
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
