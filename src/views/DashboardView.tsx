import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CAREER_PATHS, INTERNSHIPS, JOBS, SKILL_MODULES } from '../data/mockData';
import { JobApplication, StudentProfile } from '../types';
import { 
  LayoutDashboard, 
  Briefcase, 
  Bookmark, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Compass, 
  Sparkles, 
  Users, 
  Award, 
  Trash2, 
  Edit3, 
  X, 
  Save, 
  ArrowRight,
  MapPin,
  ExternalLink
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { 
    activeStudent, 
    updateStudentProfile, 
    updateApplicationStatus, 
    toggleSaveInternship, 
    toggleSaveJob, 
    toggleMilestoneCompleted,
    applyToOpportunity,
    setCurrentTab,
    setSelectedCareerId 
  } = useApp();

  const [activeDashboardTab, setActiveDashboardTab] = useState<'applications' | 'saved' | 'roadmap' | 'mentorships'>('applications');
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [profileForm, setProfileForm] = useState<StudentProfile>(activeStudent);

  // Find target career object
  const targetCareer = CAREER_PATHS.find(c => c.id === activeStudent.targetCareerId) || CAREER_PATHS[0];

  // Calculate Roadmap completion
  const allMilestones = targetCareer.roadmapPhases.flatMap(p => p.milestones);
  const completedMilestonesCount = allMilestones.filter(m => activeStudent.completedMilestoneIds.includes(m.id)).length;
  const roadmapPercent = Math.round((completedMilestonesCount / (allMilestones.length || 1)) * 100);

  // Saved items
  const savedInternshipsList = INTERNSHIPS.filter(i => activeStudent.savedInternshipIds.includes(i.id));
  const savedJobsList = JOBS.filter(j => activeStudent.savedJobIds.includes(j.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentProfile({
      name: profileForm.name,
      college: profileForm.college,
      degree: profileForm.degree,
      major: profileForm.major,
      graduationYear: profileForm.graduationYear,
      cgpa: Number(profileForm.cgpa),
      targetCareerId: profileForm.targetCareerId,
      headline: profileForm.headline,
    });
    setEditProfileOpen(false);
  };

  const handleOpenCareer = (careerId: string) => {
    setSelectedCareerId(careerId);
    setCurrentTab('careers');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Student Profile Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white font-bold text-2xl flex items-center justify-center shrink-0 shadow-md">
              {activeStudent.name.charAt(0)}
            </div>
            
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{activeStudent.name}</h1>
                <span className="text-xs bg-slate-100 text-slate-800 font-semibold px-2.5 py-0.5 rounded-full">
                  Batch {activeStudent.graduationYear}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {activeStudent.degree} · <span className="text-slate-800">{activeStudent.college}</span>
              </p>
              <p className="text-xs text-slate-500">
                {activeStudent.headline}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setProfileForm(activeStudent);
                setEditProfileOpen(true);
              }}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
            <button
              onClick={() => setCurrentTab('resume')}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              View & Print Resume →
            </button>
          </div>

        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Target Career Path</span>
            <span className="font-bold text-slate-900 truncate block text-sm mt-0.5">{targetCareer.title}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Roadmap Completion</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-mono font-bold text-sm text-slate-900">{roadmapPercent}%</span>
              <span className="text-[11px] text-slate-500">({completedMilestonesCount}/{allMilestones.length})</span>
            </div>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Active Applications</span>
            <span className="font-mono font-bold text-sm text-slate-900 mt-0.5 block">{activeStudent.applications.length} submitted</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Academic CGPA</span>
            <span className="font-mono font-bold text-sm text-emerald-700 mt-0.5 block">{activeStudent.cgpa} / 10.0</span>
          </div>
        </div>

      </div>

      {/* Dashboard Subtabs Navigation */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto text-xs font-medium">
        <button
          onClick={() => setActiveDashboardTab('applications')}
          className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeDashboardTab === 'applications' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Applications Tracker ({activeStudent.applications.length})</span>
        </button>
        <button
          onClick={() => setActiveDashboardTab('saved')}
          className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeDashboardTab === 'saved' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Opportunities ({savedInternshipsList.length + savedJobsList.length})</span>
        </button>
        <button
          onClick={() => setActiveDashboardTab('roadmap')}
          className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeDashboardTab === 'roadmap' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>My Career Roadmap ({roadmapPercent}%)</span>
        </button>
        <button
          onClick={() => setActiveDashboardTab('mentorships')}
          className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeDashboardTab === 'mentorships' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Booked Sessions ({activeStudent.bookedMentorships.length})</span>
        </button>
      </div>

      {/* Tab 1: Applications Tracker */}
      {activeDashboardTab === 'applications' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Tracking status for internships and fresher placements</span>
            <button
              onClick={() => setCurrentTab('internships')}
              className="text-slate-900 font-semibold hover:underline"
            >
              Browse more opportunities →
            </button>
          </div>

          {activeStudent.applications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeStudent.applications.map((app) => {
                const statusColors = {
                  'Applied': 'bg-slate-100 text-slate-800 border-slate-200',
                  'Screening': 'bg-sky-50 text-sky-800 border-sky-200',
                  'Interview Scheduled': 'bg-amber-50 text-amber-900 border-amber-300 font-semibold',
                  'Offer Received': 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold',
                };

                return (
                  <div
                    key={app.id}
                    className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3 text-xs flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                          {app.type === 'internship' ? 'Internship' : 'Fresher Job'}
                        </span>
                        
                        {/* Status selector */}
                        <select
                          value={app.status}
                          onChange={(e) => updateApplicationStatus(app.id, e.target.value as JobApplication['status'])}
                          className={`text-[11px] px-2 py-0.5 rounded border ${statusColors[app.status]} focus:outline-none`}
                        >
                          <option value="Applied">Applied</option>
                          <option value="Screening">Screening</option>
                          <option value="Interview Scheduled">Interview Scheduled</option>
                          <option value="Offer Received">Offer Received</option>
                        </select>
                      </div>

                      <h4 className="font-bold text-slate-900 text-sm leading-snug">{app.title}</h4>
                      <p className="text-slate-600 font-medium">{app.company} · {app.location}</p>

                      <div className="text-[11px] text-slate-500 pt-1 space-y-1">
                        <p>Package/Stipend: <strong className="font-mono text-slate-800">{app.stipendOrSalary}</strong></p>
                        <p>Applied Date: <span className="font-mono">{app.appliedDate}</span></p>
                      </div>

                      {app.notes && (
                        <div className="p-2.5 bg-slate-50 rounded-lg text-[11px] text-slate-600 leading-relaxed border border-slate-100">
                          <span className="font-semibold text-slate-700 block mb-0.5">Notes:</span>
                          {app.notes}
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Ref: #{app.id}</span>
                      <span className="text-emerald-700 font-medium">Resume Attached</span>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center text-slate-500 bg-white rounded-xl border border-slate-200 space-y-3">
              <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-800">No applications submitted yet</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Explore remote/in-office internships or fresher placements and apply with 1 click.
              </p>
              <button
                onClick={() => setCurrentTab('internships')}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                Browse Internships
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Saved Opportunities */}
      {activeDashboardTab === 'saved' && (
        <div className="space-y-6">
          
          {/* Saved Internships */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Saved Internships ({savedInternshipsList.length})</h3>
            {savedInternshipsList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedInternshipsList.map((i) => (
                  <div key={i.id} className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{i.title}</h4>
                          <p className="text-slate-600 font-medium">{i.company} · {i.workMode}</p>
                        </div>
                        <button
                          onClick={() => toggleSaveInternship(i.id)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 mt-2 text-[11px]">
                        <span className="font-mono font-medium text-slate-900">{i.stipend}</span>
                        <span>·</span>
                        <span>{i.duration}</span>
                        <span>·</span>
                        <span>Deadline: {i.deadline}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">{i.skillsRequired.slice(0, 2).join(' · ')}</span>
                      <button
                        onClick={() => applyToOpportunity(i, 'internship')}
                        className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No saved internships.</p>
            )}
          </div>

          {/* Saved Jobs */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">Saved Fresher Jobs ({savedJobsList.length})</h3>
            {savedJobsList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedJobsList.map((j) => (
                  <div key={j.id} className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{j.title}</h4>
                          <p className="text-slate-600 font-medium">{j.company} · {j.location}</p>
                        </div>
                        <button
                          onClick={() => toggleSaveJob(j.id)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 mt-2 text-[11px]">
                        <span className="font-mono font-medium text-slate-900">{j.ctc}</span>
                        <span>·</span>
                        <span>Batch: {j.eligibleBatches.join(', ')}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">{j.skillsRequired.slice(0, 2).join(' · ')}</span>
                      <button
                        onClick={() => applyToOpportunity(j, 'job')}
                        className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No saved jobs.</p>
            )}
          </div>

        </div>
      )}

      {/* Tab 3: Target Career Roadmap Milestones */}
      {activeDashboardTab === 'roadmap' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Target Roadmap</span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">{targetCareer.title}</h3>
              <p className="text-slate-600 mt-0.5">{targetCareer.shortDescription}</p>
            </div>
            
            <button
              onClick={() => handleOpenCareer(targetCareer.id)}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg font-semibold text-slate-800 flex items-center gap-1.5 self-start"
            >
              <span>Explore Full Guidance</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-6">
            {targetCareer.roadmapPhases.map((phase, pIdx) => (
              <div key={pIdx} className="space-y-3">
                <h4 className="font-bold text-slate-900 text-xs flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center font-mono">
                    {pIdx + 1}
                  </span>
                  <span>{phase.phase}</span>
                </h4>

                <div className="space-y-2 pl-7">
                  {phase.milestones.map((m) => {
                    const isDone = activeStudent.completedMilestoneIds.includes(m.id);

                    return (
                      <div
                        key={m.id}
                        onClick={() => toggleMilestoneCompleted(m.id)}
                        className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                          isDone ? 'bg-slate-50 border-slate-300 text-slate-500' : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isDone}
                          onChange={() => {}} // handled by parent onClick
                          className="mt-0.5 rounded text-slate-900 focus:ring-0 cursor-pointer"
                        />
                        <div className="flex-1 space-y-0.5">
                          <div className="flex items-center justify-between">
                            <span className={`font-semibold ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                              {m.title}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">~{m.estimatedWeeks} wks</span>
                          </div>
                          <p className="text-[11px] text-slate-600">{m.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Booked Mentorship Sessions */}
      {activeDashboardTab === 'mentorships' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Upcoming 1-on-1 career guidance & mock interview sessions</span>
            <button
              onClick={() => setCurrentTab('mentors')}
              className="text-slate-900 font-semibold hover:underline"
            >
              Book another mentor →
            </button>
          </div>

          {activeStudent.bookedMentorships.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeStudent.bookedMentorships.map((bm) => (
                <div key={bm.id} className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3 text-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400 uppercase font-semibold">1-on-1 Guidance Session</span>
                      <h4 className="font-bold text-slate-900 text-base mt-0.5">{bm.topic}</h4>
                      <p className="text-slate-600 font-medium">with {bm.mentorName} ({bm.mentorCompany})</p>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[11px] font-semibold">
                      Confirmed
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg space-y-1 text-[11px] text-slate-600">
                    <p className="flex items-center gap-1.5 font-medium text-slate-900">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{bm.timeSlot}</span>
                    </p>
                    {bm.note && (
                      <p className="pt-1 text-slate-500 italic">"{bm.note}"</p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">Virtual Google Meet link</span>
                    <button
                      onClick={() => alert(`Meeting link for ${bm.mentorName}: https://meet.google.com/ais-${bm.id.slice(-6)}`)}
                      className="text-xs font-semibold text-slate-900 underline hover:text-slate-700"
                    >
                      Join Meeting Link
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-slate-500 bg-white rounded-xl border border-slate-200 space-y-3">
              <Users className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-800">No mentorship sessions scheduled</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Connect with senior engineers and product designers from Google, AWS, Microsoft, and Swiggy for free advice.
              </p>
              <button
                onClick={() => setCurrentTab('mentors')}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                Find a Mentor
              </button>
            </div>
          )}
        </div>
      )}

      {/* Edit Profile Modal */}
      {editProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div 
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-200 flex items-start justify-between bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900">Edit Student Profile</h3>
              <button onClick={() => setEditProfileOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="p-6 space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">University / College</label>
                  <input
                    type="text"
                    value={profileForm.college}
                    onChange={(e) => setProfileForm({ ...profileForm, college: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Degree Program</label>
                  <input
                    type="text"
                    value={profileForm.degree}
                    onChange={(e) => setProfileForm({ ...profileForm, degree: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">CGPA (out of 10.0)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={profileForm.cgpa}
                    onChange={(e) => setProfileForm({ ...profileForm, cgpa: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Graduation Batch Year</label>
                  <input
                    type="text"
                    value={profileForm.graduationYear}
                    onChange={(e) => setProfileForm({ ...profileForm, graduationYear: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Target Career Track</label>
                <select
                  value={profileForm.targetCareerId}
                  onChange={(e) => setProfileForm({ ...profileForm, targetCareerId: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                >
                  {CAREER_PATHS.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Professional Headline / Bio</label>
                <textarea
                  rows={2}
                  value={profileForm.headline}
                  onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditProfileOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
