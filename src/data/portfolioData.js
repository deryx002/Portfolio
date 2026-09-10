import portPro from '../assets/images/Project/port_pro.png';
import busPro from '../assets/images/Project/bus_pro.png';
import aiPro from '../assets/images/Project/ai_pro.png';
import gstPro from '../assets/images/Project/gst_pro.png';

export const personalInfo = {
  name: "DHARUN ANANTH S",
  shortName: "Dharun",
  tagline: "COMPUTER SCIENCE ENGINEER & FULL STACK DEVELOPER",
  bio: "Computer Science graduate with a solid foundation in programming, data structures, and software development. Experienced through industry internships in Data Analysis & Full Stack concepts, with hands-on exposure to building web applications, database management, and interactive 3D WebGL user experiences.",
  email: "dharunananth002@gmail.com",
  location: "Coimbatore, Tamil Nadu, India",
  phone: "+91 744 924 0654",
  college: "Sri Ramakrishna Institute of Technology, Coimbatore",
  cgpa: "7.863",
  degree: "Bachelor of Engineering in Computer Science",
  degreePeriod: "Aug 2023 – Present",
  socials: {
    github: "https://github.com/deryx002",
    linkedin: "https://www.linkedin.com/in/dharunananths",
    email: "mailto:dharunananth002@gmail.com",
    instagram: "https://www.instagram.com/",
    resume: "assets/files/Dharun-Resume.pdf"
  }
};

export const skills = [
  { name: "C++", category: "Languages", icon: "Code2", level: 90, color: "#00599C" },
  { name: "Python", category: "Languages", icon: "Terminal", level: 85, color: "#3776AB" },
  { name: "JavaScript", category: "Languages", icon: "FileCode", level: 92, color: "#F7DF1E" },
  { name: "React.js", category: "Frontend", icon: "Atom", level: 90, color: "#61DAFB" },
  { name: "Node.js", category: "Backend", icon: "Server", level: 82, color: "#339933" },
  { name: "HTML5 / CSS3", category: "Frontend", icon: "Layout", level: 95, color: "#E34F26" },
  { name: "SQL", category: "Database", icon: "Database", level: 84, color: "#4479A1" },
  { name: "MongoDB", category: "Database", icon: "DatabaseZap", level: 80, color: "#47A248" },
  { name: "Git & GitHub", category: "Tools", icon: "GitBranch", level: 88, color: "#F05032" },
  { name: "Data Analysis", category: "Core", icon: "BarChart3", level: 82, color: "#38BDF8" }
];

export const projects = [
  {
    id: "project-01",
    number: "01",
    title: "Personal Portfolio Website",
    category: "3D WebGL & Full Stack",
    type: "Featured Single-Developer Showcase",
    description: "Built an immersive 3D interactive developer portfolio website designed to showcase projects, engineering skills, and certificates. Features WebGL particle fields, GSAP ScrollTrigger timelines, Lenis smooth inertial scroll, interactive 3D skill spheres, and dynamic cursor tracking.",
    technologies: ["React", "Three.js", "GSAP", "Tailwind CSS", "Vite", "WebGL"],
    github: "https://github.com/deryx002/Portfolio-1",
    live: "#",
    metrics: "100% Responsive • 60 FPS WebGL • Smooth Scroll",
    featured: true,
    image: portPro,
    accent: "from-cyan-500 to-blue-600"
  },
  {
    id: "project-02",
    number: "02",
    title: "Bus Tracking System",
    category: "Real-Time Web Application",
    type: "TEAM PROJECT",
    description: "Designed and developed a collaborative bus tracking system providing real-time location monitoring, route optimization, and ETA notifications for passengers and administrators. Implemented responsive UI components, live map rendering, and backend sync for fleet updates.",
    technologies: ["JavaScript", "React", "Node.js", "REST APIs", "Map SDK", "CSS3"],
    github: "https://github.com/deryx002",
    live: "#",
    metrics: "Real-Time Tracking • Multi-Route Support • Team Project",
    featured: true,
    image: busPro,
    accent: "from-emerald-400 to-cyan-500"
  },
  {
    id: "project-03",
    number: "03",
    title: "AI Sales Analytics Agent",
    category: "AI & Data Intelligence",
    type: "Featured AI Project",
    description: "Built an AI-powered sales analytics agent that automates data-driven insights, trend forecasting, and sales performance reporting. Leverages machine learning models and natural language processing to generate actionable recommendations for business growth strategies.",
    technologies: ["Python", "Machine Learning", "NLP", "Data Analytics", "REST APIs", "React"],
    github: "https://github.com/deryx002",
    live: "#",
    metrics: "AI-Powered • Predictive Analytics • Automated Reporting",
    featured: true,
    image: aiPro,
    accent: "from-violet-500 to-purple-600"
  },
  {
    id: "project-04",
    number: "04",
    title: "GST Billing System for Garment",
    category: "Enterprise Software & ERP",
    type: "Custom Client Solution",
    description: "Built a robust GST billing and invoice management platform tailored specifically for garment manufacturers and retailers. Automates complex tax calculations (CGST/SGST/IGST), inventory tracking, invoice generation, customer billing history, and PDF export.",
    technologies: ["Python", "SQL", "Database Management", "HTML/CSS", "JavaScript"],
    github: "https://github.com/deryx002",
    live: "#",
    metrics: "GST Compliant • Full Stack Solution",
    featured: false,
    image: gstPro,
    accent: "from-orange-400 to-amber-500"
  }
];

export const experiences = [
  {
    year: "2025",
    role: "Data Science Intern",
    company: "LitzTec",
    period: "09 June 2025 – 23 June 2025",
    type: "Internship",
    description: [
      "Gained hands-on experience with core software development concepts, IT project workflows, and industry-standard data analysis techniques.",
      "Worked with data processing pipelines and basic predictive workflows using Python and data manipulation libraries.",
      "Enhanced communication and cross-functional team collaboration in an active software development environment."
    ],
    skills: ["Python", "Data Analysis", "Software Workflows", "Team Collaboration"]
  }
];

export const education = {
  degree: "Bachelor of Engineering in Computer Science & Engineering",
  institution: "Sri Ramakrishna Institute of Technology, Coimbatore",
  period: "Aug 2023 – Present",
  cgpa: "7.863 / 10",
  highlights: [
    "Solid grounding in Data Structures, Algorithms, Software Engineering, and Database Management Systems.",
    "Active participant in technical workshops, hackathons, and collaborative software projects."
  ]
};

export const certificates = [
  {
    title: "AWS Cloud Practitioner Essentials",
    issuer: "AWS",
    category: "Cloud Computing",
    icon: "Cloud"
  },
  {
    title: "Google Cloud Computing",
    issuer: "NPTEL",
    category: "Cloud Computing",
    icon: "Cloud"
  },
  {
    title: "Design Thinking - A Primer",
    issuer: "NPTEL",
    category: "UI/UX & Product Design",
    icon: "Lightbulb"
  },
  {
    title: "Top Design Patterns in Java",
    issuer: "Scaler",
    category: "Software Architecture",
    icon: "Layers"
  },
  {
    title: "C++ Bootcamp",
    issuer: "LetsUpgrade",
    category: "Core Programming",
    icon: "Code"
  },
  {
    title: "Collaborative Robotics",
    issuer: "SRIT Workshop",
    category: "Robotics & Automation",
    icon: "Bot"
  }
];

export const achievements = [
  { value: "3+", label: "Major Projects Delivered", subtext: "Web, WebGL & ERP Systems" },
  { value: "14+", label: "Core Technologies", subtext: "Languages, Frameworks & Tools" },
  { value: "5+", label: "Certifications & Workshops", subtext: "NPTEL, Scaler, Robotics" },
  { value: "7.86", label: "Academic CGPA", subtext: "BE Computer Science Engineering" }
];
