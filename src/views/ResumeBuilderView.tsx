import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ResumeData } from '../types';
import { DEFAULT_RESUME_DATA } from '../data/mockData';
import { 
  FileText, 
  Printer, 
  RotateCcw, 
  Download, 
  Sparkles, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  Edit3,
  ExternalLink
} from 'lucide-react';

type ResumeTemplate = 'modern' | 'classic' | 'compact';

export const ResumeBuilderView: React.FC = () => {
  const { resumeData, setResumeData, resetResumeData, showToast } = useApp();
  const [template, setTemplate] = useState<ResumeTemplate>('modern');
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');

  // Handle personal info changes
  const handlePersonalChange = (field: keyof ResumeData['personalInfo'], val: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: val },
    }));
  };

  // Education helpers
  const handleAddEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      school: 'University / Institute Name',
      degree: 'B.Tech / Bachelor Degree',
      fieldOfStudy: 'Computer Science',
      startYear: '2022',
      endYear: '2026',
      cgpa: '8.5 / 10.0',
      relevantCourses: 'Data Structures, DBMS, Operating Systems',
    };
    setResumeData(prev => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const handleUpdateEducation = (id: string, field: string, val: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(e => e.id === id ? { ...e, [field]: val } : e),
    }));
  };

  const handleRemoveEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id),
    }));
  };

  // Experience helpers
  const handleAddExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      title: 'Software Developer Intern',
      company: 'Tech Company / Startup',
      location: 'Remote',
      startDate: 'Jun 2024',
      endDate: 'Aug 2024',
      isCurrent: false,
      bullets: [
        'Built REST APIs using Node.js and PostgreSQL reducing data retrieval latency by 25%.',
        'Implemented responsive web dashboard using React and Tailwind CSS.',
      ],
    };
    setResumeData(prev => ({ ...prev, experience: [...prev.experience, newExp] }));
  };

  const handleUpdateExperience = (id: string, field: string, val: any) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === id ? { ...e, [field]: val } : e),
    }));
  };

  const handleRemoveExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(e => e.id !== id),
    }));
  };

  // Project helpers
  const handleAddProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      name: 'Project Title',
      techStack: 'React, TypeScript, Node.js, PostgreSQL',
      liveUrl: 'https://project-demo.com',
      githubUrl: 'https://github.com/student/project',
      description: 'Full-stack application solving campus challenges.',
      bullets: [
        'Engineered responsive web client and optimized API endpoints.',
        'Integrated database with Prisma ORM and deployed on cloud container.',
      ],
    };
    setResumeData(prev => ({ ...prev, projects: [...prev.projects, newProj] }));
  };

  const handleUpdateProject = (id: string, field: string, val: any) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, [field]: val } : p),
    }));
  };

  const handleRemoveProject = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id),
    }));
  };

  // Certification helpers
  const handleAddCert = () => {
    const newCert = {
      id: `cert-${Date.now()}`,
      title: 'Cloud Certified Practitioner',
      issuer: 'AWS / Google Cloud / Microsoft',
      year: '2024',
      credentialId: 'CERT-12345',
    };
    setResumeData(prev => ({ ...prev, certifications: [...prev.certifications, newCert] }));
  };

  const handleUpdateCert = (id: string, field: string, val: string) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map(c => c.id === id ? { ...c, [field]: val } : c),
    }));
  };

  const handleRemoveCert = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== id),
    }));
  };

  // ATS Score Calculation
  const atsAnalysis = useMemo(() => {
    let score = 0;
    const tips: string[] = [];

    // Contact completeness (20 pts)
    if (resumeData.personalInfo.fullName && resumeData.personalInfo.email && resumeData.personalInfo.phone) {
      score += 10;
    } else {
      tips.push('Provide full name, phone number, and professional email.');
    }

    if (resumeData.personalInfo.github || resumeData.personalInfo.linkedIn) {
      score += 10;
    } else {
      tips.push('Add a GitHub or LinkedIn profile link for tech recruiters.');
    }

    // Summary (10 pts)
    if (resumeData.personalInfo.summary.length > 50) {
      score += 10;
    } else {
      tips.push('Add a 2-3 sentence career summary highlighting your target role.');
    }

    // Education (15 pts)
    if (resumeData.education.length > 0 && resumeData.education[0].cgpa) {
      score += 15;
    } else {
      tips.push('Include your degree, institution, and CGPA.');
    }

    // Experience or Projects (25 pts)
    const totalBullets = [
      ...resumeData.experience.flatMap(e => e.bullets),
      ...resumeData.projects.flatMap(p => p.bullets),
    ];

    if (totalBullets.length >= 4) {
      score += 15;
    } else {
      tips.push('Add at least 4 detailed project or internship bullet points.');
    }

    // Numbers & Metrics check
    const hasQuantifiable = totalBullets.some(b => /\d+%|\d+x|\d+\+?|\d+k/i.test(b));
    if (hasQuantifiable) {
      score += 10;
    } else {
      tips.push('Quantify accomplishments with numbers (e.g., "reduced latency by 35%", "served 1,000+ users").');
    }

    // Action verbs check (15 pts)
    const actionVerbs = ['architected', 'engineered', 'built', 'developed', 'optimized', 'reduced', 'designed', 'implemented', 'scaled', 'created'];
    const hasActionVerbs = totalBullets.some(b => 
      actionVerbs.some(v => b.toLowerCase().includes(v))
    );
    if (hasActionVerbs) {
      score += 15;
    } else {
      tips.push('Lead bullet points with high-impact action verbs like Architected, Optimized, or Engineered.');
    }

    // Skills completeness (15 pts)
    if (resumeData.skills.languages && resumeData.skills.frameworks) {
      score += 15;
    } else {
      tips.push('Categorize skills into Programming Languages, Frameworks, and Tools.');
    }

    return { score: Math.min(100, score), tips };
  }, [resumeData]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported resume JSON file', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <FileText className="w-4 h-4 text-slate-700" />
            <span>Interactive Professional Resume Builder</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Build an ATS-Compliant Fresher Resume
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            Live real-time preview, ATS scoring analyzer, and formatted PDF export.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Template segmented button */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            {(['modern', 'classic', 'compact'] as ResumeTemplate[]).map((t) => (
              <button
                key={t}
                onClick={() => setTemplate(t)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md capitalize transition-colors ${
                  template === t ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print to PDF</span>
          </button>

          <button
            onClick={handleExportJson}
            className="p-2 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs"
            title="Export JSON Data"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={resetResumeData}
            className="p-2 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs"
            title="Reset to Sample Data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile view toggle */}
      <div className="lg:hidden flex items-center p-1 bg-slate-100 rounded-lg">
        <button
          onClick={() => setMobileTab('editor')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 ${
            mobileTab === 'editor' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Form</span>
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 ${
            mobileTab === 'preview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Live Preview ({atsAnalysis.score} ATS)</span>
        </button>
      </div>

      {/* Main Split-Screen Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Editor (Accordion Sections) */}
        <div className={`lg:col-span-6 space-y-4 ${mobileTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
          
          {/* ATS Score Meter */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" /> Real-time ATS Optimization Score
              </span>
              <span className="font-mono font-bold text-sm text-slate-900">{atsAnalysis.score} / 100</span>
            </div>

            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  atsAnalysis.score >= 80 ? 'bg-emerald-500' : atsAnalysis.score >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                }`}
                style={{ width: `${atsAnalysis.score}%` }}
              />
            </div>

            {atsAnalysis.tips.length > 0 && (
              <div className="pt-1 text-[11px] text-slate-500 space-y-1">
                <span className="font-semibold text-slate-700">Improvement Suggestion:</span>
                <p className="text-slate-600">· {atsAnalysis.tips[0]}</p>
              </div>
            )}
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg overflow-x-auto text-xs">
            {['personal', 'education', 'experience', 'projects', 'skills', 'certifications'].map((sec) => (
              <button
                key={sec}
                onClick={() => setActiveSection(sec)}
                className={`px-3 py-1.5 font-medium rounded-md capitalize transition-colors whitespace-nowrap ${
                  activeSection === sec ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          {/* Form Content Cards */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
            
            {/* Personal Info */}
            {activeSection === 'personal' && (
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
                  Contact Information & Summary
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.fullName}
                      onChange={(e) => handlePersonalChange('fullName', e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Professional Email</label>
                    <input
                      type="email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) => handlePersonalChange('email', e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) => handlePersonalChange('phone', e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Location (City, Country)</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.location}
                      onChange={(e) => handlePersonalChange('location', e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">LinkedIn URL</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.linkedIn}
                      onChange={(e) => handlePersonalChange('linkedIn', e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">GitHub URL</label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.github}
                      onChange={(e) => handlePersonalChange('github', e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Professional Summary</label>
                  <textarea
                    rows={4}
                    value={resumeData.personalInfo.summary}
                    onChange={(e) => handlePersonalChange('summary', e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 leading-relaxed"
                    placeholder="Brief 2-3 sentence overview of your technical background and career goals..."
                  />
                </div>
              </div>
            )}

            {/* Education */}
            {activeSection === 'education' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm">Education</h3>
                  <button
                    onClick={handleAddEducation}
                    className="text-xs text-slate-900 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add College
                  </button>
                </div>

                {resumeData.education.map((edu, idx) => (
                  <div key={edu.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 relative">
                    <button
                      onClick={() => handleRemoveEducation(edu.id)}
                      className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 p-1"
                      title="Delete education"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-6">
                      <div>
                        <label className="block text-slate-600 text-[11px] mb-1">Institution / University</label>
                        <input
                          type="text"
                          value={edu.school}
                          onChange={(e) => handleUpdateEducation(edu.id, 'school', e.target.value)}
                          className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 text-[11px] mb-1">Degree & Major</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleUpdateEducation(edu.id, 'degree', e.target.value)}
                          className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 text-[11px] mb-1">CGPA / Grade</label>
                        <input
                          type="text"
                          value={edu.cgpa}
                          onChange={(e) => handleUpdateEducation(edu.id, 'cgpa', e.target.value)}
                          className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs font-mono"
                        />
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="block text-slate-600 text-[11px] mb-1">Start Year</label>
                          <input
                            type="text"
                            value={edu.startYear}
                            onChange={(e) => handleUpdateEducation(edu.id, 'startYear', e.target.value)}
                            className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-slate-600 text-[11px] mb-1">Graduation Year</label>
                          <input
                            type="text"
                            value={edu.endYear}
                            onChange={(e) => handleUpdateEducation(edu.id, 'endYear', e.target.value)}
                            className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-600 text-[11px] mb-1">Key Relevant Coursework</label>
                      <input
                        type="text"
                        value={edu.relevantCourses}
                        onChange={(e) => handleUpdateEducation(edu.id, 'relevantCourses', e.target.value)}
                        className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Experience */}
            {activeSection === 'experience' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm">Internships & Work Experience</h3>
                  <button
                    onClick={handleAddExperience}
                    className="text-xs text-slate-900 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Role
                  </button>
                </div>

                {resumeData.experience.map((exp) => (
                  <div key={exp.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 relative">
                    <button
                      onClick={() => handleRemoveExperience(exp.id)}
                      className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 p-1"
                      title="Delete entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-6">
                      <div>
                        <label className="block text-slate-600 text-[11px] mb-1">Role Title</label>
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) => handleUpdateExperience(exp.id, 'title', e.target.value)}
                          className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 text-[11px] mb-1">Company & Location</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleUpdateExperience(exp.id, 'company', e.target.value)}
                          className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 text-[11px] mb-1">Start Date</label>
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => handleUpdateExperience(exp.id, 'startDate', e.target.value)}
                          className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 text-[11px] mb-1">End Date</label>
                        <input
                          type="text"
                          value={exp.endDate}
                          onChange={(e) => handleUpdateExperience(exp.id, 'endDate', e.target.value)}
                          className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-600 text-[11px] mb-1">Bullet Points (One per line)</label>
                      <textarea
                        rows={3}
                        value={exp.bullets.join('\n')}
                        onChange={(e) => handleUpdateExperience(exp.id, 'bullets', e.target.value.split('\n'))}
                        className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs leading-relaxed font-sans"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {activeSection === 'projects' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm">Personal & Academic Projects</h3>
                  <button
                    onClick={handleAddProject}
                    className="text-xs text-slate-900 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Project
                  </button>
                </div>

                {resumeData.projects.map((proj) => (
                  <div key={proj.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 relative">
                    <button
                      onClick={() => handleRemoveProject(proj.id)}
                      className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 p-1"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-6">
                      <div>
                        <label className="block text-slate-600 text-[11px] mb-1">Project Name</label>
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) => handleUpdateProject(proj.id, 'name', e.target.value)}
                          className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 text-[11px] mb-1">Technologies Used</label>
                        <input
                          type="text"
                          value={proj.techStack}
                          onChange={(e) => handleUpdateProject(proj.id, 'techStack', e.target.value)}
                          className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 text-[11px] mb-1">Live Demo URL</label>
                        <input
                          type="text"
                          value={proj.liveUrl}
                          onChange={(e) => handleUpdateProject(proj.id, 'liveUrl', e.target.value)}
                          className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 text-[11px] mb-1">GitHub Repo URL</label>
                        <input
                          type="text"
                          value={proj.githubUrl}
                          onChange={(e) => handleUpdateProject(proj.id, 'githubUrl', e.target.value)}
                          className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-600 text-[11px] mb-1">Project Impact Bullets (One per line)</label>
                      <textarea
                        rows={3}
                        value={proj.bullets.join('\n')}
                        onChange={(e) => handleUpdateProject(proj.id, 'bullets', e.target.value.split('\n'))}
                        className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {activeSection === 'skills' && (
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
                  Technical & Professional Skills
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-600 text-[11px] mb-1">Languages (e.g. C++, Java, Python, TypeScript)</label>
                    <input
                      type="text"
                      value={resumeData.skills.languages}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        skills: { ...prev.skills, languages: e.target.value },
                      }))}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 text-[11px] mb-1">Frameworks & Libraries (e.g. React, Node.js, Spring Boot)</label>
                    <input
                      type="text"
                      value={resumeData.skills.frameworks}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        skills: { ...prev.skills, frameworks: e.target.value },
                      }))}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 text-[11px] mb-1">Developer Tools & Databases (e.g. Git, Docker, PostgreSQL, AWS)</label>
                    <input
                      type="text"
                      value={resumeData.skills.developerTools}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        skills: { ...prev.skills, developerTools: e.target.value },
                      }))}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 text-[11px] mb-1">Soft Skills & Methodologies (e.g. Agile Scrum, System Design)</label>
                    <input
                      type="text"
                      value={resumeData.skills.softSkills}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        skills: { ...prev.skills, softSkills: e.target.value },
                      }))}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Certifications */}
            {activeSection === 'certifications' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm">Certifications</h3>
                  <button
                    onClick={handleAddCert}
                    className="text-xs text-slate-900 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Certification
                  </button>
                </div>

                {resumeData.certifications.map((c) => (
                  <div key={c.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3 relative">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={c.title}
                        onChange={(e) => handleUpdateCert(c.id, 'title', e.target.value)}
                        placeholder="Certificate Title"
                        className="p-1.5 bg-white border border-slate-200 rounded text-xs"
                      />
                      <input
                        type="text"
                        value={c.issuer}
                        onChange={(e) => handleUpdateCert(c.id, 'issuer', e.target.value)}
                        placeholder="Issuing Organization"
                        className="p-1.5 bg-white border border-slate-200 rounded text-xs"
                      />
                      <input
                        type="text"
                        value={c.year}
                        onChange={(e) => handleUpdateCert(c.id, 'year', e.target.value)}
                        placeholder="Year"
                        className="p-1.5 bg-white border border-slate-200 rounded text-xs font-mono"
                      />
                    </div>
                    <button
                      onClick={() => handleRemoveCert(c.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Live Formatted Resume Canvas (Printable Target) */}
        <div className={`lg:col-span-6 ${mobileTab === 'editor' ? 'hidden lg:block' : 'block'}`}>
          <div className="sticky top-20">
            <div className="text-[11px] text-slate-400 mb-2 flex items-center justify-between">
              <span>Preview Sheet (Ready for Applicant Tracking Systems)</span>
              <span>Font: Plus Jakarta Sans / Tabular Nums</span>
            </div>

            {/* Printable Resume Container */}
            <div 
              id="printable-resume" 
              className={`bg-white rounded-xl shadow-lg border border-slate-200 p-8 sm:p-10 transition-all font-sans text-slate-900 leading-normal ${
                template === 'classic' ? 'font-serif' : ''
              }`}
            >
              
              {/* Header: Personal Info */}
              <div className="text-center pb-4 border-b border-slate-300 space-y-1">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 uppercase">
                  {resumeData.personalInfo.fullName || 'YOUR NAME'}
                </h1>
                
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600">
                  {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
                  {resumeData.personalInfo.phone && (
                    <>
                      <span>·</span>
                      <span className="font-mono">{resumeData.personalInfo.phone}</span>
                    </>
                  )}
                  {resumeData.personalInfo.email && (
                    <>
                      <span>·</span>
                      <span>{resumeData.personalInfo.email}</span>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-700 pt-0.5">
                  {resumeData.personalInfo.linkedIn && (
                    <span className="font-medium underline decoration-slate-300">{resumeData.personalInfo.linkedIn}</span>
                  )}
                  {resumeData.personalInfo.github && (
                    <span className="font-medium underline decoration-slate-300">{resumeData.personalInfo.github}</span>
                  )}
                </div>
              </div>

              {/* Summary */}
              {resumeData.personalInfo.summary && (
                <div className="pt-4 space-y-1">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">
                    Professional Summary
                  </h2>
                  <p className="text-xs text-slate-700 leading-relaxed pt-1">
                    {resumeData.personalInfo.summary}
                  </p>
                </div>
              )}

              {/* Education */}
              {resumeData.education.length > 0 && (
                <div className="pt-4 space-y-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">
                    Education
                  </h2>
                  {resumeData.education.map((edu) => (
                    <div key={edu.id} className="text-xs space-y-0.5">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>{edu.school}</span>
                        <span className="font-normal font-mono text-slate-600">{edu.startYear} – {edu.endYear}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-700">
                        <span>{edu.degree}</span>
                        {edu.cgpa && <span className="font-mono font-medium">CGPA: {edu.cgpa}</span>}
                      </div>
                      {edu.relevantCourses && (
                        <p className="text-[11px] text-slate-500">
                          <span className="font-semibold text-slate-600">Coursework:</span> {edu.relevantCourses}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Technical Skills */}
              <div className="pt-4 space-y-1.5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">
                  Technical Skills
                </h2>
                <div className="text-xs space-y-1 text-slate-700 pt-0.5">
                  {resumeData.skills.languages && (
                    <p><strong className="font-semibold text-slate-900">Languages:</strong> {resumeData.skills.languages}</p>
                  )}
                  {resumeData.skills.frameworks && (
                    <p><strong className="font-semibold text-slate-900">Frameworks:</strong> {resumeData.skills.frameworks}</p>
                  )}
                  {resumeData.skills.developerTools && (
                    <p><strong className="font-semibold text-slate-900">Developer Tools:</strong> {resumeData.skills.developerTools}</p>
                  )}
                </div>
              </div>

              {/* Projects */}
              {resumeData.projects.length > 0 && (
                <div className="pt-4 space-y-2.5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">
                    Projects
                  </h2>
                  {resumeData.projects.map((proj) => (
                    <div key={proj.id} className="text-xs space-y-1">
                      <div className="flex items-baseline justify-between">
                        <span className="font-bold text-slate-900">
                          {proj.name} <span className="font-normal text-slate-500 text-[11px]">| {proj.techStack}</span>
                        </span>
                        {proj.liveUrl && (
                          <span className="text-[10px] text-slate-500 underline font-mono truncate max-w-[120px]">{proj.liveUrl}</span>
                        )}
                      </div>
                      <ul className="list-disc list-inside text-[11px] text-slate-700 space-y-0.5 leading-relaxed">
                        {proj.bullets.filter(b => b.trim()).map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Experience / Internships */}
              {resumeData.experience.length > 0 && (
                <div className="pt-4 space-y-2.5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">
                    Experience & Internships
                  </h2>
                  {resumeData.experience.map((exp) => (
                    <div key={exp.id} className="text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>{exp.title} – {exp.company}</span>
                        <span className="font-normal font-mono text-slate-600 text-[11px]">{exp.startDate} – {exp.endDate}</span>
                      </div>
                      <ul className="list-disc list-inside text-[11px] text-slate-700 space-y-0.5 leading-relaxed">
                        {exp.bullets.filter(b => b.trim()).map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Certifications */}
              {resumeData.certifications.length > 0 && (
                <div className="pt-4 space-y-1.5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">
                    Certifications & Honors
                  </h2>
                  <div className="text-xs space-y-1 text-slate-700">
                    {resumeData.certifications.map((c) => (
                      <p key={c.id}>
                        <strong className="font-semibold text-slate-900">{c.title}</strong> – {c.issuer} ({c.year})
                      </p>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
