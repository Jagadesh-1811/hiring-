'use client';

import React, { useState } from 'react';

export const SidebarFilters = ({ onFilterChange }) => {
  const [openSections, setOpenSections] = useState({
    core: true,
    tech: false,
    recruiter: false,
    ai: false,
    capability: false,
    employment: false,
  });

  const [selectedRole, setSelectedRole] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [verifiedSkillsOnly, setVerifiedSkillsOnly] = useState(false);
  const [experienceLevel, setExperienceLevel] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [noticePeriod, setNoticePeriod] = useState('');
  const [salary, setSalary] = useState('');
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [availability, setAvailability] = useState('');
  const [companyTier, setCompanyTier] = useState('');
  const [education, setEducation] = useState('');
  const [minAiScore, setMinAiScore] = useState('');
  const [rankingPercentile, setRankingPercentile] = useState('');
  const [hackathonOnly, setHackathonOnly] = useState(false);
  const [deployedOnly, setDeployedOnly] = useState(false);
  const [codeQuests, setCodeQuests] = useState('');
  const [leetZPrompts, setLeetZPrompts] = useState('');
  const [projectsCompleted, setProjectsCompleted] = useState('');
  const [capabilityScores, setCapabilityScores] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [employmentType, setEmploymentType] = useState('');
  const [mobility, setMobility] = useState([]);
  const [culturePreferences, setCulturePreferences] = useState([]);
  const [cgpaCutoff, setCgpaCutoff] = useState('');

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleClearAll = () => {
    setSelectedRole('');
    setSelectedSkills([]);
    setVerifiedSkillsOnly(false);
    setExperienceLevel('');
    setLocationInput('');
    setWorkMode('');
    setNoticePeriod('');
    setSalary('');
    setSelectedTechs([]);
    setAvailability('');
    setCompanyTier('');
    setEducation('');
    setMinAiScore('');
    setRankingPercentile('');
    setHackathonOnly(false);
    setDeployedOnly(false);
    setCodeQuests('');
    setLeetZPrompts('');
    setProjectsCompleted('');
    setCapabilityScores([]);
    setProfiles([]);
    setEmploymentType('');
    setMobility([]);
    setCulturePreferences([]);
    setCgpaCutoff('');
  };

  const toggleArrayItem = (setter, item) => {
    setter((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
  };

  return (
    <aside className="w-full lg:w-72 shrink-0 bg-white rounded-2xl p-5 border border-violet-100 shadow-sm flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div>
          <h2 className="font-extrabold text-sm text-gray-900 font-heading">Recruiter Filters</h2>
          <p className="text-[11px] text-gray-500 font-medium">Candidate Specifications</p>
        </div>
        <button
          onClick={handleClearAll}
          className="text-xs font-bold text-violet-600 hover:text-violet-900 transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-3">
        {/* SECTION 1: CORE SPECS */}
        <div className="border border-gray-100 rounded-xl overflow-hidden bg-slate-50/50">
          <button
            onClick={() => toggleSection('core')}
            className="w-full px-3.5 py-2.5 font-bold text-xs text-gray-900 flex items-center justify-between text-left hover:bg-slate-100/60 transition-colors"
          >
            <span>CORE SPECS</span>
            <span className="text-violet-600 text-xs font-mono">{openSections.core ? '−' : '+'}</span>
          </button>
          {openSections.core && (
            <div className="p-3.5 space-y-4 bg-white border-t border-gray-100 text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">Target Role</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {['AI / ML Engineer', 'Backend', 'Full Stack', 'Platform Eng.'].map((r) => (
                    <button
                      key={r}
                      onClick={() => setSelectedRole(selectedRole === r ? '' : r)}
                      className={`px-2 py-1.5 rounded-lg text-center font-semibold text-xs transition-all border ${
                        selectedRole === r
                          ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                          : 'bg-slate-50 hover:bg-violet-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[10px] font-bold uppercase text-gray-400">Skills & Stack</label>
                  <label htmlFor="verified-skills-only" className="flex items-center gap-1 cursor-pointer text-[10px] text-gray-600 font-bold">
                    <input
                      id="verified-skills-only"
                      name="verifiedSkillsOnly"
                      type="checkbox"
                      checked={verifiedSkillsOnly}
                      onChange={(e) => setVerifiedSkillsOnly(e.target.checked)}
                      className="accent-violet-600 rounded"
                    />
                    <span>Verified Only</span>
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {['Python', 'FastAPI', 'LangChain', 'React', 'TypeScript', 'Go', 'Docker', 'PyTorch'].map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleArrayItem(setSelectedSkills, s)}
                      className={`px-2 py-1.5 rounded-lg text-center font-semibold text-xs transition-all border ${
                        selectedSkills.includes(s)
                          ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                          : 'bg-slate-50 hover:bg-violet-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">Years of Experience</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['0-2 Yrs', '3-5 Yrs', '6+ Yrs'].map((e) => (
                    <button
                      key={e}
                      onClick={() => setExperienceLevel(experienceLevel === e ? '' : e)}
                      className={`px-2 py-1.5 rounded-lg text-center font-semibold text-xs transition-all border ${
                        experienceLevel === e
                          ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                          : 'bg-slate-50 hover:bg-violet-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">Location & Remote</label>
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  placeholder="e.g. Bengaluru, Remote..."
                  className="w-full px-3 py-1.5 mb-2 rounded-lg border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-violet-600"
                />
                <div className="grid grid-cols-2 gap-1.5">
                  {['Remote Only', 'Hybrid'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setWorkMode(workMode === m ? '' : m)}
                      className={`px-2 py-1.5 rounded-lg text-center font-semibold text-xs transition-all border ${
                        workMode === m
                          ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                          : 'bg-slate-50 hover:bg-violet-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">Notice Period</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['Immediate', '≤15 Days', '≤30 Days'].map((n) => (
                    <button
                      key={n}
                      onClick={() => setNoticePeriod(noticePeriod === n ? '' : n)}
                      className={`px-1.5 py-1.5 rounded-lg text-center font-semibold text-xs transition-all border ${
                        noticePeriod === n
                          ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                          : 'bg-slate-50 hover:bg-violet-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">Salary Expectation (LPA)</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['< 20 LPA', '20-35 LPA', '35+ LPA'].map((sal) => (
                    <button
                      key={sal}
                      onClick={() => setSalary(salary === sal ? '' : sal)}
                      className={`px-1.5 py-1.5 rounded-lg text-center font-semibold text-xs transition-all border ${
                        salary === sal
                          ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                          : 'bg-slate-50 hover:bg-violet-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {sal}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2: TECH STACK */}
        <div className="border border-gray-100 rounded-xl overflow-hidden bg-slate-50/50">
          <button
            onClick={() => toggleSection('tech')}
            className="w-full px-3.5 py-2.5 font-bold text-xs text-gray-900 flex items-center justify-between text-left hover:bg-slate-100/60 transition-colors"
          >
            <span>TECH STACK</span>
            <span className="text-violet-600 text-xs font-mono">{openSections.tech ? '−' : '+'}</span>
          </button>
          {openSections.tech && (
            <div className="p-3.5 space-y-4 bg-white border-t border-gray-100 text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">AI / ML</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {['Python', 'PyTorch', 'LangChain', 'LlamaIndex', 'HuggingFace', 'vLLM'].map((t) => (
                    <button
                      key={t}
                      onClick={() => toggleArrayItem(setSelectedTechs, t)}
                      className={`px-2 py-1.5 rounded-lg text-center font-semibold text-xs transition-all border ${
                        selectedTechs.includes(t)
                          ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                          : 'bg-slate-50 hover:bg-violet-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">Backend & Infra</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {['FastAPI', 'Go', 'Kafka', 'Redis', 'gRPC', 'Docker', 'Kubernetes'].map((t) => (
                    <button
                      key={t}
                      onClick={() => toggleArrayItem(setSelectedTechs, t)}
                      className={`px-2 py-1.5 rounded-lg text-center font-semibold text-xs transition-all border ${
                        selectedTechs.includes(t)
                          ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                          : 'bg-slate-50 hover:bg-violet-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: RECRUITER STATUS */}
        <div className="border border-gray-100 rounded-xl overflow-hidden bg-slate-50/50">
          <button
            onClick={() => toggleSection('recruiter')}
            className="w-full px-3.5 py-2.5 font-bold text-xs text-gray-900 flex items-center justify-between text-left hover:bg-slate-100/60 transition-colors"
          >
            <span>RECRUITER STATUS</span>
            <span className="text-violet-600 text-xs font-mono">{openSections.recruiter ? '−' : '+'}</span>
          </button>
          {openSections.recruiter && (
            <div className="p-3.5 space-y-4 bg-white border-t border-gray-100 text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">Availability Status</label>
                <div className="grid grid-cols-1 gap-1.5">
                  {['Open to Work', 'Open to Select Roles'].map((a) => (
                    <button
                      key={a}
                      onClick={() => setAvailability(availability === a ? '' : a)}
                      className={`px-2.5 py-1.5 rounded-lg text-center font-semibold text-xs transition-all border ${
                        availability === a
                          ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                          : 'bg-slate-50 hover:bg-violet-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">Company Experience</label>
                <div className="grid grid-cols-1 gap-1.5">
                  {['Tier-1 Tech / MAANG', 'High-Growth Unicorns'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setCompanyTier(companyTier === c ? '' : c)}
                      className={`px-2.5 py-1.5 rounded-lg text-center font-semibold text-xs transition-all border ${
                        companyTier === c
                          ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                          : 'bg-slate-50 hover:bg-violet-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 4: AI EVALUATION & RANKS */}
        <div className="border border-gray-100 rounded-xl overflow-hidden bg-slate-50/50">
          <button
            onClick={() => toggleSection('ai')}
            className="w-full px-3.5 py-2.5 font-bold text-xs text-gray-900 flex items-center justify-between text-left hover:bg-slate-100/60 transition-colors"
          >
            <span>AI EVALUATION & RANKS</span>
            <span className="text-violet-600 text-xs font-mono">{openSections.ai ? '−' : '+'}</span>
          </button>
          {openSections.ai && (
            <div className="p-3.5 space-y-4 bg-white border-t border-gray-100 text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">Min AI Hiring Score</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['90+ Score', '80+ Score', 'Any Score'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setMinAiScore(minAiScore === s ? '' : s)}
                      className={`px-2 py-1.5 rounded-lg text-center font-semibold text-xs transition-all border ${
                        minAiScore === s
                          ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                          : 'bg-slate-50 hover:bg-violet-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">Challenge Rank Percentile</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['Top 5%', 'Top 10%', 'Top 25%'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setRankingPercentile(rankingPercentile === p ? '' : p)}
                      className={`px-2 py-1.5 rounded-lg text-center font-semibold text-xs transition-all border ${
                        rankingPercentile === p
                          ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                          : 'bg-slate-50 hover:bg-violet-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 5: CAPABILITY & SCORES */}
        <div className="border border-gray-100 rounded-xl overflow-hidden bg-slate-50/50">
          <button
            onClick={() => toggleSection('capability')}
            className="w-full px-3.5 py-2.5 font-bold text-xs text-gray-900 flex items-center justify-between text-left hover:bg-slate-100/60 transition-colors"
          >
            <span>CAPABILITY & SCORES</span>
            <span className="text-violet-600 text-xs font-mono">{openSections.capability ? '−' : '+'}</span>
          </button>
          {openSections.capability && (
            <div className="p-3.5 space-y-4 bg-white border-t border-gray-100 text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">Min Projects Completed</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['5+ Projects', '3+ Projects', '1+ Project'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setProjectsCompleted(projectsCompleted === p ? '' : p)}
                      className={`px-1.5 py-1.5 rounded-lg text-center font-semibold text-xs transition-all border ${
                        projectsCompleted === p
                          ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                          : 'bg-slate-50 hover:bg-violet-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 6: EMPLOYMENT PREFERENCES */}
        <div className="border border-gray-100 rounded-xl overflow-hidden bg-slate-50/50">
          <button
            onClick={() => toggleSection('employment')}
            className="w-full px-3.5 py-2.5 font-bold text-xs text-gray-900 flex items-center justify-between text-left hover:bg-slate-100/60 transition-colors"
          >
            <span>EMPLOYMENT PREFERENCES</span>
            <span className="text-violet-600 text-xs font-mono">{openSections.employment ? '−' : '+'}</span>
          </button>
          {openSections.employment && (
            <div className="p-3.5 space-y-4 bg-white border-t border-gray-100 text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1.5">Employment Type</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['Full-time', 'Contract', 'Internship'].map((et) => (
                    <button
                      key={et}
                      onClick={() => setEmploymentType(employmentType === et ? '' : et)}
                      className={`px-1.5 py-1.5 rounded-lg text-center font-semibold text-xs transition-all border ${
                        employmentType === et
                          ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                          : 'bg-slate-50 hover:bg-violet-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {et}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </aside>
  );
};
