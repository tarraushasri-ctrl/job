import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NavigationTab } from '../types';
import { DEMO_PROFILES } from '../data/mockData';
import { 
  Compass, 
  Briefcase, 
  GraduationCap, 
  FileText, 
  Users, 
  Sparkles, 
  LayoutDashboard,
  Search,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC<{ onOpenSearch: () => void }> = ({ onOpenSearch }) => {
  const { currentTab, setCurrentTab, activeStudent, switchProfile } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks: { id: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { id: 'careers', label: 'Careers', icon: <Compass className="w-4 h-4" /> },
    { id: 'internships', label: 'Internships', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'jobs', label: 'Jobs', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'quiz', label: 'Career Quiz', icon: <Compass className="w-4 h-4" /> },
    { id: 'resume', label: 'Resume Builder', icon: <FileText className="w-4 h-4" /> },
    { id: 'mentors', label: 'Mentors', icon: <Users className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: NavigationTab) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Zone 1: Single text element Brand Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-slate-800 transition-colors">
                C
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-slate-800 transition-colors">
                Career Connect
              </span>
            </button>
          </div>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navLinks.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-slate-950 font-semibold'
                      : 'hover:text-slate-900 text-slate-600'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Quick search affordance */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 text-xs"
              title="Search opportunities and roadmaps"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline font-normal text-slate-400">Search</span>
            </button>

            {/* Student Dashboard CTA button */}
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                currentTab === 'dashboard'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
              {activeStudent.applications.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-slate-800 text-white text-[10px] flex items-center justify-center font-bold">
                  {activeStudent.applications.length}
                </span>
              )}
            </button>

            {/* Profile Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1 pl-2 hover:bg-slate-100 rounded-lg text-slate-700 transition-colors text-xs"
                title="Switch student profile"
              >
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-800 font-semibold flex items-center justify-center text-xs">
                  {activeStudent.name.charAt(0)}
                </div>
                <span className="hidden sm:inline font-medium max-w-[80px] truncate text-slate-800">
                  {activeStudent.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {profileDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-3.5 py-2 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900">{activeStudent.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{activeStudent.college}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">CGPA: {activeStudent.cgpa} · {activeStudent.graduationYear}</p>
                  </div>
                  
                  <div className="px-3.5 pt-2 pb-1 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                    Switch Demo Student
                  </div>
                  {DEMO_PROFILES.map(prof => (
                    <button
                      key={prof.id}
                      onClick={() => {
                        switchProfile(prof.id);
                        setProfileDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs hover:bg-slate-50 flex items-center justify-between ${
                        prof.id === activeStudent.id ? 'bg-slate-50 font-semibold text-slate-900' : 'text-slate-600'
                      }`}
                    >
                      <div className="truncate">
                        <span className="block truncate">{prof.name}</span>
                        <span className="block text-[11px] text-slate-400">{prof.major.split('&')[0]}</span>
                      </div>
                      {prof.id === activeStudent.id && (
                        <span className="text-[11px] text-slate-900 font-medium">Active</span>
                      )}
                    </button>
                  ))}
                  
                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      onClick={() => {
                        handleNavClick('dashboard');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                    >
                      View Student Profile & Applications →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                currentTab === item.id
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => handleNavClick('dashboard')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold bg-slate-900 text-white"
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                <span>My Student Dashboard</span>
              </div>
              <span className="text-xs bg-slate-800 px-2 py-0.5 rounded">
                {activeStudent.applications.length} Apps
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
