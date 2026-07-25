'use client';

import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaFileDownload } from 'react-icons/fa';

export const CandidateModal = ({
  candidate,
  onClose,
  onToggleSave,
  onToggleShortlist,
}) => {
  const [activeTab, setActiveTab] = useState('header');

  useEffect(() => {
    if (candidate) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [candidate]);

  if (!candidate) return null;

  const modalSections = [
    { id: 'header', label: 'Candidate Header' },
    { id: 'contact', label: 'Contact Information' },
    { id: 'summary', label: 'Professional Summary' },
    { id: 'skills', label: 'Technical Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects & Hackathons' },
    { id: 'matrix', label: 'Performance Matrix' },
    { id: 'ai-report', label: 'AI Evaluation Report' },
    { id: 'coding', label: 'Coding Activity' },
    { id: 'insights', label: 'Recruiter Insights' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md">
      {/* Dialog Container */}
      <div className="bg-white rounded-3xl border border-violet-200 shadow-2xl w-full max-w-5xl h-[88vh] flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Navigation Sidebar */}
        <aside className="w-full md:w-72 bg-slate-50/70 border-r border-violet-100 flex flex-col shrink-0 h-full overflow-hidden">
          {/* Header Card Widget */}
          <div className="p-5 border-b border-violet-100 bg-gradient-to-br from-violet-900 via-indigo-900 to-purple-950 text-white relative shrink-0">
            <button
              onClick={onClose}
              className="absolute top-3.5 right-3.5 text-xs font-bold px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              Close
            </button>

            <div className="flex items-center gap-3">
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="w-14 h-14 rounded-xl object-cover border-2 border-white/20 shadow-md"
              />
              <div>
                <h2 className="text-base font-extrabold font-heading text-white">{candidate.name}</h2>
                <p className="text-violet-200 text-[11px] font-medium leading-tight">{candidate.currentRole}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-white/20 text-[9px] font-bold text-white">
                  {candidate.currentStatus}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
              <button
                onClick={() => onToggleSave(candidate.id)}
                className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all ${
                  candidate.isSaved ? 'bg-white text-violet-950 shadow-sm' : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {candidate.isSaved ? 'Saved' : 'Save'}
              </button>
              <button
                onClick={() => onToggleShortlist(candidate.id)}
                className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all ${
                  candidate.isShortlisted ? 'bg-emerald-500 text-white shadow-sm' : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {candidate.isShortlisted ? 'Shortlisted' : 'Shortlist'}
              </button>
            </div>
          </div>

          {/* Section Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 mb-1 block">
              Dossier Sections
            </span>
            {modalSections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveTab(sec.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === sec.id
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-violet-50 hover:text-violet-900'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 flex flex-col h-full min-h-0 overflow-hidden bg-white">
          {/* Header */}
          <header className="px-6 py-3.5 border-b border-violet-100 flex items-center justify-between shrink-0 bg-white">
            <div>
              <h3 className="text-sm font-extrabold text-gray-900 font-heading">
                {modalSections.find((s) => s.id === activeTab)?.label}
              </h3>
              <p className="text-[11px] text-gray-500">{candidate.roleCategory} • {candidate.currentLocation}</p>
            </div>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl bg-violet-600 text-white text-xs font-bold hover:bg-violet-700 transition-colors shadow-sm"
            >
              Close Dialog
            </button>
          </header>

          {/* Body Window */}
          <div className="flex-1 overflow-y-auto min-h-0 p-6 space-y-5">
            
            {/* SECTION 1: CANDIDATE HEADER */}
            {activeTab === 'header' && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b pb-1.5">Candidate Header Specs</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-violet-50/60 border border-violet-100">
                    <span className="text-slate-400 font-bold block mb-0.5 text-[10px]">FULL NAME</span>
                    <span className="font-extrabold text-gray-900 text-xs">{candidate.name}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-violet-50/60 border border-violet-100">
                    <span className="text-slate-400 font-bold block mb-0.5 text-[10px]">CURRENT ROLE</span>
                    <span className="font-extrabold text-violet-800 text-xs">{candidate.currentRole}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-violet-50/60 border border-violet-100">
                    <span className="text-slate-400 font-bold block mb-0.5 text-[10px]">HIRING STATUS</span>
                    <span className="font-extrabold text-emerald-800 text-xs">{candidate.currentStatus}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-violet-50/60 border border-violet-100">
                    <span className="text-slate-400 font-bold block mb-0.5 text-[10px]">NOTICE PERIOD</span>
                    <span className="font-extrabold text-indigo-800 text-xs">{candidate.noticePeriod}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 font-bold block mb-0.5 text-[10px]">CURRENT SALARY</span>
                    <span className="font-bold text-gray-900">{candidate.currentSalary}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 font-bold block mb-0.5 text-[10px]">EXPECTED SALARY</span>
                    <span className="font-bold text-violet-700">{candidate.expectedSalary}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 font-bold block mb-0.5 text-[10px]">EMPLOYMENT TYPE</span>
                    <span className="font-bold text-gray-900">{candidate.employmentType}</span>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 2: CONTACT INFORMATION */}
            {activeTab === 'contact' && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b pb-1.5">Contact Information & Profiles</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 font-bold block mb-0.5 text-[10px]">EMAIL ADDRESS</span>
                    <span className="font-semibold text-gray-900">{candidate.email}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 font-bold block mb-0.5 text-[10px]">PHONE CONTACT</span>
                    <span className="font-semibold text-gray-900">{candidate.contact}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 font-bold block mb-0.5 text-[10px]">LOCATION</span>
                    <span className="font-semibold text-gray-900">{candidate.currentLocation}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-violet-50/60 border border-violet-200 space-y-2">
                  <span className="text-xs font-bold text-violet-900 uppercase tracking-wider block">Verified Profiles & Resume</span>
                  <div className="flex flex-wrap gap-2.5">
                    <a
                      href={candidate.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-sm"
                    >
                      <FaGithub className="w-3.5 h-3.5 text-white" />
                      <span>GitHub Profile</span>
                    </a>
                    <a
                      href={candidate.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
                    >
                      <FaLinkedin className="w-3.5 h-3.5 text-white" />
                      <span>LinkedIn Profile</span>
                    </a>
                    <a
                      href={candidate.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-violet-600 text-white rounded-xl text-xs font-bold hover:bg-violet-700 transition-colors flex items-center gap-2 shadow-sm"
                    >
                      <FaFileDownload className="w-3.5 h-3.5 text-white" />
                      <span>Download Resume</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 3: PROFESSIONAL SUMMARY */}
            {activeTab === 'summary' && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b pb-1.5">Professional Summary & Bio</h4>
                <p className="text-xs text-gray-700 leading-relaxed font-medium">{candidate.candidateBio}</p>
                <div className="p-3.5 rounded-xl bg-violet-50 text-xs text-violet-900 border border-violet-200 font-medium">
                  <strong>Executive Summary:</strong> {candidate.executiveSummary}
                </div>
              </div>
            )}

            {/* SECTION 4: TECHNICAL SKILLS */}
            {activeTab === 'skills' && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b pb-1.5">Technical Skills & Competencies</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {candidate.techStack.map((tech) => (
                    <div key={tech.name} className="p-3.5 rounded-xl bg-violet-50/50 border border-violet-100 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-gray-800">{tech.name}</span>
                        <span className="font-bold text-violet-700">{tech.percentage}% Mastery</span>
                      </div>
                      <div className="w-full bg-violet-200/60 h-2 rounded-full overflow-hidden">
                        <div className="bg-violet-600 h-full rounded-full" style={{ width: `${tech.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 5: EXPERIENCE */}
            {activeTab === 'experience' && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b pb-1.5">Work Experience</h4>
                <div className="space-y-3">
                  {candidate.workExperienceTimeline.map((exp, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-violet-50/50 border border-violet-100 space-y-2">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-gray-900">{exp.role} @ {exp.company}</span>
                        <span className="px-2.5 py-0.5 bg-violet-100 text-violet-800 rounded-full">{exp.duration}</span>
                      </div>
                      <ul className="list-disc pl-4 text-xs text-gray-700 space-y-1">
                        {exp.highlights.map((h, hIdx) => (
                          <li key={hIdx}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 6: EDUCATION */}
            {activeTab === 'education' && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b pb-1.5">Education</h4>
                <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-xs text-gray-900">{candidate.education.degree}</h5>
                    <p className="text-xs text-purple-700">{candidate.education.college} ({candidate.education.year})</p>
                  </div>
                  <span className="text-sm font-bold text-purple-900 px-3 py-1.5 bg-white rounded-xl border border-purple-200">
                    CGPA: {candidate.education.cgpa}
                  </span>
                </div>
              </div>
            )}

            {/* SECTION 7: PROJECTS & HACKATHONS */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b pb-1.5">Projects & Hackathons</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {candidate.projects.map((p, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <h5 className="font-bold text-xs text-gray-900">{p.title}</h5>
                      <p className="text-xs text-gray-600">{p.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 8: PERFORMANCE MATRIX */}
            {activeTab === 'matrix' && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b pb-1.5">Performance Matrix</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                  <div className="p-3 bg-violet-50 rounded-xl border border-violet-200">
                    <span className="text-[10px] font-bold text-violet-700 block">HiDevs AI</span>
                    <span className="text-lg font-extrabold text-violet-900">{candidate.hiDevsAiScore}/100</span>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                    <span className="text-[10px] font-bold text-purple-700 block">Builder Score</span>
                    <span className="text-lg font-extrabold text-purple-900">{candidate.builderScore}/100</span>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <span className="text-[10px] font-bold text-emerald-700 block">Problem Solving</span>
                    <span className="text-lg font-extrabold text-emerald-900">{candidate.problemSolvingScore}%</span>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <span className="text-[10px] font-bold text-amber-700 block">Execution</span>
                    <span className="text-lg font-extrabold text-amber-900">{candidate.executionQuality}%</span>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 9: AI EVALUATION REPORT */}
            {activeTab === 'ai-report' && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b pb-1.5">AI Evaluation Report & Benchmarks</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
                  <div className="p-3.5 bg-violet-50 rounded-xl border border-violet-200">
                    <span className="text-[10px] font-bold text-violet-600 block uppercase">HiDevs AI Score</span>
                    <span className="text-2xl font-extrabold text-violet-900">{candidate.hiDevsAiScore}/100</span>
                    <span className="text-[10px] text-violet-600 block mt-0.5">Global Percentile: {candidate.challengeRank}</span>
                  </div>
                  <div className="p-3.5 bg-purple-50 rounded-xl border border-purple-200">
                    <span className="text-[10px] font-bold text-purple-600 block uppercase">AI Evaluation Score</span>
                    <span className="text-2xl font-extrabold text-purple-900">{candidate.aiEvaluationScore}/100</span>
                    <span className="text-[10px] text-purple-600 block mt-0.5">Tier: {candidate.projectRank}</span>
                  </div>
                  <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">
                    <span className="text-[10px] font-bold text-emerald-600 block uppercase">Builder Score</span>
                    <span className="text-2xl font-extrabold text-emerald-900">{candidate.builderScore}/100</span>
                    <span className="text-[10px] text-emerald-600 block mt-0.5">Learning Velocity: {candidate.learningVelocity}%</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-violet-50/60 border border-violet-200 space-y-2">
                  <span className="font-bold uppercase text-[10px] text-violet-700 block">Synthesized AI Candidate Analysis</span>
                  <p className="text-xs text-gray-800 leading-relaxed font-medium">{candidate.detailedEvaluation}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                    <span className="font-bold uppercase text-[10px] text-emerald-800 block">AI Verified Core Strengths</span>
                    <ul className="list-disc pl-4 text-emerald-900 space-y-1 text-[11px]">
                      {candidate.topStrengths && candidate.topStrengths.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                    <span className="font-bold uppercase text-[10px] text-amber-800 block">AI Recommended Verification Areas</span>
                    <ul className="list-disc pl-4 text-amber-900 space-y-1 text-[11px]">
                      {candidate.areasForImprovement && candidate.areasForImprovement.map((a, idx) => (
                        <li key={idx}>{a}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 10: CODING ACTIVITY */}
            {activeTab === 'coding' && (
              <div className="space-y-5">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b pb-1.5">Coding Activity & Heatmaps</h4>
                
                {/* Stats Counter Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400 font-bold block mb-0.5 text-[10px]">CODEQUEST COMPLETED</span>
                    <span className="font-extrabold text-sm text-gray-900">{candidate.codeQuestCompleted} Quests</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400 font-bold block mb-0.5 text-[10px]">LEETZ PROMPTS</span>
                    <span className="font-extrabold text-sm text-gray-900">{candidate.leetZPromptsCompleted} Prompts</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400 font-bold block mb-0.5 text-[10px]">GITHUB COMMITS (2026)</span>
                    <span className="font-extrabold text-sm text-violet-700">1,420 Commits</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400 font-bold block mb-0.5 text-[10px]">CURRENT STREAK</span>
                    <span className="font-extrabold text-sm text-emerald-600">42 Days Streak</span>
                  </div>
                </div>

                {/* GitHub Contribution Heatmap Grid */}
                <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3 shadow-sm">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-200">GitHub Contributions Matrix</span>
                    <span className="text-[10px] text-slate-400">1,420 commits in the last year</span>
                  </div>

                  {/* Simulated 52-Week GitHub Heatmap */}
                  <div className="flex gap-1 overflow-x-auto pb-1">
                    {Array.from({ length: 32 }).map((_, weekIdx) => (
                      <div key={weekIdx} className="flex flex-col gap-1 shrink-0">
                        {Array.from({ length: 7 }).map((_, dayIdx) => {
                          const intensity = (weekIdx * 7 + dayIdx * 3) % 5;
                          const bgColors = [
                            'bg-slate-800',
                            'bg-violet-900',
                            'bg-violet-700',
                            'bg-violet-500',
                            'bg-emerald-400'
                          ];
                          return (
                            <div
                              key={dayIdx}
                              className={`w-2.5 h-2.5 rounded-sm ${bgColors[intensity]} transition-colors`}
                              title={`Day ${weekIdx * 7 + dayIdx}: ${intensity * 3} contributions`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span>Jan</span>
                    <span>Mar</span>
                    <span>May</span>
                    <span>Jul</span>
                    <span>Sep</span>
                    <span>Nov</span>
                    <div className="flex items-center gap-1">
                      <span>Less</span>
                      <span className="w-2 h-2 rounded-sm bg-slate-800" />
                      <span className="w-2 h-2 rounded-sm bg-violet-700" />
                      <span className="w-2 h-2 rounded-sm bg-emerald-400" />
                      <span>More</span>
                    </div>
                  </div>
                </div>

                {/* LeetCode & Problem Solving Graph & Contest Rating Trend */}
                <div className="p-5 rounded-xl bg-white border border-violet-100 space-y-4 shadow-sm">
                  <div className="flex justify-between items-center text-xs border-b pb-3">
                    <div>
                      <span className="font-bold text-gray-900 text-sm block">LeetCode Performance & Analytics</span>
                      <span className="text-[11px] text-violet-700 font-semibold">Username: @{candidate.name.toLowerCase().replace(/\s+/g, '')}_dev</span>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-violet-900 text-sm block">Global Rank: Top {candidate.leetCodeStats?.percentile || '2.8'}%</span>
                      <span className="text-[10px] text-gray-500 font-medium">Contest Rating: {candidate.leetCodeStats?.rating || '1,920'}</span>
                    </div>
                  </div>

                  {/* Additional Detailed Stats Bar */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 block">TOTAL SOLVED</span>
                      <span className="text-base font-extrabold text-gray-900">{candidate.leetCodeStats?.totalSolved || '520'} / 3,000</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 block">ACCEPTANCE RATE</span>
                      <span className="text-base font-extrabold text-emerald-700">{candidate.leetCodeStats?.acceptanceRate || '78.4'}%</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 block">MAX STREAK</span>
                      <span className="text-base font-extrabold text-violet-700">{candidate.leetCodeStats?.maxStreak || '112'} Days</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 block">CONTESTS ATTENDED</span>
                      <span className="text-base font-extrabold text-indigo-700">{candidate.leetCodeStats?.contestsAttended || '34'} Contests</span>
                    </div>
                  </div>

                  {/* Solved Tiers Bar */}
                  <div className="grid grid-cols-3 gap-3 text-center text-xs">
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                      <span className="text-[10px] font-bold text-emerald-700 block">EASY</span>
                      <span className="text-base font-extrabold text-emerald-900">{candidate.leetCodeStats?.easy || '210'} Solved</span>
                      <div className="w-full bg-emerald-200 h-1.5 rounded-full mt-1">
                        <div className="bg-emerald-500 h-full rounded-full w-[92%]" />
                      </div>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                      <span className="text-[10px] font-bold text-amber-700 block">MEDIUM</span>
                      <span className="text-base font-extrabold text-amber-900">{candidate.leetCodeStats?.medium || '250'} Solved</span>
                      <div className="w-full bg-amber-200 h-1.5 rounded-full mt-1">
                        <div className="bg-amber-500 h-full rounded-full w-[80%]" />
                      </div>
                    </div>
                    <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
                      <span className="text-[10px] font-bold text-rose-700 block">HARD</span>
                      <span className="text-base font-extrabold text-rose-900">{candidate.leetCodeStats?.hard || '60'} Solved</span>
                      <div className="w-full bg-rose-200 h-1.5 rounded-full mt-1">
                        <div className="bg-rose-500 h-full rounded-full w-[60%]" />
                      </div>
                    </div>
                  </div>

                  {/* LeetCode Monthly Rating & Submissions Bar Chart */}
                  <div className="p-4 bg-slate-900 rounded-xl text-white space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-200">LeetCode Contest Rating Trend (2026)</span>
                      <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/80">+184 Rating Growth</span>
                    </div>

                    {/* Explicit Rating Graph Bars & SVG Trend Path */}
                    <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800/80 space-y-2">
                      <div className="h-36 flex items-end justify-between gap-3 pt-6 pb-1 px-3 border-b border-slate-800">
                        {[
                          { month: 'Jan', rating: 1736, pxHeight: 50 },
                          { month: 'Feb', rating: 1770, pxHeight: 65 },
                          { month: 'Mar', rating: 1812, pxHeight: 80 },
                          { month: 'Apr', rating: 1850, pxHeight: 95 },
                          { month: 'May', rating: 1888, pxHeight: 110 },
                          { month: 'Jun', rating: candidate.leetCodeStats?.rating || 1920, pxHeight: 125 }
                        ].map((item) => (
                          <div key={item.month} className="flex-1 flex flex-col items-center justify-end h-full gap-1.5 group relative">
                            {/* Always-Visible Rating Badge */}
                            <span className="text-[10px] text-violet-300 font-extrabold bg-slate-900/90 px-1.5 py-0.5 rounded border border-violet-500/40 shadow-sm">
                              {item.rating}
                            </span>
                            {/* Solid Visible Gradient Bar */}
                            <div
                              className="w-full bg-gradient-to-t from-violet-700 via-indigo-600 to-purple-500 rounded-t-md shadow-md shadow-violet-900/40 group-hover:brightness-125 transition-all"
                              style={{ height: `${item.pxHeight}px` }}
                            />
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.month}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Top Solved Algorithmic Topics */}
                  <div className="p-4 rounded-xl bg-violet-50/60 border border-violet-200 space-y-2">
                    <span className="font-bold uppercase text-[10px] text-violet-700 block">Top Algorithmic Topic Strengths</span>
                    <div className="flex flex-wrap gap-2">
                      {['Dynamic Programming (85 Solved)', 'Graphs & Trees (120 Solved)', 'System Design (45 Solved)', 'Binary Search (60 Solved)', 'Sliding Window (40 Solved)'].map((topic) => (
                        <span key={topic} className="px-2.5 py-1 bg-white text-gray-800 rounded-lg text-xs font-semibold border border-violet-200 shadow-xs">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* SECTION 11: RECRUITER INSIGHTS */}
            {activeTab === 'insights' && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b pb-1.5">Recruiter Insights</h4>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2 text-xs">
                  <h5 className="font-bold text-emerald-900">Evidence-Based Reasons to Hire</h5>
                  <ul className="list-disc pl-4 text-emerald-800 space-y-1">
                    {candidate.recruiterHiringBrief.topEvidenceBasedReasons.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};
