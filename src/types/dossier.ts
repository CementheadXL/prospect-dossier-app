// src/types/dossier.ts

export type ProspectInput = {
  prospectName: string;
  location: string;
  spouseName: string;
  assignedOfficer: string;
  education: string;
  knownFamily: string;
  knownAssets: string; // Replaced "quantitativeData" for MGO-friendly language
  notes: string;       // Kept "notes" (often called Officer Notes or Contact Reports)
};

// src/types/dossier.ts

export type ProspectInput = {
  prospectName: string;
  location: string;
  spouseName: string;
  assignedOfficer: string;
  education: string;
  knownFamily: string;
  knownAssets: string; 
  notes: string;       
};

export type DossierOutput = {
  executiveSummary: string;
  professionalProfile: {
    primaryRole: string;
    careerTrajectory: string[];
    corporateGovernance: string[];
  };
  wealthIndicators: {
    estimatedNetWorth: string;
    sourceOfWealth: string;
    assetProfile: string[];
    givingCapacity: string;
  };
  philanthropicProfile: {
    overview: string;
    interestsAndGiving: string[]; 
  };
  biographicalDetails: {
    spouse: string;
    children: string;
    affiliations: string[];
    keyMotivations: string;
  };
  sources: string[];
};