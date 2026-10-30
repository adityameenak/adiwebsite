export const personalInfo = {
  name: "Adi",
  title: "Honors Chemical Engineering student at Texas A&M working on battery safety and advanced materials.",
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
    org: "Samsung Semiconductor",
    place: "Austin, TX",
    blurb: "Turned fab data into tools engineers actually use: statistics, code and machine learning for alignment, defects and throughput.",
    stats: [["300–400", "wafers/day recovered"], ["250", "engineering hours saved a year"], ["84%", "defect classifier accuracy"]],
    poster: "track",
    walkthrough: {
      title: "Four problems in a chip fab",
      subtitle: "Photolithography and metrology · Samsung Semiconductor",
      note: "Illustrative diagrams. No Samsung data or images are shown.",
      steps: [
        { label: "Bottleneck", diagram: "track", result: "300–400 wafers/day recovered", text: "A lithography track was moving fewer wafers than it should. I used I-MR control charts to trace the slowdown downstream, to a degraded buffer-unit transfer mechanism." },
        { label: "Overlay", diagram: "overlay", result: "250 engineering hours saved a year", text: "Each new layer has to land exactly on the one below. Turning overlay measurements into scanner corrections was a manual spreadsheet job, so I built a Python tool that handles 500+ measurements per lot." },
        { label: "Defects", diagram: "cnn", result: "84% accuracy · 1,000+ images/day automated", text: "Spin-coating images were reviewed by hand. I turned them into FFT heatmaps and trained a PyTorch neural network to classify the defects." },
        { label: "Metrology", diagram: "skip", result: "50 engineering hours saved a week", text: "Skip factors set how often a lot gets measured, and resetting them to their defaults was repetitive work. I automated it with Python and SQL." },
      ],
    },
    cases: [
      {
        tag: "Process control",
        title: "Track throughput bottleneck",
        problem: "A lithography track was moving fewer wafers than it should.",
        approach: "Used I-MR control charts on equipment performance to trace the slowdown downstream, to a degraded buffer-unit transfer mechanism.",
        result: "300–400 wafers/day recovered",
        diagram: "track",
        caption: "Wafers move through the track from left to right and pile up in front of the slow buffer arm. The chart below shows the sudden jump that gave the problem away.",
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
        caption: "Each new layer has to sit exactly on top of the one below. The tool measures how far off it is, works out the fix, and tells the scanner how to line up the next wafers.",
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
        caption: "A photo of the wafer is turned into a pattern map (the FFT), and a neural network learns which patterns mean which kind of defect.",
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
        caption: "Not every lot gets measured. Ticked boxes were measured, dashed ones skipped. When that setting drifts, the automation snaps it back to the right default.",
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
    org: "Samsung Semiconductor × Texas A&M",
    place: "College Station, TX",
    blurb: "Building a coating that acts like a fuse for heat, so one failing battery cell can't set off the next.",
    stats: [["65 wt%", "strongest indium composition"], ["361", "barrier designs simulated"], ["~32 W/m²·K", "hot-state limit found"]],
    poster: "switch",
    walkthrough: {
      title: "Building a fuse for heat",
      subtitle: "Thermal-switching battery composite · Research fellowship",
      note: "Schematic diagrams, not measured data.",
      steps: [
        { label: "Design", diagram: "switch", text: "The composite has three ingredients with separate jobs: indium melts out to break the heat path, calcium carbonate releases CO₂ to help suppress fire, and a titanium framework holds it together." },
        { label: "Make", chain: ["Mix powders", "Press pellets", "Heat to 900 °C", "Inspect by SEM"], text: "I made each composite end to end, then cut cross-sections to check the conductive pathways and structure, refining the recipe over 4+ prototype iterations." },
        { label: "Measure", diagram: "conductivity", text: "Thermal conductivity comes from k = αρCₚ. I calculated it across formulations from 50 to 70 wt% indium to see how composition changes heat transport." },
        { label: "Simulate", diagram: "stack", text: "I built a verified 1D finite-volume model of a five-cell stack in Python and swept 361 barrier designs to see which ones stop runaway from spreading." },
        { label: "Findings", findings: [["65 wt%", "indium balanced thermal response with structural integrity"], ["~32 W/m²·K", "is the hot-state conductance a barrier must stay below in simulation"], ["1 of 5", "cells lost, while staying as cool as a normal barrier in everyday use"]], text: "Together these point to one clear target for a real material to hit." },
      ],
    },
    kind: "research",
    story: {
      project: {
        text: "When one lithium-ion cell overheats, it can set off the cells next to it in a chain reaction called thermal runaway. The barrier between cells has two jobs that pull in opposite directions: carry heat away on a normal day, and block it the moment a cell fails. This project is a passive coating that does both. It conducts heat normally and switches to insulating when things get dangerous, with no sensors or electronics.",
        diagram: "switch",
        caption: "Left: when the battery is cool, connected indium carries heat through the barrier. Right: when a cell overheats, the indium melts out and the barrier blocks the heat.",
        explainer: {
          title: "What is thermal runaway?",
          text: "When a lithium-ion cell gets hot enough, its chemistry starts releasing heat on its own, which heats it further and speeds the reactions up even more. That runaway can take a cell to several hundred degrees and push its neighbors past the same tipping point.",
        },
      },
      approach: [
        {
          title: "Designed the switch",
          text: "Built the composite around three ingredients with separate jobs: indium, which melts out at high temperature to break the heat path; calcium carbonate (CaCO₃), which decomposes to release CO₂ that helps suppress fire; and a titanium framework that holds the structure together.",
        },
        {
          title: "Made and refined it",
          text: "Fabricated each composite end to end through powder mixing, pellet pressing and 900 °C heat treatment, then cut cross-sections and used SEM to check the conductive pathways and structural integrity, refining the recipe over 4+ prototype iterations.",
        },
        {
          title: "Measured how well it carries heat",
          text: "Calculated thermal conductivity, k = αρCₚ, across formulations from 50 to 70 wt% indium to see how composition and porosity change heat transport.",
          diagram: "conductivity",
          caption: "Thermal conductivity comes from three measurements: how fast heat spreads, density and heat capacity.",
        },
        {
          title: "Simulated it at the battery-pack scale",
          text: "Built a verified 1D finite-volume model of a 5-cell battery stack in Python and swept 361 barrier designs to see which ones stop runaway from spreading.",
          diagram: "stack",
          caption: "Five cells in a row. The first is in thermal runaway, and the switched-off barrier next to it keeps the heat from reaching the others.",
          links: [
            { label: "Read the paper", href: "/papers/switchable-barrier-runaway.pdf" },
            { label: "Code on GitHub", href: "https://github.com/adityameenak/switchable-barrier-runaway" },
          ],
        },
      ],
      findings: [
        "65 wt% indium was the strongest composition, balancing thermal response with structural integrity.",
        "In simulation, a barrier stops the chain reaction when its hot-state conductance stays below about 32 W m⁻² K⁻¹: one clear target for a real material to hit.",
        "A switching barrier kept cells as cool as an ordinary heat-spreading barrier in normal use, while still containing runaway to the first cell.",
      ],
    },
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
    org: "Texas A&M · Green Lab",
    place: "College Station, TX",
    blurb: "Turning a liquid polymer into conductive silicon carbide, and finding the lowest bake temperature that works.",
    stats: [["92%", "SiC phase purity"], ["900–1000 °C", "where conductivity switches on"], ["10+", "controlled furnace runs"]],
    poster: "pyrolysis",
    walkthrough: {
      title: "From liquid polymer to conductive ceramic",
      subtitle: "Polymer-derived silicon carbide · Green Lab",
      note: "Schematic diagrams, not measured data.",
      steps: [
        { label: "Goal", diagram: "pyrolysis", text: "Silicon carbide can heat up inside a radio-frequency field, which makes it a useful RF susceptor. The goal is the lowest bake temperature that still makes it conduct." },
        { label: "Bake", chain: ["Degas", "Cure", "Rest", "Pyrolyze at 800–1200 °C"], text: "I took liquid polycarbosilane through every stage, completing 10+ controlled runs while varying the temperature, ramp rate and atmosphere." },
        { label: "Measure", findings: [["900–1000 °C", "is where four-point probe readings show conductivity switching on"]], text: "I measured each run with a four-point probe, then focused later trials on the range where the material started to conduct." },
        { label: "Check", diagram: "xrd", text: "XRD showed how much of the sample became silicon carbide, SEM showed the cross-sections, and RF heating at 200–300 W showed how conversion temperature affects heating." },
        { label: "Findings", findings: [["900–1000 °C", "narrows where the search for the lowest workable temperature needs to focus"], ["92%", "silicon carbide phase purity, measured by XRD"]], text: "The next trials can now focus on a much narrower range." },
      ],
    },
    kind: "research",
    story: {
      project: {
        text: "Silicon carbide (SiC) is a tough ceramic that can heat up inside a radio-frequency field, which makes it useful as an RF susceptor. This project makes it from a liquid polymer, polycarbosilane (PCS), by baking it in a furnace. The goal is to find the lowest bake temperature that still makes the ceramic conduct electricity.",
        diagram: "pyrolysis",
        caption: "The furnace heats the liquid polymer until it turns into ceramic. Somewhere between 900 and 1000 °C, the material starts to conduct electricity.",
        explainer: {
          title: "What is pyrolysis?",
          text: "Pyrolysis is baking a material at high temperature without oxygen. A preceramic polymer like polycarbosilane cures into a solid, then converts into silicon carbide ceramic. The temperature profile controls its structure, and whether it conducts.",
        },
      },
      approach: [
        {
          title: "Turned liquid polymer into ceramic",
          text: "Took liquid PCS through degassing, curing, resting and pyrolysis, completing 10+ controlled runs between 800 and 1200 °C while varying the temperature, ramp rate and atmosphere.",
        },
        {
          title: "Measured when it starts to conduct",
          text: "Used four-point probe measurements on each run to track electrical conductivity against conversion temperature, then focused later trials on the range where it switched on.",
        },
        {
          title: "Checked what it became, and how it heats",
          text: "Used XRD to measure how much of the sample became silicon carbide, SEM to examine backbone-fiber and PCS-coating cross-sections, and RF heating at 200–300 W to see how conversion temperature affects electromagnetic coupling and temperature response.",
          diagram: "xrd",
          caption: "Left: the X-ray scan shows peaks that match silicon carbide. Right: the sample heats up inside a radio-frequency coil.",
        },
      ],
      findings: [
        "Measurable electrical conductivity switches on between 900 and 1000 °C, narrowing where the search for the lowest workable temperature needs to focus.",
        "The converted material reached 92% silicon carbide phase purity, measured by XRD.",
      ],
    },
  }
];

// Hardcoded placeholder projects
export const projects = [
  {
    id: 5,
    title: "Switchable Thermal Barriers Against Battery Runaway",
    description: "When one battery cell overheats, it can set off its neighbors like dominoes. The barrier between cells has two opposite jobs: let heat escape on a normal day, and block it when a cell fails. I built a simulation of a battery pack to test a barrier that works like a fuse for heat, conducting while it is cool and insulating once it gets hot.",
    shortDescription: "When one battery cell overheats, it can set off its neighbors like dominoes. I simulated a pack to test a barrier that works like a fuse for heat: it conducts while cells are cool and insulates once one fails.",
    image: { src: "/images/projects/battery-heatmap.jpg", alt: "Heatmap from the simulation: with a conductor heat spreads to all five cells, with the switchable barrier it stays in cell 1" },
    paperImage: { src: "/images/projects/paper-first-page.jpg", alt: "First page of the technical report" },
    stats: [["1 of 5", "cells lost with the switch"], ["38.0 °C", "peak in normal use"], ["361", "designs simulated"]],
    tags: ["Python", "Simulation", "Battery Safety", "Heat Transfer"],
    type: "Research · Technical report",
    category: "research",
    featured: true,
    lead: true,
    walkthrough: "battery",
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
    description: "Co-founded a research-discovery platform that matches students to faculty by research interest, and lead its development. Grew it to 3,000+ users and expanded it from Texas A&M into a multi-tenant platform indexing 9,088 STEM faculty across 9 universities, including Rice, UT Austin, MIT and Harvard, each with its own institutional branding. Python data pipelines extract and standardize faculty research profiles, deduplicate records and automate index updates; resume-based matching and personalized outreach drafting connect students with relevant labs.",
    shortDescription: "A search engine for undergrad research. Students search faculty by topic, get matched to labs from their resume, and draft a personal outreach email instead of trawling department pages.",
    image: { src: "/images/projects/research-finder.jpg", alt: "STEM Research Finder faculty search at Texas A&M" },
    stats: [["9,088", "faculty indexed"], ["9", "universities"], ["3,000+", "users, no paid marketing"]],
    lead: true,
    walkthrough: "researchFinder",
    links: [
      { label: "Visit the site", href: "https://stemresearchfinder.tech/", primary: true },
    ],
    tags: ["Python", "Data Pipelines", "React", "Vite"],
    type: "Web platform · Co-founder & lead developer",
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
    shortDescription: "Describe a chemical process in plain English. It asks clarifying questions, scores the process, draws a flow diagram and recommends improvements.",
    image: { src: "/images/projects/sustainapath.jpg", alt: "SustainaPath home screen with a process description form" },
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
    shortDescription: "See what solar could do for you before you invest, with performance estimates, a system sizing tool and environmental impact.",
    image: { src: "/images/projects/solariq.jpg", alt: "SolarIQ app with solar panel inputs and performance tabs" },
    tags: ["Python", "Streamlit", "Analytics"],
    type: "Energy analytics",
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
    shortDescription: "30+ long-form articles on semiconductor manufacturing, materials and energy storage, with 400+ monthly readers.",
    image: { src: "/images/projects/substack.jpg", alt: "Recent articles on Aditya's Substack" },
    type: "Writing",
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
