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
      "Recovered 300–400 wafers/day of throughput using I-MR statistical process control to isolate a downstream track bottleneck caused by a degraded buffer-unit transfer mechanism",
      "Built a Python-based overlay-correction tool that transformed 500+ wafer- and shot-level metrology measurements per lot into scanner alignment corrections, saving 250 engineering hours annually",
      "Developed and deployed a PyTorch CNN on FFT-derived heatmaps to classify spin-coater defects with 84% accuracy, automating review of 1,000+ previously manual process images per day",
      "Automated lot-level overlay metrology skip-factor resets with Python and SQL, restoring process-specific defaults while saving 50 engineering hours per week"
    ],
    tags: ["Photolithography", "Metrology", "Process Control"],
    icon: "wafer",
    summary: "A summer on the Photo Innovation and Metrology team in a high-volume chip fab, turning fab data into tools engineers actually use: code, statistics and machine learning applied to alignment, defects and throughput.",
    cases: [
      {
        tag: "Process control",
        title: "Track throughput bottleneck",
        problem: "A lithography track was moving fewer wafers than it should.",
        approach: "Used I-MR control charts on equipment performance to trace the slowdown downstream, to a degraded buffer-unit transfer mechanism.",
        result: "300–400 wafers/day recovered",
        diagram: "track",
        explainer: {
          title: "What is a track, and what do I-MR charts catch?",
          text: "The track is the machine linked to the lithography scanner that coats, bakes and develops wafers, passing them between modules with robotic arms and buffers. An I-MR chart plots each measurement and the jump between consecutive ones against control limits, so a shift in how a machine behaves stands out from normal noise.",
        },
      },
      {
        tag: "Automation",
        title: "Overlay correction tool",
        problem: "Turning overlay measurements into scanner corrections was a manual, spreadsheet-driven job.",
        approach: "Built a Python tool that transforms 500+ wafer- and shot-level metrology measurements per lot into scanner alignment corrections.",
        result: "250 engineering hours saved / yr",
        tools: ["Python", "SQL"],
        diagram: "overlay",
        explainer: {
          title: "What is overlay?",
          text: "A chip is built from dozens of patterned layers, and each one has to land almost exactly on top of the one below it. Overlay is that alignment. Metrology tools measure how far each layer is off at marks across the wafer, and those errors are turned into corrections the scanner applies to the next wafers.",
        },
      },
      {
        tag: "Machine learning",
        title: "Spin-coater defect classification",
        problem: "Process images from spin-coating equipment were reviewed by hand.",
        approach: "Converted images into FFT-derived heatmaps and trained a PyTorch convolutional neural network to classify defects.",
        result: "84% accuracy · 1,000+ images/day automated",
        tools: ["PyTorch", "FFT"],
        diagram: "cnn",
        explainer: {
          title: "Why an FFT?",
          text: "A fast Fourier transform turns an image into its frequency content, so repeating streaks, swirls and ripples show up as distinct bright spots and rings. That makes coating defects easier for a convolutional neural network, an image-recognition model, to tell apart.",
        },
      },
      {
        tag: "Automation",
        title: "Metrology skip-factor resets",
        problem: "Restoring lot-level overlay metrology skip factors to their defaults was repetitive manual work.",
        approach: "Automated the resets with Python and SQL, restoring process-specific defaults.",
        result: "50 engineering hours saved / week",
        tools: ["Python", "SQL"],
        diagram: "skip",
        explainer: {
          title: "What is a metrology skip factor?",
          text: "Fabs don't measure every lot; that would tie up expensive metrology tools. A skip factor sets how often measurement is skipped. When it drifts from the process default, a fab either measures too little or wastes tool time, so it has to be put back.",
        },
      },
    ],
  },
  {
    id: 2,
    role: "Samsung Semiconductor Research Fellow",
    company: "Samsung Semiconductor & Artie McFerrin Department of Chemical Engineering",
    period: "College Station, TX • Jan 2026 – Present",
    description: [
      "Developed a passive thermal-switching composite for lithium-ion battery thermal-runaway mitigation, using indium phase change, CaCO₃ decomposition, and a retained titanium framework to transition from heat conduction to insulation",
      "Calculated thermal conductivity (k = αρCₚ) across 50–70 wt% indium formulations, identifying 65 wt% as the strongest-performing composition across thermal response and structural integrity",
      "Fabricated composites end to end through powder mixing, pellet pressing, and 900 °C heat treatment; analyzed cross-sectional morphology and conductive pathways by SEM across 4+ prototype iterations",
      "Built a verified 1D finite-volume model of a 5-cell battery stack in Python; swept 361 barrier designs and identified a simulation-predicted hot-state conductance threshold of ~32 W m⁻² K⁻¹ for suppressing runaway propagation"
    ],
    tags: ["Battery Safety", "Thermal Management", "Simulation"],
    icon: "battery",
    summary: "Building a coating that acts like a fuse for heat: it carries heat away from battery cells normally, then turns insulating when one fails, to stop thermal runaway from spreading.",
    cases: [
      {
        tag: "Materials",
        title: "Thermal-switching composite",
        problem: "Battery barriers need to conduct heat in normal use but block it during runaway.",
        approach: "Designed a composite around indium phase change, CaCO₃ decomposition and a titanium framework, made by powder mixing, pellet pressing and 900 °C heat treatment, then studied with SEM cross-sections.",
        result: "Refined across 4+ prototype iterations",
        tools: ["SEM"],
        diagram: "switch",
        explainer: {
          title: "What is thermal runaway, and what is a thermal switch?",
          text: "When a lithium-ion cell overheats, its chemistry releases more heat, which speeds the reactions up further, and it can set off the cells next to it. A thermal switch passes heat while things are normal, then changes structure when it gets hot (here, indium melting out) so it insulates instead.",
        },
      },
      {
        tag: "Characterization",
        title: "Thermal conductivity",
        approach: "Calculated thermal conductivity (k = αρCₚ) across 50–70 wt% indium formulations.",
        result: "65 wt% indium strongest overall",
        diagram: "conductivity",
        explainer: {
          title: "What is thermal conductivity?",
          text: "Thermal conductivity, k, is how easily heat flows through a material. Here it comes from three measured properties: how fast heat spreads (thermal diffusivity, α), density (ρ) and heat capacity (Cₚ). The best formulation balances heat transport with holding together structurally.",
        },
      },
      {
        tag: "Simulation",
        title: "Barrier design sweep",
        approach: "Built a verified 1D finite-volume model of a 5-cell battery stack in Python and swept 361 barrier designs.",
        result: "~32 W m⁻² K⁻¹ hot-state conductance threshold",
        tools: ["Python", "SciPy"],
        links: [
          { label: "Read the paper", href: "/papers/switchable-barrier-runaway.pdf" },
          { label: "Code on GitHub", href: "https://github.com/adityameenak/switchable-barrier-runaway" },
        ],
        diagram: "stack",
        explainer: {
          title: "What is a finite-volume model?",
          text: "It splits the battery stack into many thin slices and tracks how much heat flows in and out of each one, step by step in time. Because heat is only ever moved between slices, energy is conserved, which makes it a reliable way to watch a heat front travel, or get stopped.",
        },
      },
    ],
  },
  {
    id: 3,
    role: "Undergraduate Researcher, Green Lab",
    company: "Artie McFerrin Department of Chemical Engineering, Texas A&M University",
    period: "College Station, TX • Aug 2025 – Present",
    description: [
      "Project: conversion of liquid polycarbosilane (PCS) into electrically conductive silicon carbide for RF susceptor applications; targeted the lowest pyrolysis temperature needed to obtain conductivity",
      "Processed liquid PCS through degassing, curing, resting, and pyrolysis; completed 10+ controlled runs at 800–1200 °C while varying temperature, ramp rate, and atmosphere",
      "Narrowed the onset of measurable electrical conductivity to 900–1000 °C using four-point probe measurements, guiding subsequent trials within the identified transition range",
      "Achieved 92% SiC phase purity using XRD, examined backbone-fiber and PCS-coating cross-sections using SEM, and evaluated RF heating at 200–300 W to assess electromagnetic coupling and temperature response"
    ],
    tags: ["Silicon Carbide", "Polymer-Derived Ceramics", "Materials Science"],
    icon: "furnace",
    summary: "Turning a liquid polymer into conductive silicon carbide, and finding the lowest bake temperature that makes it work as an RF susceptor.",
    cases: [
      {
        tag: "Process",
        title: "Pyrolysis window",
        problem: "Find the lowest pyrolysis temperature that still makes the ceramic conduct.",
        approach: "Ran 10+ controlled runs at 800–1200 °C, varying temperature, ramp rate and atmosphere, and measured conductivity with a four-point probe.",
        result: "Conductivity onset narrowed to 900–1000 °C",
        diagram: "pyrolysis",
        explainer: {
          title: "What is pyrolysis?",
          text: "Pyrolysis is baking a material at high temperature without oxygen. A preceramic polymer like polycarbosilane cures into a solid, then converts into silicon carbide ceramic. The temperature profile controls its structure, and whether it conducts electricity.",
        },
      },
      {
        tag: "Characterization",
        title: "Phase purity and RF response",
        approach: "Measured phase with XRD, imaged backbone-fiber and PCS-coating cross-sections with SEM, and tested RF heating at 200–300 W.",
        result: "92% SiC phase purity",
        tools: ["XRD", "SEM"],
        diagram: "xrd",
        explainer: {
          title: "What is an RF susceptor, and what does XRD show?",
          text: "An RF susceptor is a material that absorbs radio-frequency energy and heats up, which takes enough electrical conductivity to couple with the field. X-ray diffraction identifies which crystal phases are present, showing how much of the sample actually became silicon carbide.",
        },
      },
    ],
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
