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

export const projects: Project[] = [
  {
    id: "soliera",
    title: "Soliera Administrative",
    category: "Administrative",
    shortDescription:
      "A modern administrative platform designed to organize business operations and management workflows.",
    description:
      "A full-stack administrative system focused on providing structured workflows, centralized information, and a modern management experience.",
    image: "/projects/soliera/hero.webp",
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
    github: "https://github.com/kheel06/soliera-administrative",
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
];