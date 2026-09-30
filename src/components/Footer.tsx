import React from 'react';
import { useApp } from '../context/AppContext';
import { NavigationTab } from '../types';

export const Footer: React.FC = () => {
  const { setCurrentTab } = useApp();

  const handleNav = (tab: NavigationTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white text-slate-900 flex items-center justify-center font-bold text-base">
                C
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Career Connect
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              A comprehensive student career platform guiding undergraduates from foundational learning and skill-building to verified internships, fresher placements, and industry mentorship.
            </p>
            <div className="text-xs text-slate-500 pt-2 space-y-1">
              <p>Built for college students, university placement cells, and early-career jobseekers.</p>
              <p>© 2026 Career Connect. Open education & student empowerment.</p>
            </div>
          </div>

          {/* Quick Guidance */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Guidance & Roadmaps
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNav('careers')} className="hover:text-white transition-colors">
                  Software Engineering Path
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('careers')} className="hover:text-white transition-colors">
                  Data Science & Analytics
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('careers')} className="hover:text-white transition-colors">
                  AI & Machine Learning
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('careers')} className="hover:text-white transition-colors">
                  Cloud & DevOps Systems
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('quiz')} className="text-slate-300 hover:text-white transition-colors font-medium">
                  Take Career Diagnostic Quiz →
                </button>
              </li>
            </ul>
          </div>

          {/* Opportunities */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Opportunities
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNav('internships')} className="hover:text-white transition-colors">
                  Remote & WFH Internships
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('internships')} className="hover:text-white transition-colors">
                  High-Stipend Tech Internships
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('jobs')} className="hover:text-white transition-colors">
                  Fresher Campus Jobs (2025/2026)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('skills')} className="hover:text-white transition-colors">
                  Placement Aptitude & Tests
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('dashboard')} className="hover:text-white transition-colors">
                  Student Application Tracker
                </button>
              </li>
            </ul>
          </div>

          {/* Tools & Mentors */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Student Tools
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNav('resume')} className="hover:text-white transition-colors">
                  ATS Resume Builder
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('mentors')} className="hover:text-white transition-colors">
                  1-on-1 Mentorship Sessions
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('mentors')} className="hover:text-white transition-colors">
                  Ask Career Questions Forum
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('skills')} className="hover:text-white transition-colors">
                  Interview STAR Framework
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Free for students worldwide</span>
            <span>·</span>
            <span>Zero recruitment commissions</span>
            <span>·</span>
            <span>Verified company listings</span>
          </div>
          <div>
            <span>Version 2.0 · Designed for Campus Placement Success</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
