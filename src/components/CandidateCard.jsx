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
      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md hover:border-[#ddd6fe] transition-all duration-150 cursor-pointer flex flex-col justify-between group relative"
    >
      {/* Top Section */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3 min-w-0">
            <img
              src={candidate.avatar}
              alt={candidate.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-100 shadow-2xs shrink-0"
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <h3 className="font-bold text-[#111827] text-base group-hover:text-[#7c3aed] transition-colors leading-tight break-words">
                  {candidate.name}
                </h3>
                {candidate.openToWork && (
                  <span className="bg-[#059669]/10 text-[#059669] border border-[#059669]/30 text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0">
                    Open to Work
                  </span>
                )}
              </div>
              <p className="text-xs font-bold text-[#7c3aed] mt-0.5 truncate">{candidate.currentRole}</p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1 text-xs text-[#374151] font-medium">
                <span>{candidate.currentLocation}</span>
                <span>•</span>
                <span>{candidate.totalExperience}</span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => onToggleSave(candidate.id, e)}
              className={`p-2 rounded-xl text-xs font-bold transition-all ${
                candidate.isSaved
                  ? 'bg-[#7c3aed] text-white shadow-xs'
                  : 'bg-slate-100 text-[#374151] hover:bg-[#ddd6fe]/30 hover:text-[#7c3aed]'
              }`}
              title="Save Candidate"
            >
              Save
            </button>
            <button
              onClick={(e) => onToggleShortlist(candidate.id, e)}
              className={`p-2 rounded-xl text-xs font-bold transition-all ${
                candidate.isShortlisted
                  ? 'bg-[#059669] text-white shadow-xs'
                  : 'bg-slate-100 text-[#374151] hover:bg-[#059669]/10 hover:text-[#059669]'
              }`}
              title="Shortlist Candidate"
            >
              Shortlist
            </button>
          </div>
        </div>

        {/* AI Benchmark Cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-[#f8fafc] p-3 rounded-xl border border-[#e5e7eb] flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#374151]">HiDevs AI Score</span>
            <span className="text-[12px] font-black text-[#7c3aed] bg-[#ddd6fe]/30 px-2 py-0.5 rounded-md border border-[#ddd6fe]">{candidate.hiDevsAiScore}/100</span>
          </div>

          <div className="bg-[#f8fafc] p-3 rounded-xl border border-[#e5e7eb] flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#374151]">Builder Score</span>
            <span className="text-[12px] font-black text-[#7c3aed] bg-[#ddd6fe]/30 px-2 py-0.5 rounded-md border border-[#ddd6fe]">{candidate.builderScore}/100</span>
          </div>
        </div>

        {/* Tech Stack Breakdown - Clean Badges without Progress Bars */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#111827]">
            <span>Tech Stack Competency</span>
            <span className="text-[10px] text-[#374151] font-semibold">{candidate.techStack.length} Verified Skills</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {candidate.techStack.slice(0, 3).map((item) => (
              <span key={item.name} className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white text-[#374151] border border-[#e5e7eb]">
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Salary & Notice Period */}
      <div>
        <div className="pt-3 border-t border-[#e5e7eb] flex items-center justify-between text-xs font-semibold text-[#374151] mb-3">
          <div>
            <span className="text-[#374151] font-bold block text-[10px]">EXPECTED SALARY</span>
            <span className="text-[#111827] font-extrabold text-sm">{candidate.expectedSalary}</span>
          </div>
          <div className="text-right">
            <span className="text-[#374151] font-bold block text-[10px]">NOTICE PERIOD</span>
            <span className="text-[#7c3aed] font-bold">{candidate.noticePeriod}</span>
          </div>
        </div>

        {/* Action CTA */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] font-bold text-[#7c3aed] bg-[#ddd6fe]/30 px-2.5 py-1 rounded-lg border border-[#ddd6fe]">
            {candidate.keyHiringReasons[0]}
          </span>
          <button className="text-xs font-bold text-[#7c3aed] group-hover:text-[#111827] transition-colors">
            View Full Profile →
          </button>
        </div>
      </div>
    </div>
  );
};
