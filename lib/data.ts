export const profile = {
  name: "Harish Prajeeth A S",
  roles: [
    "Full-Stack Developer",
    "Machine Learning Developer",
    "Computer Science Undergraduate",
  ],
  location: "Theni, Tamil Nadu, India",
  email: "harishprajeeth007@gmail.com",
  phone: "+91 89257 56476",
  github: "https://github.com/harish-prajeeth",
  linkedin: "https://www.linkedin.com/in/harish-prajeeth-a-s",
  summary:
    "Computer Science undergraduate (B.E., expected May 2027) with three internships in full-stack development and applied machine learning, including a knowledge-distillation platform that compresses deep learning models for edge deployment. Skilled in React, Node.js, Express, Python, Flask, and FastAPI, with hands-on experience in computer vision (YOLOv11, CUDA, TensorRT) and BI reporting (IBM Cognos).",
};

export type SkillCategory = {
  id: string;
  label: string;
  color: string;
  items: string[];
};

export const skillGraph: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    color: "#10B981",
    items: ["React.js", "HTML5", "CSS3", "Recharts", "Vite"],
  },
  {
    id: "backend",
    label: "Backend",
    color: "#34D399",
    items: ["Node.js", "Express.js", "Flask", "FastAPI", "REST APIs", "Authentication"],
  },
  {
    id: "database",
    label: "Database",
    color: "#6EE7B7",
    items: ["MongoDB", "SQLite"],
  },
  {
    id: "ml",
    label: "Machine Learning",
    color: "#D4AF37",
    items: ["PyTorch", "ONNX", "Model Distillation", "Pandas", "NumPy"],
  },
  {
    id: "cv",
    label: "Computer Vision",
    color: "#E4C766",
    items: ["YOLOv11", "OpenCV", "CUDA", "TensorRT"],
  },
  {
    id: "data",
    label: "Data / BI",
    color: "#F0DA96",
    items: ["IBM Cognos", "Pandas", "NumPy"],
  },
  {
    id: "languages",
    label: "Languages",
    color: "#F8FAFC",
    items: ["JavaScript", "Python", "Java", "C"],
  },
  {
    id: "tools",
    label: "Tools",
    color: "#94A3B8",
    items: ["Git", "GitHub", "Docker", "VS Code", "Postman"],
  },
];

export type ExperienceItem = {
  id: string;
  role: string;
  org: string;
  location: string;
  period: string;
  stage: "Web Development" | "Data Analytics" | "Machine Learning";
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: "litztech",
    role: "Web Development Intern",
    org: "LitzTech",
    location: "Coimbatore",
    period: "2025 – Jul 2025",
    stage: "Web Development",
    bullets: [
      "Shipped responsive, production-ready client-facing web pages using HTML5, CSS3, and JavaScript.",
      "Collaborated with a 4-developer team on Git/GitHub; fixed UI defects and optimized landing-page performance.",
    ],
  },
  {
    id: "adroit",
    role: "Data Analytics Intern",
    org: "Adroit Technologies Innovative Solutions Pvt. Ltd.",
    location: "Coimbatore",
    period: "2026 – Apr 2026",
    stage: "Data Analytics",
    bullets: [
      "Built interactive BI dashboards in IBM Cognos Analytics to visualize operational KPIs and support decisions.",
      "Modeled multi-source datasets and authored reports aligned with enterprise BI standards.",
    ],
  },
  {
    id: "gradtwin",
    role: "Machine Learning Intern",
    org: "Gradtwin Services (OPC) Pvt. Ltd.",
    location: "Chennai",
    period: "2026 – Jul 2026",
    stage: "Machine Learning",
    bullets: [
      'Delivered "Distillation AI," compressing a large teacher model into a lightweight student model via an end-to-end Python training pipeline (data prep, teacher-student loss configuration, evaluation), preserving accuracy while improving inference speed.',
      "Recognized by HR leadership for dedication, professionalism, and technical contribution.",
    ],
  },
];

export const timeline = [
  { id: "student", label: "Student", detail: "B.E. Computer Science, Nadar Saraswathi College of Engineering & Technology, Theni — expected May 2027." },
  { id: "web", label: "Web Development", detail: "Interned at LitzTech, shipping production client-facing pages and collaborating in a 4-developer Git workflow." },
  { id: "data", label: "Data Analytics", detail: "Interned at Adroit Technologies, building IBM Cognos BI dashboards over multi-source datasets." },
  { id: "ml", label: "Machine Learning", detail: "Interned at Gradtwin Services, building Distillation AI — a teacher-student model compression pipeline for edge deployment." },
  { id: "future", label: "Future", detail: "Seeking a Full-Stack or Machine Learning Developer internship to ship production-grade, scalable software." },
];

export type Project = {
  id: string;
  name: string;
  tagline: string;
  stack: string[];
  bullets: string[];
  pipeline?: string[];
  featured?: boolean;
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "distillhub",
    name: "DistillHub AI",
    tagline: "Multi-Objective Knowledge Distillation Platform",
    stack: ["Python", "React", "FastAPI", "MongoDB", "PyTorch", "ONNX", "Docker"],
    bullets: [
      "Auto-KD platform compressing deep learning models for edge devices.",
      "Async FastAPI/Beanie backend with ONNX safety audits.",
      "React dashboard for live training tracking.",
    ],
    pipeline: ["Teacher Model", "Knowledge Transfer", "Student Model", "Compression", "Deployment"],
    featured: true,
    links: [
      { label: "GitHub", href: "https://github.com/harish-prajeeth" },
    ],
  },
  {
    id: "smartcity",
    name: "SmartCityAI",
    tagline: "Traffic Monitoring & Violation Detection",
    stack: ["Python", "YOLOv11", "TensorRT", "CUDA", "FastAPI", "Streamlit", "OpenCV"],
    bullets: [
      "Real-time CV pipeline (YOLOv11 Nano, TensorRT, CUDA) tracking vehicle speed and detecting violations.",
      "Linked to a Streamlit dashboard with PDF/CSV reports.",
    ],
    pipeline: ["Camera Feed", "YOLOv11 Detection", "Speed Tracking", "Violation Flagging", "Dashboard Report"],
    featured: true,
    links: [
      { label: "GitHub", href: "https://github.com/harish-prajeeth" },
    ],
  },
  {
    id: "stock-predictor",
    name: "AI Stock Predictor",
    tagline: "Real-time AI-driven price forecasting",
    stack: ["React", "Node.js", "Express", "MongoDB", "Recharts"],
    bullets: [
      "Full-stack app delivering real-time, AI-driven price forecasts via RESTful APIs.",
      "Interactive Recharts visualizations.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/harish-prajeeth" },
    ],
  },
  {
    id: "digital-doctor",
    name: "Digital Doctor",
    tagline: "AI-integrated healthcare platform",
    stack: ["React", "Flask", "Node.js", "MongoDB"],
    bullets: [
      "Role-based dashboards, authentication, and secure data management.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/harish-prajeeth" },
    ],
  },
  {
    id: "neurosim",
    name: "NeuroSim / Jharkhand Tourism Platform",
    tagline: "Decision simulation & tourism platform",
    stack: ["Python", "FastAPI", "React"],
    bullets: [
      "FastAPI-backed decision-simulation engine with explainable recommendations.",
      "Full-stack, mobile-first tourism site with a FastAPI content API.",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/harish-prajeeth" },
    ],
  },
];

export const certifications = [
  { title: "Machine Learning Internship — Experience Certificate", org: "Gradtwin Services", date: "Jul 2026" },
  { title: "Distillation AI — Project Completion Certificate", org: "Gradtwin Services", date: "Jul 2026" },
  { title: "Data Analytics Internship — Completion Certificate", org: "Adroit Technologies", date: "Apr 2026" },
  { title: "Web Development Internship — Completion Certificate", org: "LitzTech", date: "Jul 2025" },
];
