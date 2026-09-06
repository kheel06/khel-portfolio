export type ProjectCategory =
  | "Web"
  | "Full Stack"
  | "Administrative";

export interface Project {
  id: string;
  title: string;
  caseStudyTitle?: string;
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
  project: string,
  count: number,
) {
  return Array.from(
    { length: count },
    (_, index) => `/projects/${project}/${index + 1}.png`,
  );
}

function createPaddedCaseStudyImages(
  project: string,
  count: number,
) {
  return Array.from(
    { length: count },
    (_, index) =>
      `/projects/${project}/${String(index + 1).padStart(3, "0")}.png`,
  );
}

export const projects: Project[] = [
  {
    id: "soliera",
    title: "Soliera Hotel & Restaurant Admin System",
    caseStudyTitle:
      "Soliera: Administrative Management System With Intelligent Legal Text Analysis Using Gemini AI for Document Classification",
    category: "Administrative",
    shortDescription:
      "An administrative management system with intelligent legal text analysis and document classification.",
    description:
      "A centralized administrative platform for hotel and restaurant operations, featuring Gemini AI-assisted legal text analysis and document classification.",
    image: "/projects/soliera/soliera.png",
    caseStudyImages: createCaseStudyImages("soliera", 34),
    technologies: [
      "Laravel",
      "PHP",
      "JavaScript ES6",
      "Tailwind CSS",
      "DaisyUI",
      "Postman",
      "Gemini AI",
      "MySQL",
    ],
    features: [
      "Legal Management",
      "Facilities Reservation",
      "User Management",
      "Document Management",
      "Visitor Management",
    ],
    problem:
      "Administrative, legal, and document workflows need a single, organized system.",
    solution:
      "Soliera centralizes management workflows and applies Gemini AI to legal-text analysis and document classification.",
    architecture: ["Laravel application", "MySQL database", "Gemini AI integration"],
    challenges: ["Organizing administrative workflows", "Classifying legal documents"],
    results: ["Centralized operations", "AI-assisted document handling"],
    github: "https://github.com/kheel06/Soliera-Administrative-System",
  },
  {
    id: "alvion-core-transaction-1",
    title: "Alvion Core Transaction 1",
    caseStudyTitle:
      "Hospital 2: Core 1 Digital Patient Access and Emergency Management Platform With AI-Powered Triage and Telehealth Support",
    category: "Full Stack",
    shortDescription:
      "A digital patient-access and emergency management platform with AI-assisted triage and telehealth support.",
    description:
      "A hospital management platform for digital patient access, emergency workflows, AI-powered triage, and telehealth support.",
    image: "/projects/alvion-core-transaction-1/1.png",
    caseStudyImages: createCaseStudyImages("alvion-core-transaction-1", 39),
    technologies: [
      "PHP",
      "JavaScript ES6",
      "HTML",
      "Tailwind CSS",
      "Flowbite",
      "Postman",
      "MySQL",
    ],
    features: [
      "Smart Patient Registration System",
      "Appointment and Scheduling System",
      "Telehealth and Outpatient Care System",
      "Emergency and ER Triage System",
      "Inpatient and Bed Management System",
    ],
    problem:
      "Hospital teams need connected patient-access and emergency workflows.",
    solution:
      "The platform connects registration, scheduling, telehealth, and AI-supported triage in one system.",
    architecture: ["PHP application", "MySQL database", "AI triage services"],
    challenges: ["Coordinating emergency workflows", "Supporting patient access"],
    results: ["Streamlined triage", "Connected patient services"],
    github: "https://github.com/kheel06/Alvion-Core-Transaction-1",
  },
  {
    id: "nexora",
    title: "Nexora",
    caseStudyTitle: "Nexora: Multi-Role E-Commerce Platform",
    category: "Full Stack",
    shortDescription:
      "A multi-role e-commerce platform that combines a premium storefront with order, product, invoice, and customer management.",
    description:
      "A full-stack e-commerce platform for a modern Philippine shopping experience, with customer browsing and checkout alongside administrative controls for products, orders, invoices, users, and operational activity.",
    image: "/projects/nexora/1.png",
    caseStudyImages: createCaseStudyImages("nexora", 31),
    technologies: ["PHP", "MySQL", "JavaScript ES6", "HTML", "CSS", "Bootstrap"],
    features: [
      "Customer storefront and product catalog",
      "Shopping cart and checkout",
      "Order tracking",
      "Product and inventory administration",
      "Invoice management",
      "Role-based operations",
    ],
    problem:
      "Online retail teams need a unified experience that makes shopping simple for customers while keeping products, orders, and fulfillment manageable internally.",
    solution:
      "Nexora pairs a polished storefront with role-based operational tools for managing products, customers, invoices, and orders across the commerce lifecycle.",
    architecture: ["PHP web application", "MySQL database", "Customer and administrative portals"],
    challenges: ["Balancing storefront polish with business operations", "Keeping orders and inventory visible"],
    results: ["Streamlined online shopping flow", "Centralized commerce operations"],
    github: "https://github.com/kheel06/Nexora",
  },
  {
    id: "cybershield",
    title: "CyberShield",
    caseStudyTitle: "Cybershield",
    category: "Web",
    shortDescription:
      "An AI-assisted cyber hygiene assessment experience for Philippine e-commerce sellers.",
    description:
      "A cybersecurity awareness web application that presents security concepts, protection practices, and educational content through an accessible interface.",
    image: "/projects/cybershield/1.png",
    caseStudyImages: createCaseStudyImages("cybershield", 12),
    technologies: ["HTML", "CSS", "Bootstrap", "JavaScript ES6", "MySQL", "REST API"],
    features: [
      "Cyber hygiene assessment",
      "Risk ranking",
      "Personalized recommendations",
    ],
    problem:
      "E-commerce sellers need an approachable way to understand cyber risk.",
    solution:
      "CyberShield uses a guided assessment to surface risk levels and personalized recommendations.",
    architecture: ["Web application", "REST API", "MySQL database"],
    challenges: ["Explaining security clearly", "Providing actionable assessment results"],
    results: ["Accessible cyber education", "Personalized risk guidance"],
    github: "https://github.com/kheel06/Cybershield",
  },
  {
    id: "alvion-core-transaction-2",
    title: "Alvion Core Transaction 2",
    caseStudyTitle:
      "Smart Hospital Treatment System with Real-Time Surgery Scheduling, Lab Coordination, Pharmacy Management, and AI Powered Microsoft Azure Health Bot Integration.",
    category: "Full Stack",
    shortDescription:
      "A smart treatment system for coordinated surgery, laboratory, pharmacy, and patient-support workflows.",
    description:
      "A smart hospital treatment system with real-time surgery scheduling, laboratory coordination, pharmacy management, and Microsoft Azure Health Bot integration.",
    image: "/projects/alvion-core-transaction-2/1.png",
    caseStudyImages: createCaseStudyImages("alvion-core-transaction-2", 30),
    technologies: ["PHP", "MySQL", "JavaScript ES6", "Bootstrap", "Microsoft Azure Health Bot"],
    features: [
      "Laboratory Information System",
      "Radiology and Imaging System",
      "Pharmacy Management System",
      "Surgery and Operating Room Scheduler",
    ],
    problem:
      "Clinical treatment teams need connected scheduling and service coordination.",
    solution:
      "The system centralizes treatment operations and connects patients with Azure Health Bot support.",
    architecture: ["PHP application", "MySQL database", "Azure Health Bot integration"],
    challenges: ["Coordinating clinical departments", "Scheduling operating rooms"],
    results: ["Connected treatment workflows", "Real-time schedule visibility"],
    github: "https://github.com/kheel06/Alvion-Core-Transaction-2",
  },
  {
    id: "alvion-core-transaction-3",
    title: "Alvion Core Transaction 3",
    caseStudyTitle:
      "Hospital 2: Core 3 – Enhancing Patient Experience Through Virtual Assistants and AI Automation Banking Process Using Olive AI",
    category: "Full Stack",
    shortDescription:
      "A hospital operations platform focused on patient experience, virtual assistance, and AI automation.",
    description:
      "A hospital operations platform that improves patient experience through virtual assistants and Olive AI-powered process automation.",
    image: "/projects/alvion-core-transaction-3/1.png",
    caseStudyImages: createCaseStudyImages("alvion-core-transaction-3", 16),
    technologies: ["PHP", "MySQL", "JavaScript ES6", "Bootstrap", "Olive AI"],
    features: [
      "HMO and Insurance Claims System",
      "Billing and Discharge Management System",
      "Electronic Medical Records System",
      "Healthcare Analytics and Dashboard System",
    ],
    problem:
      "Patient-facing and hospital financial workflows can be fragmented and manual.",
    solution:
      "The platform combines virtual assistance, records, billing, and Olive AI-powered automation.",
    architecture: ["PHP application", "MySQL database", "Olive AI integration"],
    challenges: ["Improving patient experience", "Automating operational processes"],
    results: ["AI-assisted service delivery", "Streamlined patient workflows"],
    github: "https://github.com/kheel06/Alvion-Core-Transaction-3",
  },
  {
    id: "alvion-human-resource-3",
    title: "Alvion Human Resource 3",
    caseStudyTitle:
      "Hospital 2: Human Resources 3 – Streamlining Organizational Processes Through Integrated Claim, Reimbursement, Attendance, Scheduling, and Leave Management Using Azure AI",
    category: "Administrative",
    shortDescription:
      "An HR platform that connects claims, reimbursement, attendance, schedules, and leave management.",
    description:
      "A hospital HR management platform that streamlines organizational processes with integrated claims, reimbursement, attendance, scheduling, leave management, and Azure AI.",
    image: "/projects/alvion-human-resource-3/1.png",
    caseStudyImages: createCaseStudyImages("alvion-human-resource-3", 23),
    technologies: ["PHP", "MySQL", "JavaScript ES6", "Bootstrap", "Azure AI"],
    features: [
      "Time and Attendance System",
      "Shift and Schedule Management",
      "Timesheet Management",
      "Leave Management",
      "Claims and Reimbursement",
    ],
    problem:
      "HR processes become difficult to manage when time, leave, claims, and schedules are disconnected.",
    solution:
      "The system integrates daily HR workflows with Azure AI support.",
    architecture: ["PHP application", "MySQL database", "Azure AI integration"],
    challenges: ["Coordinating workforce information", "Managing staff schedules"],
    results: ["Integrated HR processes", "Improved organizational visibility"],
    github: "https://github.com/kheel06/Alvion-Human-Resource-3",
  },
  {
    id: "alvion-financial-transaction",
    title: "Alvion Financial Transaction",
    caseStudyTitle:
      "Hospital 2: Financials With Automatic Financial Report Generation and KPI Monitoring Dashboards, Powered by GPT-4 and PyTorch",
    category: "Full Stack",
    shortDescription:
      "A financial platform with automatic reporting, KPI dashboards, GPT-4, and PyTorch support.",
    description:
      "A hospital financial management platform for accounting workflows, automatic report generation, and KPI monitoring dashboards powered by GPT-4 and PyTorch.",
    image: "/projects/alvion-financial-transaction/1.png",
    caseStudyImages: createPaddedCaseStudyImages("alvion-financial-transaction", 21),
    technologies: ["PHP", "MySQL", "JavaScript ES6", "Bootstrap", "GPT-4", "PyTorch"],
    features: ["Disbursement", "Budget Management", "Collection", "General Ledger"],
    problem:
      "Financial teams need timely reports and clear KPI visibility across hospital operations.",
    solution:
      "The platform centralizes financial records and automates reporting and KPI monitoring.",
    architecture: ["PHP application", "MySQL database", "GPT-4 and PyTorch services"],
    challenges: ["Automating financial reporting", "Monitoring performance indicators"],
    results: ["Faster report generation", "Centralized KPI monitoring"],
    github: "https://github.com/kheel06/Alvion-Financial-Transactions",
  },
  {
    id: "alvion-logistics-1",
    title: "Alvion Logistics 1",
    caseStudyTitle:
      "Leveraging AI-Driven Strategies to Build Hospital Chains for Continuous Access to Critical Medical",
    category: "Full Stack",
    shortDescription:
      "A hospital logistics platform for procurement, warehousing, assets, and continuous access to critical medical resources.",
    description:
      "A hospital logistics platform that applies AI-driven strategies to support continuous access to critical medical resources across hospital chains.",
    image: "/projects/alvion-logistics-1/1.png",
    caseStudyImages: createCaseStudyImages("alvion-logistics-1", 44),
    technologies: ["PHP", "MySQL", "JavaScript ES6", "Bootstrap"],
    features: [
      "Smart Warehousing System",
      "Procurement and Sourcing Management",
      "Project Logistics Tracker",
      "Asset Lifecycle and Maintenance",
    ],
    problem:
      "Hospital chains require reliable logistics operations to maintain access to critical medical resources.",
    solution:
      "The platform centralizes warehousing, procurement, asset, and project logistics workflows.",
    architecture: ["PHP application", "MySQL database", "Operational dashboards"],
    challenges: ["Maintaining medical supply continuity", "Coordinating hospital-chain logistics"],
    results: ["Improved logistics visibility", "Structured medical-resource workflows"],
    github: "https://github.com/kheel06/Alvion-Logistic-1",
  },
  {
    id: "alvion-logistics-2",
    title: "Alvion Logistics 2",
    caseStudyTitle:
      "Hospital 2: Logistic 2 – A Web-Based Executive Information System for Hospital Transport and Dispatch Modules With Intelligent Vehicle Availability and Stock Accuracy Monitoring Using Intelligent Transport Management AI (ITMA) and Scikit-Learn",
    category: "Full Stack",
    shortDescription:
      "An executive information system for hospital transport, dispatch, vehicle availability, and stock monitoring.",
    description:
      "A web-based executive information system for hospital transport and dispatch with intelligent vehicle availability and stock-accuracy monitoring using ITMA and Scikit-Learn.",
    image: "/projects/alvion-logistics-2/1.png",
    caseStudyImages: createCaseStudyImages("alvion-logistics-2", 22),
    technologies: [
      "PHP",
      "MySQL",
      "JavaScript ES6",
      "Bootstrap",
      "Intelligent Transport Management AI (ITMA)",
      "Scikit-Learn",
    ],
    features: [
      "Fleet and Vehicle Management",
      "Vehicle Reservation and Dispatch System",
      "Vehicle Availability Monitoring",
      "Stock Accuracy Monitoring",
    ],
    problem:
      "Transport teams need reliable dispatch information and accurate stock visibility.",
    solution:
      "The system unifies transport operations with ITMA- and Scikit-Learn-assisted monitoring.",
    architecture: ["PHP application", "MySQL database", "ITMA and Scikit-Learn services"],
    challenges: ["Coordinating dispatch", "Monitoring vehicle availability"],
    results: ["Improved transport visibility", "More accurate stock monitoring"],
    github: "https://github.com/kheel06/Alvion-Logistic-2",
  },
  {
    id: "prime-merch",
    title: "PrimeMerch",
    caseStudyTitle:
      "Merchandising System: Smart Merchandising Supply Chain Optimization System (AI-Powered)",
    category: "Administrative",
    shortDescription:
      "An AI-powered merchandising system for supply-chain optimization.",
    description:
      "A smart merchandising supply-chain optimization system for coordinating inventory, warehousing, procurement, and logistics workflows.",
    image: "/projects/prime-merch/1.png",
    technologies: ["Vanilla PHP", "HTML", "CSS", "MySQL", "JavaScript ES6", "Bootstrap", "REST API"],
    features: [
      "Smart Warehousing System",
      "Procurement and Sourcing Management",
      "Project Logistics Tracker",
      "Asset Lifecycle and Maintenance",
    ],
    problem:
      "Merchandising supply-chain data can become difficult to coordinate across disconnected workflows.",
    solution:
      "PrimeMerch provides a centralized, AI-powered operational workspace for supply-chain optimization.",
    architecture: ["Vanilla PHP application", "MySQL database", "REST API integration"],
    challenges: ["Coordinating supply-chain workflows", "Maintaining inventory visibility"],
    results: ["More structured merchandising operations", "Improved supply-chain oversight"],
    caseStudyImages: createCaseStudyImages("prime-merch", 40),
    github: "https://github.com/kheel06/PrimeMerch",
  },
  {
    id: "hop-fabrications-inc",
    title: "HOP Fabrications Inc.",
    caseStudyTitle: "HOP Fabrications Inc.",
    category: "Web",
    shortDescription:
      "A business website for a custom fabrication company serving food concepts, kiosks, carts, and growing businesses.",
    description:
      "A responsive business website showcasing custom fabrication services, collapsible carts, mall kiosks, company information, and customer inquiry touchpoints.",
    image: "/projects/hop-fabrications-inc/1.png",
    caseStudyImages: createCaseStudyImages("hop-fabrications-inc", 1),
    technologies: ["Next.js", "shadcn/ui", "Framer Motion", "Lucide Icons"],
    features: ["Project showcase", "Responsive business website", "AI project assistant", "Customer inquiries"],
    problem:
      "Custom fabrication businesses need a clear digital presence for communicating their capabilities and starting customer projects.",
    solution:
      "The website combines a premium visual system, service content, project presentation, and interactive customer communication.",
    architecture: ["Next.js App Router", "React components", "Tailwind CSS"],
    challenges: ["Presenting physical work digitally", "Creating a premium responsive experience"],
    results: ["Professional digital presence", "Improved project presentation"],
    github: "https://github.com/kheel06/hop-fabrication-inc.",
  },
];
