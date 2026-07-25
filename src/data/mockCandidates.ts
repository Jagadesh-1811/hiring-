import type { Candidate } from '../types/candidate';

export const mockCandidates: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Aarav Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    email: 'aarav.sharma@example.com',
    contact: '+91 98765 43210',
    github: 'https://github.com/aarav-sharma-dev',
    linkedin: 'https://linkedin.com/in/aarav-sharma-tech',
    resumeUrl: 'https://example.com/resumes/aarav_sharma.pdf',

    roleCategory: 'Full-Stack Engineering & AI Systems',
    currentRole: 'Senior Full Stack Engineer',
    preferredRoles: ['Lead Full Stack Architect', 'Principal Frontend Engineer', 'AI Platform Engineer'],
    totalExperience: '5.5 Years',
    companyExperienceYears: '3.5 Years at Tech Corp, 2 Years at CloudScale',
    openToWork: true,
    currentStatus: 'Serving Notice Period',
    employmentType: 'Full-Time (Remote / Hybrid)',

    primaryTechSkills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'TailwindCSS'],
    additionalTechSkills: ['GraphQL', 'Docker', 'Redis', 'PostgreSQL', 'Python (FastAPI)'],
    preferredTechStack: ['Next.js 14', 'TypeScript', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
    techStack: [
      { name: 'React / Next.js', percentage: 95, category: 'Frontend' },
      { name: 'TypeScript', percentage: 92, category: 'Frontend' },
      { name: 'Node.js / Express', percentage: 88, category: 'Backend' },
      { name: 'PostgreSQL & Prisma', percentage: 84, category: 'Database' },
      { name: 'Docker / AWS', percentage: 78, category: 'DevOps' },
      { name: 'Python / LangChain', percentage: 72, category: 'AI/ML' }
    ],

    currentLocation: 'Bengaluru, India',
    preferredLocation: 'Bengaluru / Remote / US Hybrid',
    currentSalary: '28,000,000 INR / yr ($34,000)',
    expectedSalary: '36,000,000 INR / yr ($43,000)',
    variableBonus: '15% Performance Annual Bonus',
    noticePeriod: '15 Days (Immediate)',

    workExperienceTimeline: [
      {
        company: 'CloudScale AI Solutions',
        role: 'Senior Full Stack Engineer',
        duration: '2023 - Present (2 Years)',
        location: 'Bengaluru / Remote',
        highlights: [
          'Architected real-time AI dashboard using Next.js 14, WebSockets, and Node.js serving 120k active DAUs.',
          'Reduced bundle sizes by 42% through code-splitting and dynamic mixers.',
          'Led a team of 4 frontend engineers implementing violet glassmorphism UI components.'
        ],
        isCurrent: true
      },
      {
        company: 'Tech Corp Systems',
        role: 'Software Engineer II',
        duration: '2020 - 2023 (3.5 Years)',
        location: 'Hyderabad, India',
        highlights: [
          'Built scalable microservices in Node.js and Express processing 5M+ daily requests.',
          'Implemented end-to-end authentication pipelines and strict API rate limiting.'
        ]
      }
    ],

    education: {
      degree: 'B.Tech in Computer Science & Engineering',
      college: 'Indian Institute of Technology (IIT), Madras',
      year: '2016 - 2020',
      cgpa: '9.3 / 10'
    },

    builderScore: 94,
    aiEvaluationScore: 96,
    hiDevsAiScore: 98,
    challengeRank: 'Top 1% Global (#14)',
    projectRank: 'Diamond Tier (99.2th Percentile)',
    problemSolvingScore: 96,
    leadershipScore: 91,
    learningVelocity: 98,
    executionQuality: 95,
    challengeConsistency: 97,

    executiveSummary: 'Exceptionally strong Full-Stack Developer with high problem-solving velocity and proven experience delivering complex SaaS interfaces and high-throughput Node.js microservices. Rated Top 1% by HiDevs AI.',
    detailedEvaluation: 'Aarav demonstrates deep mastery over frontend architecture and modern React design patterns. His code quality is clean, well-tested, and optimized for low-latency client rendering. Demonstrates natural leadership and rapid tech stack adoption.',
    experienceBanding: 'Senior Level (Band L5 / Staff Track)',
    areasForImprovement: [
      'Could expand advanced Kubernetes orchestration depth.',
      'Slight preference for async written updates over frequent sync meetings.'
    ],
    candidateBio: 'Product-minded builder passionate about high-aesthetic web UI, generative AI integrations, and high-concurrency Node.js architectures. Constant participant in hackathons and CodeQuest challenges.',
    userSummary: 'Aarav is an elite full-stack engineer who excels in building modern React/Next.js platforms with flawless UI performance and scalable Node backends.',

    keyHiringReasons: [
      'Top 1% HiDevs AI Builder Score (98/100)',
      'Immediate availability (15-day notice period)',
      'Proven expertise scaling Next.js apps with 100k+ active users',
      'IIT Madras graduate with 9.3 CGPA'
    ],
    topStrengths: [
      'Frontend Performance Optimization',
      'Scalable REST API Architecture',
      'Clean Code & Modular System Design',
      'Glassmorphic & Fluid UI Craftsmanship'
    ],
    bestSuitedRoles: [
      'Lead Frontend Engineer',
      'Senior Full-Stack Engineer',
      'Founding Product Engineer'
    ],
    potentialRisksToVerify: [
      'Confirm willingness to travel quarterly if remote.',
      'Check expectation around equity vs cash compensation ratio.'
    ],

    recruiterHiringBrief: {
      topEvidenceBasedReasons: [
        'Completed 48 CodeQuest challenges with 100% test pass rate.',
        'Built full open-source Next.js analytics tool with 2.4k GitHub stars.',
        'Demonstrated strong system architecture skills in technical assessment.'
      ],
      interviewAreasToVerify: [
        'System design of distributed caching layer.',
        'Hands-on state management strategies in complex Next.js App Router applications.'
      ],
      interviewReadiness: 'Immediate'
    },

    projects: [
      {
        title: 'Nexus AI - Developer Co-Pilot Interface',
        description: 'A sleek, real-time code generation canvas built with Next.js, Monaco Editor, and OpenAI APIs with custom CSS theme mixers.',
        techStack: ['Next.js', 'TypeScript', 'TailwindCSS', 'WebSockets', 'OpenAI'],
        link: 'https://nexus-ai-demo.example.com',
        github: 'https://github.com/aarav-sharma-dev/nexus-ai',
        type: 'Personal'
      },
      {
        title: 'HiHackathon Winner - Smart Recruiter AI',
        description: 'Award-winning AI candidate scoring tool that parses GitHub repos and ranks developer portfolios automatically.',
        techStack: ['React', 'Node.js', 'Express', 'VectorDB', 'Python'],
        link: 'https://smart-recruiter.example.com',
        github: 'https://github.com/aarav-sharma-dev/smart-recruiter',
        type: 'Hackathon'
      }
    ],

    codeQuestCompleted: 48,
    leetZPromptsCompleted: 312,
    verifiedSkillsEvidence: [
      'Verified React 18 Advanced Patterns (HiDevs Score: 99%)',
      'Verified Node.js System Architecture (HiDevs Score: 96%)',
      'Verified Micro-Frontend Modularization (HiDevs Score: 94%)'
    ],
    culturePreferences: [
      'Autonomous & Product-Driven Culture',
      'High Code Quality & Peer Reviews',
      'Remote-First or Flex Hybrid',
      'Continuous Learning & Tech Stack Experimentation'
    ],

    intelligenceCards: [
      {
        id: 'card-1-1',
        title: 'Frontend Architecture & Glassmorphic UI Specs',
        category: 'UI/UX Specs & Frontend Stack',
        description: 'Comprehensive specs detailing Aarav’s mastery over responsive design mixers, CSS variable themes, and fluid component libraries.',
        bio: 'Specialized in turning complex Figma prototypes into pixel-perfect React components with zero performance drop.',
        details: [
          'Mastery of Soft-Violet (#7C3AED / #F5F3FF) CSS color grading profiles.',
          'Custom micro-animations (e.g. 3s ease-in-out floating daveBob motion).',
          'Zero-CLS layout performance and dynamic typography scaling.'
        ],
        availabilityNote: 'Ready for Immediate Onboarding within 14 Days at Bengaluru or Full Remote.',
        locationSpecs: {
          preferredLocation: 'Bengaluru / Remote',
          currentLocation: 'Bengaluru, India',
          workplaceType: 'Hybrid',
          relocation: true
        },
        salaryDetails: {
          current: '28,000,000 INR',
          expected: '36,000,000 INR',
          variableBonus: '15%',
          currency: 'INR'
        },
        immediateJoiner: true,
        noticePeriod: '15 Days'
      },
      {
        id: 'card-1-2',
        title: 'Backend High Concurrency & Node Express Engine',
        category: 'Backend & System Scalability',
        description: 'Production evidence of building low-latency APIs and Redis-cached database microservices.',
        bio: 'Engineered RESTful Node APIs handling 5,000+ Requests Per Second with sub-50ms latency response times.',
        details: [
          'Express.js middleware architecture with JWT auth and rate limiting.',
          'PostgreSQL query tuning and connection pooling optimization.',
          'Event-driven asynchronous job queues with BullMQ and Redis.'
        ],
        availabilityNote: 'Can align with US East / West Coast overlap hours (up to 4 hours daily).',
        locationSpecs: {
          preferredLocation: 'Remote (US/EU Hours)',
          currentLocation: 'Bengaluru, India',
          workplaceType: 'Remote',
          relocation: false
        },
        salaryDetails: {
          current: '$34,000',
          expected: '$43,000',
          variableBonus: '15%',
          currency: 'USD'
        },
        immediateJoiner: true,
        noticePeriod: '15 Days'
      }
    ],

    isSaved: true,
    isShortlisted: true,
    isInterviewPlanned: false
  },
  {
    id: 'cand-2',
    name: 'Sophia Patel',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    email: 'sophia.patel@example.com',
    contact: '+1 (415) 890-1234',
    github: 'https://github.com/sophiapatel-ai',
    linkedin: 'https://linkedin.com/in/sophiapatel-lead',
    resumeUrl: 'https://example.com/resumes/sophia_patel.pdf',

    roleCategory: 'Backend & Distributed Systems',
    currentRole: 'Staff Backend Architect',
    preferredRoles: ['Principal Backend Engineer', 'VP of Engineering', 'Infrastructure Lead'],
    totalExperience: '8 Years',
    companyExperienceYears: '4 Years at Stripe, 4 Years at DataScale',
    openToWork: true,
    currentStatus: 'Available in 30 Days',
    employmentType: 'Full-Time (On-site / Hybrid)',

    primaryTechSkills: ['Node.js', 'Express', 'Go', 'PostgreSQL', 'System Architecture'],
    additionalTechSkills: ['Kubernetes', 'Kafka', 'AWS', 'Redis', 'gRPC'],
    preferredTechStack: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Kubernetes'],
    techStack: [
      { name: 'Node.js / Express', percentage: 98, category: 'Backend' },
      { name: 'PostgreSQL / SQL', percentage: 94, category: 'Database' },
      { name: 'Go / Distributed Systems', percentage: 89, category: 'Backend' },
      { name: 'DevOps / Kubernetes', percentage: 86, category: 'DevOps' },
      { name: 'System Design', percentage: 96, category: 'Backend' },
      { name: 'React (Basics)', percentage: 65, category: 'Frontend' }
    ],

    currentLocation: 'San Francisco, CA, USA',
    preferredLocation: 'San Francisco / New York / Remote',
    currentSalary: '$175,000 / yr',
    expectedSalary: '$210,000 / yr',
    variableBonus: '20% Annual Bonus + Equity Options',
    noticePeriod: '30 Days',

    workExperienceTimeline: [
      {
        company: 'DataScale Financial',
        role: 'Staff Backend Architect',
        duration: '2022 - Present (4 Years)',
        location: 'San Francisco, CA',
        highlights: [
          'Overhauled financial transaction processing pipeline, cutting database lock contention by 70%.',
          'Designed Express API gateway handling 25M+ requests daily with 99.99% uptime SLAs.'
        ],
        isCurrent: true
      },
      {
        company: 'Stripe Payments',
        role: 'Senior Software Engineer',
        duration: '2018 - 2022 (4 Years)',
        location: 'San Francisco, CA',
        highlights: [
          'Maintained high-reliability Node.js and Ruby microservices for payment routing.',
          'Architected automated disaster recovery and active-active failover mechanisms.'
        ]
      }
    ],

    education: {
      degree: 'M.S. in Computer Science',
      college: 'Stanford University',
      year: '2016 - 2018',
      cgpa: '3.9 / 4.0'
    },

    builderScore: 97,
    aiEvaluationScore: 98,
    hiDevsAiScore: 99,
    challengeRank: 'Top 0.5% Global (#05)',
    projectRank: 'Legend Tier (99.8th Percentile)',
    problemSolvingScore: 99,
    leadershipScore: 95,
    learningVelocity: 94,
    executionQuality: 98,
    challengeConsistency: 96,

    executiveSummary: 'World-class Backend Architect with 8 years building mission-critical financial systems and high-throughput Node.js microservices. Masters distributed consensus and database scaling.',
    detailedEvaluation: 'Sophia exhibits extraordinary engineering rigor. Her architectural designs emphasize zero-downtime migrations, fault tolerance, and clear observability. Excellent mentor for senior engineering teams.',
    experienceBanding: 'Principal / Staff Level (Band L6)',
    areasForImprovement: [
      'Primarily backend focused; requires frontend leads for complex UI projects.'
    ],
    candidateBio: 'Distributed systems strategist, open-source contributor to Node.js core tooling, and keynote speaker on database indexing strategies.',
    userSummary: 'Sophia is a top-tier Staff Backend Architect capable of leading core infrastructure teams and scaling Node/Express services to global scale.',

    keyHiringReasons: [
      'Top 0.5% HiDevs AI System Benchmark (99/100)',
      'Stanford M.S. graduate with 3.9 GPA',
      'Ex-Stripe and DataScale Staff engineering background',
      'Proven experience managing $100M+ transaction pipelines'
    ],
    topStrengths: [
      'High-Throughput Node API Design',
      'Distributed Systems & Database Optimization',
      'Technical Leadership & Mentorship',
      'Reliability & Incident Management'
    ],
    bestSuitedRoles: [
      'Staff / Principal Backend Engineer',
      'Director of Core Engineering',
      'Infrastructure Architect'
    ],
    potentialRisksToVerify: [
      'Confirm base vs equity expectation in target offer package.'
    ],

    recruiterHiringBrief: {
      topEvidenceBasedReasons: [
        'Authored distributed locking whitepaper cited by 500+ engineers.',
        'Successfully scaled system from 1M to 30M requests per day at DataScale.'
      ],
      interviewAreasToVerify: [
        'Deep dive into database sharding & distributed transactions.',
        'Engineering org structure and cross-functional leadership.'
      ],
      interviewReadiness: '1-2 Weeks'
    },

    projects: [
      {
        title: 'FastCache Express Engine',
        description: 'An ultra-fast caching middleware for Express.js with automatic key invalidation and zero-dependency memory store.',
        techStack: ['Node.js', 'Express', 'TypeScript', 'C++ Bindings'],
        github: 'https://github.com/sophiapatel-ai/fastcache-express',
        type: 'Personal'
      }
    ],

    codeQuestCompleted: 62,
    leetZPromptsCompleted: 540,
    verifiedSkillsEvidence: [
      'Verified Distributed Systems Architecture (HiDevs Score: 99%)',
      'Verified Node.js Internal Mechanics (HiDevs Score: 98%)'
    ],
    culturePreferences: [
      'High Technical Standards & Engineering Excellence',
      'Transparent Leadership',
      'Ownership & High Autonomy'
    ],

    intelligenceCards: [
      {
        id: 'card-2-1',
        title: 'Backend High Throughput Specs & Express Core',
        category: 'Backend Architecture',
        description: 'Technical specs of Sophia’s custom Node microservice framework built for ultra-low latency transaction processing.',
        bio: 'Specialist in scaling Node.js runtimes using worker threads and asynchronous I/O non-blocking loops.',
        details: [
          'Sub-10ms P99 latency SLA on high-throughput Express routes.',
          'Automated database connection pooling & query optimization.',
          'Zero-downtime blue/green deployment strategy on Kubernetes.'
        ],
        availabilityNote: 'Available to start within 30 days. Open to SF Bay Area on-site or global remote.',
        locationSpecs: {
          preferredLocation: 'San Francisco, CA / Remote',
          currentLocation: 'San Francisco, CA',
          workplaceType: 'Hybrid',
          relocation: false
        },
        salaryDetails: {
          current: '$175,000',
          expected: '$210,000',
          variableBonus: '20%',
          currency: 'USD'
        },
        immediateJoiner: false,
        noticePeriod: '30 Days'
      }
    ],

    isSaved: true,
    isShortlisted: true,
    isInterviewPlanned: true
  },
  {
    id: 'cand-3',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    email: 'marcus.vance@example.com',
    contact: '+44 20 7946 0912',
    github: 'https://github.com/marcus-vance-ui',
    linkedin: 'https://linkedin.com/in/marcusvance-design-eng',
    resumeUrl: 'https://example.com/resumes/marcus_vance.pdf',

    roleCategory: 'Frontend & Creative Design Engineering',
    currentRole: 'Lead Frontend UI/UX Engineer',
    preferredRoles: ['Design Engineer', 'Head of Frontend', 'Staff UI Engineer'],
    totalExperience: '6 Years',
    companyExperienceYears: '3 Years at Designify UK, 3 Years at Vercel Community Partner',
    openToWork: true,
    currentStatus: 'Immediate Joiner',
    employmentType: 'Full-Time (Remote / Contract)',

    primaryTechSkills: ['React', 'Next.js', 'TailwindCSS', 'Three.js / Canvas', 'Framer Motion'],
    additionalTechSkills: ['TypeScript', 'Design Systems', 'CSS Variables', 'Figma API', 'WebGL'],
    preferredTechStack: ['React', 'Next.js', 'TailwindCSS', 'Framer Motion', 'TypeScript'],
    techStack: [
      { name: 'React / Next.js', percentage: 96, category: 'Frontend' },
      { name: 'CSS & Tailwind Styling', percentage: 99, category: 'Frontend' },
      { name: 'Animations & Micro-interactions', percentage: 95, category: 'Frontend' },
      { name: 'Design System Engineering', percentage: 94, category: 'Frontend' },
      { name: 'TypeScript', percentage: 87, category: 'Frontend' }
    ],

    currentLocation: 'London, United Kingdom',
    preferredLocation: 'London / EU Remote / Global Remote',
    currentSalary: '75,000 GBP / yr ($95,000)',
    expectedSalary: '90,000 GBP / yr ($115,000)',
    variableBonus: '10% Annual Bonus',
    noticePeriod: 'Immediate (0 Days)',

    workExperienceTimeline: [
      {
        company: 'Designify UK Studios',
        role: 'Lead Frontend UI/UX Engineer',
        duration: '2023 - Present (3 Years)',
        location: 'London, UK / Hybrid',
        highlights: [
          'Created multi-tenant design system used across 14 enterprise web apps.',
          'Specialized in soft-violet glassmorphism theme mixers, glowing shadows, and interactive animations.'
        ],
        isCurrent: true
      },
      {
        company: 'Creative Code Labs',
        role: 'Senior UI Developer',
        duration: '2020 - 2023 (3 Years)',
        location: 'London, UK',
        highlights: [
          'Designed bespoke interactive landing pages achieving 38% higher conversion rates.',
          'Built accessible component primitives compliant with WCAG AAA standards.'
        ]
      }
    ],

    education: {
      degree: 'B.Sc. in Digital Design & Software Engineering',
      college: 'Imperial College London',
      year: '2016 - 2020',
      cgpa: '1st Class Honours (3.8 equivalent)'
    },

    builderScore: 95,
    aiEvaluationScore: 94,
    hiDevsAiScore: 96,
    challengeRank: 'Top 2% Global (#42)',
    projectRank: 'Gold Tier (97.5th Percentile)',
    problemSolvingScore: 92,
    leadershipScore: 90,
    learningVelocity: 96,
    executionQuality: 99,
    challengeConsistency: 93,

    executiveSummary: 'Master Design Engineer blending high art with pristine React frontend code. Creator of award-winning glassmorphic themes and responsive UI mixers.',
    detailedEvaluation: 'Marcus is a rare hybrid talent who bridging the gap between Figma mockups and high-performance React code. Exceptional eye for micro-animations, typography, and theme grading.',
    experienceBanding: 'Senior Design Engineer (Band L5)',
    areasForImprovement: [
      'Prefers frontend & design system scope over heavy backend database work.'
    ],
    candidateBio: 'Design systems fanatic, UI craftsman, and open-source author of interactive CSS gradient animation kits.',
    userSummary: 'Marcus brings unmatched visual polishing and design craftsmanship to web platforms, creating experiences that wows users at first glance.',

    keyHiringReasons: [
      'Unmatched UI aesthetic quality & glassmorphism expertise',
      'Immediate availability for hire',
      'Imperial College London graduate',
      'Proven experience scaling Design Systems for 14+ enterprise products'
    ],
    topStrengths: [
      'Glassmorphic & Fluid Color Mixer Design',
      'Micro-Animations & Interactive Motion',
      'Design System Token Architecting',
      'High-Conversion Landing Page Polish'
    ],
    bestSuitedRoles: [
      'Lead Design Engineer',
      'Senior Frontend Developer',
      'UI/UX Component Specialist'
    ],
    potentialRisksToVerify: [
      'Ensure clear alignment on design system ownership.'
    ],

    recruiterHiringBrief: {
      topEvidenceBasedReasons: [
        'Built open-source Violet CSS theme library with 1.8k GitHub stars.',
        'Consistently rated 99/100 on execution quality by peer reviewers.'
      ],
      interviewAreasToVerify: [
        'Demonstration of live component styling and CSS variable token structures.',
        'Cross-browser animation performance testing.'
      ],
      interviewReadiness: 'Immediate'
    },

    projects: [
      {
        title: 'GlassMixer UI Component Library',
        description: 'A modern React component kit utilizing soft violet gradients, glassmorphism backdrop filters, and custom CSS variables.',
        techStack: ['React', 'TailwindCSS', 'CSS Variables', 'Framer Motion'],
        github: 'https://github.com/marcus-vance-ui/glass-mixer-ui',
        type: 'Personal'
      }
    ],

    codeQuestCompleted: 35,
    leetZPromptsCompleted: 210,
    verifiedSkillsEvidence: [
      'Verified Design System Engineering (HiDevs Score: 99%)',
      'Verified Framer Motion Animation Mastery (HiDevs Score: 97%)'
    ],
    culturePreferences: [
      'Design-Centric Culture',
      'Focus on Craft & User Delight',
      'Collaborative Feedback Loops'
    ],

    intelligenceCards: [
      {
        id: 'card-3-1',
        title: 'Glassmorphic Design Systems & Color Theme Specs',
        category: 'UI/UX & Color Grading',
        description: 'Complete specification of Marcus’s soft-violet color token palette (#7C3AED, #6D28D9, #F5F3FF) and elevation rules.',
        bio: 'Crafts design tokens that naturally maintain high contrast while providing soft lavender glowing depth.',
        details: [
          'Standardized Tailwind color mappings for light and dark glassmorphic overlays.',
          'Subtle elevation shadows (0 2px 8px rgba(124, 58, 237, 0.12)).',
          'Responsive grid layout rules across mobile, tablet, and ultra-wide screens.'
        ],
        availabilityNote: 'Immediate Joiner. Can begin within 48 hours for remote or London office.',
        locationSpecs: {
          preferredLocation: 'London / Remote',
          currentLocation: 'London, United Kingdom',
          workplaceType: 'Remote',
          relocation: true
        },
        salaryDetails: {
          current: '75,000 GBP',
          expected: '90,000 GBP',
          variableBonus: '10%',
          currency: 'GBP'
        },
        immediateJoiner: true,
        noticePeriod: '0 Days (Immediate)'
      }
    ],

    isSaved: false,
    isShortlisted: true,
    isInterviewPlanned: false
  }
];
