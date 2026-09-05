export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image?: string;
  credentialUrl?: string;
  skills: string[];
}

export const certifications: Certification[] = [
  {
    id: "cert-1",
    title: "Certification Name",
    issuer: "Issuing Organization",
    date: "2026",
    description:
      "Short description of what this certification demonstrates.",
    image: "/certificates/cert-1.webp",
    credentialUrl: "",
    skills: ["Skill 1", "Skill 2", "Skill 3"],
  },
  {
    id: "cert-2",
    title: "Certification Name",
    issuer: "Issuing Organization",
    date: "2026",
    description:
      "Short description of what this certification demonstrates.",
    image: "/certificates/cert-2.webp",
    credentialUrl: "",
    skills: ["Skill 1", "Skill 2"],
  },
];