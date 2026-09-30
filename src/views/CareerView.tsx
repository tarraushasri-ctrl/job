import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CAREER_PATHS, INTERNSHIPS, JOBS } from '../data/mockData';
import { CareerPath } from '../types';
import { 
  Compass, 
  Search, 
  CheckCircle2, 
  Circle, 
  ExternalLink, 
  ArrowRight, 
  DollarSign, 
  TrendingUp, 
  Layers, 
  BookOpen, 
  X,
  Target,
  Briefcase
} from 'lucide-react';

export const CareerView: React.FC = () => {
  const { 
    selectedCareerId, 
    setSelectedCareerId, 
    activeStudent, 
    updateStudentProfile, 
    toggleMilestoneCompleted,
    setCurrentTab 
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCareerModal, setActiveCareerModal] = useState<CareerPath | null>(null);

  // If selectedCareerId was passed from another view, auto-open that career
  useEffect(() => {
    if (selectedCareerId) {
      const found = CAREER_PATHS.find(c => c.id === selectedCareerId);
      if (found) {
        setActiveCareerModal(found);
      }
    }
  }, [selectedCareerId]);

  const categories = ['All', 'Engineering', 'Data & AI', 'Design & Product', 'Security & Systems'];

  const filteredCareers = CAREER_PATHS.filter(career => {
    const matchesCategory = activeCategory === 'All' || career.category === activeCategory;
    const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.keySkills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      career.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenDetail = (career: CareerPath) => {
    setActiveCareerModal(career);
    setSelectedCareerId(career.id);
  };

  const handleCloseDetail = () => {
    setActiveCareerModal(null);
    setSelectedCareerId(null);
  };

  const handleSetTargetCareer = (careerId: string) => {
    updateStudentProfile({ targetCareerId: careerId });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <Compass className="w-4 h-4 text-slate-700" />
          <span>Career Guidance & Roadmaps</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Discover What Skills You Need for Your Dream Tech Role
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          Comprehensive step-by-step career roadmaps crafted by senior industry professionals. Track your learning milestones, master required skills, and explore verified courses.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        
        {/* Interactive Segmented Filter Controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter by title, skill (e.g. Python)..."
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-400"
          />
        </div>

      </div>

      {/* Career Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCareers.map((career) => {
          const isTarget = activeStudent.targetCareerId === career.id;
          
          // Calculate student milestone completion for this career
          const allMilestones = career.roadmapPhases.flatMap(p => p.milestones);
          const completedCount = allMilestones.filter(m => activeStudent.completedMilestoneIds.includes(m.id)).length;
          const progressPercent = Math.round((completedCount / (allMilestones.length || 1)) * 100);

          return (
            <div
              key={career.id}
              className={`bg-white rounded-xl border transition-all flex flex-col justify-between p-6 ${
                isTarget ? 'border-slate-900 ring-1 ring-slate-900 shadow-sm' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-4">
                
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs text-slate-500 font-medium">{career.category}</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5 leading-snug">{career.title}</h3>
                  </div>
                  {isTarget && (
                    <span className="text-[11px] font-semibold text-white bg-slate-900 px-2 py-0.5 rounded shrink-0">
                      Your Target
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {career.shortDescription}
                </p>

                {/* Progress bar if student has completed milestones */}
                {completedCount > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>Roadmap Progress</span>
                      <span className="font-mono font-medium">{progressPercent}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-slate-900 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Metrics */}
                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Fresher CTC:</span>
                    <span className="font-mono font-medium text-slate-900">{career.avgSalaryFresher}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Industry Demand:</span>
                    <span className="font-medium text-slate-800">{career.growthRate}</span>
                  </div>
                  <div className="flex items-start justify-between pt-1">
                    <span className="text-slate-500 shrink-0">Key Skills:</span>
                    <span className="text-slate-700 text-right truncate max-w-[170px]">
                      {career.keySkills.slice(0, 3).join(', ')}
                    </span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-6 space-y-2">
                <button
                  onClick={() => handleOpenDetail(career)}
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span>View Step-by-Step Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Detailed Interactive Roadmap Modal / Full View */}
      {activeCareerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div 
            className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-50/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{activeCareerModal.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{activeCareerModal.growthRate}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {activeCareerModal.title}
                </h2>
                <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                  {activeCareerModal.fullDescription}
                </p>
              </div>

              <button
                onClick={handleCloseDetail}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-6 space-y-8 text-xs">
              
              {/* Compensation & Target Setup Banner */}
              <div className="p-4 bg-slate-100 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Fresher Salary Range</span>
                    <span className="font-mono text-sm font-bold text-slate-900">{activeCareerModal.avgSalaryFresher}</span>
                  </div>
                  <div className="border-l border-slate-300 pl-6">
                    <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Experienced (3-5 Yrs)</span>
                    <span className="font-mono text-sm font-bold text-slate-900">{activeCareerModal.avgSalaryExperienced}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleSetTargetCareer(activeCareerModal.id)}
                  className={`px-4 py-2 rounded-lg font-semibold text-xs transition-colors flex items-center gap-2 ${
                    activeStudent.targetCareerId === activeCareerModal.id
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <Target className="w-4 h-4" />
                  <span>
                    {activeStudent.targetCareerId === activeCareerModal.id
                      ? 'Currently Your Target Career'
                      : 'Set as My Target Career'}
                  </span>
                </button>
              </div>

              {/* Required Core Skills */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-slate-700" />
                  <span>Required Skills & Tooling</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeCareerModal.keySkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-slate-100 text-slate-800 rounded-md font-medium text-xs border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Interactive Roadmap */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-slate-700" />
                    <span>Interactive Career Roadmap (Click Checkbox to Save Progress)</span>
                  </h4>
                  <span className="text-slate-500 text-[11px]">
                    Saved directly to your student dashboard
                  </span>
                </div>

                <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
                  {activeCareerModal.roadmapPhases.map((phase, pIdx) => (
                    <div key={pIdx} className="relative pl-8 space-y-3">
                      <div className="absolute left-1.5 top-0.5 w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">
                        {pIdx + 1}
                      </div>
                      
                      <div>
                        <h5 className="font-bold text-slate-900 text-xs">{phase.phase}</h5>
                        <p className="text-slate-500 text-[11px] mt-0.5">{phase.description}</p>
                      </div>

                      <div className="space-y-2">
                        {phase.milestones.map((milestone) => {
                          const isDone = activeStudent.completedMilestoneIds.includes(milestone.id);
                          return (
                            <div
                              key={milestone.id}
                              onClick={() => toggleMilestoneCompleted(milestone.id)}
                              className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                                isDone 
                                  ? 'bg-slate-50 border-slate-300 text-slate-500' 
                                  : 'bg-white border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <button 
                                className="mt-0.5 text-slate-700 hover:text-slate-900 shrink-0"
                                aria-label={isDone ? 'Mark milestone incomplete' : 'Mark milestone complete'}
                              >
                                {isDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                ) : (
                                  <Circle className="w-4 h-4 text-slate-300" />
                                )}
                              </button>
                              
                              <div className="space-y-1 flex-1">
                                <div className="flex items-center justify-between">
                                  <h6 className={`font-semibold ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                                    {milestone.title}
                                  </h6>
                                  <span className="text-[11px] text-slate-400 font-mono">
                                    ~{milestone.estimatedWeeks} wks
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-600 leading-relaxed">
                                  {milestone.description}
                                </p>
                                <p className="text-[11px] text-slate-500 pt-0.5">
                                  <span className="font-medium text-slate-700">Recommended resources:</span> {milestone.resources}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Courses & Free Certifications */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-slate-700" />
                  <span>Curated Recommended Courses & Certifications</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeCareerModal.recommendedCourses.map((course, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span>{course.platform}</span>
                          <span className="font-mono text-amber-700">★ {course.rating}</span>
                        </div>
                        <h6 className="font-semibold text-slate-900 text-xs">{course.title}</h6>
                        <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-1">
                          <span>{course.duration}</span>
                          <span>·</span>
                          <span>{course.level}</span>
                          <span>·</span>
                          <span className="font-medium text-emerald-700">{course.type}</span>
                        </div>
                      </div>

                      <div className="pt-3">
                        <a
                          href={course.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-900 hover:text-slate-700 underline"
                        >
                          <span>Open Course Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Matching Opportunities CTA */}
              <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-white text-xs">Ready to test your skills?</h5>
                  <p className="text-slate-300 text-[11px]">
                    Browse live student internships and fresher openings matching this career track.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      handleCloseDetail();
                      setCurrentTab('internships');
                    }}
                    className="px-3 py-1.5 bg-white text-slate-900 rounded-md font-semibold text-xs hover:bg-slate-100 transition-colors"
                  >
                    View Internships
                  </button>
                  <button
                    onClick={() => {
                      handleCloseDetail();
                      setCurrentTab('jobs');
                    }}
                    className="px-3 py-1.5 bg-slate-800 text-white rounded-md font-semibold text-xs hover:bg-slate-700 transition-colors"
                  >
                    View Jobs
                  </button>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200 flex justify-end bg-slate-50">
              <button
                onClick={handleCloseDetail}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Close Roadmap
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
