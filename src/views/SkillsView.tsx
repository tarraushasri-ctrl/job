import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SKILL_MODULES } from '../data/mockData';
import { SkillModule, PracticeQuestion } from '../types';
import { 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  ExternalLink, 
  HelpCircle, 
  Award, 
  Clock, 
  Check, 
  ChevronRight,
  RotateCcw
} from 'lucide-react';

export const SkillsView: React.FC = () => {
  const { activeStudent, toggleSkillCompleted, setCurrentTab } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedModule, setSelectedModule] = useState<SkillModule>(SKILL_MODULES[0]);

  // Practice sandbox state
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: number }>({});
  const [showExplanation, setShowExplanation] = useState<{ [qId: string]: boolean }>({});

  const categories = ['All', 'Programming', 'Communication', 'Aptitude', 'Interview', 'Resume'];

  const filteredModules = SKILL_MODULES.filter(m => 
    activeCategory === 'All' || m.category === activeCategory
  );

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleToggleExplanation = (questionId: string) => {
    setShowExplanation(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setShowExplanation({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-slate-700" />
          <span>Skill Development Hub</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Master the High-Value Competencies Evaluated by Recruiters
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          Structured syllabus for core technical coding, quantitative aptitude for screening rounds, behavioral communication (STAR method), and ATS resume writing.
        </p>
      </div>

      {/* Category Tabs */}
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

      {/* Main Two-Zone Layout: Left List, Right Detailed Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Modules Directory */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Modules ({filteredModules.length})
          </span>
          <div className="space-y-2">
            {filteredModules.map((module) => {
              const isSelected = selectedModule.id === module.id;
              const isCompleted = activeStudent.completedSkillIds.includes(module.id);

              return (
                <div
                  key={module.id}
                  onClick={() => setSelectedModule(module)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-xs ${
                    isSelected
                      ? 'bg-white border-slate-900 ring-1 ring-slate-900 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                      {module.category}
                    </span>
                    {isCompleted && (
                      <span className="text-[11px] font-medium text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded">
                        <Check className="w-3 h-3" /> Completed
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm mt-1 leading-snug">
                    {module.title}
                  </h3>

                  <div className="flex items-center gap-2 text-slate-500 mt-2 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {module.estimatedHours} hrs
                    </span>
                    <span>·</span>
                    <span>{module.level}</span>
                    {module.practiceQuestions && (
                      <>
                        <span>·</span>
                        <span>{module.practiceQuestions.length} Questions</span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Module Deep-Dive & Interactive Sandbox */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-8">
          
          {/* Module Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">{selectedModule.category}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedModule.level} Level</span>
                <span aria-hidden="true">·</span>
                <span>~{selectedModule.estimatedHours} Study Hours</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                {selectedModule.title}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedModule.summary}
              </p>
            </div>

            <button
              onClick={() => toggleSkillCompleted(selectedModule.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 self-start ${
                activeStudent.completedSkillIds.includes(selectedModule.id)
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                  : 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {activeStudent.completedSkillIds.includes(selectedModule.id)
                  ? 'Marked Completed'
                  : 'Mark Skill as Mastered'}
              </span>
            </button>
          </div>

          {/* Key Topics Covered */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Key Topics & Conceptual Syllabus
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {selectedModule.keyTopics.map((topic, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2 text-slate-700"
                >
                  <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curated Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Verified Learning Resources
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {selectedModule.resources.map((res, idx) => (
                <a
                  key={idx}
                  href={res.link}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-between group"
                >
                  <div>
                    <h5 className="font-semibold text-slate-900 group-hover:text-slate-800">
                      {res.name}
                    </h5>
                    <p className="text-[11px] text-slate-400">{res.type}</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700" />
                </a>
              ))}
            </div>
          </div>

          {/* Interactive Practice Question Sandbox */}
          {selectedModule.practiceQuestions && selectedModule.practiceQuestions.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-slate-700" />
                    <span>Interactive Practice Sandbox</span>
                  </h4>
                  <p className="text-xs text-slate-500">
                    Test your understanding with real screening exam questions
                  </p>
                </div>
                <button
                  onClick={handleResetQuiz}
                  className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Answers</span>
                </button>
              </div>

              <div className="space-y-6">
                {selectedModule.practiceQuestions.map((q, qIndex) => {
                  const selectedOption = userAnswers[q.id];
                  const hasAnswered = selectedOption !== undefined;
                  const isCorrect = selectedOption === q.correctIndex;
                  const isExplaining = showExplanation[q.id];

                  return (
                    <div
                      key={q.id}
                      className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4 text-xs"
                    >
                      <div className="font-semibold text-slate-900 text-sm leading-relaxed">
                        Q{qIndex + 1}: {q.question}
                      </div>

                      {/* Options */}
                      <div className="space-y-2">
                        {q.options.map((option, optIdx) => {
                          const isThisSelected = selectedOption === optIdx;
                          let btnStyle = 'bg-white border-slate-200 hover:border-slate-300 text-slate-700';

                          if (hasAnswered) {
                            if (optIdx === q.correctIndex) {
                              btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-medium';
                            } else if (isThisSelected && !isCorrect) {
                              btnStyle = 'bg-rose-50 border-rose-300 text-rose-800';
                            } else {
                              btnStyle = 'bg-white border-slate-100 opacity-60 text-slate-400';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={hasAnswered}
                              onClick={() => handleSelectOption(q.id, optIdx)}
                              className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between text-xs ${btnStyle}`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-[10px] font-mono shrink-0 font-semibold">
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{option}</span>
                              </div>
                              {hasAnswered && optIdx === q.correctIndex && (
                                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Feedback & Explanation */}
                      {hasAnswered && (
                        <div className="pt-2 space-y-2 border-t border-slate-200">
                          <div className="flex items-center justify-between">
                            <span className={`font-semibold ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                              {isCorrect ? '✓ Correct Answer!' : '✗ Incorrect. Review the logic below.'}
                            </span>
                            <button
                              onClick={() => handleToggleExplanation(q.id)}
                              className="text-[11px] text-slate-700 underline font-medium"
                            >
                              {isExplaining ? 'Hide Explanation' : 'View Detailed Explanation'}
                            </button>
                          </div>

                          {(isExplaining || !isCorrect) && (
                            <div className="p-3 bg-white rounded-lg border border-slate-200 text-slate-600 text-[11px] leading-relaxed">
                              <span className="font-semibold text-slate-900 block mb-0.5">Solution Breakdown:</span>
                              {q.explanation}
                            </div>
                          )}
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick jump to Resume or Interview guidance */}
          {selectedModule.category === 'Resume' && (
            <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between text-xs">
              <div>
                <p className="font-bold">Ready to apply these resume principles?</p>
                <p className="text-slate-300 text-[11px]">Use our live interactive builder with ATS score analysis.</p>
              </div>
              <button
                onClick={() => setCurrentTab('resume')}
                className="px-3.5 py-1.5 bg-white text-slate-900 rounded-md font-semibold hover:bg-slate-100 transition-colors"
              >
                Open Resume Builder →
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
