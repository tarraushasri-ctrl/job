import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CAREER_PATHS } from '../data/mockData';
import { 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Award,
  Target,
  BookOpen,
  Briefcase
} from 'lucide-react';

interface Question {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    points: { [careerId: string]: number };
  }[];
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'What kind of technical challenge energizes you most?',
    subtitle: 'Choose the problem you would naturally gravitate toward during a college hackathon.',
    options: [
      {
        label: 'Designing scalable backend APIs, databases, and microservices',
        description: 'Focusing on clean object-oriented architecture, database indexing, and high concurrency.',
        points: { 'software-engineer': 3, 'cloud-devops': 2, 'fullstack-developer': 1 },
      },
      {
        label: 'Building beautiful, responsive web applications users love',
        description: 'Translating Figma designs into accessible React interfaces with smooth interactions.',
        points: { 'fullstack-developer': 3, 'ui-ux-designer': 2, 'mobile-app-developer': 2 },
      },
      {
        label: 'Uncovering patterns in messy business data to drive decisions',
        description: 'Writing complex SQL queries, generating statistical charts, and building dashboards.',
        points: { 'data-analyst': 3, 'ai-ml-engineer': 1 },
      },
      {
        label: 'Training neural networks, experimenting with LLMs & RAG',
        description: 'Optimizing loss functions, evaluating embeddings, and fine-tuning AI models.',
        points: { 'ai-ml-engineer': 3, 'data-analyst': 1, 'software-engineer': 1 },
      },
      {
        label: 'Automating deployments, cloud infrastructure, and server reliability',
        description: 'Writing Dockerfiles, setting up Kubernetes clusters, and monitoring uptime.',
        points: { 'cloud-devops': 3, 'cybersecurity-analyst': 1, 'software-engineer': 1 },
      },
      {
        label: 'Defending networks, auditing vulnerabilities, and ethical hacking',
        description: 'Packet capture, identifying security injection flaws, and hardening cloud endpoints.',
        points: { 'cybersecurity-analyst': 3, 'cloud-devops': 1 },
      },
    ],
  },
  {
    id: 2,
    question: 'How do you feel about mathematics and statistics?',
    subtitle: 'Be honest about your natural preference for mathematical theory vs practical engineering.',
    options: [
      {
        label: 'I love linear algebra, calculus, and probability distributions',
        description: 'I enjoy understanding the mathematical math behind algorithms.',
        points: { 'ai-ml-engineer': 3, 'data-analyst': 2 },
      },
      {
        label: 'I prefer discrete math, Boolean logic, and graph theory',
        description: 'I like computational reasoning over continuous calculus.',
        points: { 'software-engineer': 3, 'cybersecurity-analyst': 1 },
      },
      {
        label: 'I like practical statistics: averages, percentiles, correlation, and charts',
        description: 'I enjoy numbers when they explain customer behavior or business trends.',
        points: { 'data-analyst': 3 },
      },
      {
        label: 'I prefer visual aesthetics, user psychology, and human ergonomics',
        description: 'I find satisfaction in typography, color harmony, and interaction simplicity.',
        points: { 'ui-ux-designer': 3, 'fullstack-developer': 1 },
      },
    ],
  },
  {
    id: 3,
    question: 'When a web application is running slowly, what is your first instinct?',
    subtitle: 'Your troubleshooting mindset reveals your engineering temperament.',
    options: [
      {
        label: 'Inspect slow database queries and add caching with Redis',
        description: 'Optimizing schema indexing and eliminating N+1 query bottlenecks.',
        points: { 'software-engineer': 3, 'fullstack-developer': 2 },
      },
      {
        label: 'Profile JavaScript bundle size, DOM renders, and Core Web Vitals',
        description: 'Code-splitting components, compressing media, and deferring heavy scripts.',
        points: { 'fullstack-developer': 3, 'mobile-app-developer': 1 },
      },
      {
        label: 'Check server CPU spikes, memory leaks, and container scaling alerts',
        description: 'Increasing pod replicas, verifying load balancer rules, and checking cloud logs.',
        points: { 'cloud-devops': 3, 'software-engineer': 1 },
      },
      {
        label: 'Audit request logs for malicious DDoS traffic or brute force attacks',
        description: 'Configuring firewall rate-limits and blocking suspect IP ranges.',
        points: { 'cybersecurity-analyst': 3 },
      },
    ],
  },
  {
    id: 4,
    question: 'Which college project would you be most proud to present to a recruiter?',
    subtitle: 'Select the capstone project you would enjoy building the most.',
    options: [
      {
        label: 'A distributed high-throughput URL shortener with rate limiting and Docker',
        description: 'Showcasing solid backend engineering, Redis queues, and unit testing.',
        points: { 'software-engineer': 3, 'cloud-devops': 1 },
      },
      {
        label: 'A full-stack social platform with live chat and payments',
        description: 'Complete web application with auth, responsive UI, and PostgreSQL database.',
        points: { 'fullstack-developer': 3, 'mobile-app-developer': 2 },
      },
      {
        label: 'An interactive e-commerce churn prediction dashboard with Power BI',
        description: 'Data storytelling highlighting revenue impact and user retention curves.',
        points: { 'data-analyst': 3 },
      },
      {
        label: 'A multimodal AI search engine using embeddings and vector database RAG',
        description: 'Generative AI pipeline leveraging modern LLM APIs and Python.',
        points: { 'ai-ml-engineer': 3 },
      },
      {
        label: 'An end-to-end mobile design system case study with interactive Figma prototype',
        description: 'In-depth user research, wireframes, accessibility testing, and design tokens.',
        points: { 'ui-ux-designer': 3 },
      },
    ],
  },
  {
    id: 5,
    question: 'What is your preferred programming language or toolset?',
    subtitle: 'Where do you feel most comfortable spending your coding hours?',
    options: [
      {
        label: 'Java, C++, or Go (Golang)',
        description: 'Strong static typing, performance, and standard algorithmic libraries.',
        points: { 'software-engineer': 3, 'cloud-devops': 1 },
      },
      {
        label: 'TypeScript, JavaScript, React, and Node.js',
        description: 'Modern web ecosystem and full-stack development.',
        points: { 'fullstack-developer': 3, 'mobile-app-developer': 1 },
      },
      {
        label: 'Python, SQL, Pandas, and Jupyter Notebooks',
        description: 'Rapid data exploration, scripting, and statistical packages.',
        points: { 'data-analyst': 3, 'ai-ml-engineer': 2 },
      },
      {
        label: 'PyTorch, HuggingFace, and Python',
        description: 'Deep learning frameworks, tensors, and neural networks.',
        points: { 'ai-ml-engineer': 3 },
      },
      {
        label: 'Linux CLI, Bash, Terraform, and Docker',
        description: 'Infrastructure automation and operating system administration.',
        points: { 'cloud-devops': 3, 'cybersecurity-analyst': 2 },
      },
      {
        label: 'Figma, FigJam, and User Research Tools',
        description: 'Vector UI design, user journey mapping, and visual prototypes.',
        points: { 'ui-ux-designer': 3 },
      },
    ],
  },
  {
    id: 6,
    question: 'What is your primary career ambition for your first job?',
    subtitle: 'What matters most to you in your initial placement?',
    options: [
      {
        label: 'High CTC package and engineering excellence at top product tech firms',
        description: 'Aiming for SDE-1 roles at companies like Google, Atlassian, Amazon, or Razorpay.',
        points: { 'software-engineer': 3, 'fullstack-developer': 1 },
      },
      {
        label: 'Working on cutting-edge AI frontiers and generative technologies',
        description: 'Being at the epicenter of machine learning transformation and model training.',
        points: { 'ai-ml-engineer': 3 },
      },
      {
        label: 'Direct business visibility and translating data into executive strategy',
        description: 'Influencing product decisions, marketing campaigns, and growth metrics.',
        points: { 'data-analyst': 3 },
      },
      {
        label: 'Fast startup ownership where my code reaches real customers daily',
        description: 'Wearing multiple hats in a high-velocity product team.',
        points: { 'fullstack-developer': 3, 'mobile-app-developer': 2 },
      },
    ],
  },
];

export const CareerQuizView: React.FC = () => {
  const { 
    saveQuizResult, 
    setCurrentTab, 
    setSelectedCareerId, 
    activeStudent 
  } = useApp();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number }>({});
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [computedResults, setComputedResults] = useState<{
    topMatches: { career: typeof CAREER_PATHS[0]; percentage: number; reason: string }[];
  } | null>(null);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;

  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateResults = () => {
    // Score tally per careerId
    const scores: { [careerId: string]: number } = {};
    CAREER_PATHS.forEach(c => { scores[c.id] = 0; });

    QUIZ_QUESTIONS.forEach(q => {
      const chosenOptionIndex = selectedAnswers[q.id];
      if (chosenOptionIndex !== undefined) {
        const option = q.options[chosenOptionIndex];
        Object.entries(option.points).forEach(([cId, pts]) => {
          scores[cId] = (scores[cId] || 0) + pts;
        });
      }
    });

    // Find max possible score roughly ~ 15-18 pts
    const maxScore = Math.max(...Object.values(scores), 1);

    const sortedMatches = CAREER_PATHS.map(career => {
      const rawScore = scores[career.id] || 0;
      // Normalizing to realistic 60% - 96% range
      const pct = Math.min(96, Math.max(50, Math.round((rawScore / maxScore) * 94 + 6)));
      
      let reason = `Your problem-solving preferences align strongly with ${career.title}.`;
      if (career.id === 'software-engineer') {
        reason = 'Your focus on algorithmic complexity, backend services, and structured system design makes SDE your highest-fit path.';
      } else if (career.id === 'ai-ml-engineer') {
        reason = 'Your mathematical curiosity and excitement for deep learning and LLMs make AI Engineering your top recommendation.';
      } else if (career.id === 'data-analyst') {
        reason = 'Your affinity for SQL, statistical insights, and business impact makes Data Analytics a natural fit.';
      } else if (career.id === 'fullstack-developer') {
        reason = 'Your desire to build end-to-end responsive web products and rapid prototypes aligns with modern full-stack development.';
      } else if (career.id === 'cloud-devops') {
        reason = 'Your interest in infrastructure automation, Linux systems, and reliable cloud deployments makes DevOps ideal.';
      } else if (career.id === 'cybersecurity-analyst') {
        reason = 'Your curiosity for network defenses, vulnerability auditing, and system security points to a strong career in InfoSec.';
      } else if (career.id === 'ui-ux-designer') {
        reason = 'Your visual ergonomics focus, user empathy, and interest in design tokens point directly to Product Design.';
      }

      return {
        career,
        percentage: pct,
        reason,
      };
    }).sort((a, b) => b.percentage - a.percentage);

    const top3 = sortedMatches.slice(0, 3);

    setComputedResults({ topMatches: top3 });
    setQuizCompleted(true);

    // Save to global context & profile
    saveQuizResult({
      topCareerId: top3[0].career.id,
      careerMatches: top3.map(m => ({
        careerId: m.career.id,
        percentage: m.percentage,
        reason: m.reason,
      })),
      completedAt: new Date().toISOString().split('T')[0],
    });
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
    setComputedResults(null);
  };

  const handleExploreTopCareer = (careerId: string) => {
    setSelectedCareerId(careerId);
    setCurrentTab('careers');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <Compass className="w-4 h-4 text-slate-700" />
          <span>Interactive Career Diagnostic Assessment</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Career Recommendation Quiz
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Uncover the tech domain that matches your intrinsic problem-solving style, mathematical interest, and preferred daily project workflow.
        </p>
      </div>

      {!quizCompleted ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          
          {/* Stepper Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
              <span className="font-mono">{Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}% Completed</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-slate-900 transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-1 pt-2">
            <h2 className="text-xl font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h2>
            <p className="text-xs text-slate-500">
              {currentQ.subtitle}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-2.5 pt-2">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = selectedAnswers[currentQ.id] === optIdx;

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-xs flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-mono shrink-0 font-semibold mt-0.5 ${
                    isSelected ? 'border-white text-white' : 'border-slate-300 text-slate-500'
                  }`}>
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  
                  <div className="space-y-0.5">
                    <p className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                      {option.label}
                    </p>
                    <p className={`text-xs ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                      {option.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
                currentQuestionIndex === 0 
                  ? 'text-slate-300 cursor-not-allowed' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQ.id] === undefined}
              className={`px-6 py-2.5 text-xs font-bold rounded-lg flex items-center gap-2 transition-all shadow-sm ${
                selectedAnswers[currentQ.id] === undefined
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              <span>{currentQuestionIndex === totalQuestions - 1 ? 'Calculate My Fit' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        /* Results View */
        computedResults && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Top Match Hero Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 border border-slate-800 relative overflow-hidden space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Top Career Match</span>
                </span>
                <span className="font-mono text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
                  {computedResults.topMatches[0].percentage}% Compatibility Match
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  {computedResults.topMatches[0].career.title}
                </h2>
                <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                  {computedResults.topMatches[0].reason}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Fresher CTC Estimate</span>
                  <span className="font-mono font-bold text-white text-sm">{computedResults.topMatches[0].career.avgSalaryFresher}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Industry Demand</span>
                  <span className="font-medium text-white">{computedResults.topMatches[0].career.growthRate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Key Skills to Learn</span>
                  <span className="text-slate-200 truncate block">{computedResults.topMatches[0].career.keySkills.slice(0, 3).join(', ')}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleExploreTopCareer(computedResults.topMatches[0].career.id)}
                  className="px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-100 rounded-lg text-xs font-bold transition-colors flex items-center gap-2"
                >
                  <Compass className="w-4 h-4" />
                  <span>View Step-by-Step Roadmap</span>
                </button>
                <button
                  onClick={() => setCurrentTab('internships')}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Explore Matching Internships</span>
                </button>
              </div>
            </div>

            {/* Runner-Up Careers */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                Alternative Recommended Paths
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {computedResults.topMatches.slice(1, 3).map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-white rounded-xl border border-slate-200 flex flex-col justify-between space-y-4 text-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">{item.career.category}</span>
                        <span className="font-mono font-semibold text-slate-900">{item.percentage}% Fit</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-base mt-1">{item.career.title}</h4>
                      <p className="text-slate-600 text-[11px] mt-1 line-clamp-2 leading-relaxed">
                        {item.reason}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="font-mono text-slate-700">{item.career.avgSalaryFresher}</span>
                      <button
                        onClick={() => handleExploreTopCareer(item.career.id)}
                        className="text-xs font-semibold text-slate-900 hover:underline flex items-center gap-1"
                      >
                        <span>Roadmap</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended 30-Day Action Plan */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 text-xs">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-slate-700" />
                <span>Your Personalized 30-Day Jumpstart Plan</span>
              </h3>
              
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-lg flex items-start gap-3">
                  <span className="font-bold text-slate-900">Days 1 - 7:</span>
                  <span className="text-slate-600">
                    Bookmark your roadmap in the Careers tab. Start Phase 1 fundamentals ({computedResults.topMatches[0].career.roadmapPhases[0]?.milestones[0]?.title || 'Core Foundations'}).
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg flex items-start gap-3">
                  <span className="font-bold text-slate-900">Days 8 - 18:</span>
                  <span className="text-slate-600">
                    Solve practice questions in the Skills sandbox. Complete at least 2 key topics in {computedResults.topMatches[0].career.category}.
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg flex items-start gap-3">
                  <span className="font-bold text-slate-900">Days 19 - 30:</span>
                  <span className="text-slate-600">
                    Assemble your resume in the Resume Builder. Apply to at least 3 Work-From-Home or In-Office student internships.
                  </span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={handleRetake}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-medium text-xs flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
                <button
                  onClick={() => setCurrentTab('dashboard')}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold text-xs transition-colors"
                >
                  View My Student Dashboard →
                </button>
              </div>

            </div>

          </div>
        )
      )}

    </div>
  );
};
