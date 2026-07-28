# HiDevs Hiring Search Engine

> **Enterprise-tier AI-powered candidate sourcing and pipeline management platform** built with Next.js 16, React 19, and Tailwind CSS 4.

---

## Overview

The **HiDevs Hiring Search Engine** is an internal enterprise hiring platform that enables recruiters and hiring managers to:

- **Source candidates** using natural language or domain-specific search queries
- **Filter talent** across experience, location, tech stack, notice period, salary, AI match score, and workspace status
- **Manage a hiring pipeline** with Saved, Shortlisted, and Interview Planned stages
- **Review AI-scored intelligence profiles** — including builder scores, developer performance ratings, hackathon results, CodeQuest tiers, and verified skill evidence
- **Surface only open-to-work candidates** — passive candidates (not open to work) are excluded from sourcing results and the active pipeline switcher

---

## Features

| Feature | Description |
|---|---|
| 🔍 Natural Language Search | Search candidates by role, skills, stack, or name using free-form queries |
| 🎯 Domain Search | Filter by exact keyword, tech stack, or username |
| 📊 AI Match Score | Every candidate has an AI evaluation score (0–100%) |
| 🏗️ Builder Score | Proprietary performance metric based on projects, challenges, and code output |
| 🗂️ Pipeline Management | Move candidates through Saved → Shortlisted → Interview Planned stages |
| 🟢 Open to Work Badge | Live animated badge on candidate profiles; passive candidates show a greyed "Not Open to Work" badge |
| 🔎 Advanced Filters | Experience range, location, notice period, expected salary (INR LPA), and workspace filters |
| 👤 Intelligence Profile | Full candidate detail view including work timeline, education, skills distribution, hackathons, personal projects, and recruiter hiring brief |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI Library | [React 19](https://react.dev) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Icons | [Lucide React](https://lucide.dev) + Google Material Symbols |
| Font | Inter (via Google Fonts) |
| Linting | ESLint 9 + eslint-config-next |

---

## Project Structure

```
next-hiring/
├── src/
│   └── app/
│       ├── page.jsx              # Main application — all tabs, filters, and candidate views
│       ├── data.js               # Mock candidate data (mockCandidates array)
│       ├── candidate_template.js # Candidate data schema/template reference
│       ├── globals.css           # Global styles, design tokens, Tailwind config
│       └── layout.js             # Root layout
├── design.md                     # Design system specification and UI guidance
├── public/                       # Static assets
├── next.config.js
├── package.json
└── tailwind.config.js
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repo
git clone <your-repo-url>
cd next-hiring

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

---

## Candidate Data Schema

Each candidate in `data.js` follows this key structure:

```js
{
  userName: "String",
  openToWork: true | false,          // false = excluded from sourcing & pipeline
  workspace: "Saved" | "Shortlisted" | "Interview Planned",
  roleCategory: "Software Engineering",
  currentRole: "String",
  totalExperience: "X Years",
  aiEvaluationScore: 0-100,         // AI match score percentage
  builderScore: 0-1000,             // Proprietary builder metric
  developerPerformance: "ELITE" | "ADVANCED" | ...,
  noticePeriod: "Immediate" | "X Months",
  expectedSalary: "Rs XX,00,000",   // INR format
  currentStatusAvailability: "String",
  techStack: [],
  primaryTechSkills: [],
  // ... full schema in candidate_template.js
}
```

---

## Design System

Full design token specifications, component-level rules, accessibility requirements (WCAG 2.2 AA), and anti-patterns are documented in [`design.md`](./design.md).

Key principles:
- All colors use semantic tokens — no raw hex values in components
- Typography strictly follows the defined scale (Inter, 10px–30px)
- All interactive elements must have visible focus indicators
- Touch hit targets >= 44x44px

---

## Key Business Logic

### Open to Work Filtering
Candidates with `openToWork: false` are:
1. Excluded from `filteredCandidates` in the Talent Sourcing tab
2. Hidden from the Active Pipeline candidate switcher bar
3. Shown with a greyed "Not Open to Work" badge if accessed directly via the pipeline view

### Pipeline Stages
Candidates move between stages via the **Save/Unsave** toggle:
- `Saved` <-> `Shortlisted` (toggled via the save button)
- `Interview Planned` is set directly in the data

### AI Match Score Filter
The sourcing view applies a minimum match score filter (default: 50%). Recruiters can raise this to 90%+ to see only elite-tier candidates.

---

## License

Private — Internal use only.
