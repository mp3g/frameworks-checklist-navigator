export interface RemediationProposal {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface Area {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  remediationProposals: RemediationProposal[];
}

export interface Dimension {
  id: string;
  title: string;
  description: string;
  areas: Area[];
}