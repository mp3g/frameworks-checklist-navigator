export interface MitigationMeasure {
  text: string;
  isCompleted: boolean;
}

export interface RemediationProposal {
  title: string;
  category: "OWASP ASVS" | "DSOMM" | "MITRE ATT&CK";
  isCompleted: boolean;
  description: string;
  mitigation_measures: string[];
}

export interface Area {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  remediationProposals: RemediationProposal;
}

export interface Dimension {
  id: string;
  title: string;
  description: string;
  areas: Area[];
}