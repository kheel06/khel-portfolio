export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  credentialUrl?: string;
  skills: string[];
}

export const certifications: Certification[] = [
  {
    id: "a-sys-certificate",
    title: "A-SYS Certificate of Achievement",
    issuer: "A-SYS",
    date: "July 25, 2025",
    description:
      "Certificate of achievement recognizing successful completion of the A-SYS Online Seminar and continued professional development.",
    image: "/certificates/A-sys.jpg",
    skills: [
      "Professional Development",
      "Online Seminar",
      "Technology",
    ],
  },

  {
    id: "information-management-digital-age",
    title: "Information Management in the Digital Age",
    issuer:
      "Singapore Institute of Multidisciplinary Professions",
    date: "November 5, 2025",
    description:
      "Certificate of completion for successfully completing the eight modules required for the Information Management in the Digital Age Course.",
    image:
      "/certificates/Information-Management-in-the-Digital-Age-Course.png",
    skills: [
      "Information Management",
      "Digital Technology",
      "Data Management",
    ],
  },

  {
    id: "prompt-like-an-engineer",
    title: "Prompt Like an Engineer",
    issuer: "Cisco Networking Academy",
    date: "September 6, 2026",
    description:
      "Certificate of course completion demonstrating practical knowledge of LLMs, system prompts, prompt design, AI workflows, evaluation, and responsible AI output analysis.",
    image:
      "/certificates/PromptLikeanEngineer.png",
    skills: [
      "AI",
      "Prompt Engineering",
      "LLMs",
      "AI Workflows",
      "Problem Solving",
    ],
  },
];