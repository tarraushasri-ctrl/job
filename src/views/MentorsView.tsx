import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MENTORS } from '../data/mockData';
import { Mentor } from '../types';
import { 
  Users, 
  Search, 
  MessageSquare, 
  Calendar, 
  Star, 
  ThumbsUp, 
  Plus, 
  CheckCircle2, 
  X, 
  Send,
  Building2,
  Clock,
  GraduationCap
} from 'lucide-react';

export const MentorsView: React.FC = () => {
  const { 
    activeStudent, 
    bookMentorshipSession, 
    communityQuestions, 
    addCommunityQuestion, 
    addCommunityAnswer, 
    upvoteQuestion, 
    upvoteAnswer,
    setCurrentTab 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'mentors' | 'forum'>('mentors');
  const [domainFilter, setDomainFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Booking modal state
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [bookingNote, setBookingNote] = useState<string>('');
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);

  // Ask Question modal state
  const [askModalOpen, setAskModalOpen] = useState<boolean>(false);
  const [newQuestionTitle, setNewQuestionTitle] = useState<string>('');
  const [newQuestionContent, setNewQuestionContent] = useState<string>('');
  const [newQuestionTags, setNewQuestionTags] = useState<string>('');

  // Answer state per question
  const [replyOpen, setReplyOpen] = useState<{ [qId: string]: boolean }>({});
  const [replyText, setReplyText] = useState<{ [qId: string]: string }>({});

  const domains = ['All', 'Distributed Systems', 'Machine Learning', 'Design Systems', 'Cloud Architecture', 'Product Management', 'Network Security'];

  const filteredMentors = MENTORS.filter(m => {
    const matchesDomain = domainFilter === 'All' || m.domains.some(d => d.toLowerCase().includes(domainFilter.toLowerCase()));
    const matchesSearch = 
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.bio.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  const handleOpenBooking = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setSelectedSlot(mentor.availableSlots[0] || 'Saturday, 11:00 AM');
    setSelectedTopic(mentor.topicsOffered[0] || 'Career Guidance');
    setBookingNote('');
    setBookingModalOpen(true);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentor) return;
    bookMentorshipSession(selectedMentor, selectedSlot, selectedTopic, bookingNote);
    setBookingModalOpen(false);
  };

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionTitle.trim()) return;
    const tagsArray = newQuestionTags.split(',').map(t => t.trim()).filter(Boolean);
    addCommunityQuestion(newQuestionTitle, newQuestionContent, tagsArray);
    setNewQuestionTitle('');
    setNewQuestionContent('');
    setNewQuestionTags('');
    setAskModalOpen(false);
  };

  const handlePostAnswer = (questionId: string) => {
    const text = replyText[questionId];
    if (!text || !text.trim()) return;
    addCommunityAnswer(questionId, text);
    setReplyText(prev => ({ ...prev, [questionId]: '' }));
    setReplyOpen(prev => ({ ...prev, [questionId]: false }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <Users className="w-4 h-4 text-slate-700" />
            <span>Mentor Connect & Student Guidance</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Learn from Engineers Who Have Been in Your Shoes
          </h1>
          <p className="text-sm text-slate-600 max-w-xl">
            Book 1-on-1 mock interviews, portfolio reviews, or ask career questions in the community forum.
          </p>
        </div>

        {/* Tab switch buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('mentors')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'mentors' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Find a Mentor ({MENTORS.length})
          </button>
          <button
            onClick={() => setActiveTab('forum')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'forum' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ask Questions ({communityQuestions.length})
          </button>
        </div>
      </div>

      {activeTab === 'mentors' ? (
        /* Mentors Directory */
        <div className="space-y-6">
          
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search mentor by name, company (Google, AWS...), or skill..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-xs text-slate-400 font-medium">Domain:</span>
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                {domains.slice(0, 4).map((dom) => (
                  <button
                    key={dom}
                    onClick={() => setDomainFilter(dom)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                      domainFilter === dom ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {dom}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Mentors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 transition-all text-xs space-y-4"
              >
                <div className="space-y-3">
                  
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                        {mentor.avatarText}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{mentor.name}</h3>
                        <p className="text-slate-600 text-[11px]">{mentor.role}</p>
                        <p className="text-slate-900 font-semibold text-[11px]">{mentor.company}</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-semibold text-slate-800 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      {mentor.rating}
                    </span>
                  </div>

                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                    {mentor.bio}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-500">
                    <p className="flex items-center gap-1 text-slate-700">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                      <span>Alumni: {mentor.alumniCollege}</span>
                    </p>
                    <p className="flex items-center gap-1 text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{mentor.experienceYears} Years Industry Experience</span>
                    </p>
                  </div>

                  {/* Topics Offered */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Session Topics:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {mentor.topicsOffered.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-slate-500 text-[11px]">{mentor.sessionsCompleted} sessions held</span>
                  <button
                    onClick={() => handleOpenBooking(mentor)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold text-xs transition-colors shadow-sm"
                  >
                    Book 1:1 Session
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      ) : (
        /* Community Q&A Forum */
        <div className="space-y-6">
          
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Student Career Q&A Forum</h3>
              <p className="text-xs text-slate-500">Have questions about placements, DSA strategy, or off-campus applications?</p>
            </div>
            <button
              onClick={() => setAskModalOpen(true)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Ask a Question</span>
            </button>
          </div>

          <div className="space-y-4">
            {communityQuestions.map((q) => (
              <div
                key={q.id}
                className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 text-xs"
              >
                {/* Question Details */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span className="font-medium text-slate-700">{q.authorName} · {q.authorRole}</span>
                    <span>{q.date}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {q.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed text-xs">
                    {q.content}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {q.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Question Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-slate-500">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => upvoteQuestion(q.id)}
                      className="flex items-center gap-1 hover:text-slate-900 transition-colors font-medium"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{q.upvotes} Upvotes</span>
                    </button>
                    <span className="text-slate-300">·</span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{q.answers.length} Answers</span>
                    </span>
                  </div>

                  <button
                    onClick={() => setReplyOpen(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                    className="font-semibold text-slate-900 hover:underline"
                  >
                    {replyOpen[q.id] ? 'Cancel Reply' : 'Add Answer'}
                  </button>
                </div>

                {/* Reply Input */}
                {replyOpen[q.id] && (
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                    <textarea
                      rows={2}
                      value={replyText[q.id] || ''}
                      onChange={(e) => setReplyText(prev => ({ ...prev, [q.id]: e.target.value }))}
                      placeholder="Share your advice or perspective..."
                      className="w-full p-2 bg-white border border-slate-200 rounded-md text-xs text-slate-900 focus:outline-none"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={() => handlePostAnswer(q.id)}
                        className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold"
                      >
                        Post Answer
                      </button>
                    </div>
                  </div>
                )}

                {/* Answers List */}
                {q.answers.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 space-y-3 pl-3 border-l-2 border-l-slate-200">
                    {q.answers.map((ans) => (
                      <div key={ans.id} className="space-y-1 text-xs">
                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span className="font-semibold text-slate-800">{ans.authorName} ({ans.authorRole})</span>
                          <span>{ans.date}</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed text-xs">
                          {ans.content}
                        </p>
                        <button
                          onClick={() => upvoteAnswer(q.id, ans.id)}
                          className="text-[11px] text-slate-500 hover:text-slate-900 flex items-center gap-1 pt-0.5"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>{ans.upvotes} Helpful</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            ))}
          </div>

        </div>
      )}

      {/* Booking Modal */}
      {bookingModalOpen && selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div 
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                  {selectedMentor.avatarText}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedMentor.name}</h3>
                  <p className="text-xs text-slate-600">{selectedMentor.role} @ {selectedMentor.company}</p>
                </div>
              </div>
              <button
                onClick={() => setBookingModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmBooking} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Select Guidance Topic
                </label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                >
                  {selectedMentor.topicsOffered.map((t, idx) => (
                    <option key={idx} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Choose Available Slot
                </label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                >
                  {selectedMentor.availableSlots.map((slot, idx) => (
                    <option key={idx} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  What specific question or project do you want advice on?
                </label>
                <textarea
                  rows={3}
                  value={bookingNote}
                  onChange={(e) => setBookingNote(e.target.value)}
                  placeholder="e.g., I'd love feedback on my backend URL shortener project and how to describe it for SDE-1 interviews..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                  required
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-lg text-[11px] text-slate-500 space-y-1">
                <p>✓ 100% Free 45-minute virtual video session via Google Meet.</p>
                <p>✓ Added directly to your Student Dashboard schedule.</p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg font-medium text-xs hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Confirm Free Booking</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ask Question Modal */}
      {askModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div 
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-50">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Community Discussion</span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">Ask a Career Question</h3>
              </div>
              <button
                onClick={() => setAskModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostQuestion} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Question Title (Concise & Specific)
                </label>
                <input
                  type="text"
                  value={newQuestionTitle}
                  onChange={(e) => setNewQuestionTitle(e.target.value)}
                  placeholder="e.g., How should I prepare for an off-campus React frontend interview?"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Background Context & Details
                </label>
                <textarea
                  rows={4}
                  value={newQuestionContent}
                  onChange={(e) => setNewQuestionContent(e.target.value)}
                  placeholder="Explain your current year of study, tech stack, and what options you are considering..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={newQuestionTags}
                  onChange={(e) => setNewQuestionTags(e.target.value)}
                  placeholder="e.g. Internships, Placements, WebDev"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setAskModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post to Forum</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
