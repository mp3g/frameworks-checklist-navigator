import { Dimension } from "../types/attributes";

export const dimensions: Dimension[] = [
  {
    id: "D01",
    title: "Application Security",
    description: "Application security involves protecting software applications from threats throughout their lifecycle, from development to deployment. This includes identifying and fixing vulnerabilities, implementing secure coding practices, and using tools like firewalls and encryption to prevent unauthorized access and data breaches",
    areas: [
      {
        id: "A02",
        title: "API and Web Service",
        description: "API security refers to the practices and procedures that protect application programming interfaces (APIs) from misuse, malicious bot attacks and other cybersecurity threats.",
        isCompleted: false,
        remediationProposals: [
          {
            title: "SOAP Web Service",
            category: "OWASP ASVS",
            isCompleted: false,
            description: "Secure implementation of SOAP Web Services",
            mitigation_measures: [
              "Verify that XSD schema validation takes place to ensure a properly formed XML document, followed by validation of each input field before any processing of that data takes place.",
              "Verify that the message payload is signed using WS-Security to ensure reliable transport between client and service."
            ]
          }
        ]
      }
    ]
  }
];