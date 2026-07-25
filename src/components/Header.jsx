'use client';

import React from 'react';
import DropdownMenu5 from './ui/dropdown-menu-05.jsx';

export const Header = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  savedCount,
  shortlistedCount,
  interviewCount,
  activeWorkspaceTab,
  setActiveWorkspaceTab,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-violet-100 px-3 py-3 shadow-sm">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Brand & Dropdown Domain Selector */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-purple-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-violet-500/20">
              H
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold tracking-tight text-gray-900 font-heading">
                  HiDevs <span className="text-violet-600">Search Engine</span>
                </h1>
              </div>
              <p className="text-[11px] text-gray-500 font-medium">Talent Marketplace & Candidate Intelligence Engine</p>
            </div>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="w-full md:max-w-md relative">
          <div className="relative flex items-center">
            <svg className="w-4 h-4 absolute left-3.5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <label htmlFor="search-candidates" className="sr-only">
              Search candidate profiles
            </label>
            <input
              id="search-candidates"
              name="searchQuery"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidate profiles, skills, roles, or locations..."
              aria-label="Search candidate profiles, skills, roles, or locations"
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-violet-200/80 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-600 text-xs text-gray-900 placeholder-gray-400 font-medium transition-all"
            />
          </div>
        </div>

        {/* Right: Workspace Quick Stats */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <button
            onClick={() => setActiveWorkspaceTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeWorkspaceTab === 'all'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
            }`}
          >
            All Candidates
          </button>
          
          <button
            onClick={() => setActiveWorkspaceTab('saved')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeWorkspaceTab === 'saved'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                : 'bg-white text-gray-700 hover:bg-violet-50 border border-violet-200/60'
            }`}
          >
            Saved ({savedCount})
          </button>

          <button
            onClick={() => setActiveWorkspaceTab('shortlisted')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeWorkspaceTab === 'shortlisted'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                : 'bg-white text-gray-700 hover:bg-violet-50 border border-violet-200/60'
            }`}
          >
            Shortlisted ({shortlistedCount})
          </button>

          <button
            onClick={() => setActiveWorkspaceTab('interview')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeWorkspaceTab === 'interview'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                : 'bg-white text-gray-700 hover:bg-violet-50 border border-violet-200/60'
            }`}
          >
            Interview ({interviewCount})
          </button>
        </div>

      </div>
    </header>
  );
};
