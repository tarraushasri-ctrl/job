import React from 'react';
import { useApp } from '../context/AppContext';
import { CAREER_PATHS, INTERNSHIPS, JOBS, MENTORS } from '../data/mockData';
import { 
  Search, 
  ArrowRight, 
  Compass, 
  Briefcase, 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  Bookmark, 
  Clock, 
  Building2,
  Users,
  Award
} from 'lucide-react';

export const HomeView: React.FC<{ onOpenSearch: () => void }> = ({ onOpenSearch }) => {
  const { 
    setCurrentTab, 
    setSelectedCareerId, 
    toggleSaveInternship, 
    toggleSaveJob, 
    activeStudent, 
    applyToOpportunity 
  } = useApp();

  const handleExploreCareer = (careerId: string) => {
    setSelectedCareerId(careerId);
    setCurrentTab('careers');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const heroImageSrc = '/src/assets/images/hero_students_collaboration_1790762253159.jpg';

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Mission & Search */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Connecting 50,000+ Students with Verified Career Paths & Opportunities</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
                Connecting Students with Their Future.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Discover what skills you need for your dream career and get guided step-by-step from foundational learning to building skills, landing internships, and cracking fresher placements.
              </p>

              {/* Interactive Universal Search Bar */}
              <div className="pt-2">
                <div 
                  onClick={onOpenSearch}
                  className="cursor-pointer flex items-center bg-slate-50 hover:bg-slate-100/80 border border-slate-300 rounded-xl p-2 transition-all shadow-sm max-w-xl group"
                >
                  <Search className="w-5 h-5 text-slate-400 ml-2 mr-3 group-hover:text-slate-700 transition-colors" />
                  <span className="text-sm text-slate-400 flex-1 truncate">
                    Search careers, skills, internships (WFH/Office), fresher jobs...
                  </span>
                  <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold whitespace-nowrap transition-colors">
                    Find Opportunities
                  </button>
                </div>

                {/* Popular Pills */}
                <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-500">
                  <span className="font-medium text-slate-400">Quick explore:</span>
                  <button onClick={() => handleExploreCareer('software-engineer')} className="hover:text-slate-900 underline decoration-slate-300">Software Engineer</button>
                  <span aria-hidden="true">·</span>
                  <button onClick={() => handleExploreCareer('data-analyst')} className="hover:text-slate-900 underline decoration-slate-300">Data Analyst</button>
                  <span aria-hidden="true">·</span>
                  <button onClick={() => setCurrentTab('internships')} className="hover:text-slate-900 underline decoration-slate-300">Remote Internships</button>
                  <span aria-hidden="true">·</span>
                  <button onClick={() => setCurrentTab('quiz')} className="hover:text-slate-900 font-semibold text-slate-800 underline decoration-slate-300">Career Quiz</button>
                </div>
              </div>

              {/* Proof Metric Adjacency */}
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-100 text-left">
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-slate-900 font-mono tabular-nums">8+ Paths</p>
                  <p className="text-xs text-slate-500 mt-0.5">Comprehensive Tech Roadmaps</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-slate-900 font-mono tabular-nums">₹35k/mo</p>
                  <p className="text-xs text-slate-500 mt-0.5">Avg. Internship Stipend</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-slate-900 font-mono tabular-nums">100% Free</p>
                  <p className="text-xs text-slate-500 mt-0.5">Student Tools & Resume Builder</p>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-[16/11] bg-slate-100">
                <img
                  src={heroImageSrc}
                  alt="College students collaborating on career roadmaps and technical projects"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-5">
                  <div className="text-white space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">The 4-Step Career Engine</p>
                    <p className="text-sm font-medium">From 1st Year Curiosity to High-Package Campus Placement</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The 4 Core Stages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Structured Guidance</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            How Career Connect Takes You Step-by-Step
          </h2>
          <p className="text-sm text-slate-600">
            No confusion, no guesswork. We provide a structured sequence from university entry to corporate hire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Step 1 */}
          <div 
            onClick={() => setCurrentTab('careers')}
            className="p-6 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">01. Explore Careers</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Understand roles like SDE, Data Analyst, AI Engineer, and Cloud DevOps with detailed skills, salary benchmarks, and milestones.
              </p>
            </div>
            <div className="pt-4 text-xs font-semibold text-slate-700 flex items-center gap-1 group-hover:gap-1.5 transition-all">
              <span>View 8+ Roadmaps</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Step 2 */}
          <div 
            onClick={() => setCurrentTab('skills')}
            className="p-6 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">02. Master Core Skills</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Practice DSA coding, aptitude reasoning, technical communication, and system design with interactive practice tests.
              </p>
            </div>
            <div className="pt-4 text-xs font-semibold text-slate-700 flex items-center gap-1 group-hover:gap-1.5 transition-all">
              <span>Start Practice Sandbox</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Step 3 */}
          <div 
            onClick={() => setCurrentTab('internships')}
            className="p-6 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">03. Secure Internships</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Find remote and in-office internships with transparent stipends, PPO potential, and 1-click application using your student profile.
              </p>
            </div>
            <div className="pt-4 text-xs font-semibold text-slate-700 flex items-center gap-1 group-hover:gap-1.5 transition-all">
              <span>Browse Internships</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Step 4 */}
          <div 
            onClick={() => setCurrentTab('jobs')}
            className="p-6 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">04. Land Fresher Jobs</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Target batch-specific campus and off-campus fresher opportunities from high-growth tech firms with ₹7 - 24 LPA CTC packages.
              </p>
            </div>
            <div className="pt-4 text-xs font-semibold text-slate-700 flex items-center gap-1 group-hover:gap-1.5 transition-all">
              <span>Explore Fresher Jobs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>
      </section>

      {/* Featured Career Roadmaps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Career Roadmaps</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Top In-Demand Career Paths
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Curated milestone roadmaps, required skills, and free courses
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('careers')}
            className="text-xs font-semibold text-slate-900 hover:text-slate-700 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View All 8 Career Paths</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAREER_PATHS.slice(0, 3).map((career) => (
            <div
              key={career.id}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 transition-all hover:shadow-sm"
            >
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>{career.category}</span>
                    <span className="font-mono">{career.demandLevel} Demand</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{career.title}</h3>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {career.shortDescription}
                </p>

                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Fresher CTC:</span>
                    <span className="font-mono font-medium text-slate-900">{career.avgSalaryFresher}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Key Skills:</span>
                    <span className="text-slate-700 truncate max-w-[170px] text-right font-medium">
                      {career.keySkills.slice(0, 3).join(', ')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => handleExploreCareer(career.id)}
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span>Explore Roadmap & Skills</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Career Quiz Recommendation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden border border-slate-800">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Smart Recommendation Engine</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              Unsure which career fits your interests? Take the 3-Minute Career Quiz.
            </h2>
            
            <p className="text-sm text-slate-300 leading-relaxed">
              Answer 6 quick questions about your favorite problem types, work style, and technical curiosities. Our algorithm matches you with the top 3 high-fit career paths and generates an immediate study plan.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setCurrentTab('quiz')}
                className="px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-100 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>Take Career Quiz Now</span>
                <ArrowRight className="w-4 h-4 text-slate-900" />
              </button>
              <span className="text-xs text-slate-400">
                Already taken by {activeStudent.quizResult ? 'you (View in Dashboard)' : '14,000+ students'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Fresh Opportunities: Internships & Jobs Side-by-Side */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Internships Column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Featured Internships</h3>
                <p className="text-xs text-slate-500">Stipend-backed opportunities for college students</p>
              </div>
              <button
                onClick={() => setCurrentTab('internships')}
                className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1"
              >
                <span>View all ({INTERNSHIPS.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {INTERNSHIPS.slice(0, 3).map((intern) => {
                const isSaved = activeStudent.savedInternshipIds.includes(intern.id);
                return (
                  <div
                    key={intern.id}
                    className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-slate-900 text-sm">{intern.title}</h4>
                          <p className="text-slate-600 font-medium">{intern.company}</p>
                        </div>
                        <button
                          onClick={() => toggleSaveInternship(intern.id)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            isSaved ? 'bg-slate-900 text-white border-slate-900' : 'text-slate-400 hover:text-slate-700 border-slate-200'
                          }`}
                          title={isSaved ? 'Saved' : 'Save internship'}
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-slate-500 mt-2">
                        <span>{intern.workMode}</span>
                        <span>·</span>
                        <span className="font-mono font-medium text-slate-900">{intern.stipend}</span>
                        <span>·</span>
                        <span>{intern.duration}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">
                        {intern.perks[0] || 'Certificate'}
                      </span>
                      <button
                        onClick={() => applyToOpportunity(intern, 'internship')}
                        className="px-3 py-1 bg-slate-900 text-white hover:bg-slate-800 rounded-md font-medium text-xs transition-colors"
                      >
                        Quick Apply
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Fresher Jobs Column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Fresher Campus Jobs</h3>
                <p className="text-xs text-slate-500">Entry-level opportunities for 2024, 2025 & 2026 batches</p>
              </div>
              <button
                onClick={() => setCurrentTab('jobs')}
                className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1"
              >
                <span>View all ({JOBS.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {JOBS.slice(0, 3).map((job) => {
                const isSaved = activeStudent.savedJobIds.includes(job.id);
                return (
                  <div
                    key={job.id}
                    className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-slate-900 text-sm">{job.title}</h4>
                          <p className="text-slate-600 font-medium">{job.company}</p>
                        </div>
                        <button
                          onClick={() => toggleSaveJob(job.id)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            isSaved ? 'bg-slate-900 text-white border-slate-900' : 'text-slate-400 hover:text-slate-700 border-slate-200'
                          }`}
                          title={isSaved ? 'Saved' : 'Save job'}
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-slate-500 mt-2">
                        <span className="font-mono font-medium text-slate-900">{job.ctc}</span>
                        <span>·</span>
                        <span>Batches: {job.eligibleBatches.join(', ')}</span>
                        <span>·</span>
                        <span>Min CGPA: {job.minCgpa}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 truncate max-w-[200px]">
                        {job.skillsRequired.slice(0, 2).join(' · ')}
                      </span>
                      <button
                        onClick={() => applyToOpportunity(job, 'job')}
                        className="px-3 py-1 bg-slate-900 text-white hover:bg-slate-800 rounded-md font-medium text-xs transition-colors"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* Free Resume Builder Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 rounded-2xl p-8 sm:p-10 border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Student Essential Tool</span>
            <h3 className="text-2xl font-bold text-slate-900">
              Build an ATS-Friendly Professional Resume in Minutes
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              No generic templates that get rejected by corporate applicant tracking systems. Use our live interactive resume builder with action-verb suggestions, quantifiable project bullets, and instant PDF download.
            </p>
            <div className="flex items-center gap-6 pt-2 text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Real-time ATS Score
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 3 Clean Tech Layouts
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> One-Click Print to PDF
              </span>
            </div>
          </div>
          <div className="md:col-span-4 flex justify-start md:justify-end">
            <button
              onClick={() => setCurrentTab('resume')}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-sm transition-all"
            >
              Open Free Resume Builder →
            </button>
          </div>
        </div>
      </section>

      {/* Mentor Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">1-on-1 Guidance</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Learn Directly from Industry Mentors
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Engineers and designers from Google, Amazon, Microsoft & Swiggy giving back to college students
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('mentors')}
            className="text-xs font-semibold text-slate-900 hover:text-slate-700 flex items-center gap-1.5"
          >
            <span>View All Mentors</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MENTORS.slice(0, 3).map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 transition-all text-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                    {mentor.avatarText}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{mentor.name}</h4>
                    <p className="text-slate-600">{mentor.role} @ <span className="font-semibold text-slate-800">{mentor.company}</span></p>
                  </div>
                </div>

                <p className="text-slate-600 line-clamp-2 leading-relaxed">
                  {mentor.bio}
                </p>

                <div className="text-[11px] text-slate-500 pt-1 flex items-center gap-2">
                  <span>Alumni: {mentor.alumniCollege}</span>
                  <span>·</span>
                  <span className="font-mono text-slate-800 font-medium">★ {mentor.rating}</span>
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-slate-500 text-[11px]">{mentor.sessionsCompleted} sessions held</span>
                <button
                  onClick={() => setCurrentTab('mentors')}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md font-semibold text-xs transition-colors"
                >
                  Book 1:1 Advice
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
