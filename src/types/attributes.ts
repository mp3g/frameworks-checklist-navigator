export interface RemediationProposal {
  id: string;
  title: string;
  category: "OWASP ASVS" | "DSOMM" | "MITRE ATT&CK";
  isCompleted: boolean;
  description: string;
  mitigation_measures: string[];
  audit?: string;
}

export interface Area {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  controls: RemediationProposal[];
}

export interface Dimension {
  id: string;
  title: string;
  description: string;
  areas: Area[];
}