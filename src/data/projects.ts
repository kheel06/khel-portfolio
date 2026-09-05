export type ProjectCategory =
  | "Web"
  | "Full Stack"
  | "Administrative";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  shortDescription: string;
  description: string;
  image: string;
  caseStudyImages?: string[];
  technologies: string[];
  features: string[];
  problem: string;
  solution: string;
  architecture: string[];
  challenges: string[];
  results: string[];
  github?: string;
  live?: string;
}

function createCaseStudyImages(
  project: "core1" | "cybershield" | "soliera",
  count: number,
) {
  return Array.from(
    { length: count },
    (_, index) => `/projects/${project}/${index + 1}.png`,
  );
}

export const projects: Project[] = [
  {
    id: "soliera",
    title: "Soliera Administrative",
    category: "Administrative",

    shortDescription:
      "A modern administrative platform designed to organize business operations and management workflows.",

    description:
      "A full-stack administrative system focused on providing structured workflows, centralized information, and a modern management experience.",

    image: "/projects/soliera/1.png",
    caseStudyImages: createCaseStudyImages("soliera", 34),

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Firebase",
      "Firestore",
      "Tailwind CSS",
    ],

    features: [
      "Administrative dashboard",
      "Data management",
      "Responsive interface",
      "Structured workflows",
      "Reusable components",
    ],

    problem:
      "Business workflows can become difficult to manage when information is scattered across disconnected processes and interfaces.",

    solution:
      "The system brings core workflows into a centralized web application with structured interfaces, reusable components, and a responsive user experience.",

    architecture: [
      "Next.js application",
      "React component architecture",
      "TypeScript application logic",
      "Firebase services",
      "Firestore data layer",
    ],

    challenges: [
      "Designing reusable management interfaces",
      "Keeping application state predictable",
      "Creating a responsive experience across screen sizes",
      "Structuring the project for future expansion",
    ],

    results: [
      "Centralized administrative workflows",
      "More structured information management",
      "Responsive management experience",
      "Maintainable application architecture",
    ],

    github:
      "https://github.com/kheel06/soliera-administrative",
  },

  {
    id: "cybershield",
    title: "CyberShield",
    category: "Web",

    shortDescription:
      "An AI-assisted cyber hygiene assessment experience for Philippine e-commerce sellers.",

    description:
      "A visual case study for CyberShield, presenting its cyber hygiene assessment and related product views.",

    image: "/projects/cybershield/1.png",
    caseStudyImages: createCaseStudyImages("cybershield", 12),

    technologies: [],

    features: [
      "Cyber hygiene assessment",
      "Risk ranking",
      "Personalized recommendations",
    ],

    problem:
      "The captured product focuses on helping Philippine e-commerce sellers understand cyber risk.",

    solution:
      "The interface presents a question-based assessment with a risk rank and personalized recommendations.",

    architecture: [],
    challenges: [],
    results: [],
  },

  {
    id: "portfolio",
    title: "KHEL Portfolio",
    category: "Web",

    shortDescription:
      "A performance-focused personal portfolio built to present engineering work through interactive case studies.",

    description:
      "A modern portfolio experience built with Next.js, TypeScript, Tailwind CSS, Motion, and Firebase.",

    image: "/projects/portfolio/hero.webp",

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Motion",
      "Firebase",
    ],

    features: [
      "Responsive design",
      "Animated interactions",
      "Project case studies",
      "Contact form",
      "Firebase integration",
    ],

    problem:
      "A developer portfolio should communicate more than a list of technologies. It should demonstrate how the developer thinks, builds, and solves problems.",

    solution:
      "The portfolio treats the website itself as a software product, combining structured content, interactive project presentations, responsive engineering, and a Firebase-backed contact workflow.",

    architecture: [
      "Next.js App Router",
      "Server Components by default",
      "Client Components for interactive UI",
      "Motion animation layer",
      "Firebase contact service",
    ],

    challenges: [
      "Balancing visual design with performance",
      "Keeping animations subtle and purposeful",
      "Designing reusable project components",
      "Maintaining a clean component architecture",
    ],

    results: [
      "Professional project presentation",
      "Interactive case studies",
      "Responsive user experience",
      "Modern engineering-focused design",
    ],

    github: "https://github.com/kheel06",
    live: "https://khel-pied.vercel.app/",
  },

  {
    id: "avion-care",
    title: "Avion Care",
    category: "Web",

    shortDescription:
      "A web-based platform designed to provide a structured digital experience for service-oriented workflows.",

    description:
      "A responsive web application focused on presenting services, organizing information, and creating a clean digital experience for users.",

    image: "/projects/core1/1.png",
    caseStudyImages: createCaseStudyImages("core1", 39),

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "REST API",
    ],

    features: [
      "Responsive web interface",
      "Service presentation",
      "Structured information",
      "Reusable UI components",
      "Mobile-friendly layout",
    ],

    problem:
      "Users need a clear and accessible way to understand services and interact with a digital platform without navigating through unnecessarily complicated interfaces.",

    solution:
      "The application organizes important information into a responsive interface with reusable components and a clear user flow.",

    architecture: [
      "Next.js application",
      "React component system",
      "TypeScript application logic",
      "Reusable UI components",
      "API-ready architecture",
    ],

    challenges: [
      "Designing a simple user experience",
      "Keeping layouts responsive",
      "Creating reusable components",
      "Maintaining consistent visual hierarchy",
    ],

    results: [
      "Clearer digital experience",
      "Responsive interface",
      "Reusable frontend architecture",
      "Structured presentation of information",
    ],
  },

  {
    id: "avion-logistics",
    title: "Avion Logistics",
    category: "Full Stack",

    shortDescription:
      "A logistics-focused application designed around structured operational workflows and centralized information.",

    description:
      "A full-stack-oriented logistics platform concept focused on organizing operational information and creating a more structured workflow for users.",

    image: "",

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "API",
      "Database",
      "Tailwind CSS",
    ],

    features: [
      "Operational dashboard",
      "Data management",
      "Workflow organization",
      "Responsive interface",
      "API integration",
    ],

    problem:
      "Operational workflows become difficult to manage when important information is distributed across multiple systems and manual processes.",

    solution:
      "The application provides a centralized interface for organizing operational information while keeping the frontend structured for API and database integration.",

    architecture: [
      "Next.js App Router",
      "React frontend",
      "TypeScript business logic",
      "API integration layer",
      "Database-backed workflow",
    ],

    challenges: [
      "Structuring operational information",
      "Designing reusable dashboard components",
      "Handling data-driven interfaces",
      "Keeping workflows easy to understand",
    ],

    results: [
      "Centralized operational information",
      "More structured workflows",
      "Reusable application components",
      "Scalable application foundation",
    ],
  },

  {
    id: "merchandising-logistics",
    title: "Merchandising Logistics",
    category: "Administrative",

    shortDescription:
      "An administrative logistics solution focused on organizing merchandising operations and information.",

    description:
      "A management-oriented application designed around administrative workflows, information organization, and operational visibility.",

    image: "",

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "API",
      "Database",
      "Tailwind CSS",
    ],

    features: [
      "Administrative dashboard",
      "Inventory-oriented workflows",
      "Data organization",
      "Operational tracking",
      "Responsive interface",
    ],

    problem:
      "Administrative and merchandising workflows can become inefficient when information is manually tracked across disconnected tools.",

    solution:
      "The application centralizes operational information into structured screens and reusable components designed around management workflows.",

    architecture: [
      "Next.js application",
      "React component architecture",
      "TypeScript logic",
      "API integration",
      "Database-oriented data layer",
    ],

    challenges: [
      "Organizing large amounts of information",
      "Creating efficient management interfaces",
      "Maintaining consistent UI patterns",
      "Designing for future workflow expansion",
    ],

    results: [
      "More structured administrative workflow",
      "Centralized information",
      "Improved operational visibility",
      "Reusable management interface",
    ],
  },

  {
    id: "hop-fabrications",
    title: "HOP Fabrications",
    category: "Full Stack",

    shortDescription:
      "A business website and digital experience for a custom fabrication company serving food concepts, kiosks, carts, and growing businesses.",

    description:
      "A modern business platform created to showcase fabrication work, communicate services, present clients and projects, and support customer inquiries through an interactive web experience.",

    image: "",

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "API",
    ],

    features: [
      "Project showcase",
      "Responsive business website",
      "AI project assistant",
      "Contact workflow",
      "Service presentation",
      "Interactive project sections",
    ],

    problem:
      "Custom fabrication businesses need a digital presence that can clearly communicate their capabilities while making it easier for potential clients to understand services and start a project.",

    solution:
      "The website combines a modern visual system, project presentation, service-focused content, responsive interfaces, and interactive customer communication into one digital experience.",

    architecture: [
      "Next.js App Router",
      "React component architecture",
      "TypeScript",
      "Tailwind CSS",
      "Supabase-backed services",
      "API integrations",
    ],

    challenges: [
      "Presenting physical fabrication work digitally",
      "Creating a premium business-oriented interface",
      "Building responsive sections",
      "Integrating interactive customer communication",
      "Balancing animation and performance",
    ],

    results: [
      "Professional digital presence",
      "Improved project presentation",
      "Interactive customer experience",
      "Responsive business website",
      "Scalable frontend architecture",
    ],
  },
];
