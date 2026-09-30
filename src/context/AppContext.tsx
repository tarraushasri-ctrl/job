import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  NavigationTab, 
  StudentProfile, 
  ResumeData, 
  Internship, 
  Job, 
  Mentor, 
  CommunityQuestion, 
  JobApplication 
} from '../types';
import { 
  DEMO_PROFILES, 
  DEFAULT_RESUME_DATA, 
  COMMUNITY_QUESTIONS 
} from '../data/mockData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface AppContextType {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  selectedCareerId: string | null;
  setSelectedCareerId: (id: string | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeStudent: StudentProfile;
  switchProfile: (profileId: string) => void;
  updateStudentProfile: (updates: Partial<StudentProfile>) => void;
  toggleSaveInternship: (internshipId: string) => void;
  toggleSaveJob: (jobId: string) => void;
  applyToOpportunity: (opportunity: Internship | Job, type: 'internship' | 'job', notes?: string) => boolean;
  updateApplicationStatus: (appId: string, status: JobApplication['status']) => void;
  toggleSkillCompleted: (skillId: string) => void;
  toggleMilestoneCompleted: (milestoneId: string) => void;
  saveQuizResult: (result: NonNullable<StudentProfile['quizResult']>) => void;
  bookMentorshipSession: (mentor: Mentor, slot: string, topic: string, note: string) => void;
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  resetResumeData: () => void;
  communityQuestions: CommunityQuestion[];
  addCommunityQuestion: (title: string, content: string, tags: string[]) => void;
  addCommunityAnswer: (questionId: string, content: string) => void;
  upvoteQuestion: (questionId: string) => void;
  upvoteAnswer: (questionId: string, answerId: string) => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [selectedCareerId, setSelectedCareerId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Persistent student profile
  const [activeStudent, setActiveStudent] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('career_connect_active_student');
      return saved ? JSON.parse(saved) : DEMO_PROFILES[0];
    } catch {
      return DEMO_PROFILES[0];
    }
  });

  // Persistent resume data
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem('career_connect_resume_data');
      return saved ? JSON.parse(saved) : DEFAULT_RESUME_DATA;
    } catch {
      return DEFAULT_RESUME_DATA;
    }
  });

  // Persistent community questions
  const [communityQuestions, setCommunityQuestions] = useState<CommunityQuestion[]>(() => {
    try {
      const saved = localStorage.getItem('career_connect_community_questions');
      return saved ? JSON.parse(saved) : COMMUNITY_QUESTIONS;
    } catch {
      return COMMUNITY_QUESTIONS;
    }
  });

  // Toast feedback notifications
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  useEffect(() => {
    try {
      localStorage.setItem('career_connect_active_student', JSON.stringify(activeStudent));
    } catch {
      // storage quota or private browsing
    }
  }, [activeStudent]);

  useEffect(() => {
    try {
      localStorage.setItem('career_connect_resume_data', JSON.stringify(resumeData));
    } catch {
      // storage quota
    }
  }, [resumeData]);

  useEffect(() => {
    try {
      localStorage.setItem('career_connect_community_questions', JSON.stringify(communityQuestions));
    } catch {
      // storage quota
    }
  }, [communityQuestions]);

  const switchProfile = (profileId: string) => {
    const found = DEMO_PROFILES.find(p => p.id === profileId);
    if (found) {
      setActiveStudent(found);
      showToast(`Switched profile to ${found.name}`, 'info');
    }
  };

  const updateStudentProfile = (updates: Partial<StudentProfile>) => {
    setActiveStudent(prev => ({ ...prev, ...updates }));
    showToast('Profile updated successfully', 'success');
  };

  const toggleSaveInternship = (internshipId: string) => {
    setActiveStudent(prev => {
      const isSaved = prev.savedInternshipIds.includes(internshipId);
      const newSaved = isSaved 
        ? prev.savedInternshipIds.filter(id => id !== internshipId)
        : [...prev.savedInternshipIds, internshipId];
      
      showToast(isSaved ? 'Removed from saved internships' : 'Saved to your dashboard', isSaved ? 'info' : 'success');
      return { ...prev, savedInternshipIds: newSaved };
    });
  };

  const toggleSaveJob = (jobId: string) => {
    setActiveStudent(prev => {
      const isSaved = prev.savedJobIds.includes(jobId);
      const newSaved = isSaved 
        ? prev.savedJobIds.filter(id => id !== jobId)
        : [...prev.savedJobIds, jobId];
      
      showToast(isSaved ? 'Removed from saved jobs' : 'Saved to your dashboard', isSaved ? 'info' : 'success');
      return { ...prev, savedJobIds: newSaved };
    });
  };

  const applyToOpportunity = (opportunity: Internship | Job, type: 'internship' | 'job', notes?: string) => {
    const alreadyApplied = activeStudent.applications.some(app => app.opportunityId === opportunity.id);
    if (alreadyApplied) {
      showToast('You have already applied for this role!', 'warning');
      return false;
    }

    const newApplication: JobApplication = {
      id: `app-${Date.now()}`,
      opportunityId: opportunity.id,
      type,
      title: opportunity.title,
      company: opportunity.company,
      location: opportunity.location,
      stipendOrSalary: 'stipend' in opportunity ? opportunity.stipend : opportunity.ctc,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Applied',
      notes: notes || 'Application submitted with profile resume',
    };

    setActiveStudent(prev => ({
      ...prev,
      applications: [newApplication, ...prev.applications],
    }));

    showToast(`Application submitted to ${opportunity.company}! Track in your Dashboard.`, 'success');
    return true;
  };

  const updateApplicationStatus = (appId: string, status: JobApplication['status']) => {
    setActiveStudent(prev => ({
      ...prev,
      applications: prev.applications.map(app => 
        app.id === appId ? { ...app, status } : app
      ),
    }));
    showToast(`Application status updated to "${status}"`, 'info');
  };

  const toggleSkillCompleted = (skillId: string) => {
    setActiveStudent(prev => {
      const isCompleted = prev.completedSkillIds.includes(skillId);
      const newCompleted = isCompleted
        ? prev.completedSkillIds.filter(id => id !== skillId)
        : [...prev.completedSkillIds, skillId];
      
      showToast(isCompleted ? 'Skill marked as in progress' : 'Skill marked as completed!', 'success');
      return { ...prev, completedSkillIds: newCompleted };
    });
  };

  const toggleMilestoneCompleted = (milestoneId: string) => {
    setActiveStudent(prev => {
      const isCompleted = prev.completedMilestoneIds.includes(milestoneId);
      const newMilestones = isCompleted
        ? prev.completedMilestoneIds.filter(id => id !== milestoneId)
        : [...prev.completedMilestoneIds, milestoneId];
      
      showToast(isCompleted ? 'Milestone unchecked' : 'Milestone completed! +10 Career Progress', 'success');
      return { ...prev, completedMilestoneIds: newMilestones };
    });
  };

  const saveQuizResult = (result: NonNullable<StudentProfile['quizResult']>) => {
    setActiveStudent(prev => ({
      ...prev,
      targetCareerId: result.topCareerId,
      quizResult: result,
    }));
    showToast('Career Assessment results saved! Check your personalized dashboard.', 'success');
  };

  const bookMentorshipSession = (mentor: Mentor, slot: string, topic: string, note: string) => {
    const newBooking = {
      id: `bm-${Date.now()}`,
      mentorId: mentor.id,
      mentorName: mentor.name,
      mentorCompany: mentor.company,
      date: slot.split(',')[0] || 'Upcoming',
      timeSlot: slot,
      topic,
      note,
    };

    setActiveStudent(prev => ({
      ...prev,
      bookedMentorships: [newBooking, ...prev.bookedMentorships],
    }));

    showToast(`Session booked with ${mentor.name} for ${slot}!`, 'success');
  };

  const resetResumeData = () => {
    setResumeData(DEFAULT_RESUME_DATA);
    showToast('Reset resume to standard sample data', 'info');
  };

  const addCommunityQuestion = (title: string, content: string, tags: string[]) => {
    const newQuestion: CommunityQuestion = {
      id: `cq-${Date.now()}`,
      authorName: activeStudent.name,
      authorRole: `${activeStudent.degree}, ${activeStudent.college}`,
      date: 'Just now',
      title,
      content,
      tags: tags.length ? tags : ['Career Advice'],
      upvotes: 1,
      answers: [],
    };

    setCommunityQuestions(prev => [newQuestion, ...prev]);
    showToast('Your question has been posted to mentors and peers!', 'success');
  };

  const addCommunityAnswer = (questionId: string, content: string) => {
    const newAnswer = {
      id: `ans-${Date.now()}`,
      authorName: activeStudent.name,
      authorRole: `${activeStudent.degree}, ${activeStudent.college}`,
      date: 'Just now',
      content,
      upvotes: 0,
    };

    setCommunityQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          answers: [...q.answers, newAnswer],
        };
      }
      return q;
    }));

    showToast('Answer posted successfully!', 'success');
  };

  const upvoteQuestion = (questionId: string) => {
    setCommunityQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        return { ...q, upvotes: q.upvotes + 1 };
      }
      return q;
    }));
  };

  const upvoteAnswer = (questionId: string, answerId: string) => {
    setCommunityQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          answers: q.answers.map(ans => 
            ans.id === answerId ? { ...ans, upvotes: ans.upvotes + 1 } : ans
          ),
        };
      }
      return q;
    }));
  };

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        selectedCareerId,
        setSelectedCareerId,
        searchQuery,
        setSearchQuery,
        activeStudent,
        switchProfile,
        updateStudentProfile,
        toggleSaveInternship,
        toggleSaveJob,
        applyToOpportunity,
        updateApplicationStatus,
        toggleSkillCompleted,
        toggleMilestoneCompleted,
        saveQuizResult,
        bookMentorshipSession,
        resumeData,
        setResumeData,
        resetResumeData,
        communityQuestions,
        addCommunityQuestion,
        addCommunityAnswer,
        upvoteQuestion,
        upvoteAnswer,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
