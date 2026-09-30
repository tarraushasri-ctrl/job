import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CAREER_PATHS, INTERNSHIPS, JOBS, SKILL_MODULES, MENTORS } from '../data/mockData';
import { Search, X, Compass, Briefcase, GraduationCap, Sparkles, Users, ArrowRight } from 'lucide-react';

interface UniversalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UniversalSearchModal: React.FC<UniversalSearchModalProps> = ({ isOpen, onClose }) => {
  const { setCurrentTab, setSelectedCareerId } = useApp();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedCareers = q ? CAREER_PATHS.filter(c => 
    c.title.toLowerCase().includes(q) || 
    c.keySkills.some(s => s.toLowerCase().includes(q)) ||
    c.shortDescription.toLowerCase().includes(q)
  ) : CAREER_PATHS.slice(0, 3);

  const matchedInternships = q ? INTERNSHIPS.filter(i => 
    i.title.toLowerCase().includes(q) || 
    i.company.toLowerCase().includes(q) || 
    i.skillsRequired.some(s => s.toLowerCase().includes(q)) ||
    i.location.toLowerCase().includes(q)
  ) : INTERNSHIPS.slice(0, 2);

  const matchedJobs = q ? JOBS.filter(j => 
    j.title.toLowerCase().includes(q) || 
    j.company.toLowerCase().includes(q) || 
    j.skillsRequired.some(s => s.toLowerCase().includes(q))
  ) : JOBS.slice(0, 2);

  const matchedSkills = q ? SKILL_MODULES.filter(s => 
    s.title.toLowerCase().includes(q) || 
    s.keyTopics.some(t => t.toLowerCase().includes(q))
  ) : SKILL_MODULES.slice(0, 2);

  const matchedMentors = q ? MENTORS.filter(m => 
    m.name.toLowerCase().includes(q) || 
    m.company.toLowerCase().includes(q) || 
    m.domains.some(d => d.toLowerCase().includes(q))
  ) : [];

  const handleSelectCareer = (careerId: string) => {
    setSelectedCareerId(careerId);
    setCurrentTab('careers');
    onClose();
  };

  const handleSelectInternship = () => {
    setCurrentTab('internships');
    onClose();
  };

  const handleSelectJob = () => {
    setCurrentTab('jobs');
    onClose();
  };

  const handleSelectSkill = () => {
    setCurrentTab('skills');
    onClose();
  };

  const handleSelectMentor = () => {
    setCurrentTab('mentors');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header input */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search careers, skills, internships, fresher jobs, mentors..."
            className="w-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 px-1 py-0.5 rounded"
            >
              Clear
            </button>
          )}
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-4 space-y-5 text-xs">
          
          {/* Quick tags when empty */}
          {!q && (
            <div>
              <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-2">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['Remote Internships', 'Full Stack Developer', 'Data Analyst', 'DSA Prep', 'Google Mentor', 'ATS Resume', 'PPO Offered'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Careers Section */}
          {matchedCareers.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" /> Career Guidance & Roadmaps
                </span>
                <span className="text-[11px] text-slate-400">{matchedCareers.length} matches</span>
              </div>
              <div className="space-y-1.5">
                {matchedCareers.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelectCareer(c.id)}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="font-semibold text-slate-900 group-hover:text-slate-800 text-sm">
                        {c.title}
                      </h4>
                      <p className="text-slate-500 text-[11px] line-clamp-1 mt-0.5">
                        {c.keySkills.slice(0, 4).join(' · ')}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Internships Section */}
          {matchedInternships.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" /> Student Internships
                </span>
                <span className="text-[11px] text-slate-400">{matchedInternships.length} matches</span>
              </div>
              <div className="space-y-1.5">
                {matchedInternships.map((i) => (
                  <button
                    key={i.id}
                    onClick={handleSelectInternship}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-medium text-slate-900 text-sm flex items-center gap-2">
                        <span>{i.title}</span>
                        <span className="text-slate-400 font-normal">at {i.company}</span>
                      </div>
                      <div className="text-slate-500 text-[11px] mt-0.5 flex items-center gap-2">
                        <span>{i.workMode}</span>
                        <span>·</span>
                        <span className="font-mono tabular-nums">{i.stipend}</span>
                        <span>·</span>
                        <span>{i.duration}</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded">
                      Apply
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Fresher Jobs Section */}
          {matchedJobs.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" /> Fresher Campus Jobs
                </span>
                <span className="text-[11px] text-slate-400">{matchedJobs.length} matches</span>
              </div>
              <div className="space-y-1.5">
                {matchedJobs.map((j) => (
                  <button
                    key={j.id}
                    onClick={handleSelectJob}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-medium text-slate-900 text-sm">
                        {j.title} <span className="text-slate-400 font-normal">({j.company})</span>
                      </div>
                      <div className="text-slate-500 text-[11px] mt-0.5 flex items-center gap-2">
                        <span className="font-mono tabular-nums font-medium text-slate-800">{j.ctc}</span>
                        <span>·</span>
                        <span>Batches: {j.eligibleBatches.join(', ')}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Skill Modules Section */}
          {matchedSkills.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Skill Development & Tests
                </span>
              </div>
              <div className="space-y-1.5">
                {matchedSkills.map((s) => (
                  <button
                    key={s.id}
                    onClick={handleSelectSkill}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <span className="font-medium text-slate-900">{s.title}</span>
                      <p className="text-slate-500 text-[11px]">{s.category} · {s.estimatedHours} hrs</p>
                    </div>
                    <span className="text-[11px] text-slate-600 font-medium">Practice →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mentors Section */}
          {matchedMentors.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Industry Mentors
                </span>
              </div>
              <div className="space-y-1.5">
                {matchedMentors.map((m) => (
                  <button
                    key={m.id}
                    onClick={handleSelectMentor}
                    className="w-full text-left p-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <span className="font-medium text-slate-900">{m.name}</span>
                      <p className="text-slate-500 text-[11px]">{m.role} @ {m.company}</p>
                    </div>
                    <span className="text-[11px] text-slate-600 font-medium">Book 1:1 →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {q && matchedCareers.length === 0 && matchedInternships.length === 0 && matchedJobs.length === 0 && (
            <div className="py-8 text-center text-slate-500">
              <p className="text-sm font-medium">No results found for "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for generic terms like "React", "SQL", "Remote", or "Fresher"</p>
            </div>
          )}

        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>Press <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded font-mono text-[10px]">Esc</kbd> to close</span>
          </div>
          <div>
            <span>Career Connect Search</span>
          </div>
        </div>

      </div>
    </div>
  );
};
