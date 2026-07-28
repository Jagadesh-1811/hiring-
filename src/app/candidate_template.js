// ============================================================
// HiDevs Search Engine � Candidate Data Template
// ============================================================
// This file contains ONE empty candidate entry with EVERY
// field organized by the UI page section it appears in.
// Fill in the values for each new candidate below.
// ============================================================






// ============================================================
// EMPTY CANDIDATE TEMPLATE � Fill in all values below
// ============================================================
export const emptyCandidateTemplate = {

  // -- Profile Header Card ---------------------------------
  userName: "",
  emailAddress: "",
  contactInformation: "",
  githubProfile: "",           // e.g. "github.com/username"
  linkedinProfile: "",         // e.g. "linkedin.com/in/username"
  resume: "",                  // e.g. "Resume_Name.pdf" or full URL

  // -- Role Details ---------------------------------------
  roleCategory: "",            // "Software Engineering" | "Data Science" | "Design" | "Product"
  currentRole: "",             // e.g. "Senior Full Stack Engineer @ Company"
  preferredTargetRoles: [],
  totalExperience: "",         // e.g. "5 Years"
  companyExperience: "",       // e.g. "3 Years at Company A, 2 Years at Company B"

  // -- Work Experience Timeline ---------------------------
  workExperienceTimeline: [
    {
      role: "",
      company: "",
      period: "",              // e.g. "2023 � PRESENT"
      description: ""
    }
  ],

  // -- Education ----------------------------------------
  education: "",               // e.g. "B.Tech in Computer Science"
  college: "",                 // e.g. "IIT Madras"
  cgpa: "",                    // e.g. "9.3/10" or "3.9/4.0"

  // -- Technical Skills ----------------------------------
  primaryTechSkills: [],
  additionalTechSkills: [],
  preferredTechStack: [],
  techStack: [],
  techStackPercentage: [
    { name: "SYSTEMS ARCH", percentage: 0 },
    { name: "FRONTEND ENG", percentage: 0 },
    { name: "DEVOPS/CLOUD", percentage: 0 }
  ],
  skillDistribution: [
    { name: "", percentage: 0 },
    { name: "", percentage: 0 },
    { name: "", percentage: 0 }
  ],

  // -- Location & Availability ---------------------------
  preferredLocation: "",
  currentLocation: "",
  currentStatusAvailability: "", // "Immediate" | "Serving Notice Period" | "X Weeks Notice"
  employmentType: "",             // "Full-Time (Remote)" | "Full-Time (Hybrid)" | "Contract"
  openToWork: true,

  // -- Salary & Notice Period ----------------------------
  currentSalary: "",             // e.g. "?24,00,000"
  expectedSalary: "",            // e.g. "?30,00,000"
  variableBonus: "",             // e.g. "12% annual bonus"
  noticePeriod: "",              // e.g. "Immediate" | "15 Days" | "1 Month"
  experienceBanding: "",         // e.g. "Senior Level (Band L5 / Staff Track)"

  // -- Bio & Culture -------------------------------------
  candidateBio: "",
  culturePreferences: "",

  // -- Performance Matrix --------------------------------
  builderScore: 0,
  developerPerformance: "",      // "ELITE" | "STRONG" | "GROWING"
  problemSolvingScore: 0,        // 0�100
  leadershipScore: 0,            // 0�100
  learningVelocity: 0,           // 0�100
  executionQuality: 0,           // 0�100
  challengeConsistency: 0,       // 0�100

  // -- AI Evaluation -------------------------------------
  aiEvaluationScore: 0,          // 0�100 (also used as Match % on cards)
  hiDevsAIScore: 0,              // 0�100
  challengeRank: "",             // e.g. "Top 2%"
  projectRank: "",               // e.g. "Top 3.0%"
  interviewReadiness: "",        // e.g. "Ready (Scheduling interview)"

  // -- Summaries -----------------------------------------
  userSummary: "",
  executiveSummary: "",
  detailedEvaluation: "",

  // -- AI Report -----------------------------------------
  topStrengths: [],
  areasForImprovement: [],
  bestSuitedRoles: [],
  potentialRisksToVerify: [],
  verifiedSkillsEvidence: [],

  // -- Personal Projects ---------------------------------
  personalProjects: [
    {
      title: "",
      description: "",
      imageUrl: "",              // Unsplash URL or hosted image
      techStack: [],             // Optional
      githubUrl: "",             // Optional
      liveUrl: ""                // Optional
    }
  ],

  // -- Hackathons (STRUCTURED ARRAY) ---------------------
  hackathons: [
    {
      name: "",                  // e.g. "Global GenAI Hackathon 2024"
      result: "",                // e.g. "1st Place Winner" | "Top 10 Finalist" | "Participant"
      year: "",                  // e.g. "2024"
      description: ""            // What was built or what the win was for
    }
  ],

  // -- Challenges (STRUCTURED ARRAY) ---------------------
  challenges: [
    {
      name: "",                  // e.g. "LeetZ Coding Sprint"
      result: "",                // e.g. "Completed" | "Winner" | "Diamond Tier"
      score: "",                 // e.g. "124 prompts" | "98/100"
      year: ""                   // e.g. "2024"
    }
  ],

  // -- Coding Activity -----------------------------------
  codeQuestCompleted: "",        // e.g. "Diamond Tier" or "48 Quests"
  leetzPromptsCompleted: "",     // e.g. "312"

  // -- Recruiter Brief -----------------------------------
  recruiterHiringBrief: "",
  keyHiringReasons: [],
  topEvidenceBasedReasonsToHire: [],
  interviewAreasToVerify: [],

  // -- Workspace Status ----------------------------------
  workspace: "Saved",            // "Saved" | "Shortlisted" | "Interview Planned"

  // -- Intelligence Cards --------------------------------
  intelligenceCards: []          // AI insight strings on card footers
};

