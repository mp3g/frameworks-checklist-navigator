export interface RemediationProposal {
  id: string;
  text: string;
}

export interface Subattribute {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  remediationProposals: RemediationProposal[];
}

export interface Attribute {
  id: string;
  title: string;
  description: string;
  subattributes: Subattribute[];
}