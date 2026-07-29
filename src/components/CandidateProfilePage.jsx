'use client';

import React, { useState } from 'react';
import {
  FaGithub, FaLinkedin, FaFileDownload, FaArrowLeft, FaExternalLinkAlt,
  FaBriefcase, FaGraduationCap, FaCodeBranch, FaLaptopCode, FaChartBar,
  FaEnvelope, FaHeart, FaAward, FaExclamationTriangle, FaUserCheck, FaLightbulb, FaFileAlt, FaCheckCircle,
  FaMapMarkerAlt, FaBuilding, FaClock, FaBookmark, FaRegBookmark, FaStar, FaRegStar, FaTimes
} from 'react-icons/fa';
import SpecularButton from './SpecularButton';

/* ─── UI UX Pro Max Enterprise Component System ───────────────────── */

/* TokenCard: Scannable card container with clear header and distinct borders */
const TokenCard = ({ title, icon: Icon, action, children, className = '' }) => (
  <section className={`bg-white rounded-2xl border border-[#e5e7eb] shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden ${className}`}>
    {title && (
      <div className="px-5 py-3.5 border-b border-[#e5e7eb] bg-[#f8fafc] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="w-7 h-7 rounded-lg bg-[#ddd6fe]/30 flex items-center justify-center shrink-0">
              <Icon className="w-3.5 h-3.5 text-[#7c3aed]" aria-hidden="true" />
            </div>
          )}
          <h2 className="text-[12px] font-extrabold uppercase tracking-wider text-[#111827]">{title}</h2>
        </div>
        {action}
      </div>
    )}
    <div className="p-5">{children}</div>
  </section>
);

/* MetricTile: High utility KPI metric block with strong visual hierarchy */
const MetricTile = ({ label, value, subtext, highlight = false, badge }) => (
  <div className={`p-4 rounded-2xl border transition-all duration-150 ${
    highlight
      ? 'bg-[#7c3aed] text-white border-[#ddd6fe] shadow-sm'
      : 'bg-white text-[#111827] border-[#e5e7eb] hover:border-[#ddd6fe] shadow-2xs'
  }`}>
    <div className="flex items-center justify-between gap-2 mb-1.5">
      <span className={`text-[10px] font-extrabold uppercase tracking-widest ${highlight ? 'text-[#ddd6fe]' : 'text-[#374151]'}`}>
        {label}
      </span>
      {badge && (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#059669] text-white">
          {badge}
        </span>
      )}
    </div>
    <p className="text-[20px] font-black tracking-tight leading-tight">{value}</p>
    {subtext && (
      <p className={`text-[11px] font-medium mt-1 truncate ${highlight ? 'text-[#e5e7eb]' : 'text-[#374151]'}`}>{subtext}</p>
    )}
  </div>
);

/* ScoreGauge: Circular score visualization gauge */
const ScoreGauge = ({ value, max = 100, label }) => {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-[#e5e7eb] bg-[#f8fafc] hover:border-[#ddd6fe] transition-all">
      <div className="relative w-14 h-14">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56" aria-hidden="true">
          <circle cx="28" cy="28" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="4" />
          <circle
            cx="28" cy="28" r={radius} fill="none" stroke="#7c3aed" strokeWidth="4"
            strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
            strokeLinecap="round" className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[12px] font-bold text-[#111827]">{value}</span>
        </div>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider mt-2 text-center text-[#374151]">{label}</span>
    </div>
  );
};

/* TokenChip: Semantic badge chip */
const TokenChip = ({ children, variant = 'default' }) => {
  const styles = {
    default:   'bg-[#f8fafc] text-[#374151] border-[#e5e7eb]',
    purple:    'bg-[#ddd6fe]/30 text-[#7c3aed] border-[#ddd6fe]',
    emerald:   'bg-[#059669]/10 text-[#059669] border-[#059669]/30',
    amber:     'bg-amber-50 text-amber-900 border-amber-200',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold border ${styles[variant] || styles.default}`}>
      {children}
    </span>
  );
};

/* ─── Main Candidate Profile Page Component ──────────────────────── */

export const CandidateProfilePage = ({ candidate, onBack, onToggleSave, onToggleShortlist }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!candidate) return null;

  const aiTier =
    candidate.hiDevsAiScore >= 95 ? { label: 'Elite Tier', cls: 'bg-[#ddd6fe] text-[#7c3aed] border-[#7c3aed]' } :
    candidate.hiDevsAiScore >= 85 ? { label: 'Senior Tier', cls: 'bg-[#ddd6fe]/50 text-[#7c3aed] border-[#ddd6fe]' } :
                                    { label: 'Mid Tier', cls: 'bg-[#f3f4f6] text-[#374151] border-[#e5e7eb]' };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] text-[#374151] font-sans antialiased selection:bg-[#ddd6fe] selection:text-[#7c3aed]">
      
      {/* ── MAIN LANDMARK CONTAINER ─────────────────────────────────── */}
      <main aria-label="Candidate Profile Information" className="max-w-7xl mx-auto p-4 md:p-6 space-y-5">

        {/* ── 1. TOP CONTROL & ACTION BAR ───────────────────────────── */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-4 md:p-5 shadow-xs flex items-center justify-between gap-4 flex-wrap">
          <SpecularButton
            size="sm"
            radius={12}
            tint="#ffffff"
            tintOpacity={1}
            textColor="#374151"
            lineColor="#7c3aed"
            baseColor="#e5e7eb"
            intensity={0.8}
            className="border border-[#e5e7eb]"
            onClick={onBack}
          >
            <FaArrowLeft className="w-3.5 h-3.5" aria-hidden="true" /> Back to Directory
          </SpecularButton>

          <div className="flex items-center gap-2.5">
            {/* Save Toggle Button */}
            <button
              onClick={() => onToggleSave(candidate.id)}
              className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-bold transition-all border cursor-pointer ${
                candidate.isSaved
                  ? 'bg-[#7c3aed] text-white border-[#7c3aed] shadow-xs hover:bg-[#6d28d9]'
                  : 'bg-white text-[#374151] border-[#e5e7eb] hover:border-[#7c3aed] hover:text-[#7c3aed]'
              }`}
              title={candidate.isSaved ? 'Click to remove candidate from saved list' : 'Click to save candidate'}
            >
              {candidate.isSaved ? (
                <>
                  <FaBookmark className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Saved</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 text-white rounded-full p-0.5 ml-0.5">
                    <FaTimes className="w-2.5 h-2.5" />
                  </span>
                </>
              ) : (
                <>
                  <FaRegBookmark className="w-3.5 h-3.5 text-[#7c3aed] shrink-0" />
                  <span>Save Candidate</span>
                </>
              )}
            </button>

            {/* Shortlist Toggle Button */}
            <button
              onClick={() => onToggleShortlist(candidate.id)}
              className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-bold transition-all border cursor-pointer ${
                candidate.isShortlisted
                  ? 'bg-[#059669] text-white border-[#059669] shadow-xs hover:bg-[#047857]'
                  : 'bg-white text-[#374151] border-[#e5e7eb] hover:border-[#059669] hover:text-[#059669]'
              }`}
              title={candidate.isShortlisted ? 'Click to remove candidate from shortlist' : 'Click to shortlist candidate'}
            >
              {candidate.isShortlisted ? (
                <>
                  <FaStar className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>Shortlisted</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 text-white rounded-full p-0.5 ml-0.5">
                    <FaTimes className="w-2.5 h-2.5" />
                  </span>
                </>
              ) : (
                <>
                  <FaRegStar className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                  <span>Shortlist Candidate</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── 2. PRIMARY PROFILE HERO CARD (Visual Priority Level 1) ──── */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 shadow-xs space-y-4">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <img
                  src={candidate.avatar}
                  alt={`Profile avatar of ${candidate.name}`}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-[#e5e7eb] shadow-xs"
                />
                {candidate.openToWork && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#059669] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                    Available
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-[28px] md:text-[32px] leading-[36px] font-black text-[#111827] tracking-tight">{candidate.name}</h1>
                  <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${aiTier.cls}`}>
                    {aiTier.label}
                  </span>
                </div>
                <p className="text-[15px] font-extrabold text-[#7c3aed]">{candidate.currentRole}</p>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="inline-flex items-center gap-1 text-[12px] font-bold text-[#374151]">
                    <FaMapMarkerAlt className="w-3.5 h-3.5 text-[#7c3aed]" /> {candidate.currentLocation}
                  </span>
                  <span className="text-[#e5e7eb]">•</span>
                  <span className="inline-flex items-center gap-1 text-[12px] font-bold text-[#7c3aed]">
                    <FaBriefcase className="w-3.5 h-3.5 text-[#7c3aed]" /> {candidate.experienceDetails?.totalExperience || candidate.totalExperience} Experience
                  </span>
                  <span className="text-[#e5e7eb]">•</span>
                  <span className="inline-flex items-center gap-1 text-[12px] font-bold text-[#059669]">
                    <FaCheckCircle className="w-3.5 h-3.5 text-[#059669]" /> {candidate.experienceDetails?.employmentType || candidate.employmentType}
                  </span>
                </div>
              </div>
            </div>

            {/* SpecularButton Links & Resume */}
            <div className="flex items-center gap-2">
              <SpecularButton
                size="sm"
                radius={12}
                tint="#ffffff"
                tintOpacity={1}
                textColor="#111827"
                lineColor="#7c3aed"
                baseColor="#e5e7eb"
                className="border border-[#e5e7eb]"
                onClick={() => window.open(candidate.github, '_blank')}
              >
                <FaGithub className="w-4 h-4 text-[#111827]" aria-hidden="true" /> GitHub <FaExternalLinkAlt className="w-2.5 h-2.5 text-slate-400" aria-hidden="true" />
              </SpecularButton>

              <SpecularButton
                size="sm"
                radius={12}
                tint="#ddd6fe"
                tintOpacity={0.2}
                textColor="#7c3aed"
                lineColor="#7c3aed"
                baseColor="#ddd6fe"
                className="border border-[#ddd6fe]"
                onClick={() => window.open(candidate.linkedin, '_blank')}
              >
                <FaLinkedin className="w-4 h-4 text-[#7c3aed]" aria-hidden="true" /> LinkedIn <FaExternalLinkAlt className="w-2.5 h-2.5 text-[#ddd6fe]" aria-hidden="true" />
              </SpecularButton>

              <SpecularButton
                size="sm"
                radius={12}
                tint="#059669"
                tintOpacity={1}
                textColor="#ffffff"
                lineColor="#059669"
                baseColor="#059669"
                className="border border-[#059669]"
                onClick={() => window.open(candidate.resumeUrl, '_blank')}
              >
                <FaFileDownload className="w-4 h-4 text-white" aria-hidden="true" /> Download Resume
              </SpecularButton>
            </div>
          </div>

          {/* Target Roles & Tech Stack Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-[#e5e7eb]">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#374151] block mb-1.5">Target Roles</span>
              <div className="flex flex-wrap gap-1.5">
                {(candidate.preferredRoles || [candidate.currentRole]).map((role, i) => (
                  <TokenChip key={i} variant="purple">{role}</TokenChip>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#374151] block mb-1.5">Preferred Tech Stack</span>
              <div className="flex flex-wrap gap-1.5">
                {(candidate.preferredTechStack || ['React', 'TypeScript', 'Node.js', 'PostgreSQL']).map((tech, i) => (
                  <TokenChip key={i} variant="emerald">{tech}</TokenChip>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. KEY HIGHLIGHT KPIS BAR (Visual Priority Level 2) ─────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricTile
            label="HiDevs AI Score"
            value={`${candidate.hiDevsAiScore} / 100`}
            subtext={`AI Eval Score: ${candidate.aiEvaluationScore || candidate.hiDevsAiScore}`}
            highlight={true}
          />
          <MetricTile
            label="Salary Information"
            value={candidate.expectedSalary}
            subtext={`Current: ${candidate.currentSalary} | Bonus: ${candidate.variableBonus || 'N/A'}`}
          />
          <MetricTile
            label="Interview Readiness"
            value={candidate.recruiterHiringBrief?.interviewReadiness || 'Immediate'}
            subtext={`Notice: ${candidate.noticePeriod} | Location: ${candidate.preferredLocation || candidate.currentLocation}`}
          />
          <MetricTile
            label="Challenge Rank"
            value={candidate.challengeRank}
            subtext={`Builder Score: ${candidate.builderScore}/100 | Tier: ${candidate.experienceBanding || 'Senior (L5)'}`}
          />
        </div>

        {/* ── 4. STRUCTURED TABBED CONTENT NAVIGATION ────────────────── */}
        <div className="border-b border-[#e5e7eb] flex items-center gap-2 overflow-x-auto pb-1 bg-white p-2 rounded-xl border shadow-2xs">
          {[
            { id: 'overview', label: 'Executive AI Brief', icon: FaFileAlt },
            { id: 'experience', label: 'Work & Projects', icon: FaBriefcase },
            { id: 'skills', label: 'Skills & Dev Activity', icon: FaLaptopCode },
            { id: 'intelligence', label: 'Recruiter Intelligence', icon: FaUserCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[12px] font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#7c3aed] text-white shadow-xs'
                    : 'text-[#374151] hover:bg-[#f8fafc] hover:text-[#7c3aed]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#7c3aed]'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ── 5. TAB PANELS CONTENT ───────────────────────────────────── */}
        <div className="grid grid-cols-12 gap-4">

          {/* TAB 1: EXECUTIVE AI BRIEF & OVERVIEW */}
          {activeTab === 'overview' && (
            <>
              <div className="col-span-12 lg:col-span-8 space-y-4">
                <TokenCard title="Executive Summary & Detailed AI Evaluation" icon={FaFileAlt}>
                  <p className="text-[13px] leading-[20px] font-bold text-[#111827] bg-[#f8fafc] border border-[#ddd6fe] p-4 rounded-xl mb-4">
                    {candidate.executiveSummary}
                  </p>
                  <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-[#374151] mb-2">Candidate Overview</h3>
                  <p className="text-[12px] leading-[18px] text-[#374151] mb-4">
                    {candidate.candidateBio}
                  </p>

                  {candidate.detailedEvaluation && (
                    <div className="mb-4 bg-[#f8fafc] p-4 rounded-xl border border-[#e5e7eb]">
                      <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-[#7c3aed] mb-1.5">Detailed AI Evaluation</h3>
                      <p className="text-[11px] leading-[16px] text-[#374151]">{candidate.detailedEvaluation}</p>
                    </div>
                  )}

                  {candidate.userSummary && (
                    <div className="pt-3 border-t border-[#e5e7eb]">
                      <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#7c3aed]">
                        <FaUserCheck className="w-3 h-3" /> Recruiter Briefing
                      </div>
                      <p className="text-[11px] text-[#374151] italic mt-1 bg-[#f8fafc] p-3 rounded-lg border border-[#e5e7eb]">
                        "{candidate.userSummary}"
                      </p>
                    </div>
                  )}
                </TokenCard>

                {/* Core Evidence-Based Strengths */}
                <TokenCard title="Top Evidence-Based Strengths" icon={FaAward}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {candidate.topStrengths?.map((strength, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-[12px] font-bold text-[#059669] bg-[#059669]/10 border border-[#059669]/20 p-3 rounded-xl">
                        <FaCheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#059669]" />
                        <span>{strength}</span>
                      </div>
                    ))}
                  </div>
                </TokenCard>
              </div>

              {/* Sidebar Matrix */}
              <div className="col-span-12 lg:col-span-4 space-y-4">
                <TokenCard title="AI Performance & Competency Matrix" icon={FaChartBar}>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <ScoreGauge value={candidate.hiDevsAiScore} label="HiDevs AI" />
                    <ScoreGauge value={candidate.builderScore} label="Builder Score" />
                    <ScoreGauge value={candidate.aiEvaluationScore} label="AI Evaluation" />
                    <ScoreGauge value={candidate.problemSolvingScore} label="Problem Solving" />
                  </div>

                  <div className="space-y-2 pt-3 border-t border-[#e5e7eb]">
                    <div className="flex justify-between text-[11px] py-1 border-b border-[#e5e7eb]">
                      <span className="text-[#374151]">Leadership Score</span>
                      <span className="font-bold text-[#111827]">{candidate.leadershipScore || 85}%</span>
                    </div>
                    <div className="flex justify-between text-[11px] py-1 border-b border-[#e5e7eb]">
                      <span className="text-[#374151]">Learning Velocity</span>
                      <span className="font-bold text-[#059669]">{candidate.learningVelocity || 92}%</span>
                    </div>
                    <div className="flex justify-between text-[11px] py-1 border-b border-[#e5e7eb]">
                      <span className="text-[#374151]">Execution Quality</span>
                      <span className="font-bold text-[#7c3aed]">{candidate.executionQuality || 90}%</span>
                    </div>
                    <div className="flex justify-between text-[11px] py-1">
                      <span className="text-[#374151]">Challenge Consistency</span>
                      <span className="font-bold text-[#111827]">{candidate.challengeConsistency || 94}%</span>
                    </div>
                  </div>
                </TokenCard>

                <TokenCard title="Contact Information" icon={FaEnvelope}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[12px] py-1 border-b border-[#e5e7eb]">
                      <span className="text-[#374151] font-medium">Email</span>
                      <span className="font-bold text-[#111827]">{candidate.email}</span>
                    </div>
                    <div className="flex items-center justify-between text-[12px] py-1 border-b border-[#e5e7eb]">
                      <span className="text-[#374151] font-medium">Phone</span>
                      <span className="font-bold text-[#111827]">{candidate.contact}</span>
                    </div>
                    <div className="flex items-center justify-between text-[12px] py-1 border-b border-[#e5e7eb]">
                      <span className="text-[#374151] font-medium">Location</span>
                      <span className="font-bold text-[#111827]">{candidate.currentLocation}</span>
                    </div>
                    <div className="flex items-center justify-between text-[12px] py-1">
                      <span className="text-[#374151] font-medium">Relocation</span>
                      <span className="font-bold text-[#111827]">{candidate.preferredLocation || 'Open'}</span>
                    </div>
                  </div>
                </TokenCard>
              </div>
            </>
          )}

          {/* TAB 2: WORK EXPERIENCE & PROJECTS */}
          {activeTab === 'experience' && (
            <div className="col-span-12 space-y-4">
              {/* Experience Summary Breakdown Card */}
              <TokenCard title="Experience Summary & Breakdown" icon={FaBriefcase}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#e5e7eb]">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#374151] block mb-1">Total Career Experience</span>
                    <span className="text-[16px] font-black text-[#111827] flex items-center gap-1.5">
                      <FaBriefcase className="w-4 h-4 text-[#7c3aed]" /> {candidate.experienceDetails?.totalExperience || candidate.totalExperience}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#e5e7eb]">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#374151] block mb-1">Company Distribution</span>
                    <span className="text-[13px] font-bold text-[#7c3aed] flex items-center gap-1.5">
                      <FaBuilding className="w-4 h-4 text-[#7c3aed] shrink-0" /> {candidate.experienceDetails?.companyExperienceYears || candidate.companyExperienceYears || candidate.totalExperience}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#e5e7eb]">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#374151] block mb-1">Current Notice & Employment</span>
                    <span className="text-[13px] font-bold text-[#059669] flex items-center gap-1.5">
                      <FaClock className="w-4 h-4 text-[#059669] shrink-0" /> {candidate.noticePeriod} Notice ({candidate.experienceDetails?.employmentType || candidate.employmentType})
                    </span>
                  </div>
                </div>
              </TokenCard>

              <TokenCard title={`Work Experience Timeline (${candidate.experienceDetails?.totalExperience || candidate.totalExperience})`} icon={FaBriefcase}>
                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#e5e7eb]">
                  {candidate.workExperienceTimeline?.map((exp, idx) => (
                    <div key={idx} className="relative">
                      <div className={`absolute -left-6 top-1.5 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
                        exp.isCurrent ? 'bg-[#7c3aed]' : 'bg-[#374151]'
                      }`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>

                      <div className="p-4 rounded-xl border border-[#e5e7eb] bg-[#f8fafc]">
                        <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-[#111827] text-[14px]">{exp.role}</h3>
                              {exp.isCurrent && (
                                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#059669] text-white">
                                  Current Role
                                </span>
                              )}
                            </div>
                            <p className="text-[12px] font-bold text-[#7c3aed] mt-0.5">{exp.company}</p>
                          </div>
                          <span className="text-[11px] font-bold text-[#374151] bg-white px-3 py-1 rounded-lg border border-[#e5e7eb]">
                            {exp.duration}
                          </span>
                        </div>

                        <ul className="space-y-2 mt-3 pt-3 border-t border-[#e5e7eb]">
                          {exp.highlights?.map((highlight, hi) => (
                            <li key={hi} className="flex items-start gap-2 text-[12px] leading-[16px] text-[#374151]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] mt-1 shrink-0" aria-hidden="true" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </TokenCard>

              {/* Personal Projects */}
              <TokenCard title="Featured Personal Projects & Hackathons" icon={FaLaptopCode}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {candidate.projects?.map((project, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-[#e5e7eb] bg-[#f8fafc] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                            project.type === 'Hackathon'
                              ? 'bg-amber-50 text-amber-900 border-amber-200'
                              : 'bg-[#ddd6fe]/30 text-[#7c3aed] border-[#ddd6fe]'
                          }`}>
                            {project.type === 'Hackathon' ? 'Hackathon Win' : 'Personal Project'}
                          </span>
                          {project.github && (
                            <a
                              href={project.github} target="_blank" rel="noopener noreferrer"
                              aria-label={`View GitHub repository for ${project.title}`}
                              className="text-[#374151] hover:text-[#7c3aed] cursor-pointer"
                            >
                              <FaGithub className="w-4 h-4" aria-hidden="true" />
                            </a>
                          )}
                        </div>
                        <h3 className="font-bold text-[#111827] text-[14px] mb-1">{project.title}</h3>
                        <p className="text-[12px] leading-[16px] text-[#374151] mb-3">{project.description}</p>
                      </div>
                      {project.techStack?.length > 0 && (
                        <div className="pt-3 border-t border-[#e5e7eb] flex flex-wrap gap-1">
                          {project.techStack.map((tech, ti) => (
                            <span key={ti} className="text-[10px] font-bold px-2 py-0.5 bg-white text-[#374151] rounded border border-[#e5e7eb]">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TokenCard>

              {candidate.education && (
                <TokenCard title="Education & Academic Credentials" icon={FaGraduationCap}>
                  <div className="bg-[#f8fafc] p-4 rounded-xl border border-[#e5e7eb] flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h3 className="text-[14px] font-bold text-[#111827]">{candidate.education.degree}</h3>
                      <p className="text-[12px] font-bold text-[#7c3aed] mt-0.5">{candidate.education.college}</p>
                      <p className="text-[11px] text-[#374151] mt-1">Graduation Period: {candidate.education.year}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#374151] block">Academic Grade</span>
                      <span className="text-[18px] font-black text-[#059669]">{candidate.education.cgpa} CGPA</span>
                    </div>
                  </div>
                </TokenCard>
              )}
            </div>
          )}

          {/* TAB 3: SKILLS & DEV ACTIVITY */}
          {activeTab === 'skills' && (
            <div className="col-span-12 space-y-4">
              <TokenCard title="Developer Activity & GitHub Commits" icon={FaCodeBranch}>
                <div className="bg-[#111827] text-white p-4 rounded-xl space-y-3 mb-4">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#ddd6fe]">2026 Commit Activity (1,420 Commits)</span>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                      <span>Less</span>
                      <div className="w-2.5 h-2.5 rounded-xs bg-[#374151]" />
                      <div className="w-2.5 h-2.5 rounded-xs bg-[#7c3aed]/50" />
                      <div className="w-2.5 h-2.5 rounded-xs bg-[#7c3aed]" />
                      <div className="w-2.5 h-2.5 rounded-xs bg-[#059669]" />
                      <span>More</span>
                    </div>
                  </div>

                  <div className="flex justify-between w-full overflow-x-auto pb-1 gap-1">
                    {Array.from({ length: 52 }).map((_, wk) => (
                      <div key={wk} className="flex flex-col gap-1 shrink-0">
                        {Array.from({ length: 7 }).map((_, dy) => {
                          const seed = (wk * 19 + dy * 29 + wk * dy) % 100;
                          const intensity = seed < 35 ? 0 : seed < 65 ? 1 : seed < 85 ? 2 : 3;
                          const colors = [
                            'bg-[#374151]/60',
                            'bg-[#7c3aed]/40',
                            'bg-[#7c3aed]',
                            'bg-[#059669]',
                          ];
                          return <div key={dy} className={`w-2.5 h-2.5 rounded-xs ${colors[intensity]}`} />;
                        })}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-400 font-bold pt-1 border-t border-[#374151]/50">
                    {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-[#f8fafc] border border-[#e5e7eb] rounded-xl text-center">
                    <span className="text-[10px] font-bold text-[#374151] uppercase tracking-wider block">CodeQuest</span>
                    <span className="text-[14px] font-bold text-[#111827]">{candidate.codeQuestCompleted || 42} Quests</span>
                  </div>
                  <div className="p-3 bg-[#f8fafc] border border-[#e5e7eb] rounded-xl text-center">
                    <span className="text-[10px] font-bold text-[#374151] uppercase tracking-wider block">LeetZ Prompts</span>
                    <span className="text-[14px] font-bold text-[#111827]">{candidate.leetZPromptsCompleted || 128} Prompts</span>
                  </div>
                  <div className="p-3 bg-[#f8fafc] border border-[#e5e7eb] rounded-xl text-center">
                    <span className="text-[10px] font-bold text-[#374151] uppercase tracking-wider block">LeetCode Solved</span>
                    <span className="text-[14px] font-bold text-[#111827]">{candidate.leetCodeStats?.totalSolved || '520'} Problems</span>
                  </div>
                  <div className="p-3 bg-[#f8fafc] border border-[#e5e7eb] rounded-xl text-center">
                    <span className="text-[10px] font-bold text-[#374151] uppercase tracking-wider block">Acceptance Rate</span>
                    <span className="text-[14px] font-bold text-[#059669]">{candidate.leetCodeStats?.acceptanceRate || '78.4'}%</span>
                  </div>
                </div>
              </TokenCard>

              <TokenCard title="Skills & Tech Stack Mastery" icon={FaLaptopCode}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-[#374151] mb-2">Core Primary Skills</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {candidate.primaryTechSkills?.map((skill, i) => (
                        <TokenChip key={i} variant="purple">{skill}</TokenChip>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-[#374151] mb-2">Additional Secondary Skills</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {candidate.additionalTechSkills?.map((skill, i) => (
                        <TokenChip key={i} variant="default">{skill}</TokenChip>
                      ))}
                    </div>
                  </div>
                </div>
              </TokenCard>
            </div>
          )}

          {/* TAB 4: RECRUITER INTELLIGENCE */}
          {activeTab === 'intelligence' && (
            <div className="col-span-12 space-y-4">
              <TokenCard title="Recruiter Intelligence Brief" icon={FaUserCheck}>
                <div className="space-y-3 mb-4">
                  <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-[#374151]">Interview Verification Areas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {candidate.recruiterHiringBrief?.interviewAreasToVerify?.map((area, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200">
                        <span className="w-5 h-5 rounded-md bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <p className="text-[11px] font-bold text-amber-900 leading-snug">{area}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {candidate.bestSuitedRoles?.length > 0 && (
                  <div className="pt-3 border-t border-[#e5e7eb]">
                    <h3 className="text-[10px] font-extrabold uppercase tracking-wider text-[#374151] mb-2">Best Suited Roles</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {candidate.bestSuitedRoles.map((role, i) => (
                        <TokenChip key={i} variant="purple">{role}</TokenChip>
                      ))}
                    </div>
                  </div>
                )}
              </TokenCard>

              {candidate.intelligenceCards?.length > 0 && (
                <TokenCard title="Recruiter Intelligence Cards" icon={FaLightbulb}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {candidate.intelligenceCards.map((card, idx) => (
                      <div key={idx} className="p-4 bg-[#f8fafc] rounded-xl border border-[#e5e7eb] hover:border-[#ddd6fe] transition">
                        <span className="text-[10px] font-bold text-[#7c3aed] uppercase tracking-wider block mb-1">{card.category || 'Insight'}</span>
                        <h4 className="text-[13px] font-bold text-[#111827]">{card.title}</h4>
                        <p className="text-[11px] text-[#374151] mt-1.5 leading-relaxed">{card.insight || card.description}</p>
                      </div>
                    ))}
                  </div>
                </TokenCard>
              )}
            </div>
          )}

        </div>

      </main>
    </div>
  );
};
