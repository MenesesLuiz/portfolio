export type Certification = {
  title: string;
  issuer: string;
  issuedAt?: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  credentialUrl?: string;
};

export type TechnicalSkill = {
  name: string;
  icon: string;
};

export type PortfolioSite = {
  title: string;
  summary: string;
  url: string;
  image: string;
  technologies: string[];
};

export type EngineeringProject = {
  title: string;
  summary: string;
  githubUrl: string;
  image: string;
  discipline: "Software Engineering" | "Cybersecurity" | "Web Development";
};

export const certifications: Certification[] = [
  {
    title: "Python com Orientação a Objetos",
    issuer: "Alura",
    issuedAt: "Abril de 2025",
    image: "/assets/certificado-python.webp",
    imageWidth: 726,
    imageHeight: 513,
    credentialUrl: "https://cursos.alura.com.br/degree/certificate/cb7a614c-1728-4a38-a7ba-53c746988781?lang",
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    image: "/assets/certificado-i2cs.webp",
    imageWidth: 340,
    imageHeight: 340,
    credentialUrl: "https://www.credly.com/badges/1d759f1f-bf50-4a77-b23c-aab152bd6a40/linked_in_profile",
  },
  {
    title: "Hands-on de Wazuh",
    issuer: "Muira Academy",
    issuedAt: "Janeiro de 2026",
    image: "/assets/certificado-wazuh.webp",
    imageWidth: 3509,
    imageHeight: 2481,
  },
];
export const technicalSkills: TechnicalSkill[] = [
  { name: "Python", icon: "/assets/tech/python.svg" },
  { name: "Git", icon: "/assets/tech/git.svg" },
  { name: "GitHub", icon: "/assets/tech/github.svg" },
  { name: "Visual Studio Code", icon: "/assets/tech/vscode.svg" },
  { name: "Amazon Web Services", icon: "/assets/tech/aws.svg" },
  { name: "Linux", icon: "/assets/tech/linux.svg" },
  { name: "PowerShell", icon: "/assets/tech/powershell.svg" },
  { name: "Node.js", icon: "/assets/tech/nodejs.svg" },
  { name: "MySQL", icon: "/assets/tech/mysql.svg" },
  { name: "Postman", icon: "/assets/tech/postman.svg" },
  { name: "Docker", icon: "/assets/tech/docker.svg" },
];
export const portfolioSites: PortfolioSite[] = [];
export const engineeringProjects: EngineeringProject[] = [];
