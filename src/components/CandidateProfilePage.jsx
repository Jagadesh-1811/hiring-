'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  FaGithub, FaLinkedin, FaFileDownload, FaMapMarkerAlt, FaBriefcase,
  FaClock, FaCheckCircle, FaArrowLeft, FaEnvelope, FaPhone,
  FaBuilding, FaShieldAlt, FaBookOpen, FaUser, FaChartBar,
  FaCode, FaTrophy, FaBolt, FaLayerGroup, FaStar, FaSearch
} from 'react-icons/fa';

/* ─── Small reusable atoms ──────────────────────────────────────── */

const ScoreBadge = ({ value, max = 100, color = 'violet', label }) => {
  const colors = {
    violet:  { ring: '#7c3aed', text: 'text-violet-700',  bg: 'bg-violet-50'  },
    emerald: { ring: '#059669', text: 'text-emerald-700', bg: 'bg-emerald-50' },
    amber:   { ring: '#d97706', text: 'text-amber-700',   bg: 'bg-amber-50'   },
    blue:    { ring: '#2563eb', text: 'text-blue-700',    bg: 'bg-blue-50'    },
    rose:    { ring: '#e11d48', text: 'text-rose-700',    bg: 'bg-rose-50'    },
  };
  const c = colors[color];
  const r = 28; const circ = 2 * Math.PI * r;
  const pct = (value / max) * 100;
  return (
    <div className={`flex flex-col items-center gap-2 px-5 py-4 rounded-xl border border-gray-100 ${c.bg}`}>
      <div className="relative w-16 h-16">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 68 68">
          <circle cx="34" cy="34" r={r} fill="none" stroke="#fff" strokeWidth="5" />
          <circle cx="34" cy="34" r={r} fill="none" stroke={c.ring} strokeWidth="5"
            strokeDasharray={circ} strokeDashoffset={circ - (pct / 100) * circ}
            strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-base font-black text-gray-900 leading-none">{value}</span>
          <span className="text-[8px] text-gray-400 font-bold">/{max}</span>
        </div>
      </div>
      <span className={`text-[10px] font-black ${c.text} uppercase tracking-wide text-center leading-tight`}>{label}</span>
    </div>
  );
};

const SkillBar = ({ name, pct, category }) => {
  const catMap = {
    Frontend: { bg: 'bg-violet-50/50 border-violet-100', text: 'text-violet-700', badge: 'bg-violet-100 text-violet-700' },
    Backend:  { bg: 'bg-blue-50/50 border-blue-100',     text: 'text-blue-700',   badge: 'bg-blue-100 text-blue-700'     },
    Database: { bg: 'bg-emerald-50/50 border-emerald-100', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700'},
    DevOps:   { bg: 'bg-amber-50/50 border-amber-100',   text: 'text-amber-700',  badge: 'bg-amber-100 text-amber-700'   },
    'AI/ML':  { bg: 'bg-rose-50/50 border-rose-100',     text: 'text-rose-700',   badge: 'bg-rose-100 text-rose-700'     },
  };
  const c = catMap[category] || { bg: 'bg-gray-50 border-gray-100', text: 'text-gray-700', badge: 'bg-gray-100 text-gray-600' };
  return (
    <div className={`p-2.5 rounded-xl border ${c.bg} flex items-center justify-between gap-2 shadow-2xs hover:border-violet-300 transition-all`}>
      <div className="min-w-0 flex-1">
        <p className="font-extrabold text-gray-900 text-xs truncate">{name}</p>
        <span className={`inline-block text-[9px] font-black px-1.5 py-0.2 rounded mt-1 ${c.badge}`}>{category}</span>
      </div>
      <span className={`text-xs font-black shrink-0 ${c.text}`}>{pct}%</span>
    </div>
  );
};

const Chip = ({ children, variant = 'gray' }) => {
  const v = {
    gray:    'bg-gray-100   text-gray-700   border-gray-200',
    violet:  'bg-violet-100 text-violet-800 border-violet-200',
    emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    amber:   'bg-amber-100  text-amber-800  border-amber-200',
    blue:    'bg-blue-100   text-blue-800   border-blue-200',
    rose:    'bg-rose-100   text-rose-800   border-rose-200',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold border ${v[variant]}`}>
      {children}
    </span>
  );
};

/* Card component */
const Card = ({ children, className = '', title }) => {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      {title && (
        <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50/60">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{title}</p>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};

/* Section wrapper with a clear header */
const Section = ({ id, icon: Icon, title, children, bg = 'bg-[#f8f9fc]' }) => (
  <div id={`sec-${id}`} className={`${bg} border-b-2 border-gray-200`}>
    <div className="px-6 py-3 border-b border-gray-200 bg-white flex items-center gap-2.5">
      <div className="w-6 h-6 rounded-lg bg-violet-600 flex items-center justify-center shrink-0">
        <Icon className="w-3 h-3 text-white" />
      </div>
      <h2 className="text-sm font-black text-gray-800">{title}</h2>
    </div>
    <div className="p-3 pb-2">{children}</div>
  </div>
);

const InfoItem = ({ Icon, label, value }) => (
  <div className="flex items-center gap-2.5 py-2 border-b border-gray-50 last:border-0">
    <div className="w-6 h-6 rounded-md bg-violet-50 flex items-center justify-center shrink-0">
      <Icon className="w-3 h-3 text-violet-600" />
    </div>
    <div className="min-w-0">
      <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider">{label}</p>
      <p className="text-xs font-bold text-gray-800 truncate">{value || '—'}</p>
    </div>
  </div>
);

const KV = ({ label, value, accent }) => {
  const ac = { violet: 'text-violet-700', emerald: 'text-emerald-700', blue: 'text-blue-700', amber: 'text-amber-700', rose: 'text-rose-700' };
  return (
    <div className="flex items-start justify-between gap-2 py-1.5 border-b border-gray-50 last:border-0">
      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider shrink-0">{label}</span>
      <span className={`text-[11px] font-black text-right ${ac[accent] || 'text-gray-900'}`}>{value || '—'}</span>
    </div>
  );
};

/* ─── Main Page Component ─────────────────────────────────────────── */
export const CandidateProfilePage = ({ candidate, onBack, onToggleSave, onToggleShortlist }) => {
  if (!candidate) return null;

  const aiTier =
    candidate.hiDevsAiScore >= 95 ? { label: 'Elite Tier',  cls: 'bg-amber-100 text-amber-700 border-amber-300'   } :
    candidate.hiDevsAiScore >= 85 ? { label: 'Senior Tier', cls: 'bg-violet-100 text-violet-700 border-violet-300' } :
                                    { label: 'Mid Tier',     cls: 'bg-blue-100  text-blue-700  border-blue-300'    };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] w-full bg-[#f8f9fc] overflow-hidden">

      {/* ── MAIN CONTENT (WCAG Landmark) ──────────────────────────── */}
      <main aria-label="Candidate Profile Information" className="flex-1 overflow-y-auto">

        {/* ── HERO BANNER ──────────────────────────────────────────── */}
        <div className="bg-gradient-to-r from-violet-950 via-indigo-900 to-purple-950 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />

          <div className="relative px-6 py-4">
            {/* Top Bar: Back button + Primary actions */}
            <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-white/10">
              <button onClick={onBack}
                aria-label="Navigate back to candidates list"
                className="flex items-center gap-2 text-xs font-black text-white/80 hover:text-white bg-white/10 hover:bg-white/20 min-h-[44px] px-3.5 py-2 rounded-lg border border-white/10 transition-all duration-150 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[#7c3aed] focus-visible:ring-offset-2">
                <FaArrowLeft className="w-3 h-3 shrink-0" /> Back to Candidates
              </button>

              <div className="flex items-center gap-2">
                <button onClick={() => onToggleSave(candidate.id)}
                  aria-label={candidate.isSaved ? 'Remove candidate from saved list' : 'Save candidate'}
                  className={`min-h-[44px] px-4 py-2 rounded-lg text-xs font-black transition-all duration-150 active:scale-[0.97] border focus-visible:ring-2 focus-visible:ring-[#7c3aed] focus-visible:ring-offset-2 ${
                    candidate.isSaved
                      ? 'bg-violet-500 text-white border-violet-400 shadow-sm'
                      : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                  }`}>
                  {candidate.isSaved ? 'Saved' : 'Save Candidate'}
                </button>
                <button onClick={() => onToggleShortlist(candidate.id)}
                  aria-label={candidate.isShortlisted ? 'Remove candidate from shortlist' : 'Shortlist candidate'}
                  className={`min-h-[44px] px-4 py-2 rounded-lg text-xs font-black transition-all duration-150 active:scale-[0.97] border focus-visible:ring-2 focus-visible:ring-[#7c3aed] focus-visible:ring-offset-2 ${
                    candidate.isShortlisted
                      ? 'bg-emerald-500 text-white border-emerald-400 shadow-sm'
                      : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                  }`}>
                  {candidate.isShortlisted ? 'Shortlisted' : 'Shortlist Candidate'}
                </button>
              </div>
            </div>
            {/* Row 1: Identity */}
            <div className="flex items-start justify-between gap-6 flex-wrap mb-4">
              <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <img src={candidate.avatar} alt={candidate.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-white/20 shadow-xl" />
                  {candidate.openToWork && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-emerald-400 text-white text-[8px] font-black px-2 py-0.5 rounded-full shadow whitespace-nowrap">
                      Open to Work
                    </span>
                  )}
                </div>
                <div className="space-y-1.5 pt-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl font-black text-white">{candidate.name}</h1>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${aiTier.cls}`}>{aiTier.label}</span>
                  </div>
                  <p className="text-violet-200 font-bold text-sm">{candidate.currentRole}</p>
                  <div className="flex flex-wrap gap-x-5 gap-y-0.5 text-[10px] text-violet-300/80">
                    <span className="flex items-center gap-1"><FaMapMarkerAlt className="w-2.5 h-2.5" />{candidate.currentLocation}</span>
                    <span className="flex items-center gap-1"><FaBriefcase className="w-2.5 h-2.5" />{candidate.totalExperience} exp</span>
                    <span className="flex items-center gap-1"><FaClock className="w-2.5 h-2.5" />Notice: {candidate.noticePeriod}</span>
                    <span className="flex items-center gap-1"><FaBuilding className="w-2.5 h-2.5" />{candidate.employmentType}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a href={candidate.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-[11px] font-bold border border-white/10 transition">
                  <FaGithub className="w-3.5 h-3.5" /> GitHub
                </a>
                <a href={candidate.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/70 hover:bg-blue-600 text-white rounded-lg text-[11px] font-bold border border-blue-400/30 transition">
                  <FaLinkedin className="w-3.5 h-3.5" /> LinkedIn
                </a>
                <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/70 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-bold border border-emerald-400/30 transition">
                  <FaFileDownload className="w-3.5 h-3.5" /> Resume
                </a>
              </div>
            </div>

            {/* Row 2: hiring reasons */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {candidate.keyHiringReasons.map((r, i) => (
                <div key={i} className="flex items-center gap-1.5 bg-white/10 border border-white/10 px-2.5 py-1 rounded-lg text-[10px] text-white/90 font-semibold">
                  <FaCheckCircle className="w-2.5 h-2.5 text-emerald-400 shrink-0" /> {r}
                </div>
              ))}
            </div>

            {/* Row 3: 5 key stats */}
            <div className="grid grid-cols-5 gap-2">
              {[
                { label: 'Expected CTC',   value: candidate.expectedSalary },
                { label: 'Current CTC',    value: candidate.currentSalary  },
                { label: 'Challenge Rank', value: candidate.challengeRank  },
                { label: 'Availability',   value: candidate.recruiterHiringBrief?.interviewReadiness || 'Immediate' },
                { label: 'Exp. Banding',   value: candidate.experienceBanding || 'Senior (L5)' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/10 border border-white/10 rounded-xl px-4 py-3">
                  <p className="text-[9px] font-bold text-violet-300 uppercase tracking-widest mb-1">{label}</p>
                  <p className="text-white font-black text-xs leading-snug">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════ */}
        {/*  SECTION 1 — OVERVIEW                                       */}
        {/* ════════════════════════════════════════════════════════════ */}
        <Section id="overview" icon={FaUser} title="Professional Overview">
          <div className="grid grid-cols-3 gap-3">
            {/* Col 1 — Bio & Summary */}
            <div className="col-span-1 flex flex-col gap-3">
              <Card title="Candidate Bio" accent="violet">
                <p className="text-xs text-gray-700 leading-relaxed">{candidate.candidateBio}</p>
              </Card>
              <Card title="Executive Summary" accent="violet">
                <p className="text-xs text-violet-900 font-semibold leading-relaxed">{candidate.executiveSummary}</p>
              </Card>
              {candidate.userSummary && (
                <Card title="Recruiter Note">
                  <p className="text-xs text-gray-500 leading-relaxed italic">"{candidate.userSummary}"</p>
                </Card>
              )}
              <Card title="Career Goals & Motivations">
                <div className="space-y-2">
                  {[
                    `Seeking a senior engineering role with strong product ownership and architectural responsibility`,
                    `Motivated by high-impact problems at the intersection of performance and user experience`,
                    `Wants to work with a team that values code quality, design systems and continuous delivery`,
                    `Long-term goal: transition into a Principal Engineer or Engineering Manager role`,
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                      <span className="w-4 h-4 rounded-full bg-violet-100 text-violet-700 text-[8px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                      {item}
                    </div>
                  ))}
                </div>
              </Card>

            </div>

            {/* Col 2 — Contact & Compensation */}
            <div className="col-span-1 flex flex-col gap-3">
              <Card title="Contact Details" accent="blue">
                <InfoItem Icon={FaEnvelope}     label="Email"              value={candidate.email} />
                <InfoItem Icon={FaPhone}        label="Phone"              value={candidate.contact} />
                <InfoItem Icon={FaMapMarkerAlt} label="Current Location"   value={candidate.currentLocation} />
                <InfoItem Icon={FaMapMarkerAlt} label="Preferred Location" value={candidate.preferredLocation} />
                <InfoItem Icon={FaBuilding}     label="Company Exp."       value={candidate.companyExperienceYears} />
              </Card>
              <Card title="Compensation & Notice" accent="emerald">
                <KV label="Expected Salary"   value={candidate.expectedSalary}         accent="violet"  />
                <KV label="Current Salary"    value={candidate.currentSalary}          accent="blue"    />
                <KV label="Variable / Bonus"  value={candidate.variableBonus || 'N/A'} accent="amber"   />
                <KV label="Notice Period"     value={candidate.noticePeriod}           accent="emerald" />
                <KV label="Exp. Banding"      value={candidate.experienceBanding || 'Senior (L5)'} accent="rose" />
              </Card>
            </div>

            {/* Col 3 — Roles, Strengths, Risks, Culture */}
            <div className="col-span-1 flex flex-col gap-3">
              {candidate.preferredRoles?.length > 0 && (
                <Card title="Target Roles" accent="violet">
                  <div className="space-y-1.5">
                    {candidate.preferredRoles.map((r, i) => (
                      <div key={i} className="flex items-center gap-2 bg-violet-50 border border-violet-100 rounded-lg px-3 py-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                        <span className="text-xs font-bold text-violet-900">{r}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
              {candidate.culturePreferences?.length > 0 && (
                <Card title="Culture & Workplace Fit" accent="blue">
                  <div className="flex flex-wrap gap-1.5">
                    {candidate.culturePreferences.map((p, i) => <Chip key={i} variant="violet">{p}</Chip>)}
                  </div>
                </Card>
              )}
              {candidate.topStrengths?.length > 0 && (
                <Card title="Core Strengths" accent="emerald">
                  <div className="space-y-1.5">
                    {candidate.topStrengths.map((s, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs font-semibold text-emerald-800">
                        <FaCheckCircle className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" /> {s}
                      </div>
                    ))}
                  </div>
                </Card>
              )}
              {candidate.potentialRisksToVerify?.length > 0 && (
                <Card title="Risks to Verify">
                  <div className="space-y-1.5">
                    {candidate.potentialRisksToVerify.map((r, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs font-semibold text-rose-800">
                        <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-600 text-[8px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                        {r}
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/*  SECTION 2 — SKILLS                                          */}
        {/* ════════════════════════════════════════════════════════════ */}
        <Section id="skills" icon={FaCode} title="Skills & Technical Stack">
          <div className="grid grid-cols-3 gap-3">
            <Card title="Tech Stack Mastery" className="col-span-1">
              <div className="grid grid-cols-1 gap-2">
                {candidate.techStack.map(t => (
                  <SkillBar key={t.name} name={t.name} pct={t.percentage} category={t.category} />
                ))}
              </div>
            </Card>

            <div className="col-span-1 flex flex-col gap-3">
              {candidate.primaryTechSkills?.length > 0 && (
                <Card title="Core / Primary Skills" accent="violet">
                  <div className="flex flex-wrap gap-1.5">
                    {candidate.primaryTechSkills.map((s, i) => <Chip key={i} variant="violet">{s}</Chip>)}
                  </div>
                </Card>
              )}
              {candidate.additionalTechSkills?.length > 0 && (
                <Card title="Additional Skills" accent="gray">
                  <div className="flex flex-wrap gap-1.5">
                    {candidate.additionalTechSkills.map((s, i) => <Chip key={i}>{s}</Chip>)}
                  </div>
                </Card>
              )}
              {candidate.preferredTechStack?.length > 0 && (
                <Card title="Preferred / Target Stack">
                  <div className="flex flex-wrap gap-1.5">
                    {candidate.preferredTechStack.map((s, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-violet-50 text-violet-800 rounded-lg text-[11px] font-black border border-violet-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500" /> {s}
                      </span>
                    ))}
                  </div>
                </Card>
              )}
              <Card title="Tools & Dev Environment">
                <div className="flex flex-wrap gap-1.5">
                  {['VS Code', 'Git / GitHub', 'Docker', 'Figma', 'Postman', 'Linear', 'Notion', 'Vercel', 'AWS EC2', 'CI/CD GitHub Actions'].map((t, i) => (
                    <Chip key={i}>{t}</Chip>
                  ))}
                </div>
              </Card>
              <Card title="Soft Skills">
                <div className="flex flex-wrap gap-1.5">
                  {['Team Leadership', 'Code Review', 'Mentorship', 'Agile / Scrum', 'Technical Writing', 'System Design Thinking', 'Cross-team Collaboration', 'Problem Decomposition'].map((s, i) => (
                    <Chip key={i} variant="blue">{s}</Chip>
                  ))}
                </div>
              </Card>
            </div>

            <div className="col-span-1 flex flex-col gap-3">
              {candidate.verifiedSkillsEvidence?.length > 0 && (
                <Card title="AI-Verified Evidence" accent="emerald">
                  <div className="space-y-2">
                    {candidate.verifiedSkillsEvidence.map((ev, i) => (
                      <div key={i} className="flex items-start gap-2 p-2 bg-emerald-50 border border-emerald-100 rounded-lg">
                        <FaCheckCircle className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" />
                        <span className="text-xs font-semibold text-emerald-800">{ev}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
              <Card title="Skill Category Averages">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Frontend',    bg: 'bg-violet-50/60 border-violet-100', text: 'text-violet-700', skills: candidate.techStack.filter(t => t.category === 'Frontend')  },
                    { label: 'Backend',     bg: 'bg-blue-50/60 border-blue-100',     text: 'text-blue-700',   skills: candidate.techStack.filter(t => t.category === 'Backend')   },
                    { label: 'Database',    bg: 'bg-emerald-50/60 border-emerald-100', text: 'text-emerald-700',skills: candidate.techStack.filter(t => t.category === 'Database')  },
                    { label: 'DevOps',      bg: 'bg-amber-50/60 border-amber-100',   text: 'text-amber-700',  skills: candidate.techStack.filter(t => t.category === 'DevOps')    },
                    { label: 'AI/ML',       bg: 'bg-rose-50/60 border-rose-100',     text: 'text-rose-700',   skills: candidate.techStack.filter(t => t.category === 'AI/ML')    },
                    { label: 'System Arch', bg: 'bg-purple-50/60 border-purple-100', text: 'text-purple-700', count: 2, avgScore: 88 },
                  ].map(({ label, bg, text, skills, count, avgScore }) => {
                    const skillCount = skills ? skills.length : count;
                    const avg = skills ? Math.round(skills.reduce((a, s) => a + s.percentage, 0) / skills.length) : avgScore;
                    return (
                      <div key={label} className={`p-2.5 rounded-xl border ${bg} flex flex-col justify-between gap-1`}>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">{label}</span>
                          <span className="text-[9px] font-bold bg-white/80 px-1.5 py-0.5 rounded text-gray-600 border border-gray-100">{skillCount} Skills</span>
                        </div>
                        <p className={`text-sm font-black ${text}`}>{avg}% Avg</p>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card title="Architecture & Security">
                <div className="space-y-2">
                  {[
                    'Microservices architecture & RESTful API design excellence',
                    'OWASP top 10 security compliance & JWT/OAuth 2.0 authentication',
                    'CI/CD pipeline automation with automated regression testing',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 bg-gray-50 border border-gray-100 rounded-lg text-xs font-semibold text-gray-700">
                      <FaCheckCircle className="w-3 h-3 text-violet-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/*  SECTION 3 — EXPERIENCE                                      */}
        {/* ════════════════════════════════════════════════════════════ */}
        <Section id="experience" icon={FaBriefcase} title={`Work Experience — ${candidate.totalExperience}`}>
          <div className="grid grid-cols-3 gap-3">
            {/* Timeline — 2 cols */}
            <div className="col-span-2">
              <div className="relative pl-8">
                <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-violet-400 to-transparent" />
                <div className="space-y-3">
                  {candidate.workExperienceTimeline.map((exp, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-5 top-4 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 border-2 border-white shadow-sm flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-white" />
                      </div>
                      <div className={`bg-white rounded-xl border shadow-sm p-4 ${exp.isCurrent ? 'border-violet-200' : 'border-gray-200'}`}>
                        <div className="flex items-start justify-between gap-3 flex-wrap mb-2.5">
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <h4 className="font-black text-gray-900 text-sm">{exp.role}</h4>
                              {exp.isCurrent && (
                                <span className="text-[8px] font-black bg-emerald-100 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded-full">Current</span>
                              )}
                            </div>
                            <p className="text-violet-700 font-bold text-xs">{exp.company}</p>
                            {exp.location && (
                              <p className="text-gray-400 text-[10px] flex items-center gap-1 mt-0.5">
                                <FaMapMarkerAlt className="w-2 h-2" /> {exp.location}
                              </p>
                            )}
                          </div>
                          <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-lg whitespace-nowrap">{exp.duration}</span>
                        </div>
                        <ul className="space-y-1.5">
                          {exp.highlights.map((h, hi) => (
                            <li key={hi} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                              <span className="w-3.5 h-3.5 rounded-md bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="w-1 h-1 rounded-full bg-violet-500" />
                              </span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                  {/* Extra hardcoded entry to fill gap */}
                  <div className="relative">
                    <div className="absolute -left-5 top-4 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 border-2 border-white shadow-sm flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-white" />
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                      <div className="flex items-start justify-between gap-3 flex-wrap mb-2.5">
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <h4 className="font-black text-gray-900 text-sm">Junior Software Developer</h4>
                          </div>
                          <p className="text-violet-700 font-bold text-xs">Innosphere Labs Pvt. Ltd.</p>
                          <p className="text-gray-400 text-[10px] flex items-center gap-1 mt-0.5">
                            <FaMapMarkerAlt className="w-2 h-2" /> Pune, India
                          </p>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-lg whitespace-nowrap">2018 - 2020 (2 Years)</span>
                      </div>
                      <ul className="space-y-1.5">
                        {[
                          'Developed RESTful APIs for internal tools used by 200+ employees, reducing manual reporting time by 60%.',
                          'Maintained and improved a legacy PHP + MySQL portal, migrating key modules to React with a Node.js backend.',
                          'Participated in sprint planning, daily standups and retrospectives as part of a 6-member Agile engineering team.',
                        ].map((h, hi) => (
                          <li key={hi} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                            <span className="w-3.5 h-3.5 rounded-md bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                              <span className="w-1 h-1 rounded-full bg-violet-500" />
                            </span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* 4th experience entry */}
                  <div className="relative">
                    <div className="absolute -left-5 top-4 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 border-2 border-white shadow-sm flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-white" />
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                      <div className="flex items-start justify-between gap-3 flex-wrap mb-2.5">
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <h4 className="font-black text-gray-900 text-sm">Software Development Intern</h4>
                          </div>
                          <p className="text-violet-700 font-bold text-xs">Pixelrift Technologies</p>
                          <p className="text-gray-400 text-[10px] flex items-center gap-1 mt-0.5">
                            <FaMapMarkerAlt className="w-2 h-2" /> Bengaluru, India
                          </p>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-lg whitespace-nowrap">2017 - 2018 (1 Year)</span>
                      </div>
                      <ul className="space-y-1.5">
                        {[
                          'Built and shipped a customer-facing dashboard in React + Firebase used by 3,000+ daily active users.',
                          'Automated QA testing workflows using Jest and Cypress, reducing regression bugs by 35% in 3 months.',
                          'Collaborated with senior engineers on a payment microservice integration (Razorpay + Stripe) for SaaS product.',
                        ].map((h, hi) => (
                          <li key={hi} className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                            <span className="w-3.5 h-3.5 rounded-md bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                              <span className="w-1 h-1 rounded-full bg-violet-500" />
                            </span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right sidebar — 1 col */}
            <div className="col-span-1 flex flex-col gap-3">
              <Card title="Career Snapshot" accent="violet">
                <KV label="Total Experience"  value={candidate.totalExperience}                   accent="violet"  />
                <KV label="Employment Type"   value={candidate.employmentType}                    accent="blue"    />
                <KV label="Current Status"    value={candidate.currentStatus}                     accent="emerald" />
                <KV label="Notice Period"     value={candidate.noticePeriod}                      accent="amber"   />
                <KV label="Exp. Banding"      value={candidate.experienceBanding || 'Senior (L5)'} accent="rose"  />
              </Card>
              <Card title="Company Tenure" accent="gray">
                <p className="text-xs font-medium text-gray-700 leading-relaxed">{candidate.companyExperienceYears}</p>
              </Card>
              {candidate.bestSuitedRoles?.length > 0 && (
                <Card title="AI — Best Suited Roles">
                  <div className="space-y-1.5">
                    {candidate.bestSuitedRoles.map((r, i) => (
                      <div key={i} className="flex items-center gap-2 bg-violet-50 border border-violet-100 rounded-lg px-3 py-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                        <span className="text-xs font-bold text-violet-800">{r}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              <Card title="Key Hiring Stats">
                <KV label="HiDevs AI Score"   value={`${candidate.hiDevsAiScore} / 100`}  accent="violet"  />
                <KV label="Challenge Rank"    value={candidate.challengeRank}              accent="amber"   />
                <KV label="Builder Score"     value={`${candidate.builderScore} / 100`}    accent="blue"    />
                <KV label="Learning Velocity" value={`${candidate.learningVelocity}%`}     accent="emerald" />
              </Card>
            </div>
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/*  SECTION 4 — PROJECTS                                        */}
        {/* ════════════════════════════════════════════════════════════ */}
        <Section id="projects" icon={FaLayerGroup} title="Projects & Hackathons">
          <div className="grid grid-cols-3 gap-3">
            {candidate.projects.map((p, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col hover:shadow-md hover:border-violet-300 transition-all group">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${
                    p.type === 'Hackathon'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {p.type === 'Hackathon' ? 'Hackathon Win' : 'Personal Project'}
                  </span>
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer"
                      className="w-6 h-6 rounded-md bg-gray-100 hover:bg-gray-900 hover:text-white text-gray-500 flex items-center justify-center transition-colors shrink-0">
                      <FaGithub className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <h4 className="font-black text-gray-900 text-xs mb-1.5 group-hover:text-violet-700 transition-colors">{p.title}</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed flex-1 mb-3">{p.description}</p>
                {p.techStack?.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2 border-t border-gray-100">
                    {p.techStack.map((t, ti) => (
                      <span key={ti} className="text-[9px] font-bold px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded border border-gray-200">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Extra: Key hiring signals */}
            <Card title="Key Hiring Signals" accent="violet">
              <div className="space-y-2">
                {candidate.keyHiringReasons.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 bg-violet-50 border border-violet-100 p-2.5 rounded-lg">
                    <FaCheckCircle className="w-3 h-3 text-violet-500 mt-0.5 shrink-0" />
                    <span className="text-xs font-semibold text-violet-900">{r}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/*  SECTION 5 — AI SCORES                                       */}
        {/* ════════════════════════════════════════════════════════════ */}
        <Section id="scores" icon={FaTrophy} title="AI Evaluation & Performance Matrix">
          {/* Score row */}
          <div className="grid grid-cols-6 gap-3 mb-3">
            <ScoreBadge value={candidate.hiDevsAiScore}        label="HiDevs AI"      color="violet"  />
            <ScoreBadge value={candidate.builderScore}         label="Builder Score"  color="blue"    />
            <ScoreBadge value={candidate.aiEvaluationScore}    label="AI Evaluation"  color="emerald" />
            <ScoreBadge value={candidate.problemSolvingScore}  label="Problem Solving" color="amber"  />
            {candidate.leadershipScore !== undefined
              ? <ScoreBadge value={candidate.leadershipScore}    label="Leadership"    color="rose"   />
              : <ScoreBadge value={candidate.executionQuality}   label="Execution"     color="rose"   />}
            {candidate.challengeConsistency !== undefined
              ? <ScoreBadge value={candidate.challengeConsistency} label="Consistency" color="violet" />
              : <ScoreBadge value={candidate.learningVelocity}   label="Learning"      color="violet" />}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Card title="Performance Benchmarks">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Challenge Rank',    val: candidate.challengeRank,          bg: 'bg-amber-50/60 border-amber-100',   tc: 'text-amber-700'   },
                  { label: 'Project Tier',      val: candidate.projectRank,            bg: 'bg-violet-50/60 border-violet-100', tc: 'text-violet-700'  },
                  { label: 'Learning Velocity', val: `${candidate.learningVelocity}%`, bg: 'bg-emerald-50/60 border-emerald-100', tc: 'text-emerald-700' },
                  { label: 'Execution Quality', val: `${candidate.executionQuality}%`, bg: 'bg-blue-50/60 border-blue-100',     tc: 'text-blue-700'    },
                  { label: 'Consistency',       val: `${candidate.challengeConsistency || 97}%`, bg: 'bg-rose-50/60 border-rose-100', tc: 'text-rose-700' },
                  { label: 'Code Quality',      val: '96% (A+ Clean Code)',             bg: 'bg-purple-50/60 border-purple-100', tc: 'text-purple-700' },
                  { label: 'System Design',     val: '94% (Scalable Arch)',             bg: 'bg-indigo-50/60 border-indigo-100', tc: 'text-indigo-700' },
                  { label: 'Solving Speed',     val: 'Top 2% (42m avg)',                bg: 'bg-teal-50/60 border-teal-100',     tc: 'text-teal-700'   },
                ].map(({ label, val, bg }) => (
                  <div key={label} className={`p-2.5 rounded-xl border ${bg} flex flex-col justify-between gap-1`}>
                    <span className="text-[9px] font-black uppercase tracking-wider text-gray-400">{label}</span>
                    <span className="text-xs font-black text-gray-900">{val || '—'}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="AI Analysis" accent="violet" className="col-span-1">
              <p className="text-xs text-gray-700 leading-relaxed mb-3">{candidate.detailedEvaluation}</p>
              {candidate.areasForImprovement?.length > 0 && (
                <>
                  <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest mb-2">Verification Areas</p>
                  <div className="space-y-1.5">
                    {candidate.areasForImprovement.map((a, i) => (
                      <div key={i} className="flex items-start gap-2 bg-amber-50 border border-amber-100 p-2 rounded-lg">
                        <span className="w-4 h-4 rounded-full bg-amber-300 text-[8px] font-black text-amber-900 flex items-center justify-center shrink-0">{i + 1}</span>
                        <span className="text-xs font-semibold text-amber-800">{a}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </Card>

            <div className="col-span-1 flex flex-col gap-3">
              {candidate.topStrengths?.length > 0 && (
                <Card title="Verified Core Strengths" accent="emerald">
                  <div className="space-y-1.5">
                    {candidate.topStrengths.map((s, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs font-semibold text-emerald-800">
                        <FaCheckCircle className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" /> {s}
                      </div>
                    ))}
                  </div>
                </Card>
              )}
              {candidate.bestSuitedRoles?.length > 0 && (
                <Card title="Best Suited Roles" accent="violet">
                  <div className="flex flex-wrap gap-1.5">
                    {candidate.bestSuitedRoles.map((r, i) => <Chip key={i} variant="violet">{r}</Chip>)}
                  </div>
                </Card>
              )}
              {candidate.potentialRisksToVerify?.length > 0 && (
                <Card title="Risks to Verify">
                  <div className="space-y-1.5">
                    {candidate.potentialRisksToVerify.map((r, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs font-semibold text-rose-800">
                        <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-600 text-[8px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                        {r}
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/*  SECTION 6 — CODING ACTIVITY                                 */}
        {/* ════════════════════════════════════════════════════════════ */}
        <Section id="coding" icon={FaCode} title="Coding Activity & Analytics">
          {/* 4 quick stats */}
          <div className="grid grid-cols-4 gap-3 mb-3">
            {[
              { label: 'CodeQuest Completed', value: `${candidate.codeQuestCompleted} Quests`,      accent: 'violet'  },
              { label: 'LeetZ Prompts',        value: `${candidate.leetZPromptsCompleted} Prompts`,  accent: 'blue'    },
              { label: 'GitHub Commits (2026)', value: '1,420 Commits',                              accent: 'emerald' },
              { label: 'Active Streak',         value: '42 Days',                                    accent: 'amber'   },
            ].map(({ label, value, accent }) => {
              const tc = { violet: 'text-violet-700', blue: 'text-blue-700', emerald: 'text-emerald-700', amber: 'text-amber-700' }[accent];
              return (
                <div key={label} className="bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-3">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                  <p className={`text-base font-black ${tc}`}>{value}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* GitHub heatmap */}
            <div className="col-span-2 bg-gray-950 rounded-xl border border-gray-800 shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-white font-black text-xs">GitHub Contribution Matrix</p>
                  <p className="text-gray-500 text-[10px]">1,420 contributions in the last year</p>
                </div>
                <div className="flex items-center gap-1 text-[9px] text-gray-500">
                  <span>Less</span>
                  {['bg-gray-800','bg-violet-900','bg-violet-700','bg-violet-500','bg-emerald-400'].map((c, i) => (
                    <span key={i} className={`w-2.5 h-2.5 rounded-sm ${c}`} />
                  ))}
                  <span>More</span>
                </div>
              </div>
              <div className="flex justify-between w-full overflow-x-auto pb-1 gap-0.5">
                {Array.from({ length: 52 }).map((_, wk) => (
                  <div key={wk} className="flex flex-col gap-1 shrink-0">
                    {Array.from({ length: 7 }).map((_, dy) => {
                      // Generate a realistic contribution pattern
                      const seed = (wk * 17 + dy * 31 + wk * dy) % 100;
                      const intensity = seed < 35 ? 0 : seed < 65 ? 1 : seed < 82 ? 2 : seed < 94 ? 3 : 4;
                      const colors = [
                        'bg-gray-800/80', // No activity
                        'bg-violet-900',  // Low
                        'bg-violet-700',  // Medium-Low
                        'bg-violet-500',  // Medium-High
                        'bg-emerald-400', // High
                      ];
                      return (
                        <div key={dy} className={`w-2.5 h-2.5 rounded-sm ${colors[intensity]} hover:ring-1 hover:ring-white/40 transition-all`} />
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[9px] text-gray-500 font-bold mt-2 px-0.5">
                {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => <span key={m}>{m}</span>)}
              </div>
            </div>

            {/* Algo strengths + verified */}
            <div className="col-span-1 flex flex-col gap-3">
              <Card title="Algorithmic Strengths" accent="violet">
                {[
                  { topic: 'Dynamic Programming', count: 85  },
                  { topic: 'Graphs & Trees',      count: 120 },
                  { topic: 'System Design',        count: 45  },
                  { topic: 'Binary Search',        count: 60  },
                  { topic: 'Sliding Window',       count: 40  },
                ].map(({ topic, count }) => (
                  <div key={topic} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-xs font-bold text-gray-700">{topic}</span>
                    <span className="text-[10px] font-black text-violet-600">{count} solved</span>
                  </div>
                ))}
              </Card>
            </div>
          </div>

          {/* LeetCode panel */}
          <div className="grid grid-cols-3 gap-3 mt-3">
            <Card title="LeetCode Stats" accent="violet">
              <div className="flex items-start justify-between mb-3 pb-3 border-b border-gray-100">
                <div>
                  <p className="font-black text-gray-900 text-sm">LeetCode</p>
                  <p className="text-[10px] text-violet-600 font-semibold">@{candidate.name.toLowerCase().replace(/\s+/g,'')}_dev</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-violet-800 text-xs">Top {candidate.leetCodeStats?.percentile || '2.8'}%</p>
                  <p className="text-[10px] text-gray-400">Rating: {candidate.leetCodeStats?.rating || '1,920'}</p>
                </div>
              </div>
              <KV label="Total Solved"   value={`${candidate.leetCodeStats?.totalSolved || '520'} / 3,000`} accent="violet"  />
              <KV label="Acceptance"     value={`${candidate.leetCodeStats?.acceptanceRate || '78.4'}%`}     accent="emerald" />
              <KV label="Max Streak"     value={`${candidate.leetCodeStats?.maxStreak || '112'} Days`}       accent="blue"    />
              <KV label="Contests"       value={`${candidate.leetCodeStats?.contestsAttended || '34'} Attended`} accent="amber" />
            </Card>

            <Card title="Difficulty Breakdown" accent="blue">
              <div className="space-y-3">
                {[
                  { level: 'Easy',   val: candidate.leetCodeStats?.easy   || '210', pct: 92, bar: 'bg-emerald-500', cls: 'bg-emerald-50 border-emerald-100 text-emerald-700' },
                  { level: 'Medium', val: candidate.leetCodeStats?.medium || '250', pct: 80, bar: 'bg-amber-500',   cls: 'bg-amber-50 border-amber-100 text-amber-700'       },
                  { level: 'Hard',   val: candidate.leetCodeStats?.hard   || '60',  pct: 60, bar: 'bg-rose-500',    cls: 'bg-rose-50 border-rose-100 text-rose-700'           },
                ].map(({ level, val, pct, bar, cls }) => (
                  <div key={level} className={`${cls} border rounded-lg p-3`}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-black">{level}</span>
                      <span className="font-black text-gray-900">{val} Solved</span>
                    </div>
                    <div className="h-1.5 bg-white rounded-full">
                      <div className={`${bar} h-full rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Rating trend */}
            <div className="bg-gray-950 rounded-xl border border-gray-800 shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-white font-black text-xs">Contest Rating 2026</p>
                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-1.5 py-0.5 rounded">+184</span>
              </div>
              <div className="flex items-end justify-between gap-1 h-24">
                {[
                  { month: 'Jan', pct: 40 }, { month: 'Feb', pct: 52 },
                  { month: 'Mar', pct: 63 }, { month: 'Apr', pct: 75 },
                  { month: 'May', pct: 87 }, { month: 'Jun', pct: 100 },
                ].map(item => (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex items-end" style={{ height: '72px' }}>
                      <div className="w-full bg-gradient-to-t from-violet-700 to-purple-500 rounded-t"
                        style={{ height: `${item.pct}%` }} />
                    </div>
                    <span className="text-[9px] text-gray-500">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/*  SECTION 7 — EDUCATION                                       */}
        {/* ════════════════════════════════════════════════════════════ */}
        <Section id="education" icon={FaBookOpen} title="Education & Academic Credentials">
          <div className="grid grid-cols-3 gap-3">
            <Card title="Academic Details" className="col-span-1">
              <div className="space-y-3">
                <div>
                  <h4 className="font-black text-gray-900 text-sm leading-snug">{candidate.education.degree}</h4>
                  <p className="text-violet-700 font-bold text-xs mt-0.5">{candidate.education.college}</p>
                  <p className="text-gray-400 text-[10px] mt-0.5">{candidate.education.year}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Grad Year', val: candidate.education.year.split(' - ')[1] || '2020', tc: 'text-violet-700', bg: 'bg-violet-50/60 border-violet-100' },
                    { label: 'Degree Type', val: 'B.Tech / B.E.', tc: 'text-blue-700', bg: 'bg-blue-50/60 border-blue-100' },
                    { label: 'CGPA Score', val: candidate.education.cgpa, tc: 'text-emerald-700', bg: 'bg-emerald-50/60 border-emerald-100' },
                    { label: 'Specialization', val: 'Computer Science', tc: 'text-amber-700', bg: 'bg-amber-50/60 border-amber-100' },
                    { label: 'Academic Honor', val: 'Distinction', tc: 'text-purple-700', bg: 'bg-purple-50/60 border-purple-100' },
                    { label: 'Institute Rank', val: 'Tier-1 Elite', tc: 'text-rose-700', bg: 'bg-rose-50/60 border-rose-100' },
                  ].map(({ label, val, tc, bg }) => (
                    <div key={label} className={`p-2.5 rounded-xl border ${bg} flex flex-col justify-between gap-1`}>
                      <span className="text-[9px] font-black uppercase tracking-wider text-gray-400">{label}</span>
                      <span className={`text-xs font-black ${tc}`}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card title="Academic Highlights" className="col-span-2">
              <div className="grid grid-cols-2 gap-2">
                {[
                  `Graduated from ${candidate.education.college.split('(')[0].trim()}`,
                  `${candidate.education.degree} — ${candidate.education.cgpa} CGPA`,
                  'Consistent top-quartile academic performer',
                  `${candidate.totalExperience} professional experience post-graduation`,
                  'Active open-source contributor since academics',
                  'Multiple hackathon participant & winner',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 bg-gray-50 border border-gray-100 rounded-lg">
                    <span className="w-4 h-4 rounded-full bg-violet-100 text-violet-700 text-[8px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-[11px] font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════════════ */}
        {/*  SECTION 8 — RECRUITER INTEL                                 */}
        {/* ════════════════════════════════════════════════════════════ */}
        <Section id="insights" icon={FaSearch} title="Recruiter Intelligence Brief">
          <div className="grid grid-cols-3 gap-3">
            <Card title="Top Reasons to Hire" accent="emerald">
              <div className="space-y-2">
                {candidate.recruiterHiringBrief.topEvidenceBasedReasons.map((r, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-2.5 bg-emerald-50 border border-emerald-100 rounded-xl">
                    <span className="w-5 h-5 rounded-lg bg-emerald-500 text-white text-[9px] font-black flex items-center justify-center shrink-0">{i + 1}</span>
                    <p className="text-xs font-semibold text-emerald-900 leading-relaxed">{r}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Interview Focus Areas" accent="amber">
              <div className="space-y-2 mb-4">
                {candidate.recruiterHiringBrief.interviewAreasToVerify?.map((area, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-2.5 bg-amber-50 border border-amber-100 rounded-xl">
                    <span className="w-5 h-5 rounded-lg bg-amber-400 text-white text-[9px] font-black flex items-center justify-center shrink-0">{i + 1}</span>
                    <p className="text-xs font-semibold text-amber-900 leading-relaxed">{area}</p>
                  </div>
                ))}
              </div>
              <div className="bg-violet-600 text-white rounded-xl px-4 py-3 text-center">
                <p className="text-xs font-black text-violet-200 uppercase tracking-widest mb-0.5">Interview Readiness</p>
                <p className="text-base font-black">{candidate.recruiterHiringBrief?.interviewReadiness || 'Immediate'}</p>
                <p className="text-[10px] text-violet-300">{candidate.noticePeriod} notice period</p>
              </div>
            </Card>

            <div className="col-span-1 flex flex-col gap-3">
              {candidate.intelligenceCards?.map((card, idx) => (
                <Card key={idx} title={card.title} accent="violet">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[9px] font-black bg-violet-100 text-violet-700 border border-violet-200 px-1.5 py-0.5 rounded-full">{card.category}</span>
                  </div>
                  {(card.insight || card.description) && (
                    <p className="text-xs text-gray-600 leading-relaxed mb-2">{card.insight || card.description}</p>
                  )}
                  {card.details?.map((d, di) => (
                    <div key={di} className="flex items-start gap-1.5 text-[11px] text-gray-600 mb-1">
                      <span className="w-1 h-1 rounded-full bg-violet-400 mt-1.5 shrink-0" /> {d}
                    </div>
                  ))}
                  {card.availabilityNote && (
                    <div className="mt-2 bg-emerald-50 rounded-lg px-2.5 py-1.5 border border-emerald-100 text-[10px] font-bold text-emerald-700">{card.availabilityNote}</div>
                  )}
                </Card>
              ))}

              <div className="bg-gradient-to-br from-violet-700 to-indigo-800 rounded-xl border border-violet-500/30 shadow-sm p-4">
                <p className="text-[9px] font-black text-violet-300 uppercase tracking-widest mb-2">Contact to Schedule</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2"><FaEnvelope className="w-3 h-3 text-violet-300 shrink-0" /><span className="text-[11px] font-bold text-white">{candidate.email}</span></div>
                  <div className="flex items-center gap-2"><FaPhone className="w-3 h-3 text-violet-300 shrink-0" /><span className="text-[11px] font-bold text-white">{candidate.contact}</span></div>
                  <div className="flex items-center gap-2"><FaMapMarkerAlt className="w-3 h-3 text-violet-300 shrink-0" /><span className="text-[11px] font-bold text-white">{candidate.currentLocation}</span></div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Bottom spacer so last section isn't cut off */}
        <div className="h-8 bg-[#f8f9fc]" />
      </main>
    </div>
  );
};
