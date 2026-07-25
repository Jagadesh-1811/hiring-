'use client';

import React, { useState, useMemo } from 'react';
import { mockCandidates } from '../data/mockCandidates.js';
import { Header } from '../components/Header.jsx';
import { CandidateCard } from '../components/CandidateCard.jsx';
import { CandidateModal } from '../components/CandidateModal.jsx';
import { SidebarFilters } from '../components/SidebarFilters.jsx';

export default function Home() {
  const [candidates, setCandidates] = useState(mockCandidates);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Domains');
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState('all');
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const categories = [
    'All Domains',
    'Full-Stack Engineering & AI Systems',
    'Backend & Distributed Systems',
    'Frontend & Creative Design Engineering',
    'UI/UX Specs & Color Grading',
    'High Throughput Express APIs'
  ];

  const handleToggleSave = (id, e) => {
    if (e) e.stopPropagation();
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isSaved: !c.isSaved } : c))
    );
    if (selectedCandidate && selectedCandidate.id === id) {
      setSelectedCandidate((prev) => (prev ? { ...prev, isSaved: !prev.isSaved } : null));
    }
  };

  const handleToggleShortlist = (id, e) => {
    if (e) e.stopPropagation();
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isShortlisted: !c.isShortlisted } : c))
    );
    if (selectedCandidate && selectedCandidate.id === id) {
      setSelectedCandidate((prev) => (prev ? { ...prev, isShortlisted: !prev.isShortlisted } : null));
    }
  };

  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      if (activeWorkspaceTab === 'saved' && !c.isSaved) return false;
      if (activeWorkspaceTab === 'shortlisted' && !c.isShortlisted) return false;
      if (activeWorkspaceTab === 'interview' && !c.isInterviewPlanned) return false;

      if (selectedCategory !== 'All Domains') {
        const matchesCategory =
          c.roleCategory.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          c.intelligenceCards.some((card) =>
            card.category.toLowerCase().includes(selectedCategory.toLowerCase())
          );
        if (!matchesCategory) return false;
      }

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = c.name.toLowerCase().includes(q);
        const matchesRole = c.currentRole.toLowerCase().includes(q);
        const matchesSkills = c.primaryTechSkills.some((s) => s.toLowerCase().includes(q));
        const matchesLocation = c.currentLocation.toLowerCase().includes(q);
        const matchesBio = c.candidateBio.toLowerCase().includes(q);

        return matchesName || matchesRole || matchesSkills || matchesLocation || matchesBio;
      }

      return true;
    });
  }, [candidates, searchQuery, selectedCategory, activeWorkspaceTab]);

  const savedCount = candidates.filter((c) => c.isSaved).length;
  const shortlistedCount = candidates.filter((c) => c.isShortlisted).length;
  const interviewCount = candidates.filter((c) => c.isInterviewPlanned).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        savedCount={savedCount}
        shortlistedCount={shortlistedCount}
        interviewCount={interviewCount}
        activeWorkspaceTab={activeWorkspaceTab}
        setActiveWorkspaceTab={setActiveWorkspaceTab}
      />

      <main className="flex-1 w-full px-4 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Leftmost Sticky Sidebar */}
          <div className="w-full lg:w-72 shrink-0 sticky top-20">
            <SidebarFilters />
          </div>

          {/* Right Main Content */}
          <div className="flex-1 w-full space-y-6">
            {/* Banner */}
            <div className="bg-gradient-to-r from-violet-900 via-indigo-900 to-purple-950 text-white rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
              <div className="max-w-2xl space-y-3 relative z-10">
                <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-violet-300 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                  Talent Search Engine
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold font-heading tracking-tight">
                  Discover Top 1% Verified Developer Profiles
                </h2>
                <p className="text-violet-200 text-xs md:text-sm font-medium leading-relaxed">
                  Explore candidate portfolios with builder scores, intelligence cards, location specs, and recruiter briefs. Click any card to inspect category specifications.
                </p>
              </div>
            </div>

            {/* Header Status */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-gray-900 text-base font-heading">
                  {activeWorkspaceTab === 'all' && 'All Talent Profiles'}
                  {activeWorkspaceTab === 'saved' && 'Saved Profiles'}
                  {activeWorkspaceTab === 'shortlisted' && 'Shortlisted Profiles'}
                  {activeWorkspaceTab === 'interview' && 'Interview Planned'}
                </h3>
                <span className="bg-violet-100 text-violet-800 font-extrabold text-xs px-2.5 py-0.5 rounded-full">
                  {filteredCandidates.length} Candidates
                </span>
              </div>
            </div>

            {/* Candidates Grid */}
            {filteredCandidates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCandidates.map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    onSelectCandidate={(c) => setSelectedCandidate(c)}
                    onToggleSave={handleToggleSave}
                    onToggleShortlist={handleToggleShortlist}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm space-y-3">
                <h4 className="text-base font-extrabold text-gray-900">No Candidates Match Your Filters</h4>
                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  Try adjusting your search query or selecting All Domains to explore candidate profiles.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All Domains');
                    setActiveWorkspaceTab('all');
                  }}
                  className="mt-2 px-4 py-2 bg-violet-600 text-white rounded-xl text-xs font-bold hover:bg-violet-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

        </div>
      </main>

      <CandidateModal
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        onToggleSave={(id) => handleToggleSave(id)}
        onToggleShortlist={(id) => handleToggleShortlist(id)}
      />

      <footer className="border-t border-gray-200 bg-white py-6 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 HiDevs Hiring Search Engine. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
