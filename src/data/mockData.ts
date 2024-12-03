import { Dimension } from "../types/attributes";

export const dimensions: Dimension[] = [
  {
    id: "1",
    title: "Security",
    description: "Core security practices and implementations",
    category: "OWASP ASVS",
    areas: [
      {
        id: "1-1",
        title: "Access Control",
        description: "Implementation of proper access control mechanisms",
        isCompleted: false,
        remediationProposals: [
          {
            id: "1-1-1",
            text: "Implement role-based access control (RBAC)",
            isCompleted: false,
          },
          {
            id: "1-1-2",
            text: "Set up multi-factor authentication",
            isCompleted: false,
          },
        ],
      },
      {
        id: "1-2",
        title: "Data Encryption",
        description: "Proper encryption of sensitive data",
        isCompleted: true,
        remediationProposals: [
          {
            id: "1-2-1",
            text: "Use industry-standard encryption algorithms",
            isCompleted: true,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Performance",
    description: "Application performance and optimization",
    category: "DSOMM",
    areas: [
      {
        id: "2-1",
        title: "Load Time",
        description: "Initial application load time optimization",
        isCompleted: false,
        remediationProposals: [
          {
            id: "2-1-1",
            text: "Implement code splitting",
            isCompleted: false,
          },
          {
            id: "2-1-2",
            text: "Optimize asset loading",
            isCompleted: false,
          },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Threat Detection",
    description: "Advanced threat detection and response",
    category: "MITRE ATT&CK",
    areas: [
      {
        id: "3-1",
        title: "Intrusion Detection",
        description: "Implementation of intrusion detection systems",
        isCompleted: false,
        remediationProposals: [
          {
            id: "3-1-1",
            text: "Set up network monitoring",
            isCompleted: false,
          },
          {
            id: "3-1-2",
            text: "Configure alert systems",
            isCompleted: false,
          },
        ],
      },
    ],
  },
];