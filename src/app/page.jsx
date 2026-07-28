'use client';

import React, { useState, useMemo } from 'react';
import { mockCandidates } from '@/app/data';

// Helper: parse INR salary string like "₹22,00,000" → 2200000 (module-level, stable reference)
const parseINR = (s) => parseInt(s.replace(/[^0-9]/g, '')) || 0;

export default function Home() {
  const [activeTab, setActiveTab] = useState('sourcing');
  
  const [candidates, setCandidates] = useState(mockCandidates);
  
  // Selected candidate state (defaults to first candidate Alex Rivera)
  const [selectedCandidate, setSelectedCandidate] = useState(mockCandidates[0]);

  const toggleSaveCandidate = (c) => {
    setCandidates(prev => prev.map(cand => {
      if (cand.userName === c.userName) {
        const nextWorkspace = cand.workspace === 'Saved' ? 'Shortlisted' : 'Saved';
        const updated = { ...cand, workspace: nextWorkspace };
        if (selectedCandidate.userName === c.userName) {
          setSelectedCandidate(updated);
        }
        return updated;
      }
      return cand;
    }));
  };
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState('natural');
  const [selectedRoleCategory, setSelectedRoleCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [includeRemote, setIncludeRemote] = useState(true);
  const [minExperience, setMinExperience] = useState(0);
  const [maxExperience, setMaxExperience] = useState(20);
  const [minMatchScore, setMinMatchScore] = useState(50);
  const [selectedNoticePeriod, setSelectedNoticePeriod] = useState('All');
  const [selectedSalaryLPA, setSelectedSalaryLPA] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedWorkspaceFilter, setSelectedWorkspaceFilter] = useState('All');

  // Accordion states
  const [expandedDomain, setExpandedDomain] = useState(true);
  const [expandedSpecs, setExpandedSpecs] = useState(true);
  const [expandedTech, setExpandedTech] = useState(false);
  const [expandedStatus, setExpandedStatus] = useState(false);
  const [expandedAI, setExpandedAI] = useState(false);
  const [expandedCapability, setExpandedCapability] = useState(false);
  const [expandedPrefs, setExpandedPrefs] = useState(false);

  // Filters logic
  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      // 0. Only show candidates who are open to work in sourcing results
      if (!c.openToWork) return false;
      // 1. Search Query Match — searches name, role, all skill fields
      const q = searchQuery.toLowerCase();
      const matchQuery = !q ||
        c.userName.toLowerCase().includes(q) ||
        c.currentRole.toLowerCase().includes(q) ||
        c.techStack.some(t => t.toLowerCase().includes(q)) ||
        c.primaryTechSkills.some(t => t.toLowerCase().includes(q)) ||
        c.additionalTechSkills.some(t => t.toLowerCase().includes(q)) ||
        c.preferredTechStack.some(t => t.toLowerCase().includes(q)) ||
        c.roleCategory.toLowerCase().includes(q);

      // 2. Skill filter (from skill buttons — exact skill match)
      const matchSkill = !selectedSkill ||
        c.techStack.some(t => t.toLowerCase().includes(selectedSkill.toLowerCase())) ||
        c.primaryTechSkills.some(t => t.toLowerCase().includes(selectedSkill.toLowerCase())) ||
        c.additionalTechSkills.some(t => t.toLowerCase().includes(selectedSkill.toLowerCase()));

      // 3. Role Category Match
      const matchCategory = selectedRoleCategory === 'All' || c.roleCategory === selectedRoleCategory;

      // 4. Location Match
      const locQ = selectedLocation.toLowerCase();
      const isRemoteCandidate = c.currentLocation.toLowerCase().includes('remote') ||
        c.preferredLocation.toLowerCase().includes('remote');
      const matchLocation =
        !locQ ||
        c.currentLocation.toLowerCase().includes(locQ) ||
        c.preferredLocation.toLowerCase().includes(locQ) ||
        (includeRemote && isRemoteCandidate) ||
        (locQ === 'remote' && isRemoteCandidate);

      // 5. Experience Match
      const years = parseInt(c.totalExperience) || 0;
      const matchExp = years >= minExperience && years <= maxExperience;

      // 6. AI Match Score
      const matchScore = c.aiEvaluationScore >= minMatchScore;

      // 7. Notice Period Match
      let matchNotice = true;
      if (selectedNoticePeriod !== 'All') {
        const notice = c.noticePeriod.toLowerCase();
        if (selectedNoticePeriod === 'Immediate') {
          matchNotice = notice.includes('immediate');
        } else if (selectedNoticePeriod === '<=15') {
          matchNotice = notice.includes('immediate') || notice.includes('15') || notice.includes('1 week') || notice.includes('2 week');
        } else if (selectedNoticePeriod === '<=30') {
          matchNotice = notice.includes('immediate') || notice.includes('15') || notice.includes('week') || notice.includes('month');
        } else {
          matchNotice = notice.includes(selectedNoticePeriod.toLowerCase());
        }
      }

      // 8. Salary Match (INR LPA — ₹22,00,000 = 22 LPA)
      let matchSalary = true;
      if (selectedSalaryLPA !== 'All') {
        const salaryNum = parseINR(c.expectedSalary); // e.g. 2200000
        const lpa = salaryNum / 100000; // convert to LPA (22)
        if (selectedSalaryLPA === '<20') {
          matchSalary = lpa < 20;
        } else if (selectedSalaryLPA === '20-35') {
          matchSalary = lpa >= 20 && lpa <= 35;
        } else if (selectedSalaryLPA === '35+') {
          matchSalary = lpa > 35;
        }
      }

      // 9. Workspace filter (Saved / Shortlisted / Interview Planned)
      const matchWorkspace = selectedWorkspaceFilter === 'All' || c.workspace === selectedWorkspaceFilter;

      return matchQuery && matchSkill && matchCategory && matchLocation && matchExp && matchScore && matchNotice && matchSalary && matchWorkspace;
    });
  }, [candidates, searchQuery, selectedSkill, selectedRoleCategory, selectedLocation, includeRemote, minExperience, maxExperience, minMatchScore, selectedNoticePeriod, selectedSalaryLPA, selectedWorkspaceFilter]);

  return (
    <div className="bg-background text-on-background font-body-sm overflow-hidden h-screen w-screen flex">
      {/* Side Navigation Bar */}
      <aside className="flex flex-col h-full py-6 px-4 bg-surface w-64 shrink-0 shadow-sm z-50 border-r border-outline-variant/30">
        <div className="mb-10 px-2">
          <h1 className="font-headline-md text-headline-md font-bold text-primary leading-tight">Hi Devs Hiring Search Engine</h1>
          <p className="text-xs font-label-caps text-secondary uppercase tracking-widest mt-1">Enterprise Tier</p>
        </div>
        <button 
          onClick={() => {
            setSearchQuery('');
            setSelectedRoleCategory('All');
            setSelectedLocation('');
            setMinExperience(0);
            setMaxExperience(20);
            setMinMatchScore(50);
            setSelectedNoticePeriod('All');
            setSelectedSalaryLPA('All');
            setActiveTab('sourcing');
          }}
          className="mb-8 w-full bg-primary text-on-primary py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 duration-150 transition-all shadow-md cursor-pointer hover:bg-primary-container"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New Search
        </button>
        <nav className="flex-1 space-y-1">
          <button
            onClick={() => setActiveTab('sourcing')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all cursor-pointer ${
              activeTab === 'sourcing' 
                ? 'text-primary font-bold bg-surface-container-high' 
                : 'text-secondary font-medium hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined">search</span>
            <span className="font-body-sm text-body-sm">Talent Sourcing</span>
          </button>
          
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all cursor-pointer ${
              activeTab === 'pipeline' 
                ? 'text-primary font-bold bg-surface-container-high' 
                : 'text-secondary font-medium hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined">group</span>
            <span className="font-body-sm text-body-sm">Active Pipeline</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all cursor-pointer ${
              activeTab === 'saved' 
                ? 'text-primary font-bold bg-surface-container-high' 
                : 'text-secondary font-medium hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined">bookmark</span>
            <span className="font-body-sm text-body-sm">Saved Candidates</span>
          </button>
        </nav>
      </aside>

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Top App Bar */}
        <header className="h-16 bg-surface-container-lowest shadow-sm flex justify-between items-center px-8 shrink-0 border-b border-outline-variant/30">
          <div className="flex items-center gap-6 w-1/2">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
              <input 
                className="w-full bg-surface-container-low border-none rounded-full pl-10 pr-4 py-2 text-body-sm focus:ring-2 focus:ring-primary transition-all outline-none" 
                placeholder={searchMode === 'natural' ? "Natural Language Search (e.g. 'Senior React Dev in London with FinTech')" : "Search by exact tech stack keyword, title, or username (e.g. Go Lang, Alex)..."}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <nav className="hidden lg:flex items-center gap-6">
              <button onClick={() => { setSearchQuery(''); setSelectedRoleCategory('All'); }} className="font-label-caps text-label-caps text-primary border-b-2 border-primary pb-1 cursor-pointer">Global Search</button>

            </nav>
          </div>

        </header>

        {/* Dynamic Pages Area */}
        <div className="flex-grow overflow-hidden">
          
          {/* TAB 1: TALENT SOURCING & SEARCH */}
          {activeTab === 'sourcing' && (
            <div className="h-full flex p-8 gap-6 overflow-hidden">
              
              {/* Accordion-based Recruiter Specifications Sidebar */}
              <aside className="w-full lg:w-72 shrink-0 bg-white rounded-2xl p-5 border border-violet-100 shadow-sm flex flex-col space-y-4 overflow-y-auto pb-10 h-full">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div>
                    <h2 className="font-extrabold text-sm text-gray-900 font-heading">Recruiter Filters</h2>
                    <p className="text-[11px] text-gray-500 font-medium">Candidate Specifications</p>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedRoleCategory('All');
                      setSelectedLocation('');
                      setIncludeRemote(true);
                      setMinExperience(0);
                      setMaxExperience(20);
                      setMinMatchScore(50);
                      setSelectedNoticePeriod('All');
                      setSelectedSalaryLPA('All');
                      setSearchQuery('');
                      setSelectedSkill('');
                      setSelectedWorkspaceFilter('All');
                    }}
                    className="text-xs font-bold text-violet-600 hover:text-violet-900 transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Accordion 1: DOMAIN / SPECIALIZATION */}
                  <div className="border border-violet-100 rounded-xl overflow-hidden bg-violet-50/30">
                    <button 
                      onClick={() => setExpandedDomain(!expandedDomain)}
                      className="w-full px-3.5 py-2.5 font-bold text-xs text-gray-900 flex items-center justify-between text-left hover:bg-violet-100/50 transition-colors cursor-pointer"
                    >
                      <span>DOMAIN / SPECIALIZATION</span>
                      <span className="text-violet-600 text-xs font-mono">{expandedDomain ? '−' : '+'}</span>
                    </button>
                    {expandedDomain && (
                      <div className="p-3 bg-white border-t border-violet-100 text-xs space-y-2">
                        <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">Selected Domain</label>
                        <div className="flex flex-col gap-1.5">
                          <button 
                            onClick={() => { setSelectedRoleCategory('All'); setSearchQuery(''); }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${selectedRoleCategory === 'All' ? 'bg-violet-100 border-violet-300 text-violet-900 shadow-sm' : 'bg-slate-50 border-gray-100 text-gray-700 hover:bg-slate-100'}`}
                          >
                            All Domains
                          </button>
                          <button 
                            onClick={() => { setSelectedRoleCategory('Software Engineering'); setSearchQuery('Fullstack'); }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${(selectedRoleCategory === 'Software Engineering' && searchQuery === 'Fullstack') ? 'bg-violet-100 border-violet-300 text-violet-900 shadow-sm' : 'bg-slate-50 border-gray-100 text-gray-700 hover:bg-slate-100'}`}
                          >
                            Full-Stack Engineering & AI Systems
                          </button>
                          <button 
                            onClick={() => { setSelectedRoleCategory('Software Engineering'); setSearchQuery('Go Lang'); }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${(selectedRoleCategory === 'Software Engineering' && searchQuery === 'Go Lang') ? 'bg-violet-100 border-violet-300 text-violet-900 shadow-sm' : 'bg-slate-50 border-gray-100 text-gray-700 hover:bg-slate-100'}`}
                          >
                            Backend & Distributed Systems
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Accordion 2: CORE SPECS */}
                  <div className="border border-gray-100 rounded-xl overflow-hidden bg-slate-50/50">
                    <button 
                      onClick={() => setExpandedSpecs(!expandedSpecs)}
                      className="w-full px-3.5 py-2.5 font-bold text-xs text-gray-900 flex items-center justify-between text-left hover:bg-slate-100/60 transition-colors cursor-pointer"
                    >
                      <span>CORE SPECS</span>
                      <span className="text-violet-600 text-xs font-mono">{expandedSpecs ? '−' : '+'}</span>
                    </button>
                    {expandedSpecs && (
                      <div className="p-3.5 space-y-4 bg-white border-t border-gray-100 text-xs">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">Target Role</label>
                          <div className="grid grid-cols-2 gap-1.5">
                            {[
                              { label: 'AI / ML Engineer', q: 'AI Engineer' },
                              { label: 'Backend', q: 'Infrastructure' },
                              { label: 'Full Stack', q: 'Fullstack' },
                              { label: 'Platform Eng.', q: 'DevOps' },
                            ].map(({ label, q }) => (
                              <button
                                key={label}
                                onClick={() => setSearchQuery(searchQuery === q ? '' : q)}
                                className={`px-2 py-1.5 rounded-lg text-center font-semibold text-xs transition-all border cursor-pointer ${
                                  searchQuery === q ? 'bg-violet-100 border-violet-300 text-violet-900 shadow-sm' : 'bg-slate-50 hover:bg-violet-50 text-gray-700 border-gray-200'
                                }`}
                              >
                                {label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-[10px] font-bold uppercase text-gray-400">Skills & Stack</label>
                            <label htmlFor="verified-skills-only" className="flex items-center gap-1 cursor-pointer text-[10px] text-gray-600 font-bold">
                              <input id="verified-skills-only" type="checkbox" className="accent-violet-600 rounded" name="verifiedSkillsOnly" />
                              <span>Verified Only</span>
                            </label>
                          </div>
                          <div className="grid grid-cols-2 gap-1.5">
                            {['Python', 'FastAPI', 'React', 'TypeScript', 'Go', 'Docker'].map((skill) => (
                              <button 
                                key={skill}
                                onClick={() => setSelectedSkill(selectedSkill === skill ? '' : skill)}
                                className={`px-2 py-1.5 rounded-lg text-center font-semibold text-xs transition-all border cursor-pointer ${
                                  selectedSkill === skill ? 'bg-violet-100 border-violet-300 text-violet-900 shadow-sm' : 'bg-slate-50 hover:bg-violet-50 text-gray-700 border-gray-200'
                                }`}
                              >
                                {skill}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">Years of Experience</label>
                          <div className="grid grid-cols-3 gap-1.5">
                            {[
                              { label: '0-2 Yrs', min: 0, max: 2 },
                              { label: '3-5 Yrs', min: 3, max: 5 },
                              { label: '6-10 Yrs', min: 6, max: 10 },
                              { label: '10+ Yrs', min: 11, max: 20 },
                              { label: 'Any', min: 0, max: 20 },
                            ].map(({ label, min, max }) => (
                              <button
                                key={label}
                                onClick={() => { setMinExperience(min); setMaxExperience(max); }}
                                className={`px-2 py-1.5 rounded-lg text-center font-semibold text-xs transition-all border cursor-pointer ${
                                  minExperience === min && maxExperience === max ? 'bg-violet-100 border-violet-300 text-violet-900 shadow-sm' : 'bg-slate-50 hover:bg-violet-50 text-gray-700 border-gray-200'
                                }`}
                              >
                                {label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">Location & Remote</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Bengaluru, Remote..."
                            className="w-full px-3 py-1.5 mb-2 rounded-lg border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-violet-600 bg-white" 
                            value={selectedLocation} 
                            onChange={(e) => setSelectedLocation(e.target.value)}
                          />
                          <div className="grid grid-cols-2 gap-1.5">
                            <button
                              onClick={() => { setSelectedLocation(selectedLocation === 'Remote' ? '' : 'Remote'); setIncludeRemote(true); }}
                              className={`px-2 py-1.5 rounded-lg text-center font-semibold text-xs transition-all border cursor-pointer ${
                                selectedLocation === 'Remote' ? 'bg-violet-100 border-violet-300 text-violet-900 shadow-sm' : 'bg-slate-50 hover:bg-violet-50 text-gray-700 border-gray-200'
                              }`}
                            >Remote Only</button>
                            <button
                              onClick={() => { setSelectedLocation(''); setIncludeRemote(false); }}
                              className={`px-2 py-1.5 rounded-lg text-center font-semibold text-xs transition-all border cursor-pointer ${
                                !includeRemote && selectedLocation === '' ? 'bg-violet-100 border-violet-300 text-violet-900 shadow-sm' : 'bg-slate-50 hover:bg-violet-50 text-gray-700 border-gray-200'
                              }`}
                            >In-Office</button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">Notice Period</label>
                          <div className="grid grid-cols-2 gap-1.5">
                            {[
                              { label: 'Immediate', val: 'Immediate' },
                              { label: '≤ 15 Days', val: '<=15' },
                              { label: '≤ 1 Month', val: '<=30' },
                              { label: 'Show All', val: 'All' },
                            ].map(({ label, val }) => (
                              <button
                                key={val}
                                onClick={() => setSelectedNoticePeriod(val)}
                                className={`px-1.5 py-1.5 rounded-lg text-center font-semibold text-xs transition-all border cursor-pointer ${
                                  selectedNoticePeriod === val ? 'bg-violet-100 border-violet-300 text-violet-900 shadow-sm' : 'bg-slate-50 hover:bg-violet-50 text-gray-700 border-gray-200'
                                }`}
                              >
                                {label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">Salary Expectation (INR)</label>
                          <div className="grid grid-cols-2 gap-1.5">
                            {[
                              { label: '< 20 LPA', val: '<20' },
                              { label: '20–35 LPA', val: '20-35' },
                              { label: '35+ LPA', val: '35+' },
                              { label: 'Show All', val: 'All' },
                            ].map(({ label, val }) => (
                              <button
                                key={val}
                                onClick={() => setSelectedSalaryLPA(val)}
                                className={`px-1.5 py-1.5 rounded-lg text-center font-semibold text-xs transition-all border cursor-pointer ${
                                  selectedSalaryLPA === val ? 'bg-violet-100 border-violet-300 text-violet-900 shadow-sm' : 'bg-slate-50 hover:bg-violet-50 text-gray-700 border-gray-200'
                                }`}
                              >
                                {label}
                              </button>
                            ))}
                          </div>
                        </div>

                      </div>
                    )}
                  </div>

                  {/* Accordion 3: TECH STACK */}
                  <div className="border border-gray-100 rounded-xl overflow-hidden bg-slate-50/50">
                    <button 
                      onClick={() => setExpandedTech(!expandedTech)}
                      className="w-full px-3.5 py-2.5 font-bold text-xs text-gray-900 flex items-center justify-between text-left hover:bg-slate-100/60 transition-colors cursor-pointer"
                    >
                      <span>TECH STACK</span>
                      <span className="text-violet-600 text-xs font-mono">{expandedTech ? '−' : '+'}</span>
                    </button>
                    {expandedTech && (
                      <div className="p-3 bg-white border-t border-gray-100 text-xs space-y-2">
                        <div className="flex flex-wrap gap-1.5">
                          {['React', 'Next.js', 'Node.js', 'Go Lang', 'Kubernetes', 'gRPC', 'Docker', 'Terraform', 'Python', 'TypeScript', 'Redis', 'PostgreSQL'].map((tech) => (
                            <button 
                              key={tech}
                              onClick={() => setSelectedSkill(selectedSkill === tech ? '' : tech)}
                              className={`px-2.5 py-1 rounded text-[11px] font-medium cursor-pointer transition-all border ${
                                selectedSkill === tech ? 'bg-violet-600 text-white border-violet-600' : 'bg-surface-container-high text-gray-700 border-gray-200 hover:bg-primary hover:text-white hover:border-primary'
                              }`}
                            >
                              {tech}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Accordion 4: RECRUITER STATUS */}
                  <div className="border border-gray-100 rounded-xl overflow-hidden bg-slate-50/50">
                    <button 
                      onClick={() => setExpandedStatus(!expandedStatus)}
                      className="w-full px-3.5 py-2.5 font-bold text-xs text-gray-900 flex items-center justify-between text-left hover:bg-slate-100/60 transition-colors cursor-pointer"
                    >
                      <span>RECRUITER STATUS</span>
                      <span className="text-violet-600 text-xs font-mono">{expandedStatus ? '−' : '+'}</span>
                    </button>
                    {expandedStatus && (
                      <div className="p-3 bg-white border-t border-gray-100 text-xs space-y-1">
                        {([
                          { label: 'All Candidates', val: 'All' },
                          { label: 'Saved Pool', val: 'Saved' },
                          { label: 'Shortlisted', val: 'Shortlisted' },
                          { label: 'Interview Planned', val: 'Interview Planned' },
                        ]).map(({ label, val }) => (
                          <button
                            key={val}
                            onClick={() => setSelectedWorkspaceFilter(val)}
                            className={`w-full text-left px-2 py-1.5 rounded font-semibold cursor-pointer transition-all ${
                              selectedWorkspaceFilter === val ? 'bg-violet-100 text-violet-900' : 'hover:bg-slate-100 text-gray-700'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Accordion 5: AI EVALUATION & RANKS */}
                  <div className="border border-gray-100 rounded-xl overflow-hidden bg-slate-50/50">
                    <button 
                      onClick={() => setExpandedAI(!expandedAI)}
                      className="w-full px-3.5 py-2.5 font-bold text-xs text-gray-900 flex items-center justify-between text-left hover:bg-slate-100/60 transition-colors cursor-pointer"
                    >
                      <span>AI EVALUATION & RANKS</span>
                      <span className="text-violet-600 text-xs font-mono">{expandedAI ? '−' : '+'}</span>
                    </button>
                    {expandedAI && (
                      <div className="p-3 bg-white border-t border-gray-100 text-xs space-y-2">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-1">Min Match Score: {minMatchScore}%</label>
                          <input 
                            className="w-full accent-primary h-1.5 bg-surface-container rounded-lg cursor-pointer" 
                            type="range"
                            min="50"
                            max="100"
                            value={minMatchScore}
                            onChange={(e) => setMinMatchScore(Number(e.target.value))}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Accordion 6: CAPABILITY & SCORES */}
                  <div className="border border-gray-100 rounded-xl overflow-hidden bg-slate-50/50">
                    <button 
                      onClick={() => setExpandedCapability(!expandedCapability)}
                      className="w-full px-3.5 py-2.5 font-bold text-xs text-gray-900 flex items-center justify-between text-left hover:bg-slate-100/60 transition-colors cursor-pointer"
                    >
                      <span>CAPABILITY & SCORES</span>
                      <span className="text-violet-600 text-xs font-mono">{expandedCapability ? '−' : '+'}</span>
                    </button>
                    {expandedCapability && (
                      <div className="p-3 bg-white border-t border-gray-100 text-xs space-y-1">
                        <button onClick={() => { setMinMatchScore(90); }} className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-100 cursor-pointer">AI Eval Match Score &gt; 90%</button>
                        <button onClick={() => { setMinMatchScore(95); }} className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-100 cursor-pointer">Elite Top 1.5% Ranks Only</button>
                      </div>
                    )}
                  </div>

                  {/* Accordion 7: EMPLOYMENT PREFERENCES */}
                  <div className="border border-gray-100 rounded-xl overflow-hidden bg-slate-50/50">
                    <button 
                      onClick={() => setExpandedPrefs(!expandedPrefs)}
                      className="w-full px-3.5 py-2.5 font-bold text-xs text-gray-900 flex items-center justify-between text-left hover:bg-slate-100/60 transition-colors cursor-pointer"
                    >
                      <span>EMPLOYMENT PREFERENCES</span>
                      <span className="text-violet-600 text-xs font-mono">{expandedPrefs ? '−' : '+'}</span>
                    </button>
                    {expandedPrefs && (
                      <div className="p-3 bg-white border-t border-gray-100 text-xs space-y-1">
                        <button
                          onClick={() => setIncludeRemote(true)}
                          className={`w-full text-left px-2 py-1.5 rounded font-semibold cursor-pointer transition-all ${
                            includeRemote ? 'bg-violet-100 text-violet-900' : 'hover:bg-slate-100 text-gray-700'
                          }`}
                        >
                          Include Remote Candidates
                        </button>
                        <button
                          onClick={() => setIncludeRemote(false)}
                          className={`w-full text-left px-2 py-1.5 rounded font-semibold cursor-pointer transition-all ${
                            !includeRemote ? 'bg-violet-100 text-violet-900' : 'hover:bg-slate-100 text-gray-700'
                          }`}
                        >
                          In-Office / Relocation Only
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              </aside>

              {/* Main Search & Results */}
              <section className="flex-grow min-w-0 pb-10 h-full overflow-y-auto pr-2">
                
                {/* Search Interface */}
                <div className="bg-white rounded-2xl shadow-sm border border-surface-container-high p-6 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center bg-surface-container-low rounded-full p-1 border border-outline-variant">
                      <button 
                        onClick={() => setSearchMode('natural')}
                        className={`px-6 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${searchMode === 'natural' ? 'bg-white shadow-sm text-primary' : 'text-secondary hover:text-on-surface'}`}
                      >
                        Natural Language Search
                      </button>
                      <button 
                        onClick={() => setSearchMode('domain')}
                        className={`px-6 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${searchMode === 'domain' ? 'bg-white shadow-sm text-primary' : 'text-secondary hover:text-on-surface'}`}
                      >
                        Domain Search
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-medium text-secondary">Search History:</span>
                      <div className="flex gap-2">
                        <select 
                          onChange={(e) => {
                            if (e.target.value) {
                              setSearchQuery(e.target.value);
                            }
                          }}
                          className="text-[11px] bg-surface-container-high border border-outline-variant/30 px-2 py-0.5 rounded cursor-pointer text-secondary font-bold focus:outline-none focus:ring-1 focus:ring-primary bg-white"
                          value={['Go Lang Specialist', 'AI Engineer Specialist', 'Lead Platform Specialist', 'Lead Fullstack Specialist'].includes(searchQuery) ? searchQuery : ''}
                        >
                          <option value="">Select Specialist Profile...</option>
                          <option value="Go Lang">Go Lang Specialist</option>
                          <option value="AI Engineer">AI Engineer Specialist</option>
                          <option value="Kubernetes">Lead Platform Specialist</option>
                          <option value="React">Lead Fullstack Specialist</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="relative group">
                    <input 
                      className="w-full pl-14 pr-32 py-5 bg-surface-container-low border-none rounded-2xl font-body-lg text-body-lg focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none" 
                      placeholder={searchMode === 'natural' ? "Find me a Senior Software Engineer with distributed systems expertise and React experience in New York..." : "Search by exact tech stack keyword, title, or username (e.g. Go Lang, Alex)..."} 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-on-primary px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-container active:scale-95 transition-all cursor-pointer">
                      Search
                    </button>
                  </div>
                </div>

                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <h2 className="font-headline-lg text-headline-lg">{filteredCandidates.length} Candidates Match</h2>
                    <span className="px-2 py-1 bg-surface-container-high text-on-surface-variant rounded text-[10px] font-bold uppercase tracking-wider">Top Tier Results</span>
                  </div>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {filteredCandidates.map((c, index) => (
                    <div key={index} className="bg-white rounded-2xl border border-surface-container-high shadow-sm hover:shadow-md transition-all group overflow-hidden hover:-translate-y-1">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex gap-4">
                            <img 
                              className="w-16 h-16 rounded-xl object-cover border-2 border-primary-fixed"
                              src={c.userName === "Alex Rivera" ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" : "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"}
                              alt={c.userName}
                            />
                            <div>
                              <h4 className="font-headline-md text-headline-md group-hover:text-primary transition-colors cursor-pointer" onClick={() => { setSelectedCandidate(c); setActiveTab('pipeline'); }}>{c.userName}</h4>
                              <p className="text-body-sm text-secondary">{c.currentRole}</p>
                              <p className="text-[11px] text-outline mt-0.5">{c.emailAddress} • {c.contactInformation}</p>
                              <div className="flex items-center gap-2 mt-1.5">
                                <span className="material-symbols-outlined text-sm text-outline">location_on</span>
                                <span className="text-xs text-outline">{c.currentLocation}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="inline-flex items-center bg-success-emerald/10 text-success-emerald px-3 py-1 rounded-full text-xs font-bold mb-1">
                              {c.workspace}
                            </div>
                            <div className="text-display-score text-primary leading-none mt-1">{c.aiEvaluationScore}%</div>
                            <div className="text-[10px] font-bold text-primary/60 uppercase tracking-tighter">AI MATCH</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/30">
                            <div className="text-[10px] font-bold text-secondary uppercase mb-1">Builder Score</div>
                            <div className="text-lg font-bold text-on-surface">{c.builderScore}</div>
                            <div className="w-full h-1 bg-surface-container rounded-full mt-2 overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${(c.builderScore/1000)*100}%` }}></div>
                            </div>
                          </div>
                          <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/30">
                            <div className="text-[10px] font-bold text-secondary uppercase mb-1">Dev Performance</div>
                            <div className="text-lg font-bold text-on-surface">{c.developerPerformance}</div>
                          </div>
                          <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/30">
                            <div className="text-[10px] font-bold text-secondary uppercase mb-1">Experience</div>
                            <div className="text-lg font-bold text-on-surface">{c.totalExperience}</div>
                            <div className="text-[10px] text-success-emerald font-medium mt-1">{c.experienceBanding}</div>
                          </div>
                        </div>

                        {/* Preferred stack and Location info */}
                        <div className="border-t border-outline-variant/20 pt-3 mb-4 space-y-1 text-[11px] text-on-surface-variant">
                          <div>Preferred Location: <span className="font-semibold text-primary">{c.preferredLocation}</span></div>
                          <div>Preferred Stack: <span className="font-semibold text-secondary">{c.preferredTechStack.join(', ')}</span></div>
                          <div>Status / Availability: <span className="font-semibold text-success-emerald">{c.currentStatusAvailability}</span></div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {c.techStack.map((tech, idx) => (
                            <span key={idx} className="px-2.5 py-1 bg-white border border-outline-variant rounded-md text-xs font-medium text-on-surface-variant">{tech}</span>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 border-t border-outline-variant/30 flex items-center justify-end gap-2">
                        <button 
                          onClick={() => toggleSaveCandidate(c)} 
                          className={`p-2 transition-colors cursor-pointer ${c.workspace === 'Saved' ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}
                        >
                          <span className="material-symbols-outlined text-xl">bookmark</span>
                        </button>
                        <button 
                          onClick={() => { setSelectedCandidate(c); setActiveTab('pipeline'); }}
                          className="bg-primary text-on-primary px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-primary-container transition-colors cursor-pointer"
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* TAB 2: SAVED CANDIDATES HUB */}
          {activeTab === 'saved' && (
            <div className="h-full overflow-y-auto p-8 flex flex-col">
              <section className="mb-8">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface">Saved Candidates</h2>
                    <p className="text-secondary font-body-sm mt-1">Manage and organize your elite talent pool for future initiatives.</p>
                  </div>
                </div>

                {/* Bento Grid Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/30 flex flex-col justify-between">
                    <span className="text-label-caps font-label-caps text-secondary uppercase tracking-wider">Total Pool</span>
                    <div className="flex items-baseline gap-2 mt-4">
                      <span className="font-display-score text-display-score text-primary">
                        {candidates.filter(c => c.workspace === 'Saved').length}
                      </span>
                    </div>
                  </div>
                  <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/30 flex flex-col justify-between">
                    <span className="text-label-caps font-label-caps text-secondary uppercase tracking-wider">Avg. Match Score</span>
                    <div className="flex items-baseline gap-2 mt-4">
                      <span className="font-display-score text-display-score text-on-surface">
                        {(() => {
                          const saved = candidates.filter(c => c.workspace === 'Saved');
                          if (saved.length === 0) return 0;
                          const sum = saved.reduce((acc, c) => acc + c.aiEvaluationScore, 0);
                          return Math.round(sum / saved.length);
                        })()}
                      </span>
                      <span className="text-on-surface-variant font-medium text-body-sm">/ 100</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Saved Candidates Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {candidates.filter(c => c.workspace === 'Saved').map((c, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-surface-container-high shadow-sm p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-4">
                          <img 
                            className="w-14 h-14 rounded-xl object-cover" 
                            src={c.userName === "Alex Rivera" ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" : c.userName === "Priya Sharma" ? "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150" : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"} 
                            alt={c.userName}
                          />
                          <div>
                            <h4 className="font-headline-md text-headline-md hover:text-primary cursor-pointer transition-colors" onClick={() => { setSelectedCandidate(c); setActiveTab('pipeline'); }}>{c.userName}</h4>
                            <p className="text-body-sm text-secondary">{c.currentRole}</p>
                            <p className="text-[11px] text-outline">{c.emailAddress} • {c.contactInformation}</p>
                          </div>
                        </div>
                        <span className="text-display-score text-primary leading-none text-2xl font-bold">{c.aiEvaluationScore}%</span>
                      </div>
                      <p className="text-body-sm text-on-surface-variant line-clamp-3 mb-4">
                        {c.executiveSummary}
                      </p>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-outline-variant/30">
                      <span className="text-xs bg-success-emerald/10 text-success-emerald px-2 py-0.5 rounded font-bold">{c.workspace}</span>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => toggleSaveCandidate(c)}
                          className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-extrabold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          Unsave
                        </button>
                        <button 
                          onClick={() => { setSelectedCandidate(c); setActiveTab('pipeline'); }}
                          className="text-xs bg-violet-50 hover:bg-violet-100 text-violet-700 font-extrabold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          View Profile →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: REDESIGNED INTELLIGENCE PROFILE */}
          {activeTab === 'pipeline' && (
            <div className="h-full overflow-y-auto p-8 flex flex-col">

              {/* ── Candidate Switcher Bar ── */}
              <div className="mb-6 bg-white rounded-2xl border border-violet-100 shadow-sm p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active Pipeline — Candidate</p>
                    <p className="text-xs text-slate-500 font-medium">Click any candidate below to switch profile</p>
                  </div>
                  <span className="text-[11px] bg-violet-100 text-violet-800 font-bold px-2.5 py-1 rounded-full">
                    {candidates.length} candidates
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {candidates.filter(c => c.openToWork).map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedCandidate(c)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        selectedCandidate.userName === c.userName
                          ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                          : 'bg-slate-50 text-gray-700 border-gray-200 hover:bg-violet-50 hover:border-violet-200 hover:text-violet-900'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full shrink-0 ${c.openToWork ? 'bg-emerald-400' : 'bg-gray-300'}`}></span>
                      <span>{c.userName}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                        selectedCandidate.userName === c.userName
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {c.aiEvaluationScore}%
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Candidate Identity & High-Level Metrics */}
              <div className="grid grid-cols-12 gap-6 mb-8 items-start">
                
                {/* Profile Overview Card */}
                <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant flex flex-col md:flex-row gap-6 relative overflow-hidden">
                  
                  {/* Open to Work Badge */}
                  {selectedCandidate.openToWork ? (
                    <div className="absolute top-4 right-4 bg-primary text-on-primary px-3 py-1 rounded-full text-label-caps flex items-center gap-2 animate-pulse-glow">
                      <span className="w-2 h-2 bg-white rounded-full pulse-dot"></span>
                      Open to Work
                    </div>
                  ) : (
                    <div className="absolute top-4 right-4 bg-gray-200 text-gray-500 px-3 py-1 rounded-full text-label-caps flex items-center gap-2">
                      <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                      Not Open to Work
                    </div>
                  )}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-xl overflow-hidden border border-primary-container">
                      <img 
                        className="w-full h-full object-cover" 
                        src={selectedCandidate.userName === "Alex Rivera" ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" : "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"} 
                        alt={selectedCandidate.userName}
                      />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="mb-4">
                      <h2 className="font-headline-lg text-headline-lg text-primary mb-1">{selectedCandidate.userName}</h2>
                      <p className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded inline-block mb-2">Workspace Stage: {selectedCandidate.workspace}</p>
                      
                      {/* Email, Contact, Employment type, availability details */}
                      <div className="text-xs text-slate-600 space-y-0.5 mb-3 font-semibold">
                        <div>Email Address: <strong className="text-on-surface">{selectedCandidate.emailAddress}</strong></div>
                        <div>Contact Information: <strong className="text-on-surface">{selectedCandidate.contactInformation}</strong></div>
                        <div>Employment Type: <strong className="text-on-surface">{selectedCandidate.employmentType}</strong></div>
                        <div>Current Status / Availability: <strong className="text-success-emerald">{selectedCandidate.currentStatusAvailability}</strong></div>
                        <div>Open to Work: <strong className="text-on-surface">{selectedCandidate.openToWork ? 'Yes' : 'No'}</strong></div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-secondary mb-3">
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">work</span> {selectedCandidate.currentRole}</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">location_on</span> Current Location: {selectedCandidate.currentLocation} (Pref: {selectedCandidate.preferredLocation})</span>
                      </div>
                      <div className="flex gap-3">
                        <a className="text-primary hover:underline flex items-center gap-1.5 text-xs font-semibold" href="#">
                          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          GitHub Profile: {selectedCandidate.githubProfile}
                        </a>
                        <a className="text-primary hover:underline flex items-center gap-1.5 text-xs font-semibold" href="#">
                          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                          LinkedIn Profile: {selectedCandidate.linkedinProfile}
                        </a>
                        <a className="text-primary hover:underline flex items-center gap-1.5 text-xs font-semibold" href="#">
                          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                          </svg>
                          Resume: {selectedCandidate.resume}
                        </a>
                      </div>
                    </div>

                    {/* Salary, Variable Bonus, expected salary, notice period details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-outline-variant">
                      <div>
                        <p className="text-label-caps font-label-caps text-secondary uppercase opacity-60 mb-1">Experience Banding</p>
                        <p className="font-headline-md text-headline-md text-on-background">{selectedCandidate.experienceBanding}</p>
                      </div>
                      <div>
                        <p className="text-label-caps font-label-caps text-secondary uppercase opacity-60 mb-1">Current Salary</p>
                        <p className="font-headline-md text-headline-md text-on-background">{selectedCandidate.currentSalary}</p>
                      </div>
                      <div>
                        <p className="text-label-caps font-label-caps text-secondary uppercase opacity-60 mb-1">Expected Salary</p>
                        <p className="font-headline-md text-headline-md text-primary">{selectedCandidate.expectedSalary}</p>
                      </div>
                      <div>
                        <p className="text-label-caps font-label-caps text-secondary uppercase opacity-60 mb-1">Notice Period</p>
                        <p className="font-headline-md text-headline-md text-success-emerald">{selectedCandidate.noticePeriod}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-3">
                      <div>
                        <p className="text-xs uppercase font-bold text-slate-500 mb-1">Candidate Bio</p>
                        <p className="text-body-sm text-on-surface leading-relaxed">{selectedCandidate.candidateBio}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase font-bold text-slate-500 mb-1">Culture Preferences</p>
                        <p className="text-xs text-secondary leading-relaxed">{selectedCandidate.culturePreferences}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase font-bold text-slate-500 mb-0.5">Variable Bonus</p>
                        <p className="text-xs font-semibold text-on-surface">{selectedCandidate.variableBonus}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Intelligence Radar Card & AI Scores */}
                <div className="col-span-12 lg:col-span-4 bg-surface-intelligence rounded-xl p-6 intelligence-glow text-white h-full border border-primary/20">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-headline-md text-headline-md text-inverse-primary flex items-center gap-2">
                      <span className="material-symbols-outlined">auto_awesome</span>
                      AI Evaluation
                    </h3>
                    <div className="bg-primary/20 text-inverse-primary px-3 py-1 rounded-full text-label-caps font-bold">
                      {selectedCandidate.aiEvaluationScore}% Match
                    </div>
                  </div>
                  
                  {/* Additional stats */}
                  <div className="grid grid-cols-2 gap-2 mb-6 border-b border-white/10 pb-4 text-xs font-semibold text-primary-fixed-dim">
                    <div>HiDevs AI Score: <span className="text-white">{selectedCandidate.hiDevsAIScore}/100</span></div>
                    <div>Challenge Rank: <span className="text-white">{selectedCandidate.challengeRank}</span></div>
                    <div>Project Rank: <span className="text-white">{selectedCandidate.projectRank}</span></div>
                    <div>Interview Readiness: <span className="text-success-emerald">{selectedCandidate.interviewReadiness}</span></div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-label-caps mb-2 text-xs">
                        <span>DEVELOPER PERFORMANCE</span>
                        <span className="text-inverse-primary">{selectedCandidate.developerPerformance}</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-inverse-primary" style={{ width: `${selectedCandidate.executionQuality}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-label-caps mb-2 text-xs">
                        <span>LEARNING VELOCITY</span>
                        <span className="text-inverse-primary">{selectedCandidate.learningVelocity}%</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-inverse-primary" style={{ width: `${selectedCandidate.learningVelocity}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-label-caps mb-2 text-xs">
                        <span>EXECUTION QUALITY</span>
                        <span className="text-inverse-primary">{selectedCandidate.executionQuality}/100</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-inverse-primary" style={{ width: `${selectedCandidate.executionQuality}%` }}></div>
                      </div>
                    </div>
                    {/* Added Competency matrix details */}
                    <div>
                      <div className="flex justify-between text-label-caps mb-2 text-xs">
                        <span>PROBLEM SOLVING SCORE</span>
                        <span className="text-inverse-primary">{selectedCandidate.problemSolvingScore}/100</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-inverse-primary" style={{ width: `${selectedCandidate.problemSolvingScore}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-label-caps mb-2 text-xs">
                        <span>LEADERSHIP SCORE</span>
                        <span className="text-inverse-primary">{selectedCandidate.leadershipScore}/100</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-inverse-primary" style={{ width: `${selectedCandidate.leadershipScore}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-label-caps mb-2 text-xs">
                        <span>CHALLENGE CONSISTENCY</span>
                        <span className="text-inverse-primary">{selectedCandidate.challengeConsistency}%</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-inverse-primary" style={{ width: `${selectedCandidate.challengeConsistency}%` }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <p className="text-label-caps text-white/60 mb-2">EXECUTIVE SUMMARY / USER SUMMARY</p>
                    <p className="text-body-sm leading-relaxed text-white/90">{selectedCandidate.userSummary}</p>
                  </div>
                </div>
              </div>

              {/* 12-Column Modular Grid Sections */}
              <div className="grid grid-cols-12 gap-6">
                
                {/* Left Column */}
                <div className="col-span-12 lg:col-span-8 space-y-6">
                  
                  {/* Technical Proficiency */}
                  <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-headline-md text-headline-md text-primary">Technical Proficiency</h3>
                      <span className="bg-secondary-container text-on-secondary-container px-2 py-1 rounded text-label-caps">Verified Skills / Evidence</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {selectedCandidate.techStackPercentage.map((tsp, idx) => (
                        <div key={idx} className="flex flex-col items-center p-4 bg-surface-container-low rounded-lg">
                          <div className="relative w-24 h-24 mb-3 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle cx="48" cy="48" fill="transparent" r="40" stroke="#e2e2ec" strokeWidth="4"></circle>
                              <circle cx="48" cy="48" fill="transparent" r="40" stroke={idx === 0 ? "#007d55" : idx === 1 ? "#003594" : "#ba1a1a"} strokeDasharray="251.2" strokeDashoffset={251.2 - (tsp.percentage/100)*251.2} strokeWidth="4"></circle>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center font-display-score text-headline-md">{tsp.percentage}%</div>
                          </div>
                          <span className="font-label-caps text-label-caps text-secondary">{tsp.name}</span>
                        </div>
                      ))}
                    </div>

                    {/* Skill distributions and stack details */}
                    <div className="grid grid-cols-2 gap-8 border-b border-outline-variant/30 pb-6 mb-6">
                      <div>
                        <p className="font-label-caps text-label-caps text-outline uppercase mb-2">Preferred Tech Stack</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedCandidate.preferredTechStack.map((tech, idx) => (
                            <span key={idx} className="px-3 py-1 bg-surface-container-high rounded-full border border-outline-variant font-data-mono text-data-mono">{tech}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="font-label-caps text-label-caps text-outline uppercase mb-2">Additional Tech Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedCandidate.additionalTechSkills.map((tech, idx) => (
                            <span key={idx} className="px-3 py-1 bg-surface-container-low rounded-full border border-outline-variant font-data-mono text-data-mono text-xs">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <p className="font-label-caps text-label-caps text-outline uppercase mb-2">Target / Preferred Roles</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedCandidate.preferredTargetRoles.map((role, idx) => (
                            <span key={idx} className="px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full font-body-sm">{role}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="font-label-caps text-label-caps text-outline uppercase mb-2">Skill Distribution</p>
                        <div className="text-xs space-y-1 font-medium text-secondary">
                          {selectedCandidate.skillDistribution.map((sd, idx) => (
                            <div key={idx}>{sd.name}: <strong className="text-on-surface">{sd.percentage}%</strong></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Experience Timeline */}
                  <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant">
                    <h3 className="font-headline-md text-headline-md text-primary mb-6">Work Experience Timeline (Total Experience: {selectedCandidate.totalExperience})</h3>
                    <p className="text-xs text-outline mb-4">Company Experience: {selectedCandidate.companyExperience}</p>
                    <div className="relative pl-8 space-y-10">
                      <div className="absolute left-[3.5px] top-2 bottom-2 w-[1px] bg-outline-variant"></div>
                      
                      {selectedCandidate.workExperienceTimeline.map((work, idx) => (
                        <div key={idx} className="relative">
                          <div className="absolute -left-[32.5px] top-1.5 w-4 h-4 rounded-full bg-primary ring-4 ring-white"></div>
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-body-lg text-body-lg font-bold">{work.role}</h4>
                            <span className="text-label-caps bg-surface-container px-2 py-1 rounded">{work.period}</span>
                          </div>
                          <p className="text-primary font-medium mb-2">{work.company}</p>
                          <p className="text-body-sm text-secondary">{work.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Education details including CGPA */}
                  <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant">
                    <h3 className="font-headline-md text-headline-md text-primary mb-4">Education</h3>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-body-lg text-body-lg font-bold">{selectedCandidate.education}</h4>
                        <p className="text-primary font-medium">{selectedCandidate.college}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs bg-surface-container px-2.5 py-1 rounded font-bold">CGPA: {selectedCandidate.cgpa}</span>
                      </div>
                    </div>
                  </section>

                  {/* Personal Projects */}
                  {selectedCandidate.personalProjects.length > 0 && (
                    <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant space-y-4">
                      <h3 className="font-headline-md text-headline-md text-primary">Personal Projects</h3>
                      <div className="space-y-4">
                        {selectedCandidate.personalProjects.map((project, idx) => (
                          <div key={idx} className="rounded-xl overflow-hidden border border-outline-variant">
                            <div className="w-full h-36 bg-surface-dim overflow-hidden">
                              <img className="w-full h-full object-cover" alt={project.title} src={project.imageUrl} />
                            </div>
                            <div className="p-4 space-y-1">
                              <h5 className="font-bold text-sm text-on-surface">{project.title}</h5>
                              <p className="text-xs text-secondary leading-relaxed">{project.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Preferred Target Roles */}
                  <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant space-y-3">
                    <h3 className="font-headline-md text-headline-md text-primary">Preferred / Target Roles</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCandidate.preferredTargetRoles.map((role, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-violet-50 text-violet-800 border border-violet-200 rounded-lg text-xs font-semibold">
                          {role}
                        </span>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-outline-variant/40">
                      <p className="text-xs uppercase font-bold text-slate-500 mb-2">Verified Skills / Evidence</p>
                      <div className="space-y-1">
                        {selectedCandidate.verifiedSkillsEvidence.map((ev, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs">
                            <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            <span className="text-on-surface font-medium">{ev}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </div>

                {/* Right Column: Recruiter Brief, Strengths, Risks & Interview checks */}
                <div className="col-span-12 lg:col-span-4 space-y-6">
                  
                  {/* Hiring Brief */}
                  <section className="bg-primary text-on-primary rounded-xl p-6 shadow-md">
                    <h3 className="font-headline-md text-headline-md mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined">assignment_ind</span>
                      Recruiter Hiring Brief
                    </h3>
                    <div className="space-y-4 text-sm leading-relaxed text-on-primary-container">
                      <p>{selectedCandidate.recruiterHiringBrief}</p>
                      <div>
                        <h5 className="font-bold text-white uppercase text-xs tracking-wider mb-2">Top Evidence-Based Reasons to Hire / Key Hiring Reasons</h5>
                        <ul className="list-disc pl-4 space-y-1.5 text-xs text-blue-100">
                          {selectedCandidate.topEvidenceBasedReasonsToHire.map((reason, idx) => (
                            <li key={idx}>{reason}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Strengths & Detailed Evaluation */}
                  <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant space-y-4">
                    <h4 className="font-headline-md text-headline-md text-primary">Detailed Evaluation</h4>
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-xs uppercase font-bold text-outline mb-1">Top Strengths</h5>
                        <p className="text-xs text-secondary leading-relaxed">{selectedCandidate.topStrengths.join(', ')}</p>
                      </div>
                      <div>
                        <h5 className="text-xs uppercase font-bold text-outline mb-1">Areas for Improvement</h5>
                        <p className="text-xs text-secondary leading-relaxed">{selectedCandidate.areasForImprovement.join(', ')}</p>
                      </div>
                      <div>
                        <h5 className="text-xs uppercase font-bold text-outline mb-1">Potential Risks to Verify</h5>
                        <p className="text-xs text-secondary leading-relaxed">{selectedCandidate.potentialRisksToVerify.join(', ')}</p>
                      </div>
                    </div>
                  </section>

                  {/* Hackathons & Challenges — Structured Cards */}
                  <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant space-y-4">
                    <h4 className="font-headline-md text-headline-md text-primary">Hackathons & Challenges</h4>

                    {/* Hackathons */}
                    {selectedCandidate.hackathons.length > 0 && (
                      <div>
                        <p className="text-xs uppercase font-bold text-slate-500 mb-2">Hackathons</p>
                        <div className="space-y-2">
                          {selectedCandidate.hackathons.map((h, idx) => (
                            <div key={idx} className="p-3 rounded-xl bg-violet-50 border border-violet-100 space-y-1">
                              <div className="flex items-center justify-between gap-2 flex-wrap">
                                <span className="text-xs font-bold text-violet-900">{h.name}</span>
                                <div className="flex items-center gap-1.5">
                                  <span className="px-2 py-0.5 bg-violet-600 text-white rounded-full text-[10px] font-bold">{h.result}</span>
                                  <span className="text-[10px] font-semibold text-slate-500">{h.year}</span>
                                </div>
                              </div>
                              <p className="text-[11px] text-slate-600 leading-relaxed">{h.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Challenges */}
                    {selectedCandidate.challenges.length > 0 && (
                      <div>
                        <p className="text-xs uppercase font-bold text-slate-500 mb-2">Challenges Completed</p>
                        <div className="space-y-1.5">
                          {selectedCandidate.challenges.map((c, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2.5 bg-surface-container-low rounded-lg">
                              <div className="flex flex-col">
                                <span className="text-xs font-semibold text-on-surface">{c.name}</span>
                                <span className="text-[10px] text-slate-500">{c.year}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono font-bold text-primary">{c.score}</span>
                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">{c.result}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Coding Activity Stats */}
                    <div>
                      <p className="text-xs uppercase font-bold text-slate-500 mb-2">Coding Activity</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex justify-between items-center p-2.5 bg-surface-container-low rounded-lg text-xs font-semibold">
                          <span>LeetZ Prompts</span>
                          <span className="text-primary font-mono font-bold">{selectedCandidate.leetzPromptsCompleted}</span>
                        </div>
                        <div className="flex justify-between items-center p-2.5 bg-surface-container-low rounded-lg text-xs font-semibold">
                          <span>CodeQuest</span>
                          <span className="text-primary font-mono font-bold">{selectedCandidate.codeQuestCompleted}</span>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Interview Preparation */}
                  <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant space-y-3">
                    <h4 className="font-headline-md text-headline-md text-primary">Interview Validation</h4>
                    <div className="flex items-center gap-2 p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
                      <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                      </svg>
                      <span className="text-xs font-bold text-emerald-800">{selectedCandidate.interviewReadiness}</span>
                    </div>
                    <div>
                      <p className="text-xs uppercase font-bold text-slate-500 mb-2">Interview Areas to Verify</p>
                      <div className="space-y-1.5">
                        {selectedCandidate.interviewAreasToVerify.map((area, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs p-2 bg-amber-50 rounded-lg border border-amber-100">
                            <svg className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                            </svg>
                            <span className="text-amber-900 font-medium">{area}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Best Suited Roles */}
                  {selectedCandidate.bestSuitedRoles && selectedCandidate.bestSuitedRoles.length > 0 && (
                    <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant space-y-3">
                      <h4 className="font-headline-md text-headline-md text-primary">Best Suited Roles</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCandidate.bestSuitedRoles.map((role, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-primary/8 text-primary border border-primary/20 rounded-lg text-xs font-semibold">
                            {role}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Verified Skills Evidence */}
                  {selectedCandidate.verifiedSkillsEvidence && selectedCandidate.verifiedSkillsEvidence.length > 0 && (
                    <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant space-y-3">
                      <h4 className="font-headline-md text-headline-md text-primary">Verified Evidence</h4>
                      <div className="space-y-1.5">
                        {selectedCandidate.verifiedSkillsEvidence.map((ev, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 p-2 rounded-lg bg-emerald-50/60 border border-emerald-100">
                            <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                            <span className="text-xs font-semibold text-emerald-900">{ev}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

