import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INTERNSHIPS } from '../data/mockData';
import { Internship } from '../types';
import { 
  Briefcase, 
  Search, 
  Bookmark, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Building2, 
  Filter, 
  X, 
  Send,
  Sparkles
} from 'lucide-react';

export const InternshipsView: React.FC = () => {
  const { 
    activeStudent, 
    toggleSaveInternship, 
    applyToOpportunity,
    setCurrentTab 
  } = useApp();

  const [workModeFilter, setWorkModeFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const [applicationNote, setApplicationNote] = useState('');

  const workModes = ['All', 'Work From Home', 'In-Office', 'Hybrid'];
  const categories = ['All', 'Engineering', 'Data & AI', 'Design & Product', 'Security & Systems'];

  const filteredInternships = INTERNSHIPS.filter(intern => {
    const matchesMode = workModeFilter === 'All' || intern.workMode === workModeFilter;
    const matchesCategory = categoryFilter === 'All' || intern.category === categoryFilter;
    const matchesSearch = 
      intern.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.skillsRequired.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      intern.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesMode && matchesCategory && matchesSearch;
  });

  const handleOpenApplyModal = (internship: Internship) => {
    setSelectedInternship(internship);
    setApplicationModalOpen(true);
    setApplicationNote(`I am currently a student at ${activeStudent.college} (${activeStudent.degree}, CGPA: ${activeStudent.cgpa}). I am passionate about ${internship.category} and have hands-on projects matching your required skills.`);
  };

  const handleConfirmApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInternship) return;
    const success = applyToOpportunity(selectedInternship, 'internship', applicationNote);
    if (success) {
      setApplicationModalOpen(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <Briefcase className="w-4 h-4 text-slate-700" />
          <span>Student Internships Portal</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Gain Real-World Industry Experience with Verified Internships
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          Explore paid online (Work From Home) and in-office internships designed for university students. Transparent stipends, real responsibilities, and Pre-Placement Offer (PPO) pathways.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
        
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by role title, company (e.g. Razorpay, Zomato), skills, or location..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-400"
          />
        </div>

        {/* Segmented Controls for Work Mode and Category */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-t border-slate-100">
          
          {/* Work Mode Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Mode:</span>
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto">
              {workModes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => setWorkModeFilter(mode)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    workModeFilter === mode
                      ? 'bg-white text-slate-900 shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Domain:</span>
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    categoryFilter === cat
                      ? 'bg-white text-slate-900 shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Showing {filteredInternships.length} available internships</span>
        <span>All listings verified with placement guidelines</span>
      </div>

      {/* Internships List */}
      <div className="space-y-4">
        {filteredInternships.map((intern) => {
          const isSaved = activeStudent.savedInternshipIds.includes(intern.id);
          const hasApplied = activeStudent.applications.some(a => a.opportunityId === intern.id);

          return (
            <div
              key={intern.id}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-start justify-between gap-6"
            >
              {/* Left Column: Details */}
              <div className="space-y-4 flex-1">
                
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-slate-800">{intern.company}</span>
                      <span aria-hidden="true">·</span>
                      <span>{intern.location}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-medium text-slate-900">{intern.workMode}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">{intern.title}</h3>
                  </div>

                  <button
                    onClick={() => toggleSaveInternship(intern.id)}
                    className={`p-2 rounded-lg border transition-colors ${
                      isSaved 
                        ? 'bg-slate-900 text-white border-slate-900' 
                        : 'text-slate-400 hover:text-slate-700 border-slate-200'
                    }`}
                    title={isSaved ? 'Remove from saved' : 'Save internship'}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {intern.description}
                </p>

                {/* Key specs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Monthly Stipend</span>
                    <span className="font-mono font-bold text-slate-900">{intern.stipend}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Duration</span>
                    <span className="font-medium text-slate-800">{intern.duration}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Application Deadline</span>
                    <span className="font-medium text-slate-800">{intern.deadline}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Applicants</span>
                    <span className="font-mono text-slate-600">{intern.applicantsCount} applied</span>
                  </div>
                </div>

                {/* Eligibility & Skills */}
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-semibold text-slate-700">Eligibility:</span>{' '}
                    <span className="text-slate-600">{intern.eligibility}</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-slate-500 font-medium mr-1">Required Skills:</span>
                    {intern.skillsRequired.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-500">
                    <span className="font-medium text-slate-700">Perks:</span>
                    {intern.perks.map((p, idx) => (
                      <span key={idx} className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{p}</span>
                        {idx < intern.perks.length - 1 && <span className="text-slate-300">·</span>}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Application Button */}
              <div className="md:w-48 shrink-0 flex flex-col justify-between h-full pt-2 md:pt-0">
                <div className="space-y-2">
                  {hasApplied ? (
                    <div className="w-full py-2.5 px-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg text-center flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Already Applied</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleOpenApplyModal(intern)}
                      className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
                    >
                      Quick Apply Now
                    </button>
                  )}
                  <p className="text-[11px] text-slate-400 text-center">
                    Uses profile & built-in resume
                  </p>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {filteredInternships.length === 0 && (
        <div className="py-16 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
          <p className="text-sm font-semibold text-slate-800">No internships found matching your filters</p>
          <p className="text-xs text-slate-400 mt-1">Try resetting the work mode or search keyword</p>
          <button
            onClick={() => {
              setWorkModeFilter('All');
              setCategoryFilter('All');
              setSearchTerm('');
            }}
            className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-medium"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Application Drawer / Modal */}
      {applicationModalOpen && selectedInternship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div 
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-50">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Internship Application</span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">{selectedInternship.title}</h3>
                <p className="text-xs text-slate-600">{selectedInternship.company} · {selectedInternship.workMode} · {selectedInternship.stipend}</p>
              </div>
              <button
                onClick={() => setApplicationModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleConfirmApplication} className="p-6 space-y-4 text-xs">
              
              <div className="p-3 bg-slate-100 rounded-lg space-y-1">
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Applying as:</span>
                <p className="font-semibold text-slate-900 text-sm">{activeStudent.name}</p>
                <p className="text-slate-600">{activeStudent.degree} at {activeStudent.college}</p>
                <p className="text-slate-500 text-[11px]">CGPA: {activeStudent.cgpa} · Graduation: {activeStudent.graduationYear}</p>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Cover Note / Pitch to Recruiter:
                </label>
                <textarea
                  rows={4}
                  value={applicationNote}
                  onChange={(e) => setApplicationNote(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-slate-400"
                  required
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Highlight projects, hackathons, or coursework relevant to {selectedInternship.company}.
                </p>
              </div>

              <div className="p-3 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800 block">Attached Resume:</span>
                  <span className="text-slate-500 text-[11px]">{activeStudent.name}_Resume_ATS.pdf (Generated from Builder)</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setApplicationModalOpen(false);
                    setCurrentTab('resume');
                  }}
                  className="text-[11px] text-slate-700 underline font-medium hover:text-slate-900"
                >
                  Edit in Builder
                </button>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setApplicationModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Application</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
