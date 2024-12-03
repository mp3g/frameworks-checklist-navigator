import { Dimension } from "../types/attributes";

export const dimensions: Dimension[] = [
  {
    id: "1",
    title: "Security",
    description: "Core security practices and implementations",
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
          },
          {
            id: "1-1-2",
            text: "Set up multi-factor authentication",
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
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Performance",
    description: "Application performance and optimization",
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
          },
          {
            id: "2-1-2",
            text: "Optimize asset loading",
          },
        ],
      },
    ],
  },
];