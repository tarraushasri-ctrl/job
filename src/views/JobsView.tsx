import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { JOBS } from '../data/mockData';
import { Job } from '../types';
import { 
  GraduationCap, 
  Search, 
  Bookmark, 
  CheckCircle2, 
  Building2, 
  X, 
  Send,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export const JobsView: React.FC = () => {
  const { 
    activeStudent, 
    toggleSaveJob, 
    applyToOpportunity,
    setCurrentTab 
  } = useApp();

  const [batchFilter, setBatchFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [coverNote, setCoverNote] = useState('');

  const batches = ['All', '2024', '2025', '2026'];
  const categories = ['All', 'Engineering', 'Data & AI', 'Design & Product', 'Security & Systems'];

  const filteredJobs = JOBS.filter(job => {
    const matchesBatch = batchFilter === 'All' || job.eligibleBatches.includes(batchFilter);
    const matchesCategory = categoryFilter === 'All' || job.category === categoryFilter;
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skillsRequired.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBatch && matchesCategory && matchesSearch;
  });

  const handleOpenApplyModal = (job: Job) => {
    setSelectedJob(job);
    setApplyModalOpen(true);
    setCoverNote(`Hi Hiring Team at ${job.company},\n\nI am graduating in ${activeStudent.graduationYear} from ${activeStudent.college} (${activeStudent.degree}, ${activeStudent.cgpa} CGPA). I have built full-stack production projects and practiced algorithmic problem solving matching ${job.title}. Looking forward to discussing how I can contribute.`);
  };

  const handleConfirmApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    const success = applyToOpportunity(selectedJob, 'job', coverNote);
    if (success) {
      setApplyModalOpen(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <GraduationCap className="w-4 h-4 text-slate-700" />
          <span>Fresher Job Openings</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Campus & Off-Campus Entry-Level Placements
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          High-growth full-time engineering, data, design, and systems roles tailored for college freshers. Direct application routing and eligibility verifications.
        </p>
      </div>

      {/* Filter Card */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
        
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by job title, company (e.g. Atlassian, Groww, PhonePe), or tech skills..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-400"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-t border-slate-100">
          
          {/* Batch Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Graduation Batch:</span>
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto">
              {batches.map((batch) => (
                <button
                  key={batch}
                  onClick={() => setBatchFilter(batch)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    batchFilter === batch
                      ? 'bg-white text-slate-900 shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {batch === 'All' ? 'All Batches' : `${batch} Batch`}
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

      {/* Listing Meta */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Showing {filteredJobs.length} fresher job listings</span>
        <span className="flex items-center gap-1 text-slate-700">
          Your Profile CGPA: <strong className="font-mono">{activeStudent.cgpa}</strong> ({activeStudent.graduationYear} Batch)
        </span>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => {
          const isSaved = activeStudent.savedJobIds.includes(job.id);
          const hasApplied = activeStudent.applications.some(a => a.opportunityId === job.id);
          const isEligibleCgpa = activeStudent.cgpa >= job.minCgpa;

          return (
            <div
              key={job.id}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-start justify-between gap-6"
            >
              {/* Left Column: Job Spec */}
              <div className="space-y-4 flex-1">
                
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-slate-800">{job.company}</span>
                      <span aria-hidden="true">·</span>
                      <span>{job.location}</span>
                      <span aria-hidden="true">·</span>
                      <span>{job.workMode}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">{job.title}</h3>
                  </div>

                  <button
                    onClick={() => toggleSaveJob(job.id)}
                    className={`p-2 rounded-lg border transition-colors ${
                      isSaved 
                        ? 'bg-slate-900 text-white border-slate-900' 
                        : 'text-slate-400 hover:text-slate-700 border-slate-200'
                    }`}
                    title={isSaved ? 'Remove from saved' : 'Save job'}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {job.description}
                </p>

                {/* Key Numbers Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Salary Package (CTC)</span>
                    <span className="font-mono font-bold text-slate-900">{job.ctc}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Eligible Batches</span>
                    <span className="font-medium text-slate-800">{job.eligibleBatches.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Min. CGPA Criteria</span>
                    <span className={`font-mono font-semibold ${isEligibleCgpa ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {job.minCgpa} CGPA {isEligibleCgpa ? '(Eligible)' : '(Criteria Gap)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Degrees Accepted</span>
                    <span className="font-medium text-slate-700 truncate block">{job.degreesEligible.slice(0, 2).join(', ')}</span>
                  </div>
                </div>

                {/* Skills & Responsibilities */}
                <div className="space-y-2 text-xs">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-slate-500 font-medium mr-1">Required Skills:</span>
                    {job.skillsRequired.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="pt-1">
                    <span className="font-semibold text-slate-700">Key Responsibilities:</span>
                    <ul className="list-disc list-inside text-slate-600 text-[11px] mt-1 space-y-0.5">
                      {job.responsibilities.slice(0, 2).map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

              {/* Right Column: Apply CTA */}
              <div className="md:w-48 shrink-0 flex flex-col justify-between h-full pt-2 md:pt-0">
                <div className="space-y-2">
                  {hasApplied ? (
                    <div className="w-full py-2.5 px-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg text-center flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Application Active</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleOpenApplyModal(job)}
                      className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
                    >
                      Apply for Fresher Role
                    </button>
                  )}
                  <p className="text-[11px] text-slate-400 text-center">
                    Direct track with university profile
                  </p>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {filteredJobs.length === 0 && (
        <div className="py-16 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
          <p className="text-sm font-semibold text-slate-800">No jobs found matching your criteria</p>
          <p className="text-xs text-slate-400 mt-1">Try selecting "All Batches" or checking different domains</p>
          <button
            onClick={() => {
              setBatchFilter('All');
              setCategoryFilter('All');
              setSearchTerm('');
            }}
            className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-medium"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Apply Modal */}
      {applyModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div 
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-50">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Fresher Job Application</span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">{selectedJob.title}</h3>
                <p className="text-xs text-slate-600">{selectedJob.company} · {selectedJob.ctc} · {selectedJob.location}</p>
              </div>
              <button
                onClick={() => setApplyModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmApply} className="p-6 space-y-4 text-xs">
              
              <div className="p-3 bg-slate-100 rounded-lg space-y-1">
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Candidate Profile Summary:</span>
                <p className="font-semibold text-slate-900 text-sm">{activeStudent.name}</p>
                <p className="text-slate-600">{activeStudent.degree} · {activeStudent.college}</p>
                <p className="text-slate-500 text-[11px]">
                  CGPA: <strong className="font-mono text-slate-800">{activeStudent.cgpa}</strong> · Batch: <strong className="text-slate-800">{activeStudent.graduationYear}</strong>
                </p>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Why are you a good fit for this role?
                </label>
                <textarea
                  rows={4}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-slate-400 font-sans"
                  required
                />
              </div>

              <div className="p-3 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800 block">Candidate Resume:</span>
                  <span className="text-slate-500 text-[11px]">{activeStudent.name}_Resume_Clean.pdf</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setApplyModalOpen(false);
                    setCurrentTab('resume');
                  }}
                  className="text-[11px] text-slate-700 underline font-medium hover:text-slate-900"
                >
                  Preview Resume
                </button>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setApplyModalOpen(false)}
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
