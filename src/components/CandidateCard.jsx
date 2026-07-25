'use client';

import React from 'react';

export const CandidateCard = ({
  candidate,
  onSelectCandidate,
  onToggleSave,
  onToggleShortlist,
}) => {
  return (
    <div
      onClick={() => onSelectCandidate(candidate)}
      className="bg-white rounded-2xl p-6 border border-violet-100 shadow-sm hover:shadow-xl hover:border-violet-400 transition-all duration-300 cursor-pointer flex flex-col justify-between group relative"
    >
      {/* Top Section */}
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <img
              src={candidate.avatar}
              alt={candidate.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-violet-100 shadow-sm group-hover:scale-105 transition-transform"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-gray-900 text-base group-hover:text-violet-700 transition-colors">
                  {candidate.name}
                </h3>
                {candidate.openToWork && (
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                    Open to Work
                  </span>
                )}
              </div>
              <p className="text-xs font-bold text-violet-600 mt-0.5">{candidate.currentRole}</p>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 font-medium">
                <span>{candidate.currentLocation}</span>
                <span>•</span>
                <span>{candidate.totalExperience}</span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => onToggleSave(candidate.id, e)}
              className={`p-2 rounded-xl text-xs font-bold transition-all ${
                candidate.isSaved
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'bg-slate-100 text-gray-600 hover:bg-violet-100 hover:text-violet-700'
              }`}
              title="Save Candidate"
            >
              Save
            </button>
            <button
              onClick={(e) => onToggleShortlist(candidate.id, e)}
              className={`p-2 rounded-xl text-xs font-bold transition-all ${
                candidate.isShortlisted
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-100 text-gray-600 hover:bg-emerald-100 hover:text-emerald-700'
              }`}
              title="Shortlist Candidate"
            >
              Shortlist
            </button>
          </div>
        </div>

        {/* AI Benchmark Cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-violet-50/80 p-3 rounded-xl border border-violet-100">
            <div className="flex items-center justify-between text-xs font-bold text-violet-900 mb-1">
              <span>HiDevs AI Score</span>
              <span className="text-violet-700 font-extrabold">{candidate.hiDevsAiScore}/100</span>
            </div>
            <div className="w-full bg-violet-200/60 h-2 rounded-full overflow-hidden">
              <div
                className="bg-violet-600 h-full rounded-full"
                style={{ width: `${candidate.hiDevsAiScore}%` }}
              />
            </div>
          </div>

          <div className="bg-purple-50/80 p-3 rounded-xl border border-purple-100">
            <div className="flex items-center justify-between text-xs font-bold text-purple-900 mb-1">
              <span>Builder Score</span>
              <span className="text-purple-700 font-extrabold">{candidate.builderScore}/100</span>
            </div>
            <div className="w-full bg-purple-200/60 h-2 rounded-full overflow-hidden">
              <div
                className="bg-purple-600 h-full rounded-full"
                style={{ width: `${candidate.builderScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tech Stack Breakdown */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-800">
            <span>Tech Stack Competency</span>
            <span className="text-[10px] text-gray-500 font-semibold">{candidate.techStack.length} Verified Skills</span>
          </div>
          <div className="space-y-1.5">
            {candidate.techStack.slice(0, 3).map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs font-medium text-gray-700">
                <span>{item.name}</span>
                <div className="flex items-center gap-2 w-1/2">
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-violet-600 h-full rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-gray-500 w-7 text-right">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Salary & Notice Period */}
      <div>
        <div className="pt-3 border-t border-violet-100 flex items-center justify-between text-xs font-semibold text-gray-600 mb-3">
          <div>
            <span className="text-gray-400 font-bold block text-[10px]">EXPECTED SALARY</span>
            <span className="text-gray-900 font-extrabold text-sm">{candidate.expectedSalary}</span>
          </div>
          <div className="text-right">
            <span className="text-gray-400 font-bold block text-[10px]">NOTICE PERIOD</span>
            <span className="text-violet-700 font-bold">{candidate.noticePeriod}</span>
          </div>
        </div>

        {/* Action CTA */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] font-bold text-violet-700 bg-violet-50 px-2.5 py-1 rounded-lg border border-violet-100">
            {candidate.keyHiringReasons[0]}
          </span>
          <button className="text-xs font-extrabold text-violet-600 group-hover:text-violet-800 transition-colors">
            View Full Profile →
          </button>
        </div>
      </div>
    </div>
  );
};
