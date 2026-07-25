export interface TechStackItem {
  name: string;
  percentage: number;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'AI/ML' | 'Mobile';
}

export interface WorkExperience {
  company: string;
  role: string;
  duration: string;
  location: string;
  highlights: string[];
  isCurrent?: boolean;
}

export interface Education {
  degree: string;
  college: string;
  year: string;
  cgpa: string;
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  github?: string;
  type: 'Personal' | 'Hackathon' | 'Challenge';
}

export interface IntelligenceCard {
  id: string;
  title: string;
  category: string;
  description: string;
  bio: string;
  details: string[];
  availabilityNote: string;
  locationSpecs: {
    preferredLocation: string;
    currentLocation: string;
    workplaceType: 'Remote' | 'Hybrid' | 'On-site';
    relocation: boolean;
  };
  salaryDetails: {
    current: string;
    expected: string;
    variableBonus: string;
    currency: string;
  };
  immediateJoiner: boolean;
  noticePeriod: string;
}

export interface Candidate {
  id: string;
  name: string;
  avatar: string;
  email: string;
  contact: string;
  github: string;
  linkedin: string;
  resumeUrl: string;

  // Role Info
  roleCategory: string;
  currentRole: string;
  preferredRoles: string[];
  totalExperience: string;
  companyExperienceYears: string;
  openToWork: boolean;
  currentStatus: string;
  employmentType: string;

  // Tech Stack & Skills
  primaryTechSkills: string[];
  additionalTechSkills: string[];
  preferredTechStack: string[];
  techStack: TechStackItem[];

  // Location & Salary
  currentLocation: string;
  preferredLocation: string;
  currentSalary: string;
  expectedSalary: string;
  variableBonus: string;
  noticePeriod: string;

  // Timeline & Edu
  workExperienceTimeline: WorkExperience[];
  education: Education;

  // Scores & Benchmarks
  builderScore: number;
  aiEvaluationScore: number;
  hiDevsAiScore: number;
  challengeRank: string;
  projectRank: string;
  problemSolvingScore: number;
  leadershipScore: number;
  learningVelocity: number;
  executionQuality: number;
  challengeConsistency: number;

  // Evaluation & Summaries
  executiveSummary: string;
  detailedEvaluation: string;
  experienceBanding: string;
  areasForImprovement: string[];
  candidateBio: string;
  userSummary: string;
  keyHiringReasons: string[];
  topStrengths: string[];
  bestSuitedRoles: string[];
  potentialRisksToVerify: string[];

  // Recruiter Brief
  recruiterHiringBrief: {
    topEvidenceBasedReasons: string[];
    interviewAreasToVerify: string[];
    interviewReadiness: 'Immediate' | '1-2 Weeks' | '3+ Weeks';
  };

  // Projects & Gamification
  projects: Project[];
  codeQuestCompleted: number;
  leetZPromptsCompleted: number;
  verifiedSkillsEvidence: string[];
  culturePreferences: string[];

  // Intelligence Cards & Categories
  intelligenceCards: IntelligenceCard[];

  // Workspace states
  isSaved?: boolean;
  isShortlisted?: boolean;
  isInterviewPlanned?: boolean;
}
