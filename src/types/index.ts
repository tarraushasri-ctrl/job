export type NavigationTab = 
  | 'home' 
  | 'careers' 
  | 'internships' 
  | 'jobs' 
  | 'skills' 
  | 'quiz' 
  | 'resume' 
  | 'mentors' 
  | 'dashboard';

export interface CareerPath {
  id: string;
  title: string;
  category: 'Engineering' | 'Data & AI' | 'Design & Product' | 'Security & Systems';
  shortDescription: string;
  fullDescription: string;
  avgSalaryFresher: string;
  avgSalaryExperienced: string;
  growthRate: string;
  demandLevel: 'Very High' | 'High' | 'Steady';
  keySkills: string[];
  topRoles: string[];
  roadmapPhases: {
    phase: string;
    description: string;
    milestones: {
      id: string;
      title: string;
      description: string;
      resources: string;
      estimatedWeeks: number;
    }[];
  }[];
  recommendedCourses: {
    title: string;
    platform: string;
    duration: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    type: 'Free' | 'Paid Certificate';
    url: string;
    rating: number;
  }[];
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  category: string;
  location: string;
  workMode: 'Work From Home' | 'In-Office' | 'Hybrid';
  stipend: string;
  duration: string;
  postedDate: string;
  deadline: string;
  applicantsCount: number;
  eligibility: string;
  skillsRequired: string[];
  perks: string[];
  description: string;
  responsibilities: string[];
  companyOverview: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  category: string;
  location: string;
  workMode: 'Remote' | 'On-site' | 'Hybrid';
  ctc: string;
  eligibleBatches: string[];
  minCgpa: number;
  degreesEligible: string[];
  postedDate: string;
  deadline: string;
  skillsRequired: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  applyUrl?: string;
}

export interface PracticeQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SkillModule {
  id: string;
  title: string;
  category: 'Programming' | 'Communication' | 'Aptitude' | 'Interview' | 'Resume';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  summary: string;
  keyTopics: string[];
  resources: { name: string; type: string; link: string }[];
  practiceQuestions?: PracticeQuestion[];
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarText: string;
  experienceYears: number;
  alumniCollege: string;
  domains: string[];
  bio: string;
  sessionsCompleted: number;
  rating: number;
  topicsOffered: string[];
  availableSlots: string[];
}

export interface CommunityQuestion {
  id: string;
  authorName: string;
  authorRole: string;
  date: string;
  title: string;
  content: string;
  tags: string[];
  upvotes: number;
  answers: {
    id: string;
    authorName: string;
    authorRole: string;
    date: string;
    content: string;
    upvotes: number;
  }[];
}

export interface JobApplication {
  id: string;
  opportunityId: string;
  type: 'internship' | 'job';
  title: string;
  company: string;
  location: string;
  stipendOrSalary: string;
  appliedDate: string;
  status: 'Applied' | 'Screening' | 'Interview Scheduled' | 'Offer Received';
  notes?: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  college: string;
  degree: string;
  major: string;
  graduationYear: string;
  cgpa: number;
  targetCareerId: string;
  headline: string;
  savedInternshipIds: string[];
  savedJobIds: string[];
  applications: JobApplication[];
  completedSkillIds: string[];
  completedMilestoneIds: string[];
  bookedMentorships: {
    id: string;
    mentorId: string;
    mentorName: string;
    mentorCompany: string;
    date: string;
    timeSlot: string;
    topic: string;
    note: string;
  }[];
  quizResult?: {
    topCareerId: string;
    careerMatches: {
      careerId: string;
      percentage: number;
      reason: string;
    }[];
    completedAt: string;
  };
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedIn: string;
    github: string;
    portfolio: string;
    summary: string;
  };
  education: {
    id: string;
    school: string;
    degree: string;
    fieldOfStudy: string;
    startYear: string;
    endYear: string;
    cgpa: string;
    relevantCourses: string;
  }[];
  experience: {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    bullets: string[];
  }[];
  projects: {
    id: string;
    name: string;
    techStack: string;
    liveUrl: string;
    githubUrl: string;
    description: string;
    bullets: string[];
  }[];
  skills: {
    languages: string;
    frameworks: string;
    developerTools: string;
    softSkills: string;
  };
  certifications: {
    id: string;
    title: string;
    issuer: string;
    year: string;
    credentialId: string;
  }[];
}
